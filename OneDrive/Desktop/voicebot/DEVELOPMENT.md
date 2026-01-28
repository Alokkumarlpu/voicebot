# Development Guide

## Environment Variables

### Server (.env)
```
NODE_ENV=development
PORT=5000
BRAIN_SERVICE_URL=http://localhost:8000
CONFIDENCE_THRESHOLD=0.7
SENTIMENT_NEGATIVE_THRESHOLD=-0.3
```

## Architecture Diagram

```
┌─────────────┐
│   Driver    │ (Web Browser)
│   Client    │
└──────┬──────┘
       │ Voice Input/Output
       │ (Web Speech API)
       ▼
┌─────────────────────────────────────────┐
│   React Frontend (Port 3000)            │
│   - DriverBot.jsx (Voice Interface)     │
│   - AgentDashboard.jsx (Agent Queue)    │
│   - speechService.js (Web Speech API)   │
│   - apiService.js (HTTP Client)         │
└─────────────┬──────────────────────────┘
              │ HTTP (REST API)
              ▼
┌─────────────────────────────────────────┐
│   Node.js Backend (Port 5000)           │
│   - Express Server                      │
│   - Voice Router (/api/voice)           │
│   - Agent Router (/api/agent)           │
│   - Handoff Router (/api/handoff)       │
└─────────────┬──────────────────────────┘
              │ HTTP (Internal API)
              ├──────────────────────────┐
              │                          │
              ▼                          ▼
    ┌──────────────────┐    ┌──────────────────┐
    │ Brain Service    │    │  Mock Database   │
    │ (Python/FastAPI)│    │  (JSON In-Memory)│
    │ Port 8000       │    │                  │
    │ NLU, Intent,    │    │ Drivers, Swaps,  │
    │ Sentiment, LLM  │    │ Agents, etc      │
    └──────────────────┘    └──────────────────┘
```

## File Descriptions

### Frontend

#### `DriverBot.jsx`
- Main driver interface
- Voice recording via Web Speech API
- Displays conversation transcript
- Handles escalation flow

#### `AgentDashboard.jsx`
- Live queue of escalations
- Available agents list
- One-click warm handoff
- Real-time status updates

#### `speechService.js`
- Web Speech API wrapper
- Handles speech recognition (STT)
- Text-to-speech (TTS) synthesis
- Multi-language support

#### `apiService.js`
- HTTP client for backend APIs
- Voice query submission
- Escalation fetching
- Agent assignment

### Backend

#### `server.js`
- Express app initialization
- Middleware setup (CORS, JSON parsing)
- Route registration
- Error handling

#### `voice.controller.js`
- Process user voice/text queries
- Call brain service for NLU
- Decision engine integration
- Create escalations if needed

#### `agent.controller.js`
- List pending escalations
- Get available agents
- Update agent status

#### `handoff.controller.js`
- Assign escalation to agent
- Generate handoff summary
- Mark escalations as resolved

#### `decision.engine.js`
- Escalation decision logic
- Confidence threshold checking
- Sentiment-based rules
- Repeated intent tracking

#### `confidence.service.js`
- Confidence score calculation
- Weighted metrics combination
- User-facing messages

#### `response.service.js`
- Format responses for each intent
- Multilingual response templates
- Handoff summary generation

#### `brain.service.js`
- Call Python NLU backend
- Fallback responses if brain service down
- Error handling & logging

## Data Flow

### Voice Query Processing
1. User speaks → `speechService.startListening()`
2. Speech converted to text
3. Frontend sends to backend: `POST /api/voice/query`
4. Backend calls brain service for NLU
5. Decision engine checks escalation criteria
6. If escalate: Create escalation record
7. Otherwise: Generate response from data sources
8. Frontend reads response: `speechService.speak()`

### Warm Handoff Flow
1. Agent Dashboard fetches escalations: `GET /api/agent/escalations`
2. Agent selects escalation and available agent
3. Frontend calls: `POST /api/handoff/assign`
4. Backend generates handoff summary with context
5. Escalation status changed to "assigned"
6. Agent receives full conversation context

## Adding New Intents

To support a new Tier-1 query type:

1. **Add Intent Type** in `server/config/constants.js`:
```javascript
export const INTENT_TYPES = {
  NEW_FEATURE: 'new_feature',
  // ... existing
};
```

2. **Update Brain Service** to recognize new intent:
```python
# brain-service/core/intent.py
# Add training data and intent classifier
```

3. **Add Response Handler** in `response.service.js`:
```javascript
case 'new_feature':
  response.reply = this.formatNewFeature(result, lang);
  break;
```

4. **Add Data Source** in `config/db.js`:
```javascript
getNewFeatureData(driverId) {
  // Fetch from API or database
}
```

## Testing Endpoints

### Using curl
```bash
# Test voice query
curl -X POST http://localhost:5000/api/voice/query \
  -H "Content-Type: application/json" \
  -d '{"text": "swap history", "language": "en"}'

# Get escalations
curl http://localhost:5000/api/agent/escalations

# Perform handoff
curl -X POST http://localhost:5000/api/handoff/assign \
  -H "Content-Type: application/json" \
  -d '{"escalationId": "esc_123", "agentId": "agent_001"}'
```

## Debugging

### Enable Debug Logging
```bash
DEBUG=true npm run dev
```

### Browser DevTools
- Console: Check API calls and responses
- Network: Monitor HTTP requests
- Sources: Set breakpoints in React components

### Server Logs
- Watch terminal output while testing
- Check request/response payloads
- Monitor brain service communication

## Performance Considerations

1. **Speech Recognition Timeout** - Adjust in speechService
2. **API Response Time** - Brain service latency is critical
3. **Database Queries** - Mock DB is instant; real DB needs optimization
4. **Concurrent Escalations** - Current mock DB has no limits

## Security Notes

- Input validation needed for production
- SQL injection prevention (when using real DB)
- Rate limiting on voice endpoints
- Authentication for agent dashboard
- Encryption for sensitive driver data

## Deployment

### Frontend
- Build: `npm run build`
- Deploy to Vercel, Netlify, or static hosting
- Set API_BASE in apiService to production backend

### Backend
- Use Node.js runtime (AWS Lambda, Heroku, Cloud Run)
- Set environment variables
- Connect to real database
- Deploy brain service separately

---

For more details, see comments in individual files.
