# Agent OS integration

Valid Until is packaged as an **agent skill + deterministic MCP execution-validity boundary** for Binance Agent OS workflows.

## Sponsor-native role separation

```text
AI agent host
  interprets intent + proposes an exact action
        │
        ├── Binance Agent OS / official Binance skill
        │     supplies fresh Binance observations + capability surface
        │
        └── Valid Until MCP companion
              seals policy + T0 state + exact action
              revalidates exact action against T1
                    ↓
               ALLOW / BLOCK
                    ↓
          BLOCK => REPLAN_REQUIRED
```

This is intentionally different from generic permissioning, reasoning verification and current-state-only preflight:

- Binance permissions answer **what capabilities the agent may use**;
- reasoning verification asks **whether the model's reasoning/evidence is sound**;
- current-state preflight asks **whether conditions are acceptable now**;
- Valid Until asks **whether this exact previously-justified action is still the same valid contract relative to the state/policy premise that justified it**.

The same probabilistic model that proposes an action is not allowed to self-authorize it.

## Portable skill install

Canonical skill:

`skills/valid-until/SKILL.md`

Install Valid Until:

```sh
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

Install the official Binance skill alongside it:

```sh
npx skills add binance/binance-skills-hub --skill binance -y
```

The top-level [`AGENTS.md`](../AGENTS.md) defines the host-agent orchestration contract.

## Valid Until MCP companion

Start the local stdio server:

```sh
npm run mcp
```

The server is dependency-free and exposes exactly two tools.

### `valid_until_begin`

Input:

```json
{
  "policy": { "...": "Valid Until policy" },
  "snapshot": { "...": "normalized T0 Binance snapshot" },
  "action": {
    "symbol": "BTCUSDT",
    "side": "BUY",
    "notional_usdt": 50
  }
}
```

It:

1. validates/normalizes the action;
2. seals the policy;
3. evaluates T0 market + action eligibility;
4. issues `valid-until.receipt.v2`;
5. signs the policy hash, T0 snapshot hash **and exact action hash**;
6. returns a `decision_id` and validity deadline.

### `valid_until_revalidate`

Input:

```json
{
  "decision_id": "...",
  "current_snapshot": { "...": "normalized T1 Binance snapshot" },
  "action": {
    "symbol": "BTCUSDT",
    "side": "BUY",
    "notional_usdt": 50
  }
}
```

It verifies:

- receipt signature;
- policy identity;
- exact action identity;
- receipt age;
- T0→T1 drift;
- current spread/movement/liquidity;
- action remains within policy.

Terminal machine states:

```text
ALLOW  -> ACTION_REMAINS_VALID
BLOCK  -> REPLAN_REQUIRED
```

### Why the companion does not call Binance directly

This is deliberate composition, not missing integration.

Binance Agent OS owns Binance observations/capabilities. The host agent obtains fresh Binance state through that sponsor-native surface. Valid Until receives normalized evidence and owns only the execution-validity contract.

That prevents the project from hand-rolling another Binance client inside its MCP or accumulating financial scopes merely for optics.

The Valid Until MCP has no tools for:

- order placement/cancellation;
- account balances;
- transfers;
- Agentic Wallet writes;
- x402 payments;
- funding;
- withdrawals.

## Why this qualifies as Agent OS work

Binance Agent OS is the sponsor-native capability substrate. Valid Until composes with it at the reasoning→action boundary:

```text
Agent OS makes fresh Binance capabilities available.
Valid Until determines whether the exact old action is still authorized by its old decision context.
```

The local live evidence path also uses official `binance-cli` for public Binance market data instead of a hand-rolled REST client.

## Recommended judge setup

### 1. Install official Binance + Valid Until skills

```sh
npx skills add binance/binance-skills-hub --skill binance -y
npx skills add Faadil1/valid-until-agent-os --skill valid-until -y
```

### 2. Run deterministic + MCP assurance

```sh
npm run test:all
```

Expected high-level evidence:

```text
PASS 8/8 core
PASS 6/6 challenge suite
PASS MCP 5/5
```

### 3. Use a bounded host-agent prompt

```text
Use Binance Agent OS for fresh public market observations and Valid Until for deterministic authorization.
Exact proposal: BUY BTCUSDT $50.
Do not alter policy after market evidence is read.
Create a decision contract at T0, then obtain fresh state at T1 and revalidate the same exact action.
Show current-state checks, action_hash_match and T0→T1 drift separately.
If BLOCK, report NO LONGER VALID and REPLAN_REQUIRED.
Do not place an order.
```

### 4. Run the live read-only authenticity proof

```sh
VALID_UNTIL_ACTION_NOTIONAL_USDT=50 npm run live -- BTCUSDT
```

The command:

1. seals policy before market read;
2. binds the representative exact action;
3. captures Binance public state through `binance-cli`;
4. issues action-bound receipt v2;
5. captures fresh Binance state after the recheck delay;
6. validates current conditions, exact action identity and T0→T1 delta;
7. returns `ALLOW` or `BLOCK`.

No execution adapter is implemented.

## Two signature adversarial proofs

### Cross-time premise expiry

```text
current spread       PASS
current movement     PASS
current depth        PASS
receipt freshness    PASS
policy/signature     PASS
exact action         PASS

T0 -> T1 mid drift   FAIL

=> NO LONGER VALID / REPLAN_REQUIRED
```

### In-policy action mutation

```text
policy cap           $100
T0 action            BUY BTCUSDT $50
T1 action            BUY BTCUSDT $75
notional policy      PASS
exact action hash    FAIL

=> BLOCK / REPLAN_REQUIRED
```

The second case proves that “inside the same policy” does not mean “inherits the same authorization.”

## Safety boundary

- public/read-only Binance data only;
- no live order placement;
- no funding or wallet write;
- no x402 payment;
- no account secrets;
- no geographic bypass;
- `BLOCK` cannot be overridden by model prose;
- `ALLOW` is not a profit, recommendation or financial-safety claim.
