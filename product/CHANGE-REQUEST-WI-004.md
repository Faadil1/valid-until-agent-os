# Change Request WI-004 — Dual MCP read-only composition

Date: 2026-09-08
Source: `product/WINNER-INTELLIGENCE-RERUN-004-X-API.md`
Owner for implementation: PBPD
Scope class: BOUNDED_AGENT_OS_COMPOSITION_REWORK

## Purpose

Make the sponsor-native Agent OS composition reproducible without widening financial authority.

The rework must strengthen the existing action-bound decision contract only.

## Frozen product invariants

MUST NOT CHANGE:
- `Reasoning is not authorization.`
- `A correct decision can expire.`
- action-bound receipt v2;
- deterministic final authority;
- `NO LONGER VALID` + `REPLAN_REQUIRED` failure path;
- controlled-vs-live evidence separation;
- no trading/funding/wallet write/x402;
- no generic risk score;
- no second LLM critic;
- no major UI redesign.

## CR-004-01 — dual MCP composition example

Add a checked-in **example** configuration that shows:
- official Binance Agent OS remote MCP as the observation/capability surface;
- local Valid Until stdio MCP as the deterministic decision-contract surface.

The example must not auto-run OAuth or write a user `.mcp.json` file.

It must contain no secrets and no account identifiers.

## CR-004-02 — Binance MCP observation adapter

Add a dependency-free adapter accepting host-supplied public market observation objects and producing `valid-until.market.v1`.

Minimum required observation components:
- symbol;
- best bid / best ask;
- top depth levels;
- two 1m closed bars or equivalent close values;
- server timestamp.

The adapter must:
- validate finite numeric values;
- fail closed on missing/invalid fields;
- calculate mid, spread bps, top-5 bid/ask depth and 1m return exactly as the CLI normalizer does;
- label the source as host-supplied Binance Agent OS MCP evidence;
- perform no network request itself.

## CR-004-03 — tests

CI must prove:
- a valid MCP-shaped fixture normalizes to the expected canonical market snapshot;
- invalid/missing observation data fails closed;
- source labeling clearly identifies MCP-host-supplied evidence;
- existing core, challenge and MCP companion tests continue to pass.

## CR-004-04 — documentation

Update Agent OS docs / host-agent contract to make the distinction explicit:

```text
Binance MCP = observe sponsor-native fresh state
Valid Until MCP = begin/revalidate exact action-decision contract
```

Do not claim authenticated remote-MCP evidence until it exists.

## CR-004-05 — optional authenticated read proof

After source rework + CI + deploy + TRACE delta:
- a human may connect the official Binance MCP through a supported OAuth host;
- read-only market evidence may be captured;
- no trade/write/funding action is required or authorized.

Until a real capture exists:

`AUTHENTICATED_REMOTE_MCP_READ_PROOF = PENDING`

## Exit criteria

1. example dual-MCP config exists;
2. MCP market observation adapter exists;
3. adapter tests pass;
4. full existing CI remains green;
5. docs do not confuse local Valid Until MCP with official Binance MCP;
6. no financial write scope was added;
7. Vercel remains healthy;
8. TRACE delta review passes before final video freeze.

## Routing

`WI-004 → PBPD BOUNDED IMPLEMENTATION → CI → VERCEL → TRACE DELTA → WI FINAL RECHECK → TRACE 6.75 VIDEO`

No terminal authority is emitted.
