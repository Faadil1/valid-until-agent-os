import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sealPolicy, evaluateInitialDecision, normalizeAction, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt, publicKeyPem } from './receipt.mjs';
import { captureWithBinanceCli } from './snapshot.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const symbol = (process.argv[2] || 'BTCUSDT').toUpperCase();
const delayMs = Number(process.env.VALID_UNTIL_RECHECK_MS || 3000);
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/policy.example.json'), 'utf8'));
policy.symbol = symbol;
const proposedAction = normalizeAction({
  symbol,
  side: String(process.env.VALID_UNTIL_ACTION_SIDE || 'BUY').toUpperCase(),
  notional_usdt: Number(process.env.VALID_UNTIL_ACTION_NOTIONAL_USDT || policy.max_notional_usdt),
});

const sealed = sealPolicy(policy); // important: policy is sealed before any market read
console.error(`POLICY SEALED ${sealed.policy_hash}`);
console.error(`ACTION SEALED ${proposedAction.side} ${proposedAction.symbol} $${proposedAction.notional_usdt}`);
const first = captureWithBinanceCli(symbol);
const evaluation = evaluateInitialDecision(sealed.policy, first.snapshot, proposedAction);
const signer = createDemoSigner();
const receipt = issueReceipt({ policy: sealed.policy, policyHash: sealed.policy_hash, snapshot: first.snapshot, snapshotHash: first.snapshot_hash, evaluation, signer, proposedAction });
const signatureValid = verifyReceipt(receipt, signer.publicKey);
console.error(`INITIAL ${receipt.status} — rechecking in ${delayMs}ms`);
await new Promise((r) => setTimeout(r, delayMs));
const current = captureWithBinanceCli(symbol);
const validityResult = revalidate({ policy: sealed.policy, receipt, initialSnapshot: first.snapshot, currentSnapshot: current.snapshot, receiptSignatureValid: signatureValid, proposedAction });

console.log(JSON.stringify({
  mode: 'LIVE_BINANCE_CLI_READ_ONLY',
  sealed_policy: sealed,
  proposed_action: proposedAction,
  initial_snapshot: first.snapshot,
  initial_snapshot_hash: first.snapshot_hash,
  eligibility_receipt: receipt,
  public_key_pem: publicKeyPem(signer.publicKey),
  revalidation_snapshot: current.snapshot,
  revalidation_snapshot_hash: current.snapshot_hash,
  validity_result: validityResult,
  execution: 'NOT_IMPLEMENTED_BY_DESIGN',
}, null, 2));
