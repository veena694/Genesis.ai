import React, { createContext, useContext } from 'react';

interface LocalizationContextType {
  language: string;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType>({
  language: 'en',
  t: (key) => key,
});

export const useI18n = () => useContext(LocalizationContext);

export const LocalizationProvider: React.FC<{ 
  language?: string; 
  translations?: Record<string, Record<string, string>>;
  children: React.ReactNode;
}> = ({ language = 'en', translations = {}, children }) => {
  const t = (key: string) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};
