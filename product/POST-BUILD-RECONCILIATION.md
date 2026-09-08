# Valid Until — PBPD Post-Build Reconciliation

Date: `2026-09-08`  
Owner: `PBPD`  
Status: `POST_BUILD_RECONCILIATION_COMPLETE__TRACE_GATE_6_75_PENDING`  
Product source: `product/PRD.md` (`0.1-retrospective`)  
Authority source: `product/AUTHORIZATION.md`

## Purpose

Reconcile the retrospective living PRD against the actual current build, deployed judge experience, proof classes, known limitations, and specialist findings.

This document does **not** claim the PRD existed before implementation. It does not authorize submission and does not replace TRACE, Winning Intelligence, Project Finisher, or human protected-action authority.

## Current product identity

Canonical thesis:

> **Reasoning is not authorization.**

Current separation of responsibility:

```text
human policy / intent
→ AI agent interprets and proposes
→ Binance Agent OS supplies fresh Binance observations + capabilities
→ Valid Until deterministically revalidates the exact action
→ ALLOW / BLOCK
→ BLOCK = NO LONGER VALID + fresh reasoning required
```

Current scope remains read-only. No live order execution, funding, account secret, or geographic bypass is implemented or authorized.

## PRD MUST reconciliation

| PRD requirement | Actual implementation / evidence | Proof class | Verdict |
|---|---|---|---|
| MUST-01 — policy sealed before market-state eligibility | `sealPolicy()` validates, canonicalizes and hashes the policy before snapshot eligibility; SKILL workflow requires policy-first | TECHNICAL_PROOF | PASS |
| MUST-02 — receipt binds exact policy + snapshot identity | receipt contains policy hash + exact snapshot hash; core test and deployed `demo.json` expose both | TECHNICAL_PROOF | PASS |
| MUST-03 — receipt integrity independently verifiable | Ed25519 receipt verification; tamper mutation fails core test; EVAL-04 blocks receipt tamper | TECHNICAL_PROOF | PASS |
| MUST-04 — revalidate freshness + current market invariants | `revalidate()` checks receipt age, drift, spread, 1m movement, bid/ask depth | TECHNICAL_PROOF | PASS |
| MUST-05 — exact action symbol/notional vs sealed policy | `evaluateProposedAction()` checks symbol, finite non-negative notional, max notional; EVAL-06 blocks $1,000 vs sealed $100 | TECHNICAL_PROOF | PASS |
| MUST-06 — any failed required invariant → BLOCK | revalidation terminal is `ALLOW` only when every check passes and receipt was initially eligible; canonical suite validates five distinct BLOCK classes | TECHNICAL_PROOF | PASS |
| MUST-07 — BLOCK requires fresh reasoning; no in-cycle policy weakening | SKILL contract explicitly requires fresh reasoning after BLOCK and forbids self-healing by weakening policy; deterministic engine has no policy-mutation recovery path | TECHNICAL_CONTRACT + BEHAVIOR_CONSTRAINT | PASS |
| MUST-08 — controlled replay labeled synthetic | deployed hero carries `CONTROLLED REPLAY · NO MONEY MOVES`; footer and evidence source state controlled fixture | BEHAVIOR_PROOF | PASS |
| MUST-09 — live Binance proof remains read-only + truthful | live proof uses official Binance CLI public market data; no API key/order/account; run `34225133745` | TECHNICAL_PROOF | PASS |
| MUST-10 — judge Challenge Suite exposes clean ALLOW + multiple failure classes | deployed `/evaluations`; `/challenges.json` reports `6/6`; one ALLOW + five BLOCK classes | TECHNICAL_PROOF + BEHAVIOR_PROOF | PASS |
| MUST-11 — no production/profitability/safety overclaim | README, SKILL, deployed footer and TRACE truth review preserve claim boundaries | BEHAVIOR_PROOF | PASS |

`MUST_PASS = 11/11`

## SHOULD reconciliation

| Requirement | Evidence | Verdict |
|---|---|---|
| SHOULD-01 — exact failed invariant + threshold | hero shows `MID DRIFT 35.47 BPS > 20 BPS`; evaluation cases expose failed check names | PASS |
| SHOULD-02 — reduced-motion behavior | TRACE runtime run `34231934516`: desktop + mobile `reducedMotion: reduce` both PASS, no console errors | PASS |
| SHOULD-03 — Agent OS role legible early | TRACE bounded rework added above-fold architecture strip; runtime verifies `Binance Agent OS` visible in all four contexts | PASS |
| SHOULD-04 — evidence pointers preserved | site proof band, state files, GitHub Actions runs/artifact IDs/digests recorded | PASS |

