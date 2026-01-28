import { db } from '../config/db.js';
import { brainService } from '../services/brain.service.js';
import { decisionEngine } from '../services/decision.engine.js';
import { responseService } from '../services/response.service.js';
import { confidenceService } from '../services/confidence.service.js';
import { Escalation } from '../models/Escalation.js';

export class VoiceController {
  async processQuery(req, res) {
    try {
      const { text, language } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }

      // Step 1: Call Brain Service for NLU
      const nlpResult = await brainService.processText(text, language);

      // Step 2: Calculate confidence
      const confidence = confidenceService.calculateIntentConfidence(nlpResult);

      // Step 3: Analyze sentiment
      const sentimentResult = await brainService.analyzeSentiment(text, language);

      // Step 4: Make escalation decision
      const decision = decisionEngine.makeDecision(
        nlpResult.intent,
        confidence,
        sentimentResult.sentiment
      );

      // Step 5: Generate response
      let response;
      if (decision.shouldEscalate) {
        // Create escalation
        response = await this.createEscalation(
          text,
          nlpResult,
          confidence,
          sentimentResult.sentiment,
          decision.reason,
          language
        );
      } else {
        // Handle the query directly
        response = responseService.formatQueryResponse(
          {
            intent: nlpResult.intent,
            result: nlpResult.result,
            confidence,
          },
          language
        );
      }

      res.json(response);
    } catch (error) {
      console.error('Voice controller error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createEscalation(query, nlpResult, confidence, sentiment, reason, language) {
    const escalation = new Escalation({
      id: `esc_${Date.now()}`,
      driverId: 'driver_001', // In production, get from session
      driverName: 'Raj Kumar',
      query,
      reason,
      confidence,
      sentiment,
      summary: this.generateSummary(query, nlpResult, language),
      status: 'pending',
      conversationHistory: [{ role: 'user', content: query }],
    });

    db.createEscalation(escalation.toJSON());

    return {
      escalated: true,
      escalationId: escalation.id,
      reply:
        language === 'hi'
          ? 'कृपया एक क्षण प्रतीक्षा करें। मैं आपको किसी एजेंट से जोड़ रहा हूँ।'
          : 'Please hold while I connect you to an agent.',
      confidence,
    };
  }

  generateSummary(query, nlpResult, language) {
    return language === 'hi'
      ? `ड्राइवर की समस्या: ${query}। इरादा: ${nlpResult.intent}`
      : `Driver issue: ${query}. Intent: ${nlpResult.intent}`;
  }
}

export const voiceController = new VoiceController();
