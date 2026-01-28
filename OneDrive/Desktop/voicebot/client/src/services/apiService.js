import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

class ApiService {
  async sendVoiceQuery(transcript, language) {
    try {
      const response = await axios.post(`${API_BASE}/voice/query`, {
        text: transcript,
        language,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getEscalations() {
    try {
      const response = await axios.get(`${API_BASE}/agent/escalations`);
      return response.data.escalations || [];
    } catch (error) {
      console.error('Error fetching escalations:', error);
      return [];
    }
  }

  async getAvailableAgents() {
    try {
      const response = await axios.get(`${API_BASE}/agent/available`);
      return response.data.agents || [];
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  }

  async performHandoff(escalationId, agentId) {
    try {
      const response = await axios.post(`${API_BASE}/handoff/assign`, {
        escalationId,
        agentId,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Handoff error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
