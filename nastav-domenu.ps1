# Přepne web na vlastní doménu:  .\nastav-domenu.ps1 -Domena zastavarna-trutnov.cz
param([Parameter(Mandatory=$true)][string]$Domena)
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot
$Domena = $Domena.ToLower().Trim() -replace '^https?://','' -replace '^www\.','' -replace '/.*$',''
$old = "https://filipfabian922.github.io/galaxie-web"
$new = "https://$Domena"
Get-ChildItem -Recurse -File -Include *.html,*.xml,*.txt | ForEach-Object {
  $t = Get-Content $_.FullName -Raw -Encoding UTF8
  if ($t.Contains($old)) { [IO.File]::WriteAllText($_.FullName, $t.Replace($old,$new), (New-Object Text.UTF8Encoding($false))) }
}
[IO.File]::WriteAllText("$PSScriptRoot\CNAME", $Domena, (New-Object Text.UTF8Encoding($false)))
Write-Host "Hotovo. Web je přepsaný na $new a vytvořil se soubor CNAME." -ForegroundColor Green
Write-Host "Teď spusť nahrat-na-github.bat a nastav DNS ve Vedosu podle README.md (část Doména)."
