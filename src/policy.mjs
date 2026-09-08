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

export function normalizeAction(action) {
  if (!action || typeof action !== 'object') throw new Error('proposed action is required');
  const normalized = {
    symbol: String(action.symbol || '').toUpperCase(),
    side: String(action.side || '').toUpperCase(),
    notional_usdt: Number(action.notional_usdt),
  };
  if (!/^[A-Z0-9]{5,20}$/.test(normalized.symbol)) throw new Error('action symbol must be an uppercase Binance symbol');
  if (!['BUY', 'SELL'].includes(normalized.side)) throw new Error('action side must be BUY or SELL');
  if (!Number.isFinite(normalized.notional_usdt) || normalized.notional_usdt < 0) throw new Error('action notional_usdt must be a non-negative number');
  return normalized;
}

export function evaluateSnapshot(policy, snapshot) {
  const checks = [
    check('spread_bps', snapshot?.spread_bps, '<=', policy.max_spread_bps, Number.isFinite(snapshot?.spread_bps) && snapshot.spread_bps <= policy.max_spread_bps),
    check('abs_1m_return_bps', Number.isFinite(snapshot?.last_1m_return_bps) ? Math.abs(snapshot.last_1m_return_bps) : snapshot?.last_1m_return_bps, '<=', policy.max_1m_return_abs_bps, Number.isFinite(snapshot?.last_1m_return_bps) && Math.abs(snapshot.last_1m_return_bps) <= policy.max_1m_return_abs_bps),
    check('top5_bid_depth_usdt', snapshot?.top5_bid_depth_usdt, '>=', policy.min_top5_depth_usdt, Number.isFinite(snapshot?.top5_bid_depth_usdt) && snapshot.top5_bid_depth_usdt >= policy.min_top5_depth_usdt),
    check('top5_ask_depth_usdt', snapshot?.top5_ask_depth_usdt, '>=', policy.min_top5_depth_usdt, Number.isFinite(snapshot?.top5_ask_depth_usdt) && snapshot.top5_ask_depth_usdt >= policy.min_top5_depth_usdt),
  ];
  return { pass: checks.every((c) => c.pass), checks };
}

export function evaluateProposedAction(policy, action) {
  let normalized = null;
  try { normalized = normalizeAction(action); } catch { /* fail closed through checks below */ }
  const checks = [
    check('action_symbol_match', normalized?.symbol ?? action?.symbol ?? null, '==', policy.symbol, normalized?.symbol === policy.symbol),
    check('action_side_supported', normalized?.side ?? action?.side ?? null, 'in', ['BUY', 'SELL'], ['BUY', 'SELL'].includes(normalized?.side)),
    check('action_notional_usdt_finite', normalized?.notional_usdt ?? action?.notional_usdt ?? null, 'finite', true, Number.isFinite(normalized?.notional_usdt) && normalized.notional_usdt >= 0),
    check('action_notional_usdt', normalized?.notional_usdt ?? action?.notional_usdt ?? null, '<=', policy.max_notional_usdt, Number.isFinite(normalized?.notional_usdt) && normalized.notional_usdt <= policy.max_notional_usdt),
  ];
  return { pass: checks.every((c) => c.pass), checks, normalized_action: normalized };
}

export function evaluateInitialDecision(policy, snapshot, action) {
  const market = evaluateSnapshot(policy, snapshot);
  const proposed = evaluateProposedAction(policy, action);
  const checks = [
    ...market.checks,
    ...proposed.checks,
  ];
  return {
    pass: checks.every((c) => c.pass),
    checks,
    market,
    action: proposed,
  };
}

export function revalidate({ policy, receipt, initialSnapshot, currentSnapshot, receiptSignatureValid, proposedAction }) {
  const ageMs = Number.isFinite(currentSnapshot?.server_time_ms) && Number.isFinite(receipt?.evaluated_at_ms)
    ? currentSnapshot.server_time_ms - receipt.evaluated_at_ms
    : Number.NaN;
  const driftBps = Number.isFinite(currentSnapshot?.mid) && Number.isFinite(initialSnapshot?.mid) && initialSnapshot.mid !== 0
    ? Math.abs((currentSnapshot.mid - initialSnapshot.mid) / initialSnapshot.mid) * 10000
    : Number.NaN;
  const freshEvaluation = evaluateSnapshot(policy, currentSnapshot);
  const actionEvaluation = evaluateProposedAction(policy, proposedAction);
  const currentActionHash = actionEvaluation.normalized_action ? sha256(actionEvaluation.normalized_action) : null;
  const checks = [
    check('receipt_signature_valid', receiptSignatureValid, '==', true, receiptSignatureValid === true),
    check('policy_hash_match', receipt?.policy_hash, '==', sha256(policy), receipt?.policy_hash === sha256(policy)),
    check('action_hash_match', currentActionHash, '==', receipt?.action_hash ?? null, Boolean(currentActionHash) && currentActionHash === receipt?.action_hash),
    check('receipt_age_ms', Number.isFinite(ageMs) ? ageMs : null, '<=', policy.max_snapshot_age_ms, Number.isFinite(ageMs) && ageMs >= 0 && ageMs <= policy.max_snapshot_age_ms),
    check('mid_drift_bps', Number.isFinite(driftBps) ? round(driftBps) : null, '<=', policy.max_mid_drift_bps, Number.isFinite(driftBps) && driftBps <= policy.max_mid_drift_bps),
    ...freshEvaluation.checks.map((c) => ({ ...c, name: `current_${c.name}` })),
    ...actionEvaluation.checks,
  ];
  const status = checks.every((c) => c.pass) && receipt?.status === 'ELIGIBLE' ? 'ALLOW' : 'BLOCK';
  return {
    status,
    next_state: status === 'BLOCK' ? 'REPLAN_REQUIRED' : 'ACTION_REMAINS_VALID',
    checks,
    drift_bps: Number.isFinite(driftBps) ? round(driftBps) : null,
    age_ms: Number.isFinite(ageMs) ? ageMs : null,
    current_action_hash: currentActionHash,
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
