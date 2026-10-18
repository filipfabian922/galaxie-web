@echo off
cd /d "%~dp0"
echo Web bezi na http://localhost:8080  (zavri toto okno pro ukonceni)
start "" http://localhost:8080
where python >nul 2>nul && (python -m http.server 8080 & goto :eof)
where npx >nul 2>nul && (npx --yes serve -l 8080 . & goto :eof)
echo Neni nainstalovany Python ani Node.js. Web lze otevrit i dvojklikem na index.html.
pause
