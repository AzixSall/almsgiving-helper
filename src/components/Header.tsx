
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';
import AdminPriceEditor from './AdminPriceEditor';

const Header: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <header className="py-6 px-6 sm:px-8 flex flex-col items-center animate-fade-in">
      <div className="w-full flex justify-end mb-2 space-x-4">
        <AdminPriceEditor />
        <CurrencySwitcher />
        <LanguageSwitcher />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center text-zakat-900">
          {t('header.title')}
        </h1>
        <div className="h-1 w-16 bg-zakat-500 rounded-full mt-2"></div>
        <p className="mt-3 text-zakat-700 text-center text-sm max-w-md">
          {t('header.subtitle')}
        </p>
      </div>
    </header>
  );
};

export default Header;
