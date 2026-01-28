import { config, INTENT_TYPES } from '../config/constants.js';

// Decision Engine - Determines if escalation is needed
export class DecisionEngine {
  constructor() {
    this.confidenceThreshold = config.CONFIDENCE_THRESHOLD;
    this.sentimentThreshold = config.SENTIMENT_NEGATIVE_THRESHOLD;
  }

  makeDecision(intent, confidence, sentiment, turnCount = 1) {
    const decision = {
      shouldEscalate: false,
      reason: null,
      confidence,
      sentiment,
      recommendations: [],
    };

    // Rule 1: Low confidence - escalate
    if (confidence < this.confidenceThreshold) {
      decision.shouldEscalate = true;
      decision.reason = 'confidence';
      decision.recommendations.push('Intent not clearly understood. Manual assistance needed.');
    }

    // Rule 2: Negative sentiment - escalate
    if (sentiment < this.sentimentThreshold) {
      decision.shouldEscalate = true;
      decision.reason = 'sentiment';
      decision.recommendations.push('Driver dissatisfaction detected. Escalate to agent.');
    }

    // Rule 3: Multiple failed turns - escalate
    if (turnCount > 3) {
      decision.shouldEscalate = true;
      decision.reason = 'repeated';
      decision.recommendations.push('Multiple attempts failed. Escalate now.');
    }

    return decision;
  }

  canHandleIntent(intent) {
    const handledIntents = [
      INTENT_TYPES.SWAP_HISTORY,
      INTENT_TYPES.STATION_LOOKUP,
      INTENT_TYPES.PLAN_INFO,
      INTENT_TYPES.LEAVE_INFO,
    ];
    return handledIntents.includes(intent);
  }
}

export const decisionEngine = new DecisionEngine();
