/**
 * Synchro - Language Context
 * Provides multi-language support throughout the application
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, detectLanguage } from '@/lib/i18n';

type LanguageCode = keyof typeof translations;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof translations[LanguageCode];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('synchro_language');
    if (stored && stored in translations) {
      return stored as LanguageCode;
    }
    // Otherwise detect from browser
    return detectLanguage();
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('synchro_language', lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
