import React, { useState, useEffect } from 'react';
import AgentCard from '../components/AgentCard';
import Loader from '../components/Loader';
import { apiService } from '../services/apiService';

const AgentDashboard = () => {
  const [escalations, setEscalations] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedEscalation, setSelectedEscalation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEscalations();
    fetchAgents();
  }, []);

  const fetchEscalations = async () => {
    try {
      const data = await apiService.getEscalations();
      setEscalations(data);
    } catch (error) {
      console.error('Error fetching escalations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const data = await apiService.getAvailableAgents();
      setAgents(data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleHandoff = async (escalationId, agentId) => {
    try {
      await apiService.performHandoff(escalationId, agentId);
      setSelectedEscalation(null);
      fetchEscalations();
    } catch (error) {
      console.error('Error during handoff:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader message="Loading Dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-green-500">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">👨‍💼 Agent Dashboard</h1>
          <p className="text-gray-600">Warm Handoff Queue & Live Status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Escalations Queue */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📋 Pending Escalations ({escalations.length})
              </h2>
              {escalations.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No pending escalations</p>
              ) : (
                <div className="space-y-4">
                  {escalations.map(esc => (
                    <div
                      key={esc.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedEscalation?.id === esc.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedEscalation(esc)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{esc.driverName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          esc.reason === 'confidence' ? 'bg-yellow-100 text-yellow-800' :
                          esc.reason === 'sentiment' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {esc.reason === 'confidence' ? '📊 Low Confidence' :
                           esc.reason === 'sentiment' ? '😞 Negative Sentiment' :
                           '🔗 Manual Request'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">Query: {esc.query}</p>
                      <p className="text-xs text-gray-500">
                        Timestamp: {new Date(esc.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Available Agents & Handoff */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">👥 Available Agents</h2>
              {selectedEscalation ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500 mb-4">
                    <p className="text-sm font-semibold text-gray-900">Selected Escalation</p>
                    <p className="text-xs text-gray-600">{selectedEscalation.query}</p>
                  </div>
                  {agents.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No agents available</p>
                  ) : (
                    agents.map(agent => (
                      <div key={agent.id}>
                        <AgentCard agent={agent} onSelect={() => {}} />
                        <button
                          onClick={() => handleHandoff(selectedEscalation.id, agent.id)}
                          className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                          Assign to {agent.name}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Select an escalation to assign</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
