
import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgeDollarSign, BadgeEuro, Banknote } from 'lucide-react';
import { useLanguage, CurrencyType } from '@/contexts/LanguageContext';

const CurrencySwitcher: React.FC = () => {
  const { currency, changeCurrency, t } = useLanguage();

  const handleCurrencyChange = (newCurrency: CurrencyType) => {
    changeCurrency(newCurrency);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleCurrencyChange('USD')}
        className={`p-1 ${currency === 'USD' ? 'bg-zakat-100 text-zakat-900' : 'text-zakat-600'}`}
        aria-label={t('currency.usd')}
      >
        <BadgeDollarSign className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleCurrencyChange('EUR')}
        className={`p-1 ${currency === 'EUR' ? 'bg-zakat-100 text-zakat-900' : 'text-zakat-600'}`}
        aria-label={t('currency.eur')}
      >
        <BadgeEuro className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleCurrencyChange('XOF')}
        className={`p-1 ${currency === 'XOF' ? 'bg-zakat-100 text-zakat-900' : 'text-zakat-600'}`}
        aria-label={t('currency.xof')}
      >
        <Banknote className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CurrencySwitcher;
