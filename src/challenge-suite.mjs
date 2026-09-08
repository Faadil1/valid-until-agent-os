import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sealPolicy, evaluateInitialDecision, normalizeAction, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt } from './receipt.mjs';
import { sha256 } from './canonical.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const policy = {
  policy_id: 'challenge-v2', symbol: 'BTCUSDT', max_snapshot_age_ms: 5000,
  max_spread_bps: 8, max_mid_drift_bps: 20, max_notional_usdt: 100,
  max_1m_return_abs_bps: 80, min_top5_depth_usdt: 50000
};
const base = {
  snapshot_version:'valid-until.market.v1', symbol:'BTCUSDT', server_time_ms:1000,
  best_bid:100, best_ask:100.01, mid:100.005, spread_bps:1,
  top5_bid_depth_usdt:100000, top5_ask_depth_usdt:100000,
  last_1m_return_bps:10, source:'challenge-suite'
};
const originalAction = normalizeAction({ symbol:'BTCUSDT', side:'BUY', notional_usdt:50 });

function issue(policyToUse = policy, actionToUse = originalAction) {
  const sealed = sealPolicy(policyToUse);
  const evaluation = evaluateInitialDecision(policyToUse, base, actionToUse);
  const signer = createDemoSigner();
  const receipt = issueReceipt({
    policy: policyToUse,
    policyHash: sealed.policy_hash,
    snapshot: base,
    snapshotHash: sha256(base),
    evaluation,
    signer,
    proposedAction: actionToUse,
  });
  return { sealed, signer, receipt, action: actionToUse };
}

function summarize(id, label, expected, result, detail) {
  return {
    id,
    label,
    expected,
    actual: result.status,
    next_state: result.next_state,
    pass: result.status === expected,
    detail,
    failed_checks: result.checks.filter(c => !c.pass).map(c => c.name)
  };
}

export function buildChallengeSuite() {
  const cases = [];

  {
    const { signer, receipt, action } = issue();
    const current = { ...base, server_time_ms:3000, mid:100.01, best_bid:100.00, best_ask:100.02 };
    const result = revalidate({ policy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:action });
    cases.push(summarize('EVAL-01', 'Clean unchanged case', 'ALLOW', result, 'All sealed invariants remain valid and the exact action remains unchanged.'));
  }

  {
    const { signer, receipt, action } = issue();
    const current = { ...base, server_time_ms:3000, mid:100.36, best_bid:100.35, best_ask:100.37 };
    const result = revalidate({ policy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:action });
    cases.push(summarize('EVAL-02', 'State drift', 'BLOCK', result, 'Current checks remain acceptable, but market mid moved beyond the sealed 20 bps T0→T1 decision-validity boundary.'));
  }

  {
    const { signer, receipt, action } = issue();
    const current = { ...base, server_time_ms:7001 };
    const result = revalidate({ policy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:action });
    cases.push(summarize('EVAL-03', 'Expired authorization', 'BLOCK', result, 'The receipt outlived its 5 second validity window.'));
  }

  {
    const { signer, receipt, action } = issue();
    const tampered = { ...receipt, max_notional_usdt:999 };
    const current = { ...base, server_time_ms:3000 };
    const result = revalidate({ policy, receipt:tampered, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(tampered, signer.publicKey), proposedAction:action });
    cases.push(summarize('EVAL-04', 'Receipt tamper', 'BLOCK', result, 'Changing a signed receipt invalidates Ed25519 verification.'));
  }

  {
    const { signer, receipt, action } = issue();
    const changedPolicy = { ...policy, max_mid_drift_bps:50 };
    const current = { ...base, server_time_ms:3000 };
    const result = revalidate({ policy:changedPolicy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:action });
    cases.push(summarize('EVAL-05', 'Policy mismatch', 'BLOCK', result, 'Authorization cannot silently migrate to a different policy hash.'));
  }

  {
    const { signer, receipt } = issue();
    const current = { ...base, server_time_ms:3000 };
    const mutatedAction = normalizeAction({ symbol:'BTCUSDT', side:'BUY', notional_usdt:75 });
    const result = revalidate({ policy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:mutatedAction });
    cases.push(summarize('EVAL-06', 'Exact-action mutation inside policy cap', 'BLOCK', result, 'The T0 action was BUY BTCUSDT $50. The agent changed it to $75 at T1. Both are under the $100 policy cap, but the exact action hash no longer matches.'));
  }

  return {
    suite_version: 'valid-until.challenge.v2',
    thesis: 'Reasoning is not authorization. A correct decision can expire.',
    total: cases.length,
    passed: cases.filter(c => c.pass).length,
    cases
  };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const suite = buildChallengeSuite();
  if (process.argv.includes('--write-web')) {
    fs.writeFileSync(path.join(root, 'web/challenges.json'), JSON.stringify(suite, null, 2));
    console.log(`web/challenges.json written — PASS ${suite.passed}/${suite.total}`);
  } else {
    console.log(JSON.stringify(suite, null, 2));
  }
  if (suite.passed !== suite.total) process.exitCode = 1;
}
