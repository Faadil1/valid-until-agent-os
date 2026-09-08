import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sealPolicy, evaluateSnapshot, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt, publicKeyPem } from './receipt.mjs';
import { fromFixture } from './snapshot.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/policy.example.json'), 'utf8'));
const a = JSON.parse(fs.readFileSync(path.join(root, 'data/replay/market-a.json'), 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(root, 'data/replay/market-b.json'), 'utf8'));

const sealed = sealPolicy(policy);
const first = fromFixture(a);
const evaluation = evaluateSnapshot(sealed.policy, first.snapshot);
const signer = createDemoSigner();
const receipt = issueReceipt({ policy: sealed.policy, policyHash: sealed.policy_hash, snapshot: first.snapshot, snapshotHash: first.snapshot_hash, evaluation, signer });
const signatureValid = verifyReceipt(receipt, signer.publicKey);
const current = fromFixture(b);
const validityResult = revalidate({ policy: sealed.policy, receipt, initialSnapshot: first.snapshot, currentSnapshot: current.snapshot, receiptSignatureValid: signatureValid });

const result = {
  mode: 'CONTROLLED_REPLAY',
  note: 'Fixtures are synthetic and deterministic. Run npm run live -- BTCUSDT for live Binance market-data capture via binance-cli.',
  sealed_policy: sealed,
  initial_snapshot: first.snapshot,
  initial_snapshot_hash: first.snapshot_hash,
  eligibility_receipt: receipt,
  public_key_pem: publicKeyPem(signer.publicKey),
  revalidation_snapshot: current.snapshot,
  revalidation_snapshot_hash: current.snapshot_hash,
  validity_result: validityResult,
};

console.log(JSON.stringify(result, null, 2));
if (validityResult.status !== 'BLOCK') process.exitCode = 1;
