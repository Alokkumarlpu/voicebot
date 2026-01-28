import logging
from datetime import datetime

class Logger:
    """Logging utility"""
    
    def __init__(self, name: str = "voicebot-brain"):
        self.logger = logging.getLogger(name)
        
        # Configure logging
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '[%(levelname)s] %(asctime)s - %(name)s - %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)
    
    def info(self, message: str, data: dict = None) -> None:
        """Log info message"""
        if data:
            message = f"{message} | {data}"
        self.logger.info(message)
    
    def error(self, message: str, error: Exception = None) -> None:
        """Log error message"""
        if error:
            message = f"{message} | {str(error)}"
        self.logger.error(message)
    
    def warning(self, message: str) -> None:
        """Log warning message"""
        self.logger.warning(message)
    
    def debug(self, message: str, data: dict = None) -> None:
        """Log debug message"""
        if data:
            message = f"{message} | {data}"
        self.logger.debug(message)
