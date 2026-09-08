# Valid Until — execution integrity for AI agents

> **Reasoning is not authorization.**
>
> **A correct decision can expire.**

**Valid Until** is a cross-time execution-validity agent workflow built for the **Binance Agent OS Mini Hackathon — Track A**.

**Live judge surface:** https://valid-until-agent-os.vercel.app  
**Red-team surface:** https://valid-until-agent-os.vercel.app/evaluations  
**Portable agent skill:** [`skills/valid-until/SKILL.md`](skills/valid-until/SKILL.md)  
**Agent-native companion:** `npm run mcp`

An AI agent can make a correct decision at T0, then reach execution at T1 after the market state or policy conditions that justified that decision have changed. The capability can still exist. Current market checks can still look acceptable. The **old action can still be invalid because it no longer belongs to the premise that justified it**.

Valid Until now binds **three things into one short-lived decision contract**:

1. the frozen user policy;
2. the exact T0 Binance state;
3. the exact normalized proposed action (`symbol + side + notional`).

That is the product.

## The signature proof

The controlled replay is deliberately constructed so that a generic current-state preflight is **not enough**.

At T1:

| Check | Result |
|---|---:|
| Receipt signature | PASS |
| Policy identity | PASS |
| **Exact action hash** | **PASS** |
| Receipt age: `3s <= 5s` | PASS |
| Current spread: `0.37 <= 8 bps` | PASS |
| Current abs 1m movement: `47.2 <= 80 bps` | PASS |
| Current top-5 bid depth: `$171k >= $50k` | PASS |
| Current top-5 ask depth: `$168k >= $50k` | PASS |
| **T0 → T1 mid drift: `35.47 > 20 bps`** | **FAIL** |

So the engine returns:

```text
CURRENT-STATE CHECKS: PASS
EXACT ACTION: MATCH
ORIGINAL DECISION PREMISE: EXPIRED
→ NO LONGER VALID
→ REPLAN_REQUIRED
```

**Fresh does not mean same premise.**

## The second proof: exact action really means exact action

A policy cap alone is not enough. The red-team suite now tests a subtler mutation:

```text
policy max = $100
T0 signed action = BUY BTCUSDT $50
T1 proposed action = BUY BTCUSDT $75
```

Both `$50` and `$75` are legal under the `$100` policy cap. A generic max-notional check therefore passes.

Valid Until still returns `BLOCK` because receipt v2 signed the exact T0 action hash:

```text
action_notional_usdt <= $100   PASS
action_hash_match              FAIL
→ BLOCK / REPLAN_REQUIRED
```

This closes the gap between “inside the same policy” and “the same authorized decision contract.”

## Four different questions

Valid Until is intentionally narrower than the crowded “AI safety / trade readiness” category.

| Layer | Question |
|---|---|
| Reasoning verifier | Was the model's reasoning supported? |
| Current-state preflight | Is the action acceptable under current conditions? |
| Permission layer | May the agent use this capability? |
| **Valid Until** | **Is this exact previously-justified action still valid relative to its original premise now?** |

This is why the project binds the T0 decision state **and exact T0 action**, not just the latest market state.

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
Valid Until MCP / deterministic engine
  seals policy + T0 state + exact action
  revalidates exact action at T1
        ↓
ALLOW / BLOCK
        ↓
BLOCK => REPLAN_REQUIRED
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

### Run the Valid Until MCP companion

```bash
npm run mcp
```

It exposes exactly two stdio MCP tools:

- `valid_until_begin` — seal policy + normalized T0 Binance snapshot + exact action into an Ed25519-signed receipt v2;
- `valid_until_revalidate` — recheck a fresh T1 snapshot and the exact action now being proposed.

The companion deliberately **does not fetch Binance data itself**. The host agent obtains sponsor-native observations from Binance Agent OS, then passes normalized snapshots into the Valid Until contract. It also has no order, transfer, wallet, x402 or funding capability.

This gives an agent host a real callable authority surface without duplicating Binance's tools.

## Why Agent OS matters

Binance Agent OS is the sponsor-native observation/capability environment. Valid Until does not replace Binance permissions or wallet controls. It adds a different boundary:

```text
Binance controls what capability may exist.
Valid Until controls whether this exact old proposal is still the same valid decision contract now.
```

Live mode uses the official `binance-cli` for Binance public market data instead of hand-rolling a separate exchange client.

## 60-second judge story

```text
USER POLICY + EXACT ACTION
  BUY BTCUSDT $100
  max spread      8 bps
  max mid drift  20 bps
  max age          5 sec
  min top-5 depth $50k/side
        │
        ▼
[1] POLICY + ACTION FROZEN BEFORE MARKET READ
        │ policy hash + action hash
        ▼
[2] BINANCE MARKET SNAPSHOT / T0
        │ via official binance-cli in live mode
        ▼
[3] DECISION RECEIPT V2
        │ Ed25519-signed + state-bound + action-bound + short-lived
        ▼
[4] PRE-ACTION REVALIDATION / T1
        │ current checks still pass
        │ exact action still matches
        │ T0→T1 market moved 35.47 bps
        ▼
[5] NO LONGER VALID
    REPLAN_REQUIRED
```

**The authorization was still valid. The premise was not.**

The included controlled replay is intentionally deterministic so judges can see the failure path immediately. The separate live command captures real public Binance market data but performs **no order placement**.

## Run the deterministic proof

```bash
npm run build:web
npm run test:all
npm run demo
```

Current CI-backed output:

