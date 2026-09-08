# Valid Until — PBPD Runtime Evidence Reconciliation v0.4

Date: `2026-09-08`  
Owner: `PBPD`  
Status: `COMPLETE__TRACE_DELTA_REQUIRED`  
Input handoff: `V0_4_RUNTIME_VERIFICATION_AND_REPAIR` at `0f9ec86b2fce6dc300a6dba5b52f93b1b3fb4f73`  
Living product: `product/PRD.md` v0.2 + `product/PRD-0.3-LIVE-TESTNET-EVIDENCE-DELTA.md` + `product/PRD-0.4-LIVE-PROOF-LAB-DELTA.md`

## Purpose

Reconcile the verified v0.4 runtime with the living product definition without expanding scope or silently promoting deployment behavior into product, outcome, or production-safety claims.

This gate does not replace TRACE, Winning Intelligence, Project Finisher, or the protected human submission boundary.

## Canonical product truth after runtime verification

The product thesis is unchanged:

> **Reasoning is not authorization.**

> **A correct decision can expire.**

The current evidence stack is now:

```text
CONTROLLED
  deterministic cross-time replay + six-case red team

VERIFIED EXECUTION
  historical authenticated Binance Spot Testnet ALLOW
  -> BUY BTCUSDT 10 test USDT
  -> orderId 13634770
  -> clientOrderId vu-mtswxiik-ecb6b093
  -> FILLED
  -> same order queried back

LIVE / RUNTIME READS
  Vercel: explicit fail-closed Binance venue-eligibility state
  Cloudflare: explicit fail-closed live-market state
  Cloudflare signed GET: canonical historical order re-verified
```

No new financial write occurred during v0.4 runtime verification.

## v0.4 acceptance reconciliation

| Acceptance condition | Runtime evidence | Verdict |
|---|---|---|
| Four judge surfaces are deployed | Vercel Production serves `/`, `/lab`, `/live-proof`, `/evaluations`; Cloudflare mirror remains live | PASS |
| Live market endpoint returns fresh data or explicit fail-closed unavailable state | Vercel and Cloudflare return `VENUE_ELIGIBILITY_UNAVAILABLE`; no geographic fallback or bypass attempted | PASS |
| Signed order-status never exposes secrets and returns verified status or explicit safe failure | Vercel returns explicit `VENUE_ELIGIBILITY_UNAVAILABLE`; Cloudflare returns `LIVE_SIGNED_READ_VERIFIED` for the fixed canonical order | PASS |
| Six controlled scenarios remain reproducible without financial writes | Challenge Suite remains `6/6`; public v0.4 has no write route and scenario execution is deterministic | PASS |
| Canonical historical execution receipt remains unchanged | `web/live-testnet-proof.json` blob SHA is still `e6c85b3119a88699046bd8af83aee09d9f7184b8`, identical to proof commit `21ab850...` | PASS |
| CI/runtime checks pass | final handoff CI `proof` run `34267650642` = SUCCESS; runtime handoff recorded at `0f9ec86...` | PASS |

`V0_4_ACCEPTANCE = PASS`

## Venue-behavior interpretation

Vercel returning `VENUE_ELIGIBILITY_UNAVAILABLE` is not a Valid Until `BLOCK` decision and is not a product failure. It is an external venue-access condition encountered by the hosting location.

The correct product behavior is to expose it truthfully and fail closed. No attempt was made to:
- switch cloud regions to evade the restriction;
- use a VPN or proxy;
- use mainnet;
- use another endpoint specifically to bypass eligibility;
- create another order.

Cloudflare's successful signed GET is evidence that the server-side read path can authenticate and re-query the preserved canonical Testnet order from that runtime. It does **not** create a new execution event.

## Historical execution evidence reconciliation

Canonical sanitized proof remains:

- network: Binance Spot Testnet;
- production: `false`;
- real funds: `false`;
- action: BUY BTCUSDT, 10 test USDT;
- validity result: `ALLOW / ACTION_REMAINS_VALID`;
- orderId: `13634770`;
- clientOrderId: `vu-mtswxiik-ecb6b093`;
- order status: `FILLED`;
- same order verified: `true`;
- public proof SHA256: `a318c6a6d8d56cd5ab66ee5beedf3baac32dc33885a963b64fbfe814ccad6b76`.

The v0.4 runtime adds **read verification and deployment evidence**, not a second trade claim.

## Security / authority reconciliation

Observed and preserved:

