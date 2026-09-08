# Valid Until — PRD v0.4 Live Proof Lab addendum

Status: `ACTIVE_LIVING_PRD_ADDENDUM`
Date: `2026-09-08`
Owner: `PBPD`
Base: PRD v0.3
Human authority: `product/HUMAN-DIRECTION-LIVE-PROOF-LAB-002.md`

## Canonical version rule

Until later consolidation, the living product definition is:

```text
PRD v0.2 base
+ v0.3 bounded Spot Testnet evidence delta
+ v0.4 Live Proof Lab delta
= current Valid Until product definition
```

## Material change

The judge-facing product moves from a primarily single-page/static proof surface to a compact multi-page interactive proof instrument.

This is not a strategy pivot. It changes presentation, runtime interactivity and server-side proof transport while preserving the core thesis and deterministic authorization model.

## Information architecture

### `/` — Thesis / entry
Purpose: explain the problem and route the judge in <30 seconds.

Must show:
- `Reasoning is not authorization.`
- `A correct decision can expire.`
- hero controlled cross-time replay;
- primary CTA to `/lab`;
- secondary CTA to `/live-proof`;
- link to `/evaluations`.

### `/lab` — Live Proof Lab
Purpose: let the judge interact with the execution-validity boundary.

Must distinguish three evidence classes:
- `LIVE` — fresh external observations;
- `CONTROLLED` — deterministic reproducible scenarios;
- `VERIFIED EXECUTION` — authenticated captured Spot Testnet order evidence.

Required scenarios:
1. Clean ALLOW.
2. Market drift / premise expired.
3. Exact-action mutation inside policy cap.
4. TTL expiry.
5. Receipt tamper.
6. Policy mismatch.

### `/live-proof` — Verified Execution
Purpose: show the real authenticated Spot Testnet execution receipt and optionally refresh the known order status through a server-side signed GET.

Must never imply that a refresh creates a new order.

### `/evaluations` — Red Team
Purpose: preserve the deterministic challenge suite and make failure coverage inspectable.

## Runtime architecture

```text
Browser
  |
  +--> static/public scenario data
  |
  +--> /api/live-market
  |      -> public official Binance Spot Testnet observations
  |
  +--> /api/order-status
         -> server-side only
         -> Vercel Sensitive Env Vars
         -> signed GET known Spot Testnet order
         -> sanitized response only
```

A future bounded write route may be implemented but must remain disabled by default and owner-armed server-side. It is not required for the initial v0.4 acceptance because a real authenticated write proof already exists.

## New MUST requirements

- MUST-22 — The public site must expose the four judge surfaces `/`, `/lab`, `/live-proof`, `/evaluations`.
- MUST-23 — `/lab` must visibly label `LIVE`, `CONTROLLED`, and `VERIFIED EXECUTION` evidence classes.
- MUST-24 — Any Vercel function using Binance credentials must read them only from server-side environment variables.
- MUST-25 — Testnet credential variables must not use public/browser prefixes.
- MUST-26 — Vercel functions must hardcode `https://testnet.binance.vision` for authenticated testnet access.
- MUST-27 — `/api/order-status` may query only the canonical known Spot Testnet order/clientOrderId from sanitized proof or server-side constants; browser input may not select arbitrary account/order targets.
- MUST-28 — API responses must be sanitized allowlists; no account balances, headers, credentials or raw payloads.
- MUST-29 — Missing Vercel credentials must fail closed with a non-secret status such as `SERVER_CREDENTIALS_NOT_CONFIGURED`.
- MUST-30 — Public UI must not claim a fresh order execution from read-only refresh endpoints.
- MUST-31 — Existing hero replay and challenge suite semantics must remain deterministic and reproducible.
- MUST-32 — Navigation must make the strongest proof paths reachable in one click from the home page.

## New MUST_NOT requirements

- MUST_NOT-11 — Do not place Binance secrets in browser JS, HTML, generated JSON or public env variables.
- MUST_NOT-12 — Do not allow arbitrary symbol/side/notional/endpoint fields to flow from browser to a financial write function.
- MUST_NOT-13 — Do not expose a public unrestricted write button.
- MUST_NOT-14 — Do not conflate a signed GET refresh with a new execution.
- MUST_NOT-15 — Do not obscure which evidence is live versus controlled versus previously verified.

## UX direction

Preserve the validated editorial execution-instrument direction:
- warm paper / ivory rather than generic dark AI dashboard;
- acid validity signal;
- orange failure signal;
- serif editorial headlines + monospace evidence labels;
- visible evidence class and proof boundary;
- no AI-slop gradients, generic agent or shield iconography.

The lab should feel like an instrument the judge operates, not a dashboard they read.

## Acceptance

v0.4 implementation is ready for post-build reconciliation when:
- all four routes respond 200 on the stable Vercel domain;
- live market endpoint returns either valid fresh data or an explicit fail-closed unavailable state;
- signed order-status endpoint never exposes secrets and either returns sanitized verified status or explicit credentials-not-configured;
- all six scenario cards work without financial writes;
- existing `live-testnet-proof.json` remains unchanged as canonical historical execution receipt unless a separately authorized real proof occurs;
- CI and runtime checks pass.

Completion of this delta does not imply TRACE approval, Winning Intelligence closeout or project completion.