```text
PASS 8/8 — seal, eligibility, receipt-v2 action binding, signature, tamper-detection, drift block, TTL block, exact-action mutation block
PASS 6/6 — clean allow, state drift, expiry, receipt tamper, policy mismatch, exact-action mutation inside policy cap
PASS MCP 5/5 — initialize, tool discovery, cross-time drift block, within-cap action mutation block, unknown decision fail-closed
```

## Six-case red-team suite

The judge-facing evaluation suite is not a happy-path showcase:

1. clean unchanged case → `ALLOW`;
2. state drift while current checks remain acceptable → `BLOCK`;
3. expired authorization → `BLOCK`;
4. receipt tamper → `BLOCK`;
5. policy mismatch → `BLOCK`;
6. **exact-action mutation `$50 → $75` inside the same `$100` cap** → `BLOCK` via `action_hash_match`.

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

Optional recheck interval / representative action:

```bash
VALID_UNTIL_RECHECK_MS=4000 \
VALID_UNTIL_ACTION_SIDE=BUY \
VALID_UNTIL_ACTION_NOTIONAL_USDT=50 \
npm run live -- BTCUSDT
```

Live mode:

1. freezes policy before reading the market;
2. normalizes and binds the exact representative action;
3. reads Binance public state;
4. creates an action-bound signed decision receipt v2;
5. waits for the bounded recheck interval;
6. reads Binance again;
7. compares T1 against current policy constraints, the exact T0 action **and the exact T0 premise**;
8. outputs `ALLOW` or `BLOCK` with exact failed invariants.

**It never places an order.**

## Evidence status

Current canonical evidence:

- core deterministic invariants: **8/8 PASS**;
- deterministic challenge suite: **6/6 PASS**;
- MCP companion smoke/enforcement: **5/5 PASS**;
- receipt contract: **v2 policy + snapshot + exact-action bound**;
- live Binance CLI public-data proof: existing GitHub Actions live run `34225133745` (pre-v2 authenticity proof; a fresh v2 live capture is required before final freeze if the workflow is rerun);
- TRACE deployed-browser evidence before this latest bounded Winner Intelligence rework: desktop/mobile × normal/reduced-motion **4/4 PASS**;
- no outcome proof or production financial-safety claim.

The Winner Intelligence 003 rework must receive fresh deployed TRACE delta assurance before the final video is frozen.

## Core invariants

1. **Policy first.** Constraints are hashed before market data is read.
2. **Exact-state binding.** The decision receipt is tied to a canonical T0 snapshot hash.
3. **Exact-action binding.** Receipt v2 signs normalized `symbol + side + notional`; a different in-policy action still fails.
4. **Short-lived validity.** Every receipt has a bounded validity window.
5. **Cross-time revalidation.** T1 must remain within the sealed decision contract relative to T0.
6. **Current-state revalidation.** Spread, movement and liquidity must still satisfy policy.
7. **Tamper evidence.** Receipt mutation breaks Ed25519 verification.
8. **Fail closed.** Any required failed invariant produces `BLOCK → REPLAN_REQUIRED`.
9. **No self-claimed alpha.** Valid Until does not predict returns or claim to make trading profitable.

## Repository layout

```text
AGENTS.md                         host-agent orchestration contract
skills/valid-until/SKILL.md      portable agent skill
config/policy.example.json       user-defined frozen constraints
data/replay/                     deterministic two-snapshot judge case
src/mcp-server.mjs               read-only Valid Until MCP contract surface
src/snapshot.mjs                 Binance CLI capture + normalization
src/policy.mjs                   eligibility + exact-action/cross-time revalidation
src/receipt.mjs                  Ed25519 action-bound receipt v2
src/demo.mjs                     deterministic failure-path proof
src/live.mjs                     live read-only Binance path
tests/                           core + challenge + MCP smoke tests
web/                             judge-facing proof UI
docs/                            integration, demo and submission assets
product/                         PRD, Winner Intelligence and lifecycle evidence
```

## What we deliberately did not add

The current Track A landscape already contains strong projects around wallet breadth, x402, risk scoring, current-state preflight, historical analysis, reasoning verification and multi-agent risk roles. Valid Until stays narrow by design.

This submission does **not** add:

- generic trade signals;
- a risk score;
- x402/payment flows;
- Agentic Wallet write paths;
- a second LLM critic;
- live order execution;
- an MCP that duplicates Binance market/trading tools.

The local MCP companion exists because it is the actual machine interface to the **unique action-bound cross-time contract**, not for integration-count optics.

## Claim boundaries

- Controlled replay uses synthetic Binance-shaped fixtures and is explicitly labeled.
- Live mode reads authentic public Binance market data through the official Binance CLI.
- The project proves **policy commitment, T0 state binding, exact-action binding, tamper detection and fail-closed cross-time revalidation**.
- The MCP companion proves the contract can be invoked by an agent host; it does not prove authenticated Binance trading interoperability.
- It does **not** prove profitable trading, predictive alpha, calibrated forecasts, reduced real-world losses, audited security or production readiness.
- No live trading, funding or protected account action is required for the demo.

## Hackathon entry checklist

- [ ] Follow `@Binance`
- [ ] Repost the official announcement
- [x] Publish public GitHub repository
- [x] Deploy public judge surface
- [ ] Fresh deploy + TRACE delta after Winner Intelligence 003
- [ ] Record final demo only after that delta closes
- [ ] Reply / quote-repost with demo + GitHub
- [ ] Complete the official survey before **2026-09-08 23:59 UTC**

## License

MIT
