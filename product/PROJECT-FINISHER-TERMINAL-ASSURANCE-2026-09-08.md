# Valid Until — Project Finisher Terminal Assurance

Date: 2026-09-08  
Owner: **Project Finisher**  
Input: `BUILD_CANDIDATE_READY` from PBPD  
Verdict: **SUBMISSION_READY**  
Protected next action: **human official submission**

## Terminal checks

| Check | Result | Evidence |
|---|---|---|
| Canonical state recoverable | PASS | `state/CURRENT.yaml`, `state/HANDOVER.yaml` |
| Public repository available | PASS | `Faadil1/valid-until-agent-os`, visibility public |
| Living PRD reconciled | PASS | v0.4 runtime reconciliation |
| Core technical verification | PASS | deterministic, challenge, MCP, adapter, boundary, API and Cloudflare tests |
| Evaluator-facing runtime assurance | PASS | TRACE runtime `34274047494`, desktop/mobile × normal/reduced-motion 4/4 |
| TRACE design delta | PASS | B+C direction |
| Winner Intelligence final positioning | PASS_WITH_FREEZE | final WI artifacts |
| Final encoded film exists | PASS | run `34284794981`, artifact `10079108948` |
| Final video metadata | PASS | 62.0s, 1920x1080, 30fps, H.264 + AAC |
| Final video integrity | PASS | MP4 SHA-256 `062583713a1c8cb2184b4fd69dc40ff98a079e50b24894ca5ffb98ec6dde0838` |
| Human visual review | PASS | accepted |
| Human final voice review | PASS | narrative voice v2 accepted |
| TRACE Gate 6.75 | PASS | `GATE_6_75_FINAL_CLOSEOUT_001.md` |
| Judge Q&A aligned | PASS | `docs/JUDGE-MATRIX.md` |
| Claims/evidence alignment | PASS | PBPD candidate handoff + final-film heuristic |
| Submission package assembled | PASS | `docs/FINAL-SUBMISSION-PACKAGE-2026-09-08.md` |
| Submission archive integrity | PASS | ZIP SHA-256 `0f43fe320b4521f840eeac325cdfea19e45a04b1bfd6bc163d148bc8325fd7e3` |
| Protected submission boundary | PASS | no automated final Submit |

## Final package contents verified

```text
README-FIRST.md
SUBMISSION-COPY.md
JUDGE-QA.md
MANIFEST.json
SHA256SUMS.txt
video/Valid-Until-Final-Demo-62s.mp4
screenshots/hero.jpg
screenshots/stage-before.jpg
screenshots/stage-after.jpg
screenshots/evaluations.jpg
screenshots/live-proof.jpg
```

The archive contains the final human-approved film, paste-ready submission copy, judge Q&A, machine-readable manifest, checksums and proof screenshots.

## Demo / runtime assurance

Canonical evaluator-facing runtime was already verified by TRACE after the v0.4 B+C deployment:

- primary judge URL: `https://valid-until-agent-os-plum.vercel.app`
- Cloudflare mirror: `https://valid-until-agent-os.pages.dev`
- desktop/mobile normal/reduced-motion: PASS 4/4
- Cloudflare fixed known-order signed GET: `LIVE_SIGNED_READ_VERIFIED`
- Vercel Binance venue access may fail closed from its cloud location; this is an explicit external eligibility limitation, not a fabricated Valid Until BLOCK.

No new financial write is needed or permitted for terminal assurance.

## Proof classification

### TECHNICAL_PROOF — PASS
Deterministic engine, receipt integrity, exact-action binding, challenge suite, MCP composition and execution boundary have test evidence.

### BEHAVIOR_PROOF — PASS
Signature counterexample is deterministic and repeatable:

```text
CURRENT STATE CHECKS = PASS 4/4
EXACT ACTION = MATCH
CROSS-TIME PREMISE = FAIL 35.47 > 20 BPS
RESULT = NO LONGER VALID → REPLAN_REQUIRED
```

### OUTCOME_PROOF — NOT CLAIMED
No profitability, reduced-loss, ROI or production financial outcome claim exists.

### PRODUCTION_EVIDENCE — NOT CLAIMED
The authenticated Binance execution evidence is Spot Testnet, non-production and no real funds. CI/demo/Testnet proof is not reclassified as production evidence.

## Historical authenticated execution truth

- official Binance Spot Testnet
- BUY BTCUSDT
- 10 test USDT
- orderId `13634770`
- clientOrderId `vu-mtswxiik-ecb6b093`
- queried back as `FILLED`
- same-order verified
- production: false
- real funds: false
- rerun without new explicit human authorization: forbidden

## Known limitations disclosed

- no mainnet proof
- no real-money proof
- no alpha/profitability claim
- no reduced-loss claim
- no production reliability or long-duration operations proof
- no audited security claim
- no production-readiness claim
- no unrestricted public financial write route
- Cloud deployment may encounter Binance venue eligibility restrictions and must fail closed

These limitations are explicit and do not contradict the hackathon claim set.

## Regression / scope decision

```text
REOPEN_PRODUCT = NO
REOPEN_VISUALS = NO
REOPEN_VOICE = NO
ADD_FEATURES = NO
PLACE_NEW_TESTNET_ORDER = NO
```

At this stage additional speculative polish presents higher regression/deadline risk than expected evaluator gain.

## Terminal verdict

```text
BUILD_CANDIDATE_READY = SATISFIED
TERMINAL_ASSURANCE = PASS
SUBMISSION_PACKAGE_VERIFIED = PASS
DEMO_VERIFIED_FROM_CANONICAL_RUNTIME_EVIDENCE = PASS
CLAIMS_EVIDENCE_ALIGNED = PASS
UNRESOLVED_RISKS = EXPLICIT_NON_BLOCKING_LIMITATIONS_ONLY
SUBMISSION_READY = TRUE
NEXT_OWNER = HUMAN
FINAL_SUBMIT_PROTECTED = TRUE
```

Project Finisher does **not** perform or infer the final official Submit action. After the human submits, record the actual submission confirmation before any `SUBMITTED` or post-mortem state is asserted.
