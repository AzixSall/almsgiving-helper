
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPreciousMetalPricePerGram } from '@/utils/zakatCalculations';

interface ZakatFormValues {
  cashAmount: number;
  goldValue: number;
  silverValue: number;
  otherInvestments: number;
  businessAssets: number;
  debtsOwed: number;
}

interface ZakatFormProps {
  onCalculate: (values: ZakatFormValues) => void;
}

const ZakatForm: React.FC<ZakatFormProps> = ({ onCalculate }) => {
  const { t, currency } = useLanguage();

  const form = useForm<ZakatFormValues>({
    defaultValues: {
      cashAmount: 0,
      goldValue: 0,
      silverValue: 0,
      otherInvestments: 0,
      businessAssets: 0,
      debtsOwed: 0,
    },
  });

  const onSubmit = (values: ZakatFormValues) => {
    onCalculate(values);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 animate-slide-in-left">
      <Card className="glass-card">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cashAmount"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>{t('zakatForm.cashBankBalances')}</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-gray-50">
                            {t('zakatForm.tooltips.cashAmount')}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="0" 
                        type="number" 
                        onChange={(e) => onChange(Number(e.target.value))} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goldValue"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>{t('zakatForm.goldValue')}</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-gray-50">
                            {t('zakatForm.tooltips.goldValue').replace('{price}', getPreciousMetalPricePerGram('gold', currency).toString())}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="0" 
                        type="number" 
                        onChange={(e) => onChange(Number(e.target.value))}  
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="silverValue"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>{t('zakatForm.silverValue')}</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-gray-50">
                            {t('zakatForm.tooltips.silverValue').replace('{price}', getPreciousMetalPricePerGram('silver', currency).toString())}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="0" 
                        type="number"
                        onChange={(e) => onChange(Number(e.target.value))}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherInvestments"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>{t('zakatForm.otherInvestments')}</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-gray-50">
                            {t('zakatForm.tooltips.otherInvestments')}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="0" 
                        type="number"
                        onChange={(e) => onChange(Number(e.target.value))}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessAssets"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>{t('zakatForm.businessAssets')}</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-gray-50">
                            {t('zakatForm.tooltips.businessAssets')}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="0" 
                        type="number"
                        onChange={(e) => onChange(Number(e.target.value))}  
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="debtsOwed"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>{t('zakatForm.debtsLiabilities')}</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-gray-50">
                            {t('zakatForm.tooltips.debtsOwed')}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="0" 
                        type="number"
                        onChange={(e) => onChange(Number(e.target.value))}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-zakat-600 hover:bg-zakat-700">
                {t('zakatForm.calculate')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-6 p-4 bg-zakat-50 border border-zakat-100 rounded-lg space-y-3">
        <h3 className="text-sm font-medium text-zakat-700">{t('zakatForm.notes.title')}</h3>
        <ul className="text-sm text-zakat-700 list-disc pl-5 space-y-2">
          <li>{t('zakatForm.notes.note1')}</li>
          <li>{t('zakatForm.notes.note2')}</li>
          <li>{t('zakatForm.notes.note3')}</li>
          <li>{t('zakatForm.notes.note4')}</li>
        </ul>
      </div>
    </div>
  );
};

export default ZakatForm;
