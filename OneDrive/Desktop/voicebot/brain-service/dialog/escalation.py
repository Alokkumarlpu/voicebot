from typing import Dict

class EscalationRules:
    """Define escalation rules"""
    
    def __init__(self):
        self.rules = {
            "low_confidence": {"threshold": 0.7, "priority": "medium"},
            "negative_sentiment": {"threshold": -0.3, "priority": "high"},
            "repeated_failures": {"threshold": 3, "priority": "medium"},
            "out_of_scope": {"priority": "high"}
        }
    
    def check_escalation(self, confidence: float, sentiment: float, 
                        attempt_count: int = 1) -> Dict:
        """Check if any escalation rules are triggered"""
        
        escalation_reasons = []
        priority = "low"
        
        # Check confidence
        if confidence < self.rules["low_confidence"]["threshold"]:
            escalation_reasons.append("low_confidence")
            priority = "medium"
        
        # Check sentiment
        if sentiment < self.rules["negative_sentiment"]["threshold"]:
            escalation_reasons.append("negative_sentiment")
            priority = "high"
        
        # Check repeated failures
        if attempt_count >= self.rules["repeated_failures"]["threshold"]:
            escalation_reasons.append("repeated_failures")
            priority = "medium"
        
        return {
            "should_escalate": len(escalation_reasons) > 0,
            "reasons": escalation_reasons,
            "priority": priority
        }
