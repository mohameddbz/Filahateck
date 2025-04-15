// src/components/pages/user/GestionStock/Suggestions.js

import React, { useContext } from 'react';
import { LanguageContext } from '../../../../context/LanguageContext';
import { suggestions } from '../../../../data/user/suggestions';
import translations from '../../../../utils/constant/suggestions';

const Suggestions = ({ filter }) => {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  const filteredSuggestions = filter
    ? suggestions.filter((person) => person.role === filter)
    : suggestions;

  return (
    <div
      className="p-6 bg-gray-100 rounded-lg shadow-md"
      style={{ direction: isArabic ? 'rtl' : 'ltr' }}
    >
      <h2 className="text-center text-yellow-600 text-2xl font-semibold mb-4">
        {texts.suggestionsTitle}
      </h2>
      {filteredSuggestions.length > 0 ? (
        filteredSuggestions.map((person, index) => (
          <div
            key={index}
            className="flex mr-20 ml-20 items-center p-4 bg-white border rounded-lg mb-4 shadow-sm space-x-8"
            style={isArabic ? { direction: 'rtl' } : { direction: 'ltr' }}
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-base">{person.name}</h4>
              <p className="text-sm text-gray-600">{person.role}</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
                {texts.messageButton}
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">
                {texts.removeButton}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">{texts.noSuggestions}</p>
      )}
    </div>
  );
};

export default Suggestions;
