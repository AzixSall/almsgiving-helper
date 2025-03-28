
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
          
          <div className="bg-zakat-50 border border-zakat-100 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-zakat-800 mb-2">What is Zakat al-Fitr?</h3>
            <p className="text-xs text-zakat-700">
              Zakat al-Fitr is a special charity paid by every Muslim at the end of Ramadan. It helps purify the fasting person from any indecent act or speech and helps the poor celebrate Eid. It must be paid before the Eid prayer to be considered valid Zakat al-Fitr.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="familyMembers" className="text-sm font-medium text-zakat-700">Number of Family Members</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 p-0 rounded-full">
                        <Info className="h-4 w-4 text-zakat-600" />
                        <span className="sr-only">Family Members Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Include all individuals for whom you are responsible for paying Zakat al-Fitr, including yourself, spouse, children, and any dependents living in your household.</p>
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
              <p className="text-xs text-zakat-600 mt-1">Include all household members you're paying Zakat for</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zakat-700">Payment Method</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 p-0 rounded-full">
                        <Info className="h-4 w-4 text-zakat-600" />
                        <span className="sr-only">Payment Method Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Zakat al-Fitr can be paid either in food (a Sa'a, which is approximately 2.5-3kg of staple food) or its monetary equivalent per person. The monetary value is currently set at ${PreciousMetalPrices.fitrAmountPerPerson} per person.</p>
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
              <p className="text-xs text-zakat-600 mt-2">
                {values.paymentMethod === 'food' 
                  ? "A Sa'a is approximately 2.5-3kg of staple food like rice, wheat, or barley."
                  : `The current monetary value is set at ${PreciousMetalPrices.fitrAmountPerPerson} USD per person.`}
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
          Calculate Zakat al-Fitr
        </Button>
      </div>
    </form>
  );
};

export default ZakatFitrForm;
