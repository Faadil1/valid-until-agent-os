# Judge matrix

This matrix is optimized for **Problem → Pain → Execution → Story → Demo** legibility while keeping solution quality separate from presentation polish. It is reconciled to PRD v0.4, the historical authenticated Spot Testnet proof, and the TRACE-approved B+C judge surface.

| Judge question | Valid Until answer | Proof |
|---|---|---|
| What problem does this solve? | An agent can retain execution authority after the state that justified its exact decision has materially changed. | controlled T0→T1 replay |
| Why does that hurt? | Capability/permission may remain available while the premise behind the old exact action has expired, so a previously correct decision can become the wrong action to execute now. | hero replay + claim-boundary narrative |
| What is the memorable mechanism? | **A correct decision can expire.** Valid Until seals policy + T0 state + exact action, then revalidates that same contract against fresh T1 state. | receipt v2 + revalidation engine |
| Is Agent OS materially used? | Yes — Binance Agent OS / official Binance tools supply sponsor-native observations and capability; Valid Until is the separate deterministic action-validity contract. The bounded Spot Testnet proof shows an ALLOW crossing a real non-production execution boundary. | `AGENTS.md`, MCP composition, historical Testnet receipt |
| Is this more than a chatbot? | Yes — the LLM/agent proposes; deterministic policy commitment, exact-action binding, receipt verification and cross-time revalidation own execution validity. | `AGENTS.md`, `src/policy.mjs`, `src/receipt.mjs` |
| Why not just a limit order or stop-loss? | Those encode standing price/execution instructions. Valid Until asks whether the exact old action still belongs to the policy/state premise that produced it. | T0/T1 decision contract |
| Why not a generic current-state preflight? | A preflight asks whether the action is acceptable now. Valid Until asks whether **this exact previously-justified action is still justified by the decision contract that produced it**. | counterfactual: `PASS 4/4` + action `MATCH` while premise `FAIL 35.47 > 20 BPS` |
| Why not 20–30 lines of checks? | Individual checks are intentionally simple. The product primitive is the contract across time: sealed policy + T0 premise + exact action identity + receipt integrity + T1 relationship + `REPLAN_REQUIRED`, with reproducible evidence and an agent-native boundary. | receipt v2 + deterministic suite + MCP contract |
| Why use an AI agent at all? | Human intent and workflow context are fuzzy; the agent interprets/proposes. Valid Until deliberately refuses to let the probabilistic planner authorize itself. | portable skill + Agent OS architecture strip |
| Can it fail safely? | Yes — stale, drifted, tampered, expired, policy-mismatched or exact-action-mismatched states become `BLOCK → REPLAN_REQUIRED`. | deterministic suite + 6-case red team |
| Is the negative path visible? | Yes — the controlled replay ends in `NO LONGER VALID` after 35.47 bps of T0→T1 drift against a 20 bps bound even though current-state checks remain acceptable and the exact action still matches. | deployed B+C hero replay |
| Is there authentic Binance evidence? | Yes — one historical authenticated Binance Spot Testnet `BUY BTCUSDT 10 test USDT` was executed under `ALLOW`, returned order `13634770`, and the same clientOrderId `vu-mtswxiik-ecb6b093` was queried back as `FILLED`. It is non-production and uses no real funds. | `web/live-testnet-proof.json` + ATTEMPT-004 evidence |
| Does the current demo place another order? | No. The controlled replay creates no order. `/api/order-status` is a fixed known-order signed GET only; Cloudflare re-verifies the preserved order and Vercel fails closed on venue eligibility. | `/live-proof`, runtime reconciliation |
| What happens on a permitted `ALLOW` execution boundary? | The bounded executor is structurally reachable only after deterministic `ALLOW` and explicit human write authorization; the historical proof sent one Spot Testnet order and queried the exact same clientOrderId. | execution-boundary tests + historical receipt |
| What happens on `BLOCK`? | Zero executor calls. The cycle terminates `REPLAN_REQUIRED`; policy is not weakened to manufacture an `ALLOW`. | execution-boundary tests |
| Are claims bounded? | Yes — no profitability, alpha, reduced-loss, mainnet, real-money or production-readiness claim. Spot Testnet is explicitly non-production. | README + lifecycle + live-proof boundary text |
| Is the implementation feasible beyond a demo? | The core control uses deterministic checks, explicit failure states and bounded sponsor-native interfaces. Production persistence, operator thresholds, long-duration reliability and outcome proof remain explicitly unverified. | PRD + PBPD reconciliation |
| Did the team consider alternatives? | Yes — generic signal bots, trade-readiness/preflight agents, static permissions, stop-loss/limit-order framing, second-LLM risk judges and extra sponsor integrations were challenged or rejected where they did not strengthen the cross-time decision contract. | Prototype Killer + Winner Intelligence reruns |
| What should the judge remember tomorrow? | **The one where every current check stayed green and the action still matched, but the old exact decision had expired.** | final film contract |

## Three comparisons to answer crisply

**Current preflight:** `Is this action acceptable now?`  
**Permission layer:** `May the agent use this capability?`  
**Valid Until:** `Is this exact action still the same valid decision contract that was justified at T0?`

## Q&A attack answers

### “Isn’t this just a stop-loss?”
No. A stop-loss is an execution instruction triggered by price. Valid Until determines whether an already-justified exact action may inherit its old authorization after time/context changes.

### “Isn’t this just a pre-trade risk engine?”
No. Current risk can remain acceptable. The signature demo deliberately has current checks `PASS 4/4`; the block comes from the relationship between T0 and T1 exceeding the sealed decision premise.

### “Isn’t this 30 lines of Python?”
The arithmetic should stay small. The reusable primitive is the action-decision contract and its evidence discipline: policy, exact action, T0 premise, TTL/signature, T1 relationship, fail-closed terminal state, replayable receipt and agent-native lifecycle.

### “What does ALLOW mean?”
Only: **this exact action remains valid under the sealed invariants at this boundary**. It does not mean profitable, advisable, safe in every sense, or production-certified.

## Presentation rule

Do not lead with MCP, Ed25519, SHA-256, architecture breadth, the historical order ID or feature count. Lead with the failure and the `NO LONGER VALID` consequence. Reveal technical proof only when it answers an evaluator objection. The historical Spot Testnet execution is credibility evidence after the signature, not the headline.

See `product/JUDGE-OPTIMIZATION-EVIDENCE-001.md` and the current TRACE film contract `Faadil1/trace-design-workflow/state/projects/valid-until/GATE_6_75_DEMO_NARRATIVE_003.md`.