- no browser secret exposure;
- no secret values returned or logged;
- no public-prefixed Binance secret variables;
- no public unrestricted write button;
- no Vercel or Cloudflare financial write route;
- authenticated runtime read targets only the fixed canonical Testnet order;
- no POST Binance call during runtime verification;
- historical Testnet trade not rerun;
- mainnet and real funds remain forbidden;
- venue eligibility bypass remains forbidden.

## Proof-class reconciliation

### TECHNICAL_PROOF — OBTAINED

Includes:
- core deterministic suite `8/8`;
- Challenge Suite `6/6`;
- MCP `5/5`;
- MCP observation adapter `4/4`;
- Testnet execution boundary `7/7`;
- native Spot Testnet transport `5/5`;
- authenticated bounded Spot Testnet execution proof;
- v0.4 server-read unit and Cloudflare function assurance;
- dual-runtime verification with truthful fail-closed handling.

### BEHAVIOR_PROOF — OBTAINED FOR THE JUDGE WORKFLOW

The public product exposes a coherent path from thesis to controlled replay, verified execution evidence and red-team cases across the four judge surfaces.

Boundary: this remains evaluator-workflow evidence, not customer adoption evidence.

### OUTCOME_PROOF — NOT OBTAINED / NOT CLAIMED

No measured evidence shows reduced real financial losses, improved execution quality, ROI, conversion, or operator productivity.

### PRODUCTION_EVIDENCE — NOT OBTAINED / NOT CLAIMED

The web runtimes are production-hosted judge artifacts. The financial control mechanism is not production-proven. The successful write is non-production Spot Testnet only.

```text
DEPLOYED_WEB_RUNTIME != PRODUCTION_FINANCIAL_CONTROL
TESTNET_EXECUTION != REAL_FUNDS_EXECUTION
SIGNED_READ != NEW_ORDER
VENUE_ELIGIBILITY_FAILURE != VALID_UNTIL_BLOCK
```

## Product / PRD impact

No new product version is required by this reconciliation.

- v0.3 already authorized and specified the bounded Spot Testnet write proof;
- v0.4 already authorized and specified the multi-page Live Proof Lab and server-side read layer;
- commit `76eee8a...` is a bounded diagnostic repair so Vercel classifies Binance venue refusal truthfully;
- Cloudflare is a deployment-resilience mirror, not a new product capability.

Therefore:

`PRD_VERSION = 0.4`  
`SCOPE_EXPANSION = NONE`  
`RUNTIME_EVIDENCE_RECONCILIATION = COMPLETE`

## Remaining limitations

- no mainnet or real-funds execution;
- no public write route;
- no long-duration production reliability study;
- no customer/operator adoption study;
- no measured outcome proof;
- live public Binance Testnet observation is currently unavailable from both public judge runtimes because of venue eligibility;
- Vercel signed read is also venue-refused;
- Cloudflare signed read succeeds for the fixed historical order only;
- TRACE has not yet reviewed the combined v0.3 execution proof + v0.4 multi-page runtime delta;
- final Winning Intelligence recheck remains open;
- final encoded demo has not yet passed TRACE Gate 6.75;
- Project Finisher and protected human submission remain open.

## PBPD verdict

```text
V0_4_RUNTIME_EVIDENCE = RECONCILED
V0_4_ACCEPTANCE = PASS
HISTORICAL_TESTNET_PROOF_INTEGRITY = PRESERVED
VERCEL_RUNTIME = READY__VENUE_FAIL_CLOSED
CLOUDFLARE_RUNTIME = VERIFIED_MIRROR__SIGNED_READ_VERIFIED
NEW_FINANCIAL_WRITE = FALSE
PRD_VERSION_INCREMENT = NOT_REQUIRED
BUILD_CANDIDATE_READY = NOT_YET_EMITTED
TERMINAL_COMPLETENESS_ALLOWED = FALSE
```

## Exact next handoff

```text
PBPD_RUNTIME_EVIDENCE_RECONCILIATION
→ TRACE_DELTA_AFTER_LIVE_TESTNET_AND_V0_4_SCOPE_REQUIRED
```

TRACE must now evaluate the current product/runtime delta, including the historical verified Testnet execution evidence, the v0.4 proof-class separation, the dual-runtime truthfulness, judge readability and the final-video implications. Winning Intelligence, Gate 6.75, candidate handoff, Project Finisher and human submission remain downstream and must not be substituted for this missing TRACE delta.
