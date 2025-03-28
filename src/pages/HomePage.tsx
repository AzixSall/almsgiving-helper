
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Coins, HandCoins, GripHorizontal, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  const hadiths = [
    {
      text: t('homepage.hadiths.hadith1'),
      source: t('homepage.hadiths.source1'),
      icon: <HandCoins className="h-10 w-10 text-zakat-500" />
    },
    {
      text: t('homepage.hadiths.hadith2'),
      source: t('homepage.hadiths.source2'),
      icon: <Coins className="h-10 w-10 text-zakat-500" />
    },
    {
      text: t('homepage.hadiths.hadith3'),
      source: t('homepage.hadiths.source3'),
      icon: <GripHorizontal className="h-10 w-10 text-zakat-500" />
    },
    {
      text: t('homepage.hadiths.hadith4'),
      source: t('homepage.hadiths.source4'),
      icon: <Users className="h-10 w-10 text-zakat-500" />
    }
  ];

  const benefits = [
    t('homepage.benefits.benefit1'),
    t('homepage.benefits.benefit2'),
    t('homepage.benefits.benefit3'),
    t('homepage.benefits.benefit4'),
    t('homepage.benefits.benefit5'),
    t('homepage.benefits.benefit6')
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-zakat-50">
      <div className="max-w-4xl w-full mx-auto px-4 py-8 flex flex-col">
        <Header />
        
        <main className="flex-1 my-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 bg-zakat-100 rounded-full flex items-center justify-center shadow-md">
                <HandCoins className="h-16 w-16 text-zakat-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zakat-900 mb-4">
              {t('homepage.title')}
            </h1>
            <p className="text-zakat-700 text-lg max-w-2xl mx-auto">
              {t('homepage.subtitle')}
            </p>
            <div className="mt-8">
              <Link to="/calculator">
                <Button size="lg" className="bg-zakat-600 hover:bg-zakat-700">
                  {t('homepage.calculateButton')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-zakat-800 mb-6 text-center">
              {t('homepage.hadithsTitle')}
            </h2>
            <Carousel className="w-full">
              <CarouselContent>
                {hadiths.map((hadith, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="p-1">
                      <Card className="glass-card hover:shadow-md transition-shadow duration-200 h-full">
                        <CardHeader className="pb-2 flex flex-row items-center">
                          <div className="mr-4">
                            {hadith.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-medium text-zakat-700">{t('homepage.hadithLabel')}</CardTitle>
                            <CardDescription className="text-sm text-zakat-500">{hadith.source}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-zakat-800 italic">{hadith.text}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static mx-2 translate-y-0" />
                <CarouselNext className="relative static mx-2 translate-y-0" />
              </div>
            </Carousel>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-zakat-800 mb-6 text-center">
              {t('homepage.benefitsTitle')}
            </h2>
            <Card className="glass-card overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gradient-to-br from-zakat-600 to-zakat-800 p-6 flex items-center justify-center">
                  <div className="aspect-square w-full max-w-[200px]">
                    <AspectRatio ratio={1/1} className="bg-zakat-700/20 rounded-full p-8">
                      <div className="h-full w-full rounded-full bg-zakat-700/20 flex items-center justify-center p-6">
                        <Heart className="h-full w-full text-white animate-pulse" />
                      </div>
                    </AspectRatio>
                  </div>
                </div>
                <CardContent className="pt-6 md:w-2/3">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Heart className="h-5 w-5 text-zakat-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-zakat-800">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          </div>

          <div className="text-center bg-gradient-to-r from-zakat-50 to-zakat-100 p-8 rounded-lg shadow-inner mb-8">
            <h3 className="text-xl font-medium text-zakat-800 mb-4">{t('homepage.calculateNowButton')}</h3>
            <Link to="/calculator">
              <Button size="lg" className="bg-zakat-600 hover:bg-zakat-700">
                {t('homepage.calculateNowButton')}
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
