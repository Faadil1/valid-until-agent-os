import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error('usage: node scripts/sanitize-testnet-proof.mjs <raw.json> <public.json>');
}

const rawBytes = readFileSync(inputPath);
const raw = JSON.parse(rawBytes.toString('utf8'));

if (raw.environment !== 'BINANCE_SPOT_TESTNET_ONLY') {
  throw new Error(`unexpected execution environment: ${raw.environment}`);
}
if (raw.execution?.target && raw.execution.target !== 'https://testnet.binance.vision') {
  throw new Error(`unexpected execution target: ${raw.execution.target}`);
}
if (!raw.proposed_action || raw.proposed_action.side !== 'BUY') {
  throw new Error('public proof requires an explicit BUY testnet action');
}
if (!Number.isFinite(Number(raw.proposed_action.notional_usdt)) || Number(raw.proposed_action.notional_usdt) > 25) {
  throw new Error('public proof action exceeds hard testnet cap');
}

const receipt = raw.receipt ?? raw.eligibility_receipt ?? null;
const finalSnapshot = raw.final_snapshot ?? raw.revalidation_snapshot ?? null;
const nextState = raw.next_state ?? raw.validity_result?.next_state ?? null;
const order = safeOrder(raw.execution?.order_response);
const verified = safeOrder(raw.execution?.verification_response);
const orderSent = raw.execution?.order_sent === true;
const sameOrderVerified = orderSent
  ? Boolean(
      order?.orderId !== undefined &&
      verified?.orderId !== undefined &&
      String(order.orderId) === String(verified.orderId) &&
      order?.clientOrderId &&
      verified?.clientOrderId &&
      order.clientOrderId === verified.clientOrderId &&
      order.clientOrderId === raw.execution?.client_order_id
    )
  : false;

if (orderSent && !sameOrderVerified) {
  throw new Error('testnet order was sent but same-order verification did not match');
}
if (!orderSent && raw.validity_result?.status === 'ALLOW') {
  throw new Error('ALLOW without a sent testnet order is not publishable evidence');
}
if (orderSent && raw.validity_result?.status !== 'ALLOW') {
  throw new Error('testnet order cannot be published unless Valid Until returned ALLOW');
}

const publicProof = {
  schema: 'valid-until.public-testnet-proof.v1',
  proof_class: 'AUTHENTICATED_BINANCE_SPOT_TESTNET_EXECUTION_EVIDENCE',
  production: false,
  real_funds: false,
  network: 'Binance Spot Testnet',
  endpoint: 'https://testnet.binance.vision',
  captured_at: new Date().toISOString(),
  capture: {
    source: raw.capture_source ?? process.env.VALID_UNTIL_CAPTURE_SOURCE ?? null,
    local_actual_location: (raw.capture_source ?? process.env.VALID_UNTIL_CAPTURE_SOURCE ?? '').includes('LOCAL_ACTUAL_LOCATION'),
    transport: (raw.capture_source ?? '').includes('NATIVE_NODE_HTTPS_HMAC') ? 'NATIVE_NODE_HTTPS_HMAC' : null,
  },
  workflow: {
    run_id: stringOrNull(process.env.GITHUB_RUN_ID),
    run_attempt: stringOrNull(process.env.GITHUB_RUN_ATTEMPT),
    source_sha: stringOrNull(process.env.GITHUB_SHA) ?? stringOrNull(process.env.VALID_UNTIL_SOURCE_SHA) ?? stringOrNull(raw.source_sha),
    repository: stringOrNull(process.env.GITHUB_REPOSITORY),
    cycle_attempt: numberOrNull(process.env.VALID_UNTIL_PROOF_CYCLE),
  },
  action: {
    symbol: raw.proposed_action.symbol,
    side: raw.proposed_action.side,
    notional_usdt: Number(raw.proposed_action.notional_usdt),
  },
  decision_contract: {
    decision_id: receipt?.decision_id ?? null,
    policy_hash: receipt?.policy_hash ?? null,
    snapshot_hash: receipt?.snapshot_hash ?? null,
    action_hash: receipt?.action_hash ?? null,
    receipt_version: receipt?.receipt_version ?? receipt?.version ?? null,
    t0_mid: numberOrNull(raw.initial_snapshot?.mid),
    t1_mid: numberOrNull(finalSnapshot?.mid),
    validity_status: raw.validity_result?.status ?? null,
    next_state: nextState,
    failed_checks: failedChecks(raw.validity_result),
  },
  execution: {
    order_sent: orderSent,
    execution_status: raw.execution?.execution_status ?? null,
    client_order_id: orderSent ? raw.execution?.client_order_id ?? null : null,
    order,
    verification: verified,
    same_order_verified: sameOrderVerified,
    uncertain_transport_recovered: raw.execution?.uncertain_transport_recovered === true,
    block_zero_write: !orderSent && raw.validity_result?.status === 'BLOCK',
  },
  evidence: {
    raw_capture_sha256: sha256(rawBytes),
    statement: orderSent
      ? 'Valid Until returned ALLOW; the exact bounded action was submitted to Binance Spot Testnet and the same order was queried back.'
      : 'Valid Until returned BLOCK; the Binance Spot Testnet executor was not invoked.',
    boundary: 'NON-PRODUCTION TESTNET. NO REAL FUNDS. NOT A PROFITABILITY OR SAFETY CLAIM.',
  },
};

const serialized = JSON.stringify(publicProof, null, 2) + '\n';
publicProof.evidence.public_proof_sha256 = sha256(Buffer.from(serialized));
writeFileSync(outputPath, JSON.stringify(publicProof, null, 2) + '\n');

console.log(JSON.stringify({
  status: 'SANITIZED_PUBLIC_PROOF_WRITTEN',
  validity: publicProof.decision_contract.validity_status,
  order_sent: publicProof.execution.order_sent,
  same_order_verified: publicProof.execution.same_order_verified,
  capture_source: publicProof.capture.source,
  output: outputPath,
}));

function safeOrder(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const allowed = [
    'symbol', 'orderId', 'clientOrderId', 'transactTime', 'executedQty',
    'cummulativeQuoteQty', 'status', 'type', 'side'
  ];
  return Object.fromEntries(allowed.filter((key) => value[key] !== undefined).map((key) => [key, value[key]]));
}

function failedChecks(result) {
  if (!result || typeof result !== 'object') return [];
  const rows = Array.isArray(result.checks) ? result.checks : [];
  return rows
    .filter((row) => row && row.pass === false)
    .map((row) => ({
      check: row.check ?? row.name ?? null,
      actual: scalar(row.actual),
      limit: scalar(row.limit),
    }));
}

function scalar(value) {
  return ['string', 'number', 'boolean'].includes(typeof value) ? value : null;
}

function stringOrNull(value) {
  return value ? String(value) : null;
}

function numberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}
