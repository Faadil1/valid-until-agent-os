# Valid Until — Agent Orchestration Contract

This repository is a **Binance Agent OS Track A agent workflow** with a deterministic, action-bound cross-time execution-validity boundary.

The AI agent is useful for interpreting intent, selecting Binance observations and proposing an exact action. It is **not** the authority that decides whether its own old proposal may still proceed.

## Roles

```text
Human
  defines / accepts bounded policy
        ↓
AI agent host
  interprets intent + proposes exact action
        ↓
Binance Agent OS / official Binance skill or remote MCP
  supplies fresh Binance observations + capability surface
        ↓
Valid Until skill / local MCP companion
  binds policy + T0 state + exact action
  revalidates against T1
        ↓
ALLOW / BLOCK
        ↓
BLOCK => REPLAN_REQUIRED
```

In this hackathon repository, execution stops at the validity result. No order-placement adapter is implemented.

## Required agent behavior

When the user asks for a Binance action or an evaluation that could lead to an action:

1. Read `skills/valid-until/SKILL.md`.
2. Keep the user's policy/limits explicit and immutable inside the authorization cycle.
3. Use the official Binance Agent OS / Binance Skills toolchain or official Binance remote MCP for read-only market observations.
4. Keep reasoning/proposal separate from deterministic authorization.
5. Propose an exact normalized action: `symbol + BUY/SELL + notional_usdt`.
6. Create the decision contract through `valid_until_begin` or the equivalent local evidence path.
7. Before the protected action boundary, obtain fresh Binance state and call `valid_until_revalidate` with the **same exact action**.
8. If the deterministic result is `BLOCK`, report **NO LONGER VALID**, preserve `REPLAN_REQUIRED`, and begin a genuinely fresh reasoning cycle only from fresh state.
9. Never weaken policy, silently resize the trade, switch side/symbol or retry stale evidence merely to obtain `ALLOW`.
10. Never claim `ALLOW` means profit, financial safety or a recommendation.
11. Never place an order, transfer funds, request account credentials, invoke x402 payments or bypass a geographic/product restriction in this submission.

## Exact-action rule

Receipt v2 cryptographically binds the normalized T0 action.

This distinction is mandatory:

```text
policy cap = $100
T0 proposal = BUY BTCUSDT $50
T1 proposal = BUY BTCUSDT $75
```

Although both sizes remain under policy, `$75` is **not the same decision contract**. `action_hash_match` must fail and the result must be:

```text
BLOCK
next_state = REPLAN_REQUIRED
```

Model prose cannot reinterpret that BLOCK as advisory.

## MCP companion

Start the local deterministic companion:

```sh
npm run mcp
```

It exposes only:

### `valid_until_begin`

Input:
- policy;
- normalized T0 Binance snapshot supplied by the host agent;
- exact action.

Output:
- `decision_id`;
- receipt-v2 policy/snapshot/action hashes;
- initial eligibility;
- `REVALIDATION_REQUIRED_BEFORE_ACTION` or `REPLAN_REQUIRED`.

### `valid_until_revalidate`

Input:
- `decision_id`;
- fresh T1 Binance snapshot;
- exact action being proposed now.

Output:
- `ALLOW` + `ACTION_REMAINS_VALID`, or
- `BLOCK` + `REPLAN_REQUIRED`, with exact failed checks.

The companion deliberately has **no Binance network client and no financial write capability**. Binance Agent OS remains the source of Binance observations/capabilities.

## Dual-MCP composition

A safe example is checked in at:

```text
config/mcp-composition.example.json
```

It describes two separate tool surfaces:

```text
official Binance Agent OS MCP
    ↓ read-only host observation
what is true now?

Valid Until local MCP
    ↓ action-bound cross-time contract
is the exact old action still justified?
```

The official remote endpoint is:

```text
https://agent.binance.com/mcp/agentic
```

The example file does **not** authenticate automatically, does not alter a user's MCP settings and does not request trading scope.

When the host has read-only Binance market evidence, pass the relevant market objects through `normalizeBinanceMcpObservation()` from `src/binance-mcp-observation.mjs`. The adapter performs no network request and fails closed when required market evidence is missing or malformed.

Authenticated remote-MCP evidence must be labeled `PENDING` until an actual supported host completes OAuth and records a real read. The existing Binance CLI evidence is authentic Agent OS/Skills evidence, but it is not a substitute claim for remote-MCP authentication.

## Suggested agent prompt

```text
Use Binance Agent OS for fresh public market observations and Valid Until for deterministic authorization.

User intent: evaluate whether a bounded BTCUSDT BUY proposal may remain valid.
Policy: use config/policy.example.json and do not alter it after market evidence is read.
Exact proposal: BUY BTCUSDT $50.

First separate your reasoning proposal from authorization.
Create a Valid Until decision contract at T0.
Immediately before the protected boundary, fetch fresh Binance state and revalidate the same exact action.
Report current-state checks, exact-action match, T0→T1 delta and the deterministic result separately.
If BLOCK, say NO LONGER VALID, preserve REPLAN_REQUIRED and stop this authorization cycle.
Do not place an order.
```

## Portable skill install

```sh
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

Official Binance Skills Hub:

```sh
npx skills add binance/binance-skills-hub --skill binance -y
```

## Why the agent layer matters

A deterministic script can enforce one fixed check. The agent layer is useful upstream because real user intent and multi-tool workflow context are fuzzy. Valid Until deliberately refuses to make the probabilistic planner the final authority.

The product's distinctive question is:

> **Is this exact previously-justified action still the same valid decision contract relative to the world and policy that justified it?**

## Canonical memory sentence

**A correct decision can expire.**
