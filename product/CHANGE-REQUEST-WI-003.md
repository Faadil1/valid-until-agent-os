# Change Request WI-003 — Exact Action Contract + MCP Companion

Date: 2026-09-08
Source: `product/WINNER-INTELLIGENCE-RERUN-003-X-CORPUS.md`
Owner for implementation: PBPD
Scope class: BOUNDED_CORE_INTEGRITY_AND_AGENT_INTERFACE_REWORK

## Why this change exists

Expanded same-event research identified one real product-integrity mismatch and one material integration gap:

1. the current receipt binds policy + T0 snapshot but not the exact T0 proposed action;
2. the project has a portable skill and agent contract, but no callable deterministic agent interface.

The rework strengthens the existing product job; it does not pivot into trading, payments, wallet management or risk scoring.

## Frozen invariants

MUST NOT CHANGE:
- `Reasoning is not authorization.`
- `A correct decision can expire.`
- deterministic code remains final authority;
- controlled replay remains synthetic and labeled;
- live Binance evidence remains read-only;
- `NO LONGER VALID` remains hero terminal state;
- no outcome/profit/safety claim;
- no x402;
- no wallet write/funding;
- no live order execution;
- no generic risk score;
- no second LLM critic;
- no dark crypto dashboard redesign.

## CR-003-01 — Receipt v2 exact-action binding

Required:
- normalize initial action with `symbol`, `side`, `notional_usdt`;
- validate initial action against policy;
- sign `action_hash` and transparent action fields in receipt;
- bump receipt contract to `valid-until.receipt.v2`;
- revalidation requires current proposed action hash to equal receipt action hash;
- mutation inside policy envelope must still fail exact-action binding.

Canonical regression:

```text
policy max = $100
T0 exact action = BUY BTCUSDT $50
T1 mutated action = BUY BTCUSDT $75
current market = acceptable
$75 is still below policy max
BUT action_hash_match = false
→ BLOCK
```

## CR-003-02 — Agent-native MCP companion

Add a dependency-free stdio MCP companion exposing only the Valid Until contract lifecycle.

Minimum tools:

### `valid_until_begin`
Input:
- sealed-policy candidate;
- normalized T0 Binance snapshot supplied by host agent;
- exact action.

Behavior:
- validate policy/action/snapshot;
- seal policy;
- evaluate initial eligibility;
- issue action-bound receipt v2;
- retain decision state in-process by decision id.

### `valid_until_revalidate`
Input:
- decision id;
- fresh T1 normalized Binance snapshot;
- exact action being proposed now.

Behavior:
- verify signed receipt;
- revalidate policy identity, TTL, current-state conditions, cross-time drift and action hash;
- return `ALLOW` or `BLOCK`;
- on BLOCK return `next_state: REPLAN_REQUIRED`.

Hard boundaries:
- MCP never fetches Binance itself;
- MCP never places an order;
- MCP never requests credentials;
- MCP never signs wallet/payment transactions;
- Binance Agent OS remains source of sponsor-native observations/capabilities.

## CR-003-03 — MCP smoke/evaluation

CI must prove:
- initialize + tools/list works;
- begin creates an ELIGIBLE action-bound contract;
- revalidate blocks cross-time state drift while current checks pass;
- revalidate blocks within-cap exact-action mutation;
- unknown decision id fails closed.

## CR-003-04 — Surface exact-action truth

Judge-facing copy may add a compact exact-action binding cue, but no major redesign.

Minimum:
- receipt/action hash available in evidence;
- evaluation names `action_hash_match`;
- red-team case explains that the mutation is within the policy cap, proving exact-action rather than generic max-notional control.

## Exit criteria

Return to TRACE delta assurance only when:
1. receipt v2 is active everywhere;
2. exact-action mutation test passes;
3. MCP companion exists and smoke tests pass;
4. all existing deterministic/current-state/cross-time tests still pass;
5. Vercel build remains valid;
6. live read-only proof path remains no-trade;
7. docs/skill/AGENTS accurately describe the implementation;
8. no rejected integration was introduced.

## Routing

`WINNING INTELLIGENCE RERUN 003 → PBPD IMPLEMENTATION → CI → VERCEL → TRACE 6.5 DELTA RECHECK → WINNING INTELLIGENCE FINAL RECHECK → TRACE 6.75 VIDEO REFRESH`

No submission authority is emitted.
