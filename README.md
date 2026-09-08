# Valid Until — execution integrity for AI agents

> **Reasoning is not authorization.**  
> **A correct decision can expire.**

**Valid Until** is an action-bound, cross-time execution-validity workflow built for the **Binance Agent OS Mini Hackathon — Track A**.

**Current judge surface:** https://valid-until-agent-os-plum.vercel.app  
**Live Proof Lab:** https://valid-until-agent-os-plum.vercel.app/lab  
**Verified Execution:** https://valid-until-agent-os-plum.vercel.app/live-proof  
**6-case Red Team:** https://valid-until-agent-os-plum.vercel.app/evaluations  
**Cloudflare mirror:** https://valid-until-agent-os.pages.dev  
**Portable skill:** [`skills/valid-until/SKILL.md`](skills/valid-until/SKILL.md)  
**Local contract MCP:** `npm run mcp`

## The failure Valid Until catches

An AI agent can make the right decision at **T0** and still reach the action boundary at **T1** after the state that justified that exact action has changed.

The capability may still be available. The action may still fit the user's standing limits. **Every current-state check may still pass.**

That does not mean the old decision is still valid.

Valid Until binds one short-lived decision contract:

```text
sealed policy
+ exact T0 Binance state
+ exact normalized action
+ receipt integrity / validity window
        ↓
fresh T1 state + same exact action
        ↓
ACTION_REMAINS_VALID
or
REPLAN_REQUIRED
```

## The signature proof

The controlled replay is deliberately stronger than a generic preflight demo:

```text
CURRENT STATE CHECKS   PASS 4/4
EXACT ACTION HASH      MATCH
T0 → T1 MID DRIFT      FAIL 35.47 > 20 BPS

→ NO LONGER VALID
→ REPLAN_REQUIRED
```

**Fresh enough now is not the same as still justified by the decision made then.**

The replay is deterministic, synthetic and labeled **CONTROLLED**. It creates no order.

## Exact-action proof

A policy cap is not an authorization for every action inside the cap.

```text
policy max       = $100
T0 sealed action = BUY BTCUSDT $50
T1 proposed      = BUY BTCUSDT $75
```

Both are under the policy cap. Receipt v2 still blocks `$75` because the exact action hash changed.

```text
notional <= max       PASS
action_hash_match     FAIL
→ BLOCK / REPLAN_REQUIRED
```

## Three evidence classes

Valid Until keeps three proof classes visibly separate:

- **CONTROLLED** — deterministic replay and red-team scenarios;
- **LIVE** — external Binance observations when the venue is available, otherwise an explicit fail-closed venue-unavailable state;
- **VERIFIED EXECUTION** — one preserved authenticated Binance Spot Testnet execution receipt.

These classes are not interchangeable.

## Authenticated Binance Spot Testnet execution — obtained

A bounded historical non-production proof has been captured successfully.

```text
network        Binance Spot Testnet
action         BUY BTCUSDT · 10 test USDT
Valid Until    ALLOW / ACTION_REMAINS_VALID
orderId        13634770
clientOrderId  vu-mtswxiik-ecb6b093
status         FILLED
same order     VERIFIED
real funds     false
production     false
```

Canonical sanitized receipt: [`web/live-testnet-proof.json`](web/live-testnet-proof.json).

The proof demonstrates one exact `ALLOW → bounded Spot Testnet order → query same clientOrderId` path. It is **not** a profitability, investment-safety or production-readiness claim.

**Do not rerun the canonical order merely to refresh evidence.** The current `/live-proof` page is read-only; a signed order-status refresh cannot create a new order.

## Current hosted runtime truth

### Vercel

`https://valid-until-agent-os-plum.vercel.app`

- four judge surfaces are deployed;
- current Binance server-side reads fail closed explicitly as `VENUE_ELIGIBILITY_UNAVAILABLE` from that hosting location;
- no geographic bypass is attempted;
- venue refusal is an external platform condition, **not** a Valid Until `BLOCK`.

### Cloudflare mirror

`https://valid-until-agent-os.pages.dev`

- same judge product is mirrored;
- the fixed historical order signed GET returns `LIVE_SIGNED_READ_VERIFIED`;
- `same_order_verified = true`;
- the refresh is read-only and creates no new order.

## Binance Agent OS + MCP composition

