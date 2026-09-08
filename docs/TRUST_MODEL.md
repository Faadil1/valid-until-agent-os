# Valid Until — Trust Model

## Core idea

Agentic finance should not ask a stochastic model to both propose an action and authorize its own proposal.

Valid Until separates four layers:

1. **Interpretation** — the AI agent understands user intent and composes a proposed workflow.
2. **Observation** — Binance Agent OS / Skills provides fresh market state and structured tool access.
3. **Authorization** — deterministic checks decide whether the previously proposed action is still valid under the sealed policy and current state.
4. **Evidence** — signed receipts, failed-invariant output, deterministic tests and live read-only captures make the boundary inspectable.

## Why this matters

Skills and MCP make financial workflows easier to compose and more autonomous. That increases capability, but capability alone is not trust.

Production trust requires a separate control loop:

```text
AUTONOMY
skills + MCP + agent reasoning
        |
        v
CONTROL
sealed policy + deterministic pre-action checks
        |
        v
RED TEAM
stale state + tamper + expiry + policy mismatch + missing-data cases
        |
        v
EVALUATION
repeatable regression cases + bounded terminal states
        |
        v
EVIDENCE
receipts + live read-only proof + exact failed invariants
        |
        v
TRUST
confidence earned from repeated behavior, not persuasive prose
```

## Evaluation rules

- A happy-path transaction is not sufficient evidence.
- Every known failure class should become a regression case.
- A blocked action must not cause the agent to loosen policy in the same cycle.
- Missing or malformed evidence fails closed.
- Model explanations are useful context but are not the audit primitive.
- `ALLOW` only means the action remains valid under the currently sealed invariants; it does not mean the action is profitable, recommended or safe.

## Current evidence

- Deterministic invariants: **7/7 PASS**.
- Controlled hero replay: initial eligibility, then **35.47 bps** mid-price drift against a **20 bps** limit, ending `BLOCK / NO LONGER VALID`.
- Live public Binance proof: GitHub Actions run **34225133745**, official `binance-cli 2.1.1`, BTCUSDT, read-only, no API key and no order placement.
- Live proof correctly failed closed under real market conditions; the controlled replay remains the deterministic judge story.

## Product stance

Valid Until is not another trading model, alpha system, sentiment agent or risk-scoring chatbot.

Its role is narrower and more defensible:

> **Make consequential agent actions prove that they are still valid before they are allowed to continue.**

Reasoning may evolve. Skills may improve. Models may change. The execution-validity boundary stays independently testable.
