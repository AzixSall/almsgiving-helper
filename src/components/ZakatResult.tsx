import React, { useRef } from 'react';
import { ZakatResults } from '@/utils/zakatCalculations';
import { Button } from '@/components/ui/button';
import { Share, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface ZakatResultProps {
  results: ZakatResults | null;
  onReset: () => void;
}

const ZakatResult: React.FC<ZakatResultProps> = ({ results, onReset }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const { t, locale, currency, getCurrencySymbol } = useLanguage();

  if (!results) return null;

  const formatCurrency = (amount: number) => {
    let currencyCode = currency;
    let localeString = locale === 'fr' ? 'fr-FR' : 'en-US';
    
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
        scale: 2,
        logging: false,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'zakat-calculation.png';
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
        
        const blob = await (await fetch(image)).blob();
        
        await navigator.share({
          title: t('share.title'),
          text: t('share.text'),
          files: [new File([blob], 'zakat-calculation.png', { type: 'image/png' })],
        });
        
        toast.success(t('notifications.shareSuccess'));
      } else {
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
        <h2 className="text-xl font-semibold text-zakat-800 text-center">{t('zakatResult.title')}</h2>
        
        <div className="space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">{t('zakatResult.totalAssets')}</span>
            <span className="font-medium text-zakat-900">{formatCurrency(results.totalAssets)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">{t('zakatResult.totalLiabilities')}</span>
            <span className="font-medium text-zakat-900">{formatCurrency(results.totalLiabilities)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">{t('zakatResult.netZakatableAmount')}</span>
            <span className="font-medium text-zakat-900">{formatCurrency(results.netZakatableAmount)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-zakat-100">
            <span className="text-zakat-700">{t('zakatResult.nisabThreshold')}</span>
            <span className="font-medium text-zakat-900">{formatCurrency(results.nisabThreshold)}</span>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-medium text-zakat-800">{t('zakatResult.zakatPayable')}</span>
            <span className="text-lg font-bold text-zakat-800">{formatCurrency(results.zakatPayable)}</span>
          </div>
        </div>
        
        {!results.eligibleForZakat && (
          <div className="mt-4 p-4 bg-zakat-50 border border-zakat-100 rounded-lg">
            <p className="text-sm text-zakat-700 text-center">
              {t('zakatResult.belowThreshold')}
            </p>
          </div>
        )}
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

export default ZakatResult;
