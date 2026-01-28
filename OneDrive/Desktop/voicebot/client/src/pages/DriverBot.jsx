import React, { useState, useRef, useEffect } from 'react';
import VoiceButton from '../components/VoiceButton';
import BotResponse from '../components/BotResponse';
import LanguageSelect from '../components/LanguageSelect';
import Loader from '../components/Loader';
import { speechService } from '../services/speechService';
import { apiService } from '../services/apiService';

const DriverBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! मैं आपकी मदद के लिए यहाँ हूँ। कृपया अपनी समस्या बताएं।",
      type: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('hi');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartListening = async () => {
    setIsListening(true);
    try {
      const transcript = await speechService.startListening(language);
      if (transcript) {
        addMessage(transcript, 'user');
        setLoading(true);
        const response = await apiService.sendVoiceQuery(transcript, language);
        addMessage(response.reply, 'bot');
        
        // Speak response
        await speechService.speak(response.reply, language);
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    } finally {
      setIsListening(false);
      setLoading(false);
    }
  };

  const handleStopListening = () => {
    setIsListening(false);
    speechService.stopListening();
  };

  const addMessage = (text, type) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-4 border-blue-500">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">🤖 ड्राइवर वॉयसबॉट</h1>
          <p className="text-gray-600 text-sm">Tier-1 Query Resolution</p>
        </div>

        {/* Chat Messages */}
        <div className="bg-white shadow-lg h-96 overflow-y-auto p-6 border-b border-gray-200">
          {messages.map(msg => (
            <BotResponse
              key={msg.id}
              message={msg.text}
              type={msg.type}
              timestamp={msg.timestamp}
            />
          ))}
          {loading && <Loader message="Processing your request..." />}
          <div ref={messagesEndRef} />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-4">
          <LanguageSelect selectedLanguage={language} onLanguageChange={setLanguage} />
          <div className="flex justify-center">
            <VoiceButton
              isListening={isListening}
              onStart={handleStartListening}
              onStop={handleStopListening}
              language={language}
            />
          </div>
          <div className="text-center text-xs text-gray-500">
            <p>Supported: Swap History • Battery Stations • Plans • Leave Info</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverBot;
