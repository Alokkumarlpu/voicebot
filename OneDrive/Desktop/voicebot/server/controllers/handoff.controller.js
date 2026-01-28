import { db } from '../config/db.js';
import { responseService } from '../services/response.service.js';

export class HandoffController {
  async performHandoff(req, res) {
    try {
      const { escalationId, agentId } = req.body;

      if (!escalationId || !agentId) {
        return res.status(400).json({ error: 'Escalation ID and Agent ID required' });
      }

      // Get escalation
      const escalations = db.getEscalations();
      const escalation = escalations.find(e => e.id === escalationId);

      if (!escalation) {
        return res.status(404).json({ error: 'Escalation not found' });
      }

      // Get agent
      const agent = db.getAllAgents().find(a => a.id === agentId);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      // Update escalation
      const updatedEscalation = db.updateEscalation(escalationId, {
        assignedAgentId: agentId,
        status: 'assigned',
      });

      // Format handoff summary for agent
      const handoffSummary = responseService.formatHandoffSummary(updatedEscalation);

      res.json({
        success: true,
        message: `Escalation assigned to ${agent.name}`,
        escalation: updatedEscalation,
        handoffSummary,
      });
    } catch (error) {
      console.error('Handoff error:', error);
      res.status(500).json({ error: 'Handoff failed' });
    }
  }

  async getHandoffSummary(req, res) {
    try {
      const { escalationId } = req.params;

      const escalations = db.getEscalations();
      const escalation = escalations.find(e => e.id === escalationId);

      if (!escalation) {
        return res.status(404).json({ error: 'Escalation not found' });
      }

      const summary = responseService.formatHandoffSummary(escalation);
      res.json(summary);
    } catch (error) {
      console.error('Error fetching handoff summary:', error);
      res.status(500).json({ error: 'Failed to fetch summary' });
    }
  }

  async resolveEscalation(req, res) {
    try {
      const { escalationId } = req.params;
      const { status, notes } = req.body;

      const updatedEscalation = db.updateEscalation(escalationId, {
        status,
        resolutionNotes: notes,
      });

      res.json({
        success: true,
        message: 'Escalation resolved',
        escalation: updatedEscalation,
      });
    } catch (error) {
      console.error('Error resolving escalation:', error);
      res.status(500).json({ error: 'Failed to resolve escalation' });
    }
  }
}

export const handoffController = new HandoffController();
