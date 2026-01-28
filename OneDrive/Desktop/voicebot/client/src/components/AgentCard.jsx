import React from 'react';

const AgentCard = ({ agent, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer"
         onClick={() => onSelect(agent.id)}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {agent.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
          <p className="text-xs text-gray-500">{agent.department}</p>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>Status: <span className={`font-semibold ${agent.available ? 'text-green-600' : 'text-red-600'}`}>
          {agent.available ? 'Available' : 'Busy'}
        </span></span>
        <span>Queue: {agent.queueLength}</span>
      </div>
    </div>
  );
};

export default AgentCard;
