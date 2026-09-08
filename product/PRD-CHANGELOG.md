# Valid Until — Living PRD Changelog

Status: `ACTIVE`
Source of truth: `product/PRD.md` + active normative addenda
Current PRD version: `0.4`
Latest material addendum: `product/PRD-0.4-LIVE-PROOF-LAB-DELTA.md`

The current living PRD is a composite until later consolidation:

```text
product/PRD.md v0.2
+
product/PRD-0.3-LIVE-TESTNET-EVIDENCE-DELTA.md
+
product/PRD-0.4-LIVE-PROOF-LAB-DELTA.md
=
PRD v0.4
```

This file records material product-source changes from the point the retrospective PRD was created. Earlier changes remain reconstructed and explicitly labeled.

## Reconstructed pre-PRD evolution

| Date | Change | Classification | Why it mattered |
|---|---|---|---|
| 2026-09-08 | `DriftGate` → `Valid Until` | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Removed generic `___Gate` naming and made temporal/context validity the product identity. |
| 2026-09-08 | Price-drift checker framing → execution-validity primitive | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Prevented the product collapsing into a single market check. |
| 2026-09-08 | Receipt/signature headline → supporting proof layer | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Kept product value on deterministic contextual authorization rather than cryptographic novelty. |
| 2026-09-08 | One failure case → six-case Challenge Suite | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Converted a demo into repeatable red-team/evaluation evidence. |
| 2026-09-08 | Static proof page → interactive judge instrument | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Made action→consequence visible to judges. |
| 2026-09-08 | Simple safety narrative → control/red-team/evaluation/evidence/trust model | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Added governance/evaluation discipline without changing execution authority. |

## Post-PRD evolution

| Date | Change | Classification | PRD version impact | Evidence |
|---|---|---|---|---|
| 2026-09-08 | Added explicit Agent OS role above fold + direct `6-case red team` judge action | `BOUNDED_TRACE_REWORK` | `NO_VERSION_INCREMENT` | TRACE source findings VU_001/VU_002; CI `34230726113` |
| 2026-09-08 | Repaired Vercel static routing | `IMPLEMENTATION_EVIDENCE_REPAIR` | `NO_VERSION_INCREMENT` | stable runtime routes |
| 2026-09-08 | Obtained desktop/mobile + normal/reduced-motion runtime evidence | `EVIDENCE_UPDATE` | `NO_VERSION_INCREMENT` | TRACE run `34231934516`, artifact `10058192480` |
| 2026-09-08 | Reopened Winning Intelligence against current submissions | `SAME_EVENT_COLLISION_RECHECK` | `NO_VERSION_INCREMENT` | Winner Intelligence reruns |
| 2026-09-08 | Surfaced current checks PASS while prior premise drift FAILS | `BOUNDED_JUDGE_SURFACING_REWORK` | `NO_VERSION_INCREMENT` | `product/CHANGE-REQUEST-WI-002.md` |
| 2026-09-08 | Added portable skill + host-agent protocol | `AGENT_NATIVE_PACKAGING_REWORK` | `NO_VERSION_INCREMENT` | `skills/valid-until/SKILL.md`, `AGENTS.md` |
| 2026-09-08 | Exact-action claim found to exceed receipt-v1 semantics | `PRODUCT_INTEGRITY_DISCOVERY` | **`0.1 → 0.2`** | `product/CHANGE-REQUEST-WI-003.md` |
| 2026-09-08 | Receipt upgraded to v2 with exact normalized action hash | `MATERIAL_AUTHORIZATION_CONTRACT_REPAIR` | **`0.2`** | core exact-action mutation test |
| 2026-09-08 | Added `BLOCK → REPLAN_REQUIRED` | `MATERIAL_AGENT_WORKFLOW_CONTRACT` | **`0.2`** | core/challenge/MCP tests |
| 2026-09-08 | Added narrow local Valid Until MCP companion | `MATERIAL_AGENT_NATIVE_INTERFACE` | **`0.2`** | MCP 5/5 |
| 2026-09-08 | Human changed desired highest proof from read-only to bounded official Spot Testnet execution | `MATERIAL_EVIDENCE_AND_PROTECTED_BOUNDARY_CHANGE` | **`0.2 → 0.3`** | `product/HUMAN-DIRECTION-LIVE-PROOF-001.md` |
| 2026-09-08 | Added hardcoded Spot Testnet execution adapter, manual workflow, secret isolation and sanitizer | `V0_3_IMPLEMENTATION` | **`0.3`** | execution boundary `7/7` |
| 2026-09-08 | GitHub-hosted authenticated attempt was refused by Binance before any order | `V0_3_VENUE_EVIDENCE` | `0.3 evidence update` | run `34248954040` |
| 2026-09-08 | Actual-location access passed and one bounded authenticated Spot Testnet ALLOW was executed and same order queried | `V0_3_ACCEPTANCE_ROUTE_A_OBTAINED` | `NO_VERSION_INCREMENT` | order `13634770`, proof commit `21ab850...` |
| 2026-09-08 | Judge-facing product expanded to four-page Live Proof Lab with server-side live/read layer | `MATERIAL_RUNTIME_AND_JUDGE_JOURNEY_CHANGE` | **`0.3 → 0.4`** | `product/HUMAN-DIRECTION-LIVE-PROOF-LAB-002.md`, `product/PRD-0.4-LIVE-PROOF-LAB-DELTA.md` |
| 2026-09-08 | Added Cloudflare Pages mirror after Vercel Hobby rate-limit | `DEPLOYMENT_RESILIENCE_REPAIR` | `NO_VERSION_INCREMENT` | Cloudflare adapter CI `34259529684` |
| 2026-09-08 | Patched Vercel signed-read error classification for venue eligibility | `RUNTIME_DIAGNOSTIC_REPAIR` | `NO_VERSION_INCREMENT` | commit `76eee8a...` |
| 2026-09-08 | Verified dual runtime: Vercel fail-closed on venue eligibility; Cloudflare signed GET re-verifies canonical historical order | `V0_4_RUNTIME_EVIDENCE` | `NO_VERSION_INCREMENT` | handoff `0f9ec86...`, CI `34267650642` |
| 2026-09-08 | PBPD reconciled v0.4 runtime evidence with living product state | `PBPD_RUNTIME_RECONCILIATION` | `NO_VERSION_INCREMENT` | `product/PBPD-RUNTIME-EVIDENCE-RECONCILIATION-V0.4.md` |

