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
13. Actual-location access validation and local proof may use native platform HTTPS/HMAC directly against the same official Spot Testnet API when the official CLI is not natively available.
14. Native local tooling may not install system components, require admin rights, print credentials/account payloads or send more than one order.
15. An uncertain POST transport failure must never trigger a second POST. Recovery is query-only using the exact same `clientOrderId`.
16. Local raw capture must remain in temporary storage and be deleted after sanitization.
17. Only a verified `ALLOW → order sent → same clientOrderId queried` artifact may be pushed as successful write proof.

## Current implementation evidence

- `src/testnet-executor.mjs`
- `src/live-testnet.mjs`
- `src/binance-testnet-http.mjs`
- `src/live-testnet-native.mjs`
- `.github/workflows/live-testnet-proof.yml`
- `scripts/sanitize-testnet-proof.mjs`
- `scripts/check-testnet-access.ps1`
- `scripts/run-local-testnet-proof.ps1`
- `web/live-proof.html`
- testnet executor tests `7/7`
- native HTTP transport tests added to `npm run test:all`

## Runtime attempt 001 — hosted runner

Run `34248954040`:
- credentials present and masked;
- deterministic suite passed;
- Binance CLI 2.1.1 installed;
- authenticated Spot Testnet account check refused under restricted-location/Eligibility for GitHub hosted Azure eastus;
- no decision cycle, no order, no public trade proof.

Evidence: `evidence/live-testnet/ATTEMPT-001-GITHUB-HOSTED-RESTRICTED.md`.

## Runtime attempt 002 — actual-location signed access

The user executed `scripts/check-testnet-access.ps1` from the actual-location Windows development machine under standard-user PowerShell.

Sanitized result:

```text
ACTUAL_LOCATION_TESTNET_ACCESS=PASS
FINANCIAL_WRITE=FALSE
```

Evidence: `evidence/live-testnet/ATTEMPT-002-LOCAL-ACCESS-PASS.md`.

This resolves venue access for the local proof path. It does not establish an order claim.

## Next valid runtime branch

### Branch A — bounded local execution proof

From the same actual-location Windows machine:
1. `git pull`;
2. run `scripts/run-local-testnet-proof.ps1 -Publish`;
3. enter explicit `CONFIRM_TESTNET_WRITE`;
4. provide the same Spot Testnet HMAC credentials locally;
5. the script runs full deterministic assurance first;
6. T0/T1 are captured from official Spot Testnet;
7. `BLOCK` performs zero order calls and skips successful-write publication;
8. `ALLOW` may send one BUY BTCUSDT order for 10 test USDT only;
9. query the exact same `clientOrderId`;
10. sanitize into `web/live-testnet-proof.json`;
11. push only that sanitized file to `main` when verified;
12. Vercel redeploys the judge surface;
13. stop at requested step 5 before TRACE/Winning Intelligence final.

### Branch B — proof fails before verified order

1. do not weaken policy or retry an uncertain POST;
2. preserve any BLOCK as zero-write evidence;
3. preserve errors without exposing credentials;
4. no successful write claim until same-order verification exists.

## Exit criteria

Spec delta is converged when:
- PRD v0.3 authority/invariants are represented in implementation and tests;
- the hosted restriction is recorded truthfully;
- actual-location authenticated access is proven;
- local proof transport is bounded and no-admin;
- no bypass path is introduced;
- PBPD can execute the single allowed local proof without Spec Kit inventing product authority.

`SPEC_KIT_DELTA_CONVERGED` does not mean BUILD_CANDIDATE_READY or PROJECT_COMPLETE.
