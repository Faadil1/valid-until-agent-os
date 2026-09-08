import { generateKeyPairSync, sign, verify, randomUUID } from 'node:crypto';
import { canonicalize, sha256 } from './canonical.mjs';

export function createDemoSigner() {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  return { publicKey, privateKey };
}

export function publicKeyPem(publicKey) {
  return publicKey.export({ type: 'spki', format: 'pem' }).toString();
}

export function issueReceipt({ policy, policyHash, snapshot, snapshotHash, evaluation, signer, proposedAction }) {
  if (!proposedAction) throw new Error('proposedAction is required for receipt v2');
  const action = structuredClone(proposedAction);
  const unsigned = {
    receipt_version: 'valid-until.receipt.v2',
    decision_id: randomUUID(),
    policy_id: policy.policy_id,
    policy_hash: policyHash,
    snapshot_hash: snapshotHash,
    action_hash: sha256(action),
    action,
    symbol: policy.symbol,
    status: evaluation.pass ? 'ELIGIBLE' : 'BLOCKED',
    evaluated_at_ms: snapshot.server_time_ms,
    valid_until_ms: snapshot.server_time_ms + policy.max_snapshot_age_ms,
    max_notional_usdt: policy.max_notional_usdt,
    checks: evaluation.checks,
    revalidation_required: true,
    source: snapshot.source,
  };
  const payload = Buffer.from(canonicalize(unsigned));
  const signature = sign(null, payload, signer.privateKey).toString('base64url');
  return { ...unsigned, signature_alg: 'Ed25519', signature };
}

export function verifyReceipt(receipt, publicKey) {
  const { signature, signature_alg, ...unsigned } = receipt;
  if (signature_alg !== 'Ed25519' || !signature) return false;
  return verify(null, Buffer.from(canonicalize(unsigned)), publicKey, Buffer.from(signature, 'base64url'));
}
