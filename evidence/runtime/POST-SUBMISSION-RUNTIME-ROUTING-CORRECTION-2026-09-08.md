# Post-submission runtime routing correction — 2026-09-08

## Trigger

After the official hackathon form had been human-confirmed submitted, the user observed that the Vercel-hosted surface did not provide the working live path, while the existing Cloudflare Pages deployment did.

## Correction

The canonical evaluator-facing runtime is therefore routed to:

- Primary working judge/live runtime: https://valid-until-agent-os.pages.dev/
- Vercel deployment retained as secondary/static/fail-closed reference: https://valid-until-agent-os-plum.vercel.app/

This is a post-submission routing/documentation correction for a concrete runtime defect. It does not change product scope, code semantics, evidence classes, claims, the final film, or the preserved Binance Spot Testnet execution.

## Truth boundary

The Cloudflare deployment was already part of the submitted repository and previously verified as capable of the fixed historical signed read (`LIVE_SIGNED_READ_VERIFIED`). No new Binance order, mainnet action, real-funds action, geo bypass, or new proof class was introduced by this correction.

The official form had already been submitted before this correction. This artifact does not claim the form's submitted URL was edited after submission.
