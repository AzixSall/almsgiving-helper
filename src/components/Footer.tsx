
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-6 px-6 mt-auto text-center text-sm text-zakat-600">
      <p className="mb-1">
        {t('footer.disclaimer1')}
      </p>
      <p>
        {t('footer.disclaimer2')}
      </p>
    </footer>
  );
};

export default Footer;
