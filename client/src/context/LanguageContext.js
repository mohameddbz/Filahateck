import React, { createContext, useState } from 'react';

// Create the context
export const LanguageContext = createContext();

// Create the provider
export const LanguageProvider = ({ children }) => {
  const [isArabic, setIsArabic] = useState(false);

  const toggleToArabic = () => setIsArabic(true);
  const toggleToFrench = () => setIsArabic(false);

  return (
    <LanguageContext.Provider value={{ isArabic, toggleToArabic, toggleToFrench }}>
      {children}
    </LanguageContext.Provider>
  );
};
