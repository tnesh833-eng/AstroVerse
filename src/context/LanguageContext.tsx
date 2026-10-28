import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types.ts';
import { translations, TranslationDictionary } from '../i18n/translations.ts';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationDictionary, fallback?: string) => string;
  dictionary: TranslationDictionary;
  getSignName: (signKey: string) => string;
  getElementName: (element: string) => string;
  getPlanetName: (planet: string) => string;
  getModalityName: (modality: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('astroverse_language') as Language;
      if (saved && (saved === 'en' || saved === 'ta' || saved === 'te' || saved === 'hi')) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('astroverse_language', newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      console.warn('Could not save language to localStorage:', e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const dict = translations[language] || translations.en;

  const t = (key: keyof TranslationDictionary, fallback?: string): string => {
    const val = dict[key];
    if (typeof val === 'string') return val;
    return fallback || (translations.en[key] as string) || String(key);
  };

  const getSignName = (signKey: string): string => {
    if (!signKey) return '';
    const normalizedKey = signKey.toLowerCase().trim();
    if (dict.signNames && dict.signNames[normalizedKey]) {
      return dict.signNames[normalizedKey];
    }
    return signKey;
  };

  const getElementName = (element: string): string => {
    if (!element) return '';
    if (dict.elementNames && dict.elementNames[element]) {
      return dict.elementNames[element];
    }
    return element;
  };

  const getPlanetName = (planet: string): string => {
    if (!planet) return '';
    if (dict.planetNames && dict.planetNames[planet]) {
      return dict.planetNames[planet];
    }
    return planet;
  };

  const getModalityName = (modality: string): string => {
    if (!modality) return '';
    if (dict.modalityNames && dict.modalityNames[modality]) {
      return dict.modalityNames[modality];
    }
    return modality;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dictionary: dict,
        getSignName,
        getElementName,
        getPlanetName,
        getModalityName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
