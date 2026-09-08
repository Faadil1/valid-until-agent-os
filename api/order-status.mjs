import { createHmac } from 'node:crypto';

const TESTNET_BASE = 'https://testnet.binance.vision';
const KNOWN_ORDER = Object.freeze({
  symbol: 'BTCUSDT',
  orderId: 13634770,
  clientOrderId: 'vu-mtswxiik-ecb6b093',
});

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ status: 'METHOD_NOT_ALLOWED' });
  }

  const apiKey = String(process.env.BINANCE_TESTNET_API_KEY || '').trim();
  const apiSecret = String(process.env.BINANCE_TESTNET_API_SECRET || '').trim();

  if (!apiKey || !apiSecret) {
    return res.status(503).json({
      status: 'SERVER_CREDENTIALS_NOT_CONFIGURED',
      evidence_class: 'LIVE_SIGNED_READ',
      production: false,
      real_funds: false,
      network: 'Binance Spot Testnet',
      boundary: 'SERVER-SIDE SIGNED READ IS DISABLED UNTIL VERCEL SENSITIVE ENVIRONMENT VARIABLES ARE CONFIGURED.',
    });
  }

  try {
    const serverTime = await fetchServerTime();
    const query = buildSignedOrderQuery({
      symbol: KNOWN_ORDER.symbol,
      clientOrderId: KNOWN_ORDER.clientOrderId,
      timestamp: serverTime,
      recvWindow: 5000,
    });
    const signature = signQuery(apiSecret, query);
    const url = `${TESTNET_BASE}/api/v3/order?${query}&signature=${signature}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-MBX-APIKEY': apiKey,
        'User-Agent': 'valid-until-live-proof-lab/0.4',
      },
      cache: 'no-store',
    });
    const text = await response.text();

    if (!response.ok) {
      const classified = classifySignedReadFailure(response.status, text);
      return res.status(classified.http).json({
        status: classified.status,
        evidence_class: 'LIVE_SIGNED_READ',
        production: false,
        real_funds: false,
        network: 'Binance Spot Testnet',
        boundary: classified.boundary,
      });
    }

    const raw = JSON.parse(text);
    const order = sanitizeKnownOrder(raw);
    const matches = verifyKnownOrder(order);
    if (!matches) {
      return res.status(502).json({
        status: 'KNOWN_ORDER_MISMATCH',
        evidence_class: 'LIVE_SIGNED_READ',
        production: false,
        real_funds: false,
        network: 'Binance Spot Testnet',
        expected: { symbol: KNOWN_ORDER.symbol, orderId: KNOWN_ORDER.orderId, clientOrderId: KNOWN_ORDER.clientOrderId },
        observed: order,
        boundary: 'SIGNED READ RETURNED A DIFFERENT ORDER IDENTITY; RESULT IS FAIL-CLOSED.',
      });
    }

    return res.status(200).json({
      status: 'LIVE_SIGNED_READ_VERIFIED',
      evidence_class: 'LIVE_SIGNED_READ',
      production: false,
      real_funds: false,
      network: 'Binance Spot Testnet',
      endpoint: TESTNET_BASE,
      checked_at: new Date().toISOString(),
      order,
      same_order_verified: true,
      boundary: 'SIGNED GET OF THE ALREADY-KNOWN TESTNET ORDER ONLY. NO NEW ORDER WAS CREATED.',
    });
  } catch (error) {
    const classified = classifyRuntimeFailure(error);
    return res.status(classified.http).json({
      status: classified.status,
      evidence_class: 'LIVE_SIGNED_READ',
      production: false,
      real_funds: false,
      network: 'Binance Spot Testnet',
      boundary: classified.boundary,
    });
  }
}

export function buildSignedOrderQuery({ symbol, clientOrderId, timestamp, recvWindow = 5000 }) {
  const params = new URLSearchParams();
  params.set('symbol', symbol);
  params.set('origClientOrderId', clientOrderId);
  params.set('recvWindow', String(recvWindow));
  params.set('timestamp', String(timestamp));
  return params.toString();
}

export function signQuery(secret, query) {
  return createHmac('sha256', secret).update(query).digest('hex');
}

export function sanitizeKnownOrder(order) {
  if (!order || typeof order !== 'object' || Array.isArray(order)) throw new Error('INVALID_ORDER_PAYLOAD');
  const allowed = [
    'symbol', 'orderId', 'clientOrderId', 'price', 'origQty', 'executedQty',
    'origQuoteOrderQty', 'cummulativeQuoteQty', 'status', 'timeInForce', 'type', 'side',
    'time', 'updateTime', 'workingTime', 'selfTradePreventionMode'
  ];
  return Object.fromEntries(allowed.filter((key) => order[key] !== undefined).map((key) => [key, order[key]]));
}

export function verifyKnownOrder(order) {
  return Boolean(
    order &&
    order.symbol === KNOWN_ORDER.symbol &&
    Number(order.orderId) === KNOWN_ORDER.orderId &&
    order.clientOrderId === KNOWN_ORDER.clientOrderId
  );
}

async function fetchServerTime() {
  const response = await fetch(`${TESTNET_BASE}/api/v3/time`, {
    method: 'GET',
    headers: { 'User-Agent': 'valid-until-live-proof-lab/0.4' },
    cache: 'no-store',
  });
  const text = await response.text();
  if (!response.ok) {
    const error = new Error(`TIME_HTTP_${response.status}`);
    error.statusCode = response.status;
    error.body = text.slice(0, 500);
    throw error;
  }
  const data = JSON.parse(text);
  const serverTime = Number(data?.serverTime);
  if (!Number.isFinite(serverTime)) throw new Error('INVALID_SERVER_TIME');
  return serverTime;
}

function classifyRuntimeFailure(error) {
  const combined = `${error?.message || ''} ${error?.body || ''}`;
  if (/restricted location|eligibility|service unavailable from a restricted location/i.test(combined)) {
    return {
      status: 'VENUE_ELIGIBILITY_UNAVAILABLE',
      http: 503,
      boundary: 'VENUE REFUSED THIS SERVER LOCATION. NO BYPASS OR FALLBACK WAS ATTEMPTED. NO NEW ORDER WAS CREATED.',
    };
  }
  if (/abort|timeout/i.test(combined)) {
    return {
      status: 'SIGNED_READ_TIMEOUT',
      http: 504,
      boundary: 'FAIL-CLOSED SIGNED READ TIMEOUT. NO NEW ORDER WAS CREATED.',
    };
  }
  return {
    status: 'SIGNED_READ_UNAVAILABLE',
    http: 503,
    boundary: 'FAIL-CLOSED SIGNED READ. NO NEW ORDER WAS CREATED.',
  };
}

function classifySignedReadFailure(statusCode, body) {
  const text = String(body || '');
  if (/restricted location|eligibility|service unavailable from a restricted location/i.test(text)) {
    return {
      status: 'VENUE_ELIGIBILITY_UNAVAILABLE',
      http: 503,
      boundary: 'VENUE REFUSED THIS SERVER LOCATION. NO BYPASS OR FALLBACK WAS ATTEMPTED.',
    };
  }
  if (/invalid api-key|signature|permissions|api-key format/i.test(text)) {
    return {
      status: 'AUTH_OR_PERMISSION_ERROR',
      http: 502,
      boundary: 'SERVER-SIDE TESTNET CREDENTIALS COULD NOT COMPLETE THE SIGNED READ. NO SECRET DETAIL IS RETURNED.',
    };
  }
  return {
    status: `BINANCE_SIGNED_READ_HTTP_${statusCode}`,
    http: 502,
    boundary: 'BINANCE SIGNED READ FAILED CLOSED. NO NEW ORDER WAS CREATED.',
  };
}

export { TESTNET_BASE, KNOWN_ORDER };
