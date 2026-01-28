from typing import Dict

class SentimentAnalyzer:
    """Analyze sentiment of text"""
    
    def __init__(self):
        self.positive_words = self._init_positive_words()
        self.negative_words = self._init_negative_words()
    
    def _init_positive_words(self) -> Dict:
        """Initialize positive sentiment words"""
        return {
            "hi": ["अच्छा", "धन्यवाद", "प्रसन्न", "खुश", "बहुत", "शानदार", "परफेक्ट"],
            "en": ["good", "thank", "happy", "great", "excellent", "perfect", "love"],
            "ta": ["நல்ல", "நன்றி", "பிரம்மாण்டம்"],
            "te": ["మంచి", "ధన్యవాదాలు", "గ్రేట్"],
        }
    
    def _init_negative_words(self) -> Dict:
        """Initialize negative sentiment words"""
        return {
            "hi": ["बुरा", "गुस्सा", "दुख", "समस्या", "परेशानी", "गलत", "फेल"],
            "en": ["bad", "angry", "sad", "problem", "issue", "wrong", "fail", "terrible"],
            "ta": ["கெடுதல்", "கோபம்", "சோகம்", "சிக்கல்"],
            "te": ["చెడు", "కోపం", "విషాదం", "సమస్య"],
        }
    
    def analyze(self, text: str, language: str = "hi") -> Dict:
        """
        Analyze sentiment of text
        Returns: {"sentiment": float (-1 to 1), "confidence": float, "emotion": str}
        """
        clean_text = text.lower()
        
        # Get word lists for language
        positive = self.positive_words.get(language, self.positive_words.get("en", []))
        negative = self.negative_words.get(language, self.negative_words.get("en", []))
        
        # Count sentiment words
        positive_count = sum(1 for word in positive if word.lower() in clean_text)
        negative_count = sum(1 for word in negative if word.lower() in clean_text)
        
        # Calculate sentiment score (-1 to 1)
        total = positive_count + negative_count
        if total == 0:
            sentiment = 0.0  # Neutral
        else:
            sentiment = (positive_count - negative_count) / total
        
        # Determine emotion
        if sentiment > 0.5:
            emotion = "very_positive"
        elif sentiment > 0.2:
            emotion = "positive"
        elif sentiment < -0.5:
            emotion = "very_negative"
        elif sentiment < -0.2:
            emotion = "negative"
        else:
            emotion = "neutral"
        
        # Calculate confidence based on word count
        confidence = min(total / 10, 1.0) if total > 0 else 0.5
        
        return {
            "sentiment": round(sentiment, 2),
            "confidence": round(confidence, 2),
            "emotion": emotion,
            "positive_count": positive_count,
            "negative_count": negative_count
        }
