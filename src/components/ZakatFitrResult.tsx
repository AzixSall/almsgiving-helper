
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
        
        <div className="mt-6 p-4 bg-zakat-50 border border-zakat-100 rounded-lg">
          <p className="text-sm text-zakat-700 text-center">
            Zakat al-Fitr should be paid before Eid prayer for it to be valid Zakat.
            If paid after, it becomes regular charity.
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
