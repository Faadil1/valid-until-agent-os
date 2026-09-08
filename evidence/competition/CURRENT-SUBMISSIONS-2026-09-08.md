# Valid Until — Current Track A Submission Landscape

Date: 2026-09-08
Owner: Hackathon Opportunity Intelligence / Winning Intelligence
Authority: NONE
Research mode: current public evidence only
Purpose: same-competition collision and open-space analysis before final video freeze

This is a **sampled current-public landscape**, not a claim that every Track A submission has been discovered. GitHub exact-phrase searches and current public submission surfaces expose dozens of Agent OS projects. The goal here is to identify the strongest collisions around Valid Until's mechanism, not to rank every entrant.

## Official event context

Track A asks builders to build an AI agent with Binance Agent OS and submit a video/demo plus GitHub where applicable. The prize pool is $20,000 USDC: $2,000 first, $1,500 second, $1,000 third, then $300 for the next 50 winners.

Official source: https://www.binance.com/en/blog/community/8802181509900814931

## Current same-event sample

| Project | Observed surface | Strongest mechanism | Collision with Valid Until | What not to copy |
|---|---|---|---|---|
| DriftMate — `tmdry4530/driftmate-agent-os` | deterministic portfolio rebalancing + on-chain AgentVault + custom skill | hard on-chain permission/budget enforcement; LLM explains but cannot form authority | MEDIUM-HIGH — also separates probabilistic explanation from deterministic execution control | on-chain vault scope, character/Live2D surface, portfolio-rebalancing concept |
| Trade Preflight Agent — `hcleollee/trade-preflight-agent` | live order-book preflight, limits, slippage, allocation, human confirmation, short-lived execution ticket | deterministic current-state preflight immediately before order | **HIGH** — closest same-event competitor; even refreshes market state before a one-time MCP order | generic PASS/WARN/BLOCK preflight, portfolio-risk matrix, human-confirm gate as headline |
| Proof Before Trade — `mchr2314/proof-before-trade` | historical analog replay, local MCP tools, deterministic verdict + receipt | leakage-safe historical evidence and explicit Agent OS attestation | MEDIUM — overlaps evidence/receipts, not temporal action validity | historical analog analysis, MCP server merely for optics |
| Keel / SafeLane — `rishu4436/keel` | broad Agentic Wallet workflows: swap, approvals, Earn, x402, prediction, token audit | sponsor-surface breadth + hard confirm gates | LOW-MEDIUM — broad safety/governance, but different product job | adding many Binance surfaces just to look integrated |
| Tollgate — `thisishaidee/tollgate` | x402 evidence purchase + Binance token audit/info + deterministic risk dossier | sponsor-native payment primitive becomes product flow | LOW | x402/payment layer, token-risk product |
| ProofGate — `sergepoliakov/proofgate-agent-os` | live market evidence → Trade Readiness Passport | current-state risk/readiness with auditable thresholds | MEDIUM | trade-readiness/passport framing |
| AlphaPilot — `chenxiaoyi6688/alphapilot-binance-agent-os` | multi-asset scan → TRADE/WAIT/NO_ENTRY + user-confirmed spot path | polished readiness story + real MCP execution evidence | MEDIUM | “when to trade” framing, signal/ranking product |
| Safe Trade Copilot — `sniper-agent/safe-trade-copilot` | analyst + risk role + human confirmation | role separation and live MCP market read | MEDIUM-LOW | second LLM as risk authority |
| ALPS Guard — `ahm21st/ALPS-Guard` | security firewall → risk score → ALLOW/CONFIRM/BLOCK | generic multi-signal risk gate | LOW | 0–100 risk score / generic safety firewall |
| Guardrail Desk — `tokyoville741-debug/guardrail-desk` | market brief + risk rules + human confirmation | bounded order size and account safety rules | LOW | generic GO/NO-GO controls |
| Binance-Agent — `KattyFury/Binance-Agent` | deterministic signal prefilter → Claude confirmation/rejection → optional order | full loop and visible event log | LOW-MEDIUM | AI signal confirmation / strategy product |

## Adjacent ecosystem collision — must not be ignored

### ThoughtProof Sentinel

Binance Skills Hub currently has an open PR proposing **ThoughtProof Sentinel**, described as a pre-execution verification layer for AI trading agents. It verifies whether the agent's reasoning is supported by evidence and returns `ALLOW`, `BLOCK`, or `UNCERTAIN`; the PR also claims live experimental evidence and a re-plan loop.

Source: https://github.com/binance/binance-skills-hub/pull/279

This is not treated here as a verified same-event placement or winner. It **is** a material category collision because it already occupies language such as:

`pre-execution verification → reasoning/evidence check → ALLOW/BLOCK`

Therefore Valid Until must not present itself merely as “a verifier before execution.”

## The open space that survives the collision scan

The strongest remaining gap is **cross-time decision validity**:

```text
T0 reasoning can be correct
+ T1 current market checks can still look acceptable
+ capability/permission can remain available
BUT
T1 can be materially different from the exact state that justified the T0 action
→ original action contract expires
```

This is different from three crowded categories:

1. **Reasoning verification** — “Was the model's reasoning/evidence sound?”
2. **Current-state preflight/risk** — “Is this action acceptable under the market and limits now?”
3. **Capability permissioning** — “May this agent call this capability / spend this amount?”

Valid Until's distinct question is:

> **Does this exact previously-justified action still belong to the state and policy context that justified it?**

## The existing fixture already proves the distinction

In the controlled hero replay at T1:

- current spread = `0.37 bps` → PASS under `8 bps` limit;
- current absolute 1m return = `47.2 bps` → PASS under `80 bps` limit;
- current top-5 bid depth = `$171k` → PASS under `$50k` minimum;
- current top-5 ask depth = `$168k` → PASS under `$50k` minimum;
- receipt age = `3s` → PASS under `5s` limit;
- receipt signature = PASS;
- policy hash = PASS;
- **mid-price drift from the decision state = `35.47 bps` → FAIL against `20 bps`.**

So a generic “is the market acceptable right now?” control can still pass while Valid Until returns `BLOCK` because the **premise moved relative to T0**.

This should become a visible judge-facing counterfactual, not remain buried in JSON.

## Competition conclusions

### Saturated / avoid

- trade-readiness agents;
- generic risk scoring;
- prompt-injection firewall as product headline;
- “AI decides whether to trade”;
- human-confirmation gate as main novelty;
- broad wallet/x402/DeFi integration for integration-count optics;
- generic audit receipts;
- second LLM critic / risk officer;
- generic market anomaly detection.

### Defensible / strengthen

- exact T0→T1 state binding;
- decision validity that can expire even when current-state checks still pass;
- deterministic authority beneath the model;
- short-lived exact-action contract;
- explicit separation of Binance capability permission from action validity;
- portable Agent OS skill integration;
- failure as the hero moment;
- repeatable negative-path evaluation.

## Collision verdict

`CURRENT_EVENT_COLLISION = MATERIAL_BUT_SURVIVABLE`

`GENERIC_PRE_EXECUTION_VERIFICATION_POSITIONING = REJECT`

`CROSS_TIME_EXACT_ACTION_VALIDITY_POSITIONING = DEFENSIBLE_OPEN_SPACE`

`FINAL_VIDEO_FREEZE = HOLD_UNTIL_BOUNDED_WINNING_INTELLIGENCE_REWORK`
