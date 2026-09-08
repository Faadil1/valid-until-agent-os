import assert from 'node:assert/strict';
import {
  TESTNET_BASE,
  publicGet,
  signedRequest,
  placeMarketBuy,
  queryOrderByClientId,
} from '../src/binance-testnet-http.mjs';

function response(body, status = 200) {
  return { ok: status >= 200 && status < 300, status, async json() { return body; } };
}

const calls = [];
const fetcher = async (url, init = {}) => {
  calls.push({ url: String(url), init });
  if (String(url).includes('/api/v3/time')) return response({ serverTime: 1234567890 });
  if (String(url).includes('/api/v3/order')) {
    return response({ symbol: 'BTCUSDT', orderId: 42, clientOrderId: 'vu-test-1234', status: 'FILLED', side: 'BUY', type: 'MARKET' });
  }
  return response({ ok: true });
};

const pub = await publicGet('/api/v3/time', {}, fetcher);
assert.equal(pub.serverTime, 1234567890);
assert.equal(calls[0].url, `${TESTNET_BASE}/api/v3/time`);

calls.length = 0;
await signedRequest('GET', '/api/v3/account', {}, {
  apiKey: 'public-key',
  secret: 'super-secret',
  fetcher,
  serverTime: 1234567890,
});
assert.equal(calls.length, 1);
assert.equal(calls[0].init.headers['X-MBX-APIKEY'], 'public-key');
assert.match(calls[0].url, /timestamp=1234567890/);
assert.match(calls[0].url, /signature=[a-f0-9]{64}/);
assert.ok(!calls[0].url.includes('super-secret'));

calls.length = 0;
const order = await placeMarketBuy({
  symbol: 'BTCUSDT',
  notionalUsdt: 10,
  clientOrderId: 'vu-test-1234',
  apiKey: 'public-key',
  secret: 'super-secret',
  fetcher,
});
assert.equal(order.orderId, 42);
const post = calls.find((c) => c.init.method === 'POST');
assert.ok(post);
assert.match(post.url, /quoteOrderQty=10/);
assert.match(post.url, /newClientOrderId=vu-test-1234/);

calls.length = 0;
const verified = await queryOrderByClientId({
  symbol: 'BTCUSDT',
  clientOrderId: 'vu-test-1234',
  apiKey: 'public-key',
  secret: 'super-secret',
  fetcher,
});
assert.equal(verified.clientOrderId, 'vu-test-1234');
assert.ok(calls.some((c) => c.url.includes('origClientOrderId=vu-test-1234')));

await assert.rejects(
  placeMarketBuy({ symbol: 'BTCUSDT', notionalUsdt: 26, clientOrderId: 'vu-test-1234', apiKey: 'k', secret: 's', fetcher }),
  /hard|<= 25|25 USDT/,
);

console.log('PASS native Spot Testnet transport 5/5');
