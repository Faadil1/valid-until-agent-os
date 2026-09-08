---
name: valid-until
description: Action-bound cross-time execution-validity boundary for Binance Agent OS. Use when an AI agent has proposed a consequential financial action and must prove that the exact action still matches the sealed policy, exact T0 Binance state and exact T0 action before any protected execution boundary.
metadata:
  version: 0.3.0
  author: Faadil Boussari
  requires:
    bins:
      - node
      - binance-cli
license: MIT
---

# Valid Until

## Memory line

**A correct decision can expire.**

Canonical thesis: **Reasoning is not authorization.**

## When to use

Use this skill after an AI agent has interpreted the user's intent and proposed an exact Binance action, but before any consequential execution boundary.

Valid Until is not a trading-signal generator and is not a second LLM critic. It checks whether a previously justified action is **still the same valid decision contract relative to the exact policy, exact T0 state and exact T0 action that justified it**.

The key distinction is cross-time:

```text
reasoning verifier      -> was the model's reasoning sound?
current-state preflight -> is the action acceptable under current conditions?
permission layer        -> may the agent use this capability?
Valid Until             -> is this exact old action still the same justified contract now?
```

A fresh current-state check can pass while the original decision still expires because the world moved materially away from T0.

## Submission safety boundary

This Track A submission is **read-only by design**.

- Never place an order.
- Never transfer or fund an account.
- Never invoke x402 payments.
- Never request or expose Binance API secrets.
- Never bypass a geographic or product restriction.
- If a required check cannot be completed, fail closed.
- Model prose must never override a deterministic `BLOCK`.

## Required workflow

1. **Normalize the exact action.**
   Required action shape: `symbol`, `side` (`BUY|SELL`), `notional_usdt`.

2. **Freeze user policy before market evidence.**
   Use `config/policy.example.json` or a user-approved structured equivalent. Do not loosen thresholds after seeing the market.

3. **Read fresh Binance state.**
   Use Binance Agent OS / official Binance Skills toolchain for the sponsor-native observation path.

4. **Evaluate initial eligibility at T0.**
   Deterministically test current market constraints and action-within-policy constraints.

5. **Bind the full decision contract.**
   Receipt v2 signs:
   - policy hash;
   - exact T0 snapshot hash;
   - exact normalized action hash.

6. **Re-read state immediately before the protected boundary.**
   Revalidate receipt integrity, policy identity, exact-action identity, age, T0→T1 drift and current market constraints.

7. **Respect the terminal state.**
   - `ALLOW` = the exact old proposal remains consistent with the sealed validity contract. In this submission, preview only; do not execute.
   - `BLOCK` = **NO LONGER VALID** and `next_state = REPLAN_REQUIRED`.

## Exact-action invariant

Do not confuse “inside policy” with “same action.”

Canonical red-team case:

```text
policy max              $100
T0 exact action         BUY BTCUSDT $50
T1 mutated action       BUY BTCUSDT $75

notional <= policy      PASS
action_hash_match       FAIL

=> BLOCK / REPLAN_REQUIRED
```

Receipt v2 is specifically designed so an agent cannot silently alter an in-policy action and inherit the old decision authorization.

## Signature counterfactual

Do not collapse Valid Until into a generic current-state risk checker.

The canonical replay demonstrates:

```text
current spread            PASS
current 1m movement       PASS
current bid depth         PASS
current ask depth         PASS
receipt freshness         PASS
receipt signature         PASS
policy identity           PASS
exact action              PASS

T0 -> T1 mid drift        FAIL

=> BLOCK / NO LONGER VALID / REPLAN_REQUIRED
```

This proves that **fresh does not mean same premise**.

## Agent-native MCP companion

Start:

```sh
npm run mcp
```

The companion exposes only two tools:

### `valid_until_begin`

Pass:
- policy;
- normalized T0 Binance snapshot supplied by the host agent;
- exact action.

Returns an action-bound receipt v2 and `decision_id`.

### `valid_until_revalidate`

Pass:
- decision id;
- fresh T1 Binance snapshot supplied by the host agent;
- exact action currently being proposed.

Returns deterministic `ALLOW` or `BLOCK`, exact failed checks and the next state.

The MCP companion does **not** fetch Binance itself and cannot trade, transfer, fund, pay or write to a wallet. Binance Agent OS remains the sponsor-native capability/observation layer.

## Commands

Full deterministic proof:

```sh
npm run build:web
npm run test:all
npm run demo
```

MCP smoke proof:

```sh
npm run test:mcp
```

Live read-only Binance proof:

```sh
npm run live -- BTCUSDT
```

Optional representative action:

```sh
VALID_UNTIL_ACTION_SIDE=BUY \
VALID_UNTIL_ACTION_NOTIONAL_USDT=50 \
npm run live -- BTCUSDT
```

## Agent reporting contract

Always report these separately:

- **Intent / proposal:** what the agent wants to do.
- **Sealed policy:** constraints the agent cannot renegotiate in-cycle.
- **Exact action:** normalized symbol + side + notional and action hash.
- **T0 decision state:** Binance evidence that made the proposal initially eligible.
- **T1 current state:** fresh Binance evidence before the protected boundary.
- **Cross-time delta:** what changed relative to the original premise.
- **Validity result:** deterministic `ALLOW` or `BLOCK`.
- **Next state:** `ACTION_REMAINS_VALID` or `REPLAN_REQUIRED`.

On `BLOCK`, state the exact failed invariant and require fresh reasoning. Do not silently resize, change side/symbol, weaken policy, retry with stale evidence, or reinterpret `BLOCK` as a suggestion.

## Claim boundaries

Never claim that `ALLOW` means profitable, safe, recommended, or guaranteed. It means only that the exact proposed action still satisfies the sealed validity conditions at revalidation time.

Controlled fixtures are synthetic and must remain labeled. Live proof uses public Binance data only and performs no trade. Local MCP proof establishes a callable decision-contract boundary, not authenticated Binance execution.

## Judge line

> The authorization was still valid. The premise was not.
