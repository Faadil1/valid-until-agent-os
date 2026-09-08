# Spec Kit delta — PRD v0.3 Spot Testnet proof

Status: `DERIVED_FROM_PRD_V0_3`
Authority: `NONE`
Owner: Spec Kit under PBPD
Source: `product/PRD-0.3-LIVE-TESTNET-EVIDENCE-DELTA.md`

## Purpose

Converge the bounded non-production execution-proof implementation without changing product authority.

## Scope

In scope:
- official Binance Spot Testnet only;
- BUY BTCUSDT quote-notional proof;
- exact action must already be deterministically `ALLOW`;
- one order maximum per proof run;
- same `clientOrderId` queried after send;
- raw secrets/account payloads remain private;
- sanitized proof only may reach public surface.

Out of scope:
- mainnet;
- real funds;
- wallet funding or transfer;
- x402;
- alternate geographic routing;
- any workaround for venue Eligibility restrictions;
- additional strategy/signals/features.

## Required implementation invariants

1. Executor target is hardcoded to `https://testnet.binance.vision`.
2. `BLOCK` returns before any CLI execution call.
3. `ALLOW` also requires explicit `CONFIRM_TESTNET_WRITE`.
4. Notional must be positive and <= 25 test USDT; canonical proof uses 10.
5. Only exact BUY action is supported for this evidence slice.
6. Maximum order sends per workflow = 1.
7. Verification queries the same generated `clientOrderId`.
8. GitHub-hosted credentials come only from Environment `testnet-proof`.
9. Workflow is manual-only.
10. Raw response is not committed/uploaded publicly; only sanitizer output may be published.
11. Any restricted-location/Eligibility response terminates the run before execution and is recorded as a venue blocker, not a Valid Until verdict.
12. No alternate runner region, VPN, proxy or endpoint may be selected to evade that restriction.

## Current implementation evidence

- `src/testnet-executor.mjs`
- `src/live-testnet.mjs`
- `.github/workflows/live-testnet-proof.yml`
- `scripts/sanitize-testnet-proof.mjs`
- `web/live-proof.html`
- testnet executor tests `7/7`
- packaging CI `34247316936` SUCCESS

## Runtime attempt 001

Run `34248954040`:
- credentials present and masked;
- deterministic suite passed;
- Binance CLI 2.1.1 installed;
- authenticated Spot Testnet account check refused under restricted-location/Eligibility for GitHub hosted Azure eastus;
- no decision cycle, no order, no public trade proof.

Evidence: `evidence/live-testnet/ATTEMPT-001-GITHUB-HOSTED-RESTRICTED.md`.

## Next valid runtime branch

### Branch A — actual-location access permitted

On a personal development machine at the user's actual location, with no VPN/proxy:
1. use official Binance CLI;
2. perform signed Spot Testnet account check only;
3. if permitted, run bounded live proof;
4. sanitize output;
5. publish safe proof to repo/Vercel;
6. run TRACE delta.

### Branch B — actual-location access refused/unavailable

1. stop write-proof work;
2. preserve no-bypass rule;
3. keep controlled cross-time BLOCK + authentic read-only Binance proof;
4. rerun Winning Intelligence and TRACE against that evidence ceiling;
5. do not claim a trade.

## Exit criteria

Spec delta is converged when:
- PRD v0.3 authority/invariants are represented in implementation and tests;
- the hosted restriction is recorded truthfully;
- no bypass path is introduced;
- PBPD can choose Branch A or B from actual venue evidence without Spec Kit inventing product authority.

`SPEC_KIT_DELTA_CONVERGED` does not mean BUILD_CANDIDATE_READY or PROJECT_COMPLETE.
