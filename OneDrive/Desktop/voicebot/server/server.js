import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/constants.js';
import { Logger } from './utils/logger.js';

// Import routes
import voiceRoutes from './routes/voice.routes.js';
import agentRoutes from './routes/agent.routes.js';
import handoffRoutes from './routes/handoff.routes.js';
import decisionRoutes from './routes/decision.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Request logging
app.use((req, res, next) => {
  Logger.debug(`Incoming ${req.method} request to ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Voicebot Server',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/voice', voiceRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/handoff', handoffRoutes);
app.use('/api/decision', decisionRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  Logger.error('Unhandled error', err);
  res.status(500).json({
    error: 'Internal server error',
    message: config.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Start Server
const PORT = config.PORT;
app.listen(PORT, () => {
  Logger.info(`🚀 Voicebot Server running on http://localhost:${PORT}`);
  Logger.info(`Environment: ${config.NODE_ENV}`);
  Logger.info(`Brain Service: ${config.BRAIN_SERVICE_URL}`);
});

export default app;
