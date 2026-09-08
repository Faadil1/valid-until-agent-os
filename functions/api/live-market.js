const TESTNET_BASE = 'https://testnet.binance.vision';
const DEFAULT_SYMBOL = 'BTCUSDT';

export async function onRequest(context) {
  const { request } = context;
  if (request.method !== 'GET') {
    return json({ status: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'GET' });
  }

  const url = new URL(request.url);
  const symbol = normalizeSymbol(url.searchParams.get('symbol') || DEFAULT_SYMBOL);
  if (!symbol) return json({ status: 'INVALID_SYMBOL' }, 400);

  try {
    const [book, depth, klines, time] = await Promise.all([
      getJson(`${TESTNET_BASE}/api/v3/ticker/bookTicker?symbol=${encodeURIComponent(symbol)}`),
      getJson(`${TESTNET_BASE}/api/v3/depth?symbol=${encodeURIComponent(symbol)}&limit=5`),
      getJson(`${TESTNET_BASE}/api/v3/klines?symbol=${encodeURIComponent(symbol)}&interval=1m&limit=2`),
      getJson(`${TESTNET_BASE}/api/v3/time`),
    ]);

    const snapshot = normalizeMarketPayloads({ symbol, book, depth, klines, time });
    return json({
      status: 'LIVE',
      evidence_class: 'LIVE',
      production: false,
      real_funds: false,
      network: 'Binance Spot Testnet',
      endpoint: TESTNET_BASE,
      captured_at: new Date().toISOString(),
      snapshot,
      boundary: 'PUBLIC MARKET OBSERVATION ONLY. NO AUTHENTICATED ACCOUNT CALL. NO FINANCIAL WRITE.',
    });
  } catch (error) {
    const classified = classifyVenueError(error);
    return json({
      status: classified.status,
      evidence_class: 'LIVE',
      production: false,
      real_funds: false,
      network: 'Binance Spot Testnet',
      endpoint: TESTNET_BASE,
      boundary: 'FAIL-CLOSED LIVE OBSERVATION. NO FALLBACK ENDPOINT OR GEOGRAPHIC BYPASS.',
    }, classified.http);
  }
}

export function normalizeMarketPayloads({ symbol, book, depth, klines, time }) {
  if (!book || !depth || !Array.isArray(klines) || !time) throw new Error('INVALID_MARKET_PAYLOAD');
  if (!Array.isArray(depth.bids) || !Array.isArray(depth.asks) || depth.bids.length < 1 || depth.asks.length < 1) {
    throw new Error('INVALID_DEPTH_PAYLOAD');
  }
  if (klines.length < 2) throw new Error('INVALID_KLINE_PAYLOAD');

  const bid = finite(book.bidPrice, 'bidPrice');
  const ask = finite(book.askPrice, 'askPrice');
  const serverTime = finite(time.serverTime, 'serverTime');
  if (bid <= 0 || ask <= 0 || ask < bid) throw new Error('INVALID_BOOK');

  const mid = (bid + ask) / 2;
  const spreadBps = ((ask - bid) / mid) * 10000;
  const top5BidDepth = depth.bids.slice(0, 5).reduce((sum, row) => sum + notional(row), 0);
  const top5AskDepth = depth.asks.slice(0, 5).reduce((sum, row) => sum + notional(row), 0);
  const previousClose = finite(klines.at(-2)?.[4], 'previousClose');
  const latestClose = finite(klines.at(-1)?.[4], 'latestClose');
  const returnBps = ((latestClose - previousClose) / previousClose) * 10000;

  return {
    symbol,
    server_time_ms: serverTime,
    best_bid: round(bid),
    best_ask: round(ask),
    mid: round(mid),
    spread_bps: round(spreadBps),
    top5_bid_depth_usdt: round(top5BidDepth),
    top5_ask_depth_usdt: round(top5AskDepth),
    last_1m_return_bps: round(returnBps),
  };
}

export function normalizeSymbol(value) {
  const symbol = String(value || '').trim().toUpperCase();
  return /^[A-Z0-9]{5,20}$/.test(symbol) ? symbol : null;
}

async function getJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'valid-until-live-proof-lab-cloudflare/0.4' },
      signal: controller.signal,
      cache: 'no-store',
    });
    const text = await response.text();
    if (!response.ok) {
      const error = new Error(`BINANCE_HTTP_${response.status}`);
      error.statusCode = response.status;
      error.body = text.slice(0, 500);
      throw error;
    }
    return JSON.parse(text);
  } finally {
    clearTimeout(timer);
  }
}

function classifyVenueError(error) {
  const combined = `${error?.message || ''} ${error?.body || ''}`;
  if (/restricted location|eligibility|service unavailable from a restricted location/i.test(combined)) {
    return { status: 'VENUE_ELIGIBILITY_UNAVAILABLE', http: 503 };
  }
  if (/abort|timeout/i.test(combined)) return { status: 'LIVE_MARKET_TIMEOUT', http: 504 };
  return { status: 'LIVE_MARKET_UNAVAILABLE', http: 503 };
}

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`INVALID_${label}`);
  return number;
}

function notional(row) {
  if (!Array.isArray(row) || row.length < 2) throw new Error('INVALID_DEPTH_ROW');
  return finite(row[0], 'depthPrice') * finite(row[1], 'depthQty');
}

function round(value) {
  return Math.round(value * 1e8) / 1e8;
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

export { TESTNET_BASE, DEFAULT_SYMBOL };
