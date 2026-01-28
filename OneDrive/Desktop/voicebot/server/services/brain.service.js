import axios from 'axios';
import { config } from '../config/constants.js';

// Brain Service - Calls Python NLU/LLM backend
export class BrainService {
  constructor() {
    this.baseURL = config.BRAIN_SERVICE_URL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: config.API_TIMEOUT,
    });
  }

  async processText(text, language, context = {}) {
    try {
      const response = await this.client.post('/api/process', {
        text,
        language,
        context,
      });
      return response.data;
    } catch (error) {
      console.error('Brain service error:', error);
      return this.getDefaultResponse(text, language);
    }
  }

  async extractIntent(text, language) {
    try {
      const response = await this.client.post('/api/intent', {
        text,
        language,
      });
      return response.data;
    } catch (error) {
      console.error('Intent extraction error:', error);
      return { intent: 'general', confidence: 0.5, entities: [] };
    }
  }

  async analyzeSentiment(text, language) {
    try {
      const response = await this.client.post('/api/sentiment', {
        text,
        language,
      });
      return response.data;
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return { sentiment: 0, confidence: 0.5 };
    }
  }

  // Fallback response if brain service is down
  getDefaultResponse(text, language) {
    const responses = {
      hi: {
        default: 'मुझे खेद है, मैं इसे समझ नहीं पाया। क्या आप कृपया अपनी समस्या दोबारा बताएं?',
        reply: 'आपकी समस्या के लिए मुझे खेद है। कृपया थोड़ी देर प्रतीक्षा करें।',
      },
      en: {
        default: 'I did not understand that. Could you please rephrase your question?',
        reply: 'Sorry to hear that. Please hold while I assist you.',
      },
    };

    const lang = language === 'hi' ? 'hi' : 'en';
    return {
      reply: responses[lang].default,
      intent: 'general',
      confidence: 0.3,
      sentiment: 0,
      shouldEscalate: true,
    };
  }
}

export const brainService = new BrainService();
