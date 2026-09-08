Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Valid Until — actual-location Binance Spot Testnet access check
# - Windows PowerShell / PowerShell 7
# - no installation, no admin rights, no financial write
# - official Binance Spot Testnet endpoint only
# - prompts locally for credentials and never prints them
# - intentionally performs only signed GET /api/v3/account

$BaseUrl = 'https://testnet.binance.vision'
$AccountPath = '/api/v3/account'
$TimePath = '/api/v3/time'
$RecvWindow = 5000

function Convert-SecureToPlain([Security.SecureString]$Secure) {
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Secure)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
    }
}

function Get-HmacSha256Hex([string]$Secret, [string]$Message) {
    $hmac = [Security.Cryptography.HMACSHA256]::new()
    try {
        $hmac.Key = [Text.Encoding]::UTF8.GetBytes($Secret)
        $hash = $hmac.ComputeHash([Text.Encoding]::UTF8.GetBytes($Message))
        return -join ($hash | ForEach-Object { $_.ToString('x2') })
    }
    finally {
        $hmac.Dispose()
    }
}

Write-Host 'Valid Until — Binance Spot Testnet actual-location access check'
Write-Host 'READ-ONLY SIGNED CHECK ONLY — NO ORDER WILL BE SENT'
Write-Host 'Endpoint: https://testnet.binance.vision'
Write-Host ''

$apiKeySecure = Read-Host 'Paste Binance Spot Testnet API Key' -AsSecureString
$secretSecure = Read-Host 'Paste Binance Spot Testnet API Secret' -AsSecureString
$apiKey = $null
$secret = $null

try {
    $apiKey = Convert-SecureToPlain $apiKeySecure
    $secret = Convert-SecureToPlain $secretSecure

    if ([string]::IsNullOrWhiteSpace($apiKey) -or [string]::IsNullOrWhiteSpace($secret)) {
        throw 'Missing API key or secret.'
    }

    # Use Binance server time to avoid local-clock drift without writing any account state.
    $server = Invoke-RestMethod -Method Get -Uri "$BaseUrl$TimePath" -TimeoutSec 20
    $timestamp = [Int64]$server.serverTime
    $query = "recvWindow=$RecvWindow&timestamp=$timestamp"
    $signature = Get-HmacSha256Hex -Secret $secret -Message $query
    $uri = "$BaseUrl$AccountPath`?$query&signature=$signature"

    $headers = @{ 'X-MBX-APIKEY' = $apiKey }
    $null = Invoke-RestMethod -Method Get -Uri $uri -Headers $headers -TimeoutSec 20

    Write-Host 'ACTUAL_LOCATION_TESTNET_ACCESS=PASS'
    Write-Host 'FINANCIAL_WRITE=FALSE'
    exit 0
}
catch {
    $message = $_.Exception.Message
    $details = $_.ErrorDetails.Message
    $combined = "$message $details"

    if ($combined -match '(?i)restricted location|eligibility') {
        Write-Host 'ACTUAL_LOCATION_TESTNET_ACCESS=RESTRICTED_BY_VENUE_ELIGIBILITY'
        Write-Host 'FINANCIAL_WRITE=FALSE'
        exit 3
    }
    elseif ($combined -match '(?i)invalid api-key|signature|api-key format|permissions') {
        Write-Host 'ACTUAL_LOCATION_TESTNET_ACCESS=AUTH_OR_PERMISSION_ERROR'
        Write-Host 'FINANCIAL_WRITE=FALSE'
        exit 4
    }
    else {
        Write-Host 'ACTUAL_LOCATION_TESTNET_ACCESS=ERROR'
        Write-Host 'FINANCIAL_WRITE=FALSE'
        Write-Host ('ERROR_CLASS=' + $_.Exception.GetType().Name)
        exit 2
    }
}
finally {
    $apiKey = $null
    $secret = $null
    $apiKeySecure = $null
    $secretSecure = $null
    [GC]::Collect()
}
