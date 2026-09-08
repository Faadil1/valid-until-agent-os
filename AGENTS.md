# Valid Until — Agent Orchestration Contract

This repository is a **Binance Agent OS Track A agent workflow** with a deterministic execution-validity boundary.

The AI agent is useful for interpreting intent, selecting Binance observations and proposing an exact action. It is **not** the authority that decides whether its own old proposal may still proceed.

## Roles

```text
Human
  defines / accepts bounded policy
        ↓
AI agent host
  interprets intent + proposes exact action
        ↓
Binance Agent OS / official Binance skill
  supplies fresh Binance observations + capability surface
        ↓
Valid Until
  binds T0 decision context + revalidates at T1
        ↓
ALLOW / BLOCK
```

In this hackathon repository, execution stops at the validity result. No order-placement adapter is implemented.

## Required agent behavior

When the user asks for a Binance action or an evaluation that could lead to an action:

1. Read `skills/valid-until/SKILL.md`.
2. Keep the user's policy/limits explicit and immutable inside the authorization cycle.
3. Use the official Binance Agent OS / Binance Skills toolchain for market observations.
4. Keep reasoning/proposal separate from deterministic authorization.
5. Propose an exact symbol + bounded notional rather than vague prose.
6. Run the Valid Until evidence path.
7. If the deterministic result is `BLOCK`, report **NO LONGER VALID** and require fresh reasoning from fresh state.
8. Never weaken the policy, silently resize the trade, switch symbols or retry stale evidence merely to obtain `ALLOW`.
9. Never claim `ALLOW` means profit, financial safety or a recommendation.
10. Never place an order, transfer funds, request account credentials or bypass a geographic/product restriction in this submission.

## Suggested agent prompt

```text
Use the Valid Until skill with Binance Agent OS.

User intent: evaluate whether a bounded BTCUSDT BUY proposal may remain valid.
Policy: use config/policy.example.json and do not alter it after market evidence is read.

First separate your reasoning proposal from authorization.
Use Binance public market data through the official Binance toolchain.
Then run Valid Until's deterministic validity workflow.
Report T0 state, T1 state, cross-time delta and exact failed invariants.
If BLOCK, say NO LONGER VALID and stop. Do not place an order.
```

## Portable skill install

From a supported agent environment:

```sh
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

Then ask the agent to use the `valid-until` skill alongside the official Binance skill.

Official Binance Skills Hub install:

```sh
npx skills add binance/binance-skills-hub --skill binance -y
```

## Why the agent layer matters

A deterministic script can enforce one fixed check. The agent layer is useful upstream because real user intent and multi-tool workflow context are fuzzy. Valid Until deliberately refuses to make the probabilistic planner the final authority.

The product's distinctive question is not simply “is the market safe now?” or “was the reasoning good?” It is:

> **Is this exact previously-justified action still valid relative to the world and policy that justified it?**

## Canonical memory sentence

**A correct decision can expire.**
