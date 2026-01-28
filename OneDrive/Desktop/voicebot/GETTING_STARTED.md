# 🎤 Voicebot Hackathon - Complete JavaScript Implementation

## 🎉 Status: COMPLETE ✅

The entire **JavaScript Phase** is now complete with a fully functional voicebot system!

## 📦 What's Included

### Frontend (React + Tailwind)
- ✅ Voice interface for drivers
- ✅ Agent dashboard for escalations
- ✅ Multilingual support (Hindi, English, Tamil, Telugu)
- ✅ Web Speech API integration
- ✅ Text-to-speech responses
- ✅ Real-time conversation display
- ✅ Responsive design

### Backend (Node.js + Express)
- ✅ REST API for voice queries
- ✅ Intelligent decision engine
- ✅ Escalation management
- ✅ Warm handoff system
- ✅ Mock database with 20+ seed records
- ✅ Error handling & logging
- ✅ Multi-language support

### Documentation
- ✅ Complete README
- ✅ Quick start guide
- ✅ Architecture diagrams
- ✅ Development guide
- ✅ Demo script
- ✅ API documentation

---

## 🚀 Let's Get Started!

### Step 1: Open Terminal

Open your terminal/PowerShell and navigate to the voicebot folder:

```powershell
cd "C:\Users\alokk\OneDrive\Desktop\voicebot"
```

### Step 2: Start Backend (Terminal 1)

```powershell
cd server
npm install
npm run dev
```

You should see:
```
🚀 Voicebot Server running on http://localhost:5000
```

### Step 3: Start Frontend (Terminal 2)

Open a **new terminal** and:

```powershell
cd "C:\Users\alokk\OneDrive\Desktop\voicebot\client"
npm install
npm run dev
```

You should see:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:3000/
```

### Step 4: Open Browser

Open **http://localhost:3000** in your browser

You should see the Voicebot interface with two tabs:
- 🎤 Driver UI
- 👨‍💼 Agent Dashboard

---

## 🎮 Try It Out

### Demo 1: Voice Query (Driver UI)

1. Click **"Driver UI"** tab
2. Select language: **"Hindi (हिंदी)"**
3. Click the **large blue microphone button**
4. Say something in Hindi or English
5. Watch the bot respond!

**Try these queries:**
- Hindi: "मेरा पिछला स्वैप कब था?"
- English: "What is my subscription?"
- Mixed: "मुझे nearest battery station बताओ"

### Demo 2: Escalation (Low Confidence)

1. While in Driver UI
2. Say something unclear: "xyz random text"
3. Bot responds with low confidence
4. Switch to **"Agent Dashboard"** tab
5. See the escalation appear in the queue!

### Demo 3: Warm Handoff (Agent Dashboard)

1. Click **"Agent Dashboard"** tab
2. You'll see escalations from drivers
3. Click any escalation to view details
4. Click "Assign to [Agent Name]" button
5. See confirmation: "Escalation assigned"
6. Check the escalation details (reason, confidence, sentiment)

---

## 📁 File Structure at a Glance

```
voicebot/
│
├── 📄 README.md                 ← Full documentation
├── 📄 QUICKSTART.md             ← Quick reference
├── 📄 ARCHITECTURE.md           ← System design
├── 📄 DEVELOPMENT.md            ← Developer guide
├── 📄 PROJECT_SUMMARY.md        ← What's included
│
├── 📂 client/                   ← React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/          ← Reusable UI parts
│   │   │   ├── VoiceButton.jsx
│   │   │   ├── BotResponse.jsx
│   │   │   ├── LanguageSelect.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── AgentCard.jsx
│   │   │
│   │   ├── pages/               ← Main pages
│   │   │   ├── DriverBot.jsx
│   │   │   └── AgentDashboard.jsx
│   │   │
│   │   ├── services/            ← API & Speech
│   │   │   ├── speechService.js
│   │   │   └── apiService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── 📂 server/                   ← Node.js Backend
│   ├── config/
│   │   ├── constants.js         ← Config values
│   │   └── db.js                ← Mock database
│   │
│   ├── models/                  ← Data structures
│   │   ├── Driver.js
│   │   ├── Swap.js
│   │   ├── Station.js
│   │   ├── Subscription.js
│   │   └── Escalation.js
│   │
│   ├── controllers/             ← API handlers
│   │   ├── voice.controller.js
│   │   ├── agent.controller.js
│   │   └── handoff.controller.js
│   │
│   ├── services/                ← Business logic
│   │   ├── brain.service.js
│   │   ├── decision.engine.js
│   │   ├── confidence.service.js
│   │   └── response.service.js
│   │
│   ├── routes/                  ← API endpoints
│   │   ├── voice.routes.js
│   │   ├── agent.routes.js
│   │   ├── handoff.routes.js
│   │   └── decision.routes.js
│   │
│   ├── utils/
│   │   └── logger.js
│   │
│   ├── server.js
│   └── package.json
│
└── 📂 brain-service/            ← Python (Coming next)
```

---

## 🔗 API Quick Reference

All endpoints are available at **http://localhost:5000/api**

### Voice Queries
```
POST /api/voice/query
{
  "text": "User's query text",
  "language": "hi" | "en" | "ta" | "te"
}
```

### Agent Dashboard
```
GET  /api/agent/escalations      → List pending escalations
GET  /api/agent/available        → List available agents
PUT  /api/agent/:id/status       → Update agent status
```

### Handoff Operations
```
POST /api/handoff/assign         → Assign escalation to agent
GET  /api/handoff/:id/summary    → Get handoff context
PUT  /api/handoff/:id/resolve    → Mark as resolved
```

---

## 🎯 Key Features to Try

### ✨ Feature 1: Voice Input
- Click microphone button
- Speak naturally
- Bot transcribes and responds
- Supports multiple languages

### ✨ Feature 2: Confidence-Based Escalation
- Bot calculates confidence (0-100%)
- If < 70%: Automatically escalates
- Agent sees why it escalated
- Shows full conversation context

### ✨ Feature 3: Sentiment Analysis
- Bot detects emotional tone
- Frustrated drivers escalate immediately
- Shows sentiment score to agent
- Triggers priority handling

### ✨ Feature 4: Warm Handoff
- Full conversation history transferred
- Agent sees driver details
- Recommended department shown
- Zero context loss

### ✨ Feature 5: Multilingual Support
- Hindi (हिंदी)
- English
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Code-switching support

---

## 🛠️ Troubleshooting

### Issue: Port already in use
```powershell
# Kill process on port 3000 (Windows)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Kill process on port 5000 (Windows)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### Issue: npm install fails
```powershell
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: Microphone not working
- Check browser permissions (Chrome → Settings → Privacy)
- Try in Chrome/Edge/Firefox (Safari has limited support)
- Localhost works without HTTPS (required only in production)

### Issue: Backend not responding
- Check backend terminal for errors
- Confirm running on http://localhost:5000
- Try health check: curl http://localhost:5000/health

---

## 📚 Documentation Guide

| File | Purpose | Read Time |
|------|---------|-----------|
| **README.md** | Complete overview | 5 min |
| **QUICKSTART.md** | Get running fast | 2 min |
| **ARCHITECTURE.md** | System design & flow | 10 min |
| **DEVELOPMENT.md** | Code deep dive | 15 min |
| **PROJECT_SUMMARY.md** | What's included | 5 min |
| **demo-script.md** | Demo talking points | 3 min |

---

## 🎓 Code Examples

### Example 1: How to add a new intent

In `server/services/response.service.js`:

```javascript
case 'new_feature':
  response.reply = this.formatNewFeature(result, lang);
  break;
