
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, LocaleType } from '../translations';

type LanguageContextType = {
  locale: LocaleType;
  t: (key: string) => string;
  changeLanguage: (locale: LocaleType) => void;
};

const defaultLanguageContext: LanguageContextType = {
  locale: 'en',
  t: () => '',
  changeLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>('en');

  const changeLanguage = (newLocale: LocaleType) => {
    setLocale(newLocale);
    // Optionally store language preference in localStorage
    localStorage.setItem('preferred-language', newLocale);
  };

  // Translation function that looks up the key in the translations object
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[locale];
    
    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      current = current[k];
    }
    
    return current;
  };

  // On initial load, check if there's a stored preference
  React.useEffect(() => {
    const storedLanguage = localStorage.getItem('preferred-language') as LocaleType | null;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'fr')) {
      setLocale(storedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
