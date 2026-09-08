import assert from 'node:assert/strict';
import { buildChallengeSuite } from '../src/challenge-suite.mjs';

const suite = buildChallengeSuite();
assert.equal(suite.total, 6);
assert.equal(suite.passed, 6);

const byId = Object.fromEntries(suite.cases.map(c => [c.id, c]));
assert.equal(byId['EVAL-01'].actual, 'ALLOW');
for (const id of ['EVAL-02','EVAL-03','EVAL-04','EVAL-05','EVAL-06']) {
  assert.equal(byId[id].actual, 'BLOCK');
  assert.equal(byId[id].next_state, 'REPLAN_REQUIRED');
  assert.ok(byId[id].failed_checks.length > 0);
}
assert.ok(byId['EVAL-06'].failed_checks.includes('action_hash_match'));
assert.ok(!byId['EVAL-06'].failed_checks.includes('action_notional_usdt'));
assert.ok(byId['EVAL-04'].failed_checks.includes('receipt_signature_valid'));
assert.ok(byId['EVAL-05'].failed_checks.includes('policy_hash_match'));
assert.ok(byId['EVAL-03'].failed_checks.includes('receipt_age_ms'));
assert.ok(byId['EVAL-02'].failed_checks.includes('mid_drift_bps'));

console.log('PASS 6/6 — clean allow, state drift, expiry, receipt tamper, policy mismatch, exact-action mutation inside policy cap');
