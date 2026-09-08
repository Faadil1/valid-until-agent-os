# Valid Until — Winner Intelligence Rerun 002

Date: 2026-09-08
Owner: Hackathon Opportunity Intelligence / Winner Intelligence
Schema intent: v1.2 creative + v1.1 judge-path + same-event collision
Authority: NONE
Build authority: NONE
Submission authority: NONE
Reason for rerun: human explicitly requested a new hidden-gap / winner / current-submission pass before final video freeze.

## Executive verdict

The current product is **not ready to freeze into the final video yet**.

The underlying problem and engine remain worth preserving, but the public package currently under-surfaces its strongest differentiator and under-packages its Agent OS skill integration.

The rerun does **not** recommend a pivot. It recommends a bounded sharpening cycle.

```text
PROBLEM = KEEP
CORE_ENGINE = KEEP
ART_DIRECTION = KEEP
FAILURE_HERO = KEEP
GENERIC_PRE_EXECUTION_LANGUAGE = NARROW
CURRENT_STATE_ONLY_PREFLIGHT_POSITIONING = REJECT
CROSS_TIME_PREMISE_VALIDITY = PROMOTE_AS_SIGNATURE
PORTABLE_AGENT_SKILL_PACKAGING = REQUIRED
FINAL_VIDEO_FREEZE = PAUSED
```

## 1. Same-event collision result

See `evidence/competition/CURRENT-SUBMISSIONS-2026-09-08.md`.

The most material collisions are:

- **Trade Preflight Agent** — deterministic preflight, live order-book checks, hard limits, short-lived execution ticket and final refresh before MCP order;
- **DriftMate** — deterministic execution control with on-chain permission/budget enforcement;
- **Proof Before Trade** — technical/evidence depth and local MCP composability;
- **ThoughtProof Sentinel** (adjacent Binance Skills Hub PR) — explicit pre-execution reasoning verification.

Therefore “we add deterministic checks before execution” is no longer distinctive enough.

## 2. What Valid Until uniquely proves today

The current fixture contains a stronger counterfactual than the current UI communicates:

```text
T1 CURRENT-STATE CHECKS = PASS
receipt integrity = PASS
policy identity = PASS
freshness = PASS
spread = PASS
depth = PASS
1m movement = PASS

BUT
T0→T1 mid drift = 35.47 bps > 20 bps

RESULT = BLOCK
```

This means the product can block a previously valid action even when a current-state-only preflight still sees acceptable conditions.

That is the signature mechanism.

### Winner-memory sentence

**A correct decision can expire.**

This is a memory hook, not a replacement for the canonical thesis `Reasoning is not authorization.`

## 3. Winner-mechanism transfer — guarded, anti-copy

The existing Winner Mechanism Library contains verified winner abstractions. No causal winning law is inferred and no visual/product surface is copied.

### WM-001 — 0x2FA: hidden-state necessity

Transfer:

`hidden state → reveal the one condition that changes the outcome → necessity becomes obvious`

Application to Valid Until:

The hidden differentiator is not another risk check. Reveal that **all current checks are still green** while the decision premise has expired relative to T0.

Desired judge reaction:

> “Oh — the market can look acceptable now and the old decision can still be invalid.”

### WM-002 — CarteZcash: sponsor-native constraint inversion

Transfer:

`hard constraint → sponsor-native environment → previously awkward capability becomes natural`

Application:

Agent OS gives agents fresh Binance capabilities. That creates the exact new boundary Valid Until addresses: **capability availability is not persistent authorization for a specific old decision**.

Do not claim Binance creates the risk; show that Agent OS makes this execution-integrity layer naturally useful.

### WM-007 — PIVY: deep primitive → direct product promise

Transfer:

`technical primitive → one user-facing promise → one-step proof`

Application:

Technical primitive: state-bound short-lived decision receipt + cross-time revalidation.

User-facing promise:

> **A correct decision can expire.**

One-step proof: click Replay → current checks remain acceptable → premise drift crosses the original bound → `NO LONGER VALID`.

### WM-006 — House Protocol: own the failure boundary

Transfer:

`dependency/uncertainty → own critical boundary → resilience becomes visible`

Application:

Do not rely on the LLM to notice its own stale reasoning. The deterministic layer owns the exact transition from old premise to fresh state.

## 4. Five-lane creative divergence

This rerun uses the canonical v1.2 creative lanes to test whether a materially better product presentation exists. These are **concept probes**, not five implementations.

| Lane | Concept | Judge memory | Verdict |
|---|---|---|---|
| CHALLENGE_GAME | “Can the action survive the clock?” — judge watches validity race state drift | The trade lost its right to exist | HOLD — risks gamification / crypto gimmick |
| REVEAL_MYSTERY | Everything at T1 is green, then reveal the one cross-time invariant that invalidates the action | A correct decision can expire | **PROMOTE MECHANISM** |
| TRANSFORMATION | Same exact action card physically changes from `JUSTIFIED` to `ORPHANED FROM PREMISE` | Permission stayed; premise moved | PROMOTE AS SUPPORTING VISUAL |
| FAILURE_FORENSIC | Flight-recorder timeline reconstructs T0→T1 and identifies the exact invariant that broke | The failure explains itself | KEEP FOR `/evaluations`, not hero expansion |
| CREATION_TOOL | Let user author custom validity contracts interactively | Every agent gets an expiry contract | REJECT FOR THIS DEADLINE — new product scope |

