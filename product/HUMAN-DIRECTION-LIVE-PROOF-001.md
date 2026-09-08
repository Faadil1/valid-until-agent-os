# Human Direction — Live Proof 001

Date: 2026-09-08
Authority: HUMAN PRODUCT DIRECTION

## Decision

Read-only Binance evidence alone is no longer the desired final proof strategy.

The final Track A package should add a **live write/execution proof** that materially demonstrates the Valid Until boundary rather than only showing observation and deterministic verdicts.

## Chosen environment

Use the **official Binance Spot Testnet** only.

Why:
- creates a real Binance non-production order/matching-engine proof;
- distinguishes the project from read-only demos;
- avoids real-fund loss exposure;
- avoids turning the proof requirement into a mainnet/regional-compliance dependency;
- preserves Track A focus on the agent product rather than Track B reward mechanics.

## Required proof pair

### Live ALLOW path

```text
live Binance Spot Testnet T0
→ seal exact action-decision contract
→ live Binance Spot Testnet T1
→ Valid Until ALLOW
→ exact MARKET BUY sent to official Binance Spot Testnet
→ query the same clientOrderId
→ show exchange order status
```

### BLOCK path

```text
same execution boundary
→ Valid Until BLOCK / REPLAN_REQUIRED
→ executor receives no authority
→ zero Binance order call
```

The canonical controlled 35.47 bps replay remains the deterministic hero proof. Testnet execution is additional live behavioral evidence, not a replacement for the deterministic cross-time counterexample.

## Hard boundaries

- no Binance mainnet order;
- no real funds;
- no wallet funding requirement for the submission;
- no geographic bypass;
- no API secret in repository, logs, screenshots or model context;
- testnet credentials remain local to the human development machine / Binance CLI profile;
- execution adapter hardcodes `https://testnet.binance.vision`;
- `BLOCK` must result in zero executor call;
- only exact BUY actions are supported in this bounded proof path;
- execution requires explicit local `CONFIRM_TESTNET_WRITE` gate.

## Claim boundary

Allowed after real capture:

> `Valid Until allowed a real Binance Spot Testnet order to reach the matching environment, and blocked actions cannot reach the testnet executor.`

Not allowed:
- `live mainnet trade`;
- `real money trade`;
- profitability / alpha;
- production financial-safety guarantee;
- authenticated remote Binance Agent OS MCP write unless separately proven.

## Lifecycle effect

This is a material post-TRACE-6.5 product evidence change.

Route:

`HUMAN DIRECTION → PBPD IMPLEMENTATION → CI → REAL TESTNET CAPTURE → DEPLOY/TRACE DELTA → WINNING INTELLIGENCE FINAL → TRACE 6.75 VIDEO REFRESH`

The previous final-video-only state is no longer current until this evidence loop is closed.
