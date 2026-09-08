# Live Spot Testnet Attempt 001 — GitHub Hosted Runner

Date: 2026-09-08
Workflow: `RUN THIS — live-binance-spot-testnet-proof`
Run ID: `34248954040`
Job ID: `102138125899`
Head: `ad26e96628e4902554b317e5661143b43f6bf56a`
Result: `FAIL_CLOSED_BEFORE_EXECUTION`

## What passed

- protected GitHub Environment `testnet-proof` secrets were present;
- values were masked and never printed;
- deterministic assurance passed:
  - core `8/8`;
  - Challenge Suite `6/6`;
  - local MCP `5/5`;
  - MCP observation adapter `4/4`;
  - testnet execution boundary `7/7`;
- Binance CLI `2.1.1` installed successfully;
- runner OS: Ubuntu 24.04;
- hosted runner region reported by GitHub: Azure `eastus`.

## Where it stopped

The first authenticated Spot Testnet account request failed:

```text
binance-cli request GET https://testnet.binance.vision/api/v3/account --signed
```

Binance returned:

```text
Service unavailable from a restricted location according to 'b. Eligibility'
```

## Execution consequence

The workflow failed **before** the Valid Until live decision cycles and before any order step.

Therefore:

```text
order_sent = false
order_id = none
client_order_id = none
same_order_verified = false / not applicable
sanitized_public_trade_proof = not produced
```

This is venue/eligibility fail-closed evidence, not a Valid Until `BLOCK` decision and not a successful authenticated write proof.

## Safety decision

Do not remediate by:
- changing GitHub/cloud region specifically to evade the restriction;
- VPN/proxy/geographic routing;
- using a different endpoint/client solely to bypass the Eligibility response;
- switching to mainnet;
- weakening any Valid Until policy.

A future write attempt is permitted only from a legitimately permitted execution location using the official Binance environment and the current human authorization boundary.

## Public-claim boundary

Do not surface this run as:
- a live trade;
- an authenticated successful Spot Testnet capture;
- a Valid Until ALLOW/BLOCK execution proof.

It may be cited internally as evidence that the write path failed closed before any order when the venue refused eligibility.
