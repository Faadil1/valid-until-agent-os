# Valid Until

> **A correct decision can expire.**  
> **Reasoning is not authorization.**

**Valid Until** is an action-bound decision contract for AI trading agents, built for the **Binance Agent OS Mini Hackathon — Track A / Trading Workflows**.

An agent can make the right decision at **T0**, keep permission to execute, and reach **T1** after the premise behind that exact action has changed. Valid Until binds the policy, T0 state, and exact action into a short-lived signed receipt, then revalidates the same decision against fresh Binance state before execution.

**[▶ Watch the 62s demo](https://youtu.be/EW0VOoaA2CI) · [↗ Try the live demo](https://valid-until-agent-os-plum.vercel.app) · [✓ Run the 6-case evaluation](https://valid-until-agent-os-plum.vercel.app/evaluations) · [↗ Verified Testnet execution](https://valid-until-agent-os-plum.vercel.app/live-proof)**

---

## The 10-second proof

A normal preflight asks:

> **Is this action acceptable now?**

Valid Until asks a different question:

> **Is this exact previously justified action still justified by the decision that produced it?**

The signature replay deliberately reaches this state:

```text
CURRENT STATE CHECKS   PASS 4/4
EXACT ACTION HASH      MATCH
T0 → T1 MID DRIFT      FAIL 35.47 > 20 BPS

→ NO LONGER VALID
→ REPLAN_REQUIRED
```

Everything about the action can still look acceptable **now** while the original decision has already expired.

That is the product.

---

## How it works

```text
Human policy
    ↓
AI agent interprets intent + proposes exact action
    ↓
Binance Agent OS / Binance tools provide fresh state + capability
    ↓
Valid Until seals
  policy + T0 state + exact action + validity window
    ↓
T1 revalidation of the same decision contract
    ↓
ALLOW ───────────────→ bounded execution boundary
BLOCK ───────────────→ REPLAN_REQUIRED
```

The model can **propose**. It cannot authorize itself.

### Why Binance Agent OS matters

The responsibilities are intentionally separate:

```text
Binance Agent OS / Binance MCP
→ What is true now?
→ Fresh sponsor-native observations and capabilities

Valid Until
→ Is this exact old action still justified?
→ valid_until_begin
→ valid_until_revalidate
```

Valid Until does not duplicate Binance market or trading tools. It adds the missing **cross-time authorization boundary** between reasoning and execution.

---

## Exact-action binding

A policy limit is not authorization for every action under that limit.

```text
policy max       = $100
T0 sealed action = BUY BTCUSDT $50
T1 proposed      = BUY BTCUSDT $75

notional <= max       PASS
action_hash_match     FAIL

→ BLOCK / REPLAN_REQUIRED
```

Both actions fit the standing policy. Only one is the action the original decision actually authorized.

Receipt v2 binds:

- policy identity;
- T0 Binance state;
- exact normalized action (`symbol + side + notional`);
- freshness / expiry window;
- receipt integrity and signature.

---

## Proof, not just a happy path

### 6/6 deterministic red team

The public evaluation surface covers:

| Scenario | Expected result |
|---|---|
| Clean unchanged decision | `ALLOW` |
| Original premise / market drift | `BLOCK → REPLAN_REQUIRED` |
| Expired authorization | `BLOCK → REPLAN_REQUIRED` |
| Receipt tampering | `BLOCK → REPLAN_REQUIRED` |
| Policy mismatch | `BLOCK → REPLAN_REQUIRED` |
| Exact-action mutation inside policy cap | `BLOCK → REPLAN_REQUIRED` |

**[Open the evaluation suite →](https://valid-until-agent-os-plum.vercel.app/evaluations)**

### Authenticated Binance Spot Testnet execution

One bounded historical non-production execution proves that `ALLOW` can reach a real Binance execution boundary:

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

**[Inspect the verified execution →](https://valid-until-agent-os-plum.vercel.app/live-proof)**  
Canonical sanitized receipt: [`web/live-testnet-proof.json`](web/live-testnet-proof.json)

The current public page is read-only and does **not** place a new order.

---

## Three evidence classes

Valid Until keeps its evidence deliberately separated:

| Evidence | What it proves |
|---|---|
| **CONTROLLED** | Deterministic causal replay and red-team failure classes |
| **LIVE** | Fresh external Binance observations when the venue is available; otherwise explicit fail-closed venue status |
| **VERIFIED EXECUTION** | Preserved authenticated Spot Testnet `ALLOW → order → same-order verification` |

A controlled replay is never presented as a live trade, and Testnet evidence is never presented as production or real-money execution.

---

## Why this is not another trade-preflight agent

| Layer | Question |
|---|---|
| Reasoning verifier | Was the model's reasoning supported? |
| Current-state preflight | Is the action acceptable now? |
| Permission layer | May the agent use this capability? |
| **Valid Until** | **Is this exact previously justified action still valid relative to its original T0 premise now?** |

The counterexample is the memorable part: **current checks pass, the exact action matches, but the old decision still expires.**

---

## Use it as an agent skill

Install the portable skill:

```bash
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

Run the local MCP contract:

```bash
npm install
npm run mcp
```

Safe Binance + Valid Until MCP composition example:

```text
config/mcp-composition.example.json
```

Core calls:

```text
valid_until_begin
valid_until_revalidate
```

Before an execution boundary, obtain fresh T1 observations and revalidate. Execute only on `ALLOW`; otherwise terminate the old decision with `REPLAN_REQUIRED`.

---

## Reproduce the proof

```bash
git clone https://github.com/Faadil1/valid-until-agent-os.git
cd valid-until-agent-os
npm install
npm run build:web
npm run test:all
npm run demo
```

Supporting public-market path:

```bash
npm run live -- BTCUSDT
```

No mainnet trading, account funding, or real funds are required to reproduce the deterministic proof. The historical authenticated Spot Testnet order is already preserved and should not be rerun merely to refresh evidence.

---

## Assurance snapshot

```text
core invariants                 8/8 PASS
challenge suite                 6/6 PASS
local MCP                       5/5 PASS
MCP observation adapter         4/4 PASS
testnet execution boundary      7/7 PASS
native Spot Testnet transport   5/5 PASS
Vercel proof APIs               6/6 PASS
Cloudflare Pages functions     12/12 PASS
TRACE desktop/mobile × normal/reduced motion  4/4 PASS
```

Public surfaces:

- **Judge demo:** https://valid-until-agent-os-plum.vercel.app
- **Live Proof Lab:** https://valid-until-agent-os-plum.vercel.app/lab
- **Red Team:** https://valid-until-agent-os-plum.vercel.app/evaluations
- **Verified Execution:** https://valid-until-agent-os-plum.vercel.app/live-proof
- **Cloudflare mirror:** https://valid-until-agent-os.pages.dev
- **62-second film:** https://youtu.be/EW0VOoaA2CI

---

## Repository map

```text
AGENTS.md                         host-agent orchestration contract
skills/valid-until/SKILL.md      portable agent skill
config/mcp-composition.example.json
config/policy.example.json
src/mcp-server.mjs               deterministic local contract MCP
src/binance-mcp-observation.mjs  Binance observation adapter
src/policy.mjs                   exact-action + cross-time revalidation
src/receipt.mjs                  Ed25519 receipt v2
src/testnet-executor.mjs         bounded ALLOW-only Testnet executor
src/live-testnet-native.mjs      Spot Testnet proof transport
tests/                           deterministic assurance
web/                             evaluator-facing product surfaces
evidence/                        runtime + execution receipts
product/                         PRD + design + evidence reconciliation
```

---

## Claim boundaries

**Demonstrated:** deterministic cross-time revalidation; exact-action binding; six ALLOW/BLOCK evaluation cases; agent-native MCP contract; one authenticated Spot Testnet order submitted under `ALLOW` and queried back as the same `FILLED` order; public read-only proof surfaces.

**Not claimed:** mainnet or real-money execution, profitability or alpha, financial advice, measured loss reduction, production reliability, or security certification.

---

## Built for Binance Agent OS Mini Hackathon

**Track A — Agent Creation · Trading Workflows**

The submission thesis is intentionally one sentence:

> **A correct decision can expire.**

And the judge-memory test is equally simple:

> **The authorization was still valid. The premise was not.**

MIT License
