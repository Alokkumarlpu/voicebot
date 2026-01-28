import React, { useState } from 'react';

const VoiceButton = ({ isListening, onStart, onStop, language }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={isListening ? onStop : onStart}
        className={`w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-200 transform hover:scale-105 ${
          isListening
            ? 'bg-red-500 shadow-lg shadow-red-500/50'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isListening ? '🎤 Listening...' : '🎤 Press to Speak'}
      </button>
      <p className="text-sm text-gray-500">Language: {language}</p>
    </div>
  );
};

export default VoiceButton;
