# Valid Until — execution integrity for AI agents

> **Reasoning is not authorization.**  
> **A correct decision can expire.**

**Valid Until** is a cross-time execution-validity agent workflow for the **Binance Agent OS Mini Hackathon — Track A**.

**Judge surface:** https://valid-until-agent-os.vercel.app  
**Red-team surface:** https://valid-until-agent-os.vercel.app/evaluations  
**Portable skill:** [`skills/valid-until/SKILL.md`](skills/valid-until/SKILL.md)  
**Local contract MCP:** `npm run mcp`

## The problem

An AI agent can make a correct decision at T0 and reach the action boundary at T1 after the state that justified that decision has changed.

The capability may still exist. The action may still fit the user's standing limits. Current-state checks may even still look acceptable.

That does **not** mean the old decision is still authorized.

Valid Until binds three things into one short-lived action-decision contract:

1. sealed policy;
2. exact T0 Binance state;
3. exact normalized action (`symbol + side + notional_usdt`).

At T1 the same exact action must still satisfy both current constraints **and** the sealed relationship to the T0 premise.

## Signature deterministic proof

The controlled replay is constructed so a generic current-state preflight passes while the old premise expires.

| Check at T1 | Result |
|---|---:|
| Receipt signature | PASS |
| Policy identity | PASS |
| Exact action hash | PASS |
| Receipt age: `3s <= 5s` | PASS |
| Current spread: `0.37 <= 8 bps` | PASS |
| Current abs 1m movement: `47.2 <= 80 bps` | PASS |
| Current bid depth: `$171k >= $50k` | PASS |
| Current ask depth: `$168k >= $50k` | PASS |
| **T0 → T1 mid drift: `35.47 > 20 bps`** | **FAIL** |

Result:

```text
CURRENT STATE: PASS
EXACT ACTION: MATCH
OLD PREMISE: EXPIRED
→ NO LONGER VALID
→ REPLAN_REQUIRED
```

**The authorization was still available. The premise was not.**

## Exact-action proof

A policy cap is not an action authorization.

```text
policy max = $100
T0 signed action = BUY BTCUSDT $50
T1 action        = BUY BTCUSDT $75
```

Both are under the cap. Valid Until still blocks `$75` because receipt v2 signed the exact `$50` action hash.

```text
notional <= policy max   PASS
action_hash_match        FAIL
→ BLOCK / REPLAN_REQUIRED
```

## Live proof strategy

Read-only authenticity is useful, but it is no longer the final proof target.

Valid Until now includes a **Binance Spot Testnet execution boundary**:

```text
LIVE BINANCE SPOT TESTNET T0
        ↓
seal policy + exact action
        ↓
LIVE BINANCE SPOT TESTNET T1
        ↓
Valid Until revalidation
        ↓
       ALLOW ───────────────→ signed MARKET BUY to Binance Spot Testnet
        │                       ↓
        │                    query same clientOrderId
        │                       ↓
        │                    exchange status evidence
        │
       BLOCK ───────────────→ ZERO EXECUTOR CALL
        ↓
REPLAN_REQUIRED
```

The executor is deliberately hardcoded to:

```text
https://testnet.binance.vision
```

It cannot be redirected to mainnet through configuration.

The bounded proof currently supports exact `BUY` actions only and requires a local explicit write gate:

```text
VALID_UNTIL_TESTNET_WRITE=CONFIRM_TESTNET_WRITE
```

No real funds are used.

## Important evidence status

Implemented and CI-verified:

```text
PASS 8/8 core invariants
PASS 6/6 challenge suite
PASS MCP 5/5
PASS MCP observation adapter 4/4
PASS testnet execution boundary 5/5
```

Latest full CI after adding the testnet execution boundary:

```text
GitHub Actions run 34242858075
head 18e0bd6006134010fca00b4d05667b87703bbb75
conclusion SUCCESS
```

The testnet executor tests prove:

- `BLOCK` causes **zero Binance CLI calls**;
- `ALLOW` requires an explicit local testnet-write confirmation;
- every execution URL is `testnet.binance.vision`;
- no `api.binance.com` target is accepted by the implementation;
- an allowed order is submitted and then queried by the same `clientOrderId` in the test harness.

**A real authenticated Binance Spot Testnet order capture is still PENDING.** Do not claim that a testnet order was actually placed until that capture exists.

## Agent OS + MCP composition

```text
AI agent host
   │
   ├── official Binance Agent OS / Binance tools
   │      fresh Binance observations + capabilities
   │
   └── Valid Until MCP companion
          valid_until_begin
          valid_until_revalidate
          ↓
        ALLOW | BLOCK
```

