# Valid Until — Product Requirements Document

Version: `0.1-retrospective`
Status: `RETROSPECTIVE_CURRENT_STATE_PRD`
Date: `2026-09-08`
Owner: `PBPD`
Authorization source: `product/AUTHORIZATION.md`
Historical note: **This PRD was created after implementation had already begun. It must not be interpreted as evidence that the pre-build PRD gate was historically satisfied. It becomes the authoritative product baseline for future material changes.**

> This PRD cannot expand authority beyond the human authorization record.

## 1. Product summary

Valid Until is an execution-integrity layer for AI agents using Binance Agent OS. It separates probabilistic reasoning from deterministic action authorization. An agent may interpret intent, inspect Binance state and propose an action, but the action may proceed only if its sealed policy, exact decision context, freshness and action parameters still satisfy deterministic invariants immediately before a consequential boundary.

Canonical thesis: **Reasoning is not authorization.**

Secondary thesis: **A demo is not trust.**

## 2. Target user / stakeholder

Primary user:
- developers/operators building semi-autonomous or autonomous financial agents;
- evaluators assessing whether an agent can fail safely at the reasoning→execution boundary.

Secondary stakeholders:
- risk / governance reviewers;
- Binance Agent OS ecosystem builders;
- future human approvers of consequential actions.

## 3. Job-to-be-done

> When I delegate financial workflow planning to an AI agent, I need the proposed action to prove that the conditions and intent that justified it are still valid immediately before execution, so that stale reasoning or drifted action parameters cannot silently become financial authority.

## 4. Problem / evidence

Problem:

An AI agent can make a reasonable decision at T0 and retain technical permission to act at T1 even after market state, policy context, receipt freshness or the proposed action itself has materially drifted.

Evidence:
- `evidence/problem-discovery/COUNCIL.md` — independent blind problem discovery across Perplexity, Grok, Claude, Kimi and Gemini. Truth class: `IDEA_SELECTION_EVIDENCE`, not customer validation.
- `evidence/live/...` / GitHub Actions run `34225133745` — official Binance CLI public-market-data path and real fail-closed behavior. Truth class: `TECHNICAL_PROOF`.
- controlled replay and Challenge Suite — deterministic failure reproduction. Truth class: `TECHNICAL_PROOF`.

Truth classes:
- FACT: the current build can seal policy, bind state, verify signed receipts and deterministically ALLOW/BLOCK under tested conditions.
- INFERENCE: reasoning→execution drift is an important failure surface for agentic finance.
- HYPOTHESIS: operators will adopt a standardized validity boundary rather than bespoke checks.
- UNVERIFIED: market size, user willingness to pay, reduction in real financial losses, production reliability.

## 5. Goals

- G1 — Make the reasoning→action boundary explicit and inspectable.
- G2 — Fail closed when sealed state/policy/action invariants no longer hold.
- G3 — Demonstrate the mechanism in under 75 seconds without live trading or account funding.
- G4 — Expose repeatable red-team evaluations rather than a happy-path-only demo.
- G5 — Keep claims bounded to evidence actually obtained.

## 5A. Product Reality / workflow evidence

Pain / friction:
- agents can act on stale observations or mutate action parameters during multi-step tool use;
- existing permissioning answers “what may this agent do?” more readily than “is this exact proposed action still justified now?”;
- opaque retries/error recovery can increase blast radius.

Frequency / recurrence:
- every consequential agent action creates a reasoning→execution boundary;
- material harmful drift frequency in production is `UNVERIFIED`.

Economic / operational consequence:
- Risk: potentially adverse fills, unintended action size, execution under invalid policy/context. `INFERENCE`.
- Time/Cost/ROI: not measured; no quantitative claim permitted.

Real workflow:

```text
human defines bounded intent / policy
→ agent interprets request
→ Agent OS / Binance Skills supplies observations
→ agent proposes exact action
→ Valid Until seals/binds decision context
→ fresh deterministic revalidation
→ ALLOW or BLOCK / fresh reasoning required
→ any protected execution remains outside this read-only submission
```

