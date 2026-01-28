import React from 'react';

const BotResponse = ({ message, type = 'response', timestamp }) => {
  const bgColor = type === 'user' ? 'bg-blue-100' : 'bg-gray-100';
  const alignment = type === 'user' ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex ${alignment} mb-4`}>
      <div className={`${bgColor} rounded-lg px-4 py-3 max-w-xs lg:max-w-md`}>
        <p className="text-gray-800 text-sm lg:text-base">{message}</p>
        {timestamp && (
          <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
        )}
      </div>
    </div>
  );
};

export default BotResponse;
