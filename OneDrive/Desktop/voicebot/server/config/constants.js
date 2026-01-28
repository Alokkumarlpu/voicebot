export const config = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Python Brain Service
  BRAIN_SERVICE_URL: process.env.BRAIN_SERVICE_URL || 'http://localhost:8000',

  // Database (Mock)
  DB_TYPE: 'mock', // 'mock' | 'mongodb' | 'postgresql'

  // Confidence & Escalation Thresholds
  CONFIDENCE_THRESHOLD: parseFloat(process.env.CONFIDENCE_THRESHOLD || '0.7'),
  SENTIMENT_NEGATIVE_THRESHOLD: parseFloat(process.env.SENTIMENT_NEGATIVE_THRESHOLD || '-0.3'),

  // Supported Languages
  SUPPORTED_LANGUAGES: ['en', 'hi', 'ta', 'te', 'hi-en'],

  // API Timeouts
  API_TIMEOUT: 30000,
};

// Tier-1 Intent Types
export const INTENT_TYPES = {
  SWAP_HISTORY: 'swap_history',
  STATION_LOOKUP: 'station_lookup',
  PLAN_INFO: 'plan_info',
  LEAVE_INFO: 'leave_info',
  BILLING: 'billing',
  GENERAL: 'general',
};

// Escalation Reasons
export const ESCALATION_REASONS = {
  LOW_CONFIDENCE: 'confidence',
  NEGATIVE_SENTIMENT: 'sentiment',
  MANUAL_REQUEST: 'manual',
  REPEATED_INTENT: 'repeated',
};
