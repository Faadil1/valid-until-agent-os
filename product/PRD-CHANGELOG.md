# Valid Until — Living PRD Changelog

Status: `ACTIVE`
Source of truth: `product/PRD.md` + active normative addenda
Current PRD version: `0.3`
Latest material addendum: `product/PRD-0.3-LIVE-TESTNET-EVIDENCE-DELTA.md`

The current living PRD is a composite until later consolidation:

```text
product/PRD.md v0.2
+
product/PRD-0.3-LIVE-TESTNET-EVIDENCE-DELTA.md
=
PRD v0.3
```

This file records material product-source changes from the point the retrospective PRD was created. Earlier changes remain reconstructed and explicitly labeled.

## Reconstructed pre-PRD evolution

| Date | Change | Classification | Why it mattered |
|---|---|---|---|
| 2026-09-08 | `DriftGate` → `Valid Until` | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Removed generic `___Gate` AI-safety naming and made temporal/context validity the product identity. |
| 2026-09-08 | Price-drift checker framing → execution-validity primitive | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Prevented the product collapsing into a single market check. |
| 2026-09-08 | Receipt/signature headline → supporting proof layer | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Kept product value on deterministic contextual authorization rather than cryptographic novelty. |
| 2026-09-08 | One failure case → six-case Challenge Suite | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Converted a demo into repeatable red-team/evaluation evidence. |
| 2026-09-08 | Static proof page → interactive judge instrument | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Made action→consequence visible to judges. |
| 2026-09-08 | Simple safety narrative → control/red-team/evaluation/evidence/trust model | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Added governance/evaluation discipline without changing execution authority. |

## Post-PRD evolution

| Date | Change | Classification | PRD version impact | Evidence |
|---|---|---|---|---|
| 2026-09-08 | Added explicit Agent OS role above fold + direct `6-case red team` judge action | `BOUNDED_TRACE_REWORK` | `NO_VERSION_INCREMENT` | TRACE source findings VU_001/VU_002; CI run `34230726113` |
| 2026-09-08 | Repaired Vercel static routing | `IMPLEMENTATION_EVIDENCE_REPAIR` | `NO_VERSION_INCREMENT` | stable `/` + `/evaluations` HTTP 200 |
| 2026-09-08 | Obtained desktop/mobile + normal/reduced-motion runtime evidence | `EVIDENCE_UPDATE` | `NO_VERSION_INCREMENT` | TRACE run `34231934516`, artifact `10058192480` |
| 2026-09-08 | Reopened Winning Intelligence against current submissions | `SAME_EVENT_COLLISION_RECHECK` | `NO_VERSION_INCREMENT` | `product/WINNER-INTELLIGENCE-RERUN-2026-09-08.md` |
| 2026-09-08 | Surfaced current checks PASS while prior premise drift FAILS | `BOUNDED_JUDGE_SURFACING_REWORK` | `NO_VERSION_INCREMENT` | `product/CHANGE-REQUEST-WI-002.md` |
| 2026-09-08 | Added portable skill + host-agent protocol | `AGENT_NATIVE_PACKAGING_REWORK` | `NO_VERSION_INCREMENT` | `skills/valid-until/SKILL.md`, `AGENTS.md` |
| 2026-09-08 | Exact-action claim found to exceed receipt-v1 semantics | `PRODUCT_INTEGRITY_DISCOVERY` | **`0.1 → 0.2`** | `product/WINNER-INTELLIGENCE-RERUN-003-X-CORPUS.md` |
| 2026-09-08 | Receipt upgraded to v2 with exact normalized action hash | `MATERIAL_AUTHORIZATION_CONTRACT_REPAIR` | **`0.2`** | core exact-action mutation test |
| 2026-09-08 | Added `BLOCK → REPLAN_REQUIRED` | `MATERIAL_AGENT_WORKFLOW_CONTRACT` | **`0.2`** | core/challenge/MCP tests |
| 2026-09-08 | Added narrow local Valid Until MCP companion | `MATERIAL_AGENT_NATIVE_INTERFACE` | **`0.2`** | MCP 5/5 |
| 2026-09-08 | Human changed desired highest proof from read-only to bounded official Spot Testnet execution | `MATERIAL_EVIDENCE_AND_PROTECTED_BOUNDARY_CHANGE` | **`0.2 → 0.3`** | `product/HUMAN-DIRECTION-LIVE-PROOF-001.md`, `product/AUTHORIZATION.md` |
| 2026-09-08 | Added hardcoded Spot Testnet execution adapter, manual Actions workflow, secret isolation and sanitizer | `V0_3_IMPLEMENTATION` | **`0.3`** | testnet execution boundary 7/7; packaging CI `34247316936` |
| 2026-09-08 | First GitHub-hosted authenticated Spot Testnet attempt was refused by Binance under restricted-location/Eligibility before any order | `V0_3_VENUE_EVIDENCE` | **`0.3 evidence update`** | run `34248954040`, `evidence/live-testnet/ATTEMPT-001-GITHUB-HOSTED-RESTRICTED.md` |
| 2026-09-08 | Judge optimization evidence added from winner pattern + Unstop/Masai | `JUDGE_NARRATIVE_OPTIMIZATION` | `NO_VERSION_INCREMENT` | `product/JUDGE-OPTIMIZATION-EVIDENCE-001.md` |

## Why v0.2 was material

Receipt v1 bound policy + snapshot but did not bind the exact T0 action. A later in-policy mutation could therefore conflict with the product's exact-action claim. Receipt v2 fixed that authorization invariant.

## Why v0.3 is material

Earlier product scope explicitly prohibited any live order execution. The human later authorized one bounded non-production Spot Testnet proof to raise the proof ceiling, under strict constraints. That changes the protected execution boundary and evidence plan, so it cannot remain a hidden implementation detail.

v0.3 does **not** authorize:
- mainnet;
- real funds;
- geographic circumvention;
- wallet funding/writes;
- x402;
- arbitrary trading;
- policy weakening to manufacture ALLOW.

## Current v0.3 blocker

GitHub-hosted run `34248954040` passed secret presence, deterministic assurance and Binance CLI installation, then Binance refused the hosted Azure `eastus` location at the authenticated Spot Testnet account check.

No order was sent. The correct response is fail-closed, not cloud-region hopping.

The remaining compliant decision is encoded in `product/PRD-0.3-LIVE-TESTNET-EVIDENCE-DELTA.md`:
- obtain the proof only from a legitimately permitted actual execution location; or
- freeze the final submission without a successful write claim if such access is unavailable without circumvention.

## Post-PRD rule

Any future material change to problem, target user, primary path, human/protected boundary, proof claims, Agent OS role, MUST/MUST_NOT requirements, judge journey, authorization invariant or production gap requires:

`CHANGE_REQUEST / HUMAN DIRECTION → authority check → living PRD version/delta → Spec Kit reconciliation → implementation/evidence → specialist rechecks`

Implementation detail or judge-surfacing that does not alter product intent may proceed without a version change, but must remain traceable.
