# Binance Agent OS — official X thread sweep

Captured: 2026-09-08
Source root: `https://x.com/binance/status/2094810011557838988`
Collector owner: `Faadil1/hackathon-opportunity-intelligence`
Collection mode: X API v2, public read only

## Retrieval evidence

GitHub Actions run: `34239894015`

Artifact:
- id: `10061481144`
- name: `binance-agent-os-x-sweep-1`
- digest: `sha256:22edf4f38f5067217871747a0607b825a35648f9c2eb5ffe65c72a8f268f0914`

The collector used four bounded API requests:
- recent-search pages for the announcement conversation;
- quote-post pages for the announcement post.

All four requests returned HTTP 200.

## Raw corpus

Public posts captured: **395**

Relationship counts:
- direct replies: **173**
- nested replies: **25**
- quote posts: **197**

The heuristic marked **204** rows as submission candidates. This number is a discovery count, **not** a count of valid hackathon submissions; spam, duplicates, reshares, incomplete posts and ambiguous entries remain possible.

Among candidates, the first-pass track classifier produced:
- Track A explicit: **102**
- Track A likely: **17**
- Track B explicit: **28**
- Track B likely: **5**
- unknown: **52**

Therefore the qualitative Track A review starts from **119 explicit/likely rows**, then deduplicates and checks linked demos/repos manually.

## First-pass candidate themes

Heuristic theme counts among all candidate rows:
- portfolio: 29
- execution control: 27
- market data: 25
- MCP: 24
- trading signal: 23
- research / analysis: 23
- monitoring / alerts: 16
- wallet / payment: 12
- skills: 7
- multi-agent: 1

Theme counts overlap and must not be treated as mutually exclusive categories.

## Material Track A collisions reviewed

### Fentra

Repo: `https://github.com/sniperchief/fentra`

Observed:
- AI proposes; deterministic risk engine authorizes;
- exact-order checks against live account/market state;
- testnet execution path;
- 178 tests claimed in repo;
- local MCP risk tools and x402 API.

Collision with Valid Until: **VERY HIGH** if Valid Until is described generically as a pre-execution safety/risk layer.

Key remaining distinction: Fentra's product question is whether an exact trade satisfies portfolio/risk conditions **right now**. Valid Until's product contract is whether a previously justified exact action still belongs to its sealed T0 premise after T1 changes.

### RiskPilot

Repo: `https://github.com/bobbymarc00/riskpilot`

Observed:
- deterministic scoring + deterministic risk + human-approved live Spot execution;
- Agent OS/MCP read and protected execution paths;
- proposal expiry, execution leases, replay protection;
- max entry drift is explicitly part of the guardrail set;
- public demo claims a real-funds Spot lifecycle.

Collision with Valid Until: **VERY HIGH** and the closest warning against overstating novelty. RiskPilot includes temporal/drift controls.

Implication: Valid Until must not claim that cross-time checking is absent elsewhere. Its defensible distinction is that **the action-bound decision contract itself is the product primitive**, generalized across exact-action identity, sealed policy, freshness and premise-state drift, rather than one guard inside a larger trading copilot.

### Trade Preflight Agent

Repo: `https://github.com/hcleollee/trade-preflight-agent`

Observed:
- deterministic order-book/slippage/allocation preflight;
- short-lived execution ticket;
- final refresh before an MCP order;
- Agent OS orchestration contract;
- public demo intentionally no-trade.

Collision: **VERY HIGH** on `preflight`, `freshness`, `execution ticket` and `deterministic control` language.

Distinction to preserve: current-state preflight can still pass while the **relationship between T0 premise and T1 state** violates the decision contract.

### Vetum

Repo: `https://github.com/Ebubechukwucyber/vetum`

Observed:
- programmable strategy constitution;
- deterministic ALLOW / DENY / CONFIRM;
- portable skill;
- documented official Binance MCP composition;
- policy layer is the product.

Collision: **HIGH** on deterministic authorization/policy and Agent OS integration; **LOWER** on cross-time premise binding.

### Charter Guardian

Repo: `https://github.com/Agozie180/Charter-Guardian`

Observed:
- user-authored constitution compiled to deterministic policy;
- optional LLM proposes, policy decides;
- repo records authenticated Binance MCP read evidence;
- quarantine / repeated violation model.

Collision: **HIGH** on policy/constitution and model-not-authority framing; **LOWER** on decision expiry relative to prior market state.

### Statebound

Repo: `https://github.com/tang-vu/statebound`

Observed:
- failure-first execution workbench;
- lost reply + stale balance + duplicate retry counterexample;
- structural repair + exact replay + evidence export;
- strong evaluation corpus and transparent simulation boundaries;
- public Binance CLI reads, no hosted MCP connection claimed.

Collision: **HIGH** on failure-boundary/evidence/replay discipline; problem differs: uncertain execution/retry state rather than expiry of a previously justified market action.

### Safe Desk Agent

Repo: `https://github.com/scanner72/safe-desk-agent`

Observed:
- proof + policy + ticket + exact human confirmation;
- official MCP path documented;
- dry-run default;
- portfolio risk / setup evaluation.

Collision: **MEDIUM-HIGH** on human-gated pre-execution workflow, lower on cross-time contract.

## Important correction to earlier Winner Intelligence

Earlier scans could only describe the field as `current-public / indexed`. That limitation is now materially reduced: this artifact directly queried the official announcement conversation and quote-post surface through X API.

It is still **not exhaustive** because protected/deleted/unavailable posts, API visibility rules, duplicates and posts outside the root thread can be absent.

## Distinctive category after the sweep

Do not position Valid Until as:
- generic safety layer;
- generic preflight;
- deterministic risk engine;
- policy constitution;
- short-lived ticket;
- simple price-drift guard.

Position it as:

> **an action-bound decision contract across time**

The signature proof remains:

```text
CURRENT T1 CHECKS = PASS
EXACT ACTION = SAME
PERMISSION = AVAILABLE
BUT
SEALED T0 PREMISE ↔ T1 STATE = OUTSIDE CONTRACT

→ NO LONGER VALID
→ REPLAN_REQUIRED
```

This is a narrower and more defensible distinction after observing the actual same-event field.

## MCP conclusion from the corpus

MCP is common enough in serious Track A submissions that absence weakens Agent OS legibility, but adding a generic MCP does not create differentiation.

Promoted architecture:

```text
Host AI agent
  ├── official Binance Agent OS MCP → fresh Binance observations
  └── Valid Until MCP companion → begin/revalidate action-bound decision contract

Valid Until never duplicates Binance market-data tools and never exposes a trading tool.
```

This is the useful MCP integration: **Binance MCP answers what is true now; Valid Until answers whether what is true now still validates the exact action decided then.**
