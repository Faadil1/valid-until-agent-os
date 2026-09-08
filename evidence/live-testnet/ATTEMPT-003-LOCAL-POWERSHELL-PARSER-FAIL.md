# ATTEMPT 003 — local PowerShell wrapper parser failure

Date: 2026-09-08
Machine: user actual-location Windows development machine
Shell: Windows PowerShell
Stage: before deterministic assurance, before authenticated proof cycle, before any order call

## Observed result

The local wrapper `scripts/run-local-testnet-proof.ps1 -Publish` failed during PowerShell parsing with messages including:

- `The string is missing the terminator: '.`
- `Missing closing '}' in statement block or type definition.`
- `The Try statement is missing its Catch or Finally block.`

No script body executed beyond parsing.

## Safety result

```text
ORDER_SENT=FALSE
FINANCIAL_WRITE=FALSE
VALID_UNTIL_DECISION_CYCLE_STARTED=FALSE
PUBLIC_PROOF_CREATED=FALSE
```

## Root-cause assessment

The repository script contained UTF-8 non-ASCII punctuation such as em-dashes and arrows. The user's Windows PowerShell 5.1 environment had already displayed UTF-8 mojibake in the preceding access-check script. Windows PowerShell 5.1 can interpret UTF-8-without-BOM text using the active ANSI code page, which can corrupt tokenization.

The remediation is not a venue, permission, policy, or product change. The wrapper is being made ASCII-only and a PowerShell parser gate is being added to CI.

## Claim boundary

This attempt provides no Binance execution evidence and must never be represented as a Valid Until BLOCK or a Binance venue refusal. It is a local script parsing failure before any financial write boundary.
