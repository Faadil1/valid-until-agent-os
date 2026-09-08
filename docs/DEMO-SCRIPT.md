# Valid Until — final demo working script

**Status:** `TRACE_6_75_CONTRACT_READY__FINAL_ENCODED_VIDEO_PENDING`

Current authoritative film contract:
`Faadil1/trace-design-workflow/state/projects/valid-until/GATE_6_75_DEMO_NARRATIVE_003.md`

Judge optimization source: `product/JUDGE-OPTIMIZATION-EVIDENCE-001.md` + Judge Performance Assurance v1.3.

The governing assurance chain is:

```text
RUBRIC → PAIN → PROBLEM → DIFFERENTIATOR → EXECUTION → EVIDENCE → STORY → DEMO → Q&A
```

For the 60-second film, `RUBRIC` remains an internal proof map and `Q&A` remains prepared outside the main cut. The visible/narrated sequence therefore compresses to:

```text
PAIN + PROBLEM
→ DIFFERENTIATOR
→ EXECUTION
→ EVIDENCE + STORY + DEMO
→ MEMORY CLOSE
```

not feature count or architecture density.

## Target

```text
58–65 seconds
primary surface: https://valid-until-agent-os-plum.vercel.app
desktop first
do not record localhost
```

## Final working sequence

### 0–5s — Pain + problem + memory

Show the compact B+C hero.

Say:

> **A correct decision can expire. Reasoning is not authorization.**

Make the pain explicit: the agent can still retain execution authority after the premise behind its exact action has changed.

### 5–13s — Differentiator + execution model

Stay on hero/architecture strip long enough to make the distinction audible **before** technical detail.

Say:

> **A preflight asks whether an action is acceptable now. Valid Until asks whether this exact old action is still justified by the decision that produced it.**

Then immediately:

> The agent proposes. Binance Agent OS supplies fresh observations. Valid Until revalidates the exact action-decision contract.

Do not lead with MCP internals or cryptography.

### 13–20s — T0 contract

Show BTCUSDT and receipt v2.

Make visible:
- exact action;
- policy bound;
- `V2 · ACTION-BOUND`;
- T0 eligibility.

### 20–32s — Demo begins: Replay

Click **Replay proof**.

Do not cut while the marker crosses the 20 bps limit. Land on `35.47` and the orange terminal sheet.

### 32–43s — Evidence + story signature reveal

Keep these readable together:

```text
CURRENT STATE CHECKS   PASS 4/4
EXACT ACTION HASH      MATCH
T0 → T1 PREMISE        FAIL 35.47 > 20 BPS

→ NO LONGER VALID
→ REPLAN_REQUIRED
```

Say:

> **Fresh does not mean same premise.**

This is the main aha moment. Give it more time than any implementation detail.

### 43–49s — Repeatability evidence

Open `/evaluations`.

Show `6/6` and mention only the important breadth:
- clean ALLOW;
- drift;
- expiry;
- tamper;
- policy mismatch;
- exact-action mutation inside the policy cap.

### 49–56s — Verified execution credibility

Open `/live-proof`.

Show the already-captured historical authenticated Binance Spot Testnet evidence:

```text
orderId       13634770
clientOrderId vu-mtswxiik-ecb6b093
status        FILLED
same order    verified
```

Narration boundary:

> Separately, one authenticated Binance Spot Testnet order was previously executed and queried back under an ALLOW decision — non-production, no real funds. This page does not create a new order.

Do **not** click or narrate anything as if a new trade is being sent.

### 56–62s — Story close / memory

Return to the core memory line or agent-native card.

> **The model can propose. It cannot authorize itself. Valid Until — a correct decision can expire.**

## Recommended narration v3.1

> A correct decision can expire. Reasoning is not authorization. An AI agent can keep execution authority after the premise behind its exact action has changed. A preflight asks whether an action is acceptable now. Valid Until asks whether this exact old action is still justified by the decision that produced it. The agent proposes, Binance Agent OS supplies fresh observations, and Valid Until binds policy, T0 state and the exact action into a short-lived decision contract. Here BTCUSDT starts eligible. Replay. The market moves thirty-five point four seven basis points — beyond the original twenty-basis-point bound. Yet current checks still pass four out of four, and the exact action still matches. Fresh does not mean same premise. The old decision is no longer valid, so the agent must replan. Six deterministic cases test clean allow, drift, expiry, tamper, policy mismatch and an action mutation inside the policy cap. Separately, one authenticated Binance Spot Testnet order was previously executed and queried back under ALLOW — non-production, no real funds, and this page creates no new order. The model can propose. It cannot authorize itself. Valid Until — a correct decision can expire.

## Film truth rules

MUST:
- pain/problem understandable in ~5 seconds;
- differentiator explicit before receipt/implementation detail;
- controlled replay = synthetic / no money moves;
- historical execution = real authenticated Binance Spot Testnet evidence;
- historical execution = non-production / no real funds;
- current read refresh = read-only and not a new execution;
- current checks PASS while cross-time premise FAILS;
- exact action remains MATCH in the signature replay;
- `ALLOW` means execution validity only.

MUST NOT:
- imply the replay is live;
- imply a new order is placed during the video;
- say no historical trade exists;
- call Valid Until generic trade readiness, generic risk preflight, or a general safety agent;
- claim profitability, reduced loss, financial advice, audited security or production reliability;
- foreground Ed25519, SHA-256, source-tree walkthroughs, x402, wallet breadth or sponsor-logo montage.

## Q&A appendix

Prepare, but do not spend film time on unless needed:
1. Why not a limit order / stop-loss?
2. Why not generic current-state preflight?
3. Why not 20–30 lines of deterministic checks?
4. Why use an AI agent at all?
5. What does `ALLOW` mean and not mean?
6. Why is the historical Testnet order separate from the controlled BLOCK replay?

Use `docs/JUDGE-MATRIX.md` for the reconciled answers.

## Pre-record checklist

Before recording, confirm:

```text
RUBRIC proof map             INTERNAL / covered
PAIN                         ≤5s
PROBLEM                      ≤5s
DIFFERENTIATOR               audible by ~10s
EXECUTION                    Agent → Binance Agent OS → Valid Until
EVIDENCE                     PASS 4/4 + MATCH + FAIL 35.47 > 20 + 6/6 + historical Testnet proof
STORY                        A correct decision can expire / Fresh does not mean same premise
DEMO                         deterministic Replay proof
Q&A                          JUDGE-MATRIX ready
```

## Freeze rule

This script is packaging, not Gate 6.75 PASS. The actual encoded artifact must still return to TRACE for compression/readability and claim-truth review. No subsystem may infer Gate 6.75 PASS from this file alone.
