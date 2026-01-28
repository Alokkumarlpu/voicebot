// Mock Database Service
// In production, this would connect to MongoDB/PostgreSQL

export class MockDB {
  constructor() {
    this.drivers = [
      {
        id: 'driver_001',
        name: 'Raj Kumar',
        phone: '9876543210',
        language: 'hi',
        active: true,
        joinedDate: '2023-01-15',
      },
      {
        id: 'driver_002',
        name: 'Priya Singh',
        phone: '9876543211',
        language: 'en',
        active: true,
        joinedDate: '2023-02-20',
      },
    ];

    this.swaps = [
      {
        id: 'swap_001',
        driverId: 'driver_001',
        swapDate: '2024-01-15',
        amount: 500,
        status: 'completed',
      },
    ];

    this.stations = [
      {
        id: 'station_001',
        name: 'Delhi Smart Station',
        location: { lat: 28.7041, lng: 77.1025 },
        batteries: 15,
        status: 'operational',
      },
      {
        id: 'station_002',
        name: 'Bangalore Hub',
        location: { lat: 12.9716, lng: 77.5946 },
        batteries: 8,
        status: 'operational',
      },
    ];

    this.subscriptions = [
      {
        id: 'sub_001',
        driverId: 'driver_001',
        planName: 'Premium Plus',
        validTill: '2024-12-31',
        price: 5000,
        features: ['Unlimited swaps', 'Priority support'],
      },
    ];

    this.agents = [
      {
        id: 'agent_001',
        name: 'Amit Sharma',
        department: 'Customer Support',
        available: true,
        queueLength: 2,
        language: 'hi',
      },
      {
        id: 'agent_002',
        name: 'Sarah Johnson',
        department: 'Technical Support',
        available: false,
        queueLength: 5,
        language: 'en',
      },
      {
        id: 'agent_003',
        name: 'Neha Patel',
        department: 'Billing',
        available: true,
        queueLength: 1,
        language: 'hi',
      },
    ];

    this.escalations = [];
  }

  // Driver operations
  getDriver(driverId) {
    return this.drivers.find(d => d.id === driverId);
  }

  // Swap operations
  getSwapHistory(driverId) {
    return this.swaps.filter(s => s.driverId === driverId);
  }

  // Station operations
  getNearestStations(lat, lng, limit = 3) {
    return this.stations.slice(0, limit);
  }

  // Subscription operations
  getSubscription(driverId) {
    return this.subscriptions.find(s => s.driverId === driverId);
  }

  // Agent operations
  getAvailableAgents(language = null) {
    return this.agents.filter(a => a.available && (!language || a.language === language));
  }

  getAllAgents() {
    return this.agents;
  }

  // Escalation operations
  createEscalation(data) {
    const escalation = {
      id: `esc_${Date.now()}`,
      ...data,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    this.escalations.push(escalation);
    return escalation;
  }

  getEscalations(status = 'pending') {
    return this.escalations.filter(e => e.status === status);
  }

  updateEscalation(escalationId, updates) {
    const esc = this.escalations.find(e => e.id === escalationId);
    if (esc) {
      Object.assign(esc, updates);
    }
    return esc;
  }

  // Session operations
  createSession(driverId, language) {
    return {
      sessionId: `session_${Date.now()}`,
      driverId,
      language,
      startTime: new Date().toISOString(),
      messages: [],
    };
  }
}

export const db = new MockDB();
