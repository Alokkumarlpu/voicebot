#!/bin/bash
# run-voicebot.sh - Start both frontend and backend in development mode

echo "🎤 Voicebot Hackathon - Development Mode"
echo "=========================================="
echo ""
echo "Starting both frontend and backend services..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo ""

# Start backend in background
echo "🚀 Starting backend server (Port 5000)..."
cd server || exit
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run dev &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
echo ""

# Wait for backend to start
sleep 3

# Start frontend
echo "🚀 Starting frontend server (Port 3000)..."
cd ../client || exit
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run dev &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"
echo ""

echo "=========================================="
echo "✅ Both services are starting!"
echo ""
echo "📍 Frontend:   http://localhost:3000"
echo "📍 Backend:    http://localhost:5000"
echo "📍 Health:     http://localhost:5000/health"
echo ""
echo "Press Ctrl+C to stop both services"
echo "=========================================="
echo ""

# Wait for processes to finish
wait $BACKEND_PID $FRONTEND_PID
