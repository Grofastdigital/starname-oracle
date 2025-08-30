
import React, { useState } from 'react';
import StarField from '@/components/StarField';
import BirthForm from '@/components/BirthForm';
import AstrologyResults from '@/components/AstrologyResults';
import { calculateAstrology, type BirthData, type AstrologyResult } from '@/utils/astrology';
import { Star, Sparkles, Crown } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AstrologyResult | null>(null);

  const handleFormSubmit = async (data: BirthData) => {
    setIsLoading(true);
    try {
      const astrologyResult = await calculateAstrology(data);
      setResult(astrologyResult);
    } catch (error) {
      console.error('Error calculating astrology:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConsultation = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 animate-float">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-12 h-12 text-primary animate-pulse" />
            <h1 className="text-6xl font-bold text-cosmic">StarName Oracle</h1>
            <Star className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground mb-4">
            Discover the perfect name written in the stars
          </p>
          <div className="flex items-center justify-center gap-2 text-accent">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Powered by Cosmic Intelligence & Ancient Wisdom</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          {!result ? (
            <div className="space-y-8">
              {/* Feature highlights */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="glass-card p-6 text-center">
                  <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Personalized Names</h3>
                  <p className="text-muted-foreground">AI-curated suggestions based on your birth chart</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <Star className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Astrological Insights</h3>
                  <p className="text-muted-foreground">Deep cosmic analysis of planetary influences</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Cultural Heritage</h3>
                  <p className="text-muted-foreground">Names rooted in your cultural traditions</p>
                </div>
              </div>

              <BirthForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <button
                  onClick={handleNewConsultation}
                  className="nebula-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 mb-8 font-semibold"
                >
                  ← New Consultation
                </button>
              </div>
              <AstrologyResults result={result} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-4 h-4 text-primary" />
            <span>May the stars guide you to the perfect name</span>
            <Star className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm">✨ StarName Oracle - Where astronomy meets destiny ✨</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
