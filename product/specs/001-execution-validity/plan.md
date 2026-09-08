# Plan 001 — Execution Validity Boundary

Status: `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE`
Derived from: `product/PRD.md` and `spec.md`
Authority: `NONE`
Production owner: `PBPD`

## Architecture

```text
Human policy / intent
  ↓
AI agent interpretation + proposal
  ↓
Binance Agent OS / Skills observations
  ↓
Valid Until deterministic boundary
  ├─ policy identity
  ├─ receipt integrity
  ├─ freshness / TTL
  ├─ market state drift / spread / liquidity
  └─ exact action symbol / notional
  ↓
ALLOW | BLOCK → fresh reasoning
```

## Existing implementation map

- `src/policy.mjs` — deterministic policy/action/state checks.
- `src/receipt.mjs` — signed decision receipt issuance/verification.
- `src/snapshot.mjs` — Binance CLI observation normalization.
- `src/demo.mjs` — controlled failure-path replay.
- `src/live.mjs` — live read-only Binance path.
- `tests/run.mjs` — core invariants.
- challenge/evaluation scripts + `/evaluations` — canonical red-team surface.
- `web/index.html` — judge-facing hero replay.
- `SKILL.md` — AI-agent operating contract.

## Remaining plan before terminal handoff

### P1 — Lifecycle reconciliation
- complete lifecycle coverage manifest;
- map current build to living PRD requirements;
- preserve reconstruction labels.

### P2 — Winning Intelligence pre-submission
- sponsor-native necessity;
- whole known qualification/deliverable coverage;
- narrative/demo legibility;
- judge-path legibility;
- preserve unknown scoring dimensions rather than inventing them.

### P3 — TRACE Design / Experience Assurance
- create/resolve project adapter/state;
- review truth/proof contract, product flow, art direction, signatures, anti-slop, responsive behavior;
- after deployment, verify evaluator-facing runtime, mobile and reduced-motion evidence;
- return targeted rework or design-ready verdict without taking PBPD authority.

### P4 — Deployment proof
- deploy `/` and `/evaluations` from current canonical main;
- smoke-test first-5s/first-15s clarity and signature action→consequence;
- confirm truthful live-vs-controlled evidence labels.

### P5 — PBPD convergence
- reconcile PRD MUST requirements ↔ actual build ↔ technical/behavior evidence;
- state unresolved production gaps;
- emit at most `BUILD_CANDIDATE_READY` or `BUILD_CANDIDATE_READY_WITH_LIMITATIONS`.

### P6 — Project Finisher
- independent terminal QA;
- verify submission completeness, proof-class claims, limitations, demo assets and required external deliverables;
- only Finisher may produce terminal readiness verdict under the hackathon profile.

### P7 — Human protected submission
- follow/repost if not already done;
- publish video/demo + GitHub reply/quote;
- complete official survey;
- preserve submission receipt/outcome for post-mortem.

## Change-control rule

If any remaining step reveals a material product-intent change, stop feature work and route:

`finding → PBPD → PRD version increment → Spec Kit reconciliation → build resumes`

TRACE, Winning Intelligence, Spec Kit or Finisher findings may request changes, but none may silently mutate product authority or replace PBPD.
