import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sealPolicy, evaluateInitialDecision, normalizeAction, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt, publicKeyPem } from './receipt.mjs';
import {
  TESTNET_BASE,
  BinanceTestnetError,
  captureWithNativeSpotTestnet,
  checkAuthenticatedAccount,
  placeMarketBuy,
  queryOrderByClientId,
  makeClientOrderId,
} from './binance-testnet-http.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const symbol = (process.argv[2] || 'BTCUSDT').toUpperCase();
const delayMs = Number(process.env.VALID_UNTIL_RECHECK_MS || 750);
const confirmation = String(process.env.VALID_UNTIL_TESTNET_WRITE || '').trim();
const apiKey = String(process.env.BINANCE_API_KEY || '').trim();
const secret = String(process.env.BINANCE_SECRET_KEY || '').trim();
const sourceSha = String(process.env.VALID_UNTIL_SOURCE_SHA || '').trim() || null;

if (!apiKey || !secret) throw new Error('BINANCE_API_KEY and BINANCE_SECRET_KEY are required');
if (process.env.BINANCE_API_ENV && process.env.BINANCE_API_ENV !== 'testnet') throw new Error('BINANCE_API_ENV must be testnet');
if (!Number.isFinite(delayMs) || delayMs < 0 || delayMs > 4000) throw new Error('VALID_UNTIL_RECHECK_MS must be between 0 and 4000');

const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/policy.example.json'), 'utf8'));
policy.symbol = symbol;
const proposedAction = normalizeAction({
  symbol,
  side: 'BUY',
  notional_usdt: Number(process.env.VALID_UNTIL_ACTION_NOTIONAL_USDT || 10),
});
if (proposedAction.notional_usdt > 25) throw new Error('native testnet proof hard cap is 25 USDT');

// Eligibility/authentication check. Account payload is deliberately discarded.
await checkAuthenticatedAccount({ apiKey, secret });

const sealed = sealPolicy(policy);
const first = await captureWithNativeSpotTestnet(symbol);
const evaluation = evaluateInitialDecision(sealed.policy, first.snapshot, proposedAction);
const signer = createDemoSigner();
const receipt = issueReceipt({
  policy: sealed.policy,
  policyHash: sealed.policy_hash,
  snapshot: first.snapshot,
  snapshotHash: first.snapshot_hash,
  evaluation,
  signer,
  proposedAction,
});
const signatureValid = verifyReceipt(receipt, signer.publicKey);

await new Promise((resolve) => setTimeout(resolve, delayMs));
const current = await captureWithNativeSpotTestnet(symbol);
const validityResult = revalidate({
  policy: sealed.policy,
  receipt,
  initialSnapshot: first.snapshot,
  currentSnapshot: current.snapshot,
  receiptSignatureValid: signatureValid,
  proposedAction,
});

let execution = {
  execution_status: 'NOT_SENT',
  reason: validityResult.status === 'BLOCK' ? 'VALID_UNTIL_BLOCKED' : 'WRITE_CONFIRMATION_REQUIRED',
  target: TESTNET_BASE,
  order_sent: false,
};

if (validityResult.status === 'ALLOW') {
  if (confirmation !== 'CONFIRM_TESTNET_WRITE') {
    throw new Error('ALLOW reached but VALID_UNTIL_TESTNET_WRITE is not CONFIRM_TESTNET_WRITE');
  }
  const clientOrderId = makeClientOrderId();
  let order = null;
  let uncertainTransportRecovered = false;
  try {
    order = await placeMarketBuy({
      symbol: proposedAction.symbol,
      notionalUsdt: proposedAction.notional_usdt,
      clientOrderId,
      apiKey,
      secret,
    });
  } catch (error) {
    // Never retry the POST. Only recover by querying the exact same clientOrderId
    // when the transport failed and acceptance is therefore uncertain.
    if (error instanceof BinanceTestnetError && error.kind === 'transport') {
      try {
        order = await queryOrderByClientId({ symbol: proposedAction.symbol, clientOrderId, apiKey, secret });
        uncertainTransportRecovered = true;
      } catch {
        throw error;
      }
    } else {
      throw error;
    }
  }
  const verified = await queryOrderByClientId({
    symbol: proposedAction.symbol,
    clientOrderId,
    apiKey,
    secret,
  });
  if (String(order?.orderId ?? '') !== String(verified?.orderId ?? '')) throw new Error('same-order verification failed: orderId mismatch');
  if (String(order?.clientOrderId ?? '') !== clientOrderId || String(verified?.clientOrderId ?? '') !== clientOrderId) {
    throw new Error('same-order verification failed: clientOrderId mismatch');
  }
  execution = {
    execution_status: uncertainTransportRecovered ? 'TESTNET_ORDER_RECOVERED_AND_QUERIED' : 'TESTNET_ORDER_SENT_AND_QUERIED',
    target: TESTNET_BASE,
    order_sent: true,
    client_order_id: clientOrderId,
    uncertain_transport_recovered: uncertainTransportRecovered,
    order_response: sanitizeOrder(order),
    verification_response: sanitizeOrder(verified),
  };
}

console.log(JSON.stringify({
  mode: 'LIVE_BINANCE_SPOT_TESTNET_EXECUTION_PROOF_NATIVE',
  environment: 'BINANCE_SPOT_TESTNET_ONLY',
  capture_source: 'LOCAL_ACTUAL_LOCATION_NATIVE_NODE_HTTPS_HMAC',
  source_sha: sourceSha,
  sealed_policy: sealed,
  proposed_action: proposedAction,
  initial_snapshot: first.snapshot,
  initial_snapshot_hash: first.snapshot_hash,
  receipt,
  public_key_pem: publicKeyPem(signer.publicKey),
  final_snapshot: current.snapshot,
  final_snapshot_hash: current.snapshot_hash,
  validity_result: validityResult,
  next_state: validityResult.next_state,
  execution,
  claim_boundary: 'Official Binance Spot Testnet only. Non-production assets. No real funds. Not a profitability or production-safety claim.',
}, null, 2));

function sanitizeOrder(order) {
  if (!order || typeof order !== 'object') return order;
  const allowed = [
    'symbol', 'orderId', 'orderListId', 'clientOrderId', 'transactTime', 'price',
    'origQty', 'executedQty', 'origQuoteOrderQty', 'cummulativeQuoteQty', 'status',
    'timeInForce', 'type', 'side', 'workingTime', 'selfTradePreventionMode'
  ];
  return Object.fromEntries(allowed.filter((key) => order[key] !== undefined).map((key) => [key, order[key]]));
}
