# Human Direction 002 — Vercel Live Proof Lab

Status: `HUMAN_AUTHORIZED_MATERIAL_DELTA`
Date: `2026-09-08`
Project: `Valid Until`

## Human direction

The human owner explicitly authorized evolving the existing single-surface judge site into a small multi-page **Live Proof Lab** and confirmed that Binance Spot Testnet credentials may be stored as **Vercel Sensitive Environment Variables**, provided they remain server-side and are never exposed to browser code, public artifacts, logs or chat.

## Authorized product delta

Create four judge-facing surfaces:

1. `/` — thesis / problem / hero cross-time replay / navigation.
2. `/lab` — live proof lab combining fresh market observations with interactive deterministic scenarios.
3. `/live-proof` — authenticated verified Spot Testnet execution evidence, including an optional live server-side signed re-query of the already-known testnet order.
4. `/evaluations` — deterministic challenge / red-team suite.

## Credential boundary change

The previous prohibition against sending credentials to Vercel is superseded for this bounded v0.4 scope.

Authorized:
- store `BINANCE_TESTNET_API_KEY` and `BINANCE_TESTNET_API_SECRET` as Vercel **Sensitive** environment variables;
- read them only inside server-side Vercel Functions;
- use them against the hardcoded official Spot Testnet endpoint `https://testnet.binance.vision`;
- use them for authenticated read-only verification of the known testnet execution receipt;
- implement a server-side bounded write capability only if it remains explicitly owner-armed and fail-closed by default.

Still forbidden:
- exposing credentials to browser JavaScript;
- `NEXT_PUBLIC_*`, `VITE_*` or equivalent public secret variables;
- returning credentials, auth headers or raw account payloads to the browser;
- logging secrets;
- mainnet or real-fund execution;
- alternate endpoint/geography for eligibility bypass;
- public unrestricted write buttons;
- weakening Valid Until policy to manufacture `ALLOW`.

## Product intent

The goal is not feature expansion for its own sake. The goal is to let a judge **interact with the proof boundary**:

`live state → decision contract → revalidation → ALLOW / NO LONGER VALID`

and separately verify that a previously authorized action really crossed the Binance Spot Testnet boundary and can be queried back.

## Claim discipline

The UI must visibly distinguish:
- `LIVE` — fresh external observations or signed server-side read verification;
- `CONTROLLED` — deterministic reproducible scenario fixtures;
- `VERIFIED EXECUTION` — the already-captured authenticated Spot Testnet order receipt.

No UI state may imply a new order was executed unless a real new testnet order was actually captured and sanitized.
