# Valid Until — execution integrity for AI agents

> **Reasoning is not authorization.**

**Valid Until** is a pre-execution integrity layer built for the **Binance Agent OS Mini Hackathon — Track A**. It addresses a simple failure mode: an AI agent can make a correct decision at T0, then reach execution at T1 after the market state or policy conditions that justified that decision have changed.

The authorization can still be technically valid while the premise is no longer valid.

Valid Until seals user-defined constraints **before** market data is read, captures the exact Binance state used for eligibility, issues a short-lived Ed25519-signed decision receipt, and revalidates the relevant conditions immediately before a protected action could be forwarded.

If freshness, price drift, spread, liquidity, policy integrity, or receipt integrity no longer hold, the action becomes **NO LONGER VALID** and the agent must reason again from fresh state.

## The problem

Most trading-agent demos focus on the reasoning layer:

> *What should I buy or sell?*

Valid Until focuses on the execution boundary:

> *Is this exact action still justified by the conditions that produced it?*

A limit order can constrain price. A standing permission can constrain what tools an agent may use. Neither, by itself, proves that the full decision context is still valid when an LLM finally reaches execution.

That distinction matters because LLM reasoning can take seconds while order books, spreads, depth and exposure can change much faster.

## 60-second judge story

```text
USER POLICY
  max spread      8 bps
  max mid drift  20 bps
  max age          5 sec
  min top-5 depth $50k/side
        │
        ▼
[1] POLICY FROZEN BEFORE MARKET READ
        │ SHA-256 policy hash
        ▼
[2] BINANCE MARKET SNAPSHOT
        │ via official binance-cli
        ▼
[3] DECISION RECEIPT
        │ Ed25519-signed + snapshot-bound + short-lived
        ▼
[4] PRE-ACTION REVALIDATION
        │ market moved 35.47 bps
        ▼
[5] NO LONGER VALID
    fresh reasoning required
```

**The model was still allowed to trade. The trade was no longer allowed to happen.**

The included controlled replay is intentionally deterministic so judges can see the failure path immediately. The live command captures real public Binance market data but performs **no order placement**.

## Agent OS integration

Live mode shells out to the official [`binance/binance-cli`](https://github.com/binance/binance-cli), using Binance's public market-data-only endpoint. This gives the project a Binance-native observation path without hand-rolling a separate exchange client.

Live capture uses:

- `/api/v3/ticker/bookTicker`
- `/api/v3/depth`
- `/api/v3/klines`
- `/api/v3/time`

No API key is required for these public market-data reads.

## Run the deterministic demo

```bash
npm run build:web
npm test
npm run demo
```

Expected test output:

```text
PASS 7/7 — seal, eligibility, signature, tamper-detection, drift block, TTL block, fail-closed
```

The replay ends in `BLOCK` because the second fixture moves beyond the sealed mid-price drift tolerance. In the judge UI, that terminal state is presented as **NO LONGER VALID**.

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

Optional recheck interval:

```bash
VALID_UNTIL_RECHECK_MS=4000 npm run live -- BNBUSDT
```

Live mode:

1. freezes the policy;
2. reads Binance;
3. creates a signed decision receipt;
4. waits for the configured recheck interval;
5. reads Binance again;
6. outputs `ALLOW` or `BLOCK` with the exact failed invariants.

**It never places an order.**

## Web judge view

```bash
npm run build:web
python -m http.server 4173
```

Open `http://127.0.0.1:4173/web/`.

The page intentionally uses a light editorial/ledger visual system rather than the generic dark crypto-dashboard aesthetic.

## Core invariants

1. **Policy first.** Constraints are hashed before market data is read.
2. **Exact-state binding.** The decision receipt is tied to a canonical snapshot hash.
3. **Short-lived validity.** Every receipt has a bounded validity window.
4. **Revalidation required.** Prior eligibility never becomes permanent execution authority.
5. **Tamper evidence.** Receipt mutation breaks the Ed25519 signature.
6. **Fail closed.** Any failed invariant produces `BLOCK` and requires a fresh decision.
7. **No self-claimed alpha.** Valid Until does not claim to predict returns or make trading profitable.

## Repository layout

```text
config/policy.example.json     user-defined frozen constraints
data/replay/                   deterministic two-snapshot judge case
src/snapshot.mjs               Binance CLI capture + normalization
src/policy.mjs                 eligibility + pre-action revalidation engine
src/receipt.mjs                Ed25519 receipt issuing / verification
src/demo.mjs                   deterministic failure-path proof
src/live.mjs                   live read-only Binance path
tests/run.mjs                  invariant tests
web/                           judge-facing proof UI
docs/                          demo and submission assets
```

## Claim boundaries

- The deterministic replay uses controlled fixtures, not captured-live data.
- Live mode reads public Binance market data through the official Binance CLI.
- The project proves **policy commitment, state binding, tamper detection and fail-closed pre-action revalidation**.
- It does **not** prove profitable trading, predictive alpha, calibrated market forecasts, or safer investment outcomes.
- No live trading, funding or protected account action is required for the demo.

## Hackathon entry checklist

- [ ] Follow `@Binance`
- [ ] Repost the official announcement
- [ ] Publish public GitHub repository
- [ ] Record 45–75 second demo
- [ ] Reply / quote-repost with demo + GitHub
- [ ] Complete the official survey before **2026-09-08 23:59 UTC**

## License

MIT
