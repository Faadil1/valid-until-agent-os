# Tasks 001 — Execution Validity Boundary

Status: `ACTIVE_RECONCILIATION__TRACE_6_75_PENDING`
Derived from: `product/PRD.md`, `spec.md`, `plan.md`
Authority: `NONE`
Production owner: `PBPD`

## Completed / evidenced

- [x] T001 — Freeze and hash deterministic policy before eligibility evaluation.
- [x] T002 — Normalize Binance market observations through official CLI path.
- [x] T003 — Bind receipt to policy + snapshot identity.
- [x] T004 — Verify Ed25519 receipt integrity.
- [x] T005 — Revalidate TTL, drift, spread, 1m movement and depth.
- [x] T006 — Validate exact action symbol/notional against sealed policy.
- [x] T007 — Fail closed to `BLOCK` on failed invariant.
- [x] T008 — Preserve deterministic hero replay `ELIGIBLE → 35.47 bps > 20 bps → BLOCK`.
- [x] T009 — Preserve live read-only Binance proof using official CLI.
- [x] T010 — Build six-case Challenge Suite with one ALLOW and five distinct BLOCK classes.
- [x] T011 — Build interactive judge UI and `/evaluations` surface.
- [x] T012 — Add reduced-motion and responsive behavior in current static UI.
- [x] T013 — Materialize current human authorization boundary.
- [x] T014 — Materialize Prototype Killer / simpler-alternative challenge.
- [x] T015 — Create retrospective current-state living PRD.
- [x] T016 — Complete lifecycle coverage manifest with explicit statuses and blockers. Owner: `Faadil System Router / PBPD reconciliation`.
- [x] T017 — Execute Winning Intelligence v1.1 pre-submission assessment and deployed runtime recheck. Owner: `HOI / Winning Intelligence`. Remaining final-video gap preserved.
- [x] T018A — Resolve TRACE Design / Experience Assurance Gate 6.5 on current deployed judge experience. Owner: `TRACE`. Verdict: PASS.
- [x] T019 — Deploy current canonical judge UI and `/evaluations` through Vercel stable alias. Owner: `PBPD implementation`; deployment was human-initiated and Git-linked.
- [x] T020 — Run deployed desktop/mobile/reduced-motion judge-path smoke. Owner: `TRACE/runtime evidence`. Run `34231934516`, 4/4 PASS.
- [x] T021 — Reconcile PRD MUSTs ↔ actual build ↔ evidence ↔ limitations. Owner: `PBPD`. Artifact: `product/POST-BUILD-RECONCILIATION.md`.

## Active routed work

- [ ] T018B — Complete TRACE Gate 6.75 Demo Narrative / Evidence Film review on the actual final encoded video. Owner: `TRACE`; recording boundary includes human screen/voice capture.
- [ ] T022 — Emit PBPD candidate handoff at or below `BUILD_CANDIDATE_READY_WITH_LIMITATIONS`. Owner: `PBPD`; blocked until T018B resolves.
- [ ] T023 — Run independent terminal assurance. Owner: `Project Finisher`; not yet eligible.
- [ ] T024 — Record final demo/video package and submission links. Owner: `PBPD packaging` + human recording/protected publication boundary. Gate 6.75 contract exists; actual video pending.
- [ ] T025 — Complete protected X/repost/reply-or-quote/survey actions. Owner: `Human`.
- [ ] T026 — Record post-submission learning/outcome without promoting one result into a global winning law. Owner: `Project Finisher + HOI/PBPD/TRACE as applicable`.

## Current evidence anchors

- Vercel: `https://valid-until-agent-os.vercel.app`
- production deployment: `dpl_HC9j3Y8nCAfw1PdHNpAhNjrVdo8G`
- TRACE Gate 6.5 run: `34231934516`
- TRACE Gate 6.5 artifact: `10058192480`
- TRACE artifact digest: `sha256:4f0ba722100568c2a320ade6eda2ce3ba81e4040026c1c946ee71ccc661b66f1`
- TRACE Gate 6.5 verdict: `Faadil1/trace-design-workflow/state/projects/valid-until/GATE_6_5_EVALUATION_CAPTURE_PASS_001.md`
- TRACE Gate 6.75 contract: `Faadil1/trace-design-workflow/state/projects/valid-until/GATE_6_75_DEMO_NARRATIVE_001.md`
- PBPD reconciliation: `product/POST-BUILD-RECONCILIATION.md`
- Winning Intelligence runtime recheck: `product/WINNER-INTELLIGENCE-PRE-SUBMISSION.md`

## Dependency rules

- T022 cannot be checked while the triggered TRACE Gate 6.75 specialist verdict is still open.
- T023 cannot run until T022 is emitted by PBPD after T018B resolves.
- T025 cannot be auto-executed by any specialist.
- A green deployment, CI run, demo recording or Winning Intelligence assessment cannot substitute for TRACE Gate 6.75 or Project Finisher.
- No checked task may be used to imply another unchecked owner's gate has passed.
- Spec Kit remains a derived execution protocol with authority `NONE`; it cannot emit candidate, submission or completion authority.
