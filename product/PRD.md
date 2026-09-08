# Valid Until — Product Requirements Document

Version: `0.2`
Status: `ACTIVE_EVOLVING_PRD`
Date: `2026-09-08`
Owner: `PBPD`
Authorization source: `product/AUTHORIZATION.md`
Historical baseline: `0.1-retrospective`
Historical note: **The original PRD baseline was reconstructed after implementation had already begun. Version 0.2 is a real forward material evolution triggered by Winning Intelligence rerun 003. It must not be backdated or interpreted as having existed before the associated change request.**

> This PRD cannot expand authority beyond the human authorization record.

## 1. Product summary

Valid Until is an action-bound cross-time execution-integrity layer for AI agents using Binance Agent OS. It separates probabilistic reasoning from deterministic action authorization. An agent may interpret intent, inspect Binance state and propose an exact action, but the action may proceed only if its sealed policy, exact T0 decision context, exact T0 action, freshness and current conditions still satisfy deterministic invariants immediately before a consequential boundary.

Canonical thesis: **Reasoning is not authorization.**

Judge-memory line: **A correct decision can expire.**

Supporting trust thesis: **A demo is not trust.**

## 2. Target user / stakeholder

Primary user:
- developers/operators building semi-autonomous or autonomous financial agents;
- evaluators assessing whether an agent can fail safely at the reasoning→execution boundary.

Secondary stakeholders:
- risk / governance reviewers;
- Binance Agent OS ecosystem builders;
- future human approvers of consequential actions.

## 3. Job-to-be-done

> When I delegate financial workflow planning to an AI agent, I need the **exact proposed action** to prove that it is still the same action-decision contract justified by the frozen policy and T0 market state immediately before execution, so that stale reasoning or silent in-policy action mutation cannot inherit old authorization.

## 4. Problem / evidence

Problem:

An AI agent can make a reasonable decision at T0 and retain technical permission to act at T1 even after market state, policy context, receipt freshness or the proposed action itself has materially drifted.

A second failure exists inside otherwise valid policy scope: an action can mutate from one legal action to another legal action and still be different from the exact decision that was originally justified.

Evidence:
- `evidence/problem-discovery/COUNCIL.md` — independent blind problem discovery across Perplexity, Grok, Claude, Kimi and Gemini. Truth class: `IDEA_SELECTION_EVIDENCE`, not customer validation.
- `evidence/competition/CURRENT-SUBMISSIONS-2026-09-08.md` + Winner Intelligence reruns — same-event collision and open-space analysis. Truth class: `COMPETITIVE_EVIDENCE`.
- GitHub Actions CI after WI-003 — receipt-v2 exact-action binding, Challenge Suite v2 and MCP smoke. Truth class: `TECHNICAL_PROOF`.
- existing live Binance CLI evidence — sponsor-native public-market-data authenticity path. Truth class: `TECHNICAL_PROOF`, not production execution evidence.
- controlled replay and Challenge Suite — deterministic failure reproduction. Truth class: `TECHNICAL_PROOF`.

Truth classes:
- FACT: the current build can seal policy, bind T0 state, bind exact normalized action, verify signed receipt v2 and deterministically ALLOW/BLOCK under tested conditions.
- FACT: the local MCP companion exposes the decision contract to an agent host and has no financial write capability.
- INFERENCE: reasoning→execution drift is an important failure surface for agentic finance.
- HYPOTHESIS: operators will adopt a standardized validity boundary rather than bespoke checks.
- UNVERIFIED: market size, user willingness to pay, reduction in real financial losses, production reliability.

## 5. Goals

