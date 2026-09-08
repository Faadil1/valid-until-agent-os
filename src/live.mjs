import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sealPolicy, evaluateSnapshot, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt, publicKeyPem } from './receipt.mjs';
import { captureWithBinanceCli } from './snapshot.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const symbol = (process.argv[2] || 'BTCUSDT').toUpperCase();
const delayMs = Number(process.env.VALID_UNTIL_RECHECK_MS || 3000);
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/policy.example.json'), 'utf8'));
policy.symbol = symbol;

const sealed = sealPolicy(policy); // important: policy is sealed before any market read
console.error(`POLICY SEALED ${sealed.policy_hash}`);
const first = captureWithBinanceCli(symbol);
const evaluation = evaluateSnapshot(sealed.policy, first.snapshot);
const signer = createDemoSigner();
const receipt = issueReceipt({ policy: sealed.policy, policyHash: sealed.policy_hash, snapshot: first.snapshot, snapshotHash: first.snapshot_hash, evaluation, signer });
const signatureValid = verifyReceipt(receipt, signer.publicKey);
console.error(`INITIAL ${receipt.status} — rechecking in ${delayMs}ms`);
await new Promise((r) => setTimeout(r, delayMs));
const current = captureWithBinanceCli(symbol);
const validityResult = revalidate({ policy: sealed.policy, receipt, initialSnapshot: first.snapshot, currentSnapshot: current.snapshot, receiptSignatureValid: signatureValid });

console.log(JSON.stringify({
  mode: 'LIVE_BINANCE_CLI_READ_ONLY',
  sealed_policy: sealed,
  initial_snapshot: first.snapshot,
  initial_snapshot_hash: first.snapshot_hash,
  eligibility_receipt: receipt,
  public_key_pem: publicKeyPem(signer.publicKey),
  revalidation_snapshot: current.snapshot,
  revalidation_snapshot_hash: current.snapshot_hash,
  validity_result: validityResult,
  execution: 'NOT_IMPLEMENTED_BY_DESIGN',
}, null, 2));
