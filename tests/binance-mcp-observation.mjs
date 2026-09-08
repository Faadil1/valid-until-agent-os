import assert from 'node:assert/strict';
import { normalizeBinanceMcpObservation } from '../src/binance-mcp-observation.mjs';

const packet = {
  symbol: 'btcusdt',
  bookTicker: {
    bid_price: '100.00',
    ask_price: '100.02',
  },
  depth: {
    bids: [
      { price: '100.00', quantity: '100' },
      { price: '99.99', quantity: '100' },
      { price: '99.98', quantity: '100' },
      { price: '99.97', quantity: '100' },
      { price: '99.96', quantity: '100' },
    ],
    asks: [
      { p: '100.02', q: '100' },
      { p: '100.03', q: '100' },
      { p: '100.04', q: '100' },
      { p: '100.05', q: '100' },
      { p: '100.06', q: '100' },
    ],
  },
  klines: [
    { open_time: 1000, open: '99.95', high: '100.10', low: '99.90', close: '100.00' },
    { open_time: 2000, open: '100.00', high: '100.08', low: '99.98', close: '100.05' },
  ],
  server_time: { server_time_ms: 3000 },
};

const { snapshot, snapshot_hash } = normalizeBinanceMcpObservation(packet);
assert.equal(snapshot.snapshot_version, 'valid-until.market.v1');
assert.equal(snapshot.symbol, 'BTCUSDT');
assert.equal(snapshot.server_time_ms, 3000);
assert.equal(snapshot.best_bid, 100);
assert.equal(snapshot.best_ask, 100.02);
assert.equal(snapshot.mid, 100.01);
assert.equal(snapshot.spread_bps, 1.99980002);
assert.equal(snapshot.top5_bid_depth_usdt, 49990);
assert.equal(snapshot.top5_ask_depth_usdt, 50020);
assert.equal(snapshot.last_1m_return_bps, 5);
assert.match(snapshot.source, /Binance Agent OS MCP/);
assert.ok(snapshot_hash);

assert.throws(
  () => normalizeBinanceMcpObservation({ ...packet, depth: { bids: [], asks: [] } }),
  /must not be empty|depth must contain/,
);

assert.throws(
  () => normalizeBinanceMcpObservation({ ...packet, bookTicker: { bidPrice: 'not-a-number', askPrice: '100.02' } }),
  /must be finite/,
);

assert.throws(
  () => normalizeBinanceMcpObservation({ ...packet, klines: [packet.klines[0]] }),
  /at least two bars/,
);

console.log('PASS MCP observation adapter 4/4');
