# Valid Until — Living PRD Changelog

Status: `ACTIVE`
Source of truth: `product/PRD.md`
Latest evidence reconciliation: `product/POST-BUILD-RECONCILIATION.md`

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
| 2026-09-08 | Repaired Vercel static routing from fragile rewrites to `outputDirectory: web` | `IMPLEMENTATION_EVIDENCE_REPAIR` | `NO_VERSION_INCREMENT` | stable `/` + `/evaluations` HTTP 200; production deployment `dpl_HC9j3Y8nCAfw1PdHNpAhNjrVdo8G` |
| 2026-09-08 | Obtained deployed desktop/mobile + normal/reduced-motion judge-path evidence | `EVIDENCE_UPDATE` | `NO_VERSION_INCREMENT` | TRACE run `34231934516`, artifact `10058192480`, 4/4 PASS |
| 2026-09-08 | Upgraded representative judge-workflow proof from pending/partial to obtained | `PROOF_CLASS_RECONCILIATION` | `NO_VERSION_INCREMENT` | `product/POST-BUILD-RECONCILIATION.md`; behavior proof remains scoped to judge workflow only |
| 2026-09-08 | Winning Intelligence runtime recheck closed sponsor-native/mobile/reduced-motion gaps while preserving final-video gap | `SPECIALIST_EVIDENCE_RECHECK` | `NO_VERSION_INCREMENT` | `product/WINNER-INTELLIGENCE-PRE-SUBMISSION.md` |

These changes did not alter the problem, target user, primary path, authority model, MUST/MUST_NOT product requirements, Agent OS responsibility, or production claim boundary. Therefore the product-source version remains `0.1-retrospective`.

The evidence state in `product/POST-BUILD-RECONCILIATION.md` is newer than the original pending-evidence wording embedded in PRD sections 11/13/19. This is an evidence reconciliation, not permission to silently mutate product intent.

## Post-PRD rule

Any future material change to problem, target user, primary path, human boundary, proof claims, Agent OS role, MUST/MUST_NOT requirements, judge journey, or production gap requires:

`CHANGE_REQUEST → authority check → PRD version increment → Spec Kit/evidence/risk reconciliation → build resumes`

Implementation detail or new evidence that does not alter product intent may proceed without a PRD version change, but must remain traceable in this changelog and the current evidence reconciliation.
