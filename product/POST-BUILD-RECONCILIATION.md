# Valid Until — PBPD Post-Build + Runtime Reconciliation

Date: `2026-09-08`  
Owner: `PBPD`  
Status: `POST_BUILD_AND_RUNTIME_RECONCILIATION_COMPLETE__TRACE_DELTA_REQUIRED`  
Current living product: `product/PRD.md` v0.2 + `product/PRD-0.3-LIVE-TESTNET-EVIDENCE-DELTA.md` + `product/PRD-0.4-LIVE-PROOF-LAB-DELTA.md`  
Runtime reconciliation: `product/PBPD-RUNTIME-EVIDENCE-RECONCILIATION-V0.4.md`

## Purpose

Reconcile the current v0.4 product, implementation, verified runtime, proof classes and limitations against the living PRD without rewriting history or expanding authority.

Earlier revisions of this file described the submission as read-only. That statement was true before the human-authorized v0.3 Spot Testnet evidence delta. It is superseded for the bounded Testnet proof by v0.3 and for the multi-page runtime by v0.4.

## Current product identity

> **Reasoning is not authorization.**

> **A correct decision can expire.**

```text
human policy / intent
→ AI agent interprets and proposes exact action
→ Binance Agent OS / official Binance capability supplies observations
→ Valid Until seals policy + T0 + exact action
→ T1 deterministic revalidation
→ ACTION_REMAINS_VALID or REPLAN_REQUIRED
→ optional protected execution only where separately authorized
```

## Active normative reconciliation

| Requirement band | Current verdict | Evidence / interpretation |
|---|---|---|
| v0.2 MUST-01..08, MUST-10..12 | PASS | receipt v2, exact-action hash, deterministic revalidation, controlled replay, challenge suite, MCP, bounded claims |
| v0.2 MUST-09 read-only Binance evidence | PASS_AS_PRESERVED_EVIDENCE_CLASS | public-market/read-only proof remains present; v0.3 adds a separately authorized higher proof class |
| v0.3 MUST-13..21 | PASS | official Spot Testnet only; one bounded order; hard cap; same clientOrderId verification; sanitized publication; no bypass |
| v0.4 MUST-22..32 | PASS | four judge routes, evidence classes, server-only secrets, fixed known-order signed GET, sanitized responses, no write route, one-click proof navigation |
| v0.2 MUST_NOT-01 | SUPERSEDED_BY_AUTHORIZED_V0_3_DELTA | bounded non-production Spot Testnet write was explicitly authorized and captured once |
| v0.2 MUST_NOT-02..06 | PASS | no public-market secret requirement, no model override, no signature=freshness conflation, no production overclaim, no sponsor-breadth writes |
| v0.3 MUST_NOT-07..10 | PASS | no geo bypass, no mainnet, no alternate-endpoint evasion, no false order claim |
| v0.4 MUST_NOT-11..15 | PASS | no browser secrets, no arbitrary write inputs, no public write button, signed GET != execution, evidence classes remain distinct |

## v0.3 verified execution reconciliation

The authorized route A proof was obtained and remains canonical:

- Binance Spot Testnet only;
- BUY BTCUSDT 10 test USDT;
- Valid Until result `ALLOW / ACTION_REMAINS_VALID`;
- orderId `13634770`;
- clientOrderId `vu-mtswxiik-ecb6b093`;
- status `FILLED`;
- same order queried back: `true`;
- no real funds;
- public sanitized receipt: `web/live-testnet-proof.json`;
- public proof SHA256: `a318c6a6d8d56cd5ab66ee5beedf3baac32dc33885a963b64fbfe814ccad6b76`.

The canonical proof file is unchanged since proof commit `21ab8508e078595fa964c73521bb7f78c2f2a37a`; its Git blob SHA remains `e6c85b3119a88699046bd8af83aee09d9f7184b8`.

## v0.4 runtime reconciliation

### Vercel Production

URL: `https://valid-until-agent-os-plum.vercel.app`

