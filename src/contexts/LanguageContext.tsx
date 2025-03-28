
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, LocaleType } from '../translations';

export type CurrencyType = 'USD' | 'EUR' | 'XOF';

type LanguageContextType = {
  locale: LocaleType;
  currency: CurrencyType;
  t: (key: string) => string;
  changeLanguage: (locale: LocaleType) => void;
  changeCurrency: (currency: CurrencyType) => void;
  getCurrencySymbol: () => string;
};

const defaultLanguageContext: LanguageContextType = {
  locale: 'fr',
  currency: 'XOF',
  t: () => '',
  changeLanguage: () => {},
  changeCurrency: () => {},
  getCurrencySymbol: () => '',
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>('fr');
  const [currency, setCurrency] = useState<CurrencyType>('XOF');

  const changeLanguage = (newLocale: LocaleType) => {
    setLocale(newLocale);
    // Optionally store language preference in localStorage
    localStorage.setItem('preferred-language', newLocale);
  };

  const changeCurrency = (newCurrency: CurrencyType) => {
    setCurrency(newCurrency);
    localStorage.setItem('preferred-currency', newCurrency);
  };

  // Get currency symbol based on currency type
  const getCurrencySymbol = (): string => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'XOF':
        return 'FCFA';
      default:
        return '';
    }
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

    const storedCurrency = localStorage.getItem('preferred-currency') as CurrencyType | null;
    if (storedCurrency && (storedCurrency === 'USD' || storedCurrency === 'EUR' || storedCurrency === 'XOF')) {
      setCurrency(storedCurrency);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, currency, t, changeLanguage, changeCurrency, getCurrencySymbol }}>
      {children}
    </LanguageContext.Provider>
  );
};
