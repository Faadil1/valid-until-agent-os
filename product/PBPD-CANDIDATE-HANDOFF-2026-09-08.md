# Valid Until — PBPD Candidate Handoff

Date: 2026-09-08  
From: **PBPD**  
To: **Project Finisher**  
Trigger: **BUILD_CANDIDATE_READY**  
Submission authority: **human protected action**

## PBPD verdict

**BUILD_CANDIDATE_READY**

Product scope, runtime evidence, judge surface, final positioning and final evidence film are reconciled. TRACE Gate 6.75 is PASS and the human accepted the final narrative voice. No further product, visual, voice, sponsor-breadth or trading-proof work is recommended before terminal assurance.

## Canonical project state

- repository: `Faadil1/valid-until-agent-os`
- branch: `main`
- living PRD: v0.4, runtime reconciled
- canonical thesis: **Reasoning is not authorization.**
- memory line: **A correct decision can expire.**
- category: **action-bound decision contract across time**
- primary judge URL: `https://valid-until-agent-os-plum.vercel.app`
- Cloudflare mirror: `https://valid-until-agent-os.pages.dev`

## Build identity

- B+C evaluator-facing visual delta: verified and TRACE-passed
- historical authenticated Spot Testnet proof commit: `21ab8508e078595fa964c73521bb7f78c2f2a37a`
- final film run: `34284794981`
- final film artifact: `10079108948`
- final film artifact ZIP digest: `sha256:37b36cb284e80659dabdaea51982bcc0e6aacc435e1ac7f7acb61f99f8ee6f8d`
- final extracted MP4 SHA-256: `062583713a1c8cb2184b4fd69dc40ff98a079e50b24894ca5ffb98ec6dde0838`
- final film: 62.0s, 1920x1080, 30fps, H.264 + AAC

## Verification evidence

### Technical proof
- deterministic core tests: PASS
- challenge suite: 6/6 PASS
- MCP / observation / execution-boundary tests: PASS
- Cloudflare Pages Functions boundary tests: PASS
- Vercel proof API tests: PASS
- CI histories recorded in canonical state

### Behavior proof
- controlled hero replay: current checks `PASS 4/4`
- exact action: `MATCH`
- T0→T1 premise drift: `35.47 > 20 bps`
- terminal: `NO LONGER VALID → REPLAN_REQUIRED`
- exact-action mutation inside policy cap is independently blocked by action identity

### Authentic non-production execution evidence
- venue: official Binance Spot Testnet
- action: BUY BTCUSDT, 10 test USDT
- orderId: `13634770`
- clientOrderId: `vu-mtswxiik-ecb6b093`
- status: `FILLED`
- same order queried back and verified
- production: false
- real funds: false
- canonical public proof: `web/live-testnet-proof.json`
- evidence note: `evidence/live-testnet/ATTEMPT-004-LOCAL-ALLOW-ORDER-VERIFIED-PUBLISHED.md`

### Evaluator-facing proof
- TRACE v0.4 delta: PASS desktop/mobile × normal/reduced-motion 4/4
- TRACE Gate 6.75 final closeout: PASS
- final narrative voice: human ACCEPTED
- Winner Intelligence final-film heuristic: PASS_WITH_FREEZE

## Deployment / demo artifacts

- primary judge surface: `https://valid-until-agent-os-plum.vercel.app`
- Cloudflare mirror: `https://valid-until-agent-os.pages.dev`
- routes: `/`, `/lab`, `/evaluations`, `/live-proof`
- Cloudflare fixed known-order signed GET: `LIVE_SIGNED_READ_VERIFIED`
- Vercel venue access: fail-closed where venue eligibility is unavailable
- no public unrestricted financial write route

## Claims → evidence map

| Claim | Evidence |
|---|---|
| Reasoning is not authorization | deterministic boundary + agent/Valid Until split |
| A correct decision can expire | controlled T0→T1 replay |
| Current checks can pass while old decision fails | `PASS 4/4` + `MATCH` + `FAIL 35.47 > 20 BPS` |
| Exact old action is bound to the decision | receipt v2 exact action hash |
| Failures terminate in replan | challenge suite + execution-boundary tests |
| Binance Agent OS is materially used | `AGENTS.md`, portable skill, MCP composition, Binance observation surface |
| One authentic Binance execution boundary was crossed | historical authenticated Spot Testnet order 13634770 |
| Demo does not place a new order | controlled replay + fixed signed GET only |

## Product reality status

The product demonstrates a real control problem: an agent may retain capability after the exact premise that justified an old decision has moved out of bounds. The prototype intentionally proves the control primitive rather than claiming trading alpha or financial outcomes.

Simpler alternatives considered and rejected as category substitutes include current-state preflight, static permission caps, limit/stop instructions and a second risk LLM. Individual checks are simple by design; the differentiated primitive is the sealed action-decision relationship across time.

## Proof classes actually obtained

- `TECHNICAL_PROOF`: **YES**
- `BEHAVIOR_PROOF`: **YES**
- `OUTCOME_PROOF`: **NO — not claimed**
- `PRODUCTION_EVIDENCE`: **NO — not claimed; Spot Testnet is explicitly non-production**

No demo/CI/Testnet evidence is reclassified as production evidence.

## Primary outcome / baseline

No profitability, ROI, reduced-loss or production-performance outcome is claimed. Therefore no financial outcome baseline is used as a submission claim. The measured product outcome is control behavior: deterministic ALLOW/BLOCK correctness on the specified scenario suite and exact-action/cross-time invariants.

## Human judgment / authority boundary

- AI agent interprets intent and proposes an exact action.
- Valid Until deterministically revalidates; the model cannot self-authorize.
- Historical write proof required explicit human authorization.
- Successful Spot Testnet order must not be rerun without new explicit authorization.
- Official submission remains a protected human action.

## Known limitations / unresolved production gaps

- no mainnet execution claim
- no real-money proof
- no profitability or alpha claim
- no reduced-loss claim
- no production reliability / long-duration operations proof
- no audited security claim
- no production persistence/operator-threshold program proven
- Vercel may fail closed on Binance venue eligibility from its cloud location
- Cloudflare signed known-order read is read-only evidence, not a new execution

These are explicit limitations, not hidden terminal gaps for this hackathon submission.

## Submission requirements packet

Prepared candidate package must contain at minimum:
- project name + concise description
- Track A designation
- public GitHub repository
- stable demo URL
- final 62-second video
- explicit non-production/Testnet truth boundary
- judge-ready Q&A / differentiation notes

Final form entry and Submit action are reserved to the human.

## Agent Advantage Report

`NOT_REQUIRED_WITH_REASON`: the submission does not make a comparative AI-performance, ROI or model-superiority claim requiring paired-task Agent Advantage evidence. The agent role is architectural—interpret/propose—while deterministic authorization remains outside the LLM.

## Handoff

```text
PBPD = BUILD_CANDIDATE_READY
TRACE_GATE_6_75 = PASS
WINNER_INTELLIGENCE_FINAL_FILM = PASS_WITH_FREEZE
NEXT_OWNER = PROJECT_FINISHER
PROTECTED_FINAL_SUBMISSION = HUMAN
```
