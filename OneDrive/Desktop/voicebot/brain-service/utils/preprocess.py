import re
from typing import Optional

class TextPreprocessor:
    """Preprocess text for NLU"""
    
    def preprocess(self, text: str, language: str = "hi") -> str:
        """Clean and normalize text"""
        # Convert to lowercase
        text = text.lower()
        
        # Remove extra spaces
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Remove special characters but keep spaces and basic punctuation
        if language == "hi":
            text = re.sub(r'[^a-z0-9\s\u0900-\u097F।]', '', text)
        else:
            text = re.sub(r'[^a-z0-9\s]', '', text)
        
        return text
    
    def remove_noise(self, text: str) -> str:
        """Remove noise from text"""
        # Remove URLs
        text = re.sub(r'http\S+|www.\S+', '', text)
        
        # Remove email addresses
        text = re.sub(r'\S+@\S+', '', text)
        
        # Remove multiple spaces
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def tokenize(self, text: str) -> list:
        """Tokenize text into words"""
        return text.split()
    
    def remove_stopwords(self, text: str, language: str = "hi") -> str:
        """Remove common stopwords"""
        stopwords = self._get_stopwords(language)
        words = text.split()
        filtered = [w for w in words if w not in stopwords]
        return ' '.join(filtered)
    
    def _get_stopwords(self, language: str) -> set:
        """Get stopwords for language"""
        stopwords = {
            "hi": {"का", "के", "की", "है", "हैं", "मैं", "तुम", "वह", "में", "पर"},
            "en": {"the", "is", "are", "a", "an", "and", "or", "in", "on", "at"}
        }
        return stopwords.get(language, stopwords.get("en", set()))
