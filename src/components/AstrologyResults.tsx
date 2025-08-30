
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Crown, Sparkles, Heart, Eye, Download, Mail, Share2 } from 'lucide-react';
import { generatePDF, shareViaGmail } from '@/utils/pdfGenerator';

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
  const handleDownloadPDF = () => {
    generatePDF(result);
  };

  const handleShareGmail = () => {
    shareViaGmail(result);
  };

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
          <Button
            onClick={handleShareGmail}
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/20 px-6 py-2"
          >
            <Mail className="w-4 h-4 mr-2" />
            Share via Gmail
          </Button>
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

      {/* Vedic Name Suggestions */}
      <Card className="glass-card p-8">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Crown className="w-8 h-8 text-primary" />
          <h3 className="text-3xl font-bold text-cosmic">वैदिक नाम सुझाव</h3>
          <Crown className="w-8 h-8 text-primary" />
        </div>
        
        <div className="mb-6 text-center">
          <Badge className="nebula-gradient text-white px-4 py-2 text-lg">
            {result.suggestedNames.length} व्यक्तिगत नाम सुझाव
          </Badge>
          <p className="text-muted-foreground mt-2">
            राशि और नक्षत्र के आधार पर चुने गए शुभ नाम
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.suggestedNames.map((nameData, index) => (
            <Card key={index} className="p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-primary mb-1">{nameData.name}</h4>
                  <p className="text-sm text-accent font-medium">{nameData.origin}</p>
                </div>
                <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-primary font-semibold text-sm">{nameData.score}/10</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">{nameData.meaning}</p>
              
              {/* Star rating visual */}
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < nameData.score ? 'text-primary fill-current' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Card>

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
        
        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h4 className="text-lg font-semibold text-primary mb-2">नामकरण संस्कार की सलाह</h4>
          <p className="text-muted-foreground text-sm">
            वैदिक परंपरा के अनुसार, बच्चे का नामकरण जन्म के 10वें या 12वें दिन शुभ मुहूर्त में करना चाहिए। 
            पंडित जी से सलाह लेकर उचित समय का चुनाव करें।
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AstrologyResults;
