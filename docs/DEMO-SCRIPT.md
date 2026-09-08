# Valid Until — 60-second Track A demo script

**0–7s — Hook**

Show the AI agent with the Valid Until skill loaded.

Say: *Reasoning is not authorization. An AI agent can make the right decision, then reach execution after the conditions that justified it have changed.*

**7–16s — Give the agent the bounded job**

Prompt:

```text
Use the Valid Until skill and Binance Agent OS / Binance Skills.
Evaluate BTCUSDT under the sealed policy.
Do not place any order.
Separate the reasoning proposal from the deterministic validity result.
```

Briefly show `SKILL.md` so the judge sees the agent contract and the explicit read-only boundary.

**16–27s — Freeze the rules + read Binance**

Show `policy.example.json` and the resulting policy hash. Spread, drift, freshness and liquidity constraints are frozen **before** market state is evaluated. The agent uses the Binance toolchain for market observations.

**27–39s — Decision is valid**

Show the initial state and `ELIGIBLE / VALID`. The decision receipt binds the policy and exact snapshot to a short validity window. Do not explain Ed25519 unless asked; it is supporting proof.

**39–52s — The world changes**

Advance to the deterministic revalidation state. The market has moved **35.47 bps**, beyond the user's **20 bps** tolerance. The model's original reasoning can still look sensible and the receipt can remain intact, but its premise is no longer current.

**52–60s — The moment**

Show **NO LONGER VALID** / `BLOCK`.

Close with:

*The model was still allowed to trade. The trade was no longer allowed to happen. Valid Until forces fresh reasoning before a stale decision can become a consequential action.*

Closing card:

`AI REASONS → POLICY + STATE BOUND → REVALIDATE → STILL VALID / NO LONGER VALID`

## Optional 10-second technical appendix

Show the green GitHub Actions proof and the live read-only evidence directory produced by:

```sh
bash scripts/capture-live-evidence.sh BTCUSDT
```

No order placement is implemented in the submission.
