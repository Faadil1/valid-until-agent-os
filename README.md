# Valid Until — execution integrity for AI agents

> **Reasoning is not authorization.**
>
> **A correct decision can expire.**

**Valid Until** is a cross-time execution-validity agent workflow built for the **Binance Agent OS Mini Hackathon — Track A**.

**Live judge surface:** https://valid-until-agent-os.vercel.app  
**Red-team surface:** https://valid-until-agent-os.vercel.app/evaluations  
**Portable agent skill:** [`skills/valid-until/SKILL.md`](skills/valid-until/SKILL.md)

An AI agent can make a correct decision at T0, then reach execution at T1 after the market state or policy conditions that justified that decision have changed. The capability can still exist. Current market checks can still look acceptable. The **old action can still be invalid because it no longer belongs to the premise that justified it**.

That is the product.

## The signature proof

The controlled replay is deliberately constructed so that a generic current-state preflight is **not enough**.

At T1:

| Check | Result |
|---|---:|
| Receipt signature | PASS |
| Policy identity | PASS |
| Receipt age: `3s <= 5s` | PASS |
| Current spread: `0.37 <= 8 bps` | PASS |
| Current abs 1m movement: `47.2 <= 80 bps` | PASS |
| Current top-5 bid depth: `$171k >= $50k` | PASS |
| Current top-5 ask depth: `$168k >= $50k` | PASS |
| **T0 → T1 mid drift: `35.47 > 20 bps`** | **FAIL** |

So the engine returns:

```text
CURRENT-STATE CHECKS: PASS
ORIGINAL DECISION PREMISE: EXPIRED
→ NO LONGER VALID
```

**Fresh does not mean same premise.**

## Four different questions

Valid Until is intentionally narrower than the crowded “AI safety / trade readiness” category.

| Layer | Question |
|---|---|
| Reasoning verifier | Was the model's reasoning supported? |
| Current-state preflight | Is the action acceptable under current conditions? |
| Permission layer | May the agent use this capability? |
| **Valid Until** | **Is this exact previously-justified action still valid relative to its original premise now?** |

This is why the project binds the T0 decision state, not just the latest market state.

## Agent OS architecture

```text
Human
  defines / accepts bounded policy
        ↓
AI agent host
  interprets intent + proposes exact action
        ↓
Binance Agent OS / official Binance skill
  supplies fresh observations + capability surface
        ↓
Valid Until
  binds T0 context + revalidates exact action at T1
        ↓
ALLOW / BLOCK
```

The same probabilistic model that proposes an action is not allowed to self-authorize it.

### Install the portable skill

```bash
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

Install the official Binance skill alongside it:

```bash
npx skills add binance/binance-skills-hub --skill binance -y
```

The host-agent contract is documented in [`AGENTS.md`](AGENTS.md).

## Why Agent OS matters

Binance Agent OS is the sponsor-native observation/capability environment. Valid Until does not replace Binance permissions or wallet controls. It adds a different boundary:

```text
Binance controls what capability may exist.
Valid Until controls whether this exact old proposal is still valid now.
```

Live mode uses the official `binance-cli` for Binance public market data instead of hand-rolling a separate exchange client.

## 60-second judge story

```text
USER POLICY
  max spread      8 bps
  max mid drift  20 bps
  max age          5 sec
  min top-5 depth $50k/side
        │
        ▼
[1] POLICY FROZEN BEFORE MARKET READ
        │ SHA-256 policy hash
        ▼
[2] BINANCE MARKET SNAPSHOT / T0
        │ via official binance-cli in live mode
        ▼
[3] DECISION RECEIPT
        │ Ed25519-signed + snapshot-bound + short-lived
        ▼
[4] PRE-ACTION REVALIDATION / T1
        │ current checks still pass
        │ T0→T1 market moved 35.47 bps
        ▼
[5] NO LONGER VALID
    fresh reasoning required
