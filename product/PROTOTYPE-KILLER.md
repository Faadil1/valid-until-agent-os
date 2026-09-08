# Valid Until — Prototype Killer / Simpler-Alternative Challenge

Status: `RECONSTRUCTED_FROM_CANONICAL_EVIDENCE`
Date reconstructed: `2026-09-08`
Historical claim: **This document did not exist before implementation.** It reconstructs the actual challenge process from `evidence/problem-discovery/COUNCIL.md`, current build evidence and documented product decisions.

## Kill question

Should this project exist as an AI-agent product at all, or is it merely a limit order, alert, risk rule, generic wallet guard, or 20-line pre-trade script wrapped in LLM language?

## Candidate ideas killed before lock

- Conversational / natural-language trading bot — crowded, weak defensibility, adds execution risk.
- Social sentiment / news trader — latency and signal-quality mismatch.
- LLM portfolio optimizer / rebalancer — deterministic finance math is a better baseline.
- Autonomous alpha / technical-indicator agent — fake edge and non-deterministic decision risk.
- Generic wallet guard / spend-cap layer — materially overlaps Binance Agentic Wallet and native permissioning.
- Generic prompt-injection safety wrapper — real problem, but too broad and partly handled by native scopes/limits.
- Regime detector as the core product — useful, but can collapse into a deterministic market-risk script and is less distinctive for the deadline.
- Financial flight recorder as the core product — valuable, but stronger as supporting evidence than the hero product.
- HITL approval UI as the core product — high-quality alternative, but weaker direct fit with the chosen execution-integrity thesis under the available time.

## Hardest surviving objection: “Why not 20 lines of Python?”

Individual checks such as `price_drift <= limit`, `receipt_age <= ttl`, or `notional <= max` are intentionally simple and should remain deterministic.

**If Valid Until were only one of those checks, the project should be killed.**

The surviving product contract is the boundary across the whole reasoning-to-action workflow:

```text
human intent
→ probabilistic agent interpretation / planning
→ Binance Agent OS observations
→ exact proposed consequential action
→ frozen policy + state-bound receipt
→ deterministic pre-action revalidation
→ ALLOW or BLOCK / re-decide
```

The LLM is useful for interpreting a messy human objective and composing the workflow. It is **not** useful as the final authorizer of its own financial action.

## Baseline comparison

### Baseline A — Exchange-native order controls

Strength: excellent for specific price/order constraints, permissions, limits and execution primitives.

Gap addressed by Valid Until: those controls do not by themselves prove that the **full premise of an AI-generated action** still matches the state, intent and policy context that originally justified it.

### Baseline B — Deterministic wrapper script

Strength: preferable for fixed, known checks. Cheap, reliable, testable.

Gap addressed by Valid Until: the product is the standardized execution-validity contract around a probabilistic planner, not the mathematical novelty of any one check. The Challenge Suite deliberately verifies multiple failure classes: state drift, expiry, tamper, policy mismatch and action/notional mismatch.

### Baseline C — Human approval on every action

Strength: preserves accountability.

Gap: destroys much of the intended autonomy and may itself become stale for time-sensitive actions. Human protection remains appropriate for protected actions; Valid Until addresses machine-speed validity before those boundaries.

## Killing assumptions still open

- `KA-01`: Real agent operators experience enough reasoning→execution drift to justify a reusable boundary beyond strategy-specific scripts. **UNVERIFIED outside hackathon evidence.**
- `KA-02`: Agent OS users value a standardized action-validity contract rather than embedding checks directly in each agent. **UNVERIFIED.**
- `KA-03`: The agentic interpretation layer adds enough value over a fully deterministic workflow for the target use cases. **PARTIALLY SUPPORTED by the need to translate user intent, but no outcome study exists.**

These assumptions prevent production-market claims. They do not invalidate the bounded hackathon objective.

## Prototype Killer verdict

`SURVIVES_FOR_BOUNDED_HACKATHON_BUILD_WITH_LIMITATIONS`

Reason:

1. the underlying failure class emerged independently across multiple evaluators before the solution reveal;
2. the project is narrower than a generic trading/risk agent;
3. Binance Agent OS provides the relevant reasoning/tool/action environment;
4. the deterministic boundary is testable independently from the model;
5. the negative path is visibly demonstrable without live trading;
6. simpler alternatives remain explicitly acknowledged rather than hidden.

Production adoption remains unproven and must not be inferred from this verdict.
