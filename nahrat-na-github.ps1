# Nahraje web na GitHub (repozitář filipfabian922/galaxie-web). Spusť dvojklikem na nahrat-na-github.bat
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot
$repo = "https://github.com/filipfabian922/galaxie-web.git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git není nainstalovaný. Zkouším ho nainstalovat (winget)..." -ForegroundColor Yellow
  winget install --id Git.Git -e --source winget
  Write-Host "Git je nainstalovaný. ZAVŘI toto okno a spusť skript znovu." -ForegroundColor Green
  pause; exit
}
if (-not (Test-Path ".git")) {
  git init -b main | Out-Null
  git config user.name  "filipfabian922"
  git config user.email "filipfabian922@users.noreply.github.com"
  git remote add origin $repo
}
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -m ("Aktualizace webu " + (Get-Date -Format "yyyy-MM-dd HH:mm")) | Out-Null }
Write-Host "Odesílám na GitHub (při prvním použití se otevře přihlášení v prohlížeči)..." -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Hotovo. Web poběží na: https://filipfabian922.github.io/galaxie-web/ (první nasazení trvá 1–3 minuty)" -ForegroundColor Green
  Start-Process "https://github.com/filipfabian922/galaxie-web/settings/pages"
} else { Write-Host "Odeslání se nepovedlo – přepošli mi text chyby." -ForegroundColor Red }
pause
