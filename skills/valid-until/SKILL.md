---
name: valid-until
description: Execution-validity boundary for Binance Agent OS. Use when an AI agent has proposed a consequential financial action and must prove that the exact action still matches the sealed policy and the Binance state that justified it before any execution boundary.
metadata:
  version: 0.2.0
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

Valid Until is not a trading-signal generator and is not a second LLM critic. It checks whether a previously justified action is **still valid relative to the exact policy and state that justified it**.

The key distinction is cross-time:

```text
reasoning verifier      -> was the model's reasoning sound?
current-state preflight -> is the action acceptable under current conditions?
permission layer        -> may the agent use this capability?
Valid Until             -> is this exact old action still justified by its original premise now?
```

A fresh current-state check can pass while the original decision still expires because the world moved materially away from T0.

## Submission safety boundary

This Track A submission is **read-only by design**.

- Never place an order.
- Never transfer or fund an account.
- Never request or expose Binance API secrets.
- Never bypass a geographic or product restriction.
- If a required check cannot be completed, fail closed.
- Model prose must never override a deterministic `BLOCK`.

## Required workflow

1. **Freeze user policy before market evidence.**
   Use `config/policy.example.json` or a user-approved structured equivalent. Do not loosen thresholds after seeing the market.

2. **Read fresh Binance state.**
   Use the official Binance Agent OS / Skills Hub toolchain (`binance-cli`) for public market data.

3. **Evaluate initial eligibility at T0.**
   Deterministically test spread, movement and top-of-book depth.

4. **Bind the decision.**
   Issue a short-lived signed receipt tied to the exact policy hash and exact T0 snapshot hash.

5. **Keep the proposed action explicit.**
   The agent's symbol and notional are data to validate, not prose to trust.

6. **Re-read state immediately before the protected boundary.**
   Revalidate receipt integrity, policy identity, age, T0→T1 price drift, current market constraints and exact action parameters.

7. **Respect the terminal state.**
   - `ALLOW` = the old proposal remains consistent with the sealed validity contract. In this submission, preview only; do not execute.
   - `BLOCK` = **NO LONGER VALID**. Fresh reasoning from fresh state is required.

## The signature counterfactual

Do not collapse Valid Until into a generic current-state risk checker.

The canonical replay intentionally demonstrates:

```text
current spread            PASS
current 1m movement       PASS
current bid depth         PASS
current ask depth         PASS
receipt freshness         PASS
receipt signature         PASS
policy identity           PASS

T0 -> T1 mid drift        FAIL

=> BLOCK / NO LONGER VALID
```

This proves that **fresh does not mean same premise**.

## Commands

Deterministic proof:

```sh
npm run build:web
npm run test:all
npm run demo
```

Live read-only Binance proof:

```sh
npm run live -- BTCUSDT
```

Optional recheck delay:

```sh
VALID_UNTIL_RECHECK_MS=4000 npm run live -- BTCUSDT
```

## Agent reporting contract

Always report these separately:

- **Intent / proposal:** what the agent wants to do.
- **Sealed policy:** constraints the agent cannot renegotiate in-cycle.
- **T0 decision state:** Binance evidence that made the proposal initially eligible.
- **T1 current state:** fresh Binance evidence before the protected boundary.
- **Cross-time delta:** what changed relative to the original premise.
- **Validity result:** deterministic `ALLOW` or `BLOCK`.

On `BLOCK`, state the exact failed invariant and require fresh reasoning. Do not silently resize, change symbol, weaken policy, retry with stale evidence, or reinterpret `BLOCK` as a suggestion.

## Claim boundaries

Never claim that `ALLOW` means profitable, safe, recommended, or guaranteed. It means only that the exact proposed action still satisfies the sealed validity conditions at revalidation time.

Controlled fixtures are synthetic and must remain labeled. Live proof uses public Binance data only and performs no trade.

## Judge line

> The authorization was still valid. The premise was not.
