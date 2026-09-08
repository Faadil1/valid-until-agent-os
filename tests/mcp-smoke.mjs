import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import readline from 'node:readline';

const server = spawn(process.execPath, ['src/mcp-server.mjs'], { stdio: ['pipe', 'pipe', 'inherit'] });
const rl = readline.createInterface({ input: server.stdout, crlfDelay: Infinity });
const pending = new Map();
let nextId = 1;

rl.on('line', (line) => {
  const msg = JSON.parse(line);
  if (msg.id != null && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  }
});

function request(method, params = {}) {
  const id = nextId++;
  const promise = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  server.stdin.write(JSON.stringify({ jsonrpc:'2.0', id, method, params }) + '\n');
  return promise;
}

function parseTool(result) {
  const text = result?.content?.find((x) => x.type === 'text')?.text;
  assert.ok(text, 'tool result text missing');
  return JSON.parse(text);
}

const policy = {
  policy_id: 'mcp-smoke-v2', symbol: 'BTCUSDT', max_snapshot_age_ms: 5000,
  max_spread_bps: 8, max_mid_drift_bps: 20, max_notional_usdt: 100,
  max_1m_return_abs_bps: 80, min_top5_depth_usdt: 50000
};
const t0 = {
  snapshot_version:'valid-until.market.v1', symbol:'BTCUSDT', server_time_ms:1000,
  best_bid:100, best_ask:100.01, mid:100.005, spread_bps:1,
  top5_bid_depth_usdt:100000, top5_ask_depth_usdt:100000,
  last_1m_return_bps:10, source:'mcp-smoke'
};
const action50 = { symbol:'BTCUSDT', side:'BUY', notional_usdt:50 };

try {
  const init = await request('initialize', { protocolVersion:'2024-11-05', capabilities:{}, clientInfo:{ name:'valid-until-smoke', version:'1.0.0' } });
  assert.equal(init.serverInfo.name, 'valid-until');
  server.stdin.write(JSON.stringify({ jsonrpc:'2.0', method:'notifications/initialized', params:{} }) + '\n');

  const listed = await request('tools/list');
  assert.deepEqual(listed.tools.map(t => t.name), ['valid_until_begin', 'valid_until_revalidate']);

  const begin = parseTool(await request('tools/call', { name:'valid_until_begin', arguments:{ policy, snapshot:t0, action:action50 } }));
  assert.equal(begin.status, 'ELIGIBLE');
  assert.equal(begin.contract, 'valid-until.receipt.v2');
  assert.ok(begin.action_hash);

  const driftT1 = { ...t0, server_time_ms:3000, mid:100.36, best_bid:100.35, best_ask:100.37 };
  const drift = parseTool(await request('tools/call', { name:'valid_until_revalidate', arguments:{ decision_id:begin.decision_id, current_snapshot:driftT1, action:action50 } }));
  assert.equal(drift.status, 'BLOCK');
  assert.equal(drift.next_state, 'REPLAN_REQUIRED');
  assert.ok(drift.checks.some(c => c.name === 'mid_drift_bps' && c.pass === false));
  assert.ok(drift.checks.some(c => c.name === 'action_hash_match' && c.pass === true));
  for (const name of ['current_spread_bps','current_abs_1m_return_bps','current_top5_bid_depth_usdt','current_top5_ask_depth_usdt']) {
    assert.ok(drift.checks.some(c => c.name === name && c.pass === true), `${name} should pass`);
  }

  const begin2 = parseTool(await request('tools/call', { name:'valid_until_begin', arguments:{ policy, snapshot:t0, action:action50 } }));
  const stableT1 = { ...t0, server_time_ms:3000, mid:100.01, best_bid:100.00, best_ask:100.02 };
  const mutated = { symbol:'BTCUSDT', side:'BUY', notional_usdt:75 };
  const mutation = parseTool(await request('tools/call', { name:'valid_until_revalidate', arguments:{ decision_id:begin2.decision_id, current_snapshot:stableT1, action:mutated } }));
  assert.equal(mutation.status, 'BLOCK');
  assert.equal(mutation.next_state, 'REPLAN_REQUIRED');
  assert.ok(mutation.checks.some(c => c.name === 'action_hash_match' && c.pass === false));
  assert.ok(mutation.checks.some(c => c.name === 'action_notional_usdt' && c.pass === true));

  const unknown = parseTool(await request('tools/call', { name:'valid_until_revalidate', arguments:{ decision_id:'missing-decision', current_snapshot:stableT1, action:action50 } }));
  assert.equal(unknown.status, 'BLOCK');
  assert.equal(unknown.next_state, 'REPLAN_REQUIRED');
  assert.ok(unknown.checks.some(c => c.name === 'decision_id_known' && c.pass === false));

  console.log('PASS MCP 5/5 — initialize, tool discovery, cross-time drift block, within-cap action mutation block, unknown decision fail-closed');
} finally {
  server.stdin.end();
  server.kill();
}
