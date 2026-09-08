$ErrorActionPreference = 'Stop'
$repo = 'valid-until-agent-os'
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'GitHub CLI (gh) is required for this publishing helper.' }
if (-not (Test-Path .git)) { git init; git branch -M main }
npm run build:web
npm test
git add .
if (-not (git status --porcelain)) { Write-Host 'No changes to commit.' } else { git commit -m 'feat: launch Valid Until for Binance Agent OS Track A' }
$exists = gh repo view "Faadil1/$repo" 2>$null
if ($LASTEXITCODE -ne 0) { gh repo create "Faadil1/$repo" --public --source . --remote origin --push } else { if (-not (git remote get-url origin 2>$null)) { git remote add origin "https://github.com/Faadil1/$repo.git" }; git push -u origin main }
Write-Host "Published: https://github.com/Faadil1/$repo"
