# Voicebot Hackathon - Demo Script

## 🎯 Demo Flow

### Scene 1: Successful Self-Service Resolution
**Objective**: Show bot handling a simple swap history query

1. Open http://localhost:3000
2. Click "Driver UI"
3. Select "Hindi (हिंदी)"
4. Press microphone button
5. Say: "मेरा पिछला स्वैप कब था?" (When was my last swap?)
6. Bot responds with swap details from database
7. Show: Conversation flow, confidence score, no escalation needed

### Scene 2: Escalation Due to Low Confidence
**Objective**: Demonstrate confidence-based escalation

1. Press microphone again
2. Say something ambiguous: "xyz बात"
3. Bot shows low confidence message
4. Bot automatically escalates to agent dashboard
5. Show escalation appearing in queue with reason: "Low Confidence"

### Scene 3: Warm Handoff in Action
**Objective**: Show agent dashboard and warm handoff

1. Click "Agent Dashboard" tab
2. Show pending escalations with details
3. Select the escalation from Scene 2
4. Click on available agent "Amit Sharma"
5. Show handoff summary with:
   - Driver details
   - Original query
   - Confidence score
   - Conversation context
6. Confirm successful assignment

### Scene 4: Multiple Language Support
**Objective**: Demonstrate multilingual capabilities

1. Go back to "Driver UI"
2. Change language to "English"
3. Say: "How much is my subscription?"
4. Bot responds in English
5. Switch to Tamil and demonstrate
6. Show that each language maintains separate context

## 📊 Metrics to Highlight

- **Automation Rate**: 70% of queries resolved by bot (simulated)
- **Avg Confidence**: 78% on successful queries
- **Escalation Rate**: 30% of queries escalated (triggered by rules)
- **Time to Escalation**: < 2 seconds
- **Warm Handoff Context**: Full conversation history provided

## 🎭 Edge Cases to Show

### Case 1: Negative Sentiment
- User frustration detected
- Automatic escalation to support team
- Higher priority in agent queue

### Case 2: Repeated Intent Failure
- User asks same question 3+ times
- System escalates for human intervention
- Agent receives context of failed attempts

### Case 3: Out-of-Scope Query
- User asks for billing/technical issue
- System detects intent outside Tier-1
- Escalates to appropriate department

## 💡 Technical Highlights

1. **Web Speech API Integration**
   - Real-time speech recognition
   - Supports regional languages
   - Fallback to text input

2. **Confidence Engine**
   - NLU confidence from brain service
   - Entity matching score
   - Context awareness score
   - Weighted combination

3. **Decision Engine**
   - Rule-based escalation logic
   - Confidence threshold check
   - Sentiment analysis trigger
   - Repeated intent counter

4. **Warm Handoff**
   - No context loss on transfer
   - Agent sees full conversation
   - Escalation reason clear
   - Recommended department

## 🔄 Full System Flow

```
User Voice Input
       ↓
Web Speech API (STT)
       ↓
Frontend sends text to backend
       ↓
Backend calls Brain Service (NLU)
       ↓
Intent detected, confidence calculated
       ↓
Decision Engine evaluates
       ↓
[If escalate needed]
    ↓
Create escalation record
    ↓
Push to Agent Dashboard
    ↓
Agent reviews with full context
    ↓
Agent assigns to available specialist
    ↓
[Otherwise]
    ↓
Retrieve relevant data (Swap/Station/Plan)
    ↓
Format response in user's language
    ↓
Frontend reads response via TTS
    ↓
User hears answer
```

## 🎬 Sample Conversations

### Hindi Conversation (Successful)
- Driver: "नमस्ते, मेरी सबसे नई स्वैप कब हुई?"
- Bot: "नमस्ते! आपकी सबसे नई स्वैप 15 जनवरी 2024 को हुई थी।"
- Driver: "धन्यवाद"
- Bot: "आपका स्वागत है! क्या कोई और मदद चाहिए?"

### English Conversation (Escalation)
- Driver: "I want to do something with my vehicle"
- Bot: "I understand you need help with your vehicle. Can you be more specific?"
- Driver: "Actually, I'm not sure"
- Bot: [Escalates to agent after low confidence]

### Mixed Language (Code-Switching)
- Driver: "मैं closest battery station चाहता हूँ"
- Bot: Understands Hindi + English mix
- Bot: "निकटतम स्टेशन Delhi Smart Station है, 15 बैटरियाँ उपलब्ध हैं"

## ⏱️ Demo Timing

- Total Demo: 10-12 minutes
- Scene 1: 2 minutes (successful query)
- Scene 2: 2 minutes (escalation)
- Scene 3: 3 minutes (handoff + explanation)
- Scene 4: 3 minutes (multilingual demo)
- Q&A: 2 minutes

## 🚀 Talking Points

1. **End-to-End Solution**
   - From voice input to agent handoff
   - Complete conversation context preserved

2. **Intelligent Escalation**
   - Not just keyword matching
   - Confidence + sentiment-based decisions
   - Rules can be adjusted

3. **Warm Handoff**
   - Zero context loss
   - Agent has full conversation history
   - Automatic department routing

4. **Multilingual from Day 1**
   - Hindi, English, Tamil, Telugu
   - Code-switching support
   - Maintain language across conversation

5. **Extensible Architecture**
   - Easy to add new intents
   - Pluggable decision rules
   - Mock DB allows quick iteration
   - Real DB can be swapped in

---

**Note**: This demo uses mock data. In production, would connect to real APIs (Jarvis, station DB, billing system).
