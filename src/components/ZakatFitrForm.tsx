
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { ZakatFitrValues, PreciousMetalPrices } from '@/utils/zakatCalculations';
import { useLanguage } from '@/contexts/LanguageContext';

interface ZakatFitrFormProps {
  onCalculate: (values: ZakatFitrValues) => void;
}

const ZakatFitrForm: React.FC<ZakatFitrFormProps> = ({ onCalculate }) => {
  const { t, currency, getCurrencySymbol } = useLanguage();
  
  const [values, setValues] = useState<ZakatFitrValues>({
    familyMembers: 1,
    paymentMethod: 'food'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'familyMembers') {
      setValues(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePaymentMethodChange = (method: 'food' | 'money') => {
    setValues(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(values);
  };

  const formatCurrency = (amount: number) => {
    if (currency === 'XOF') {
      return `${amount} ${getCurrencySymbol()}`;
    }
    
    return `${getCurrencySymbol()}${amount}`;
  };
  
  // Get fitr amount for current currency
  const fitrAmount = PreciousMetalPrices[currency].fitrAmountPerPerson;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-up">
      <div className="space-y-5">
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium text-zakat-800 mb-4">{t('zakatFitr.title')}</h2>
          
          <div className="bg-zakat-50 border border-zakat-100 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-zakat-800 mb-2">{t('zakatFitr.what')}</h3>
            <p className="text-xs text-zakat-700">
              {t('zakatFitr.explanation')}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="familyMembers" className="text-sm font-medium text-zakat-700">{t('zakatFitr.familyMembers')}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 p-0 rounded-full">
                        <Info className="h-4 w-4 text-zakat-600" />
                        <span className="sr-only">{t('zakatFitr.familyMembers')}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{t('zakatFitr.familyMembersTooltip')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="familyMembers"
                name="familyMembers"
                type="number"
                min="1"
                placeholder="1"
                value={values.familyMembers || ''}
                onChange={handleInputChange}
                className="subtle-border"
              />
              <p className="text-xs text-zakat-600 mt-1">{t('zakatFitr.familyMembersHelper')}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zakat-700">{t('zakatFitr.paymentMethod')}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 p-0 rounded-full">
                        <Info className="h-4 w-4 text-zakat-600" />
                        <span className="sr-only">{t('zakatFitr.paymentMethod')}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{t('zakatFitr.paymentMethodTooltip')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Button
                  type="button"
                  variant={values.paymentMethod === 'food' ? 'default' : 'outline'}
                  className={values.paymentMethod === 'food' ? 'bg-zakat-600 hover:bg-zakat-700' : ''}
                  onClick={() => handlePaymentMethodChange('food')}
                >
                  {t('zakatFitr.food')}
                </Button>
                <Button
                  type="button"
                  variant={values.paymentMethod === 'money' ? 'default' : 'outline'}
                  className={values.paymentMethod === 'money' ? 'bg-zakat-600 hover:bg-zakat-700' : ''}
                  onClick={() => handlePaymentMethodChange('money')}
                >
                  {t('zakatFitr.money')}
                </Button>
              </div>
              <p className="text-xs text-zakat-600 mt-2">
                {values.paymentMethod === 'food' 
                  ? t('zakatFitr.foodHelper')
                  : `${t('zakatFitr.moneyHelper')} ${formatCurrency(fitrAmount)} ${t('zakatFitr.perPerson')}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          type="submit" 
          className="bg-zakat-600 hover:bg-zakat-700 text-white px-8 py-2 rounded-full transition-all duration-300 shadow-soft hover:shadow-md"
        >
          {t('zakatFitr.calculate')}
        </Button>
      </div>
    </form>
  );
};

export default ZakatFitrForm;
