# Cloudflare Pages fallback — Valid Until v0.4

Status: DEPLOYMENT FALLBACK PREPARED
Date: 2026-09-08
Authority: deployment/runtime only. No new product scope. No new Binance order.

## Purpose

Provide an independent competition mirror for the existing CI-green v0.4 Live Proof Lab while Vercel Hobby deployment rate limits are active.

The Cloudflare mirror must preserve the same public product boundary:

- `/` — Home / thesis
- `/lab` — Live Proof Lab
- `/live-proof` — verified execution receipt + signed known-order refresh
- `/evaluations` — deterministic red-team suite
- `/api/live-market` — public Binance Spot Testnet market observation only
- `/api/order-status` — signed GET of the already-known testnet order only

There is no Cloudflare write endpoint in this fallback.

## Cloudflare Pages project setup

In Cloudflare Dashboard:

1. Workers & Pages → Create application → Pages → Import an existing Git repository.
2. Connect GitHub repository: `Faadil1/valid-until-agent-os`.
3. Project name: `valid-until-agent-os` if available.
4. Production branch: `main`.
5. Framework preset: None.
6. Root directory: repository root / leave blank.
7. Build command: `npm run build:web`.
8. Build output directory: `web`.
9. Save and deploy.

Cloudflare Pages automatically discovers root-level `/functions` and maps them by file path. The repository explicitly contains:

- `functions/api/live-market.js` → `/api/live-market`
- `functions/api/order-status.js` → `/api/order-status`

`web/_routes.json` scopes Function invocation to `/api/*`, so static judge pages remain static asset requests.

## Production secrets

After the Pages project exists:

Cloudflare Dashboard → Workers & Pages → Valid Until project → Settings → Variables and Secrets → Add.

Add these as Production secrets, using the same Binance Spot Testnet HMAC pair already used for the verified local proof:

- `BINANCE_TESTNET_API_KEY`
- `BINANCE_TESTNET_API_SECRET`

Never commit the values. Never paste them into chat. Preview secrets are not required for the competition production mirror.

The Cloudflare Function reads them only through `context.env`. The browser never receives either value.

After adding the secrets, trigger one new production deployment if Cloudflare requires a redeploy for the bindings to become active.

## Security invariants

The Cloudflare fallback MUST preserve all of the following:

- official endpoint hardcoded to `https://testnet.binance.vision`
- no mainnet
- no real funds
- no VPN/proxy/geographic bypass
- no public unrestricted write button
- no POST to Binance from `/api/order-status`
- signed refresh targets only canonical order `13634770` / `vu-mtswxiik-ecb6b093`
- no arbitrary order identity supplied by browser
- no raw account payload to browser
- no secret logging
- venue eligibility failure is displayed fail-closed and is not bypassed
- successful historical execution proof is not rerun

## Runtime acceptance checks

A Cloudflare production mirror is not considered verified until all of these are checked on the actual `*.pages.dev` URL:

1. `/` → HTTP 200
2. `/lab` → HTTP 200
3. `/live-proof` → HTTP 200
4. `/evaluations` → HTTP 200
5. `/api/live-market` → either `LIVE` or explicit fail-closed venue status
6. `/api/order-status` → `LIVE_SIGNED_READ_VERIFIED` or explicit fail-closed venue/auth status; it must never create a new order
7. Browser/source inspection contains no Binance secret values
8. Historical verified receipt still identifies order `13634770`, client order `vu-mtswxiik-ecb6b093`, `FILLED`, non-production, no real funds

## Platform interpretation

Cloudflare is a deployment resilience mirror, not a new execution claim. The canonical authenticated write evidence remains the previously captured local actual-location Spot Testnet proof. A successful Cloudflare signed GET is an additional live verification of that same known order, not a new trade.
