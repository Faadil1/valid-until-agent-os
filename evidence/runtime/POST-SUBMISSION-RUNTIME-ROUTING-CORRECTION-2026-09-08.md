# Post-submission runtime routing correction — 2026-09-08

## Trigger

After the official hackathon form had been human-confirmed submitted, the user observed that the Vercel-hosted surface did not provide the working live path, while the existing Cloudflare Pages deployment did.

## Correction

The canonical evaluator-facing runtime is therefore routed to:

- Primary working judge/live runtime: https://valid-until-agent-os.pages.dev/
- Submitted Vercel URL: https://valid-until-agent-os-plum.vercel.app/

README, YouTube description and X judge-facing links were updated to point to Cloudflare after submission. The official form itself is immutable and is not claimed to have been edited.

## Vercel judge-route recovery shim

A narrowly scoped Vercel routing correction was added after the submission defect was confirmed:

- `/` redirects to the canonical Cloudflare root;
- `/lab` redirects to the canonical Cloudflare `/lab`;
- `/evaluations` redirects to the canonical Cloudflare `/evaluations`;
- `/live-proof` redirects to the canonical Cloudflare `/live-proof`.

The redirect rules are temporary (`307` semantics via `permanent: false`) and live in `vercel.json`.

This is deliberately **not** an API proxy and does **not** route Vercel's Binance requests through another region. `/api/*` remains outside the redirect shim and retains the existing fail-closed behavior. Therefore the change does not create a geographic bypass, a new Binance request path, a new order, or a new proof class.

The purpose is only to recover evaluator traffic that arrives through the immutable Vercel URL submitted on the form and send it to the already-canonical working runtime.

## Truth boundary

The Cloudflare deployment was already part of the submitted repository and previously verified as capable of the fixed historical signed read (`LIVE_SIGNED_READ_VERIFIED`). No new Binance order, mainnet action, real-funds action, geo bypass, API proxy, or new proof class was introduced by this correction.

The official form had already been submitted before this correction. This artifact does not claim the form's submitted URL was edited after submission.
