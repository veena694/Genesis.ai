import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const LocalizationContext = createContext({
    language: 'en',
    t: (key) => key,
});
export const useI18n = () => useContext(LocalizationContext);
export const LocalizationProvider = ({ language = 'en', translations = {}, children }) => {
    const t = (key) => {
        return translations[language]?.[key] || translations['en']?.[key] || key;
    };
    return (_jsx(LocalizationContext.Provider, { value: { language, t }, children: children }));
};
