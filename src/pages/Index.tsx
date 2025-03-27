
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZakatForm from '@/components/ZakatForm';
import ZakatResult from '@/components/ZakatResult';
import { ZakatValues, ZakatResults, calculateZakat } from '@/utils/zakatCalculations';

const Index: React.FC = () => {
  const [results, setResults] = useState<ZakatResults | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleCalculate = (values: ZakatValues) => {
    const calculatedResults = calculateZakat(values);
    setResults(calculatedResults);
    setShowForm(false);
  };

  const handleReset = () => {
    setResults(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-zakat-50">
      <div className="max-w-4xl w-full mx-auto px-4 py-8 flex flex-col">
        <Header />
        
        <main className="flex-1 my-8">
          <div className="relative">
            {showForm ? (
              <ZakatForm onCalculate={handleCalculate} />
            ) : (
              <ZakatResult results={results} onReset={handleReset} />
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
