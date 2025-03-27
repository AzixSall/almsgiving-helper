
import React from 'react';
import { ZakatResults } from '@/utils/zakatCalculations';
import { Button } from '@/components/ui/button';

interface ZakatResultProps {
  results: ZakatResults | null;
  onReset: () => void;
}

const ZakatResult: React.FC<ZakatResultProps> = ({ results, onReset }) => {
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
        <h2 className="text-xl font-semibold text-zakat-800 text-center">Zakat Calculation Results</h2>
        
        <div className="space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">Total Assets</span>
            <span className="font-medium text-zakat-900">{formatCurrency(results.totalAssets)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">Total Liabilities</span>
            <span className="font-medium text-zakat-900">{formatCurrency(results.totalLiabilities)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">Net Zakatable Amount</span>
            <span className="font-medium text-zakat-900">{formatCurrency(results.netZakatableAmount)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">Nisab Threshold</span>
            <span className="font-medium text-zakat-900">{formatCurrency(results.nisabThreshold)}</span>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-medium text-zakat-800">Zakat Payable</span>
            <span className="text-lg font-bold text-zakat-800">{formatCurrency(results.zakatPayable)}</span>
          </div>
        </div>
        
        {!results.eligibleForZakat && (
          <div className="mt-4 p-4 bg-zakat-50 border border-zakat-100 rounded-lg">
            <p className="text-sm text-zakat-700 text-center">
              Your net zakatable assets are below the Nisab threshold. 
              You are not obligated to pay Zakat this year.
            </p>
          </div>
        )}
        
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

export default ZakatResult;
