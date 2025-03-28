
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
  const { t, locale } = useLanguage();

  if (!results) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
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
      link.download = 'zakat-calculation.png';
      link.href = image;
      link.click();
      
      toast.success(locale === 'fr' ? 'Résultats de Zakat enregistrés en tant qu\'image' : 'Zakat results saved as image');
    } catch (err) {
      console.error('Failed to save image:', err);
      toast.error(locale === 'fr' ? 'Échec de l\'enregistrement de l\'image' : 'Failed to save image');
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
          title: locale === 'fr' ? 'Mes résultats de calcul de Zakat' : 'My Zakat Calculation Results',
          text: locale === 'fr' ? 'Voici mes résultats de calcul de Zakat' : 'Here are my Zakat calculation results',
          files: [new File([blob], 'zakat-calculation.png', { type: 'image/png' })],
        });
        
        toast.success(locale === 'fr' ? 'Résultats partagés avec succès' : 'Successfully shared results');
      } else {
        // Fallback for browsers that don't support Web Share API
        toast.info(locale === 'fr' ? 'Le partage n\'est pas pris en charge sur ce navigateur' : 'Sharing not supported on this browser');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      toast.error(locale === 'fr' ? 'Échec du partage des résultats' : 'Failed to share results');
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
