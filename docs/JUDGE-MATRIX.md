# Judge matrix

This matrix is optimized for **Problem → Pain → Execution → Story → Demo** legibility while keeping solution quality separate from presentation polish.

| Judge question | Valid Until answer | Proof |
|---|---|---|
| What problem does this solve? | An agent can retain execution authority after the state that justified its exact decision has materially changed. | controlled T0→T1 replay |
| Why does that hurt? | Capability/permission may remain available while the premise behind the old exact action has expired, so a previously correct decision can become the wrong action to execute now. | hero replay + claim-boundary narrative |
| What is the memorable mechanism? | **A correct decision can expire.** Valid Until seals policy + T0 state + exact action, then revalidates that same contract against fresh T1 state. | receipt v2 + revalidation engine |
| Is Agent OS materially used? | Yes — Binance Agent OS / official Binance tools provide fresh sponsor-native observations; the bounded Spot Testnet path provides the execution venue when Valid Until returns `ALLOW`. | `src/snapshot.mjs`, `src/binance-mcp-observation.mjs`, `src/live-testnet.mjs` |
| Is this more than a chatbot? | Yes — the LLM/agent proposes; deterministic policy commitment, exact-action binding, receipt verification and pre-action revalidation own execution validity. | `AGENTS.md`, `src/policy.mjs`, `src/receipt.mjs`, `src/evaluate.mjs` |
| Why not just a limit order or stop-loss? | Those encode standing price/execution instructions. Valid Until asks whether the exact old action still belongs to the policy/state premise that produced it. | T0/T1 contract + Q&A evidence |
| Why not a generic current-state preflight? | A preflight asks whether the action is acceptable now. Valid Until asks whether **this exact previously-justified action is still justified by the decision contract that produced it**. | counterfactual: current checks pass while cross-time premise fails |
| Why not 20–30 lines of checks? | Individual checks are intentionally simple. The product primitive is separation of probabilistic proposal from deterministic execution authority across time, with exact-action identity, sealed state/policy, replayable evidence and `REPLAN_REQUIRED`. | architecture + invariant tests + receipt v2 |
| Why use an AI agent at all? | Human intent and workflow context are fuzzy; the agent interprets/proposes. Valid Until deliberately refuses to let the probabilistic planner authorize itself. | `AGENTS.md`, portable skill, local MCP companion |
| Can it fail safely? | Yes — stale, drifted, tampered, expired, policy-mismatched or exact-action-mismatched states become `BLOCK → REPLAN_REQUIRED`. | deterministic suite + 6-case red team |
| Is the negative path visible? | Yes — deterministic replay ends in `NO LONGER VALID` after 35.47 bps of T0→T1 drift against a 20 bps policy, even though current-state checks remain acceptable. | `npm run demo`, judge web view |
| Is there authentic Binance evidence? | Yes — prior official Binance CLI public-data evidence exists. A bounded authenticated Spot Testnet write proof is the current open gate and must not be claimed until captured. | prior run `34225133745`; `.github/workflows/live-testnet-proof.yml` |
| What happens on live `ALLOW`? | Exactly one bounded Spot Testnet MARKET BUY may be sent, then the same `clientOrderId` is queried back for verification. | `src/testnet-executor.mjs` + pending authenticated capture |
| What happens on live `BLOCK`? | Zero Binance executor calls. The cycle terminates `REPLAN_REQUIRED`; policy is not weakened to manufacture an `ALLOW`. | execution-boundary tests + live workflow contract |
| Are claims bounded? | Yes — no profitability, alpha, reduced-loss, mainnet or real-money claim. Spot Testnet is explicitly non-production. | README + state claim boundaries |
| Is the implementation feasible beyond a demo? | The system uses simple deterministic controls, explicit failure states and bounded sponsor-native interfaces; unresolved production claims remain labeled rather than implied. | PRD, lifecycle manifest, CI, claim boundaries |
| Did the team consider alternatives? | Yes — generic signal bots, static permissions, current-state preflight, stop-loss/limit-order framing and extra sponsor integrations were challenged/rejected where they did not improve the core execution-validity contract. | Prototype Killer + Winner Intelligence reruns |
| What should the judge remember tomorrow? | **The one where every current check could still be green, but the old exact decision had expired.** | final judge narrative |

## Presentation rule

Do not lead with MCP, Ed25519, SHA-256, architecture breadth or feature count. Lead with the failure, show the consequence, then reveal technical proof only when it answers a judge objection.

See `product/JUDGE-OPTIMIZATION-EVIDENCE-001.md`.
