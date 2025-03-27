
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ZakatValues } from '@/utils/zakatCalculations';

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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-up">
      <div className="space-y-5">
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium text-zakat-800 mb-4">Assets</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cashAmount" className="text-sm font-medium text-zakat-700">Cash & Bank Balances</Label>
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
              <Label htmlFor="goldValue" className="text-sm font-medium text-zakat-700">Gold Value</Label>
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
              <Label htmlFor="silverValue" className="text-sm font-medium text-zakat-700">Silver Value</Label>
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
              <Label htmlFor="otherInvestments" className="text-sm font-medium text-zakat-700">Other Investments</Label>
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
              <Label htmlFor="businessAssets" className="text-sm font-medium text-zakat-700">Business Assets</Label>
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
            <Label htmlFor="debtsOwed" className="text-sm font-medium text-zakat-700">Debts & Liabilities</Label>
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