`SHOULD_PASS = 4/4`

## MUST_NOT reconciliation

| Forbidden behavior | Current state | Verdict |
|---|---|---|
| MUST_NOT-01 — live order placement | execution adapter intentionally absent; submission read-only | PASS |
| MUST_NOT-02 — request/store account secrets | public Binance data path needs no API key; no secret requested for demo | PASS |
| MUST_NOT-03 — model prose overrides deterministic BLOCK | SKILL authority contract separates proposal from terminal validity result | PASS |
| MUST_NOT-04 — signature validity treated as fresh-state validity | hero explicitly demonstrates intact receipt + stale premise → BLOCK | PASS |
| MUST_NOT-05 — demo/CI/live read-only proof promoted to production evidence | proof classes remain separated; production evidence explicitly absent | PASS |

`MUST_NOT_PASS = 5/5`

## Spec Kit reconciliation

Derived execution artifacts remain coherent with the living PRD:

- `product/specs/001-execution-validity/spec.md` — exact-action validity boundary preserved;
- `product/specs/001-execution-validity/plan.md` — bounded architecture preserved;
- `product/specs/001-execution-validity/tasks.md` — technical/deployment/runtime tasks reconciled to current state.

No Spec Kit artifact changed product authority or replaced the PRD.

## Winning Intelligence reconciliation

Current recheck: `product/WINNER-INTELLIGENCE-PRE-SUBMISSION.md`.

Resolved after deployment:
- sponsor-native necessity → `SUPPORTED` for the concrete Track A implementation;
- deployed narrative legibility → `SUPPORTED_RUNTIME__FINAL_VIDEO_PENDING`;
- deployed judge path → `SUPPORTED_RUNTIME__FINAL_VIDEO_PENDING`;
- mobile and reduced-motion runtime gaps → closed.

Still open:
- final encoded video path has not yet been reviewed;
- protected human deliverables remain incomplete;
- unknown unpublished scoring dimensions remain `UNKNOWN` rather than invented.

Winning Intelligence retains authority `NONE`.

## TRACE reconciliation

TRACE Gate 6.5 = **PASS**.

Canonical TRACE evidence:
- production URL: `https://valid-until-agent-os.vercel.app`;
- production deployment: `dpl_HC9j3Y8nCAfw1PdHNpAhNjrVdo8G`;
- source head validated at Gate 6.5: `f6184bf7b7c8e2b93fc712f48fe0d0b081c7e3f3`;
- runtime run: `34231934516`;
- runtime artifact: `10058192480`;
- artifact digest: `sha256:4f0ba722100568c2a320ade6eda2ce3ba81e4040026c1c946ee71ccc661b66f1`;
- desktop normal motion: PASS;
- mobile normal motion: PASS;
- desktop reduced motion: PASS;
- mobile reduced motion: PASS;
- console errors: NONE.

TRACE Gate 6.75 is **IN_PROGRESS** because the final encoded video has not yet been produced/reviewed. Its contract is frozen in:

`Faadil1/trace-design-workflow/state/projects/valid-until/GATE_6_75_DEMO_NARRATIVE_001.md`

PBPD must not reinterpret Gate 6.5 PASS as Gate 6.75 PASS.

## Proof-class reconciliation

### TECHNICAL_PROOF — OBTAINED

- core deterministic invariants: `7/7 PASS`;
- challenge suite: `6/6 PASS`;
- controlled stale-state transition: `ELIGIBLE → 35.47 bps > 20 bps → BLOCK`;
- live official Binance CLI read-only path;
- Vercel routes `/`, `/evaluations`, `/demo.json`, `/challenges.json` operational;
- deployed browser runtime evidence.

### BEHAVIOR_PROOF — OBTAINED FOR REPRESENTATIVE JUDGE WORKFLOW

A representative evaluator can:

```text
open deployed product
→ understand thesis / Agent OS role
→ click Replay proof
→ observe NO LONGER VALID
→ navigate to six-case red-team surface
→ inspect expected terminal outcomes
```

