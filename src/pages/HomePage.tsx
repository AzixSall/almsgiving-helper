
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-zakat-50">
      <div className="max-w-4xl w-full mx-auto px-4 py-8 flex flex-col">
        <Header />
        
        <main className="flex-1 my-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-zakat-900 mb-4">
              {t('homePage.title')}
            </h1>
            <p className="text-zakat-700 text-lg max-w-2xl mx-auto">
              {t('homePage.subtitle')}
            </p>
            <div className="mt-8">
              <Link to="/calculator">
                <Button size="lg" className="bg-zakat-600 hover:bg-zakat-700">
                  {t('homePage.calculateButton')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-zakat-800 mb-6 text-center">
              {t('homePage.hadithsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <Card key={index} className="glass-card hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-zakat-700">{t('homePage.hadithLabel')}</CardTitle>
                    <CardDescription className="text-sm text-zakat-500">{t(`homePage.hadiths.${index}.source`)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zakat-800 italic">{t(`homePage.hadiths.${index}.text`)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-zakat-800 mb-6 text-center">
              {t('homePage.benefitsTitle')}
            </h2>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <li key={index} className="flex items-start">
                      <Heart className="h-5 w-5 text-zakat-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-zakat-800">{t(`homePage.benefits.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/calculator">
              <Button size="lg" className="bg-zakat-600 hover:bg-zakat-700">
                {t('homePage.calculateNowButton')}
              </Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