- G1 — Make the reasoning→action boundary explicit and inspectable.
- G2 — Fail closed when sealed state/policy/**exact-action** invariants no longer hold.
- G3 — Demonstrate the mechanism in under 75 seconds without live trading or account funding.
- G4 — Expose repeatable red-team evaluations rather than a happy-path-only demo.
- G5 — Provide a callable agent-native contract surface without duplicating Binance capabilities.
- G6 — Keep claims bounded to evidence actually obtained.

## 5A. Product Reality / workflow evidence

Pain / friction:
- agents can act on stale observations or mutate action parameters during multi-step tool use;
- existing permissioning answers “what may this agent do?” more readily than “is this exact proposed action still justified now?”;
- a policy cap can accept multiple actions, so “inside policy” is not equivalent to “same authorized decision”;
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
→ agent proposes exact normalized action
→ Agent OS / Binance Skills supplies T0 observations
→ Valid Until begin: seal policy + T0 state + exact action
→ short-lived signed receipt v2 / decision_id
→ Agent OS supplies fresh T1 observations
→ Valid Until revalidate: current state + cross-time delta + exact action hash
→ ALLOW / ACTION_REMAINS_VALID
  or BLOCK / REPLAN_REQUIRED
→ any protected execution remains outside this read-only submission
```

Tacit / exception rules currently known:
- policy must be frozen before using later evidence to relax it;
- exact action must be normalized before receipt issuance;
- BLOCK cannot trigger self-healing by weakening thresholds;
- missing evidence or unknown decision id fails closed;
- a signed receipt does not override stale state;
- an action inside the same policy envelope does not inherit authorization unless its exact action hash matches;
- a technically allowed agent capability does not authorize a semantically or temporally drifted action;
- `ALLOW` means only “still valid under sealed invariants”, not “profitable” or “recommended”.

Unknown context still to discover:
- production operator thresholds;
- incident/retry patterns;
- acceptable latency budget by strategy/use case;
- which invariants are universal vs strategy-specific;
- production persistence/concurrency requirements for decision state.

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
| Agent-native interface | Skill for behavior + narrow MCP companion for deterministic contract lifecycle |

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
- MCP decision state is in-process only, not production-persistent;
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
- NG4 — add x402/payment or Agentic Wallet write paths to increase integration count.
- NG5 — duplicate Binance market/trading tools inside the local MCP.
- NG6 — claim production readiness or reduced financial losses.
- NG7 — use another LLM as the final risk/authorization judge.

## 7. Primary Path

```text
exact agent proposal
→ sealed user policy
→ fresh Binance T0 observation
→ action-bound + state-bound short-lived receipt v2
→ fresh Binance T1 observation
→ exact action re-presented
→ deterministic revalidation
→ ACTION_REMAINS_VALID / REPLAN_REQUIRED
→ STILL VALID / NO LONGER VALID shown to judge
```

## 8. Hero Demo Moment

Starting state: exact BTCUSDT action is initially `ELIGIBLE` under sealed policy; receipt v2 visibly binds policy + T0 snapshot + exact action.

Judge action: click `Replay proof`.

Observable change:
- current T1 spread/movement/depth checks remain PASS;
- exact action hash remains MATCH;
- drift animates from `0` through the `20 bps` boundary to `35.47 bps`;
- execution state becomes `NO LONGER VALID` / `REPLAN_REQUIRED`.

Proof: controlled deterministic fixture + same core revalidation engine used by tests.

Secondary red-team proof: `$50 → $75` action mutation remains inside `$100` policy cap but fails `action_hash_match`.

Time budget: core story under 60 seconds; technical appendix optional.

Reset/replay: explicit Reset + replay.

## 9. Functional requirements

### MUST

- MUST-01 — Policy must be sealed before market-state eligibility evaluation.
- MUST-02 — Receipt v2 must bind exact policy, exact T0 snapshot identity **and exact normalized T0 action identity**.
- MUST-03 — Receipt integrity must be independently verifiable.
- MUST-04 — Revalidation must check freshness and current market-state invariants.
- MUST-05 — Revalidation must require exact action hash identity in addition to symbol/side/notional policy compliance.
- MUST-06 — Any failed required invariant must return `BLOCK` / `NO LONGER VALID`.
- MUST-07 — BLOCK must emit `REPLAN_REQUIRED`; policy/action cannot be silently weakened or mutated inside the same cycle.
- MUST-08 — Controlled replay must be clearly labeled synthetic/controlled.
- MUST-09 — Live Binance proof must remain read-only and truthfully labeled.
- MUST-10 — Judge-facing Challenge Suite must expose multiple failure classes and a clean ALLOW case, including a within-policy exact-action mutation.
- MUST-11 — Local MCP companion must expose the decision-contract lifecycle without any financial write capability or duplicate Binance market client.
- MUST-12 — No production/profitability/safety-outcome overclaim.

### SHOULD

- SHOULD-01 — Surface exact failed invariant and threshold.
- SHOULD-02 — Preserve accessible reduced-motion behavior.
- SHOULD-03 — Make Agent OS role and Valid Until MCP role legible within first judge interaction.
- SHOULD-04 — Preserve evidence pointers to CI/live artifacts.
- SHOULD-05 — Surface policy/T0/action as one contract without turning cryptography into the product headline.

### MAY

- MAY-01 — Add future policy schema extensions for exposure, order type or strategy-specific context after PRD change control.
- MAY-02 — Add future human approval gateway only as a separately scoped evolution.
- MAY-03 — Add production decision-store/persistence only after a separate production-readiness change request.

### MUST_NOT

- MUST_NOT-01 — Place a live order in the current submission.
- MUST_NOT-02 — Request or store account secrets for public-market proof.
- MUST_NOT-03 — Let model prose override deterministic BLOCK.
- MUST_NOT-04 — Treat signature validity as proof that current state/action remains valid.
- MUST_NOT-05 — Treat CI/demo/live read-only proof as production evidence.
- MUST_NOT-06 — Add x402, Agentic Wallet writes, funding or trading merely for sponsor-feature breadth.

## 10. Non-functional requirements

- Reliability: deterministic checks produce reproducible terminal states for controlled fixtures.
- Reproducibility: CI must run core invariants + Challenge Suite + MCP smoke and rebuild judge data.
- Safety: fail closed on missing/malformed required evidence and unknown decision IDs.
- Privacy/secrets: no secrets required for submitted live path or MCP companion.
- Accessibility: responsive layout and `prefers-reduced-motion` support.
- Explainability: show failed invariant without requiring judge to inspect logs.
- Composability: host agent can call the narrow stdio MCP contract while Binance Agent OS remains the Binance capability provider.

## 11. Success metrics

Primary project metrics:

`CHALLENGE_SUITE_EXPECTED_TERMINAL_STATE_ACCURACY = 6/6 on canonical cases`

`MCP_CONTRACT_SMOKE_AND_ENFORCEMENT = 5/5`

Supporting metrics:
- core invariants: `8/8 PASS`;
- within-policy action mutation: `action_notional_usdt PASS + action_hash_match FAIL + BLOCK`;
- live Binance read-only capture path: successful public-market-data proof;
- hero negative path: `CURRENT CHECKS PASS + EXACT ACTION MATCH + 35.47 bps > 20 bps → BLOCK / REPLAN_REQUIRED`;
- judge core mechanism visible within one interaction.

Proof classes:
- TECHNICAL_PROOF: required and obtained for core/MCP deterministic paths.
- BEHAVIOR_PROOF: prior deployed judge path obtained; fresh post-v0.2 TRACE delta required.
- OUTCOME_PROOF: not required / not obtained.
- PRODUCTION_EVIDENCE: not required / not obtained.

## 12. Acceptance criteria

Build candidate may proceed toward terminal assurance only when:
- all v0.2 MUST requirements are reconciled to current build/evidence;
- lifecycle coverage has no hidden omission;
- Winning Intelligence 003 change request is implemented and final recheck resolved;
- TRACE design/experience delta is resolved on the deployed v0.2 judge path;
- Vercel `/` and `/evaluations` are smoke-tested desktop/mobile/reduced-motion;
- claims remain within obtained proof classes;
- Project Finisher performs independent terminal assurance.

## 13. Evidence plan

| Claim | Proof class | Evidence |
|---|---|---|
| deterministic boundary catches canonical failures | TECHNICAL_PROOF | `tests/run.mjs`, Challenge Suite CI |
| exact T0 action cannot silently mutate inside policy | TECHNICAL_PROOF | receipt v2 + EVAL-06 + `tests/run.mjs` |
| action contract is callable by an agent host | TECHNICAL_PROOF | `src/mcp-server.mjs`, `tests/mcp-smoke.mjs` |
| controlled cross-time state drift becomes invalid while current checks pass | TECHNICAL_PROOF | `npm run demo`, `/` replay |
| official Binance path works read-only | TECHNICAL_PROOF | existing Binance CLI Actions evidence; fresh v2 capture when rerun |
| judge can understand/operate v0.2 experience | BEHAVIOR_PROOF | fresh deployed TRACE delta runtime smoke required |
| product reduces losses / improves ROI | OUTCOME_PROOF | NOT CLAIMED |
| production-ready agent control | PRODUCTION_EVIDENCE | NOT CLAIMED |

## 14. Constraints

Deadline: `2026-09-08T23:59:00Z`.

Platform: Binance Agent OS / Binance Skills + public GitHub + video/demo submission.

Safety: read-only market data; no funding/trading/geographic circumvention.

Time pressure does not waive lifecycle gates; unresolved gates must remain visible.

## 15. Authority / protected actions

Permitted: repository build/test, local MCP decision-contract testing, public market-data proof, preview/deployment preparation.

Protected: X submission, official survey, any future trade/account/funding/payment action.

## 16. Killing assumptions

- A-01 — reusable execution validity is valuable beyond bespoke scripts. `HYPOTHESIS`.
- A-02 — agent interpretation adds value over fully deterministic automation for target workflows. `PARTIALLY_SUPPORTED / UNVERIFIED_OUTCOME`.
- A-03 — v0.2 Agent OS + skill + MCP composition is sufficiently native/legible for Track A judges. `TO_BE_RECHECKED_BY_WINNING_INTELLIGENCE + TRACE`.
- A-04 — action-bound cross-time validity remains distinguishable from current-state preflight/reasoning verification under final same-event corpus. `TO_BE_FINAL_RECHECKED`.

## 17. Risks / failure modes

- R-01 — project perceived as “20-line price checker”. Mitigation: exact-action receipt v2 + cross-time counterfactual + multi-failure Challenge Suite.
- R-02 — project perceived as generic preflight. Mitigation: show all current checks PASS + exact action MATCH + old premise FAIL.
- R-03 — Agent OS integration perceived as superficial. Mitigation: official Binance observation path + portable skill + real narrow MCP contract surface.
- R-04 — MCP perceived as integration-count optics. Mitigation: MCP exposes only the unique validity contract; no duplicate Binance tools.
- R-05 — UI becomes generic AI/crypto dashboard. Mitigation: TRACE uniqueness/anti-slop review.
- R-06 — controlled replay confused with live data. Mitigation: explicit labels and separate live proof.
- R-07 — deadline pressure causes skipped lifecycle gates. Mitigation: lifecycle coverage policy and terminal blockers.

## 18. Dependencies

- Binance Agent OS / Binance Skills Hub / `binance-cli`.
- Node.js stdio MCP companion implemented locally without third-party runtime dependency.
- GitHub Actions.
- Vercel for judge-facing web preview.
- Faadil Agent System router.
- PBPD living-PRD governance.
- Spec Kit bounded execution artifacts.
- Winning Intelligence pre-submission/collision/creative mechanisms.
- TRACE Design / Experience Assurance.
- Project Finisher terminal assurance.
- Human final submission authority.

## 19. Open questions

- Q1 — Does deployed v0.2 communicate cross-time + exact-action distinction in <15 seconds?
- Q2 — Does the MCP companion strengthen sponsor/agent-native perception without making the product feel infrastructural or overbuilt?
- Q3 — Does TRACE find any distinctiveness, hierarchy, mobile or reduced-motion blocker after the receipt-v2 UI delta?
- Q4 — Does Project Finisher consider the submission package complete without production evidence if limitations remain explicit?

## 20. Completion / submission boundary

PBPD terminal ceiling: `BUILD_CANDIDATE_READY` or `BUILD_CANDIDATE_READY_WITH_LIMITATIONS`.

Project completion cannot be emitted by PBPD, TRACE, Winning Intelligence, Spec Kit or CI.

Project Finisher must issue terminal assurance before human submission.

Human owns X publication, survey submission and any other protected external action.

## 21. Hackathon additions

Official public entry requirements include Track A agent built with Agent OS, video/demo + GitHub if applicable, follow/repost, reply/quote with submission, and survey before the published deadline. Detailed public scoring dimensions were not found on the official blog and must not be invented.

Judge journey target after v0.2:

```text
0-5s: understand “Reasoning is not authorization / A correct decision can expire”
5-15s: see Agent OS + exact action-bound decision contract
15-42s: trigger hero replay: current checks PASS + action MATCH + premise EXPIRED → NO LONGER VALID / REPLAN_REQUIRED
42-52s: see 6-case red-team including within-policy action mutation
52-60s: see live Binance authenticity + portable skill/MCP composability without implying trading
```

## 22. Version / scope-change history

| Version | Date | Change | Reason |
|---|---|---|---|
| 0.1-retrospective | 2026-09-08 | Reconstructed current-state PRD after build had begun | Lifecycle completeness repair; future product-source baseline |
| **0.2** | 2026-09-08 | Receipt v2 exact-action binding + explicit `REPLAN_REQUIRED` + narrow Valid Until MCP companion | Winning Intelligence 003 discovered a real mismatch between “exact action” claim and old receipt, plus a material agent-native callable-interface gap |

Known material evolution before the original PRD baseline:
- `DriftGate` → `Valid Until` naming/positioning change;
- stale-price checker framing → broader execution-validity primitive;
- one hero failure → six-case evaluation suite;
- static proof page → interactive judge instrument;
- signature/receipt headline → supporting evidence layer;
- trust model expanded to control → red-team → evaluation → evidence → trust.

Version 0.2 is **not** retrospective: it was triggered by a documented current competition/collision rerun and was routed through `product/CHANGE-REQUEST-WI-003.md`.

Future material changes require another PRD version increment and reconciliation before implementation continues.

---

## Current declaration

`PRD_STATUS = ACTIVE_EVOLVING_PRD_V0_2`

Version 0.2 is the authoritative product source for the remaining work: Spec Kit delta reconciliation, CI/live/deployment evidence, Winning Intelligence final recheck, TRACE delta + final film, PBPD candidate handoff and Project Finisher. It does not retroactively erase the historical pre-build omission.
