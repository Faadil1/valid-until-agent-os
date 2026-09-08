import { execFileSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';

const TESTNET_BASE = 'https://testnet.binance.vision';

export function executeAllowedTestnetBuy({ validityResult, action, profile, confirmation, runner = runBinanceCli }) {
  if (validityResult?.status !== 'ALLOW') {
    return {
      execution_status: 'NOT_SENT',
      reason: 'VALID_UNTIL_BLOCKED',
      target: TESTNET_BASE,
      order_sent: false,
    };
  }
  if (!action || action.side !== 'BUY') throw new Error('testnet proof currently supports exact BUY actions only');
  if (!Number.isFinite(action.notional_usdt) || action.notional_usdt <= 0) throw new Error('action notional_usdt must be positive');
  if (action.notional_usdt > 25) throw new Error('testnet proof notional_usdt is hard-capped at 25');
  if (confirmation !== 'CONFIRM_TESTNET_WRITE') throw new Error('set VALID_UNTIL_TESTNET_WRITE=CONFIRM_TESTNET_WRITE to allow a testnet order');

  const clientOrderId = makeClientOrderId();
  const profileArgs = profile && typeof profile === 'string' ? ['--profile', profile] : [];
  const order = runner([
    'request', 'POST', `${TESTNET_BASE}/api/v3/order`, '--signed',
    '--symbol', action.symbol,
    '--side', 'BUY',
    '--type', 'MARKET',
    '--quoteOrderQty', String(action.notional_usdt),
    '--newClientOrderId', clientOrderId,
    '--newOrderRespType', 'FULL',
    ...profileArgs,
  ]);

  const verified = runner([
    'request', 'GET', `${TESTNET_BASE}/api/v3/order`, '--signed',
    '--symbol', action.symbol,
    '--origClientOrderId', clientOrderId,
    ...profileArgs,
  ]);

  return {
    execution_status: 'TESTNET_ORDER_SENT_AND_QUERIED',
    target: TESTNET_BASE,
    order_sent: true,
    client_order_id: clientOrderId,
    order_response: sanitizeOrder(order),
    verification_response: sanitizeOrder(verified),
  };
}

function runBinanceCli(args) {
  try {
    const out = execFileSync('binance-cli', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return JSON.parse(out);
  } catch (err) {
    const stderr = err?.stderr?.toString?.() || err.message;
    throw new Error(`binance-cli testnet execution failed: ${stderr.trim()}`);
  }
}

function makeClientOrderId() {
  const stamp = Date.now().toString(36);
  const suffix = randomBytes(4).toString('hex');
  return `vu-${stamp}-${suffix}`.slice(0, 36);
}

function sanitizeOrder(order) {
  if (!order || typeof order !== 'object') return order;
  const allowed = [
    'symbol', 'orderId', 'orderListId', 'clientOrderId', 'transactTime', 'price',
    'origQty', 'executedQty', 'origQuoteOrderQty', 'cummulativeQuoteQty', 'status',
    'timeInForce', 'type', 'side', 'workingTime', 'selfTradePreventionMode'
  ];
  return Object.fromEntries(allowed.filter((key) => order[key] !== undefined).map((key) => [key, order[key]]));
}

export { TESTNET_BASE };