A safe dual-MCP example is included at:

```text
config/mcp-composition.example.json
```

The distinction is intentional:

```text
Binance MCP:      what is true now?
Valid Until MCP:  is the exact old action still justified now?
```

The Valid Until MCP never fetches Binance itself and exposes no order, wallet, transfer, funding or x402 tool.

## Run all deterministic assurance

```bash
npm run build:web
npm run test:all
npm run demo
```

## Live public-market authenticity proof

With official `binance-cli` installed:

```bash
npm run live -- BTCUSDT
```

This path remains non-authenticated/public-data-only and is supporting evidence, not the final differentiation proof.

## Live Binance Spot Testnet execution proof

### 1. Create a Binance CLI testnet profile locally

Do **not** paste credentials into GitHub, chat, screenshots or committed files.

Official Binance CLI supports testnet profiles:

```bash
binance-cli profile create --name valid-until-testnet --api-key <TESTNET_KEY> --api-secret <TESTNET_SECRET> --env testnet
```

### 2. Run the live testnet path

```bash
VALID_UNTIL_TESTNET_PROFILE=valid-until-testnet \
VALID_UNTIL_TESTNET_WRITE=CONFIRM_TESTNET_WRITE \
VALID_UNTIL_ACTION_NOTIONAL_USDT=10 \
npm run live:testnet -- BTCUSDT
```

The command:

1. seals policy before T0;
2. seals the exact `BUY BTCUSDT $10` action;
3. reads live Binance Spot Testnet market state;
4. creates receipt v2;
5. reads a fresh T1 state;
6. performs deterministic revalidation;
7. on `BLOCK`, sends no order;
8. on `ALLOW`, sends one signed MARKET BUY to Binance Spot Testnet;
9. queries the same `clientOrderId` and emits sanitized order evidence.

If the result is `BLOCK`, that is a valid live proof of the fail-closed boundary. Re-run only from a genuinely fresh decision cycle; do not weaken policy merely to force `ALLOW`.

## Four different questions

| Layer | Question |
|---|---|
| Reasoning verifier | Was the model's reasoning supported? |
| Current-state preflight | Is the action acceptable now? |
| Permission layer | May the agent use this capability? |
| **Valid Until** | **Is this exact previously justified action still valid relative to its original premise now?** |

That narrower category matters because the current Track A field already contains serious risk engines, preflight systems, policy constitutions, proposal-expiry controls and entry-drift checks.

## Repository map

```text
AGENTS.md                         host-agent orchestration contract
skills/valid-until/SKILL.md      portable agent skill
config/mcp-composition.example.json
config/policy.example.json
src/mcp-server.mjs               deterministic local contract MCP
src/binance-mcp-observation.mjs  host-supplied MCP observation adapter
src/snapshot.mjs                 public/testnet Binance CLI snapshots
src/policy.mjs                   exact-action + cross-time revalidation
src/receipt.mjs                  Ed25519 receipt v2
src/testnet-executor.mjs         ALLOW-only Spot Testnet write boundary
src/live-testnet.mjs             live Spot Testnet orchestration
src/demo.mjs                     deterministic 35.47 bps proof
tests/                           core + red-team + MCP + testnet boundary
web/                             judge surface
evidence/competition/            current competition research
product/                         PRD / Winner Intelligence / lifecycle decisions
```

## Claim boundaries

Allowed now:

- controlled replay is synthetic and labeled;
- public live market reads are authentic Binance observations;
- testnet execution boundary is implemented and CI-tested;
- `BLOCK` is structurally unable to call the testnet executor in the tested boundary;
- receipt v2 binds policy + T0 state + exact action.

Allowed only after a real capture:

- a real Binance Spot Testnet order was submitted;
- a real testnet order ID/status was observed.

Not claimed:

- mainnet trading;
- real-money execution;
- profitability or alpha;
- reduced financial losses;
- production security certification;
- authenticated remote Binance MCP write interoperability unless separately captured.

## Hackathon checklist

- [ ] Follow `@Binance`
- [ ] Repost the official announcement
- [x] Public GitHub repository
- [x] Public judge surface
- [x] Testnet execution boundary implemented + CI green
- [ ] Real Binance Spot Testnet execution capture
- [ ] Deploy/TRACE delta after live-proof change
- [ ] Winning Intelligence final recheck
- [ ] TRACE 6.75 refreshed final video
- [ ] Reply / quote-repost with demo + GitHub
- [ ] Complete survey before **2026-09-08 23:59 UTC**

## License

MIT
