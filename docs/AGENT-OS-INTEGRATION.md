# Agent OS integration

Valid Until is packaged as an **agent skill + deterministic execution-validity boundary** for Binance Agent OS workflows.

## Sponsor-native role separation

```text
AI agent host
  interprets intent + proposes an exact action
        ↓
Binance Agent OS / official Binance skill
  supplies fresh Binance observations + capability surface
        ↓
Valid Until
  binds the T0 premise + deterministically revalidates the exact action at T1
        ↓
ALLOW / BLOCK
```

This is intentionally different from both generic permissioning and a current-state-only preflight:

- Binance permissions answer **what capabilities the agent may use**;
- a current-state preflight asks **whether conditions are acceptable now**;
- Valid Until asks **whether this exact previously-justified action still belongs to the state/policy premise that justified it**.

The same probabilistic model that proposes an action is not allowed to self-authorize it.

## Portable skill install

The canonical portable skill lives at:

`skills/valid-until/SKILL.md`

Install Valid Until in a supported agent environment:

```sh
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

Install the official Binance skill alongside it:

```sh
npx skills add binance/binance-skills-hub --skill binance -y
```

The top-level [`AGENTS.md`](../AGENTS.md) defines the host-agent orchestration contract.

## Why this qualifies as Agent OS work

Binance Agent OS is the broader toolkit for agent access to Binance capabilities. Valid Until uses the official Binance CLI / Skills path for live public market evidence and is designed to sit at the reasoning→action boundary in an Agent OS workflow.

Agent OS supplies the sponsor-native state/capability substrate. Valid Until adds a short-lived cross-time validity contract that Agent OS's generic capability permission does not replace.

## Recommended judge setup

### 1. Install official Binance + Valid Until skills

```sh
npx skills add binance/binance-skills-hub --skill binance -y
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

Verify the Binance CLI if using the local live proof:

```sh
binance-cli --version
```

Public market-data reads used by Valid Until require no Binance API key.

### 2. Use a bounded agent prompt

```text
Use the Valid Until skill with Binance Agent OS.
Evaluate whether a bounded BTCUSDT proposal remains valid under config/policy.example.json.
Do not alter policy after market evidence is read.
Keep reasoning/proposal separate from deterministic authorization.
Show T0 state, T1 state, cross-time drift and the exact validity result.
If BLOCK, report NO LONGER VALID and require fresh reasoning.
Do not place any order or request account credentials.
```

### 3. Run the live read-only proof

```sh
npm run live -- BTCUSDT
```

The command:

1. seals policy before any market read;
2. captures a Binance snapshot through `binance-cli`;
3. evaluates initial eligibility;
4. issues a short-lived signed decision receipt bound to policy + exact T0 snapshot;
5. captures fresh Binance state after the recheck delay;
6. validates current conditions **and the T0→T1 cross-time delta**;
7. returns `ALLOW` or `BLOCK` with exact invariant results.

No execution adapter is implemented in this submission.

## Signature counterfactual

The controlled demo deliberately keeps the T1 current-market checks acceptable while the original T0 premise expires:

```text
current spread       PASS
current movement     PASS
current depth        PASS
receipt freshness    PASS
policy/signature     PASS

T0 -> T1 mid drift   FAIL

=> NO LONGER VALID
```

This is the strongest reason the product is not reducible to another “check the market right before trade” gate.

## Safety boundary

- public/read-only Binance data only;
- no live order placement;
- no funding or wallet write;
- no account secrets;
- no geographic bypass;
- `BLOCK` cannot be overridden by model prose;
- `ALLOW` is not a profit, recommendation or financial-safety claim.
