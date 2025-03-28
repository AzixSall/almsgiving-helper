
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { BadgeDollarSign, BadgeEuro, Banknote } from 'lucide-react';
import { useLanguage, CurrencyType } from '@/contexts/LanguageContext';

const CurrencySwitcher: React.FC = () => {
  const { currency, changeCurrency, t } = useLanguage();
  
  const handleCurrencyChange = (newCurrency: CurrencyType) => {
    changeCurrency(newCurrency);
  };

  const getCurrencyIcon = (currencyType: CurrencyType) => {
    switch(currencyType) {
      case 'USD':
        return <BadgeDollarSign className="h-4 w-4 mr-2" />;
      case 'EUR':
        return <BadgeEuro className="h-4 w-4 mr-2" />;
      case 'XOF':
        return <Banknote className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  const getCurrencyName = (currencyType: CurrencyType) => {
    switch(currencyType) {
      case 'USD':
        return t('currency.usdFull');
      case 'EUR':
        return t('currency.eurFull');
      case 'XOF':
        return t('currency.xofFull');
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center">
      <Select value={currency} onValueChange={(value) => handleCurrencyChange(value as CurrencyType)}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Select Currency">
            <div className="flex items-center">
              {getCurrencyIcon(currency)}
              {getCurrencyName(currency)}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD" className="flex items-center">
            <div className="flex items-center">
              <BadgeDollarSign className="h-4 w-4 mr-2" />
              {t('currency.usdFull')}
            </div>
          </SelectItem>
          <SelectItem value="EUR">
            <div className="flex items-center">
              <BadgeEuro className="h-4 w-4 mr-2" />
              {t('currency.eurFull')}
            </div>
          </SelectItem>
          <SelectItem value="XOF">
            <div className="flex items-center">
              <Banknote className="h-4 w-4 mr-2" />
              {t('currency.xofFull')}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySwitcher;
