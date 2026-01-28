import express from 'express';
import { handoffController } from '../controllers/handoff.controller.js';

const router = express.Router();

// Perform warm handoff
router.post('/assign', (req, res) => handoffController.performHandoff(req, res));

// Get handoff summary for agent
router.get('/:escalationId/summary', (req, res) => handoffController.getHandoffSummary(req, res));

// Resolve escalation
router.put('/:escalationId/resolve', (req, res) => handoffController.resolveEscalation(req, res));

export default router;
