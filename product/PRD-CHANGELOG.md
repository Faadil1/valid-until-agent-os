# Valid Until — Living PRD Changelog

Status: `ACTIVE`
Source of truth: `product/PRD.md`
Current PRD version: `0.2`
Latest evidence reconciliation: `product/POST-BUILD-RECONCILIATION.md` (pre-v0.2 baseline; v0.2 delta reconciliation required before candidate handoff)

This file records material product-source changes from the point the retrospective PRD was created. Earlier changes are reconstructed and explicitly labeled.

## Reconstructed pre-PRD evolution

| Date | Change | Classification | Why it mattered |
|---|---|---|---|
| 2026-09-08 | `DriftGate` → `Valid Until` | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Removed generic `___Gate` AI-safety naming and made temporal/context validity the product identity. |
| 2026-09-08 | Price-drift checker framing → execution-validity primitive | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Prevented the product collapsing into a single market check. |
| 2026-09-08 | Receipt/signature headline → supporting proof layer | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Kept product value on deterministic contextual authorization rather than cryptographic novelty. |
| 2026-09-08 | One failure case → six-case Challenge Suite | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Converted a demo into repeatable red-team/evaluation evidence. |
| 2026-09-08 | Static proof page → interactive judge instrument | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Made action→consequence visible to judges. |
| 2026-09-08 | Simple safety narrative → control/red-team/evaluation/evidence/trust model | `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE` | Added governance/evaluation discipline without changing execution authority. |

## Post-PRD evidence / implementation reconciliation

| Date | Change | Classification | PRD version impact | Evidence |
|---|---|---|---|---|
| 2026-09-08 | Added explicit Agent OS role above fold + direct `6-case red team` judge action | `BOUNDED_TRACE_REWORK` | `NO_VERSION_INCREMENT` | TRACE source findings VU_001/VU_002; CI run `34230726113` |
| 2026-09-08 | Repaired Vercel static routing from fragile rewrites to `outputDirectory: web` | `IMPLEMENTATION_EVIDENCE_REPAIR` | `NO_VERSION_INCREMENT` | stable `/` + `/evaluations` HTTP 200; production deployment evidence |
| 2026-09-08 | Obtained deployed desktop/mobile + normal/reduced-motion judge-path evidence | `EVIDENCE_UPDATE` | `NO_VERSION_INCREMENT` | TRACE run `34231934516`, artifact `10058192480`, 4/4 PASS |
| 2026-09-08 | Upgraded representative judge-workflow proof from pending/partial to obtained | `PROOF_CLASS_RECONCILIATION` | `NO_VERSION_INCREMENT` | `product/POST-BUILD-RECONCILIATION.md`; behavior proof remains scoped to judge workflow only |
| 2026-09-08 | Winning Intelligence runtime recheck closed sponsor-native/mobile/reduced-motion gaps while preserving final-video gap | `SPECIALIST_EVIDENCE_RECHECK` | `NO_VERSION_INCREMENT` | `product/WINNER-INTELLIGENCE-PRE-SUBMISSION.md` |
| 2026-09-08 | Reopened Winning Intelligence against current Track A submissions and adjacent Binance Skills Hub verification products | `SAME_EVENT_COLLISION_RECHECK` | `NO_VERSION_INCREMENT` | `product/WINNER-INTELLIGENCE-RERUN-2026-09-08.md`, `evidence/competition/CURRENT-SUBMISSIONS-2026-09-08.md` |
| 2026-09-08 | Surfaced existing counterfactual: current T1 market checks PASS while T0→T1 premise drift FAILS | `BOUNDED_JUDGE_SURFACING_REWORK` | `NO_VERSION_INCREMENT` | `product/CHANGE-REQUEST-WI-002.md` |
| 2026-09-08 | Added standard portable `skills/valid-until/SKILL.md` + top-level `AGENTS.md` host-agent protocol | `AGENT_NATIVE_PACKAGING_REWORK` | `NO_VERSION_INCREMENT` | same authorized AI-agent / Agent OS / deterministic-authority split; no new execution capability |
| 2026-09-08 | Expanded current-submission / winner scan found that “exact action” claim exceeded receipt-v1 semantics | `PRODUCT_INTEGRITY_DISCOVERY` | **`0.1 → 0.2` REQUIRED** | `product/WINNER-INTELLIGENCE-RERUN-003-X-CORPUS.md`; `product/CHANGE-REQUEST-WI-003.md` |
| 2026-09-08 | Receipt upgraded to v2 binding policy hash + T0 snapshot hash + normalized exact action hash | `MATERIAL_AUTHORIZATION_CONTRACT_REPAIR` | **`0.2`** | core CI: exact-action mutation `$50→$75` blocks even while both remain within `$100` policy cap |
| 2026-09-08 | Added deterministic machine next-state `BLOCK → REPLAN_REQUIRED` | `MATERIAL_AGENT_WORKFLOW_CONTRACT` | **`0.2`** | core/challenge/MCP tests |
| 2026-09-08 | Added narrow dependency-free Valid Until stdio MCP companion (`begin` / `revalidate`) | `MATERIAL_AGENT_NATIVE_INTERFACE` | **`0.2`** | MCP 5/5 smoke/enforcement; no Binance duplicate tools or financial writes |
| 2026-09-08 | Updated judge surface to show receipt-v2 action binding + exact action MATCH alongside current checks PASS / premise EXPIRED | `V0_2_JUDGE_SURFACE_DELTA` | **`0.2`** | fresh deployed TRACE delta required |

## Why v0.2 is material

The WI-002 cycle only improved surfacing/packaging of behavior that already existed. WI-003 found a real semantic gap:

```text
receipt v1 bound policy + snapshot
but did not bind exact T0 action
```

Therefore an in-policy action mutation could conflict with the product's “exact action” claim. Fixing this changes an authorization invariant and the agent-facing contract, so it **must** increment the living PRD rather than being hidden as implementation detail.

The local MCP is also accepted only because it exposes this same unique validity contract as a callable agent-native boundary. It does not add new financial authority.

## Explicitly rejected WI-003 scope

Still rejected:
- x402/payment flow;
- Agentic Wallet writes/funding;
- live order execution;
- duplicated Binance MCP market/trading tools;
- second LLM critic;
- generic risk score;
- indicator/portfolio breadth.

## Evidence status after v0.2 implementation

Obtained:
- core deterministic: `8/8 PASS`;
- challenge suite: `6/6 PASS` including within-policy exact-action mutation;
- MCP companion: `5/5 PASS`;
- source/UI implementation committed.

Still required before final video freeze:
- fresh Vercel deployment serving v0.2;
- fresh TRACE 6.5 delta browser assurance on desktop/mobile/reduced-motion;
- Winning Intelligence final post-deploy recheck;
- TRACE 6.75 contract refresh / final video review.

Prior TRACE 6.5 evidence remains historical proof for the pre-v0.2 surface and cannot be silently reused as v0.2 assurance.

## Post-PRD rule

Any future material change to problem, target user, primary path, human boundary, proof claims, Agent OS role, MUST/MUST_NOT requirements, judge journey, authorization invariant or production gap requires:

`CHANGE_REQUEST → authority check → PRD version increment → Spec Kit/evidence/risk reconciliation → build resumes`

Implementation detail, packaging, judge-surfacing or new evidence that does not alter product intent may proceed without a PRD version change, but must remain traceable in this changelog and current lifecycle state.