Winning Intelligence selects **REVEAL_MYSTERY + bounded TRANSFORMATION** as the creative transfer. This is not a new product; it makes the existing proof legible.

## 5. Hidden integration audit

### GAP WI-002-01 — portable skill packaging

Status: **OPEN / HIGH VALUE**

Observed:
- repository has a root `SKILL.md`;
- official Skills Hub convention is a named skill folder containing `SKILL.md`;
- strong competitors expose portable installable skills.

Repair:

```text
skills/valid-until/SKILL.md
```

and a documented install path such as:

```text
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

This must not add wallet/trading authority.

### GAP WI-002-02 — Track A “agent” legibility

Status: **OPEN / HIGH VALUE**

Risk:
A judge can currently interpret the repository as excellent middleware rather than an AI-agent workflow.

Repair:
- add a top-level `AGENTS.md` / agent protocol showing the host agent's responsibilities;
- make the skill install/invocation path explicit;
- keep AI as interpreter/proposer and deterministic engine as authority;
- do not add a second LLM risk judge.

This is packaging/orchestration clarity, not a claim of autonomous live trading.

### GAP WI-002-03 — category differentiation is present in logic but not fully surfaced

Status: **OPEN / CRITICAL FOR PODIUM ASPIRATION**

Current copy compares mainly against “Should I trade?” agents.

Repair the judge-facing category map:

```text
Reasoning verifier → Was the model right?
Current-state preflight → Is the action acceptable now?
Permission layer → May the agent use the capability?
Valid Until → Is the exact old action still justified by the world that produced it?
```

Do not name competitors on the product UI.

### GAP WI-002-04 — counterfactual proof is buried

Status: **OPEN / CRITICAL**

The strongest technical distinction already exists in `demo.json`, but judges must infer it.

Repair:
- visibly show `CURRENT CHECKS: PASS` while `T0→T1 PREMISE DRIFT: FAIL`;
- preserve `NO LONGER VALID` as the terminal state;
- phrase the lesson as **“Fresh does not mean same premise.”**

### GAP WI-002-05 — integration breadth temptation

Status: **CLOSED BY REJECTION**

Do **not** add:
- x402;
- Agentic Wallet writes;
- live order placement;
- DeFi workflows;
- a local MCP server merely to match competitors;
- more market indicators;
- prompt-injection scoring.

Keel, DriftMate, Proof Before Trade and others already make breadth crowded. More integrations would dilute the product and add eligibility/safety/reliability risk.

### GAP WI-002-06 — outcome-proof asymmetry vs ThoughtProof

Status: **LIMITATION / DO NOT FAKE REPAIR**

ThoughtProof publicly claims real-money experimental evidence. Valid Until has no production/outcome proof and must not manufacture one under deadline.

Response:
- compete on mechanism clarity, deterministic reproducibility, truthful evidence classes and sponsor-native composability;
- do not claim reduced losses or production safety.

## 6. Evidence exists vs evidence surfaced

| Evidence | Exists | Surfaced to judge | Action |
|---|---|---|---|
| 7/7 deterministic core | YES | indirectly | no hero expansion |
| 6/6 red-team suite | YES | YES via `/evaluations` | keep |
| real Binance CLI read-only proof | YES | YES | keep separated from fixture |
| current T1 checks all acceptable except cross-time drift | **YES** | **NO / buried** | **surface prominently** |
| portable installable skill | NO | NO | **build** |
| agent host protocol | partial in docs | weak | **make explicit** |
| TRACE desktop/mobile/reduced-motion | YES | not needed in hero | keep as assurance evidence |
| outcome/prod proof | NO | correctly not claimed | keep limitation |

## 7. Podium-oriented change set

Only the following changes are recommended before video freeze:

1. **Signature proof:** current-state checks remain green while cross-time premise expires.
2. **Memory sentence:** `A correct decision can expire.`
3. **Category map:** reasoning verification vs current preflight vs permissions vs Valid Until.
4. **Portable Agent Skill:** standard `skills/valid-until/SKILL.md` packaging + install command.
5. **Agent protocol:** explicit host-agent orchestration file, proving Track A agent shape without moving financial authority into the model.
6. **Re-run CI/Vercel/TRACE** because the judge-facing experience changes.

Everything else is rejected for scope discipline.

## 8. Prize targeting

No win probability is assigned.

Current assessment:

- **Top-50 competitiveness:** already strong.
- **Top-3 distinctiveness:** plausible only if the cross-time counterfactual becomes unmistakable and the Agent OS agent packaging is made first-class.
- **1st-place aspiration:** requires judges to remember one mechanism rather than a list of features.

The intended 24-hour memory is:

> **Valid Until was the one where every current risk check stayed green, but the old decision still expired because the world moved away from its original premise.**

## 9. Rerun verdict

```text
WINNING_INTELLIGENCE_RERUN = BOUNDED_REWORK_REQUIRED
PIVOT = NO
TRACE_6_75_VIDEO_FREEZE = PAUSED
PBPD_REWORK_AUTHORITY = HUMAN_CONTINUATION_AUTHORIZATION_ALREADY_PRESENT
REQUIRED_NEXT = COLLISION_BOUNDED_CHANGE_REQUEST → PBPD IMPLEMENTATION → CI → DEPLOY → TRACE RECHECK
```

Winner Intelligence does not authorize submission and does not declare the project complete.
