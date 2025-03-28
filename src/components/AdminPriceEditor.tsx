
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PreciousMetalPrices, updatePreciousMetalPrices } from '@/utils/zakatCalculations';

const AdminPriceEditor = () => {
  const { t, currency, getCurrencySymbol } = useLanguage();
  const [prices, setPrices] = useState({
    goldPricePerGram: PreciousMetalPrices.goldPricePerGram,
    silverPricePerGram: PreciousMetalPrices.silverPricePerGram,
    fitrAmountPerPerson: PreciousMetalPrices.fitrAmountPerPerson
  });
  const [open, setOpen] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrices(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSave = () => {
    updatePreciousMetalPrices(prices, currency);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings className="h-5 w-5 text-zakat-600" />
          <span className="sr-only">{t('admin.settings')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('admin.editPrices')}</DialogTitle>
          <DialogDescription>{t('admin.editPricesDescription')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goldPrice" className="text-right col-span-2">
              {t('admin.goldPricePerGram')}
            </Label>
            <div className="flex items-center col-span-2">
              <span className="mr-1">{getCurrencySymbol()}</span>
              <Input
                id="goldPrice"
                name="goldPricePerGram"
                type="number"
                step="0.01"
                value={prices.goldPricePerGram}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="silverPrice" className="text-right col-span-2">
              {t('admin.silverPricePerGram')}
            </Label>
            <div className="flex items-center col-span-2">
              <span className="mr-1">{getCurrencySymbol()}</span>
              <Input
                id="silverPrice"
                name="silverPricePerGram"
                type="number"
                step="0.01"
                value={prices.silverPricePerGram}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fitrAmount" className="text-right col-span-2">
              {t('admin.fitrAmountPerPerson')}
            </Label>
            <div className="flex items-center col-span-2">
              <span className="mr-1">{getCurrencySymbol()}</span>
              <Input
                id="fitrAmount"
                name="fitrAmountPerPerson"
                type="number"
                step="0.01"
                value={prices.fitrAmountPerPerson}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="bg-zakat-600 hover:bg-zakat-700">{t('admin.saveChanges')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPriceEditor;
