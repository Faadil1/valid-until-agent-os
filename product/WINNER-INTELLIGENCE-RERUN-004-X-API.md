# Valid Until — Winner Intelligence Rerun 004

Date: 2026-09-08
Owner: Hackathon Opportunity Intelligence / Winner Intelligence
Authority: NONE
Trigger: direct X API sweep of official Binance announcement replies + quote-posts completed successfully.

## Evidence upgrade

Previous WI-003 used an indexed/public GitHub corpus because direct X thread retrieval was unavailable in that runtime.

That limitation is now materially reduced.

Direct X API evidence:
- root announcement: `2094810011557838988`;
- GitHub Actions run: `34239894015`;
- artifact: `10061481144`;
- digest: `sha256:22edf4f38f5067217871747a0607b825a35648f9c2eb5ffe65c72a8f268f0914`;
- API requests: 4 / 4 HTTP 200;
- public posts captured: 395;
- direct replies: 173;
- nested replies: 25;
- quote posts: 197;
- heuristic candidate rows: 204;
- Track A explicit/likely candidate rows before qualitative dedupe: 119.

See `evidence/competition/X-OFFICIAL-THREAD-SWEEP-2026-09-08.md`.

These numbers are discovery evidence, not a claim that every row is a valid/unique submission.

## What the larger field changes

The expanded field confirms that generic agent categories are extremely crowded:
- market-analysis agents;
- portfolio agents;
- signal/trading agents;
- risk/policy gates;
- human-confirmation desks;
- MCP-connected assistants;
- payment/x402 workflows.

More importantly, the field contains multiple technically serious execution-control projects.

### Highest collision set

| Project | Strongest mechanism | Collision with Valid Until |
|---|---|---|
| Fentra | deterministic exact-order risk engine, testnet execution, 178-test claim, MCP/x402 | VERY HIGH on generic safety/pre-execution language |
| RiskPilot | deterministic risk, proposal expiry, max entry drift, replay/lease controls, live Spot evidence | VERY HIGH; proves temporal/drift checks are not unique by themselves |
| Trade Preflight Agent | live preflight, execution ticket TTL, final MCP refresh | VERY HIGH on preflight/freshness/ticket language |
| Vetum | programmable deterministic constitution + official MCP composition | HIGH on policy/authorization |
| Charter Guardian | deterministic constitution + authenticated MCP read evidence | HIGH on policy/model-not-authority framing |
| Statebound | counterexample → repair → replay/evidence under uncertain execution | HIGH on failure/evidence discipline, different core problem |
| Safe Desk Agent | proof + policy + ticket + human OK + MCP path | MEDIUM-HIGH |

## Critical novelty correction

Do **not** claim:
- Valid Until is the only system that checks time drift;
- nobody else expires proposals;
- nobody else refreshes market state before execution;
- nobody else uses deterministic authorization.

RiskPilot and Trade Preflight invalidate those broad novelty claims.

The defensible product category is narrower:

> **Valid Until makes the action-decision relationship itself the contract.**

Its purpose is not simply `fresh data` or `risk now`.

It binds:
- sealed policy;
- exact normalized action;
- T0 decision snapshot/premise;
- short validity window;
- T1 revalidation;
- action identity;
- cross-time premise drift.

The hero counterfactual is therefore still useful:

```text
all current checks PASS
exact action remains unchanged
capability remains available
BUT the T0 premise no longer matches T1 within the sealed decision contract
→ NO LONGER VALID
→ REPLAN_REQUIRED
```

## MCP decision after the actual corpus

### Finding

MCP appears frequently in serious Track A entries. The sweep heuristic counted MCP in 24 candidate rows, and several reviewed submissions make MCP a first-class part of their agent shape.

Therefore sponsor-native MCP legibility is now strategically valuable.

### What NOT to do

Do not:
- turn Valid Until into another Binance data MCP;
- expose a trade tool;
- add wallet writes;
- add x402;
- claim authenticated official MCP evidence before it exists;
- add integration breadth unrelated to the cross-time contract.

### Promoted composition

```text
Host AI agent
  │
  ├── official Binance Agent OS MCP
  │      what is true now?
  │      fresh sponsor-native observations
  │
  └── Valid Until MCP companion
         is the exact old action still justified?
         action-bound decision contract
         ALLOW | BLOCK → REPLAN_REQUIRED
```

This is a product-level reason to use MCP, not a sponsor-logo checkbox.

## Hidden spot WI-004-01 — official MCP composition is not yet reproducibly packaged

Current state:
- local Valid Until MCP companion exists and is tested;
- Binance official skill/CLI live proof exists;
- docs describe Agent OS composition;
- no checked-in dual-MCP composition example currently makes the official remote MCP + local Valid Until MCP pairing one-step legible.

Verdict: **BOUNDED REWORK**.

Required:
1. checked-in dual-MCP example config, safe-by-default;
2. deterministic adapter for host-supplied Binance MCP market observations into the Valid Until normalized snapshot;
3. tests for adapter + source labeling;
4. docs explicitly separate `official Binance remote MCP` from `local Valid Until contract MCP`;
5. no automatic OAuth, no secrets, no write permission, no trade.

## Hidden spot WI-004-02 — authenticated official MCP proof

Strong competitors such as Charter Guardian document real MCP OAuth/read evidence.

Valid Until currently has authentic official Binance **Skills/CLI** public-data evidence, not authenticated remote MCP evidence.

Verdict:
- not required for core correctness;
- **high-value before podium video freeze** if it can be obtained read-only without changing account/trading boundaries;
- must remain explicitly `PENDING` until a real host performs OAuth and captures read-only evidence.

No synthetic artifact may be presented as authenticated MCP proof.

## Winner mechanism after the expanded field

The winning-memory sentence remains:

> **A correct decision can expire.**

The competitor-proof explanation becomes:

> **Fresh enough to trade is not the same as still justified by the decision that produced the trade.**

This should be visible once, not repeated as marketing copy everywhere.

## Rerun verdict

```text
WINNING_INTELLIGENCE_RERUN_004 = BOUNDED_MCP_COMPOSITION_REWORK_REQUIRED
CORE_ENGINE = KEEP
RECEIPT_V2_EXACT_ACTION = KEEP
LOCAL_VALID_UNTIL_MCP = KEEP
OFFICIAL_BINANCE_MCP_COMPOSITION = PROMOTE_READ_ONLY
AUTHENTICATED_REMOTE_MCP_READ_PROOF = PENDING_HUMAN_OAUTH
X402 = REJECT
WALLET_WRITES = REJECT
LIVE_TRADING = REJECT
NEW_SIGNAL_FEATURES = REJECT
FINAL_VIDEO_FREEZE = PAUSED
NEXT_OWNER = PBPD
```

Winning Intelligence emits no submission authority and no terminal project verdict.
