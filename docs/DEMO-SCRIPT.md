# Valid Until — provisional final demo structure

**Status:** `NOT_YET_FROZEN` — do not record the final video until the authenticated Spot Testnet proof and Vercel `/live-proof` surface are closed.

Judge-optimization source: `product/JUDGE-OPTIMIZATION-EVIDENCE-001.md`.

The final demo must optimize for:

```text
Problem → Pain → Execution → Story → Demo
```

not feature count or architecture density.

## First-minute rule

The judge should understand the failure in the first 10–15 seconds and see the `NO LONGER VALID` moment before technical internals dominate the screen.

## Provisional narrative

### 0–10s — Problem + pain

Show the product hero / execution instrument.

Say:

> **Reasoning is not authorization. A correct AI decision can expire before execution.**

Then make the pain concrete:

> The agent can still have permission to trade even when the premise that justified this exact action is no longer valid.

Do **not** start with MCP, Ed25519, hashes, CLI or architecture.

### 10–18s — Execution model

Show the short flow:

```text
AI agent → Binance Agent OS → Valid Until → ALLOW / NO LONGER VALID
```

Explain only:

- agent interprets and proposes;
- Binance provides fresh state/capability;
- Valid Until owns deterministic cross-time authorization.

### 18–35s — The `aha` proof

Run **Replay proof**.

The judge must see:

```text
CURRENT T1 CHECKS = PASS
BUT
T0 → T1 PREMISE DRIFT = 35.47 bps > 20 bps

→ NO LONGER VALID
→ REPLAN_REQUIRED
```

Memory line:

> **The authorization was still valid. The premise was not.**

This is the core story. Give it enough screen time.

### 35–44s — Red-team depth

Open **6-case red team** and show that the mechanism is not a single price check:

- clean unchanged case → ALLOW;
- state drift → BLOCK;
- expiry → BLOCK;
- tamper → BLOCK;
- policy mismatch → BLOCK;
- exact-action / notional mismatch → BLOCK.

Do not explain each test in detail.

### 44–54s — Authentic Binance consequence

**This section must be regenerated from the real proof after Step 5.**

Target story when an authenticated Spot Testnet `ALLOW` capture exists:

```text
Valid Until = ALLOW
→ one bounded Binance Spot Testnet order sent
→ same clientOrderId queried back
→ verified non-production execution
```

If the real live run closes on `BLOCK`, tell the truth instead:

```text
Valid Until = BLOCK
→ zero execution call
→ REPLAN_REQUIRED
```

Never weaken policy or hide a BLOCK to manufacture a more cinematic result.

Spot Testnet must be labeled **non-production / no real funds**.

### 54–60s — Close

Return to the hero.

Close with:

> **A current-state preflight asks whether a trade looks acceptable now. Valid Until asks whether this exact old action is still justified by the decision that produced it.**

Then:

> **A correct decision can expire.**

## What NOT to spend video time on

Unless answering a judge objection, do not foreground:

- Ed25519;
- SHA-256;
- receipt field names;
- terminal installation;
- source-tree walkthroughs;
- sponsor-logo accumulation;
- x402;
- wallet writes;
- unrelated indicators;
- long architecture diagrams.

## Q&A appendix — prepare, don't lead with it

Be ready to answer:

1. Why not a limit order / stop-loss?
2. Why not a generic current-state preflight?
3. Why not 20–30 lines of checks?
4. Why use an AI agent at all?
5. What exactly does `ALLOW` mean — and what does it **not** mean?

Use `docs/JUDGE-MATRIX.md` for the bounded answers.

## Freeze rule

After authenticated Spot Testnet evidence + `/live-proof` Vercel verification:

`PBPD reconciliation → TRACE delta → Winning Intelligence final recheck → TRACE 6.75 final script`

Only TRACE 6.75 may convert this provisional structure into the final recording contract.
