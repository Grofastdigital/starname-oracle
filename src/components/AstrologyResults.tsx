import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Star, Crown, Sparkles, Heart, Eye, Download, Mail, Share2, Send } from 'lucide-react';
import { generatePDF, shareViaEmail } from '@/utils/pdfGenerator';

interface AstrologyResult {
  birthSign: string;
  nakshatra: string;
  luckyNumbers: number[];
  luckyColors: string[];
  suggestedNames: Array<{
    name: string;
    meaning: string;
    origin: string;
    score: number;
  }>;
  planetaryInfluence: string;
  recommendations: string[];
}

interface AstrologyResultsProps {
  result: AstrologyResult;
}

const AstrologyResults = ({ result }: AstrologyResultsProps) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleDownloadPDF = () => {
    generatePDF(result);
  };

  const handleEmailShare = async () => {
    if (!emailAddress.trim()) return;
    
    setIsEmailSending(true);
    try {
      await shareViaEmail(result, emailAddress);
      setEmailAddress('');
      setShowEmailInput(false);
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsEmailSending(false);
    }
  };

  // Get top 3 names with highest scores
  const topThreeNames = result.suggestedNames
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Get remaining names
  const otherNames = result.suggestedNames
    .sort((a, b) => b.score - a.score)
    .slice(3);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Action Buttons */}
      <Card className="glass-card p-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={handleDownloadPDF}
            className="nebula-gradient text-white px-6 py-2 hover:opacity-90 transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF Report
          </Button>
          
          {!showEmailInput ? (
            <Button
              onClick={() => setShowEmailInput(true)}
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/20 px-6 py-2"
            >
              <Mail className="w-4 h-4 mr-2" />
              Share via Email
            </Button>
          ) : (
            <div className="flex gap-2 items-center">
              <Input
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-64"
              />
              <Button
                onClick={handleEmailShare}
                disabled={isEmailSending || !emailAddress.trim()}
                className="nebula-gradient text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                {isEmailSending ? 'Sending...' : 'Send'}
              </Button>
              <Button
                onClick={() => {
                  setShowEmailInput(false);
                  setEmailAddress('');
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          )}
          
          <Button
            onClick={() => navigator.share && navigator.share({
              title: 'My Vedic Astrology Name Report',
              text: `Check out my Vedic name suggestions! Rashi: ${result.birthSign}, Nakshatra: ${result.nakshatra}`,
              url: window.location.href
            })}
            variant="outline"
            className="border-accent/40 text-accent hover:bg-accent/20 px-6 py-2"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Report
          </Button>
        </div>
      </Card>

      {/* Vedic Birth Chart & Overview */}
      <Card className="glass-card p-8 text-center animate-glow">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Star className="w-10 h-10 text-primary animate-pulse" />
          <h2 className="text-4xl font-bold text-cosmic">वैदिक जन्म कुंडली</h2>
          <Star className="w-10 h-10 text-primary animate-pulse" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">राशि (Rashi)</h3>
            <div className="text-4xl font-bold text-primary mb-2">{result.birthSign}</div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-accent mb-2">नक्षत्र (Nakshatra)</h3>
            <div className="text-3xl font-bold text-accent mb-2">{result.nakshatra}</div>
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground mb-6">{result.planetaryInfluence}</p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <div className="text-center">
            <h4 className="font-semibold text-accent mb-2">शुभ अंक (Lucky Numbers)</h4>
            <div className="flex gap-2 justify-center">
              {result.luckyNumbers.map((num) => (
                <Badge key={num} className="nebula-gradient text-white px-3 py-1 text-lg">{num}</Badge>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-accent mb-2">शुभ रंग (Lucky Colors)</h4>
            <div className="flex gap-2 justify-center">
              {result.luckyColors.map((color) => (
                <Badge key={color} variant="outline" className="border-primary/40 text-primary">{color}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Top 3 Name Suggestions */}
      <Card className="glass-card p-8">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Crown className="w-8 h-8 text-primary" />
          <h3 className="text-3xl font-bold text-cosmic">Top 3 Recommended Names</h3>
          <Crown className="w-8 h-8 text-primary" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {topThreeNames.map((nameData, index) => (
            <Card key={index} className="p-6 border-2 border-primary/40 bg-primary/5 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 text-center">
              <div className="mb-4">
                <Badge className="nebula-gradient text-white px-3 py-1 text-sm mb-2">
                  Rank #{index + 1}
                </Badge>
                <h4 className="text-2xl font-bold text-primary mb-2">{nameData.name}</h4>
                <p className="text-sm text-accent font-medium mb-3">{nameData.origin}</p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">{nameData.meaning}</p>
              
              {/* Star rating visual */}
              <div className="flex gap-1 justify-center mb-3">
                {[...Array(10)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < nameData.score ? 'text-primary fill-current' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <span className="text-primary font-bold text-lg">{nameData.score}/10</span>
                <p className="text-xs text-muted-foreground">Astrology Score</p>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Other Name Suggestions */}
      {otherNames.length > 0 && (
        <Card className="glass-card p-8">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Sparkles className="w-8 h-8 text-accent" />
            <h3 className="text-2xl font-bold text-cosmic">Other Name Suggestions</h3>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          
          <div className="mb-6 text-center">
            <Badge className="bg-accent/20 text-accent px-4 py-2 text-lg">
              {otherNames.length} Additional Names
            </Badge>
            <p className="text-muted-foreground mt-2">
              More beautiful names based on your birth chart
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNames.map((nameData, index) => (
              <Card key={index} className="p-6 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-accent mb-1">{nameData.name}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{nameData.origin}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-accent font-semibold text-sm">{nameData.score}/10</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">{nameData.meaning}</p>
                
                {/* Star rating visual */}
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < nameData.score ? 'text-accent fill-current' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Vedic Guidance */}
      <Card className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Eye className="w-8 h-8 text-accent" />
          <h3 className="text-2xl font-bold text-cosmic">वैदिक मार्गदर्शन</h3>
          <Eye className="w-8 h-8 text-accent" />
        </div>
        
        <div className="space-y-4">
          {result.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
              <Sparkles className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <p className="text-foreground leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AstrologyResults;
