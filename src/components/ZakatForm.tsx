
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ZakatValues, PreciousMetalPrices, calculateNisabThreshold } from '@/utils/zakatCalculations';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ZakatFormProps {
  onCalculate: (values: ZakatValues) => void;
}

const ZakatForm: React.FC<ZakatFormProps> = ({ onCalculate }) => {
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-up">
      <div className="space-y-5">
        {/* Nisab Explanation Card */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-lg font-medium text-zakat-800 mb-2">Understanding Nisab</h2>
          <p className="text-sm text-zakat-700 mb-3">
            Nisab is the minimum amount of wealth a Muslim must possess before they are eligible to pay Zakat.
            It's calculated based on the value of 87.48 grams of gold or 612.36 grams of silver, whichever is lower.
          </p>
          
          <div className="bg-zakat-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Gold Price:</span>
              <span className="font-medium">${PreciousMetalPrices.goldPricePerGram.toFixed(2)}/gram</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Current Silver Price:</span>
              <span className="font-medium">${PreciousMetalPrices.silverPricePerGram.toFixed(2)}/gram</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-zakat-100">
              <span>Current Nisab Threshold:</span>
              <span className="text-zakat-800">${nisabThreshold.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium text-zakat-800 mb-4">Assets</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="cashAmount" className="text-sm font-medium text-zakat-700">Cash & Bank Balances</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Include all cash in hand, checking accounts, savings accounts, and any cash equivalents that you've owned for at least one lunar year.</p>
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
                <Label htmlFor="goldValue" className="text-sm font-medium text-zakat-700">Gold Value</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Include the current market value of all gold you own, including jewelry, coins, and bullion. Gold that's in regular use as jewelry may be exempt in some interpretations. Current gold price: ${PreciousMetalPrices.goldPricePerGram.toFixed(2)}/gram.</p>
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
                <Label htmlFor="silverValue" className="text-sm font-medium text-zakat-700">Silver Value</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Include the current market value of all silver you own, including jewelry, coins, and bullion. Like gold, silver in regular use as jewelry may be exempt in some interpretations. Current silver price: ${PreciousMetalPrices.silverPricePerGram.toFixed(2)}/gram.</p>
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
                <Label htmlFor="otherInvestments" className="text-sm font-medium text-zakat-700">Other Investments</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Include stocks, mutual funds, cryptocurrency, retirement accounts (according to some scholars), rental property values (excluding the portion used for personal residence), and any other non-business investments held for at least one lunar year.</p>
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
                <Label htmlFor="businessAssets" className="text-sm font-medium text-zakat-700">Business Assets</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Include inventory held for sale, raw materials, finished goods, and trade goods. Fixed assets like equipment and buildings used in running the business are generally exempt. Different business types have different Zakat calculations; consult a scholar for specific guidance.</p>
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
          <h2 className="text-lg font-medium text-zakat-800 mb-4">Liabilities</h2>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="debtsOwed" className="text-sm font-medium text-zakat-700">Debts & Liabilities</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-zakat-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Include personal debts due immediately, business debts, short-term loans, credit card balances, outstanding bills, taxes due, and any other liabilities that are currently payable. Long-term mortgage payments (except the amount due now) are typically not deducted.</p>
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
          <p className="font-medium mb-2">Important Notes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Zakat is calculated on wealth owned for a full lunar year.</li>
            <li>Personal items like your home, car, furniture, and clothing for personal use are exempt.</li>
            <li>Zakat rate is 2.5% of your net zakatable wealth above the nisab threshold.</li>
            <li>This calculator provides a general guideline. For specific situations, consult with a knowledgeable Islamic scholar.</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          type="submit" 
          className="bg-zakat-600 hover:bg-zakat-700 text-white px-8 py-2 rounded-full transition-all duration-300 shadow-soft hover:shadow-md"
        >
          Calculate Zakat
        </Button>
      </div>
    </form>
  );
};

export default ZakatForm;