Tacit / exception rules currently known:
- policy must be frozen before using later evidence to relax it;
- BLOCK cannot trigger self-healing by weakening thresholds;
- missing evidence fails closed;
- a signed receipt does not override stale state;
- a technically allowed agent capability does not authorize a semantically drifted action;
- `ALLOW` means only “still valid under sealed invariants”, not “profitable” or “recommended”.

Unknown context still to discover:
- production operator thresholds;
- incident/retry patterns;
- acceptable latency budget by strategy/use case;
- which invariants are universal vs strategy-specific.

## 5B. Baseline / AI advantage / routing

Current/manual baseline:
- human approval before every consequential action.

Simpler deterministic alternatives:
- limit/OCO/trailing orders;
- exchange-native permissions and wallet limits;
- strategy-specific pre-trade checks;
- a small deterministic wrapper script.

AI / agent advantage hypothesis:
- AI is useful upstream for interpreting messy human intent, selecting tools and composing workflows across context.
- AI is **not** the preferred authority mechanism for final execution validity.
- therefore the product intentionally combines a probabilistic planner with deterministic authorization.

Routing rationale:

| Dimension | Requirement |
|---|---|
| Capability | Agent interprets intent/workflow; deterministic engine validates exact action/context |
| Latency | Final authorization must be faster and more predictable than model reasoning |
| Cost | Deterministic checks should be negligible compared with LLM/tool orchestration |
| Reliability | Fail-closed, inspectable, reproducible terminal state |
| Context | Fresh Binance market data + frozen user policy + exact proposed action |

## 5C. Human boundary / production gap / moat-learning

Human boundary:
- human defines/accepts policy and protected-action scope;
- human owns external submission/publishing;
- no live order execution is authorized in this project;
- future real execution would require separate authority/eligibility/production controls.

Production gap:
- no real order-placement adapter;
- no funded account path;
- no production user study;
- no measured loss reduction/outcome proof;
- no long-duration reliability or adversarial production testing;
- current live proof uses public market data and controlled read-only evidence.

Moat / learning hypothesis:
- reusable failure taxonomy;
- accumulated policy/action mismatch cases;
- evaluation distributions and execution-context receipts;
- workflow-specific validity schemas.

Model access alone is not a moat.

## 6. Non-goals

- NG1 — predict price, alpha or profitability.
- NG2 — replace Binance native permissions, order controls or Agentic Wallet limits.
- NG3 — execute live trades in this submission.
- NG4 — claim production readiness or reduced financial losses.
- NG5 — use another LLM as the final risk/authorization judge.

## 7. Primary Path

```text
sealed user policy
→ fresh Binance observation
→ agent proposal
→ state-bound short-lived receipt
→ fresh pre-action observation
→ deterministic revalidation
→ STILL VALID / NO LONGER VALID
→ evidence shown to judge
```

## 8. Hero Demo Moment

Starting state: BTCUSDT action is initially `ELIGIBLE` under sealed policy.

Judge action: click `Replay proof`.

Observable change: drift animates from `0` through the `20 bps` boundary to `35.47 bps`; execution state becomes `NO LONGER VALID`.

Proof: controlled deterministic fixture + same core revalidation engine used by tests.

Time budget: core story under 60 seconds; technical appendix optional.

Reset/replay: explicit Reset + replay.

## 9. Functional requirements

### MUST

- MUST-01 — Policy must be sealed before market-state eligibility evaluation.
- MUST-02 — Decision receipt must bind exact policy and snapshot identity.
- MUST-03 — Receipt integrity must be independently verifiable.
- MUST-04 — Revalidation must check freshness and current market-state invariants.
- MUST-05 — Proposed action must be checked against sealed symbol/notional policy.
- MUST-06 — Any failed required invariant must return `BLOCK` / `NO LONGER VALID`.
- MUST-07 — BLOCK must require fresh reasoning; policy cannot be weakened inside the same cycle.
- MUST-08 — Controlled replay must be clearly labeled synthetic/controlled.
- MUST-09 — Live Binance proof must remain read-only and truthfully labeled.
- MUST-10 — Judge-facing Challenge Suite must expose multiple failure classes and a clean ALLOW case.
- MUST-11 — No production/profitability/safety-outcome overclaim.

