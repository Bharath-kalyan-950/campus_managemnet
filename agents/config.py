"""
Configuration for AI agents
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # Google Gemini AI Configuration
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    GEMINI_MODEL = 'gemini-1.5-flash-latest'
    
    # Database Configuration
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_NAME = os.getenv('DB_NAME', 'smart_campus_db')
    
    # AI Agent Settings
    MAX_RETRIES = 3
    TIMEOUT_SECONDS = 30
    CONFIDENCE_THRESHOLD = 0.7
    
    # Logging
    LOG_LEVEL = 'INFO'
    LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'