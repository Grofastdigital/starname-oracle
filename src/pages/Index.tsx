
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import StarField from '@/components/StarField';
import ChakraBackground from '@/components/ChakraBackground';
import BirthForm from '@/components/BirthForm';
import AstrologyResults from '@/components/AstrologyResults';
import ChatBot from '@/components/ChatBot';
import { calculateAstrology, type BirthData, type AstrologyResult } from '@/utils/astrology';
import { Star, Sparkles, Crown, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const Index = () => {
  const { profile, refreshProfile } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AstrologyResult | null>(null);

  // Check if there's a result from navigation state (from dashboard consultation click)
  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
    }
  }, [location.state]);

  const handleFormSubmit = async (data: BirthData) => {
    if (!profile || profile.credits < 1) {
      toast.error('Insufficient credits. Please purchase more credits to continue.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Starting consultation processing...');
      
      // Deduct credit first
      const { error: creditError } = await supabase
        .from('user_profiles')
        .update({ credits: profile.credits - 1 })
        .eq('id', profile.id);

      if (creditError) {
        throw creditError;
      }

      // Create consultation record
      const { data: consultation, error: consultationError } = await supabase
        .from('consultations')
        .insert({
          user_id: profile.id,
          birth_date: data.birthDate,
          birth_time: data.birthTime,
          birth_location: data.birthLocation,
          gender: data.gender,
          cultural_preference: data.culturalPreference,
          name_theme: data.nameTheme,
          preferred_language: data.preferredLanguage,
          starts_with: data.startsWith,
          status: 'processing'
        })
        .select()
        .single();

      if (consultationError) {
        throw consultationError;
      }

      console.log('Consultation created, calculating astrology...');

      // Calculate astrology with faster processing
      const astrologyResult = await calculateAstrology(data);
      
      console.log('Astrology calculated, updating consultation...');
      
      // Update consultation with results
      const { error: updateError } = await supabase
        .from('consultations')
        .update({
          status: 'completed',
          birth_sign: astrologyResult.birthSign,
          suggested_names: astrologyResult.suggestedNames,
          lucky_numbers: astrologyResult.luckyNumbers,
          lucky_colors: astrologyResult.luckyColors,
          planetary_influence: astrologyResult.planetaryInfluence,
          recommendations: astrologyResult.recommendations
        })
        .eq('id', consultation.id);

      if (updateError) {
        throw updateError;
      }

      console.log('Consultation completed successfully');
      setResult(astrologyResult);
      await refreshProfile();
      toast.success('Consultation completed successfully!');
    } catch (error) {
      console.error('Error calculating astrology:', error);
      toast.error('Failed to process consultation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConsultation = () => {
    setResult(null);
    // Clear navigation state
    window.history.replaceState({}, document.title);
  };

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      <ChakraBackground />
      <ChatBot />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold text-cosmic">New Consultation</h1>
            <Star className="w-8 h-8 text-primary animate-pulse" />
          </div>
          
          <div className="flex items-center gap-4">
            <Card className="glass-card px-4 py-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">{profile?.credits || 0} Credits</span>
              </div>
            </Card>
            
            {(profile?.credits || 0) < 1 && (
              <Link to="/pricing">
                <Button className="nebula-gradient text-white hover:opacity-90 transition-all duration-300">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Buy Credits
                </Button>
              </Link>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          {!result ? (
            <div className="space-y-8">
              {/* Credit Warning */}
              {(profile?.credits || 0) < 1 && (
                <Card className="glass-card p-6 border-accent/40 bg-accent/5">
                  <div className="flex items-center gap-3 text-accent">
                    <CreditCard className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">Insufficient Credits</p>
                      <p className="text-sm">You need at least 1 credit to create a consultation.</p>
                    </div>
                  </div>
                </Card>
              )}

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

              <BirthForm 
                onSubmit={handleFormSubmit} 
                isLoading={isLoading}
                disabled={(profile?.credits || 0) < 1}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <Button
                  onClick={handleNewConsultation}
                  className="nebula-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 mb-8 font-semibold"
                >
                  ← New Consultation
                </Button>
              </div>
              <AstrologyResults result={result} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
