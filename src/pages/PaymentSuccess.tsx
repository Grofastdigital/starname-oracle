
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Crown, ArrowLeft, CreditCard } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import StarField from '@/components/StarField';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const { profile, refreshProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const init = async () => {
      try {
        // Refresh profile to get updated credits
        await refreshProfile();
        toast.success('Payment completed successfully!');
      } catch (error) {
        console.error('Error refreshing profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    init();
  }, [refreshProfile]);

  if (loading) {
    return (
      <div className="min-h-screen cosmic-bg relative flex items-center justify-center">
        <StarField />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-cosmic">Processing payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <Card className="glass-card p-8 text-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-cosmic mb-4">Payment Successful!</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Thank you for your purchase. Your credits have been added to your account.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold text-primary">
                Current Balance: {profile?.credits || 0} Credits
              </span>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="glass-card p-6 mb-8">
            <h3 className="text-xl font-bold text-cosmic mb-4">What's Next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm mt-0.5">1</div>
                <p className="text-foreground">Start your first Vedic name consultation using your new credits</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm mt-0.5">2</div>
                <p className="text-foreground">Get personalized name suggestions based on Rashi and Nakshatra</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm mt-0.5">3</div>
                <p className="text-foreground">Download your detailed PDF report to share with family</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation">
              <Button className="nebula-gradient text-white px-8 py-3 hover:opacity-90 transition-all duration-300 w-full sm:w-auto">
                Start New Consultation
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/20 px-8 py-3 w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Support Information */}
          <Card className="glass-card p-6 mt-8 text-center">
            <h4 className="text-lg font-semibold text-cosmic mb-2">Need Help?</h4>
            <p className="text-muted-foreground text-sm mb-4">
              If you have any questions about your purchase or need assistance, please contact our support team.
            </p>
            <Button variant="outline" className="border-accent/40 text-accent hover:bg-accent/20">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
