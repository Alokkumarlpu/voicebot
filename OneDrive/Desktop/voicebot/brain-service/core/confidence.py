class ConfidenceCalculator:
    """Calculate confidence score for NLU results"""
    
    def __init__(self):
        self.weights = {
            "intent": 0.5,
            "entities": 0.3,
            "context": 0.2
        }
    
    def calculate(self, intent_confidence: float = 0.5, entities_found: bool = False, 
                 context_match: bool = False) -> float:
        """
        Calculate overall confidence score
        
        Args:
            intent_confidence: Confidence in intent detection (0-1)
            entities_found: Whether required entities were found
            context_match: Whether context information helps
        
        Returns:
            Overall confidence score (0-1)
        """
        # Start with intent confidence
        score = intent_confidence * self.weights["intent"]
        
        # Add entity confidence
        entity_score = 0.8 if entities_found else 0.4
        score += entity_score * self.weights["entities"]
        
        # Add context confidence
        context_score = 0.9 if context_match else 0.5
        score += context_score * self.weights["context"]
        
        # Normalize to 0-1
        return min(max(score, 0.0), 1.0)
    
    def should_escalate(self, confidence: float, threshold: float = 0.7) -> bool:
        """Check if confidence is below escalation threshold"""
        return confidence < threshold
