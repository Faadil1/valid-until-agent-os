# Judge matrix

| Judge question | Valid Until answer | Proof |
|---|---|---|
| What problem does this solve? | An agent can retain execution authority after the state that justified its decision has changed. | controlled stale-state replay |
| Is Agent OS materially used? | Yes — the live read-only proof uses Binance's official CLI / public Binance market-data path at the reasoning-to-action boundary. | `src/snapshot.mjs`, `src/live.mjs` |
| Is this more than a chatbot? | Yes — the LLM-facing workflow is separated from deterministic policy commitment, state validation, receipt verification and pre-action revalidation. | `src/policy.mjs`, `src/receipt.mjs` |
| Why not just a limit order? | Price is only one dimension. Valid Until revalidates freshness, spread, depth, policy integrity and the state tied to the original decision. | policy + snapshot + replay |
| Why not 20 lines of checks? | Individual checks are intentionally simple; the product contract is that probabilistic reasoning never becomes its own execution authority. | architecture + invariant tests |
| Can it fail safely? | Yes — stale, drifted, tampered or policy-mismatched states become `BLOCK` and require fresh reasoning. | `tests/run.mjs` |
| Is the negative path visible? | Yes — the deterministic replay ends in `BLOCK` after 35.47 bps of drift against a 20 bps policy. | `npm run demo`, web judge view |
| Are claims bounded? | Yes — no profitability, prediction or risk-elimination claim. | README claim boundaries |
