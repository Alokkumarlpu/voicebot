// Confidence Service - Manages confidence metrics
export class ConfidenceService {
  calculateIntentConfidence(nlpResult) {
    // Combine multiple confidence factors
    const factors = {
      nluConfidence: nlpResult.confidence || 0.5,
      entityMatch: nlpResult.entities?.length > 0 ? 0.8 : 0.3,
      contextMatch: nlpResult.contextMatch ? 0.9 : 0.5,
    };

    // Weighted average
    const weights = { nluConfidence: 0.5, entityMatch: 0.3, contextMatch: 0.2 };
    let totalConfidence = 0;
    let totalWeight = 0;

    for (const [factor, value] of Object.entries(factors)) {
      totalConfidence += value * (weights[factor] || 0);
      totalWeight += weights[factor] || 0;
    }

    return Math.round((totalConfidence / totalWeight) * 100) / 100;
  }

  shouldEscalateOnConfidence(confidence, threshold = 0.7) {
    return confidence < threshold;
  }

  getConfidenceMessage(confidence, language = 'en') {
    const messages = {
      en: {
        high: 'I understand your request clearly.',
        medium: 'I think I understand, but I may need clarification.',
        low: 'I am not certain about your request. Would you mind repeating?',
      },
      hi: {
        high: 'मैं आपके अनुरोध को स्पष्ट रूप से समझता हूँ।',
        medium: 'मुझे लगता है कि मैं समझता हूँ, लेकिन स्पष्टता की आवश्यकता हो सकती है।',
        low: 'मुझे आपके अनुरोध के बारे में निश्चित नहीं हूँ। क्या आप दोहरा सकते हैं?',
      },
    };

    const lang = language === 'hi' ? 'hi' : 'en';
    if (confidence >= 0.8) return messages[lang].high;
    if (confidence >= 0.6) return messages[lang].medium;
    return messages[lang].low;
  }
}

export const confidenceService = new ConfidenceService();