```text
AI agent host
   │
   ├── official Binance Agent OS / Binance MCP
   │      what is true now?
   │      fresh sponsor-native observations + capabilities
   │
   └── Valid Until MCP companion
          is this exact old action still justified?
          valid_until_begin
          valid_until_revalidate
          ↓
        ALLOW | BLOCK → REPLAN_REQUIRED
```

Safe dual-MCP example:

```text
config/mcp-composition.example.json
```

The Valid Until MCP is intentionally narrow. It does not duplicate Binance market/trading tools and exposes no wallet, transfer, funding, x402 or financial-write tool.

## Deterministic assurance

Current assurance includes:

```text
core invariants                 8/8 PASS
challenge suite                 6/6 PASS
local MCP                       5/5 PASS
MCP observation adapter         4/4 PASS
testnet execution boundary      7/7 PASS
native Spot Testnet transport   5/5 PASS
Vercel proof APIs               6/6 PASS
Cloudflare Pages functions     12/12 PASS
Windows PowerShell parser           PASS
```

Latest TRACE B+C runtime gate:

```text
proof CI       34274047464  SUCCESS
runtime        34274047494  SUCCESS
desktop/mobile × normal/reduced motion = 4/4 PASS
artifact       10074995345
digest         sha256:0d93d791857166854c81a0a085b87abb6ca191744d460bfb8ef9c2b12606e603
```

## Why this is not generic trade readiness

The Track A field contains serious risk engines, trade-readiness agents, human approval desks, proposal TTLs and final-refresh preflight systems.

Valid Until therefore makes a narrower claim:

| Layer | Question |
|---|---|
| Reasoning verifier | Was the model's reasoning supported? |
| Current-state preflight | Is the action acceptable now? |
| Permission layer | May the agent use this capability? |
| **Valid Until** | **Is this exact previously justified action still the same valid decision contract relative to its original T0 premise now?** |

The strongest counterexample is the hero itself: **current checks pass and the action still matches, yet the old decision expires.**

## Run locally

```bash
npm run build:web
npm run test:all
npm run demo
```

Supporting public-market path with the official Binance CLI:

```bash
npm run live -- BTCUSDT
```

The historical authenticated Spot Testnet execution is already captured. Reproducing another financial write is not required for judging and requires a separate explicit authorization boundary.

## Repository map

```text
AGENTS.md                         host-agent orchestration contract
skills/valid-until/SKILL.md      portable agent skill
config/mcp-composition.example.json
config/policy.example.json
src/mcp-server.mjs               deterministic local contract MCP
src/binance-mcp-observation.mjs  host-supplied Binance observation adapter
src/policy.mjs                   exact-action + cross-time revalidation
src/receipt.mjs                  Ed25519 receipt v2
src/testnet-executor.mjs         bounded ALLOW-only Testnet executor
src/live-testnet-native.mjs      native official Spot Testnet proof transport
tests/                           deterministic assurance
web/                             four-surface judge experience
evidence/                        runtime / competition / execution receipts
product/                         PRD / TRACE / Winning Intelligence / lifecycle state
```

## Claim boundaries

**Obtained and allowed to claim:**
- controlled cross-time replay is synthetic and reproducible;
- receipt v2 binds policy + T0 state + exact action;
- the 6-case suite demonstrates multiple deterministic ALLOW/BLOCK classes;
- one authenticated Binance Spot Testnet order was actually submitted and the same order was queried back;
- the order used test assets only, not real funds;
- the current public runtime contains no unrestricted financial-write route;
- Cloudflare can re-read the fixed historical order; Vercel truthfully fails closed on venue eligibility.

**Not claimed:**
- mainnet or real-money execution;
- profitability, alpha or financial advice;
- measured reduction in financial loss;
- production reliability or security certification;
- authenticated remote Binance MCP write interoperability unless separately evidenced.

## Hackathon status

Product/runtime gates completed:
- [x] Public GitHub repository
- [x] Four-surface public judge experience
- [x] Receipt v2 exact-action contract
- [x] Agent OS + local MCP composition
- [x] Authenticated bounded Binance Spot Testnet execution proof
- [x] PBPD v0.4 runtime reconciliation
- [x] TRACE B+C visual/runtime delta
- [ ] Winning Intelligence final recheck
- [ ] TRACE Gate 6.75 actual encoded video review
- [ ] PBPD candidate handoff
- [ ] Project Finisher terminal assurance
- [ ] Human protected submission actions

Submission deadline: **2026-09-08 23:59 UTC**.

## License

MIT
