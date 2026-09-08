# Attempt 002 — actual-location authenticated Spot Testnet access PASS

Date: 2026-09-08
Machine class: user's personal Windows development machine
Shell: ordinary PowerShell
Privilege: standard user; no administrator elevation
Transport: native PowerShell HTTPS + HMAC-SHA256
Venue: official Binance Spot Testnet `https://testnet.binance.vision`

## Purpose

Determine whether the user's actual execution location can legitimately access authenticated Binance Spot Testnet before any financial write is attempted.

## User-executed command

```powershell
.\scripts\check-testnet-access.ps1
```

The script performed only:
- public `GET /api/v3/time`;
- signed `GET /api/v3/account`.

It deliberately discarded the account payload and printed no credentials or balances.

## Sanitized observed result

```text
ACTUAL_LOCATION_TESTNET_ACCESS=PASS
FINANCIAL_WRITE=FALSE
```

## Interpretation

- actual-location authenticated Spot Testnet access: **PASS**;
- financial write during this check: **FALSE**;
- order sent: **FALSE**;
- orderId: **NONE**;
- this is an eligibility/access proof only, not a trade proof;
- the earlier GitHub-hosted Azure `eastus` restriction was runner-location-specific and is not being bypassed;
- no VPN/proxy/cloud-region hopping is introduced by this local path.

## Next permitted boundary

PBPD may now execute the already-authorized bounded PRD v0.3 proof from this same actual-location machine:

```text
T0 Spot Testnet observation
→ exact action sealed
→ T1 fresh observation
→ deterministic Valid Until revalidation
→ if BLOCK: zero order call
→ if ALLOW: at most one BUY BTCUSDT order, 10 test USDT, hard cap 25
→ query same clientOrderId
→ sanitize evidence
→ publish sanitized proof only
```

No successful Spot Testnet order is claimed by this artifact.
