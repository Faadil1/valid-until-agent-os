import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sealPolicy, evaluateSnapshot, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt } from './receipt.mjs';
import { sha256 } from './canonical.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const policy = {
  policy_id: 'challenge-v1', symbol: 'BTCUSDT', max_snapshot_age_ms: 5000,
  max_spread_bps: 8, max_mid_drift_bps: 20, max_notional_usdt: 100,
  max_1m_return_abs_bps: 80, min_top5_depth_usdt: 50000
};
const base = {
  snapshot_version:'valid-until.market.v1', symbol:'BTCUSDT', server_time_ms:1000,
  best_bid:100, best_ask:100.01, mid:100.005, spread_bps:1,
  top5_bid_depth_usdt:100000, top5_ask_depth_usdt:100000,
  last_1m_return_bps:10, source:'challenge-suite'
};

function issue(policyToUse = policy) {
  const sealed = sealPolicy(policyToUse);
  const evaluation = evaluateSnapshot(policyToUse, base);
  const signer = createDemoSigner();
  const receipt = issueReceipt({
    policy: policyToUse,
    policyHash: sealed.policy_hash,
    snapshot: base,
    snapshotHash: sha256(base),
    evaluation,
    signer
  });
  return { sealed, signer, receipt };
}

function summarize(id, label, expected, result, detail) {
  return {
    id,
    label,
    expected,
    actual: result.status,
    pass: result.status === expected,
    detail,
    failed_checks: result.checks.filter(c => !c.pass).map(c => c.name)
  };
}

export function buildChallengeSuite() {
  const cases = [];

  {
    const { signer, receipt } = issue();
    const current = { ...base, server_time_ms:3000, mid:100.01, best_bid:100.00, best_ask:100.02 };
    const result = revalidate({ policy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:{ symbol:'BTCUSDT', notional_usdt:100 } });
    cases.push(summarize('EVAL-01', 'Clean unchanged case', 'ALLOW', result, 'All sealed invariants remain valid and the proposed action stays within scope.'));
  }

  {
    const { signer, receipt } = issue();
    const current = { ...base, server_time_ms:3000, mid:100.36, best_bid:100.35, best_ask:100.37 };
    const result = revalidate({ policy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:{ symbol:'BTCUSDT', notional_usdt:100 } });
    cases.push(summarize('EVAL-02', 'State drift', 'BLOCK', result, 'Market mid moved beyond the sealed 20 bps decision-validity boundary.'));
  }

  {
    const { signer, receipt } = issue();
    const current = { ...base, server_time_ms:7001 };
    const result = revalidate({ policy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:{ symbol:'BTCUSDT', notional_usdt:100 } });
    cases.push(summarize('EVAL-03', 'Expired authorization', 'BLOCK', result, 'The receipt outlived its 5 second validity window.'));
  }

  {
    const { signer, receipt } = issue();
    const tampered = { ...receipt, max_notional_usdt:999 };
    const current = { ...base, server_time_ms:3000 };
    const result = revalidate({ policy, receipt:tampered, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(tampered, signer.publicKey), proposedAction:{ symbol:'BTCUSDT', notional_usdt:100 } });
    cases.push(summarize('EVAL-04', 'Receipt tamper', 'BLOCK', result, 'Changing a signed receipt invalidates Ed25519 verification.'));
  }

  {
    const { signer, receipt } = issue();
    const changedPolicy = { ...policy, max_mid_drift_bps:50 };
    const current = { ...base, server_time_ms:3000 };
    const result = revalidate({ policy:changedPolicy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:{ symbol:'BTCUSDT', notional_usdt:100 } });
    cases.push(summarize('EVAL-05', 'Policy mismatch', 'BLOCK', result, 'Authorization cannot silently migrate to a different policy hash.'));
  }

  {
    const { signer, receipt } = issue();
    const current = { ...base, server_time_ms:3000 };
    const result = revalidate({ policy, receipt, initialSnapshot:base, currentSnapshot:current, receiptSignatureValid:verifyReceipt(receipt, signer.publicKey), proposedAction:{ symbol:'BTCUSDT', notional_usdt:1000 } });
    cases.push(summarize('EVAL-06', 'Intent / notional mismatch', 'BLOCK', result, 'Agent proposes $1,000 after the sealed policy capped action notional at $100.'));
  }

  return {
    suite_version: 'valid-until.challenge.v1',
    thesis: 'Reasoning is not authorization. A demo is not trust.',
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
