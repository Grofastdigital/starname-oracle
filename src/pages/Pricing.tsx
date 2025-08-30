
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Crown, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import StarField from '@/components/StarField';
import ChatBot from '@/components/ChatBot';

const Pricing = () => {
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      credits: 10,
      price: 499,
      popular: false,
      features: ['10 Name Consultations', 'Basic Birth Chart Analysis', 'Email Support']
    },
    {
      id: 'popular',
      name: 'Popular Package',
      credits: 25,
      price: 999,
      popular: true,
      features: ['25 Name Consultations', 'Detailed Birth Chart Analysis', 'Priority Email Support', 'PDF Reports']
    },
    {
      id: 'premium',
      name: 'Premium Package',
      credits: 50,
      price: 1899,
      popular: false,
      features: ['50 Name Consultations', 'Complete Astrological Analysis', '24/7 Priority Support', 'PDF Reports', 'Family Sharing']
    }
  ];

  const handlePurchase = async (packageData: typeof packages[0]) => {
    if (!profile) {
      toast.error('Please sign in to purchase credits.');
      return;
    }

    setLoading(packageData.id);

    try {
      // Call Razorpay payment function
      const { data, error } = await supabase.functions.invoke('razorpay-payment', {
        body: {
          amount: packageData.price,
          credits: packageData.credits,
          package_name: packageData.name
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Razorpay payment in a new tab
        window.open(data.url, '_blank');
      } else {
        toast.error('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      <ChatBot />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link to="/">
            <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold text-cosmic">Buy Credits</h1>
            <Star className="w-8 h-8 text-primary animate-pulse" />
          </div>
          
          <div className="flex items-center gap-4">
            <Card className="glass-card px-4 py-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">{profile?.credits || 0} Credits</span>
              </div>
            </Card>
          </div>
        </header>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-cosmic mb-4">Choose Your Package</h2>
            <p className="text-muted-foreground text-lg">
              Unlock the cosmic secrets with our AI-powered astrological consultations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`glass-card p-8 text-center relative ${pkg.popular ? 'border-2 border-primary/50' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 nebula-gradient text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                
                <div className="mb-6">
                  <Crown className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-cosmic mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-2">₹{pkg.price}</div>
                  <p className="text-muted-foreground">{pkg.credits} Credits</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(pkg)}
                  disabled={loading === pkg.id}
                  className={`w-full py-3 ${pkg.popular ? 'nebula-gradient' : 'bg-primary hover:bg-primary/90'} text-white font-semibold`}
                >
                  {loading === pkg.id ? (
                    'Processing...'
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Buy Now
                    </>
                  )}
                </Button>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <Card className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold text-cosmic mb-6">Why Choose AstroName AI?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-foreground">AI-Powered Analysis</h4>
                <p className="text-muted-foreground text-sm">Advanced algorithms analyze birth charts for personalized suggestions</p>
              </div>
              <div>
                <Crown className="w-12 h-12 text-accent mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-foreground">Expert Astrologers</h4>
                <p className="text-muted-foreground text-sm">Consultations reviewed by certified astrological experts</p>
              </div>
              <div>
                <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-foreground">Secure Payments</h4>
                <p className="text-muted-foreground text-sm">Safe and secure payment processing with Razorpay</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
