
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher: React.FC = () => {
  const { locale, changeLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 border-zakat-300 text-zakat-600"
        >
          <Globe className="h-4 w-4" />
          {locale === 'en' ? 'English' : 'Français'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={locale === 'en' ? 'bg-zakat-50 text-zakat-800' : ''}
        >
          {t('language.en')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('fr')}
          className={locale === 'fr' ? 'bg-zakat-50 text-zakat-800' : ''}
        >
          {t('language.fr')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
