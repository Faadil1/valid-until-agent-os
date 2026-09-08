# Valid Until — Human Authorization Record

Status: `CURRENT_AUTHORIZATION_RECORDED`
Date: `2026-09-08`
Project: `Valid Until`
Hackathon: `Binance Agent OS Mini Hackathon`
Track: `A`

## Authority statement

The human owner has explicitly authorized **continuing the current Valid Until construction while respecting the full Faadil Agent System lifecycle**.

This record does **not** claim that a repository authorization artifact existed before the build. It records the current protected authority boundary from this point forward and incorporates the later human direction in `product/HUMAN-DIRECTION-LIVE-PROOF-001.md`.

## Authorized scope

- Continue Valid Until as the active Track A project.
- Repair missing lifecycle artifacts truthfully without backdating them.
- Preserve the current core thesis: **Reasoning is not authorization.**
- Preserve the execution-integrity architecture: agent proposes; deterministic boundary authorizes.
- Continue productization, evaluation, design assurance and submission packaging only through the correct routed owners/gates.
- Use public/read-only Binance observations for technical proof.
- Attempt a **bounded non-production write proof only on the official Binance Spot Testnet** when the venue permits access from the actual execution location.
- The bounded Spot Testnet proof may send at most one exact BUY after deterministic `ALLOW`, then query the same `clientOrderId`.

## Explicit safety / protected-action constraints

- Binance mainnet execution is forbidden.
- Real funds are forbidden.
- Spot Testnet is the only authorized write venue for this proof.
- No account funding, wallet write or x402 payment path.
- No geographic bypass, VPN/proxy routing, cloud-region hopping or eligibility circumvention to obtain venue access.
- A venue eligibility/restricted-location response must stop the write path immediately.
- Do not weaken policy or mutate the action to manufacture `ALLOW`.
- Testnet credentials may exist only in the protected `testnet-proof` GitHub Environment or an explicitly local ephemeral profile on a personal development machine.
- No secrets or API credentials may be committed, printed, sent to Vercel, placed in public artifacts or pasted into chat.
- External submission/publish actions remain human-protected.

## Current venue-access evidence

GitHub Actions run `34248954040` used the protected testnet secrets, passed the deterministic assurance suite and installed Binance CLI `2.1.1`, then failed before any decision cycle/order at the authenticated Spot Testnet account check because Binance returned a restricted-location / Eligibility error for the hosted runner.

Therefore:
- `order_sent = false`;
- no testnet orderId exists;
- no public write-proof claim is authorized from that run;
- changing runner geography specifically to evade the restriction is not authorized.

## Lifecycle condition

A successful build, CI run, deployment, demo or design pass does not make the project complete by itself. The project must satisfy the lifecycle coverage manifest and may only reach terminal readiness after the required Project Finisher verdict.

Any future execution attempt must first be routed through the current lifecycle state and must occur only from a legitimately permitted execution location without circumvention.
