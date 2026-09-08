# ATTEMPT 004 — Local actual-location Spot Testnet ALLOW → order → same-order verification → public proof

Date: 2026-09-08
Project: Valid Until
Track: Binance Agent OS Mini Hackathon — Track A
Environment: official Binance Spot Testnet only
Production: false
Real funds: false

## Result

```text
LOCAL_TESTNET_PROOF=ALLOW_ORDER_VERIFIED
TESTNET_ORDER_ID=13634770
CLIENT_ORDER_ID=vu-mtswxiik-ecb6b093
SAME_ORDER_VERIFIED=TRUE
PUBLICATION=GITHUB_PUSH_COMPLETE
VERCEL_DEPLOYMENT=TRIGGERED_BY_MAIN_PUSH
```

This is the first successful authenticated bounded execution proof for the project.

## Protected action

```text
symbol: BTCUSDT
side: BUY
notional_usdt: 10
venue: Binance Spot Testnet
endpoint: https://testnet.binance.vision
```

The user explicitly entered `CONFIRM_TESTNET_WRITE` locally before the proof cycle.

The implementation hard cap remained 25 test USDT and the proof path permits at most one order POST.

## Deterministic pre-write assurance

Before the live cycle, the local wrapper ran the full test suite:

- deterministic core: PASS 8/8
- Challenge Suite: PASS 6/6
- local MCP: PASS 5/5
- MCP observation adapter: PASS 4/4
- testnet execution boundary: PASS 7/7
- native Spot Testnet transport: PASS 5/5

## Decision contract

Sanitized public evidence records:

```text
receipt_version = valid-until.receipt.v2
validity_status = ALLOW
next_state = ACTION_REMAINS_VALID
failed_checks = []
t0_mid = 78707.705
t1_mid = 78707.705
```

Hashes:

```text
policy_hash   = dfb6d0f1fdbe0b817a78763466fb4a7c5ba5ae4f2c673db8001eb5193fdb5578
snapshot_hash = 09bcb3462f776493153b839040174208039ac90106cb76397dfbc08cdc762dc0
action_hash   = c7887fc9eb2f0168e8c15b29158a77eed3178845e8fa04b59383fb9dea17bcef
```

## Binance Spot Testnet execution evidence

Order submission and subsequent query returned the same identity:

```text
orderId = 13634770
clientOrderId = vu-mtswxiik-ecb6b093
symbol = BTCUSDT
side = BUY
type = MARKET
status = FILLED
executedQty = 0.00012000
cummulativeQuoteQty = 9.44492520
same_order_verified = true
```

The uncertain-POST recovery branch was not used:

```text
uncertain_transport_recovered = false
```

## Sanitization and publication

Raw capture stayed local and was deleted by the wrapper after sanitization.

Only this public artifact was pushed:

```text
web/live-testnet-proof.json
```

Git commit:

```text
21ab8508e078595fa964c73521bb7f78c2f2a37a
evidence: publish local authenticated Binance Spot Testnet proof
```

GitHub commit inspection confirms the commit changed only `web/live-testnet-proof.json`.

Public evidence digests:

```text
raw_capture_sha256  = 5a67e7e912c2de23a14e23cf28a396520ab9837ae142b2992edf9f37753f826a
public_proof_sha256 = a318c6a6d8d56cd5ab66ee5beedf3baac32dc33885a963b64fbfe814ccad6b76
```

CI for the publication commit:

```text
run = 34254211176
head = 21ab8508e078595fa964c73521bb7f78c2f2a37a
conclusion = SUCCESS
```

## Vercel verification — requested step 5

Vercel project:

```text
project = valid-until-agent-os
project_id = prj_G4gsIiXTRxOTLhXf8ZMqqVDRJSYs
```

Production deployment created from the proof commit:

```text
deployment_id = dpl_2M3AgFyfNRzEdd9z84dzfTzjjcth
state = READY
target = production
github_commit_sha = 21ab8508e078595fa964c73521bb7f78c2f2a37a
```

Stable judge routes were fetched after deployment:

```text
https://valid-until-agent-os.vercel.app/live-proof                 -> HTTP 200
https://valid-until-agent-os.vercel.app/live-testnet-proof.json   -> HTTP 200
```

The deployed JSON matches the GitHub sanitized proof and contains:

```text
proof_class = AUTHENTICATED_BINANCE_SPOT_TESTNET_EXECUTION_EVIDENCE
production = false
real_funds = false
validity_status = ALLOW
order_sent = true
status = FILLED
same_order_verified = true
```

## Claim boundary

This evidence supports only the following statement:

> Valid Until returned ALLOW for one bounded exact action; that action was submitted to the official Binance Spot Testnet, filled, and the same order identity was queried back successfully.

It does not establish profitability, mainnet safety, production financial safety, or a real-money trade.

## Step 1–5 stop boundary

```text
STEP_1_SECRET_INSTALLATION = COMPLETE
STEP_2_PROOF_WORKFLOW_PACKAGING = COMPLETE
STEP_3_REAL_SPOT_TESTNET_CAPTURE = COMPLETE
STEP_4_SANITIZED_PUBLIC_WRITE_PROOF = COMPLETE
STEP_5_VERCEL_JUDGE_SURFACE = COMPLETE
```

Per the human-requested boundary, no PBPD runtime reconciliation, TRACE delta, Winning Intelligence final recheck, video freeze, Project Finisher, or submission action is performed as part of this evidence receipt.
