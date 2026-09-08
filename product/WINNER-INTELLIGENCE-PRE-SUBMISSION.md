# Valid Until — Winning Intelligence Pre-Submission Assessment

Schema: `1.1`
Date: `2026-09-08`
Capability owner: `Hackathon Opportunity Intelligence / Winning Intelligence`
Authority: `NONE`
Submission authority: `OUT_OF_SCOPE`
Recheck basis: deployed production + TRACE Gate 6.5 runtime evidence

This assessment applies the canonical four v1.1 checks to the **current concrete package**. It does not authorize or block submission and does not predict winning.

## Runtime evidence used by this recheck

Production:

`https://valid-until-agent-os.vercel.app`

Verified:
- `/` → HTTP 200;
- `/evaluations` → HTTP 200;
- `/demo.json` → HTTP 200;
- `/challenges.json` → HTTP 200 with `6/6` deterministic expected terminal states;
- TRACE Gate 6.5 Playwright run `34231934516` → SUCCESS;
- TRACE runtime artifact `10058192480`;
- artifact digest `sha256:4f0ba722100568c2a320ade6eda2ce3ba81e4040026c1c946ee71ccc661b66f1`;
- desktop 1440×900 normal motion → PASS;
- mobile 390×844 normal motion → PASS;
- desktop reduced-motion → PASS;
- mobile reduced-motion → PASS;
- zero browser console errors in the four canonical runtime cases.

## 1. SPONSOR_NATIVE_NECESSITY_CHECK

Status: `SUPPORTED`

Evidence:
- Track A is an Agent OS project surface.
- `SKILL.md` defines the agent contract and explicitly separates agent planning from deterministic authorization.
- the deployed first-screen architecture states that the **AI agent interprets/proposes**, **Binance Agent OS supplies fresh observations/capabilities**, and **Valid Until authorizes the exact action deterministically**;
- live read-only proof uses the official Binance CLI / Binance Skills path against real BTCUSDT public data;
- removing the Binance observation/tool boundary would remove the current product's live Binance state-validation capability and its sponsor-native evidence path, even though the underlying validity pattern is intentionally generalizable.

Important bounded interpretation:
- Valid Until does **not** claim the abstract execution-validity concept only works on Binance;
- sponsor-native necessity is satisfied for this concrete Track A implementation because Binance Agent OS is load-bearing for the fresh Binance observation/capability layer and live evidence boundary.

## 2. WHOLE_RUBRIC_COVERAGE_CHECK

Status: `PARTIAL`

Current official public qualification/deliverable coverage:
- Track A project: covered;
- Agent OS / Binance tool use: covered with skill + deployed architecture + live CLI proof;
- public GitHub: covered;
- working deployed judge surface: covered;
- video/demo: **contract ready, final recording not yet produced/reviewed**;
- follow/repost + reply/quote submission: protected human actions, not yet recorded complete;
- official survey: protected human action, not yet complete;
- published deadline: recorded.

Important unknown:
- the official public source used for current validation does not expose a detailed numeric judging rubric. No hidden scoring dimensions are invented.

Evidence surfaces now present:
- problem: `evidence/problem-discovery/COUNCIL.md` + PRD claim boundaries;
- mechanism: deployed hero replay + source/tests;
- Agent OS authenticity: live CLI run `34225133745`;
- failure robustness: deployed Challenge Suite `6/6`;
- reproducibility: GitHub CI + TRACE runtime capture;
- limitations: README + PRD;
- evaluator experience: TRACE Gate 6.5 PASS.

Remaining repair target:
- record/review final video;
- complete protected human submission deliverables;
- preserve unknown scoring dimensions as `UNKNOWN` rather than implying full rubric coverage.

## 3. NARRATIVE_AND_DEMO_LEGIBILITY_CHECK

Status: `SUPPORTED_RUNTIME__FINAL_VIDEO_PENDING`

Current narrative:

`Reasoning is not authorization.`

Current visible mechanism:

`initially eligible → validity window → fresh state/action revalidation → 35.47 bps > 20 bps → NO LONGER VALID`

Current differentiation line:

`Most agents ask: Should I trade? Valid Until asks: Is this exact action still valid?`

Why runtime support is now strong:
- thesis is visible on desktop/mobile;
- Agent OS role is visible in the first judge surface;
- signature action `Replay proof` is visible;
- exact threshold crossing is shown (`20 bps` → `35.47 bps`);
- terminal state `NO LONGER VALID` is reached in all four runtime contexts;
- controlled replay and live Binance proof remain visually separated;
- `6-case red team` is reachable from the hero and exposes `6/6` exact terminal-state evidence;
- TRACE's visual review found the editorial execution-instrument identity legible and non-generic.

Remaining risk:
- the final **encoded video** can still damage readability or truthfulness if edited poorly. That belongs to TRACE Gate 6.75 and cannot be inferred from the site runtime PASS.

## 4. JUDGE_PATH_LEGIBILITY_CHECK

Status: `SUPPORTED_RUNTIME__FINAL_VIDEO_PENDING`

Verified deployed path:
- first 5s thesis surface: `SUPPORTED`;
- first ~15s Agent OS role surface: `SUPPORTED`;
- signature action: `Replay proof` → `SUPPORTED`;
- action→visible consequence: drift crosses threshold → `NO LONGER VALID` → `SUPPORTED`;
- evaluation surface `/evaluations`: `SUPPORTED`;
- failure state truthfulness: `SUPPORTED`;
- live-vs-controlled distinction: `SUPPORTED`;
- mobile path: `SUPPORTED`;
- reduced-motion path: `SUPPORTED`.

Previous critical gaps closed:
- `DEPLOYED_BROWSER_PATH_NOT_YET_VERIFIED` → CLOSED;
- `MOBILE_PATH_NOT_YET_VERIFIED` → CLOSED;
- `REDUCED_MOTION_RUNTIME_NOT_YET_VERIFIED` → CLOSED.

Critical gap still open:
- `FINAL_VIDEO_PATH_NOT_YET_REVIEWED`.

This remaining gap cannot be averaged away by the runtime/technical PASS.

## Assessment result

`CLOSE_FINAL_VIDEO_AND_PROTECTED_DELIVERABLE_GAPS__NORMAL_SUBMISSION_AUTHORITY_UNCHANGED`

### Why

The deployed product now clears the sponsor-native, runtime narrative and interactive judge-path questions that were previously open. The remaining uncertainty is not the product mechanism or deployed experience; it is the **final evidence film** and protected external submission steps.

## Exact handoff

`Winning Intelligence → TRACE Gate 6.75 / PBPD packaging`

Required output:
- final encoded demo video;
- TRACE Gate 6.75 claim/readability review;
- then PBPD final reconciliation / Project Finisher.

No Winning Law is promoted. No submission authority is granted.
