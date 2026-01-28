import express from 'express';
import { agentController } from '../controllers/agent.controller.js';

const router = express.Router();

// Get pending escalations
router.get('/escalations', (req, res) => agentController.getEscalations(req, res));

// Get available agents
router.get('/available', (req, res) => agentController.getAvailableAgents(req, res));

// Get agent details
router.get('/:agentId', (req, res) => agentController.getAgentDetails(req, res));

// Update agent status
router.put('/:agentId/status', (req, res) => agentController.updateAgentStatus(req, res));

export default router;
