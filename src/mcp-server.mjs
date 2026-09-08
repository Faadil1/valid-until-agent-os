import readline from 'node:readline';
import { sealPolicy, evaluateInitialDecision, normalizeAction, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt, publicKeyPem } from './receipt.mjs';
import { sha256 } from './canonical.mjs';

const signer = createDemoSigner();
const decisions = new Map();

const tools = [
  {
    name: 'valid_until_begin',
    description: 'Create a short-lived action-bound decision contract from a user policy, a normalized T0 Binance market snapshot, and the exact proposed action. This tool never trades or fetches account data.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      required: ['policy', 'snapshot', 'action'],
      properties: {
        policy: { type: 'object', description: 'Valid Until policy object.' },
        snapshot: { type: 'object', description: 'Normalized Binance T0 snapshot supplied by the host agent.' },
        action: {
          type: 'object',
          required: ['symbol', 'side', 'notional_usdt'],
          properties: {
            symbol: { type: 'string' },
            side: { type: 'string', enum: ['BUY', 'SELL'] },
            notional_usdt: { type: 'number', minimum: 0 },
          },
        },
      },
    },
  },
  {
    name: 'valid_until_revalidate',
    description: 'Revalidate a previously created decision contract against a fresh T1 Binance snapshot and the exact action proposed now. BLOCK returns REPLAN_REQUIRED. This tool never executes the action.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      required: ['decision_id', 'current_snapshot', 'action'],
      properties: {
        decision_id: { type: 'string' },
        current_snapshot: { type: 'object', description: 'Normalized fresh Binance T1 snapshot supplied by the host agent.' },
        action: {
          type: 'object',
          required: ['symbol', 'side', 'notional_usdt'],
          properties: {
            symbol: { type: 'string' },
            side: { type: 'string', enum: ['BUY', 'SELL'] },
            notional_usdt: { type: 'number', minimum: 0 },
          },
        },
      },
    },
  },
];

function toolContent(value) {
  return {
    content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
  };
}

function begin(args) {
  const policy = structuredClone(args.policy);
  const snapshot = structuredClone(args.snapshot);
  const action = normalizeAction(args.action);
  const sealed = sealPolicy(policy);
  const evaluation = evaluateInitialDecision(sealed.policy, snapshot, action);
  const receipt = issueReceipt({
    policy: sealed.policy,
    policyHash: sealed.policy_hash,
    snapshot,
    snapshotHash: sha256(snapshot),
    evaluation,
    signer,
    proposedAction: action,
  });
  decisions.set(receipt.decision_id, {
    policy: sealed.policy,
    initialSnapshot: snapshot,
    action,
    receipt,
  });
  return {
    contract: 'valid-until.receipt.v2',
    decision_id: receipt.decision_id,
    status: receipt.status,
    next_state: receipt.status === 'ELIGIBLE' ? 'REVALIDATION_REQUIRED_BEFORE_ACTION' : 'REPLAN_REQUIRED',
    policy_hash: receipt.policy_hash,
    snapshot_hash: receipt.snapshot_hash,
    action_hash: receipt.action_hash,
    action: receipt.action,
    valid_until_ms: receipt.valid_until_ms,
    checks: receipt.checks,
    public_key_pem: publicKeyPem(signer.publicKey),
    execution: 'NOT_AVAILABLE',
  };
}

function revalidateDecision(args) {
  const stored = decisions.get(args.decision_id);
  if (!stored) {
    return {
      status: 'BLOCK',
      next_state: 'REPLAN_REQUIRED',
      checks: [{ name: 'decision_id_known', actual: args.decision_id, op: 'known', limit: true, pass: false }],
      execution: 'NOT_AVAILABLE',
    };
  }
  const action = normalizeAction(args.action);
  const result = revalidate({
    policy: stored.policy,
    receipt: stored.receipt,
    initialSnapshot: stored.initialSnapshot,
    currentSnapshot: structuredClone(args.current_snapshot),
    receiptSignatureValid: verifyReceipt(stored.receipt, signer.publicKey),
    proposedAction: action,
  });
  return {
    decision_id: args.decision_id,
    ...result,
    sealed_action_hash: stored.receipt.action_hash,
    sealed_action: stored.receipt.action,
    current_action: action,
    execution: 'NOT_AVAILABLE',
  };
}

async function handle(message) {
  const { id, method, params } = message;
  if (method === 'notifications/initialized') return null;
  if (method === 'initialize') {
    return {
      jsonrpc: '2.0', id,
      result: {
        protocolVersion: params?.protocolVersion || '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'valid-until', version: '0.3.0' },
      },
    };
  }
  if (method === 'tools/list') {
    return { jsonrpc: '2.0', id, result: { tools } };
  }
  if (method === 'tools/call') {
    try {
      const name = params?.name;
      const args = params?.arguments || {};
      if (name === 'valid_until_begin') return { jsonrpc: '2.0', id, result: toolContent(begin(args)) };
      if (name === 'valid_until_revalidate') return { jsonrpc: '2.0', id, result: toolContent(revalidateDecision(args)) };
      return { jsonrpc: '2.0', id, error: { code: -32601, message: `Unknown tool: ${name}` } };
    } catch (error) {
      return { jsonrpc: '2.0', id, result: { isError: true, ...toolContent({ status: 'BLOCK', next_state: 'REPLAN_REQUIRED', error: error.message, execution: 'NOT_AVAILABLE' }) } };
    }
  }
  return { jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } };
}

const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
for await (const line of rl) {
  if (!line.trim()) continue;
  let message;
  try { message = JSON.parse(line); }
  catch {
    process.stdout.write(JSON.stringify({ jsonrpc:'2.0', id:null, error:{ code:-32700, message:'Parse error' } }) + '\n');
    continue;
  }
  const response = await handle(message);
  if (response) process.stdout.write(JSON.stringify(response) + '\n');
}