```

**The authorization was still valid. The premise was not.**

The included controlled replay is intentionally deterministic so judges can see the failure path immediately. The separate live command captures real public Binance market data but performs **no order placement**.

## Run the deterministic proof

```bash
npm run build:web
npm run test:all
npm run demo
```

Expected core output includes:

```text
PASS 7/7 — seal, eligibility, signature, tamper-detection, drift block, TTL block, fail-closed
PASS 6/6 — clean allow, state drift, expiry, receipt tamper, policy mismatch, intent/notional mismatch
```

## Six-case red-team suite

The judge-facing evaluation suite is not a happy-path showcase:

1. clean unchanged case → `ALLOW`;
2. state drift → `BLOCK`;
3. expired authorization → `BLOCK`;
4. receipt tamper → `BLOCK`;
5. policy mismatch → `BLOCK`;
6. intent/notional mismatch → `BLOCK`.

Open: https://valid-until-agent-os.vercel.app/evaluations

## Run live read-only Binance capture

Install the official CLI first:

```bash
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/binance/binance-cli/releases/latest/download/binance-cli-installer.sh | sh
```

Then:

```bash
npm run live -- BTCUSDT
```

Optional recheck interval:

```bash
VALID_UNTIL_RECHECK_MS=4000 npm run live -- BNBUSDT
```

Live mode:

1. freezes policy before reading the market;
2. reads Binance public state;
3. creates a signed decision receipt;
4. waits for the bounded recheck interval;
5. reads Binance again;
6. compares T1 against both current policy constraints **and the exact T0 premise**;
7. outputs `ALLOW` or `BLOCK` with exact failed invariants.

**It never places an order.**

## Evidence status

Current canonical evidence:

- core deterministic invariants: **7/7 PASS**;
- deterministic challenge suite: **6/6 PASS**;
- live Binance CLI public-data proof: GitHub Actions run `34225133745`;
- TRACE deployed-browser evidence before the latest bounded Winner Intelligence rework: desktop/mobile × normal/reduced-motion **4/4 PASS**;
- no outcome proof or production financial-safety claim.

The latest Winner Intelligence rework must receive a fresh CI/deployed TRACE delta check before the final video is frozen.

## Core invariants

1. **Policy first.** Constraints are hashed before market data is read.
2. **Exact-state binding.** The decision receipt is tied to a canonical T0 snapshot hash.
3. **Short-lived validity.** Every receipt has a bounded validity window.
4. **Cross-time revalidation.** T1 must remain within the sealed decision contract relative to T0.
5. **Current-state revalidation.** Spread, movement and liquidity must still satisfy policy.
6. **Exact-action validation.** Symbol/notional cannot silently drift beyond sealed scope.
7. **Tamper evidence.** Receipt mutation breaks Ed25519 verification.
8. **Fail closed.** Any required failed invariant produces `BLOCK` and requires fresh reasoning.
9. **No self-claimed alpha.** Valid Until does not predict returns or claim to make trading profitable.

## Repository layout

```text
AGENTS.md                         host-agent orchestration contract
skills/valid-until/SKILL.md      portable agent skill
config/policy.example.json       user-defined frozen constraints
data/replay/                     deterministic two-snapshot judge case
src/snapshot.mjs                 Binance CLI capture + normalization
src/policy.mjs                   eligibility + exact-action/cross-time revalidation
src/receipt.mjs                  Ed25519 receipt issuing / verification
src/demo.mjs                     deterministic failure-path proof
src/live.mjs                     live read-only Binance path
tests/                           invariant + challenge-suite tests
web/                             judge-facing proof UI
docs/                            integration, demo and submission assets
product/                         PRD, Winner Intelligence and lifecycle evidence
```

## What we deliberately did not add

The current Track A landscape already contains strong projects around wallet breadth, x402, risk scoring, current-state preflight, historical analysis and multi-agent risk roles. Valid Until stays narrow by design.

This submission does **not** add:

- generic trade signals;
- a risk score;
- x402/payment flows;
- Agentic Wallet write paths;
- a second LLM critic;
- live order execution;
- an MCP server merely for integration-count optics.

## Claim boundaries

- Controlled replay uses synthetic Binance-shaped fixtures and is explicitly labeled.
- Live mode reads authentic public Binance market data through the official Binance CLI.
- The project proves **policy commitment, T0 state binding, exact-action validation, tamper detection and fail-closed cross-time revalidation**.
- It does **not** prove profitable trading, predictive alpha, calibrated forecasts, reduced real-world losses, audited security or production readiness.
- No live trading, funding or protected account action is required for the demo.

## Hackathon entry checklist

- [ ] Follow `@Binance`
- [ ] Repost the official announcement
- [x] Publish public GitHub repository
- [x] Deploy public judge surface
- [ ] Record final demo after Winner Intelligence + TRACE delta closeout
- [ ] Reply / quote-repost with demo + GitHub
- [ ] Complete the official survey before **2026-09-08 23:59 UTC**

## License

MIT
