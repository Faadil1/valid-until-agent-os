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

### Real venue attempt

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

## Current evidence strategy

Preferred remaining compliant attempt:

1. Use a **personal development machine at the user's actual location**.
2. Use the official Binance CLI and the official Spot Testnet endpoint.
3. No VPN, proxy or location manipulation.
4. First perform only a signed Spot Testnet account check.
5. If Binance permits access, execute the bounded v0.3 proof.
6. If Binance refuses, stop and freeze the final submission around controlled cross-time proof + authentic read-only Binance evidence; do not circumvent.

A successful testnet write is desirable but not allowed to override eligibility constraints.

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