### SHOULD

- SHOULD-01 — Surface exact failed invariant and threshold.
- SHOULD-02 — Preserve accessible reduced-motion behavior.
- SHOULD-03 — Make Agent OS role legible within first judge interaction.
- SHOULD-04 — Preserve evidence pointers to CI/live artifacts.

### MAY

- MAY-01 — Add future policy schema extensions for exposure, order type or strategy-specific context after PRD change control.
- MAY-02 — Add future human approval gateway only as a separately scoped evolution.

### MUST_NOT

- MUST_NOT-01 — Place a live order in the current submission.
- MUST_NOT-02 — Request or store account secrets for public-market proof.
- MUST_NOT-03 — Let model prose override deterministic BLOCK.
- MUST_NOT-04 — Treat signature validity as proof that current state remains valid.
- MUST_NOT-05 — Treat CI/demo/live read-only proof as production evidence.

## 10. Non-functional requirements

- Reliability: deterministic checks produce reproducible terminal states for controlled fixtures.
- Reproducibility: CI must run core invariants + Challenge Suite and rebuild judge data.
- Safety: fail closed on missing/malformed required evidence.
- Privacy/secrets: no secrets required for submitted live path.
- Accessibility: responsive layout and `prefers-reduced-motion` support.
- Explainability: show failed invariant without requiring judge to inspect logs.

## 11. Success metrics

Primary project metric:

`CHALLENGE_SUITE_EXPECTED_TERMINAL_STATE_ACCURACY = 6/6 on canonical cases`

Supporting metrics:
- core invariants: `7/7 PASS`;
- live Binance read-only capture path: successful public-market-data proof;
- hero negative path: `ELIGIBLE → 35.47 bps > 20 bps → BLOCK`;
- judge core mechanism visible within one interaction.

Proof classes:
- TECHNICAL_PROOF: required and obtained.
- BEHAVIOR_PROOF: partial — judge/user can operate replay/evaluation UI after deployment; full runtime verification pending.
- OUTCOME_PROOF: not required / not obtained.
- PRODUCTION_EVIDENCE: not required / not obtained.

## 12. Acceptance criteria

Build candidate may proceed toward terminal assurance only when:
- all MUST requirements are reconciled to current build/evidence;
- lifecycle coverage has no hidden omission;
- Winning Intelligence pre-submission check is resolved;
- TRACE design/experience trigger is resolved on deployed judge path;
- Vercel `/` and `/evaluations` are smoke-tested desktop/mobile/reduced-motion as applicable;
- claims remain within obtained proof classes;
- Project Finisher performs independent terminal assurance.

## 13. Evidence plan

| Claim | Proof class | Evidence |
|---|---|---|
| deterministic boundary catches canonical failures | TECHNICAL_PROOF | `tests/run.mjs`, Challenge Suite CI |
| controlled state drift becomes invalid | TECHNICAL_PROOF | `npm run demo`, `/` replay |
| official Binance path works read-only | TECHNICAL_PROOF | Actions run `34225133745`, Binance CLI `2.1.1` |
| judge can understand/operate experience | BEHAVIOR_PROOF | pending deployed TRACE/runtime smoke |
| product reduces losses / improves ROI | OUTCOME_PROOF | NOT CLAIMED |
| production-ready agent control | PRODUCTION_EVIDENCE | NOT CLAIMED |

## 14. Constraints

Deadline: `2026-09-08T23:59:00Z`.

Platform: Binance Agent OS / Binance Skills + public GitHub + video/demo submission.

Safety: read-only market data; no funding/trading/geographic circumvention.

Time pressure does not waive lifecycle gates; unresolved gates must remain visible.

## 15. Authority / protected actions

Permitted: repository build/test, public market-data proof, preview/deployment preparation.

