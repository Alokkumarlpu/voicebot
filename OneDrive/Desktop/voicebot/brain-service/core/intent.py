from typing import Dict, List, Optional
import re
from utils.preprocess import TextPreprocessor

class IntentDetector:
    """Detect user intent from text"""
    
    def __init__(self):
        self.preprocessor = TextPreprocessor()
        self.intent_keywords = self._init_keywords()
    
    def _init_keywords(self) -> Dict:
        """Initialize intent keywords for different languages"""
        return {
            "swap_history": {
                "hi": ["स्वैप", "swap", "पिछला", "आखिरी", "कब", "कितना"],
                "en": ["swap", "last", "previous", "when", "how much"],
                "ta": ["swap", "மாற்று"],
                "te": ["swap", "మార్పు"],
            },
            "station_lookup": {
                "hi": ["स्टेशन", "चार्जिंग", "बैटरी", "पास", "निकट"],
                "en": ["station", "battery", "charge", "nearest", "location"],
                "ta": ["station", "battery"],
                "te": ["station", "battery"],
            },
            "plan_info": {
                "hi": ["योजना", "प्लान", "सब्सक्रिप्शन", "मेंबरशिप", "कीमत"],
                "en": ["plan", "subscription", "membership", "price", "cost"],
                "ta": ["plan", "subscription"],
                "te": ["plan", "subscription"],
            },
            "leave_info": {
                "hi": ["छुट्टी", "leave", "अवकाश", "dsk"],
                "en": ["leave", "vacation", "break", "dsk"],
                "ta": ["leave", "விடுப்பு"],
                "te": ["leave", "సెలవు"],
            },
            "billing": {
                "hi": ["बिल", "भुगतान", "payment", "खाता", "invoice"],
                "en": ["bill", "payment", "invoice", "account"],
                "ta": ["bill", "payment"],
                "te": ["bill", "payment"],
            }
        }
    
    def detect(self, text: str, language: str = "hi") -> Dict:
        """
        Detect intent from text
        Returns: {"intent": str, "confidence": float, "entities": list}
        """
        clean_text = self.preprocessor.preprocess(text, language)
        
        # Score each intent
        intent_scores = {}
        for intent, keywords_dict in self.intent_keywords.items():
            keywords = keywords_dict.get(language, keywords_dict.get("en", []))
            score = self._score_intent(clean_text, keywords)
            intent_scores[intent] = score
        
        # Get best intent
        best_intent = max(intent_scores, key=intent_scores.get)
        confidence = intent_scores[best_intent]
        
        # If confidence too low, it's general
        if confidence < 0.3:
            best_intent = "general"
            confidence = 0.3
        
        # Extract entities
        entities = self._extract_entities(text, best_intent, language)
        
        return {
            "intent": best_intent,
            "confidence": confidence,
            "entities": entities,
            "feature_name": best_intent.replace("_", " ").title()
        }
    
    def _score_intent(self, text: str, keywords: List[str]) -> float:
        """Score how well text matches intent keywords"""
        if not keywords:
            return 0.0
        
        matched = sum(1 for keyword in keywords if keyword.lower() in text.lower())
        return min(matched / len(keywords), 1.0)
    
    def _extract_entities(self, text: str, intent: str, language: str) -> List[Dict]:
        """Extract entities from text"""
        entities = []
        
        # Extract numbers (amounts, dates)
        numbers = re.findall(r'\d+', text)
        for num in numbers:
            entities.append({
                "type": "number",
                "value": num,
                "language": language
            })
        
        # Extract proper nouns (names)
        words = text.split()
        for word in words:
            if word[0].isupper() and len(word) > 2:
                entities.append({
                    "type": "name",
                    "value": word,
                    "language": language
                })
        
        return entities
