#!/usr/bin/env bash
set -euo pipefail

SYMBOL="${1:-BTCUSDT}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
DIR="evidence/live/${STAMP}-${SYMBOL}"
mkdir -p "$DIR"

if ! command -v binance-cli >/dev/null 2>&1; then
  echo "binance-cli not found. Install the official Binance CLI / Skills Hub first." >&2
  exit 1
fi

{
  echo "captured_at_utc=$STAMP"
  echo "symbol=$SYMBOL"
  echo "binance_cli_version=$(binance-cli --version 2>&1 | head -n1)"
  echo "mode=READ_ONLY_PUBLIC_MARKET_DATA"
  echo "execution=NOT_IMPLEMENTED_BY_DESIGN"
} > "$DIR/METADATA.txt"

npm test > "$DIR/tests.txt" 2>&1
npm run live -- "$SYMBOL" > "$DIR/live.json" 2> "$DIR/live.stderr.txt"

node -e "const fs=require('fs'); const p='$DIR/live.json'; const j=JSON.parse(fs.readFileSync(p,'utf8')); if(!['ALLOW','BLOCK'].includes(j.validity_result?.status)) process.exit(2); console.log(j.validity_result.status)" > "$DIR/verdict.txt"

cat > "$DIR/README.md" <<EOF
# Live read-only proof — $SYMBOL

Captured: $STAMP UTC

This evidence was produced by the official Binance CLI public market-data path used by Valid Until. It contains no API key, no account credential, no order placement and no funding action.

Files:
- \`METADATA.txt\` — capture metadata and CLI version
- \`tests.txt\` — invariant test output
- \`live.json\` — normalized signed decision + fresh revalidation result
- \`live.stderr.txt\` — bounded progress output
- \`verdict.txt\` — terminal ALLOW / BLOCK state

The result is an execution-validity proof only. ALLOW is not a recommendation or profitability claim.
EOF

echo "Evidence written to: $DIR"
cat "$DIR/verdict.txt"
