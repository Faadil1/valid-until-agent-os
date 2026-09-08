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
2. `BLOCK` returns before any financial execution call.
3. `ALLOW` also requires explicit `CONFIRM_TESTNET_WRITE`.
4. Notional must be positive and <= 25 test USDT; canonical proof uses 10.
5. Only exact BUY action is supported for this evidence slice.
6. Maximum order sends per proof run = 1.
7. Verification queries the same generated `clientOrderId`.
8. GitHub-hosted credentials come only from Environment `testnet-proof`.
9. Hosted workflow is manual-only.
10. Raw response is not committed/uploaded publicly; only sanitizer output may be published.
11. Any restricted-location/Eligibility response terminates before execution and is recorded as a venue blocker, not a Valid Until verdict.
12. No alternate runner region, VPN, proxy or endpoint may be selected to evade that restriction.
13. Actual-location access validation may use either official Binance CLI where natively available or native platform HMAC signing directly against the same official Spot Testnet API.
14. Native access-check tooling may not install system components, require admin rights, print credentials/account payloads or send an order.

## Current implementation evidence

- `src/testnet-executor.mjs`
- `src/live-testnet.mjs`
- `.github/workflows/live-testnet-proof.yml`
- `scripts/sanitize-testnet-proof.mjs`
- `scripts/check-testnet-access.ps1`
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

## Local tooling discovery

The current Windows machine cannot install WSL because the user has no administrator rights. The official Binance CLI v2.1.1 release does not expose a native Windows asset. Do not try to elevate privileges or install WSL.

PBPD added `scripts/check-testnet-access.ps1`, which:
- uses Windows PowerShell / PowerShell native .NET HMAC-SHA256;
- calls only `https://testnet.binance.vision/api/v3/time` and signed `GET /api/v3/account`;
- performs no financial write;
- prompts for credentials locally and does not print them;
- outputs only a sanitized PASS / eligibility / auth class.

## Next valid runtime branch

### Branch A — actual-location access permitted

On the user's actual-location machine, with no VPN/proxy:
1. `git pull` to obtain `scripts/check-testnet-access.ps1`;
2. run the script from PowerShell;
3. if it prints `ACTUAL_LOCATION_TESTNET_ACCESS=PASS`, PBPD may adapt the existing v0.3 proof to direct official signed Spot Testnet API transport;
4. preserve all v0.3 caps and confirmation gates;
5. sanitize output;
6. publish safe proof to repo/Vercel;
7. stop at requested step 5 before TRACE/Winning Intelligence final.

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
- actual-location access checking is possible without admin/system installation;
- no bypass path is introduced;
- PBPD can choose Branch A or B from actual venue evidence without Spec Kit inventing product authority.

`SPEC_KIT_DELTA_CONVERGED` does not mean BUILD_CANDIDATE_READY or PROJECT_COMPLETE.
