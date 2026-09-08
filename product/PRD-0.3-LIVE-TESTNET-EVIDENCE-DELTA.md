# Valid Until — PRD v0.3 normative addendum

Status: `ACTIVE_LIVING_PRD_ADDENDUM`
Date: `2026-09-08`
Owner: `PBPD`
Base PRD: `product/PRD.md` v0.2
Authorization: `product/AUTHORIZATION.md`
Human direction: `product/HUMAN-DIRECTION-LIVE-PROOF-001.md`

## Canonical version rule

Until `product/PRD.md` is later consolidated, the current living PRD is the composite:

```text
product/PRD.md v0.2
+
product/PRD-0.3-LIVE-TESTNET-EVIDENCE-DELTA.md
=
Valid Until PRD v0.3
```

This addendum supersedes conflicting v0.2 statements only for the bounded live-proof scope below. It does not rewrite history or pretend the scope existed earlier.

## Material change

Read-only Binance evidence is no longer the desired highest proof class for the final Track A package.

Valid Until may add one bounded **official Binance Spot Testnet** execution proof to demonstrate that deterministic `ALLOW` can cross a real non-production execution boundary while `BLOCK` structurally cannot.

This is an evidence/productization evolution, not a pivot of the core product.

## Invariants preserved

Unchanged:
- `Reasoning is not authorization.`
- `A correct decision can expire.`
- agent interprets/proposes; deterministic boundary authorizes;
- receipt v2 exact-action binding;
- `BLOCK → REPLAN_REQUIRED`;
- controlled 35.47 bps replay remains the hero cross-time failure proof;
- no profitability/alpha/safety-outcome claim;
- no second-LLM authorization judge;
- no x402 or wallet-write breadth.

## New v0.3 goal

### G7 — Observable protected execution boundary

When venue access is legitimately permitted:

```text
live Spot Testnet T0
→ exact action + policy sealed
→ live Spot Testnet T1
→ deterministic revalidation
→ ALLOW
→ one exact Spot Testnet order
→ query the same clientOrderId
```

For a deterministic BLOCK:

```text
BLOCK
→ REPLAN_REQUIRED
→ executor call count = 0
```

## New MUST requirements

- MUST-13 — Any live financial write proof must target only `https://testnet.binance.vision`.
- MUST-14 — The proof must use non-production Spot Testnet assets only; real funds/mainnet are forbidden.
- MUST-15 — The execution adapter may act only after deterministic `ALLOW` and an explicit write-confirmation gate.
- MUST-16 — A live proof run may place at most one order, with an executor hard cap of 25 test USDT and canonical demo notional of 10 test USDT.
- MUST-17 — After sending an allowed order, verification must query the same `clientOrderId`.
- MUST-18 — Raw credentials, auth headers, profile files and unsanitized account payloads must never enter repo artifacts, Vercel or chat.
- MUST-19 — A venue eligibility/restricted-location response must stop before execution and must never be remediated through VPN/proxy/cloud-region hopping/geographic circumvention.
- MUST-20 — A failed venue-access attempt is not equivalent to Valid Until `BLOCK` and must not be presented as a product execution verdict.
- MUST-21 — Only sanitized execution evidence may be published to the judge surface.

## New MUST_NOT requirements

- MUST_NOT-07 — Do not change execution location specifically to evade a Binance Eligibility restriction.
- MUST_NOT-08 — Do not use mainnet or real-money execution as a substitute proof.
- MUST_NOT-09 — Do not use an alternate endpoint/client specifically to bypass an explicit venue restriction.
- MUST_NOT-10 — Do not publish a testnet order claim unless a real orderId/clientOrderId/status and same-order verification were actually captured.

## Current evidence against v0.3

### Implementation proof

Obtained:
- core `8/8`;
- Challenge Suite `6/6`;
- local MCP `5/5`;
- MCP observation adapter `4/4`;
- testnet execution boundary `7/7`;
- workflow packaging CI `34247316936` SUCCESS.

### Hosted venue attempt

GitHub-hosted write attempt:
- run `34248954040`;
- job `102138125899`;
- protected secrets present and masked;
- Binance CLI `2.1.1` installed;
- failed at first authenticated Spot Testnet account check;
- Binance response class: restricted location / Eligibility;
- hosted runner: Azure `eastus`;
- order sent: false.

Evidence: `evidence/live-testnet/ATTEMPT-001-GITHUB-HOSTED-RESTRICTED.md`.

This proves the workflow fails closed on venue refusal. It does **not** satisfy the desired successful testnet write proof.

### Actual-location authenticated access

The user then executed the no-admin native Windows signed access check from the current actual-location development machine:

```text
ACTUAL_LOCATION_TESTNET_ACCESS=PASS
FINANCIAL_WRITE=FALSE
```

Evidence: `evidence/live-testnet/ATTEMPT-002-LOCAL-ACCESS-PASS.md`.

Interpretation:
- authenticated Spot Testnet access from the actual execution location is available;
- no financial write occurred during the check;
- PBPD may now proceed to the already-authorized bounded execution proof;
- this does not itself establish a successful order claim.

### Local tooling constraint and transport resolution

The currently available Windows machine has no WSL installation and the user has no administrator right to install it. Binance CLI v2.1.1 publishes macOS/Linux release assets but no native Windows asset was found in the official release.

PBPD therefore uses a native Node HTTPS/HMAC transport against the **same official Spot Testnet endpoint** for the bounded local proof. This is an implementation transport change only; it does not change venue, eligibility, authorization, endpoint, notional cap or claim class.

The local proof runner must:
- use `https://testnet.binance.vision` only;
- make a signed account check before the decision cycle;
- use public Spot Testnet state for T0/T1;
- place no order on `BLOCK`;
- send at most one POST order on `ALLOW` after explicit `CONFIRM_TESTNET_WRITE`;
- never retry an uncertain POST; recover only by querying the exact same `clientOrderId`;
- query the same `clientOrderId` after a successful send;
- delete raw capture from local temporary storage after sanitization;
- publish only `web/live-testnet-proof.json`.

## Current evidence strategy

The next permitted proof is now:

1. run `scripts/run-local-testnet-proof.ps1 -Publish` from the same actual-location Windows machine;
2. preserve exact BUY BTCUSDT 10 test USDT and the 25 test USDT hard cap;
3. if Valid Until returns `BLOCK`, perform zero order writes and do not publish as a successful write proof;
4. if Valid Until returns `ALLOW`, send one Spot Testnet order maximum and query the same `clientOrderId`;
5. sanitize the raw local proof;
6. push only the sanitized artifact to `main`, allowing Vercel to redeploy;
7. stop at requested step 5 before TRACE/Winning Intelligence final.

A successful testnet write is desirable but not allowed to override product or eligibility constraints.

## Acceptance delta

Before candidate handoff, PBPD must truthfully resolve one of:

### A — `TESTNET_WRITE_PROOF_OBTAINED`
- legitimate actual-location venue access;
- deterministic ALLOW;
- one Spot Testnet order;
- same clientOrderId queried;
- sanitized public proof deployed and TRACE-reviewed.

### B — `TESTNET_WRITE_PROOF_UNAVAILABLE_WITHOUT_CIRCUMVENTION`
- legitimate access attempt refused or unavailable;
- no bypass performed;
- no trade claim;
- final judge narrative falls back to controlled `NO LONGER VALID` + authentic read-only sponsor-native evidence;
- Winning Intelligence/TRACE re-evaluate competitiveness under that evidence ceiling.

Both routes preserve product integrity. Only route A permits a successful testnet execution claim.
