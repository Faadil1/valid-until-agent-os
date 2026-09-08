import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { normalizeMarketPayloads, normalizeSymbol } from '../api/live-market.mjs';
import { buildSignedOrderQuery, signQuery, sanitizeKnownOrder, verifyKnownOrder } from '../api/order-status.mjs';

let passed = 0;

const market = normalizeMarketPayloads({
  symbol: 'BTCUSDT',
  book: { bidPrice: '100.00', askPrice: '100.10' },
  depth: {
    bids: [['100.00','2'],['99.90','1'],['99.80','1'],['99.70','1'],['99.60','1']],
    asks: [['100.10','2'],['100.20','1'],['100.30','1'],['100.40','1'],['100.50','1']],
  },
  klines: [
    [0,0,0,0,'99.00'],
    [0,0,0,0,'100.00'],
  ],
  time: { serverTime: 1234567890 },
});
assert.equal(market.symbol, 'BTCUSDT');
assert.equal(market.best_bid, 100);
assert.equal(market.best_ask, 100.1);
assert.ok(market.spread_bps > 0);
assert.ok(market.top5_bid_depth_usdt > 0);
assert.ok(market.top5_ask_depth_usdt > 0);
passed++;

assert.equal(normalizeSymbol('btcusdt'), 'BTCUSDT');
assert.equal(normalizeSymbol('../mainnet'), null);
passed++;

const query = buildSignedOrderQuery({
  symbol: 'BTCUSDT',
  clientOrderId: 'vu-mtswxiik-ecb6b093',
  timestamp: 1234567890,
  recvWindow: 5000,
});
assert.equal(query, 'symbol=BTCUSDT&origClientOrderId=vu-mtswxiik-ecb6b093&recvWindow=5000&timestamp=1234567890');
passed++;

const secret = 'unit-test-secret';
assert.equal(signQuery(secret, query), createHmac('sha256', secret).update(query).digest('hex'));
passed++;

const sanitized = sanitizeKnownOrder({
  symbol: 'BTCUSDT',
  orderId: 13634770,
  clientOrderId: 'vu-mtswxiik-ecb6b093',
  status: 'FILLED',
  executedQty: '0.00012000',
  cummulativeQuoteQty: '9.44492520',
  secretField: 'must-not-survive',
});
assert.equal(sanitized.secretField, undefined);
assert.equal(verifyKnownOrder(sanitized), true);
passed++;

assert.equal(verifyKnownOrder({ ...sanitized, clientOrderId: 'different' }), false);
passed++;

console.log(`PASS Vercel proof API ${passed}/6 - live market normalization, fixed signed order target, sanitization and identity checks`);
