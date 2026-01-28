# 🎤 Voicebot Hackathon - Tier-1 Driver Query Resolution

A multilingual conversational voicebot system that resolves driver queries end-to-end with warm handoff capabilities to human agents.

## 🎯 Overview

This project implements a complete voicebot solution for handling Tier-1 driver/rider queries including:
- Swap history lookup & invoice explanation
- Nearest Battery Smart station + real-time availability
- Subscription plan validity & renewals
- Leave information & nearest DSK activation

### Key Features
✅ **Multilingual Support** - Hindi, English, Tamil, Telugu  
✅ **Web Speech API** - Real-time voice input/output  
✅ **Warm Handoff** - Intelligent escalation with context  
✅ **Confidence-based Routing** - Low confidence → escalate  
✅ **Sentiment Analysis** - Detect driver frustration  
✅ **Agent Dashboard** - Live escalation queue & assignment  

## 📋 Project Structure

```
voicebot-hackathon/
├── client/                    # React + Tailwind Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # DriverBot & AgentDashboard pages
│   │   ├── services/         # API & Speech services
│   │   └── App.jsx
│   └── package.json
│
├── server/                    # Node.js Express Backend
│   ├── config/               # Constants & DB setup
│   ├── models/               # Data models
│   ├── controllers/          # Request handlers
│   ├── services/             # Business logic
│   ├── routes/               # API endpoints
│   └── server.js
│
└── brain-service/            # Python NLU/LLM (Coming next)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

#### 1. Frontend Setup
```bash
cd client
npm install
npm run dev  # http://localhost:3000
```

#### 2. Backend Setup
```bash
cd server
npm install
npm run dev  # http://localhost:5000
```

#### 3. Test the Integration
- Open http://localhost:3000
- Click "Driver UI" to test voice interface
- Click "Agent Dashboard" to manage escalations

## 📡 API Endpoints

### Voice Processing
```
POST /api/voice/query
{
  "text": "मेरा आखिरी स्वैप कब था?",
  "language": "hi"
}
```

### Agent Management
```
GET /api/agent/escalations       # List pending escalations
GET /api/agent/available         # List available agents
PUT /api/agent/:agentId/status   # Update agent availability
```

### Handoff Operations
```
POST /api/handoff/assign                    # Assign to agent
GET  /api/handoff/:escalationId/summary     # Get handoff context
PUT  /api/handoff/:escalationId/resolve     # Mark as resolved
```

## 🧠 Decision Engine

### Escalation Logic
1. **Low Confidence** - Intent confidence < 70% → escalate
2. **Negative Sentiment** - Sentiment score < -0.3 → escalate
3. **Repeated Failures** - Turn count > 3 → escalate

### Handoff Summary
Agent receives:
- Driver name & ID
- Original query
- Confidence & sentiment scores
- Conversation history
- Recommended department

## 🔗 Integration with Python Brain Service

The server expects a Python FastAPI backend at `http://localhost:8000`:

```python
POST /api/process
POST /api/intent
POST /api/sentiment
```

For now, the system uses fallback responses when brain service is unavailable.

## 🎭 Component Details

### VoiceButton
- Press to speak voice interface
- Visual feedback (listening/idle states)
- Language selection

### BotResponse
- Conversation transcript display
- Message types: user, bot, system
- Timestamps

### AgentDashboard
- Real-time escalation queue
- Agent availability & queue length
- One-click warm handoff
- Escalation reason indicators

## 🛠 Architecture Decisions

1. **React + Tailwind** - Fast UI development with styling
2. **Express.js** - Lightweight, modular backend
3. **Mock Database** - Easy testing without DB dependency
4. **Service Layer** - Separation of concerns
5. **Decision Engine** - Rule-based escalation (extendable)

## 📊 Metrics & Monitoring

Track these metrics:
- **Automation Rate** - % of queries resolved by bot
- **AHT** - Average Handle Time
- **CSAT** - Customer Satisfaction Score
- **Escalation Rate** - % of queries escalated
- **Confidence Score** - Avg NLU confidence

## 🔮 Next Steps

1. ✅ JavaScript (Frontend + Backend) - DONE
2. 🔜 Python Brain Service (NLU/LLM)
3. 🔜 Database Integration (MongoDB)
4. 🔜 Real STT/TTS Services
5. 🔜 CRM Integration (Jarvis)
6. 🔜 WebSocket for real-time updates
7. 🔜 Analytics Dashboard

## 🧪 Testing

Run the development servers and test scenarios:

### Scenario 1: Swap History
- Driver: "मेरा पिछला स्वैप कब था?"
- Expected: Return latest swap details

### Scenario 2: Escalation (Low Confidence)
- Driver: "xyz random text"
- Expected: Escalate to agent

### Scenario 3: Warm Handoff
- From Agent Dashboard, select escalation and assign to available agent

## 📝 License

This is a hackathon project. All rights reserved.

## 👥 Team

Built for the Voicebot Hackathon.

---

**For detailed developer documentation, see [DEVELOPMENT.md](./DEVELOPMENT.md)**
