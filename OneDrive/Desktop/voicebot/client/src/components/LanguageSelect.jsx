import React from 'react';

const LanguageSelect = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
      <label htmlFor="language" className="text-sm font-medium text-gray-700">
        Language:
      </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="hi">Hindi (हिंदी)</option>
        <option value="hi-en">Hindi + English Mix</option>
        <option value="ta">Tamil (தமிழ்)</option>
        <option value="te">Telugu (తెలుగు)</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSelect;
