// Escalation Model
export class Escalation {
  constructor(data) {
    this.id = data.id;
    this.driverId = data.driverId;
    this.driverName = data.driverName;
    this.query = data.query;
    this.reason = data.reason; // 'confidence', 'sentiment', 'manual', 'repeated'
    this.confidence = data.confidence || null;
    this.sentiment = data.sentiment || null;
    this.summary = data.summary || '';
    this.assignedAgentId = data.assignedAgentId || null;
    this.status = data.status || 'pending'; // 'pending', 'assigned', 'resolved'
    this.timestamp = data.timestamp || new Date().toISOString();
    this.conversationHistory = data.conversationHistory || [];
  }

  static fromDB(dbEscalation) {
    return new Escalation(dbEscalation);
  }

  toJSON() {
    return {
      id: this.id,
      driverId: this.driverId,
      driverName: this.driverName,
      query: this.query,
      reason: this.reason,
      confidence: this.confidence,
      sentiment: this.sentiment,
      summary: this.summary,
      assignedAgentId: this.assignedAgentId,
      status: this.status,
      timestamp: this.timestamp,
    };
  }
}
