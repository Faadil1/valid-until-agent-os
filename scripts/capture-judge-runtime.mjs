import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const base = process.env.JUDGE_BASE_URL?.replace(/\/$/, '');
if (!base || !/^https:\/\//.test(base)) {
  throw new Error('JUDGE_BASE_URL must be an https URL');
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const outDir = path.join('evidence', 'runtime', stamp);
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

async function runCase({ id, viewport, reducedMotion }) {
  const context = await browser.newContext({ viewport, reducedMotion });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  const homeResponse = await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  const homeStatus = homeResponse?.status() ?? null;
  const thesisVisible = await page.getByText('Reasoning is not authorization.', { exact: false }).isVisible().catch(() => false);
  const memoryLineVisible = await page.getByText('A correct decision can expire.', { exact: true }).first().isVisible().catch(() => false);
  const architectureVisible = await page.getByText('Binance Agent OS', { exact: false }).first().isVisible().catch(() => false);
  const portableSkillVisible = await page.getByText('skills/valid-until/SKILL.md', { exact: false }).first().isVisible().catch(() => false);
  const mcpContractVisible = await page.getByText(/valid_until_begin.*valid_until_revalidate/i).first().isVisible().catch(() => false);
  const receiptV2Visible = await page.getByText(/V2 · ACTION-BOUND/i).isVisible().catch(() => false);
  const actionHashVisible = await page.getByText(/^action [0-9a-f]{8,}…$/i).isVisible().catch(() => false);
  const replayVisible = await page.getByRole('button', { name: /Replay proof/i }).isVisible().catch(() => false);
  const evalLinkVisible = await page.getByRole('link', { name: /6-case red team/i }).isVisible().catch(() => false);

  await page.screenshot({ path: path.join(outDir, `${id}-home-before.png`), fullPage: true });

  let replayTerminal = false;
  let currentChecksPassVisible = false;
  let exactActionMatchVisible = false;
  let replanVisible = false;
  let premiseFailVisible = false;
  let counterfactualVisible = false;
  if (replayVisible) {
    await page.getByRole('button', { name: /Replay proof/i }).click();
    await page.getByText('NO LONGER VALID', { exact: true }).waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    replayTerminal = await page.getByText('NO LONGER VALID', { exact: true }).isVisible().catch(() => false);
    currentChecksPassVisible = await page.getByText('PASS 4/4', { exact: true }).first().isVisible().catch(() => false);
    exactActionMatchVisible = await page.getByText('MATCH', { exact: true }).first().isVisible().catch(() => false);
    replanVisible = await page.getByText(/REPLAN_REQUIRED/i).isVisible().catch(() => false);
    premiseFailVisible = await page.getByText(/FAIL 35\.47 > 20 BPS/i).isVisible().catch(() => false);
    counterfactualVisible = currentChecksPassVisible && exactActionMatchVisible && premiseFailVisible;
  }
  await page.screenshot({ path: path.join(outDir, `${id}-home-after.png`), fullPage: true });

  const evalResponse = await page.goto(`${base}/evaluations`, { waitUntil: 'networkidle' });
  const evalStatus = evalResponse?.status() ?? null;
  const evalTitleVisible = await page.getByText(/evaluation|red-team/i).first().isVisible().catch(() => false);
  const exactActionMutationVisible = await page.getByText(/Exact-action mutation inside policy cap/i).isVisible().catch(() => false);
  await page.screenshot({ path: path.join(outDir, `${id}-evaluations.png`), fullPage: true });

  const pass = homeStatus === 200 && evalStatus === 200 && thesisVisible && memoryLineVisible && architectureVisible && portableSkillVisible && mcpContractVisible && receiptV2Visible && actionHashVisible && replayVisible && evalLinkVisible && replayTerminal && counterfactualVisible && replanVisible && evalTitleVisible && exactActionMutationVisible && consoleErrors.length === 0;
  results.push({ id, viewport, reducedMotion, homeStatus, evalStatus, thesisVisible, memoryLineVisible, architectureVisible, portableSkillVisible, mcpContractVisible, receiptV2Visible, actionHashVisible, replayVisible, evalLinkVisible, replayTerminal, currentChecksPassVisible, exactActionMatchVisible, replanVisible, premiseFailVisible, counterfactualVisible, evalTitleVisible, exactActionMutationVisible, consoleErrors, pass });
  await context.close();
}

await runCase({ id: 'desktop-motion', viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
await runCase({ id: 'mobile-motion', viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
await runCase({ id: 'desktop-reduced-motion', viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await runCase({ id: 'mobile-reduced-motion', viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });

await browser.close();

const summary = {
  evidence_version: 'valid-until.trace-gate-6-5-runtime.v3',
  base_url: base,
  captured_at: new Date().toISOString(),
  signature_assertions: [
    'CURRENT_CHECKS_PASS__EXACT_ACTION_MATCHES__CROSS_TIME_PREMISE_FAILS',
    'RECEIPT_V2_ACTION_BOUND_SURFACED',
    'MCP_CONTRACT_SURFACED',
    'WITHIN_POLICY_ACTION_MUTATION_RED_TEAM_SURFACED',
  ],
  cases: results,
  pass: results.every((r) => r.pass),
};
await fs.writeFile(path.join(outDir, 'runtime-evidence.json'), JSON.stringify(summary, null, 2));
await fs.writeFile(path.join(outDir, 'README.md'), `# TRACE Gate 6.5 Winner Intelligence 003 delta runtime evidence\n\nBase URL: ${base}\n\nCaptured by Playwright in GitHub Actions. Desktop/mobile and reduced-motion paths exercise the deployed artifact and assert the sharpened signature: current-state checks remain PASS, exact action remains MATCH, while the sealed T0→T1 premise expires. Receipt v2 action binding, MCP contract legibility, REPLAN_REQUIRED and the within-policy action-mutation red-team case must also be visible.\n\nOverall: **${summary.pass ? 'PASS' : 'FAIL'}**\n`);
console.log(JSON.stringify(summary, null, 2));
if (!summary.pass) process.exit(1);
