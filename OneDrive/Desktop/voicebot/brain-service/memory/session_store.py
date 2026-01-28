from typing import Dict, List

class SessionStore:
    """Store and manage user sessions"""
    
    def __init__(self):
        self.sessions: Dict[str, Dict] = {}
    
    def get_or_create_session(self, session_id: str, language: str = "hi") -> Dict:
        """Get existing session or create new one"""
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "session_id": session_id,
                "language": language,
                "history": [],
                "context": {},
                "created_at": __import__('time').time()
            }
        return self.sessions[session_id]
    
    def add_to_history(self, session_id: str, role: str, message: str) -> None:
        """Add message to conversation history"""
        if session_id in self.sessions:
            self.sessions[session_id]["history"].append({
                "role": role,
                "message": message,
                "timestamp": __import__('time').time()
            })
    
    def get_history(self, session_id: str, limit: int = 10) -> List[Dict]:
        """Get conversation history"""
        if session_id not in self.sessions:
            return []
        return self.sessions[session_id]["history"][-limit:]
    
    def get_context(self, session_id: str) -> Dict:
        """Get session context"""
        if session_id not in self.sessions:
            return {}
        return self.sessions[session_id]["context"]
    
    def update_context(self, session_id: str, context: Dict) -> None:
        """Update session context"""
        if session_id in self.sessions:
            self.sessions[session_id]["context"].update(context)
    
    def delete_session(self, session_id: str) -> None:
        """Delete session"""
        if session_id in self.sessions:
            del self.sessions[session_id]
