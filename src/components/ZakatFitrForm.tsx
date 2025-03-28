
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ZakatFitrValues } from '@/utils/zakatCalculations';

interface ZakatFitrFormProps {
  onCalculate: (values: ZakatFitrValues) => void;
}

const ZakatFitrForm: React.FC<ZakatFitrFormProps> = ({ onCalculate }) => {
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-up">
      <div className="space-y-5">
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium text-zakat-800 mb-4">Zakat al-Fitr Details</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="familyMembers" className="text-sm font-medium text-zakat-700">Number of Family Members</Label>
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
              <p className="text-xs text-zakat-600 mt-1">Include all household members you're paying Zakat for</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zakat-700">Payment Method</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Button
                  type="button"
                  variant={values.paymentMethod === 'food' ? 'default' : 'outline'}
                  className={values.paymentMethod === 'food' ? 'bg-zakat-600 hover:bg-zakat-700' : ''}
                  onClick={() => handlePaymentMethodChange('food')}
                >
                  Food (Sa'a)
                </Button>
                <Button
                  type="button"
                  variant={values.paymentMethod === 'money' ? 'default' : 'outline'}
                  className={values.paymentMethod === 'money' ? 'bg-zakat-600 hover:bg-zakat-700' : ''}
                  onClick={() => handlePaymentMethodChange('money')}
                >
                  Money
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          type="submit" 
          className="bg-zakat-600 hover:bg-zakat-700 text-white px-8 py-2 rounded-full transition-all duration-300 shadow-soft hover:shadow-md"
        >
          Calculate Zakat al-Fitr
        </Button>
      </div>
    </form>
  );
};

export default ZakatFitrForm;
