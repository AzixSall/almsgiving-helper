
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HomePage: React.FC = () => {
  const hadiths = [
    {
      text: "The Prophet (ﷺ) said: 'Give charity without delay, for it stands in the way of calamity.'",
      source: "Al-Tirmidhi"
    },
    {
      text: "The Prophet (ﷺ) said: 'The believer's shade on the Day of Resurrection will be his charity.'",
      source: "Tirmidhi"
    },
    {
      text: "The Prophet (ﷺ) said: 'Charity does not decrease wealth.'",
      source: "Muslim"
    },
    {
      text: "The Prophet (ﷺ) said: 'When a man dies, his deeds come to an end except for three things: Sadaqah Jariyah (continuous charity), knowledge which is beneficial, or a virtuous descendant who prays for him.'",
      source: "Muslim"
    }
  ];

  const benefits = [
    "Purifies wealth and soul from greed and attachment",
    "Helps build a more equitable society",
    "Promotes social responsibility and empathy",
    "Brings blessings (barakah) to your wealth and life",
    "Fulfills an obligatory pillar of Islam",
    "Helps those in need with dignity"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-zakat-50">
      <div className="max-w-4xl w-full mx-auto px-4 py-8 flex flex-col">
        <Header />
        
        <main className="flex-1 my-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-zakat-900 mb-4">
              The Virtue of Giving Zakat
            </h1>
            <p className="text-zakat-700 text-lg max-w-2xl mx-auto">
              Zakat is one of the five pillars of Islam, purifying both the soul and wealth while helping those in need.
            </p>
            <div className="mt-8">
              <Link to="/calculator">
                <Button size="lg" className="bg-zakat-600 hover:bg-zakat-700">
                  Calculate Your Zakat <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-zakat-800 mb-6 text-center">
              Hadiths on the Importance of Zakat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hadiths.map((hadith, index) => (
                <Card key={index} className="glass-card hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-zakat-700">Hadith</CardTitle>
                    <CardDescription className="text-sm text-zakat-500">{hadith.source}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zakat-800 italic">{hadith.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-zakat-800 mb-6 text-center">
              Benefits of Giving Zakat
            </h2>
            <Card className="glass-card">
              <CardContent className="pt-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Heart className="h-5 w-5 text-zakat-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-zakat-800">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/calculator">
              <Button size="lg" className="bg-zakat-600 hover:bg-zakat-700">
                Calculate Your Zakat Now
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
