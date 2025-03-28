
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ZakatValues, PreciousMetalPrices, calculateNisabThreshold } from '@/utils/zakatCalculations';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

interface ZakatFormProps {
  onCalculate: (values: ZakatValues) => void;
}

const ZakatForm: React.FC<ZakatFormProps> = ({ onCalculate }) => {
  const { t, getCurrencySymbol } = useLanguage();
  const [values, setValues] = useState<ZakatValues>({
    cashAmount: 0,
    goldValue: 0,
    silverValue: 0,
    otherInvestments: 0,
    debtsOwed: 0,
    businessAssets: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(values);
  };

  // Calculate the current nisab threshold
  const nisabThreshold = calculateNisabThreshold();
  const currencySymbol = getCurrencySymbol();

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-up">
      <div className="space-y-5">
        {/* Nisab Explanation Card */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-lg font-medium text-zakat-800 mb-2">{t('zakatForm.nisab.title')}</h2>
          <p className="text-sm text-zakat-700 mb-3">
            {t('zakatForm.nisab.explanation')}
          </p>
          
          <div className="bg-zakat-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('zakatForm.nisab.goldPrice')}:</span>
              <span className="font-medium">{currencySymbol}{PreciousMetalPrices.goldPricePerGram.toFixed(2)}/{t('zakatForm.nisab.gram')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t('zakatForm.nisab.silverPrice')}:</span>
              <span className="font-medium">{currencySymbol}{PreciousMetalPrices.silverPricePerGram.toFixed(2)}/{t('zakatForm.nisab.gram')}</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-zakat-100">
              <span>{t('zakatForm.nisab.threshold')}:</span>
              <span className="text-zakat-800">{currencySymbol}{nisabThreshold.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium text-zakat-800 mb-4">{t('zakatForm.assets')}</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="cashAmount" className="text-sm font-medium text-zakat-700">{t('zakatForm.cashBankBalances')}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{t('zakatForm.tooltips.cashAmount')}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="cashAmount"
                name="cashAmount"
                type="number"
                placeholder="0.00"
                value={values.cashAmount || ''}
                onChange={handleInputChange}
                className="subtle-border"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="goldValue" className="text-sm font-medium text-zakat-700">{t('zakatForm.goldValue')}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{t('zakatForm.tooltips.goldValue', { price: currencySymbol + PreciousMetalPrices.goldPricePerGram.toFixed(2) })}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="goldValue"
                name="goldValue"
                type="number"
                placeholder="0.00"
                value={values.goldValue || ''}
                onChange={handleInputChange}
                className="subtle-border"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="silverValue" className="text-sm font-medium text-zakat-700">{t('zakatForm.silverValue')}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{t('zakatForm.tooltips.silverValue', { price: currencySymbol + PreciousMetalPrices.silverPricePerGram.toFixed(2) })}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="silverValue"
                name="silverValue"
                type="number"
                placeholder="0.00"
                value={values.silverValue || ''}
                onChange={handleInputChange}
                className="subtle-border"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="otherInvestments" className="text-sm font-medium text-zakat-700">{t('zakatForm.otherInvestments')}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{t('zakatForm.tooltips.otherInvestments')}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="otherInvestments"
                name="otherInvestments"
                type="number"
                placeholder="0.00"
                value={values.otherInvestments || ''}
                onChange={handleInputChange}
                className="subtle-border"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="businessAssets" className="text-sm font-medium text-zakat-700">{t('zakatForm.businessAssets')}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{t('zakatForm.tooltips.businessAssets')}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="businessAssets"
                name="businessAssets"
                type="number"
                placeholder="0.00"
                value={values.businessAssets || ''}
                onChange={handleInputChange}
                className="subtle-border"
              />
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium text-zakat-800 mb-4">{t('zakatForm.liabilities')}</h2>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="debtsOwed" className="text-sm font-medium text-zakat-700">{t('zakatForm.debtsLiabilities')}</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{t('zakatForm.tooltips.debtsOwed')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="debtsOwed"
              name="debtsOwed"
              type="number"
              placeholder="0.00"
              value={values.debtsOwed || ''}
              onChange={handleInputChange}
              className="subtle-border"
            />
          </div>
        </div>
        
        <div className="p-4 bg-zakat-50 border border-zakat-100 rounded-lg text-sm text-zakat-700">
          <p className="font-medium mb-2">{t('zakatForm.notes.title')}:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t('zakatForm.notes.note1')}</li>
            <li>{t('zakatForm.notes.note2')}</li>
            <li>{t('zakatForm.notes.note3')}</li>
            <li>{t('zakatForm.notes.note4')}</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          type="submit" 
          className="bg-zakat-600 hover:bg-zakat-700 text-white px-8 py-2 rounded-full transition-all duration-300 shadow-soft hover:shadow-md"
        >
          {t('zakatForm.calculate')}
        </Button>
      </div>
    </form>
  );
};

export default ZakatForm;
