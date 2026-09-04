@echo off
setlocal
title UIDOMHOME LOCAL SERVER
cd /d "%~dp0"

where node.exe >nul 2>nul
if errorlevel 1 goto :node_missing

where npm.cmd >nul 2>nul
if errorlevel 1 goto :node_missing

echo [1/2] Installing required components...
call npm.cmd install
if errorlevel 1 goto :install_failed

echo.
echo [2/2] Starting UIDOMHOME...
echo Website: http://localhost:5173
echo Keep this window open while using the website.
echo.

start "" cmd.exe /c "ping 127.0.0.1 -n 6 >nul && start http://localhost:5173"
set "WRANGLER_LOG_PATH=.wrangler\wrangler.log"
call "node_modules\.bin\vite.cmd" --host 127.0.0.1 --port 5173
goto :server_stopped

:node_missing
echo.
echo ERROR: Node.js was not found.
echo Install Node.js 22 LTS, restart Windows, and run this file again.
cmd /k
goto :eof

:install_failed
echo.
echo ERROR: npm install failed.
echo Take a screenshot of the error above and send it to me.
cmd /k
goto :eof

:server_stopped
echo.
echo The server stopped. Take a screenshot of the error above and send it to me.
cmd /k

