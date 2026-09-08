# Spec 001 — Execution Validity Boundary

Status: `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE`
Derived from: `product/PRD.md`
Authority: `NONE`
Production owner: `PBPD`

This specification did not exist before the current build. It is reconstructed from the living PRD and observed implementation so that remaining work can proceed under Spec Kit without pretending historical compliance.

## User story

As an operator delegating financial workflow planning to an AI agent, I need the exact proposed action to be revalidated against the sealed intent/policy and fresh Binance state before any consequential boundary, so that stale or drifted reasoning cannot silently retain authority.

## Required behaviors

1. Seal the current policy before using market data to decide eligibility.
2. Bind the decision receipt to policy identity and exact snapshot identity.
3. Verify receipt integrity independently from the model.
4. Re-read fresh Binance state before protected action.
5. Revalidate freshness, market-state constraints and exact proposed action parameters.
6. Return exactly `ALLOW` or `BLOCK` as the deterministic terminal validity state.
7. Present `BLOCK` to the judge as `NO LONGER VALID` with the exact failed invariant.
8. Require fresh reasoning after BLOCK; do not weaken policy in-cycle.
9. Preserve a clean unchanged ALLOW case plus adversarial BLOCK cases.
10. Separate controlled synthetic replay evidence from live public Binance evidence.

## Explicit non-goals

- price prediction / alpha generation;
- live trading;
- replacing Binance native permissioning or order controls;
- another LLM acting as risk officer / final authorizer;
- production-readiness or loss-reduction claims.

## Acceptance scenarios

### S1 — Clean unchanged
Given an eligible sealed decision and unchanged valid state, when revalidated before action, then status is `ALLOW`.

### S2 — State drift
Given an initially eligible decision, when mid-price drift exceeds the sealed threshold, then status is `BLOCK` and failed check identifies drift.

### S3 — Expired authorization
Given an eligible decision receipt, when age exceeds TTL, then status is `BLOCK`.

### S4 — Receipt tamper
Given a signed receipt, when protected receipt content is changed, signature verification fails and action is blocked.

### S5 — Policy mismatch
Given a receipt bound to policy A, when revalidation uses materially different policy B, then policy hash mismatch blocks the action.

### S6 — Intent / notional mismatch
Given sealed maximum notional, when the proposed exact action exceeds it or changes symbol, then the action is invalid before execution.

## Judge-facing experience requirements

- first five seconds communicate `Reasoning is not authorization`;
- one primary action triggers a visible state transition;
- the 20 bps threshold and 35.47 bps crossing are legible without narration;
- controlled vs live evidence is visually separated;
- challenge/evaluation surface makes repeatability visible;
- responsive and reduced-motion behavior must remain usable.

## Proof boundary

Current target proof classes:
- `TECHNICAL_PROOF`: required;
- `BEHAVIOR_PROOF`: required for deployed judge path only;
- `OUTCOME_PROOF`: not required / not claimed;
- `PRODUCTION_EVIDENCE`: not required / not claimed.

## Open clarifications

- Exact deployed first-15-second judge legibility remains pending TRACE/runtime review.
- Detailed official scoring rubric is not publicly established in the current source set and must not be invented.
- Production operator thresholds remain unknown and are outside current submission scope.
