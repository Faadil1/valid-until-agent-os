# Valid Until — Winner Intelligence Rerun 003

Date: 2026-09-08
Owner: Hackathon Opportunity Intelligence / Winner Intelligence
Authority: NONE
Trigger: human requested a broader scan of the official Binance announcement replies/quotes, current public submissions, hidden integrations, and podium-oriented gaps before final video freeze.

## Research boundary

Direct automated retrieval of the full X reply/quote thread is blocked by X access controls in the available research runtime. This rerun therefore triangulates the current field from:

- the official Binance event post/blog;
- indexed X quote/reply mirrors and hashtag surfaces;
- public GitHub repositories explicitly identifying themselves as Track A submissions;
- adjacent Binance Skills Hub activity where it materially collides with the category.

This is a broad current-public corpus, not a claim of exhaustive discovery of every reply.

## Official prize target

Track A pool: 20,000 USDC.

- 1st: 2,000 USDC
- 2nd: 1,500 USDC
- 3rd: 1,000 USDC
- next 50 winners: 300 USDC each

The target for this rerun is therefore not merely top-50 eligibility. It is maximal first/second/third-place distinctiveness without adding unsupported claims or unsafe execution.

## Expanded current-submission patterns

Observed current families include:

1. autonomous signal/trading agents — DARWIN, Binance-Agent and similar;
2. trade-readiness/risk agents — ProofGate, RiskPilot, AlphaPilot, TrendHunter, AI Research & Risk Agent;
3. generic safety/guardrail agents — ALPS Guard, Guardrail Desk, SafeFirst;
4. deterministic preflight agents — Trade Preflight Agent;
5. reasoning adversaries — ThoughtProof Sentinel, Second Opinion;
6. deterministic governance/risk desks — The Skeptic;
7. on-chain policy/budget enforcement — DriftMate;
8. broad Agentic Wallet / x402 / DeFi desks — Keel/SafeLane;
9. x402-native research/payment flows — Tollgate;
10. market/sentiment/specialized intelligence — WhaleWatch, Nova Deep Market Agent and related variants.

## Strongest same-category competitors after expanded scan

### The Skeptic

Material strengths:
- real local MCP server plus Agent OS client path;
- explicit confirm-before-execute governance model;
- user-owned rulebook;
- strong designed console;
- same-market A/B evidence;
- visible failure/rejection path;
- Agent OS OAuth/reachability work.

Collision: HIGH on deterministic governance and agent-native integration, LOW on cross-time premise validity.

### Second Opinion

Material strengths:
- deterministic zero-LLM adversary;
- local MCP server and pre-tool execution hook;
- actual enforcement surface rather than documentation-only integration;
- historical base-rate evidence;
- explicit failure of its own APPROVE behavior preserved in evaluation.

Collision: HIGH on pre-execution enforcement and evidence discipline, LOW on T0→T1 state binding.

### Trade Preflight Agent

Material strengths:
- live order-book preflight;
- short-lived execution ticket;
- current exchange rules;
- production-mode handoff contract;
- final refresh before a single MCP order.

Collision: VERY HIGH in generic preflight language. Key distinction remains that its preflight evaluates the action/current state while Valid Until binds the current action to the exact earlier decision context.

### ThoughtProof Sentinel

Material strengths:
- pre-execution reasoning verification;
- live experimental claims;
- re-plan loop;
- clean ALLOW/BLOCK/UNCERTAIN mental model.

Collision: HIGH in generic verifier language, LOW in cross-time premise binding.

## Hidden spot 003-01 — exact-action claim is stronger than the current receipt

Status: CRITICAL REAL GAP

Current engine behavior before this rerun:
- receipt cryptographically binds policy hash and T0 snapshot hash;
- T1 proposed action is checked against symbol and max-notional policy;
- receipt does **not** cryptographically bind the exact T0 proposed action.

Consequence:

```text
T0 action = BUY BTCUSDT $50
policy max = $100
T1 action = BUY BTCUSDT $75
```

Both actions satisfy the same policy, so an action mutation inside the policy envelope can escape the phrase “exact action”.

This is a product-integrity bug, not a cosmetic improvement.

Required repair:
- bind normalized exact action (at least symbol, side, notional) into receipt v2;
- include `action_hash` under the signature;
- revalidation requires `action_hash_match`;
- add a test where action mutates **within** the policy cap and still BLOCKs.

