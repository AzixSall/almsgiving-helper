
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZakatForm from '@/components/ZakatForm';
import ZakatResult from '@/components/ZakatResult';
import ZakatFitrForm from '@/components/ZakatFitrForm';
import ZakatFitrResult from '@/components/ZakatFitrResult';
import { 
  ZakatValues, 
  ZakatResults, 
  calculateZakat,
  ZakatFitrValues,
  ZakatFitrResults,
  calculateZakatFitr
} from '@/utils/zakatCalculations';
import { Button } from '@/components/ui/button';
import { Home, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type ZakatType = 'regular' | 'fitr';

const Index: React.FC = () => {
  const [results, setResults] = useState<ZakatResults | null>(null);
  const [fitrResults, setFitrResults] = useState<ZakatFitrResults | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [zakatType, setZakatType] = useState<ZakatType>('regular');
  const { t, currency } = useLanguage();

  const handleCalculate = (values: ZakatValues) => {
    const calculatedResults = calculateZakat(values, currency);
    setResults(calculatedResults);
    setShowForm(false);
  };

  const handleCalculateFitr = (values: ZakatFitrValues) => {
    const calculatedResults = calculateZakatFitr(values, currency);
    setFitrResults(calculatedResults);
    setShowForm(false);
  };

  const handleReset = () => {
    setResults(null);
    setFitrResults(null);
    setShowForm(true);
  };

  const switchZakatType = (type: ZakatType) => {
    setZakatType(type);
    setResults(null);
    setFitrResults(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-zakat-50">
      <div className="max-w-4xl w-full mx-auto px-4 py-8 flex flex-col">
        <div className="mb-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Home className="h-4 w-4" /> {t('common.backToHome')}
            </Button>
          </Link>
        </div>
        
        <Header />
        
        <div className="flex justify-center gap-4 my-6">
          <Button
            variant={zakatType === 'regular' ? 'default' : 'outline'}
            onClick={() => switchZakatType('regular')}
            className={zakatType === 'regular' ? 'bg-zakat-600 hover:bg-zakat-700' : ''}
          >
            <Calculator className="mr-2 h-4 w-4" />
            {t('tabs.annual')}
          </Button>
          <Button
            variant={zakatType === 'fitr' ? 'default' : 'outline'}
            onClick={() => switchZakatType('fitr')}
            className={zakatType === 'fitr' ? 'bg-zakat-600 hover:bg-zakat-700' : ''}
          >
            <Calculator className="mr-2 h-4 w-4" />
            {t('tabs.fitr')}
          </Button>
        </div>
        
        <main className="flex-1 my-8">
          <div className="relative">
            {zakatType === 'regular' && showForm && (
              <ZakatForm onCalculate={handleCalculate} />
            )}
            {zakatType === 'regular' && !showForm && results && (
              <ZakatResult results={results} onReset={handleReset} />
            )}
            
            {zakatType === 'fitr' && showForm && (
              <ZakatFitrForm onCalculate={handleCalculateFitr} />
            )}
            {zakatType === 'fitr' && !showForm && fitrResults && (
              <ZakatFitrResult results={fitrResults} onReset={handleReset} />
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
