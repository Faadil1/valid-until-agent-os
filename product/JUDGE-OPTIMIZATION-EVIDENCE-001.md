# Valid Until — Judge Optimization Evidence 001

Date: 2026-09-08
Owner: Winning Intelligence / TRACE input only
Authority: NONE
Scope: judge-path optimization; no product-scope expansion

## Source set

1. User-provided winner-pattern screenshot summarizing a recurring hackathon heuristic:
   `Problem → Execution → Pain → Story → Demo`.
2. Unstop — *How to Judge a Hackathon When You're Actually Trying to Hire Someone*.
3. Masai School — *How to win an AI Hackathon in 2026 (Full Guide)*.

These are not treated as universal judging rules. They are external calibration evidence for how to make an already-built product legible under time pressure.

## High-signal external principles

### Unstop

The useful parts for Valid Until:
- problem understanding should be visible, not implied;
- technical execution carries high observable weight;
- feasibility matters alongside polish;
- judges should be able to see why alternatives were rejected;
- strong technical execution means an end-to-end working system with edge-case handling and explainable architecture;
- solution quality and presentation quality should be separable;
- communication includes proactively explaining important decisions and defending them under follow-up.

### Masai School

The useful parts for Valid Until:
- read the rubric early and build for observable scoring criteria;
- narrow scope until the core can be finished and demonstrated reliably;
- get a working skeleton early rather than maximize architecture breadth;
- script the demo before final polishing;
- make the product understandable quickly;
- prioritize the first-minute `aha` over a catalogue of features;
- use AI agents deliberately, not as a substitute for product judgment.

### Winner-pattern screenshot

Treat as an empirical memory aid rather than a formal rubric:

```text
Problem → Execution → Pain → Story → Demo
```

For Valid Until the ordering is normalized into a judge journey:

```text
Problem
  a correct AI decision can outlive the premise that justified it
        ↓
Pain
  capability/permission can remain available while the exact action is stale
        ↓
Execution
  seal policy + exact action + T0 premise, then revalidate at T1
        ↓
Story
  The authorization was still valid. The premise was not.
        ↓
Demo
  current checks stay acceptable, T0↔T1 contract breaks, NO LONGER VALID
  plus authentic Binance Spot Testnet consequence when ALLOW occurs
```

## Judge-path rules promoted for the final package

1. **Problem legibility ≤ 15 seconds.**
   A judge should understand the failure before seeing implementation detail.
2. **The memory moment is `NO LONGER VALID`.**
   MCP, Ed25519, SHA-256, CLI and receipts support the claim but are not the hook.
3. **Show proof, not architecture density.**
   Every technical detail shown must answer a likely judge objection.
4. **Problem / Pain / Execution / Story / Demo must all be present.**
   No stage may be replaced by feature enumeration.
5. **Current-state preflight vs cross-time contract must be visibly distinguished.**
   `fresh enough now` is not the same as `still justified then`.
6. **Technical execution must be observable end-to-end.**
   Deterministic replay + red-team + authentic Binance evidence + bounded Spot Testnet execution path.
7. **Alternative rejection must be defendable.**
   Prepare answers for stop-loss, limit order, static permission cap, generic preflight and “30 lines of Python”.
8. **Feasibility and claim boundaries stay visible.**
   Spot Testnet is non-production; no real-funds or mainnet claim; BLOCK is legitimate evidence.
9. **Do not add features for rubric theatre.**
   x402, wallet writes, extra indicators or extra LLM agents remain rejected unless a later owner proves necessity.
10. **Final demo must spend more time on behavior than internals.**
    The product should be explainable before implementation details appear.

## Canonical judge narrative

> **Reasoning is not authorization.**
>
> An AI agent can make a correct decision and still reach the execution boundary after the premise that justified that action has changed.
>
> Valid Until binds the exact action to the sealed policy and T0 state, then revalidates that same contract against fresh Binance state at T1.
>
> If the relationship no longer holds, the result is **NO LONGER VALID → REPLAN_REQUIRED**.

Supporting memory sentence:

> **A correct decision can expire.**

## Q&A objections to prepare

### Why not a limit order or stop-loss?
Those encode a standing price/execution instruction. They do not prove that the exact action still belongs to the same decision premise after policy/state/context changes.

### Why not a generic current-state preflight?
A current-state preflight asks whether the action is acceptable now. Valid Until asks whether the *old exact action* is still justified by the state/policy contract that produced it.

### Why not 20–30 lines of checks?
Individual checks are intentionally simple. The product primitive is the deterministic contract separating probabilistic proposal from execution authority across time, with exact-action identity, sealed policy/state, replayable evidence and a replan handoff.

### Why use an AI agent at all?
The agent handles fuzzy intent and proposal generation. The deterministic layer deliberately refuses to let probabilistic reasoning authorize itself.

### Does ALLOW mean the trade is good or profitable?
No. ALLOW means only that the exact action remains valid under the sealed execution-validity contract. It is not an alpha, profitability or financial-safety claim.

## Integration points

- `docs/JUDGE-MATRIX.md` should reflect these judge objections and proof classes.
- TRACE Gate 6.75 should use this artifact after the live Spot Testnet proof is closed.
- Winning Intelligence final recheck should score judge-path legibility against this artifact.
- Project Finisher should verify the final video/site do not over-explain internals before the `aha` moment.

## Lifecycle effect

```text
PRODUCT_SCOPE_CHANGE = NONE
JUDGE_NARRATIVE_CHANGE = PROMOTED
FINAL_VIDEO_SCRIPT = NOT_YET_FROZEN
TRACE_6_75 = STILL_PAUSED_UNTIL_LIVE_TESTNET_PROOF
```
