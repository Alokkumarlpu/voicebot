from typing import Dict, List, Optional

class DialogManager:
    """Manage conversation flow and response generation"""
    
    def __init__(self):
        self.response_templates = self._init_templates()
    
    def _init_templates(self) -> Dict:
        """Initialize response templates"""
        return {
            "swap_history": {
                "hi": "आपकी पिछली स्वैप {date} को थी। राशि: ₹{amount}",
                "en": "Your last swap was on {date}. Amount: ₹{amount}"
            },
            "station_lookup": {
                "hi": "निकटतम स्टेशन: {station_name}। बैटरियाँ: {batteries}। स्थान: {location}",
                "en": "Nearest station: {station_name}. Batteries: {batteries}. Location: {location}"
            },
            "plan_info": {
                "hi": "आपकी योजना: {plan_name}। वैधता: {validity}। कीमत: ₹{price}",
                "en": "Your plan: {plan_name}. Valid until: {validity}. Price: ₹{price}"
            },
            "leave_info": {
                "hi": "छुट्टी की जानकारी के लिए अपने निकटतम DSK से संपर्क करें।",
                "en": "For leave information, please contact your nearest DSK."
            },
            "billing": {
                "hi": "आपका वर्तमान बिल: ₹{amount}। स्थिति: {status}",
                "en": "Your current bill: ₹{amount}. Status: {status}"
            },
            "general": {
                "hi": "कृपया अपनी समस्या विस्तार से बताएं।",
                "en": "Please describe your issue in detail."
            }
        }
    
    def generate_response(self, intent: str, entities: List[Dict], 
                         language: str = "hi", context: Optional[Dict] = None) -> str:
        """Generate response based on intent and entities"""
        
        templates = self.response_templates.get(intent, self.response_templates.get("general"))
        template = templates.get(language, templates.get("en", "I can help you with that."))
        
        # Mock data for demonstration
        mock_data = {
            "date": "15 जनवरी 2024",
            "amount": "500",
            "station_name": "Delhi Smart Station",
            "batteries": "15",
            "location": "28.7041°N, 77.1025°E",
            "plan_name": "Premium Plus",
            "validity": "31 दिसंबर 2024",
            "price": "5000",
            "status": "Active"
        }
        
        try:
            return template.format(**mock_data)
        except KeyError:
            return template
    
    def should_escalate(self, intent: str, confidence: float, sentiment: float) -> bool:
        """Determine if conversation should be escalated"""
        if confidence < 0.7:
            return True
        if sentiment < -0.3:
            return True
        return False
