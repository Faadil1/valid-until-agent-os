import { sha256 } from './canonical.mjs';

export function sealPolicy(policy) {
  validatePolicy(policy);
  return {
    policy: structuredClone(policy),
    policy_hash: sha256(policy),
    sealed_at: new Date().toISOString(),
  };
}

function check(name, actual, op, limit, pass) {
  return { name, actual, op, limit, pass };
}

export function evaluateSnapshot(policy, snapshot) {
  const checks = [
    check('spread_bps', snapshot.spread_bps, '<=', policy.max_spread_bps, snapshot.spread_bps <= policy.max_spread_bps),
    check('abs_1m_return_bps', Math.abs(snapshot.last_1m_return_bps), '<=', policy.max_1m_return_abs_bps, Math.abs(snapshot.last_1m_return_bps) <= policy.max_1m_return_abs_bps),
    check('top5_bid_depth_usdt', snapshot.top5_bid_depth_usdt, '>=', policy.min_top5_depth_usdt, snapshot.top5_bid_depth_usdt >= policy.min_top5_depth_usdt),
    check('top5_ask_depth_usdt', snapshot.top5_ask_depth_usdt, '>=', policy.min_top5_depth_usdt, snapshot.top5_ask_depth_usdt >= policy.min_top5_depth_usdt),
  ];
  return { pass: checks.every((c) => c.pass), checks };
}

export function revalidate({ policy, receipt, initialSnapshot, currentSnapshot, receiptSignatureValid }) {
  const ageMs = currentSnapshot.server_time_ms - receipt.evaluated_at_ms;
  const driftBps = Math.abs((currentSnapshot.mid - initialSnapshot.mid) / initialSnapshot.mid) * 10000;
  const freshEvaluation = evaluateSnapshot(policy, currentSnapshot);
  const checks = [
    check('receipt_signature_valid', receiptSignatureValid, '==', true, receiptSignatureValid === true),
    check('policy_hash_match', receipt.policy_hash, '==', sha256(policy), receipt.policy_hash === sha256(policy)),
    check('receipt_age_ms', ageMs, '<=', policy.max_snapshot_age_ms, ageMs <= policy.max_snapshot_age_ms),
    check('mid_drift_bps', round(driftBps), '<=', policy.max_mid_drift_bps, driftBps <= policy.max_mid_drift_bps),
    ...freshEvaluation.checks.map((c) => ({ ...c, name: `current_${c.name}` })),
  ];
  return {
    status: checks.every((c) => c.pass) && receipt.status === 'ELIGIBLE' ? 'ALLOW' : 'BLOCK',
    checks,
    drift_bps: round(driftBps),
    age_ms: ageMs,
  };
}

export function validatePolicy(policy) {
  const required = [
    'policy_id', 'symbol', 'max_snapshot_age_ms', 'max_spread_bps',
    'max_mid_drift_bps', 'max_notional_usdt', 'max_1m_return_abs_bps', 'min_top5_depth_usdt'
  ];
  for (const key of required) {
    if (policy[key] === undefined || policy[key] === null) throw new Error(`Missing policy field: ${key}`);
  }
  if (!/^[A-Z0-9]{5,20}$/.test(policy.symbol)) throw new Error('symbol must be an uppercase Binance symbol');
  for (const key of required.filter((k) => !['policy_id', 'symbol'].includes(k))) {
    if (!Number.isFinite(policy[key]) || policy[key] < 0) throw new Error(`${key} must be a non-negative number`);
  }
}

function round(n) { return Math.round(n * 100) / 100; }
