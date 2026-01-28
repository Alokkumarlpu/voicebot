import { db } from '../config/db.js';
import { responseService } from '../services/response.service.js';

export class AgentController {
  async getEscalations(req, res) {
    try {
      const escalations = db.getEscalations('pending');
      res.json({ escalations });
    } catch (error) {
      console.error('Error fetching escalations:', error);
      res.status(500).json({ error: 'Failed to fetch escalations' });
    }
  }

  async getAvailableAgents(req, res) {
    try {
      const agents = db.getAvailableAgents();
      res.json({ agents });
    } catch (error) {
      console.error('Error fetching agents:', error);
      res.status(500).json({ error: 'Failed to fetch agents' });
    }
  }

  async getAgentDetails(req, res) {
    try {
      const { agentId } = req.params;
      const agent = db.getAllAgents().find(a => a.id === agentId);

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      res.json({ agent });
    } catch (error) {
      console.error('Error fetching agent details:', error);
      res.status(500).json({ error: 'Failed to fetch agent' });
    }
  }

  async updateAgentStatus(req, res) {
    try {
      const { agentId } = req.params;
      const { available } = req.body;

      const agent = db.getAllAgents().find(a => a.id === agentId);
      if (agent) {
        agent.available = available;
      }

      res.json({ success: true, agent });
    } catch (error) {
      console.error('Error updating agent status:', error);
      res.status(500).json({ error: 'Failed to update agent' });
    }
  }
}

export const agentController = new AgentController();