This was exercised in real Chromium at desktop/mobile and normal/reduced-motion settings.

Boundary: this is **judge-workflow behavior evidence**, not customer adoption or production financial-operator behavior.

### OUTCOME_PROOF — NOT OBTAINED / NOT CLAIMED

No measured comparison shows reduced real financial loss, improved fill quality, ROI, or operator productivity.

### PRODUCTION_EVIDENCE — NOT OBTAINED / NOT REQUIRED FOR CURRENT HACKATHON BOUNDARY

The public deployment is production-hosted as a judge artifact, but that does **not** make the financial control mechanism production-proven. There is no live execution adapter, funded account workflow, long-duration production reliability study, or production operator evidence.

Hard semantics remain:

```text
TECHNICAL_PROOF != BEHAVIOR_PROOF
BEHAVIOR_PROOF != OUTCOME_PROOF
OUTCOME_PROOF != PRODUCTION_EVIDENCE
DEPLOYED_WEB_DEMO != PRODUCTION_FINANCIAL_CONTROL
```

## Product Reality / Prototype Killer recheck

The principal killing objection remains intentionally visible:

> Could this just be a small deterministic pre-trade script?

Current answer remains bounded:
- individual checks are simple and should stay deterministic;
- product value is not the novelty of any one `if` statement;
- the product contract binds fuzzy agent interpretation, frozen user policy, exact proposed action, state identity, freshness, repeatable failure taxonomy, and fail-closed authorization at the Agent OS reasoning→action boundary;
- no real-user adoption/outcome evidence yet proves this becomes a standalone durable product rather than infrastructure pattern.

Therefore:
- `HACKATHON_PRODUCT_FIT = SUPPORTED`;
- `PRODUCTION_MARKET_FIT = UNVERIFIED`;
- Prototype Killer is not reopened, but its production-adoption assumption remains unresolved truthfully.

## Deployment reconciliation

An initial Vercel deployment was `READY` but returned 404 at `/` and `/evaluations`. PBPD did **not** treat platform status as product evidence.

Repair:
- `vercel.json` changed from root-to-`web/` rewrites to `buildCommand: npm run build:web` + `outputDirectory: web` + `cleanUrls: true`;
- root and evaluation routes then returned HTTP 200;
- TRACE runtime evidence ran only after the stable alias was operational.

Classification: `IMPLEMENTATION / EVIDENCE ROUTING REPAIR`, not a material product-intent change. No PRD version increment is required.

## Current limitations

- no live order execution adapter;
- no funded account path;
- no real operator/customer study;
- no measured outcome / loss-reduction evidence;
- no production reliability evidence;
- final encoded submission video still pending TRACE Gate 6.75;
- external X/survey actions remain human-protected.

## PBPD reconciliation verdict

```text
PRD_MUST = PASS_11_OF_11
PRD_SHOULD = PASS_4_OF_4
PRD_MUST_NOT = PASS_5_OF_5
SPEC_KIT_RECONCILIATION = PASS
WINNING_INTELLIGENCE_RUNTIME_RECHECK = COMPLETE_WITH_FINAL_VIDEO_GAP
TRACE_GATE_6_5 = PASS
TRACE_GATE_6_75 = IN_PROGRESS
TECHNICAL_PROOF = OBTAINED
BEHAVIOR_PROOF = OBTAINED_FOR_REPRESENTATIVE_JUDGE_WORKFLOW
OUTCOME_PROOF = NOT_OBTAINED_NOT_CLAIMED
PRODUCTION_EVIDENCE = NOT_OBTAINED_NOT_CLAIMED
PBPD_POST_BUILD_RECONCILIATION = COMPLETE
BUILD_CANDIDATE_READY = NOT_YET_EMITTED
PROJECT_FINISHER_ELIGIBLE = FALSE_UNTIL_TRIGGERED_TRACE_GATE_6_75_RESOLVES
TERMINAL_COMPLETENESS_ALLOWED = FALSE
```

## Exact next handoff

```text
PBPD
→ TRACE Gate 6.75 / human recording boundary
→ actual final 58–65s encoded demo
→ TRACE reviews film truth/readability
→ PBPD emits candidate handoff if no new product conflict
→ Project Finisher independent terminal assurance
→ human protected submission
```

No other subsystem may substitute for the missing Gate 6.75 verdict.
