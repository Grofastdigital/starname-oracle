
import React, { useState } from 'react';
import StarField from '@/components/StarField';
import BirthForm from '@/components/BirthForm';
import AstrologyResults from '@/components/AstrologyResults';
import ChatBot from '@/components/ChatBot';
import { calculateAstrology, type BirthData, type AstrologyResult } from '@/utils/astrology';
import { Star, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const handleSocialSignIn = (provider: string) => {
    // Placeholder for social sign-in functionality
    // This would connect to Supabase Auth when integrated
    console.log(`Sign in with ${provider}`);
    alert(`${provider} sign-in will be available when connected to Supabase authentication.`);
  };

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      <ChatBot />
      
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
          <div className="flex items-center justify-center gap-2 text-accent mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Powered by Cosmic Intelligence & Ancient Wisdom</span>
            <Sparkles className="w-5 h-5" />
          </div>
          
          {/* Social Sign In Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              onClick={() => handleSocialSignIn('Google')}
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/20"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
            <Button
              onClick={() => handleSocialSignIn('Facebook')}
              variant="outline"
              className="border-accent/40 text-accent hover:bg-accent/20"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign in with Facebook
            </Button>
            <Button
              onClick={() => handleSocialSignIn('Apple')}
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/20"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Sign in with Apple
            </Button>
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
                  <h3 className="text-xl font-semibold mb-2 text-foreground">50+ Personalized Names</h3>
                  <p className="text-muted-foreground">AI-curated suggestions based on your birth chart</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <Star className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Multi-Language Support</h3>
                  <p className="text-muted-foreground">Names in English, Tamil, Hindi, Malayalam & more</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">PDF & Email Sharing</h3>
                  <p className="text-muted-foreground">Download reports and share with family</p>
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
