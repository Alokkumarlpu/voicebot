# System Architecture

## High-Level Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER LAYER                                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Driver (Mobile/Web)              Agent (Desktop)                 │
│  ┌──────────────────┐             ┌──────────────────┐           │
│  │ Speak into mic   │             │ Manage queue     │           │
│  │ (Web Speech API) │             │ Review context   │           │
│  │ Select language  │             │ Assign to agent  │           │
│  │ See bot response │             │ Resolve issue    │           │
│  └─────────┬────────┘             └────────┬─────────┘           │
│            │ HTTP (REST)                   │ HTTP (REST)          │
└────────────┼───────────────────────────────┼─────────────────────┘
             │                               │
             ▼                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER (React)                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Frontend (Port 3000)                                             │
│  ├── DriverBot.jsx                                                │
│  │   └── VoiceButton, BotResponse, LanguageSelect, Loader        │
│  ├── AgentDashboard.jsx                                           │
│  │   └── AgentCard, Escalation queue, Assignment UI              │
│  └── Services                                                     │
│      ├── speechService.js (Web Speech API wrapper)               │
│      └── apiService.js (HTTP client to backend)                  │
│                                                                    │
└────────────────────────┬─────────────────────────────────────────┘
                         │ HTTP (REST API)
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER (Express)                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Backend Server (Port 5000)                                       │
│                                                                    │
│  Routes                                                           │
│  ├── /api/voice/query          → VoiceController                 │
│  ├── /api/agent/*              → AgentController                 │
│  ├── /api/handoff/*            → HandoffController               │
│  └── /api/decision/*           → DecisionController              │
│                                                                    │
│  Controllers                                                      │
│  ├── VoiceController     - Process user input                     │
│  ├── AgentController     - Agent management                       │
│  └── HandoffController   - Escalation & assignment               │
│                                                                    │
│  Services (Business Logic)                                        │
│  ├── BrainService        - Call Python NLU/LLM                   │
│  ├── DecisionEngine      - Escalation logic                      │
│  ├── ConfidenceService   - Confidence metrics                    │
│  └── ResponseService     - Format responses                      │
│                                                                    │
│  Models (Data Structures)                                         │
│  ├── Driver              - Driver info                            │
│  ├── Escalation          - Escalation record                     │
│  ├── Station             - Battery stations                       │
│  ├── Swap                - Swap history                           │
│  └── Subscription        - Plan info                             │
│                                                                    │
└────────────┬───────────────────────────┬──────────────────────────┘
             │                           │
             │ HTTP (Internal API)       │ In-Memory
             │                           │
    ┌────────▼──────────┐    ┌──────────▼──────────┐
    │ BRAIN SERVICE     │    │  DATABASE LAYER     │
    │ (Python/FastAPI) │    │  (Mock / MongoDB)   │
    │ Port 8000        │    │                     │
    │                  │    │  MockDB             │
    │ Modules:         │    │  ├── drivers[]      │
    │ ├── Intent       │    │  ├── swaps[]        │
    │ ├── Entity       │    │  ├── stations[]     │
    │ ├── Sentiment    │    │  ├── agents[]       │
    │ ├── Confidence   │    │  ├── subscriptions[]│
    │ └── Response     │    │  └── escalations[]  │
    │                  │    │                     │
    └──────────────────┘    └─────────────────────┘
           (COMING NEXT)         (IMPLEMENTED)
```

## Decision Flow

```
User Query Input
       │
       ▼
┌─────────────────────────┐
│ 1. Speech to Text       │ (Web Speech API / STT Service)
│    Extract text from    │
│    user's voice input   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ 2. NLU Processing       │ (Brain Service)
│    - Intent detection   │
│    - Entity extraction  │
│    - Confidence score   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ 3. Sentiment Analysis   │ (Brain Service)
│    - Emotional tone     │
│    - Frustration level  │
└────────────┬────────────┘
             │
             ▼
┌──────────────────────────────────────────┐
│ 4. Decision Engine Evaluation            │
│                                          │
│ IF confidence < 70%                      │
│    ├─ ESCALATE (Low Confidence)         │
│                                          │
│ ELSE IF sentiment < -0.3                 │
│    ├─ ESCALATE (Negative Sentiment)      │
│                                          │
│ ELSE IF turn_count > 3                   │
│    ├─ ESCALATE (Repeated Failures)       │
│                                          │
│ ELSE                                     │
│    └─ CONTINUE (Generate Response)       │
└─────────┬────────────────────────────────┘
          │
    ┌─────┴──────────────────────┐
    │                            │
    ▼ ESCALATE                   ▼ CONTINUE
    │                            │
┌───────────────────┐    ┌──────────────────┐
│ 5A. Create        │    │ 5B. Retrieve     │
│ Escalation Record │    │ Data             │
│                   │    │                  │
│ - Driver ID       │    │ - Swap history   │
│ - Query text      │    │ - Stations       │
│ - Reason          │    │ - Plans          │
│ - Confidence      │    │ - Subscriptions  │
│ - Sentiment       │    └──────┬───────────┘
│ - Context         │           │
└────────┬──────────┘    ┌──────▼───────────┐
         │               │ 5C. Format       │
         │               │ Response         │
         │               │                  │
         │               │ Apply template   │
         │               │ in user language │
         │               └──────┬───────────┘
         │                      │
         ▼                      ▼
    ┌─────────────────────────────────┐
    │ 6. Push to Agent Dashboard      │
    │    (Escalations Queue)          │
    │                                 │
    │ Agent sees:                     │
    │ - Driver name & ID              │
    │ - Original query                │
    │ - Escalation reason             │
    │ - Confidence score              │
    │ - Sentiment analysis            │
    │ - Conversation history          │
    │ - Recommended department        │
    └────────────┬────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────┐
    │ 7. Warm Handoff                 │
    │ - Agent selects best specialist │
    │ - Full context transferred      │
    │ - Call routed to agent          │
    │ - Escalation marked "assigned"  │
    └─────────────────────────────────┘
    
[ALTERNATIVELY - If continued]
    │
    ▼
┌──────────────────────────┐
│ 7. Text to Speech (TTS)  │
│    User hears response   │
│    in their language     │
└────────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Continue conversation│
    │ or ask new question  │
    └──────────────────────┘
```

## Data Model

```
Driver
  ├── id: string (unique)
  ├── name: string
  ├── phone: string
  ├── email: string
  ├── language: string (hi, en, ta, te)
  ├── active: boolean
  ├── joinedDate: timestamp
  └── metadata: object

Escalation
  ├── id: string (unique)
  ├── driverId: string (FK)
  ├── driverName: string
  ├── query: string
  ├── reason: enum (confidence, sentiment, manual, repeated)
  ├── confidence: number (0-1)
  ├── sentiment: number (-1 to 1)
  ├── summary: string (agent-facing summary)
  ├── assignedAgentId: string (FK)
  ├── status: enum (pending, assigned, resolved)
  ├── timestamp: timestamp
  └── conversationHistory: Array<Message>

Agent
  ├── id: string (unique)
  ├── name: string
  ├── department: string
  ├── available: boolean
  ├── queueLength: number
  └── language: string[]

Swap
  ├── id: string (unique)
  ├── driverId: string (FK)
  ├── swapDate: timestamp
  ├── amount: number
  ├── status: enum (completed, pending, cancelled)
  └── stationId: string (FK)

Station
  ├── id: string (unique)
  ├── name: string
  ├── location: {lat, lng}
  ├── batteries: number
  ├── status: enum (operational, maintenance, closed)
  ├── operatingHours: string
  └── phone: string

Subscription
  ├── id: string (unique)
  ├── driverId: string (FK)
  ├── planName: string
  ├── validTill: timestamp
  ├── price: number
  ├── features: string[]
  └── status: enum (active, expired, cancelled)
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Web Speech API** - Voice recognition/synthesis
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Axios** - HTTP client
- **Morgan** - Logging
- **CORS** - Cross-origin requests

### Brain Service (Coming Next)
- **Python 3.9+** - Language
- **FastAPI** - Web framework
- **spaCy / NLTK** - NLP
- **OpenAI / LLM** - LLM integration
- **scikit-learn** - ML models

### Database (Coming Next)
- **MongoDB** - Document store (or PostgreSQL)
- **Redis** - Caching/sessions

### DevOps (Coming Next)
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **AWS / GCP / Heroku** - Deployment

---

**Phase 1 (COMPLETE):** JavaScript frontend + Node.js backend ✅
**Phase 2 (NEXT):** Python brain service for advanced NLU
**Phase 3:** Database integration & real APIs
**Phase 4:** Production hardening & deployment
