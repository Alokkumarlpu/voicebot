@echo off
REM run-voicebot.bat - Start both frontend and backend in development mode (Windows)

setlocal enabledelayedexpansion

echo.
echo 🎤 Voicebot Hackathon - Development Mode
echo ==========================================
echo.
echo Starting both frontend and backend services...
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%
echo.

REM Start backend
echo 🚀 Starting backend server (Port 5000)...
cd server
if not exist node_modules (
    call npm install
)
start "Voicebot Backend" cmd /k npm run dev
timeout /t 3 /nobreak
echo.

REM Start frontend
cd ..
cd client
if not exist node_modules (
    call npm install
)
start "Voicebot Frontend" cmd /k npm run dev
echo.

echo ==========================================
echo ✅ Both services are starting!
echo.
echo 📍 Frontend:   http://localhost:3000
echo 📍 Backend:    http://localhost:5000
echo 📍 Health:     http://localhost:5000/health
echo.
echo Close the command windows to stop the services.
echo ==========================================
echo.
pause