## Why v0.2 was material

Receipt v1 bound policy + snapshot but not the exact T0 action. Receipt v2 fixed that authorization invariant and made within-policy action mutation fail closed.

## Why v0.3 was material

The human explicitly authorized one bounded non-production Spot Testnet write proof. This changed the protected execution boundary and proof ceiling, while preserving no-mainnet/no-real-funds/no-bypass rules.

v0.3 route A is now satisfied by the preserved order `13634770` / `vu-mtswxiik-ecb6b093`. The proof must not be rerun without fresh authorization.

## Why v0.4 was material

The judge experience changed from a mostly static/single-page proof surface to a multi-page interactive proof instrument with server-side read endpoints and explicit LIVE / CONTROLLED / VERIFIED EXECUTION evidence classes. That changed runtime architecture and judge journey, so it required a normative addendum.

## Current status after PBPD runtime reconciliation

- PRD v0.4 acceptance: `PASS`;
- historical Testnet execution proof: preserved unchanged;
- Vercel: production READY, explicit venue fail-closed API behavior;
- Cloudflare: verified mirror, fixed-order signed GET succeeds;
- no new financial write during runtime verification;
- no new PRD version required by the diagnostic/deployment repairs;
- next required specialist: TRACE delta on v0.3 + v0.4 scope.

## Post-PRD rule

Any future material change to problem, target user, primary path, human/protected boundary, proof claims, Agent OS role, MUST/MUST_NOT requirements, judge journey, authorization invariant or production gap requires:

`CHANGE_REQUEST / HUMAN DIRECTION → authority check → living PRD version/delta → Spec Kit reconciliation → implementation/evidence → specialist rechecks`

Implementation, diagnostic or deployment-resilience work that does not alter product intent may proceed without a version increment, but must remain traceable.