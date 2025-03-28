
import React, { useRef } from 'react';
import { ZakatFitrResults } from '@/utils/zakatCalculations';
import { Button } from '@/components/ui/button';
import { Share, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface ZakatFitrResultProps {
  results: ZakatFitrResults | null;
  onReset: () => void;
}

const ZakatFitrResult: React.FC<ZakatFitrResultProps> = ({ results, onReset }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const { t, locale, currency, getCurrencySymbol } = useLanguage();
  
  if (!results) return null;

  const formatCurrency = (amount: number) => {
    let currencyCode = currency;
    let localeString = locale === 'fr' ? 'fr-FR' : 'en-US';
    
    // For XOF, we'll handle it specially since it may not be widely supported
    if (currency === 'XOF') {
      return `${amount.toFixed(0)} ${getCurrencySymbol()}`;
    }
    
    return new Intl.NumberFormat(localeString, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
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
      
      toast.success(t('notifications.imageSaved'));
    } catch (err) {
      console.error('Failed to save image:', err);
      toast.error(t('notifications.imageSaveError'));
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
          title: t('share.fitrTitle'),
          text: t('share.fitrText'),
          files: [new File([blob], 'zakat-fitr-calculation.png', { type: 'image/png' })],
        });
        
        toast.success(t('notifications.shareSuccess'));
      } else {
        // Fallback for browsers that don't support Web Share API
        toast.info(t('notifications.shareNotSupported'));
      }
    } catch (err) {
      console.error('Error sharing:', err);
      toast.error(t('notifications.shareError'));
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-in-right">
      <div ref={resultRef} className="glass-card p-6 space-y-6">
        <h2 className="text-xl font-semibold text-zakat-800 text-center">{t('zakatFitrResult.title')}</h2>
        
        <div className="space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">{t('zakatFitrResult.familyMembers')}</span>
            <span className="font-medium text-zakat-900">{results.familyMembers}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">{t('zakatFitrResult.paymentMethod')}</span>
            <span className="font-medium text-zakat-900 capitalize">{t(`zakatFitr.${results.paymentMethod}`)}</span>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-medium text-zakat-800">{t('zakatFitrResult.totalZakat')}</span>
            {results.paymentMethod === 'food' ? (
              <span className="text-lg font-bold text-zakat-800">{results.totalAmount} {t('zakatFitrResult.foodUnit')}</span>
            ) : (
              <span className="text-lg font-bold text-zakat-800">{formatCurrency(results.totalAmount)}</span>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-zakat-50 border border-zakat-100 rounded-lg space-y-3">
          <h3 className="text-sm font-medium text-zakat-700">{t('zakatFitrResult.notes.title')}</h3>
          <ul className="text-sm text-zakat-700 list-disc pl-5 space-y-2">
            <li>{t('zakatFitrResult.notes.note1')}</li>
            <li>{t('zakatFitrResult.notes.note2')}</li>
            <li>{t('zakatFitrResult.notes.note3')}</li>
            <li>{t('zakatFitrResult.notes.note4')}</li>
          </ul>
        </div>
        
        <div className="p-4 bg-zakat-50 border border-zakat-100 rounded-lg">
          <h3 className="text-sm font-medium text-zakat-700 mb-2">{t('zakatFitrResult.saa.title')}</h3>
          <p className="text-sm text-zakat-700">
            {t('zakatFitrResult.saa.explanation')}
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center gap-3">
        <Button 
          onClick={onReset}
          variant="outline" 
          className="border-zakat-300 text-zakat-700 hover:bg-zakat-50 px-6 py-2 rounded-full"
        >
          {t('common.calculateAgain')}
        </Button>
        
        <Button
          onClick={handleSaveImage}
          variant="outline"
          className="border-zakat-300 text-zakat-700 hover:bg-zakat-50 px-4 py-2 rounded-full"
        >
          <Download className="mr-1 h-4 w-4" />
          {t('common.save')}
        </Button>
        
        <Button
          onClick={handleShare}
          variant="outline"
          className="border-zakat-300 text-zakat-700 hover:bg-zakat-50 px-4 py-2 rounded-full"
        >
          <Share className="mr-1 h-4 w-4" />
          {t('common.share')}
        </Button>
      </div>
    </div>
  );
};

export default ZakatFitrResult;
