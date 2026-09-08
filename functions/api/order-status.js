const TESTNET_BASE = 'https://testnet.binance.vision';
const KNOWN_ORDER = Object.freeze({
  symbol: 'BTCUSDT',
  orderId: 13634770,
  clientOrderId: 'vu-mtswxiik-ecb6b093',
});

export async function onRequest(context) {
  const request = context.request;
  const env = context.env || {};
  if (request.method !== 'GET') {
    return json({ status: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'GET' });
  }

  const apiKey = String(env.BINANCE_TESTNET_API_KEY || '').trim();
  const apiSecret = String(env.BINANCE_TESTNET_API_SECRET || '').trim();

  if (!apiKey || !apiSecret) {
    return json({
      status: 'SERVER_CREDENTIALS_NOT_CONFIGURED',
      evidence_class: 'LIVE_SIGNED_READ',
      production: false,
      real_funds: false,
      network: 'Binance Spot Testnet',
      boundary: 'SERVER-SIDE SIGNED READ IS DISABLED UNTIL CLOUDFLARE SECRETS ARE CONFIGURED.',
    }, 503);
  }

  try {
    const serverTime = await fetchServerTime();
    const query = buildSignedOrderQuery({
      symbol: KNOWN_ORDER.symbol,
      clientOrderId: KNOWN_ORDER.clientOrderId,
      timestamp: serverTime,
      recvWindow: 5000,
    });
    const signature = await signQuery(apiSecret, query);
    const url = `${TESTNET_BASE}/api/v3/order?${query}&signature=${signature}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-MBX-APIKEY': apiKey,
        'User-Agent': 'valid-until-live-proof-lab-cloudflare/0.4',
      },
      cache: 'no-store',
    });
    const text = await response.text();

    if (!response.ok) {
      const classified = classifySignedReadFailure(response.status, text);
      return json({
        status: classified.status,
        evidence_class: 'LIVE_SIGNED_READ',
        production: false,
        real_funds: false,
        network: 'Binance Spot Testnet',
        boundary: classified.boundary,
      }, classified.http);
    }

    const raw = JSON.parse(text);
    const order = sanitizeKnownOrder(raw);
    if (!verifyKnownOrder(order)) {
      return json({
        status: 'KNOWN_ORDER_MISMATCH',
        evidence_class: 'LIVE_SIGNED_READ',
        production: false,
        real_funds: false,
        network: 'Binance Spot Testnet',
        expected: {
          symbol: KNOWN_ORDER.symbol,
          orderId: KNOWN_ORDER.orderId,
          clientOrderId: KNOWN_ORDER.clientOrderId,
        },
        observed: order,
        boundary: 'SIGNED READ RETURNED A DIFFERENT ORDER IDENTITY; RESULT IS FAIL-CLOSED.',
      }, 502);
    }

    return json({
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
    return json({
      status: /abort|timeout/i.test(String(error?.message || '')) ? 'SIGNED_READ_TIMEOUT' : 'SIGNED_READ_UNAVAILABLE',
      evidence_class: 'LIVE_SIGNED_READ',
      production: false,
      real_funds: false,
      network: 'Binance Spot Testnet',
      boundary: 'FAIL-CLOSED SIGNED READ. NO NEW ORDER WAS CREATED.',
    }, 503);
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

export async function signQuery(secret, query) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(query));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
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
    headers: { 'User-Agent': 'valid-until-live-proof-lab-cloudflare/0.4' },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`TIME_HTTP_${response.status}`);
  const data = await response.json();
  const serverTime = Number(data?.serverTime);
  if (!Number.isFinite(serverTime)) throw new Error('INVALID_SERVER_TIME');
  return serverTime;
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

export { TESTNET_BASE, KNOWN_ORDER };
