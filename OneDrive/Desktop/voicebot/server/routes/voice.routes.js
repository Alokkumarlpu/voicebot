import express from 'express';
import { voiceController } from '../controllers/voice.controller.js';

const router = express.Router();

// Process voice/text query
router.post('/query', (req, res) => voiceController.processQuery(req, res));

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'Voice service operational' });
});

export default router;
