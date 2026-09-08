import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sealPolicy, evaluateInitialDecision, normalizeAction, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt, publicKeyPem } from './receipt.mjs';
import { captureWithBinanceSpotTestnet } from './snapshot.mjs';
import { executeAllowedTestnetBuy } from './testnet-executor.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const symbol = (process.argv[2] || 'BTCUSDT').toUpperCase();
const delayMs = Number(process.env.VALID_UNTIL_RECHECK_MS || 1500);
const profile = String(process.env.VALID_UNTIL_TESTNET_PROFILE || '').trim();
const confirmation = String(process.env.VALID_UNTIL_TESTNET_WRITE || '').trim();

const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/policy.example.json'), 'utf8'));
policy.symbol = symbol;
const proposedAction = normalizeAction({
  symbol,
  side: 'BUY',
  notional_usdt: Number(process.env.VALID_UNTIL_ACTION_NOTIONAL_USDT || 10),
});

const sealed = sealPolicy(policy);
console.error(`POLICY SEALED ${sealed.policy_hash}`);
console.error(`ACTION SEALED ${proposedAction.side} ${proposedAction.symbol} $${proposedAction.notional_usdt}`);
console.error('ENVIRONMENT BINANCE OFFICIAL SPOT TESTNET');

const first = captureWithBinanceSpotTestnet(symbol);
const evaluation = evaluateInitialDecision(sealed.policy, first.snapshot, proposedAction);
const signer = createDemoSigner();
const receipt = issueReceipt({
  policy: sealed.policy,
  policyHash: sealed.policy_hash,
  snapshot: first.snapshot,
  snapshotHash: first.snapshot_hash,
  evaluation,
  signer,
  proposedAction,
});
const signatureValid = verifyReceipt(receipt, signer.publicKey);

console.error(`INITIAL ${receipt.status} — rechecking in ${delayMs}ms`);
await new Promise((resolve) => setTimeout(resolve, delayMs));
const current = captureWithBinanceSpotTestnet(symbol);
const validityResult = revalidate({
  policy: sealed.policy,
  receipt,
  initialSnapshot: first.snapshot,
  currentSnapshot: current.snapshot,
  receiptSignatureValid: signatureValid,
  proposedAction,
});

const execution = executeAllowedTestnetBuy({
  validityResult,
  action: proposedAction,
  profile,
  confirmation,
});

console.log(JSON.stringify({
  mode: 'LIVE_BINANCE_SPOT_TESTNET_EXECUTION_PROOF',
  environment: 'BINANCE_SPOT_TESTNET_ONLY',
  sealed_policy: sealed,
  proposed_action: proposedAction,
  initial_snapshot: first.snapshot,
  initial_snapshot_hash: first.snapshot_hash,
  eligibility_receipt: receipt,
  public_key_pem: publicKeyPem(signer.publicKey),
  revalidation_snapshot: current.snapshot,
  revalidation_snapshot_hash: current.snapshot_hash,
  validity_result: validityResult,
  execution,
  claim_boundary: 'Testnet execution is live Binance non-production evidence. It is not a mainnet trade and uses no real funds.',
}, null, 2));
