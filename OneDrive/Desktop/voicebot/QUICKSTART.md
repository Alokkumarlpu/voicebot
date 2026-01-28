# Quick Start Guide

## 🚀 Get Running in 2 Minutes

### Option 1: Using npm (Recommended)

**Terminal 1 - Frontend:**
```bash
cd client
npm install
npm run dev
```
Frontend will be available at: **http://localhost:3000**

**Terminal 2 - Backend:**
```bash
cd server
npm install
npm run dev
```
Backend API available at: **http://localhost:5000**

### Option 2: Using yarn
```bash
cd client && yarn install && yarn dev   # Frontend
cd server && yarn install && yarn dev   # Backend (new terminal)
```

## ✅ Verify Installation

- **Frontend**: Open http://localhost:3000 → You should see the Voicebot navbar
- **Backend**: Open http://localhost:5000/health → Should return status: "healthy"

## 🎮 Try the Demo

1. **Driver Interface** (http://localhost:3000)
   - Click "Driver UI" tab
   - Select language (Hindi / English / Tamil / etc)
   - Press 🎤 button and speak or type

2. **Agent Dashboard** (http://localhost:3000)
   - Click "Agent Dashboard" tab
   - See pending escalations
   - Click escalation to view details
   - Assign to available agent

## 📁 Project Structure

```
voicebot/
├── client/              # React frontend
├── server/              # Node.js backend
├── README.md            # Full documentation
├── DEVELOPMENT.md       # Architecture & debugging
├── PROGRESS.md          # Implementation status
└── demo-script.md       # Demo talking points
```

## 🔧 Environment Setup

### Backend (.env)
Create `server/.env`:
```
NODE_ENV=development
PORT=5000
BRAIN_SERVICE_URL=http://localhost:8000
CONFIDENCE_THRESHOLD=0.7
```

See `server/.env.example` for all options.

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
cd server
npm install
```

### Port 3000 or 5000 already in use?
```bash
# Frontend on different port
cd client
npm run dev -- --port 3001

# Or kill existing process (Windows)
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Speech input not working?
- Must use Chrome/Edge/Firefox (Safari limited support)
- HTTPS required in production (localhost works)
- Ensure microphone permissions allowed

### Backend returning errors?
- Check brain service is at http://localhost:8000 (optional for MVP)
- System provides fallback responses if brain service down
- Check server terminal for detailed error logs

## 📊 What's Included

### Frontend
- ✅ React 18 with Vite
- ✅ Tailwind CSS styling
- ✅ Web Speech API integration (STT/TTS)
- ✅ Multilingual support
- ✅ Agent dashboard with real-time updates
- ✅ Responsive design

### Backend
- ✅ Express.js server
- ✅ Complete REST API
- ✅ Decision engine for escalations
- ✅ Confidence calculation
- ✅ Mock database with seed data
- ✅ Data models (Driver, Swap, Station, etc)
- ✅ Error handling & logging

## 🎯 Next Steps

1. **Try Voice Input** - Use the microphone button on Driver UI
2. **Test Escalation** - Say something unclear to trigger escalation
3. **Review Dashboard** - See escalations appear in Agent Dashboard
4. **Check Code** - Review component implementations
5. **Extend** - Add new intents or customize responses

## 📞 Support

- **Issues with frontend?** → Check `client/src/` components
- **Issues with backend?** → Check `server/` services
- **Questions about flow?** → See `DEVELOPMENT.md` for architecture
- **Demo talking points?** → See `demo-script.md`

## 🎓 Learning Path

1. Start with `README.md` - Project overview
2. Read `DEVELOPMENT.md` - Architecture & file descriptions  
3. Explore `client/src/` - React component code
4. Explore `server/` - Node.js backend logic
5. Try modifying responses in `response.service.js`
6. Add new intent handling in `brain.service.js`

---

**Stuck?** Check the logs in your terminal - they show exactly what's happening!

**Next Phase:** Python Brain Service for advanced NLU/LLM capabilities
