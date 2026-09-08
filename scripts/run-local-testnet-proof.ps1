param(
    [switch]$Publish
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Valid Until - bounded live Binance Spot Testnet proof
# - ordinary Windows PowerShell / PowerShell 7
# - no WSL/admin install required
# - official Spot Testnet only
# - at most one BUY order, canonical 10 test USDT, hard cap enforced in Node
# - raw proof stays in TEMP and is deleted
# - only sanitized web/live-testnet-proof.json may be committed/pushed
#
# IMPORTANT: this file is intentionally ASCII-only so Windows PowerShell 5.1
# does not misdecode UTF-8 punctuation before parsing.

function Convert-SecureToPlain([Security.SecureString]$Secure) {
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Secure)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
    }
}

function Write-Utf8NoBom([string]$Path, [string]$Text) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Text, $utf8)
}

Write-Host 'Valid Until - bounded Binance Spot Testnet execution proof'
Write-Host 'NON-PRODUCTION TESTNET ONLY - NO REAL FUNDS'
Write-Host 'Exact action: BUY BTCUSDT, 10 test USDT'
Write-Host 'Maximum order count: 1'
Write-Host 'Endpoint: https://testnet.binance.vision'
Write-Host ''

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Node.js is required but was not found in PATH.'
}
if (-not (Test-Path '.\package.json')) {
    throw 'Run this script from the valid-until-agent-os repository root.'
}

$confirmation = Read-Host 'Type CONFIRM_TESTNET_WRITE to authorize one bounded Spot Testnet order only if Valid Until returns ALLOW'
if ($confirmation -ne 'CONFIRM_TESTNET_WRITE') {
    Write-Host 'LOCAL_TESTNET_PROOF=CANCELED_NO_WRITE_AUTHORIZATION'
    exit 5
}

$apiKeySecure = Read-Host 'Paste Binance Spot Testnet API Key' -AsSecureString
$secretSecure = Read-Host 'Paste Binance Spot Testnet API Secret' -AsSecureString
$apiKey = $null
$secret = $null
$rawPath = Join-Path $env:TEMP ('valid-until-testnet-raw-' + [Guid]::NewGuid().ToString('N') + '.json')
$publicPath = Join-Path (Get-Location) 'web\live-testnet-proof.json'

try {
    $apiKey = Convert-SecureToPlain $apiKeySecure
    $secret = Convert-SecureToPlain $secretSecure
    if ([string]::IsNullOrWhiteSpace($apiKey) -or [string]::IsNullOrWhiteSpace($secret)) {
        throw 'Missing API key or secret.'
    }

    $sourceSha = (& git rev-parse HEAD 2>$null).Trim()
    if (-not $sourceSha) {
        $sourceSha = 'UNKNOWN'
    }

    $env:BINANCE_API_KEY = $apiKey
    $env:BINANCE_SECRET_KEY = $secret
    $env:BINANCE_API_ENV = 'testnet'
    $env:VALID_UNTIL_TESTNET_WRITE = 'CONFIRM_TESTNET_WRITE'
    $env:VALID_UNTIL_ACTION_NOTIONAL_USDT = '10'
    $env:VALID_UNTIL_RECHECK_MS = '750'
    $env:VALID_UNTIL_SOURCE_SHA = $sourceSha
    $env:VALID_UNTIL_CAPTURE_SOURCE = 'LOCAL_ACTUAL_LOCATION_NATIVE_NODE_HTTPS_HMAC'

    Write-Host 'Running deterministic assurance...'
    & npm run test:all
    if ($LASTEXITCODE -ne 0) {
        throw 'Deterministic assurance failed; no live proof was attempted.'
    }

    Write-Host 'Running one fresh T0-to-T1 Valid Until cycle...'
    $rawText = (& node src/live-testnet-native.mjs BTCUSDT | Out-String)
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($rawText)) {
        throw 'Native Spot Testnet proof failed.'
    }
    Write-Utf8NoBom -Path $rawPath -Text $rawText
    if (-not (Test-Path $rawPath)) {
        throw 'Native Spot Testnet proof output was not written.'
    }

    & node scripts/sanitize-testnet-proof.mjs $rawPath $publicPath
    if ($LASTEXITCODE -ne 0) {
        throw 'Sanitization failed.'
    }

    $proof = Get-Content $publicPath -Raw | ConvertFrom-Json
    $validity = [string]$proof.decision_contract.validity_status
    $orderSent = [bool]$proof.execution.order_sent
    $sameVerified = [bool]$proof.execution.same_order_verified

    if ($validity -eq 'ALLOW' -and $orderSent -and $sameVerified) {
        Write-Host 'LOCAL_TESTNET_PROOF=ALLOW_ORDER_VERIFIED'
        Write-Host ('TESTNET_ORDER_ID=' + [string]$proof.execution.order.orderId)
        Write-Host ('CLIENT_ORDER_ID=' + [string]$proof.execution.client_order_id)
        Write-Host 'SAME_ORDER_VERIFIED=TRUE'
    }
    elseif ($validity -eq 'BLOCK' -and -not $orderSent) {
        Write-Host 'LOCAL_TESTNET_PROOF=BLOCK_ZERO_WRITE'
        Write-Host 'SAME_ORDER_VERIFIED=FALSE'
        Write-Host 'REPLAN_REQUIRED=TRUE'
    }
    else {
        throw 'Unexpected sanitized proof state.'
    }

    if ($Publish) {
        if ($validity -ne 'ALLOW' -or -not $orderSent -or -not $sameVerified) {
            Write-Host 'PUBLICATION=SKIPPED_NO_VERIFIED_ALLOW_WRITE'
            exit 6
        }

        Write-Host 'Publishing sanitized proof only...'
        & git add -- web/live-testnet-proof.json
        if ($LASTEXITCODE -ne 0) {
            throw 'git add failed.'
        }

        & git diff --cached --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host 'PUBLICATION=NO_CHANGE'
        }
        else {
            & git commit -m 'evidence: publish local authenticated Binance Spot Testnet proof'
            if ($LASTEXITCODE -ne 0) {
                throw 'git commit failed.'
            }

            & git push origin HEAD:main
            if ($LASTEXITCODE -ne 0) {
                throw 'git push failed.'
            }

            Write-Host 'PUBLICATION=GITHUB_PUSH_COMPLETE'
            Write-Host 'VERCEL_DEPLOYMENT=TRIGGERED_BY_MAIN_PUSH'
        }
    }
}
finally {
    Remove-Item Env:BINANCE_API_KEY -ErrorAction SilentlyContinue
    Remove-Item Env:BINANCE_SECRET_KEY -ErrorAction SilentlyContinue
    Remove-Item Env:BINANCE_API_ENV -ErrorAction SilentlyContinue
    Remove-Item Env:VALID_UNTIL_TESTNET_WRITE -ErrorAction SilentlyContinue
    Remove-Item Env:VALID_UNTIL_ACTION_NOTIONAL_USDT -ErrorAction SilentlyContinue
    Remove-Item Env:VALID_UNTIL_RECHECK_MS -ErrorAction SilentlyContinue
    Remove-Item Env:VALID_UNTIL_SOURCE_SHA -ErrorAction SilentlyContinue
    Remove-Item Env:VALID_UNTIL_CAPTURE_SOURCE -ErrorAction SilentlyContinue
    if (Test-Path $rawPath) {
        Remove-Item $rawPath -Force -ErrorAction SilentlyContinue
    }
    $apiKey = $null
    $secret = $null
    $apiKeySecure = $null
    $secretSecure = $null
    [GC]::Collect()
}
