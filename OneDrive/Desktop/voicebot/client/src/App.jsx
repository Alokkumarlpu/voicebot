import React, { useState } from 'react';
import DriverBot from './pages/DriverBot';
import AgentDashboard from './pages/AgentDashboard';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('driver'); // 'driver' or 'agent'

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🎤 Voicebot Hackathon</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('driver')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'driver'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Driver UI
            </button>
            <button
              onClick={() => setCurrentPage('agent')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'agent'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Agent Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'driver' ? <DriverBot /> : <AgentDashboard />}
      </main>
    </div>
  );
}

export default App;
