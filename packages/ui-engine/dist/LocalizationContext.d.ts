import React from 'react';
interface LocalizationContextType {
    language: string;
    t: (key: string) => string;
}
export declare const useI18n: () => LocalizationContextType;
export declare const LocalizationProvider: React.FC<{
    language?: string;
    translations?: Record<string, Record<string, string>>;
    children: React.ReactNode;
}>;
export {};
