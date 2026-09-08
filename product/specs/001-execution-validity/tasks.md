# Tasks 001 — Execution Validity Boundary

Status: `ACTIVE_RECONCILIATION`
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

## Active routed work

- [ ] T016 — Complete lifecycle coverage manifest with explicit statuses and blockers. Owner: `Faadil System Router / PBPD reconciliation`.
- [ ] T017 — Execute Winning Intelligence v1.1 pre-submission assessment on current package. Owner: `HOI / Winning Intelligence`.
- [ ] T018 — Resolve TRACE Design / Experience Assurance trigger on current judge experience. Owner: `TRACE`.
- [ ] T019 — Deploy current canonical judge UI and `/evaluations`. Owner: `PBPD implementation`; external production/public action remains human/deployment-policy governed.
- [ ] T020 — Run deployed desktop/mobile/reduced-motion judge-path smoke. Owner: `TRACE/runtime evidence`.
- [ ] T021 — Reconcile PRD MUSTs ↔ actual build ↔ evidence ↔ limitations. Owner: `PBPD`.
- [ ] T022 — Emit PBPD candidate handoff at or below `BUILD_CANDIDATE_READY_WITH_LIMITATIONS`. Owner: `PBPD`.
- [ ] T023 — Run independent terminal assurance. Owner: `Project Finisher`.
- [ ] T024 — Record final demo/video package and submission links. Owner: `PBPD packaging` + human protected publication.
- [ ] T025 — Complete protected X/survey actions. Owner: `Human`.
- [ ] T026 — Record post-submission learning/outcome without promoting one result into a global winning law. Owner: `Project Finisher + HOI/PBPD/TRACE as applicable`.

## Dependency rules

- T019 may proceed while T017/T018 are active only if it is treated as a **preview/evidence step**, not terminal readiness.
- T023 cannot pass until T017/T018/T020/T021/T022 are resolved or explicitly limited by their real owners.
- T025 cannot be auto-executed by any specialist.
- No checked task may be used to imply another unchecked owner's gate has passed.
