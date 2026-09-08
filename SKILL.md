---
name: valid-until
description: Pre-execution validity skill for Binance Agent OS. Use when an AI agent must prove that a proposed financial action still matches the sealed user policy and fresh Binance market state before any consequential execution.
metadata:
  version: 0.1.0
  author: Faadil Boussari
  requires:
    bins:
      - node
      - binance-cli
license: MIT
---

# Valid Until

## Thesis

**Reasoning is not authorization.**

An AI agent may interpret user intent and propose an action, but it must not treat its own prior reasoning as permanent execution authority. Before a consequential Binance action, verify that the policy and market conditions that justified the action are still valid.

## Submission safety boundary

This Track A submission is **read-only by design**.

- Never place an order.
- Never transfer or fund an account.
- Never request or expose Binance API secrets.
- Never bypass a geographic or product restriction.
- If a required check cannot be completed, fail closed.

## Required workflow

1. **Seal policy before reading market data.**
   Use the configured policy in `config/policy.example.json` or a user-approved structured equivalent. Do not silently change thresholds after seeing the market.

2. **Read fresh Binance market state.**
   Use the official Binance Agent OS / Skills Hub toolchain (`binance-cli`) for market data.

3. **Evaluate eligibility.**
   Run the deterministic checks for spread, 1-minute movement and top-of-book depth.

4. **Bind the decision.**
   Create a short-lived signed decision receipt tied to the policy hash and exact market snapshot hash.

5. **Revalidate immediately before a protected action would occur.**
   Check receipt integrity, policy identity, age, price drift, spread, movement and liquidity again.

6. **Respect the terminal state.**
   - `ALLOW` means the previously proposed action is still eligible under the sealed policy. In this submission, present the preview only; do not execute it.
   - `BLOCK` means **NO LONGER VALID**. Do not reinterpret the failure as permission to loosen thresholds. Require fresh reasoning from fresh state.

## Commands

Deterministic judge proof:

```sh
npm test
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

## Agent behavior

When reporting a result, separate these layers explicitly:

- **Reasoning:** what the agent proposed and why.
- **Policy:** the user-approved constraints that cannot be renegotiated mid-run.
- **Observed state:** the Binance snapshot used for eligibility.
- **Validity result:** the deterministic `ALLOW` or `BLOCK` outcome.

Never claim that `ALLOW` means a trade is profitable, safe, recommended, or guaranteed. It only means the proposed action remains consistent with the sealed validity conditions at the time of revalidation.

## Judge line

> The authorization was still valid. The premise was not.
