# Valid Until — Winning Intelligence Pre-Submission Assessment

Schema: `1.1`
Date: `2026-09-08`
Capability owner: `Hackathon Opportunity Intelligence / Winning Intelligence`
Authority: `NONE`
Submission authority: `OUT_OF_SCOPE`

This assessment applies the canonical four v1.1 checks to the **current concrete package**. It does not authorize or block submission and does not predict winning.

## 1. SPONSOR_NATIVE_NECESSITY_CHECK

Status: `PARTIAL`

Evidence:
- Track A officially asks builders to build an AI agent with Agent OS.
- `SKILL.md` defines the agent operating contract.
- live read-only proof uses the official Binance CLI / Binance Skills path against real BTCUSDT public data.
- Agent OS provides the relevant observation/tool environment at the reasoning→action boundary.

Why not `SUPPORTED` yet:
- the core execution-validity primitive is intentionally generalizable and could exist outside Binance;
- the current submission has no live execution adapter and therefore must make the Agent OS necessity legible through the **agent + Binance observation + deterministic authorization workflow**, not by claiming the generic validity concept itself requires Binance.

Repair target:
- first 15 seconds of the deployed/demo judge path must make clear what Agent OS supplies and what Valid Until adds.

## 2. WHOLE_RUBRIC_COVERAGE_CHECK

Status: `PARTIAL`

Current official public qualification/deliverable coverage:
- Track A project: covered.
- Agent OS / Binance tool use: covered with skill + live CLI proof.
- video/demo: planned, not yet recorded.
- public GitHub: covered.
- follow/repost + reply/quote submission: protected human actions, not yet recorded complete.
- official survey: protected human action, not yet complete.
- published deadline: recorded.

Important unknown:
- the official public blog used for current validation does not expose a detailed numeric judging rubric. No hidden scoring dimensions are invented.

Evidence surfaces already present:
- problem: `evidence/problem-discovery/COUNCIL.md` + PRD claim boundaries;
- mechanism: hero replay + source/tests;
- Agent OS authenticity: live CLI run `34225133745`;
- failure robustness: Challenge Suite 6/6;
- reproducibility: GitHub CI;
- limitations: README + PRD.

Repair target:
- record the final video/demo and human submission deliverables;
- preserve unknown scoring dimensions as `UNKNOWN` rather than implying full rubric coverage.

## 3. NARRATIVE_AND_DEMO_LEGIBILITY_CHECK

Status: `SUPPORTED_AT_STATIC_PACKAGE / RUNTIME_PENDING`

Current narrative:

`Reasoning is not authorization.`

Current visible mechanism:

`initially eligible → validity window → state/action revalidation → NO LONGER VALID`

Current differentiation line:

`Most agents ask: Should I trade? Valid Until asks: Is this exact action still valid?`

Why supported at package level:
- hero interaction is a single visible failure path;
- exact threshold crossing is shown (`20 bps` → `35.47 bps`);
- controlled replay and live Binance proof are separated;
- Challenge Suite turns the mechanism into repeatable evidence.

Remaining risk:
- no deployed-browser evidence yet; static source clarity is not the same as judge-path clarity.

## 4. JUDGE_PATH_LEGIBILITY_CHECK

Status: `UNKNOWN / ATTENTION_REQUIRED`

Current expected path:
- first 5s: thesis visible;
- first 15s: Agent OS role + exact action-validity distinction;
- signature action: `Replay proof`;
- action→visible consequence: drift crosses threshold → `NO LONGER VALID`;
- evaluation surface: `/evaluations`;
- failure state: explicit and truthful;
- live-vs-controlled distinction: explicit.

Critical gaps currently open:
- `DEPLOYED_BROWSER_PATH_NOT_YET_VERIFIED`;
- `MOBILE_PATH_NOT_YET_VERIFIED`;
- `REDUCED_MOTION_RUNTIME_NOT_YET_VERIFIED`;
- `FINAL_VIDEO_PATH_NOT_YET_REVIEWED`.

These gaps cannot be averaged away by the strong technical evidence.

## Assessment result

`CLOSE_PRE_SUBMISSION_HEURISTIC_GAPS__NORMAL_SUBMISSION_AUTHORITY_UNCHANGED`

### Why

The project has a strong, differentiated mechanism and unusually strong negative-path evidence, but sponsor-native necessity is only **partially legible** until the judge sees the Agent OS contribution clearly, and judge-path runtime evidence does not yet exist.

## Exact handoff

`Winning Intelligence → TRACE / PBPD deployment evidence`

Required output:
- deployed judge-path review;
- Agent OS role legible in first 15 seconds;
- mobile/reduced-motion/runtime evidence;
- final demo review;
- then rerun this assessment before Project Finisher terminal assurance.

No Winning Law is promoted. No submission authority is granted.
