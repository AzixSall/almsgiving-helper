
import React from 'react';
import { ZakatFitrResults } from '@/utils/zakatCalculations';
import { Button } from '@/components/ui/button';

interface ZakatFitrResultProps {
  results: ZakatFitrResults | null;
  onReset: () => void;
}

const ZakatFitrResult: React.FC<ZakatFitrResultProps> = ({ results, onReset }) => {
  if (!results) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-in-right">
      <div className="glass-card p-6 space-y-6">
        <h2 className="text-xl font-semibold text-zakat-800 text-center">Zakat al-Fitr Results</h2>
        
        <div className="space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">Family Members</span>
            <span className="font-medium text-zakat-900">{results.familyMembers}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">Payment Method</span>
            <span className="font-medium text-zakat-900 capitalize">{results.paymentMethod}</span>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-medium text-zakat-800">Total Zakat al-Fitr</span>
            {results.paymentMethod === 'food' ? (
              <span className="text-lg font-bold text-zakat-800">{results.totalAmount} Sa'a of food</span>
            ) : (
              <span className="text-lg font-bold text-zakat-800">{formatCurrency(results.totalAmount)}</span>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-zakat-50 border border-zakat-100 rounded-lg space-y-3">
          <h3 className="text-sm font-medium text-zakat-700">Important Notes on Zakat al-Fitr:</h3>
          <ul className="text-sm text-zakat-700 list-disc pl-5 space-y-2">
            <li>Zakat al-Fitr should be paid before Eid prayer for it to be valid Zakat. If paid after, it becomes regular charity.</li>
            <li>It should be distributed to the eligible poor and needy in your local community whenever possible.</li>
            <li>Every Muslim who has food in excess of their needs must pay Zakat al-Fitr for themselves and their dependents.</li>
            <li>The payment should ideally be made 1-2 days before Eid al-Fitr, though it can be paid earlier during Ramadan.</li>
          </ul>
        </div>
        
        <div className="p-4 bg-zakat-50 border border-zakat-100 rounded-lg">
          <h3 className="text-sm font-medium text-zakat-700 mb-2">What is a Sa'a?</h3>
          <p className="text-sm text-zakat-700">
            A Sa'a is a unit of measurement equivalent to approximately 2.5-3kg of staple food 
            (like wheat, rice, barley, or dates) that was commonly used during the time of the Prophet Muhammad (PBUH). 
            The food should be of good quality, the kind that you would eat yourself.
          </p>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={onReset}
            variant="outline" 
            className="border-zakat-300 text-zakat-700 hover:bg-zakat-50 px-6 py-2 rounded-full"
          >
            Calculate Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ZakatFitrResult;
