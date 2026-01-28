from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from typing import Optional

# Import modules
from core.intent import IntentDetector
from core.sentiment import SentimentAnalyzer
from core.confidence import ConfidenceCalculator
from dialog.manager import DialogManager
from memory.session_store import SessionStore
from utils.logger import Logger

load_dotenv()

app = FastAPI(title="Voicebot Brain Service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
intent_detector = IntentDetector()
sentiment_analyzer = SentimentAnalyzer()
confidence_calculator = ConfidenceCalculator()
dialog_manager = DialogManager()
session_store = SessionStore()
logger = Logger()

# ==================== REQUEST MODELS ====================

class TextInput(BaseModel):
    text: str
    language: str = "hi"
    context: Optional[dict] = None

class ProcessRequest(BaseModel):
    text: str
    language: str = "hi"
    context: Optional[dict] = None
    session_id: Optional[str] = None

class IntentRequest(BaseModel):
    text: str
    language: str = "hi"

class SentimentRequest(BaseModel):
    text: str
    language: str = "hi"

# ==================== ENDPOINTS ====================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Voicebot Brain Service",
        "version": "1.0.0"
    }

@app.post("/api/process")
async def process_text(request: ProcessRequest):
    """
    Main endpoint: Process text and return NLU analysis
    """
    try:
        logger.info(f"Processing text: {request.text[:50]}...", {"language": request.language})
        
        # Get or create session
        session_id = request.session_id or f"session_{int(__import__('time').time())}"
        session = session_store.get_or_create_session(session_id, request.language)
        
        # Extract intent
        intent_result = intent_detector.detect(request.text, request.language)
        
        # Extract entities
        entities = intent_result.get("entities", [])
        
        # Analyze sentiment
        sentiment_result = sentiment_analyzer.analyze(request.text, request.language)
        
        # Calculate confidence
        confidence = confidence_calculator.calculate(
            intent_confidence=intent_result.get("confidence", 0.5),
            entities_found=len(entities) > 0,
            context_match=request.context is not None
        )
        
        # Generate response
        response = dialog_manager.generate_response(
            intent=intent_result.get("intent", "general"),
            entities=entities,
            language=request.language,
            context=request.context
        )
        
        # Store in session
        session_store.add_to_history(session_id, "user", request.text)
        session_store.add_to_history(session_id, "bot", response)
        
        logger.info(f"Processing complete", {
            "intent": intent_result.get("intent"),
            "confidence": confidence,
            "sentiment": sentiment_result.get("sentiment")
        })
        
        return {
            "success": True,
            "text": request.text,
            "language": request.language,
            "session_id": session_id,
            "intent": intent_result.get("intent"),
            "confidence": confidence,
            "entities": entities,
            "sentiment": sentiment_result.get("sentiment"),
            "sentiment_confidence": sentiment_result.get("confidence"),
            "reply": response,
            "result": {
                "intent": intent_result.get("intent"),
                "entities": entities,
                "featureName": intent_result.get("feature_name")
            }
        }
    except Exception as e:
        logger.error(f"Error processing text: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/intent")
async def extract_intent(request: IntentRequest):
    """
    Extract intent from text
    """
    try:
        result = intent_detector.detect(request.text, request.language)
        return {
            "success": True,
            "text": request.text,
            "intent": result.get("intent"),
            "confidence": result.get("confidence"),
            "entities": result.get("entities", [])
        }
    except Exception as e:
        logger.error(f"Error extracting intent: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/sentiment")
async def analyze_sentiment(request: SentimentRequest):
    """
    Analyze sentiment of text
    """
    try:
        result = sentiment_analyzer.analyze(request.text, request.language)
        return {
            "success": True,
            "text": request.text,
            "sentiment": result.get("sentiment"),
            "confidence": result.get("confidence"),
            "emotion": result.get("emotion")
        }
    except Exception as e:
        logger.error(f"Error analyzing sentiment: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/confidence")
async def calculate_confidence(request: ProcessRequest):
    """
    Calculate confidence score
    """
    try:
        intent_result = intent_detector.detect(request.text, request.language)
        confidence = confidence_calculator.calculate(
            intent_confidence=intent_result.get("confidence", 0.5),
            entities_found=len(intent_result.get("entities", [])) > 0,
            context_match=request.context is not None
        )
        return {
            "success": True,
            "confidence": confidence,
            "breakdown": {
                "intent_confidence": intent_result.get("confidence", 0.5),
                "entity_match": len(intent_result.get("entities", [])) > 0,
                "context_match": request.context is not None
            }
        }
    except Exception as e:
        logger.error(f"Error calculating confidence: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    logger.info(f"Starting Brain Service on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
