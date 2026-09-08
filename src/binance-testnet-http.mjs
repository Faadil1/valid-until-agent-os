import { createHmac, randomBytes } from 'node:crypto';
import { normalize } from './snapshot.mjs';

export const TESTNET_BASE = 'https://testnet.binance.vision';
const RECV_WINDOW = 5000;

export class BinanceTestnetError extends Error {
  constructor(message, { status = null, code = null, kind = 'api' } = {}) {
    super(message);
    this.name = 'BinanceTestnetError';
    this.status = status;
    this.code = code;
    this.kind = kind;
  }
}

export async function captureWithNativeSpotTestnet(symbol, fetcher = fetch) {
  const [book, depth, klines, time] = await Promise.all([
    publicGet('/api/v3/ticker/bookTicker', { symbol }, fetcher),
    publicGet('/api/v3/depth', { symbol, limit: 5 }, fetcher),
    publicGet('/api/v3/klines', { symbol, interval: '1m', limit: 2 }, fetcher),
    publicGet('/api/v3/time', {}, fetcher),
  ]);
  return normalize({
    symbol,
    book,
    depth,
    klines,
    time,
    source: 'Binance official Spot Testnet via native HTTPS/HMAC transport',
  });
}

export async function checkAuthenticatedAccount({ apiKey, secret, fetcher = fetch }) {
  const serverTime = await getServerTime(fetcher);
  return signedRequest('GET', '/api/v3/account', {}, { apiKey, secret, fetcher, serverTime });
}

export async function placeMarketBuy({ symbol, notionalUsdt, clientOrderId, apiKey, secret, fetcher = fetch }) {
  if (!/^[A-Z0-9]{5,20}$/.test(String(symbol || ''))) throw new Error('invalid symbol');
  if (!Number.isFinite(Number(notionalUsdt)) || Number(notionalUsdt) <= 0 || Number(notionalUsdt) > 25) {
    throw new Error('testnet notional must be > 0 and <= 25 USDT');
  }
  if (!/^vu-[A-Za-z0-9_-]{4,32}$/.test(String(clientOrderId || ''))) throw new Error('invalid clientOrderId');
  const serverTime = await getServerTime(fetcher);
  return signedRequest('POST', '/api/v3/order', {
    symbol,
    side: 'BUY',
    type: 'MARKET',
    quoteOrderQty: String(notionalUsdt),
    newClientOrderId: clientOrderId,
    newOrderRespType: 'FULL',
  }, { apiKey, secret, fetcher, serverTime });
}

export async function queryOrderByClientId({ symbol, clientOrderId, apiKey, secret, fetcher = fetch }) {
  const serverTime = await getServerTime(fetcher);
  return signedRequest('GET', '/api/v3/order', {
    symbol,
    origClientOrderId: clientOrderId,
  }, { apiKey, secret, fetcher, serverTime });
}

export function makeClientOrderId() {
  return `vu-${Date.now().toString(36)}-${randomBytes(4).toString('hex')}`.slice(0, 36);
}

export async function publicGet(path, params = {}, fetcher = fetch) {
  const url = buildUrl(path, params);
  return jsonFetch(url, { method: 'GET' }, fetcher);
}

export async function signedRequest(method, path, params, { apiKey, secret, fetcher = fetch, serverTime }) {
  if (!apiKey || !secret) throw new Error('Binance Spot Testnet credentials are required');
  if (!Number.isFinite(Number(serverTime))) throw new Error('serverTime is required for signed request');
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (value !== undefined && value !== null) query.set(key, String(value));
  }
  query.set('recvWindow', String(RECV_WINDOW));
  query.set('timestamp', String(Math.trunc(Number(serverTime))));
  const signature = createHmac('sha256', secret).update(query.toString()).digest('hex');
  query.set('signature', signature);
  const url = `${TESTNET_BASE}${path}?${query.toString()}`;
  return jsonFetch(url, {
    method,
    headers: { 'X-MBX-APIKEY': apiKey },
  }, fetcher);
}

async function getServerTime(fetcher) {
  const time = await publicGet('/api/v3/time', {}, fetcher);
  const value = Number(time?.serverTime);
  if (!Number.isFinite(value)) throw new BinanceTestnetError('invalid Spot Testnet server time', { kind: 'protocol' });
  return value;
}

async function jsonFetch(url, init, fetcher) {
  let response;
  try {
    response = await fetcher(url, init);
  } catch (error) {
    throw new BinanceTestnetError(`Spot Testnet transport error: ${error?.message || 'network failure'}`, { kind: 'transport' });
  }
  let body = null;
  try { body = await response.json(); } catch { /* handled below */ }
  if (!response.ok) {
    const code = body && typeof body === 'object' ? body.code ?? null : null;
    const msg = body && typeof body === 'object' ? body.msg ?? `HTTP ${response.status}` : `HTTP ${response.status}`;
    throw new BinanceTestnetError(`Binance Spot Testnet rejected request: ${msg}`, {
      status: response.status,
      code,
      kind: response.status === 451 ? 'eligibility' : 'api',
    });
  }
  if (body === null) throw new BinanceTestnetError('Binance Spot Testnet returned non-JSON response', { status: response.status, kind: 'protocol' });
  return body;
}

function buildUrl(path, params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (value !== undefined && value !== null) query.set(key, String(value));
  }
  return `${TESTNET_BASE}${path}${query.size ? `?${query.toString()}` : ''}`;
}
