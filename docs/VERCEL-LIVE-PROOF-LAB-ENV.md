# Vercel Live Proof Lab — server-side environment setup

Status: `HUMAN_SECRET_CONFIGURATION_REQUIRED`
Project: `valid-until-agent-os`
Date: `2026-09-08`

## Purpose

The Live Proof Lab v0.4 uses Vercel Functions for two different proof classes:

- `/api/live-market` — public Binance Spot Testnet market observation; no secret required.
- `/api/order-status` — signed GET of the already-known verified Spot Testnet order; server-side secrets required.

No new testnet order is created by either endpoint.

## Required Vercel Sensitive Environment Variables

Create exactly these variables in the Vercel project settings:

- `BINANCE_TESTNET_API_KEY`
- `BINANCE_TESTNET_API_SECRET`

Use the existing Binance Spot Testnet HMAC key/secret pair already created for the Valid Until proof.

## Required scope

- Target: `Production`.
- Type: `Sensitive`.
- Values: entered directly by the human owner in Vercel; never pasted into chat or committed to GitHub.
- Do not create browser/public variants such as:
  - `NEXT_PUBLIC_BINANCE_TESTNET_API_KEY`
  - `NEXT_PUBLIC_BINANCE_TESTNET_API_SECRET`
  - `VITE_BINANCE_*`

## Server-side boundary

The function `api/order-status.mjs`:
- reads the two environment variables only at runtime;
- hardcodes `https://testnet.binance.vision`;
- performs only a signed GET;
- queries only the canonical known order:
  - symbol: `BTCUSDT`
  - orderId: `13634770`
  - clientOrderId: `vu-mtswxiik-ecb6b093`
- returns only allowlisted order fields;
- never returns balances, API keys, signatures, auth headers or raw account payloads;
- fails closed if credentials are absent, rejected or venue-restricted.

## Expected runtime states

Before secrets are configured:

```text
SERVER_CREDENTIALS_NOT_CONFIGURED
```

After valid secrets are configured and the Vercel runtime location is accepted by Binance:

```text
LIVE_SIGNED_READ_VERIFIED
same_order_verified = true
NO NEW ORDER
```

If Binance rejects the Vercel runtime location:

```text
VENUE_ELIGIBILITY_UNAVAILABLE
NO BYPASS
NO NEW ORDER
```

## Write boundary

Live Proof Lab v0.4 intentionally does **not** expose a public financial-write endpoint. A future Vercel testnet write route requires a separate owner-armed, fail-closed authorization/spec delta.
