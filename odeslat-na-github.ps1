# Odeslání webu na GitHub (verze 2 – umí si poradit s novějšími změnami na GitHubu)
$ErrorActionPreference = "Continue"
Set-Location -LiteralPath $PSScriptRoot
Write-Host ("Spouštím skript ze složky: " + $PSScriptRoot) -ForegroundColor DarkGray
$repo = "https://github.com/filipfabian922/galaxie-web.git"
if (-not (Test-Path ".git")) { git init -b main | Out-Null; git remote add origin $repo }
git config user.name "Galaxie web" | Out-Null
git config user.email "filipfabian922@users.noreply.github.com" | Out-Null
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -m ("Aktualizace webu " + (Get-Date -Format "yyyy-MM-dd HH:mm")) | Out-Null }
Write-Host "Stahuji aktuální stav z GitHubu..." -ForegroundColor Cyan
git pull --rebase origin main
Write-Host "Odesílám na GitHub..." -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) {
  Write-Host "Běžné odeslání selhalo, zkouším vynucené (na GitHubu je jen pomocný soubor, nic se neztratí)..." -ForegroundColor Yellow
  git push -u origin main --force
}
if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "HOTOVO. Web se nasazuje (1-3 minuty): https://filipfabian922.github.io/galaxie-web/" -ForegroundColor Green
} else { Write-Host "Odeslání se nepovedlo - přepošli mi celý výpis." -ForegroundColor Red }
pause
