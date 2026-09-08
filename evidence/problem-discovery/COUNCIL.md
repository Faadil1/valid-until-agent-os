# Problem-discovery council

## Purpose

Before locking the product idea, the same Binance Agent OS Track A brief was sent independently to multiple LLMs with an explicit instruction **not to see the proposed solution first**. The goal was to test whether the underlying problem would emerge without solution anchoring.

This artifact records idea-selection evidence only. It is **not** presented as empirical proof of market size, user demand, or financial outcomes.

## Blind first-pass convergence

| Evaluator | Independent finding before solution reveal | Outcome |
|---|---|---|
| Perplexity | Correct reasoning can still execute against stale price/state; re-check is required immediately before action. | underlying failure class found |
| Grok | Stale tool results, policy identity and deterministic pre-trade enforcement are ignored by many crypto agents; the LLM should not self-authorize. | failure class found; demanded deterministic cage |
| Claude | Ranked **Authorization Lag / Stale Decision Execution** as its #1 problem candidate before seeing Valid Until. | `MUST SOLVE`; later `PROMOTE` |
| Kimi | Identified the execution layer as the main place where correct reasoning still causes financial damage, including stale data and liquidity changes before execution. | direction supported with useful dissent on broader crypto priorities |
| Gemini | Ranked **Stale-State Invalidation Engine** #1 at 66/70, highlighting second-scale LLM reasoning against much faster market-state change. | highest-ranked opportunity |

## What survived disagreement

The models disagreed on the biggest problem in crypto overall. Blind signing, prompt injection, wallet permissions, HITL approval quality and auditability all appeared as credible alternatives.

The recurring intersection relevant to this hackathon was narrower:

> A probabilistic agent can make a reasonable decision and retain technical execution authority after the state or policy premise that justified the action has changed.

That led to the canonical thesis:

> **Reasoning is not authorization.**

## Product decision

Valid Until was promoted because it combined:

- independent problem discovery across evaluators;
- direct fit with the Agent OS reasoning-to-action boundary;
- differentiation from crowded signal / sentiment / autonomous-trading submissions;
- a deterministic negative-path demo understandable in under 90 seconds;
- a bounded scope that can be built and verified without live trading.

## Important limitation

Model agreement is not customer validation. Production adoption would still require interviews, incident evidence, latency measurements and real workflow observation. The council was used to reduce solution-first bias under hackathon time constraints, not to replace real-world research.
