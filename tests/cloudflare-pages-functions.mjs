import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  onRequest as liveMarketRequest,
  normalizeMarketPayloads,
  normalizeSymbol,
} from '../functions/api/live-market.js';
import {
  onRequest as orderStatusRequest,
  buildSignedOrderQuery,
  signQuery,
  sanitizeKnownOrder,
  verifyKnownOrder,
  KNOWN_ORDER,
} from '../functions/api/order-status.js';

let passed = 0;

function ok(condition, message) {
  assert.ok(condition, message);
  passed += 1;
}

ok(normalizeSymbol(' btcusdt ') === 'BTCUSDT', 'symbol normalization failed');
ok(normalizeSymbol('../../etc') === null, 'invalid symbol must fail');

const snapshot = normalizeMarketPayloads({
  symbol: 'BTCUSDT',
  book: { bidPrice: '100', askPrice: '100.1' },
  depth: {
    bids: [['100', '2'], ['99', '1']],
    asks: [['100.1', '2'], ['101', '1']],
  },
  klines: [[0, 0, 0, 0, '99'], [0, 0, 0, 0, '100']],
  time: { serverTime: 1234567890 },
});
ok(snapshot.mid === 100.05 && snapshot.top5_bid_depth_usdt === 299, 'market normalization failed');

const query = buildSignedOrderQuery({
  symbol: 'BTCUSDT',
  clientOrderId: 'vu-test',
  timestamp: 123456,
  recvWindow: 5000,
});
const expectedSig = createHmac('sha256', 'secret').update(query).digest('hex');
const actualSig = await signQuery('secret', query);
ok(actualSig === expectedSig, 'Web Crypto HMAC must match Node HMAC');

const sanitized = sanitizeKnownOrder({
  symbol: KNOWN_ORDER.symbol,
  orderId: KNOWN_ORDER.orderId,
  clientOrderId: KNOWN_ORDER.clientOrderId,
  status: 'FILLED',
  secretField: 'must-not-pass',
});
ok(sanitized.secretField === undefined && sanitized.status === 'FILLED', 'order sanitizer failed');
ok(verifyKnownOrder(sanitized) === true, 'known order verification failed');

const postMarket = await liveMarketRequest({ request: new Request('https://example.com/api/live-market', { method: 'POST' }) });
ok(postMarket.status === 405, 'live market must reject non-GET');

const postOrder = await orderStatusRequest({ request: new Request('https://example.com/api/order-status', { method: 'POST' }), env: {} });
ok(postOrder.status === 405, 'order status must reject non-GET');

const noSecretOrder = await orderStatusRequest({ request: new Request('https://example.com/api/order-status'), env: {} });
const noSecretBody = await noSecretOrder.json();
ok(noSecretOrder.status === 503 && noSecretBody.status === 'SERVER_CREDENTIALS_NOT_CONFIGURED', 'missing secrets must fail closed');

const orderSource = await readFile(new URL('../functions/api/order-status.js', import.meta.url), 'utf8');
ok(!orderSource.includes("method: 'POST'"), 'Cloudflare signed read must contain no POST call');
ok(!orderSource.includes('process.env'), 'Cloudflare function must use context.env, not process.env');

const routes = JSON.parse(await readFile(new URL('../web/_routes.json', import.meta.url), 'utf8'));
ok(routes.version === 1 && routes.include.length === 1 && routes.include[0] === '/api/*', 'Cloudflare routes must scope functions to /api/*');

console.log(`PASS Cloudflare Pages Functions ${passed}/${passed}`);
