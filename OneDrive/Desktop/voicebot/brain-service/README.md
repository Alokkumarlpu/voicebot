# Brain Service README

## Python Brain Service - Voicebot NLU/LLM Backend

This is the Natural Language Understanding and LLM backend for the Voicebot system.

## Features

- Intent detection
- Entity extraction  
- Sentiment analysis
- Confidence scoring
- Dialog management
- Session memory
- Multilingual support (Hindi, English, Tamil, Telugu)

## Installation

```bash
cd brain-service
pip install -r requirements.txt
```

## Running

```bash
python app.py
```

Server will start on `http://localhost:8000`

## API Endpoints

- `GET /health` - Health check
- `POST /api/process` - Process text (main endpoint)
- `POST /api/intent` - Extract intent only
- `POST /api/sentiment` - Analyze sentiment only
- `POST /api/confidence` - Calculate confidence score

## Architecture

### Core NLU Modules
- `intent.py` - Intent classification
- `sentiment.py` - Sentiment analysis
- `confidence.py` - Confidence scoring
- `entities.py` - Entity extraction

### Dialog Management
- `manager.py` - Conversation flow
- `escalation.py` - Escalation rules
- `responses.py` - Response templates

### Services
- `plan_service.py` - Plan queries
- `station_service.py` - Station lookup
- `billing_service.py` - Billing queries
- `leave_service.py` - Leave management

### Utilities
- `preprocess.py` - Text preprocessing
- `logger.py` - Logging

### Memory
- `session_store.py` - Session management

## Usage Example

```python
import requests

url = "http://localhost:8000/api/process"
payload = {
    "text": "मेरा पिछला स्वैप कब था?",
    "language": "hi"
}

response = requests.post(url, json=payload)
print(response.json())
```

## Response Format

```json
{
  "success": true,
  "intent": "swap_history",
  "confidence": 0.95,
  "sentiment": 0.2,
  "reply": "आपकी पिछली स्वैप 15 जनवरी 2024 को थी।",
  "entities": []
}
```

## Next Steps

- Integration with real LLM (OpenAI API)
- Advanced entity extraction (spaCy)
- Database persistence
- Multi-language support enhancement
- Context awareness improvement

## License

Hackathon Project
