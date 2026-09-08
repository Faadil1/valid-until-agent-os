import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sealPolicy, evaluateInitialDecision, normalizeAction, revalidate } from './policy.mjs';
import { createDemoSigner, issueReceipt, verifyReceipt } from './receipt.mjs';
import { fromFixture } from './snapshot.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/policy.example.json'), 'utf8'));
const a = JSON.parse(fs.readFileSync(path.join(root, 'data/replay/market-a.json'), 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(root, 'data/replay/market-b.json'), 'utf8'));
const sealed = sealPolicy(policy);
const proposedAction = normalizeAction({ symbol: policy.symbol, side: 'BUY', notional_usdt: policy.max_notional_usdt });
const first = fromFixture(a);
const evaluation = evaluateInitialDecision(sealed.policy, first.snapshot, proposedAction);
const signer = createDemoSigner();
const receipt = issueReceipt({ policy: sealed.policy, policyHash: sealed.policy_hash, snapshot: first.snapshot, snapshotHash: first.snapshot_hash, evaluation, signer, proposedAction });
const current = fromFixture(b);
const validityResult = revalidate({ policy: sealed.policy, receipt, initialSnapshot: first.snapshot, currentSnapshot: current.snapshot, receiptSignatureValid: verifyReceipt(receipt, signer.publicKey), proposedAction });
const data = { policy, policyHash: sealed.policy_hash, proposedAction, initial: first.snapshot, receipt, current: current.snapshot, validityResult };
fs.writeFileSync(path.join(root, 'web/demo.json'), JSON.stringify(data, null, 2));

// Keep the existing editorial hero/replay intact while making the judge surface
// explicitly multi-page. This build-time post-process is idempotent so local and
// Vercel builds converge even if the source HTML predates v0.4 navigation.
const indexPath = path.join(root, 'web/index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

if (!indexHtml.includes('class="judge-nav"')) {
  indexHtml = indexHtml.replace(
    '</style>',
    '.judge-nav{display:flex;gap:14px;align-items:center;justify-content:flex-end;flex-wrap:wrap}.judge-nav a{color:var(--ink);font:800 9px/1 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;text-decoration:none;border-bottom:1px solid transparent;padding-bottom:3px}.judge-nav a:hover{border-color:var(--ink)}@media(max-width:720px){.judge-nav{justify-content:flex-start}}\n</style>'
  );

  const oldHeader = '<header class="topbar"><div class="mark"><span class="mark-dot"></span>Valid Until</div><div class="track">Binance Agent OS Mini Hackathon<br/>Track A · execution integrity</div></header>';
  const newHeader = '<header class="topbar"><div class="mark"><span class="mark-dot"></span>Valid Until</div><nav class="judge-nav"><a href="/lab">Live Lab</a><a href="/live-proof">Verified Execution</a><a href="/evaluations">Evaluations</a></nav></header>';
  if (!indexHtml.includes(oldHeader)) throw new Error('v0.4 home navigation anchor not found');
  indexHtml = indexHtml.replace(oldHeader, newHeader);

  const redTeamLink = '<a class="btn secondary" href="/evaluations">6-case red team →</a>';
  const proofLinks = '<a class="btn" href="/lab">Open Live Proof Lab →</a><a class="btn secondary" href="/live-proof">Verified execution →</a><a class="btn secondary" href="/evaluations">6-case red team →</a>';
  if (!indexHtml.includes(redTeamLink)) throw new Error('v0.4 home CTA anchor not found');
  indexHtml = indexHtml.replace(redTeamLink, proofLinks);

  fs.writeFileSync(indexPath, indexHtml);
}

console.log('web/demo.json written; v0.4 judge navigation ensured');
