
import React, { useRef } from 'react';
import { ZakatFitrResults } from '@/utils/zakatCalculations';
import { Button } from '@/components/ui/button';
import { Share, Download, Image } from 'lucide-react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface ZakatFitrResultProps {
  results: ZakatFitrResults | null;
  onReset: () => void;
}

const ZakatFitrResult: React.FC<ZakatFitrResultProps> = ({ results, onReset }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  
  if (!results) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleSaveImage = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,  // Higher scale for better quality
        logging: false,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'zakat-fitr-calculation.png';
      link.href = image;
      link.click();
      
      toast.success('Zakat al-Fitr results saved as image');
    } catch (err) {
      console.error('Failed to save image:', err);
      toast.error('Failed to save image');
    }
  };

  const handleShare = async () => {
    if (!resultRef.current) return;
    
    try {
      if (navigator.share) {
        const canvas = await html2canvas(resultRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
        
        const image = canvas.toDataURL('image/png');
        
        // Convert base64 to blob
        const blob = await (await fetch(image)).blob();
        
        await navigator.share({
          title: 'My Zakat al-Fitr Calculation Results',
          text: 'Here are my Zakat al-Fitr calculation results',
          files: [new File([blob], 'zakat-fitr-calculation.png', { type: 'image/png' })],
        });
        
        toast.success('Successfully shared results');
      } else {
        // Fallback for browsers that don't support Web Share API
        toast.info('Sharing not supported on this browser');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      toast.error('Failed to share results');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-in-right">
      <div ref={resultRef} className="glass-card p-6 space-y-6">
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
      </div>
      
      <div className="mt-6 flex justify-center gap-3">
        <Button 
          onClick={onReset}
          variant="outline" 
          className="border-zakat-300 text-zakat-700 hover:bg-zakat-50 px-6 py-2 rounded-full"
        >
          Calculate Again
        </Button>
        
        <Button
          onClick={handleSaveImage}
          variant="outline"
          className="border-zakat-300 text-zakat-700 hover:bg-zakat-50 px-4 py-2 rounded-full"
        >
          <Download className="mr-1 h-4 w-4" />
          Save
        </Button>
        
        <Button
          onClick={handleShare}
          variant="outline"
          className="border-zakat-300 text-zakat-700 hover:bg-zakat-50 px-4 py-2 rounded-full"
        >
          <Share className="mr-1 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default ZakatFitrResult;
