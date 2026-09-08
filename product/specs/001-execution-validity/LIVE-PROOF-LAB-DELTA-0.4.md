# Spec Kit delta — PRD v0.4 Live Proof Lab

Status: `DERIVED_FROM_PRD_V0_4`
Authority: `NONE`
Owner: Spec Kit under PBPD
Source: `product/PRD-0.4-LIVE-PROOF-LAB-DELTA.md`

## Scope

Build a compact multi-page judge surface and server-side live read layer without changing the deterministic authorization core.

## Routes

Static judge routes:
- `/`
- `/lab`
- `/live-proof`
- `/evaluations`

Server routes:
- `/api/live-market`
- `/api/order-status`

## `/api/live-market`

Requirements:
- no credentials required;
- official Spot Testnet endpoint only;
- public GET requests only;
- normalize symbol, bid, ask, mid, spread, top-5 depth, latest 1m return, server time;
- default symbol `BTCUSDT`;
- browser may not provide arbitrary endpoint;
- explicit structured unavailable/error response if Binance rejects the Vercel runtime location.

## `/api/order-status`

Requirements:
- server-side only Binance key/secret from Vercel env;
- exact env names: `BINANCE_TESTNET_API_KEY`, `BINANCE_TESTNET_API_SECRET`;
- hardcoded endpoint `https://testnet.binance.vision`;
- signed GET only;
- canonical target fixed to the already verified proof receipt:
  - symbol `BTCUSDT`;
  - orderId `13634770`;
  - clientOrderId `vu-mtswxiik-ecb6b093`;
- return only allowlisted fields;
- no balances/account object;
- no arbitrary browser order target;
- missing credentials => HTTP-safe fail-closed JSON status, no secret detail;
- restricted-location response => explicit venue-unavailable status, no bypass.

## Front-end behavior

### Home
- retain hero controlled replay;
- introduce navigation and direct CTAs to Live Lab and Verified Execution.

### Lab
- live market instrument panel;
- six deterministic scenario controls;
- evidence-class labels;
- current result area;
- no financial write.

### Verified Execution
- preserve static sanitized receipt;
- add `Refresh signed status` control calling `/api/order-status`;
- refresh result clearly labeled `LIVE SIGNED READ`;
- historical receipt clearly labeled `VERIFIED EXECUTION`;
- no new-order claim.

### Evaluations
- preserve six challenge cases;
- add global navigation.

## Security invariants

1. No public-prefixed secrets.
2. No secret values in HTML/JS/JSON/logging.
3. No authenticated Vercel write route required in first v0.4 implementation.
4. If a write route is later added, it must have a separate Spec delta and server-side arming control.
5. No arbitrary endpoint/symbol/order mutation for authenticated API routes.
6. No mainnet fallback.
7. No geographic fallback.
8. Existing successful `web/live-testnet-proof.json` is immutable evidence for this implementation phase.

## Test plan

- unit-test market normalization and fail-closed responses;
- unit-test signed order query construction without real secrets;
- assert source contains no `NEXT_PUBLIC_BINANCE` or `VITE_BINANCE` usage;
- assert `/api/order-status` has no POST/order creation path;
- CI build static pages;
- Vercel runtime 200 check for four judge routes;
- live API checks classify success/unavailable honestly.

## Exit

`SPEC_KIT_V0_4_CONVERGED` when implementation and CI satisfy this delta. TRACE and Winning Intelligence remain separate downstream owners.
