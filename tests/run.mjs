import assert from 'node:assert/strict';
import { sealPolicy, evaluateInitialDecision, normalizeAction, revalidate } from '../src/policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt } from '../src/receipt.mjs';
import { sha256 } from '../src/canonical.mjs';

const policy = {
  policy_id: 'test-v2', symbol: 'BTCUSDT', max_snapshot_age_ms: 5000,
  max_spread_bps: 8, max_mid_drift_bps: 20, max_notional_usdt: 100,
  max_1m_return_abs_bps: 80, min_top5_depth_usdt: 50000
};
const a = { snapshot_version:'valid-until.market.v1', symbol:'BTCUSDT', server_time_ms:1000, best_bid:100, best_ask:100.01, mid:100.005, spread_bps:1, top5_bid_depth_usdt:100000, top5_ask_depth_usdt:100000, last_1m_return_bps:10, source:'test' };
const action = normalizeAction({ symbol:'BTCUSDT', side:'BUY', notional_usdt:50 });
const sealed = sealPolicy(policy);
assert.equal(sealed.policy_hash, sha256(policy));
const evalA = evaluateInitialDecision(policy, a, action);
assert.equal(evalA.pass, true);
const signer = createDemoSigner();
const receipt = issueReceipt({ policy, policyHash: sealed.policy_hash, snapshot:a, snapshotHash:sha256(a), evaluation:evalA, signer, proposedAction:action });
assert.equal(receipt.receipt_version, 'valid-until.receipt.v2');
assert.equal(receipt.action_hash, sha256(action));
assert.equal(verifyReceipt(receipt, signer.publicKey), true);
const tampered = { ...receipt, max_notional_usdt: 999 };
assert.equal(verifyReceipt(tampered, signer.publicKey), false);
const b = { ...a, server_time_ms:4000, mid:100.30, best_bid:100.29, best_ask:100.31 };
const validity = revalidate({ policy, receipt, initialSnapshot:a, currentSnapshot:b, receiptSignatureValid:true, proposedAction:action });
assert.equal(validity.status, 'BLOCK');
assert.equal(validity.next_state, 'REPLAN_REQUIRED');
assert.ok(validity.drift_bps > policy.max_mid_drift_bps);
const stale = { ...a, server_time_ms:7001 };
const staleValidity = revalidate({ policy, receipt, initialSnapshot:a, currentSnapshot:stale, receiptSignatureValid:true, proposedAction:action });
assert.equal(staleValidity.status, 'BLOCK');
const mutatedInsideCap = normalizeAction({ symbol:'BTCUSDT', side:'BUY', notional_usdt:75 });
const actionMutation = revalidate({ policy, receipt, initialSnapshot:a, currentSnapshot:{...a, server_time_ms:3000}, receiptSignatureValid:true, proposedAction:mutatedInsideCap });
assert.equal(actionMutation.status, 'BLOCK');
assert.ok(actionMutation.checks.some(c => c.name === 'action_hash_match' && c.pass === false));
assert.ok(actionMutation.checks.some(c => c.name === 'action_notional_usdt' && c.pass === true));
console.log('PASS 8/8 — seal, eligibility, receipt-v2 action binding, signature, tamper-detection, drift block, TTL block, exact-action mutation block');
