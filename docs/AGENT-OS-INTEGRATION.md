# Agent OS integration

Valid Until is designed as an execution-integrity skill used by an AI agent alongside Binance Agent OS capabilities.

## Why this qualifies as Agent OS work

Binance Agent OS is the broader toolkit that includes Binance APIs, the MCP server, Agentic Wallet, x402 and the Binance Skills Hub. The official Binance `binance` skill uses `binance-cli` as its command surface.

Valid Until uses that official CLI for live public market data and adds a deterministic validity boundary between probabilistic agent reasoning and any later consequential action.

## Recommended judge setup

### 1. Install the official Binance Skills Hub

```sh
npx skills add binance/binance-skills-hub
```

Select the Binance skill, or install the relevant skill according to the current Binance Skills Hub instructions.

Verify:

```sh
binance-cli --version
```

Public market-data reads used by Valid Until require no Binance API key.

### 2. Give the AI agent access to this repository

The repository includes `SKILL.md`. A SKILL.md-capable agent such as Codex or Claude Code can read it as the operating contract for the Valid Until workflow.

### 3. Use a bounded prompt

Example:

```text
Use the Valid Until skill and the Binance Agent OS / Binance Skills toolchain.
Evaluate BTCUSDT under the sealed policy in config/policy.example.json.
Do not place any order or request account credentials.
Show the reasoning proposal separately from the deterministic validity result.
If the result is BLOCK, report NO LONGER VALID and require fresh reasoning.
```

### 4. Run the live read-only proof

```sh
npm run live -- BTCUSDT
```

The command:

1. seals the policy before market data is read;
2. captures a Binance market snapshot through `binance-cli`;
3. issues a short-lived signed decision receipt;
4. captures fresh Binance state after the recheck delay;
5. returns `ALLOW` or `BLOCK` with exact invariant results.

No execution adapter is implemented in this submission.

## Separation of responsibility

| Layer | Responsibility |
|---|---|
| AI agent | Interpret the user's request, reason over context, propose an action |
| Binance Agent OS / Skills | Supply Binance capabilities and live market data |
| Valid Until | Deterministically decide whether the previously proposed action is still valid under the sealed conditions |
| User / execution system | Any consequential execution outside this read-only hackathon proof |

The key design choice is that the same probabilistic model that proposes an action is not allowed to self-authorize it.
