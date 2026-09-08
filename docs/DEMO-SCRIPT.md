# Valid Until — 60-second demo script

**0–8s — Hook**

*Reasoning is not authorization.* An AI agent can make the right decision, then reach execution after the conditions that justified it have changed.

**8–18s — Freeze the rules**

Show `policy.example.json`. Point to the policy hash: spread, drift, freshness and liquidity constraints are frozen before the market snapshot is evaluated.

**18–32s — Decision is valid**

Show the initial Binance-shaped snapshot and `ELIGIBLE`. The decision receipt binds the exact snapshot hash, policy hash and validity window. The signature is supporting proof, not the headline.

**32–48s — The world changes**

Advance to the revalidation state. The market has moved 35.47 bps, beyond the user's 20 bps tolerance. The original receipt is still cryptographically intact — but its premise is stale.

**48–60s — The moment**

Show **NO LONGER VALID** / `BLOCK`.

Close with:

*The model was still allowed to trade. The trade was no longer allowed to happen. Valid Until forces fresh reasoning before a stale decision can become a real action.*

Optional closing card:

`POLICY FROZEN → DECISION VALID → STATE CHANGED → NO LONGER VALID`
