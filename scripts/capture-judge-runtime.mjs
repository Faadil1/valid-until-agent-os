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
  const architectureVisible = await page.getByText('Binance Agent OS', { exact: false }).first().isVisible().catch(() => false);
  const replayVisible = await page.getByRole('button', { name: /Replay proof/i }).isVisible().catch(() => false);
  const evalLinkVisible = await page.getByRole('link', { name: /6-case red team/i }).isVisible().catch(() => false);

  await page.screenshot({ path: path.join(outDir, `${id}-home-before.png`), fullPage: true });

  let replayTerminal = false;
  if (replayVisible) {
    await page.getByRole('button', { name: /Replay proof/i }).click();
    // The application keeps the same logical replay duration even when CSS motion is reduced.
    // Wait for the deterministic terminal state rather than assuming a visual transition duration.
    await page.getByText('NO LONGER VALID', { exact: true }).waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    replayTerminal = await page.getByText('NO LONGER VALID', { exact: true }).isVisible().catch(() => false);
  }
  await page.screenshot({ path: path.join(outDir, `${id}-home-after.png`), fullPage: true });

  const evalResponse = await page.goto(`${base}/evaluations`, { waitUntil: 'networkidle' });
  const evalStatus = evalResponse?.status() ?? null;
  const evalTitleVisible = await page.getByText(/evaluation|red-team/i).first().isVisible().catch(() => false);
  await page.screenshot({ path: path.join(outDir, `${id}-evaluations.png`), fullPage: true });

  const pass = homeStatus === 200 && evalStatus === 200 && thesisVisible && architectureVisible && replayVisible && evalLinkVisible && replayTerminal && evalTitleVisible && consoleErrors.length === 0;
  results.push({ id, viewport, reducedMotion, homeStatus, evalStatus, thesisVisible, architectureVisible, replayVisible, evalLinkVisible, replayTerminal, evalTitleVisible, consoleErrors, pass });
  await context.close();
}

await runCase({ id: 'desktop-motion', viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
await runCase({ id: 'mobile-motion', viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
await runCase({ id: 'desktop-reduced-motion', viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await runCase({ id: 'mobile-reduced-motion', viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });

await browser.close();

const summary = {
  evidence_version: 'valid-until.trace-gate-6-5-runtime.v1',
  base_url: base,
  captured_at: new Date().toISOString(),
  cases: results,
  pass: results.every((r) => r.pass),
};
await fs.writeFile(path.join(outDir, 'runtime-evidence.json'), JSON.stringify(summary, null, 2));
await fs.writeFile(path.join(outDir, 'README.md'), `# TRACE Gate 6.5 runtime evidence\n\nBase URL: ${base}\n\nCaptured by Playwright in GitHub Actions. Desktop/mobile and reduced-motion paths are exercised against the deployed artifact.\n\nOverall: **${summary.pass ? 'PASS' : 'FAIL'}**\n`);
console.log(JSON.stringify(summary, null, 2));
if (!summary.pass) process.exit(1);
