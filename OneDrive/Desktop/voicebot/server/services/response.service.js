// Response Service - Formats bot responses
export class ResponseService {
  formatQueryResponse(data, language = 'en') {
    const { intent, result, confidence } = data;

    let response = {
      reply: '',
      success: true,
      confidence,
      data: result,
    };

    const lang = language === 'hi' ? 'hi' : 'en';

    switch (intent) {
      case 'swap_history':
        response.reply = this.formatSwapHistory(result, lang);
        break;
      case 'station_lookup':
        response.reply = this.formatStations(result, lang);
        break;
      case 'plan_info':
        response.reply = this.formatPlanInfo(result, lang);
        break;
      case 'leave_info':
        response.reply = this.formatLeaveInfo(result, lang);
        break;
      default:
        response.reply = lang === 'hi'
          ? 'मुझे इसे समझने में समस्या हुई। क्या आप कृपया दोबारा कहेंगे?'
          : 'I could not understand that. Please try again.';
        response.success = false;
    }

    return response;
  }

  formatSwapHistory(swaps, language) {
    if (!swaps || swaps.length === 0) {
      return language === 'hi'
        ? 'आपके पास कोई स्वैप रिकॉर्ड नहीं है।'
        : 'You have no swap history.';
    }

    const latest = swaps[0];
    return language === 'hi'
      ? `आपका पिछला स्वैप ${latest.swapDate} को था। राशि: ₹${latest.amount}`
      : `Your last swap was on ${latest.swapDate}. Amount: ₹${latest.amount}`;
  }

  formatStations(stations, language) {
    if (!stations || stations.length === 0) {
      return language === 'hi'
        ? 'आपके पास कोई स्टेशन नहीं मिला।'
        : 'No stations found nearby.';
    }

    const station = stations[0];
    return language === 'hi'
      ? `निकटतम स्टेशन: ${station.name}। बैटरियाँ उपलब्ध: ${station.batteries}`
      : `Nearest station: ${station.name}. Available batteries: ${station.batteries}`;
  }

  formatPlanInfo(plan, language) {
    if (!plan) {
      return language === 'hi'
        ? 'आपके पास कोई सक्रिय योजना नहीं है।'
        : 'You have no active plan.';
    }

    return language === 'hi'
      ? `आपकी योजना: ${plan.planName}। वैधता: ${plan.validTill}`
      : `Your plan: ${plan.planName}. Valid until: ${plan.validTill}`;
  }

  formatLeaveInfo(leaveInfo, language) {
    return language === 'hi'
      ? 'छुट्टी की जानकारी के लिए कृपया अपने DSK से संपर्क करें।'
      : 'Please contact your nearest DSK for leave information.';
  }

  formatHandoffSummary(escalation) {
    return {
      escalationId: escalation.id,
      driverName: escalation.driverName,
      driverId: escalation.driverId,
      query: escalation.query,
      escalationReason: escalation.reason,
      confidence: escalation.confidence,
      sentiment: escalation.sentiment,
      summary: escalation.summary,
      conversationHistory: escalation.conversationHistory || [],
      recommendedAgentDepartment: this.getRecommendedDepartment(escalation.reason),
    };
  }

  getRecommendedDepartment(reason) {
    const departments = {
      confidence: 'Customer Support',
      sentiment: 'Customer Support',
      manual: 'Support',
      repeated: 'Technical Support',
    };
    return departments[reason] || 'Customer Support';
  }
}

export const responseService = new ResponseService();