- deployment commit: `76eee8ace6f344145cf90d2369fe9fb2595b788e`;
- status: READY;
- `/`, `/lab`, `/live-proof`, `/evaluations`: HTTP 200;
- `/api/live-market`: `VENUE_ELIGIBILITY_UNAVAILABLE`;
- `/api/order-status`: `VENUE_ELIGIBILITY_UNAVAILABLE`;
- diagnostic behavior is explicit and fail-closed;
- no geographic bypass or new order attempted.

### Cloudflare mirror

URL: `https://valid-until-agent-os.pages.dev`

- static judge surfaces remain live;
- `/api/live-market`: `VENUE_ELIGIBILITY_UNAVAILABLE`;
- `/api/order-status`: `LIVE_SIGNED_READ_VERIFIED`;
- order identity: `13634770` / `vu-mtswxiik-ecb6b093`;
- `same_order_verified: true`;
- signed GET created no new order.

### Final runtime assurance

GitHub Actions `proof` run `34267650642` on handoff commit `0f9ec86...` = SUCCESS.

The v0.4 acceptance contract is satisfied. Detailed reasoning is in `product/PBPD-RUNTIME-EVIDENCE-RECONCILIATION-V0.4.md`.

## Proof classes

### TECHNICAL_PROOF — OBTAINED

Core deterministic, challenge, MCP, execution-boundary, native Testnet transport, real bounded Testnet execution and dual-runtime read/fail-closed evidence are all present.

### BEHAVIOR_PROOF — OBTAINED FOR JUDGE WORKFLOW

A representative evaluator can understand the thesis, replay the controlled stale-premise failure, inspect the verified Testnet execution receipt and review the six-case red team.

### OUTCOME_PROOF — NOT OBTAINED / NOT CLAIMED

No measured reduction in financial loss, fill improvement, ROI or operator productivity.

### PRODUCTION_EVIDENCE — NOT OBTAINED / NOT CLAIMED

Production-hosted judge pages and a non-production Testnet trade do not establish production financial-control readiness.

```text
DEPLOYED_WEB_DEMO != PRODUCTION_FINANCIAL_CONTROL
TESTNET_EXECUTION != REAL_FUNDS_EXECUTION
SIGNED_GET != NEW_ORDER
VENUE_ELIGIBILITY_FAILURE != VALID_UNTIL_BLOCK
```

## Product Reality / Prototype Killer

The simpler-alternative objection remains valid: individual checks can be implemented as deterministic code. The product claim is the reusable action-decision contract across time: frozen policy + exact T0 state + exact action + short validity + T1 revalidation + repeatable failure taxonomy at the agent reasoning→execution boundary.

`HACKATHON_PRODUCT_FIT = SUPPORTED`  
`PRODUCTION_MARKET_FIT = UNVERIFIED`

## Current limitations

- no mainnet or real-funds execution;
- no public write route;
- no production persistence/reliability study;
- no real customer/operator study;
- no outcome proof;
- public live-market reads are currently venue-refused from both judge runtimes;
- Vercel signed read is venue-refused;
- Cloudflare signed read succeeds only for the fixed preserved historical order;
- TRACE delta on v0.3 + v0.4 remains open;
- final Winning Intelligence recheck remains open;
- final encoded video still requires TRACE Gate 6.75;
- PBPD candidate handoff, Project Finisher and protected human submission remain open.

## PBPD reconciliation verdict

```text
CURRENT_PRD_VERSION = 0.4
V0_4_ACCEPTANCE = PASS
PBPD_RUNTIME_EVIDENCE_RECONCILIATION = COMPLETE
PRD_VERSION_INCREMENT = NOT_REQUIRED
BUILD_CANDIDATE_READY = NOT_YET_EMITTED
TRACE_DELTA = REQUIRED_NEXT
TERMINAL_COMPLETENESS_ALLOWED = FALSE
```

## Exact next handoff

```text
PBPD
→ TRACE_DELTA_AFTER_LIVE_TESTNET_AND_V0_4_SCOPE_REQUIRED
```

TRACE must review the new proof/runtime delta before Winning Intelligence final recheck, Gate 6.75, candidate handoff, Project Finisher or submission.