## Hidden spot 003-02 — Agent OS agent shape is improved but enforcement surface is still mostly skill/document-driven

Status: MATERIAL

Current strengths:
- portable `skills/valid-until/SKILL.md` exists;
- top-level `AGENTS.md` exists;
- live Binance path uses official Binance CLI.

Remaining gap compared with the strongest current entrants:
- no callable local tool surface that an agent host can invoke as a deterministic authority boundary.

Previous WI-002 rejected “local MCP merely for optics.” That rejection remains correct.

New decision:

A local MCP becomes justified **only if it is the actual interface to the unique cross-time contract**, not another generic tool surface.

Authorized form:

```text
Agent host + Binance Agent OS MCP
        ↓ fresh observations
Valid Until MCP companion
        ↓ begin decision contract / revalidate exact action
ALLOW | BLOCK + REPLAN_REQUIRED
```

The MCP must not trade, fund, transfer, sign wallet transactions, or duplicate Binance market-data capabilities.

## Hidden spot 003-03 — BLOCK has a rule but not an agent-native handoff state

Current copy says “fresh reasoning required”, but the machine interface should explicitly return a next-state contract such as:

`REPLAN_REQUIRED`

This improves workflow completeness without adding a second LLM or deciding what the new trade should be.

## Hidden spot 003-04 — integration breadth is not the winning gap

### x402

Verdict: REJECT FOR CORE SUBMISSION.

Why:
- current event already contains x402/payment-focused submissions;
- x402 does not strengthen cross-time action validity;
- adding paid resources creates wallet/payment scope and distracts from the one memorable mechanism.

### Agentic Wallet

Verdict: DO NOT ADD WRITE PATH.

Possible future extension: bind balance/exposure observations as additional policy facts, but the current sponsor-native capability is already adequately represented by Binance observations. Wallet writes are not necessary to prove the product job.

### Live trading

Verdict: REJECT FOR TRACK A PACKAGE.

Why:
- Track A does not require a trade;
- Track B is the explicit connect-MCP-and-trade lane;
- live trading adds account/funding/jurisdiction/operational risk without proving the unique mechanism;
- strong current Track A submissions already demonstrate that real trading is not necessary for a compelling agent product.

### MCP

Verdict: PROMOTE, but only as a **core contract surface** after receipt-v2 exact-action binding is implemented.

## Hidden spot 003-05 — memorable category sentence

Existing canonical thesis remains:

> Reasoning is not authorization.

Existing memory line remains:

> A correct decision can expire.

New competitor-proof explanation:

> **Preflight asks whether this action is acceptable now. Valid Until asks whether this is still the same action-decision contract that was justified then.**

Do not lead with competitor names in product UI.

## Expanded win-oriented mechanism transfer

Preserve the verified winner-mechanism policy: mechanism transfer is allowed; style copying and causal win claims are prohibited.

Promoted transfer:

`deep primitive → one unmistakable failure → one user-visible consequence`

For Valid Until:

```text
all current checks remain green
+ exact action remains unchanged
+ permission remains available
BUT cross-time premise contract breaks
→ NO LONGER VALID
→ REPLAN_REQUIRED
```

This is more distinctive than a feature checklist.

## Required bounded rework

1. Receipt v2 exact-action hash binding.
2. In-policy action mutation evaluation proving `$50 → $75` BLOCK despite both being under policy cap.
3. Local Valid Until MCP companion exposing only the decision-contract lifecycle.
4. MCP smoke test in CI.
5. `BLOCK → REPLAN_REQUIRED` machine state.
6. README/skill/AGENTS wording updated to match the actual engine.
7. No x402, wallet writes or live trading.
8. Re-run CI, deploy and TRACE delta assurance before video freeze.

## Rerun verdict

```text
WINNING_INTELLIGENCE_RERUN_003 = MATERIAL_BOUNDED_REWORK_REQUIRED
CORE_PRODUCT = KEEP
CROSS_TIME_SIGNATURE = KEEP_AND_STRENGTHEN
EXACT_ACTION_BINDING = FIX_REQUIRED
MCP_COMPANION = PROMOTE_AS_CORE_INTERFACE
X402 = REJECT
AGENTIC_WALLET_WRITES = REJECT
LIVE_TRADING = REJECT
TRACE_6_75_VIDEO_FREEZE = PAUSED
NEXT_OWNER = PBPD
```
