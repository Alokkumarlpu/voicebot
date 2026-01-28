class ResponseTemplates:
    """Response templates for different scenarios"""
    
    def __init__(self):
        self.templates = {
            "greeting": {
                "hi": "नमस्ते! मैं आपकी मदद के लिए यहाँ हूँ। कृपया अपनी समस्या बताएं।",
                "en": "Hello! I'm here to help. What can I assist you with?"
            },
            "confirmation": {
                "hi": "क्या मैं सही समझा? आप {intent} के बारे में पूछ रहे हैं?",
                "en": "Did I understand correctly? You're asking about {intent}?"
            },
            "clarification": {
                "hi": "कृपया और विस्तार से बताएं।",
                "en": "Could you provide more details?"
            },
            "escalation": {
                "hi": "मुझे खेद है, मुझे इसे संभालने में मदद चाहिए। कृपया एजेंट के साथ बात करें।",
                "en": "I apologize, I need to get an agent to help you."
            },
            "error": {
                "hi": "मुझे खेद है, कुछ गलत हुआ। कृपया फिर से कोशिश करें।",
                "en": "I'm sorry, something went wrong. Please try again."
            }
        }
    
    def get_template(self, template_name: str, language: str = "hi", **kwargs) -> str:
        """Get response template"""
        if template_name not in self.templates:
            return self.templates["error"].get(language, self.templates["error"]["en"])
        
        template = self.templates[template_name].get(language, 
                                                      self.templates[template_name].get("en"))
        
        try:
            return template.format(**kwargs)
        except KeyError:
            return template