```

Add formatter:
```javascript
formatNewFeature(data, language) {
  if (language === 'hi') {
    return `नई सुविधा: ${data.featureName}`;
  }
  return `New feature: ${data.featureName}`;
}
```

### Example 2: How to modify escalation threshold

In `server/config/constants.js`:

```javascript
export const config = {
  CONFIDENCE_THRESHOLD: 0.7,  // ← Change this value
  SENTIMENT_NEGATIVE_THRESHOLD: -0.3,
};
```

### Example 3: How to customize responses

In `server/services/response.service.js`:

```javascript
formatSwapHistory(swaps, language) {
  // Customize this for your needs
  return language === 'hi'
    ? `आपका पिछला स्वैप...`
    : `Your last swap...`;
}
```

---

## 🔮 What's Next?

### Phase 1: ✅ COMPLETE (You are here)
- JavaScript frontend
- Node.js backend
- Mock database
- Escalation system

### Phase 2: COMING SOON
- Python brain service for NLU
- LLM integration (OpenAI)
- Advanced intent detection
- Real sentiment analysis

### Phase 3: FUTURE
- MongoDB integration
- Real STT/TTS services
- CRM integration (Jarvis)
- WebSocket for real-time
- Analytics dashboard

---

## 💡 Pro Tips

1. **Test voices in different languages**
   - The system handles code-switching
   - "मेरा subscription status क्या है?" works!

2. **Trigger escalations intentionally**
   - Say "xyz random" for low confidence
   - This shows the agent dashboard flow

3. **Review server logs**
   - Watch the terminal output
   - See exactly what's happening internally

4. **Customize responses**
   - Edit `response.service.js` for your content
   - Edit templates in `constants.js`

5. **Check the decision engine**
   - `decision.engine.js` controls escalation logic
   - Easy to add new rules

---

## 🎬 Demo Scenario

**Time: 5 minutes**

1. **30 seconds**: Show Driver UI
   - Speak a query in Hindi
   - Get response
   
2. **1 minute**: Trigger Escalation
   - Say unclear query
   - Show escalation appearing
   
3. **1 minute**: Agent Dashboard
   - Show escalations in queue
   - Click to view details
   
4. **1 minute**: Warm Handoff
   - Select escalation
   - Assign to agent
   - Show handoff summary
   
5. **30 seconds**: Discuss architecture
   - Voice → NLU → Decision → Response
   - Or escalate to agent

---

## 📞 Quick Support Reference

| Problem | Solution | File |
|---------|----------|------|
| Want to change confidence threshold | Edit CONFIDENCE_THRESHOLD | `server/config/constants.js` |
| Want to add language | Add to Web Speech API | `client/services/speechService.js` |
| Want to change responses | Edit format functions | `server/services/response.service.js` |
| Want to understand flow | See architecture diagram | `ARCHITECTURE.md` |
| Want to see all endpoints | Check routes folder | `server/routes/` |

---

## 🎉 You're Ready!

Everything is set up and ready to go. 

**Next steps:**
1. Open your terminals
2. Start backend: `npm run dev` in server/
3. Start frontend: `npm run dev` in client/
4. Open http://localhost:3000
5. Click the microphone and start talking!

**Questions?** Check the documentation files first - they answer most common questions.

**Want to customize?** All code is clearly commented and organized.

**Ready for next phase?** See PROGRESS.md for the Python brain service.

---

**Have fun! 🚀**
