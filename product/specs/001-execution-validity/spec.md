# Spec 001 — Execution Validity Boundary

Status: `V0_2_DELTA_RECONCILED`
Originally: `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE`
Derived from: `product/PRD.md` v0.2
Authority: `NONE`
Production owner: `PBPD`

Historical note: this specification was initially reconstructed after build had begun. The v0.2 delta below is a real forward reconciliation triggered by `product/CHANGE-REQUEST-WI-003.md` and must not be treated as retrospective pre-build compliance.

## User story

As an operator delegating financial workflow planning to an AI agent, I need the **exact proposed action** to be cryptographically bound to its frozen policy and exact T0 Binance context, then revalidated against fresh T1 state before any consequential boundary, so that stale reasoning or a silently mutated in-policy action cannot inherit old authority.

## Required behaviors

1. Normalize exact action as `symbol + side + notional_usdt`.
2. Seal current policy before market evidence is used to decide eligibility.
3. Bind receipt v2 to policy hash, exact T0 snapshot hash and exact normalized action hash.
4. Verify receipt integrity independently from the model.
5. Re-read fresh Binance state before protected action.
6. Revalidate freshness, T0→T1 drift, current market constraints, policy identity and **exact action identity**.
7. Require both action-policy compliance and `action_hash_match`; one cannot substitute for the other.
8. Return deterministic `ALLOW` or `BLOCK`.
9. Map `ALLOW → ACTION_REMAINS_VALID` and `BLOCK → REPLAN_REQUIRED`.
10. Present BLOCK to judge as `NO LONGER VALID` with exact failed invariant.
11. Preserve clean ALLOW plus adversarial BLOCK cases, including an in-policy exact-action mutation.
12. Separate controlled synthetic replay evidence from live public Binance evidence.
13. Expose the same validity contract through a narrow local stdio MCP companion callable by an agent host.
14. MCP must not fetch Binance data, trade, transfer, fund, pay, or request credentials.

## Explicit non-goals

- price prediction / alpha generation;
- live trading;
- x402/payment integration;
- Agentic Wallet writes;
- duplicating Binance MCP/Skills market or trading tools;
- replacing Binance native permissioning or order controls;
- another LLM acting as risk officer / final authorizer;
- production-readiness or loss-reduction claims.

## Acceptance scenarios

### S1 — Clean unchanged
Given eligible T0 policy/state/action and unchanged valid T1 state/action, revalidation returns `ALLOW / ACTION_REMAINS_VALID`.

### S2 — Cross-time state drift while current checks pass
Given an initially eligible decision, when T1 spread/movement/depth remain inside policy but T0→T1 mid drift exceeds the sealed threshold, return `BLOCK / REPLAN_REQUIRED` and identify `mid_drift_bps`.

### S3 — Expired authorization
Given an eligible decision receipt, when age exceeds TTL, return `BLOCK / REPLAN_REQUIRED`.

### S4 — Receipt tamper
Given a signed receipt, when protected content changes, signature verification fails and action is blocked.

### S5 — Policy mismatch
Given receipt bound to policy A, when revalidation uses materially different policy B, policy hash mismatch blocks action.

### S6 — Exact-action mutation inside the same policy cap
Given policy max `$100` and T0 action `BUY BTCUSDT $50`, when T1 action becomes `BUY BTCUSDT $75`, then:

```text
action_notional_usdt <= $100   PASS
action_hash_match              FAIL
status                         BLOCK
next_state                     REPLAN_REQUIRED
```

This proves “inside the same policy” is not “same authorized action”.

### S7 — Unknown MCP decision
Given an unknown decision id, MCP revalidation must fail closed with `BLOCK / REPLAN_REQUIRED`.

### S8 — MCP composition
`valid_until_begin` and `valid_until_revalidate` must be discoverable through MCP initialize/tools/list and must operate only on evidence supplied by the host agent.

## Judge-facing experience requirements

- first five seconds communicate `Reasoning is not authorization` and/or `A correct decision can expire`;
- Agent OS + Valid Until role split is visible early;
- receipt v2 action binding is legible without making cryptography the headline;
- one primary action triggers visible transition;
- current T1 checks PASS + exact action MATCH + premise EXPIRED are simultaneously legible;
- 20 bps threshold and 35.47 bps crossing are legible without narration;
- `REPLAN_REQUIRED` is visible as machine consequence;
- challenge/evaluation surface exposes within-policy action mutation;
- portable skill + MCP contract are findable as agent-native integration evidence;
- controlled vs live evidence is visually separated;
- responsive and reduced-motion behavior remain usable.

## Proof boundary

Target proof classes:
- `TECHNICAL_PROOF`: core 8/8 + challenge 6/6 + MCP 5/5;
- `BEHAVIOR_PROOF`: fresh post-v0.2 deployed TRACE delta required;
- `OUTCOME_PROOF`: not required / not claimed;
- `PRODUCTION_EVIDENCE`: not required / not claimed.

## Open clarifications

- exact deployed v0.2 judge legibility remains pending TRACE delta runtime review;
- detailed official scoring rubric is not publicly established in the current source set and must not be invented;
- production operator thresholds/persistence remain unknown and are outside current submission scope.
