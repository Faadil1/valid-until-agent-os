# Tasks 001 — Execution Validity Boundary

Status: `ACTIVE_RECONCILIATION__TRACE_DELTA_NEXT`
Derived from: `product/PRD.md` + v0.3 + v0.4 normative addenda
Authority: `NONE`
Production owner: `PBPD`

## Completed / evidenced

- [x] T001 — Freeze and hash deterministic policy before eligibility evaluation.
- [x] T002 — Normalize Binance market observations through official Binance paths.
- [x] T003 — Bind receipt to policy + snapshot identity.
- [x] T004 — Verify Ed25519 receipt integrity.
- [x] T005 — Revalidate TTL, drift, spread, 1m movement and depth.
- [x] T006 — Validate exact action identity against sealed policy and receipt v2.
- [x] T007 — Fail closed to `BLOCK` on failed invariant.
- [x] T008 — Preserve deterministic hero replay `ELIGIBLE → 35.47 bps > 20 bps → BLOCK`.
- [x] T009 — Preserve authentic read-only Binance evidence path.
- [x] T010 — Build six-case Challenge Suite with one ALLOW and five BLOCK classes.
- [x] T011 — Build interactive judge UI and `/evaluations` surface.
- [x] T012 — Add reduced-motion and responsive behavior.
- [x] T013 — Materialize human authorization boundary.
- [x] T014 — Materialize Prototype Killer / simpler-alternative challenge.
- [x] T015 — Create and evolve living PRD.
- [x] T016 — Maintain lifecycle coverage manifest.
- [x] T017 — Complete prior Winning Intelligence assessment/reruns; final recheck remains a later triggered task.
- [x] T018A — Resolve historical TRACE Gate 6.5 on the then-current deployed judge experience: PASS.
- [x] T019 — Deploy canonical judge UI through Vercel.
- [x] T020 — Run desktop/mobile/reduced-motion judge-path smoke for historical Gate 6.5.
- [x] T021 — Complete original PBPD post-build reconciliation.
- [x] T021B — Obtain bounded authenticated Spot Testnet execution proof under v0.3 route A: order `13634770`, same clientOrderId verified.
- [x] T021C — Implement v0.4 four-surface Live Proof Lab + server-side read layer with no public write route.
- [x] T021D — Verify v0.4 dual runtime: Vercel static routes + venue fail-closed APIs; Cloudflare signed known-order read verified.
- [x] T021E — Reconcile v0.4 runtime evidence with living PRD. Artifact: `product/PBPD-RUNTIME-EVIDENCE-RECONCILIATION-V0.4.md`.

## Active routed work

- [ ] T027 — Run TRACE delta after authenticated Testnet proof + v0.4 runtime scope. Owner: `TRACE`.
- [ ] T028 — Run Winning Intelligence final recheck after TRACE delta. Owner: `HOI / Winning Intelligence`.
- [ ] T018B — Complete TRACE Gate 6.75 Demo Narrative / Evidence Film review on the actual final encoded video. Owner: `TRACE`; blocked until current delta + WI recheck are reconciled.
- [ ] T022 — Emit PBPD candidate handoff at or below `BUILD_CANDIDATE_READY_WITH_LIMITATIONS`. Owner: `PBPD`; blocked until T018B resolves.
- [ ] T023 — Run independent terminal assurance. Owner: `Project Finisher`; blocked until T022.
- [ ] T024 — Record final demo/video package and submission links. Owner: `PBPD packaging` + human recording/protected publication boundary.
- [ ] T025 — Complete protected external submission/social/survey actions where required. Owner: `Human`.
- [ ] T026 — Record post-submission learning/outcome without promoting one result into a global winning law.

## Current evidence anchors

- Vercel v0.4 runtime: `https://valid-until-agent-os-plum.vercel.app`
- Vercel runtime commit: `76eee8ace6f344145cf90d2369fe9fb2595b788e`
- Cloudflare mirror: `https://valid-until-agent-os.pages.dev`
- canonical Testnet proof: `web/live-testnet-proof.json`
- order: `13634770` / `vu-mtswxiik-ecb6b093`
- runtime verification handoff: `0f9ec86b2fce6dc300a6dba5b52f93b1b3fb4f73`
- final handoff CI before PBPD reconciliation: `34267650642` SUCCESS
- PBPD runtime reconciliation: `product/PBPD-RUNTIME-EVIDENCE-RECONCILIATION-V0.4.md`
- historical TRACE Gate 6.5 evidence remains historical, not a substitute for current TRACE delta.

## Dependency rules

- T027 is the next required specialist gate.
- T028 cannot close before T027.
- T018B cannot be treated as current/final while T027/T028 are unresolved.
- T022 cannot be checked until the current TRACE Gate 6.75 verdict resolves.
- T023 cannot run until T022 is emitted by PBPD.
- T025 cannot be auto-executed by any specialist.
- A green deployment, CI run, Testnet order, signed read, video render or Winning Intelligence assessment cannot substitute for another owner's required gate.
- No checked task may imply another unchecked owner's gate has passed.
- Spec Kit remains derived with authority `NONE`.