Protected: final public deployment where policy requires explicit human action, X submission, official survey, any future trade/account action.

## 16. Killing assumptions

- A-01 — reusable execution validity is valuable beyond bespoke scripts. `HYPOTHESIS`.
- A-02 — agent interpretation adds value over fully deterministic automation for target workflows. `PARTIALLY_SUPPORTED / UNVERIFIED_OUTCOME`.
- A-03 — current Agent OS integration is sufficiently native/legible for Track A judges. `TO_BE_RECHECKED_BY_WINNING_INTELLIGENCE + TRACE`.

## 17. Risks / failure modes

- R-01 — project perceived as “20-line price checker”. Mitigation: exact-action binding + multi-failure Challenge Suite + architecture clarity.
- R-02 — Agent OS integration perceived as superficial. Mitigation: live official Binance CLI proof + skill contract + sponsor-native judge path.
- R-03 — UI becomes generic AI/crypto dashboard. Mitigation: TRACE uniqueness/anti-slop review.
- R-04 — controlled replay confused with live data. Mitigation: explicit labels and separate live proof.
- R-05 — live proof BLOCK misread as broken system. Mitigation: explain fail-closed result and separate authenticity vs hero transition.
- R-06 — deadline pressure causes skipped lifecycle gates. Mitigation: lifecycle coverage policy and terminal blockers.

## 18. Dependencies

- Binance Agent OS / Binance Skills Hub / `binance-cli`.
- GitHub Actions.
- Vercel for judge-facing web preview.
- Faadil Agent System router.
- PBPD living-PRD governance.
- Spec Kit bounded execution artifacts.
- Winning Intelligence pre-submission heuristics.
- TRACE Design / Experience Assurance.
- Project Finisher terminal assurance.
- Human final submission authority.

## 19. Open questions

- Q1 — Does the deployed judge path communicate sponsor-native necessity in <15 seconds?
- Q2 — Does TRACE find any distinctiveness, hierarchy, mobile or reduced-motion blocker?
- Q3 — Does Project Finisher consider the submission package complete without production evidence if limitations remain explicit?

## 20. Completion / submission boundary

PBPD terminal ceiling: `BUILD_CANDIDATE_READY` or `BUILD_CANDIDATE_READY_WITH_LIMITATIONS`.

Project completion cannot be emitted by PBPD, TRACE, Winning Intelligence, Spec Kit or CI.

Project Finisher must issue terminal assurance before human submission.

Human owns X publication, survey submission and any other protected external action.

## 21. Hackathon additions

Official current public entry requirements include Track A agent built with Agent OS, video/demo + GitHub if applicable, follow/repost, reply/quote with submission, and survey before the published deadline. Detailed public scoring dimensions were not found on the official blog and must not be invented.

Judge journey target:

```text
0-5s: understand “Reasoning is not authorization”
5-15s: see Agent OS + exact execution-validity boundary
15-45s: trigger hero replay and see NO LONGER VALID
45-60s: see 6-case red-team/evaluation surface + live Binance authenticity proof
```

## 22. Version / scope-change history

| Version | Date | Change | Reason |
|---|---|---|---|
| 0.1-retrospective | 2026-09-08 | Reconstructed current-state PRD after build had begun | Lifecycle completeness repair; future product-source baseline |

Known material evolution already observed before this PRD existed:
- `DriftGate` → `Valid Until` naming/positioning change;
- stale-price checker framing → broader execution-validity primitive;
- one hero failure → six-case evaluation suite;
- static proof page → interactive judge instrument;
- signature/receipt headline → supporting evidence layer;
- trust model expanded to control → red-team → evaluation → evidence → trust.

Future material changes require PRD version increment and reconciliation before build resumes.

---

## Current declaration

`PRD_STATUS = RETROSPECTIVE_CURRENT_STATE_PRD`

This PRD is sufficiently decision-complete to serve as the product source for the **remaining current-scope work only**: Spec Kit reconciliation, Winning Intelligence, TRACE/deployment assurance, demo packaging and Project Finisher. It does not retroactively erase the historical pre-build omission.
