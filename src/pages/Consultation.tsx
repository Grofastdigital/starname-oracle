import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Star, Sparkles, Crown, Download, Mail } from 'lucide-react'
import { AstrologyResult, generatePDF, shareViaEmail } from '@/utils/pdfGenerator'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import StarField from '@/components/StarField'
import ChakraBackground from '@/components/ChakraBackground'

const Consultation = () => {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthLocation, setBirthLocation] = useState('')
  const [preferredLanguage, setPreferredLanguage] = useState('en')
  const [nameLength, setNameLength] = useState<number[]>([3, 10])
  const [includeModern, setIncludeModern] = useState(true)
  const [includeTraditional, setIncludeTraditional] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<AstrologyResult | null>(null)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Check if there's existing result data in history state
    if (history.state && history.state.result) {
      setResult(history.state.result)
    }
  }, [])

  const handleSubmit = async () => {
    setIsProcessing(true)
    setResult(null) // Clear previous results

    // Simulate API call and data processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock Astrology Result
    const mockResult: AstrologyResult = {
      birthSign: 'Leo',
      nakshatra: 'Magha',
      luckyNumbers: [1, 5, 9],
      luckyColors: ['Gold', 'Orange', 'Red'],
      suggestedNames: [
        { name: 'Aadhya', meaning: 'First power', origin: 'Sanskrit', score: 9.2 },
        { name: 'Advik', meaning: 'Unique', origin: 'Sanskrit', score: 8.8 },
        { name: 'Anika', meaning: 'Grace', origin: 'Sanskrit', score: 9.5 },
        { name: 'Bhavya', meaning: 'Grand', origin: 'Sanskrit', score: 8.9 },
        { name: 'Charvi', meaning: 'Beautiful', origin: 'Sanskrit', score: 9.1 },
        { name: 'Dhruv', meaning: 'Pole Star', origin: 'Sanskrit', score: 9.3 },
        { name: 'Eesha', meaning: 'Goddess Parvati', origin: 'Sanskrit', score: 8.7 },
        { name: ' ridges', meaning: 'Wealthy', origin: 'Sanskrit', score: 9.0 },
        { name: 'Harsh', meaning: 'Joy', origin: 'Sanskrit', score: 9.4 },
        { name: 'Ira', meaning: 'Earth', origin: 'Sanskrit', score: 8.6 }
      ],
      planetaryInfluence: 'Strong influence of Sun and Mars',
      recommendations: [
        'Choose a name that resonates with fire signs',
        'Consider names with strong syllables',
        'Avoid names that clash with water elements'
      ]
    }

    setResult(mockResult)
    setIsProcessing(false)
  }

  const isFormValid =
    birthDate !== '' &&
    birthTime !== '' &&
    birthLocation !== '' &&
    preferredLanguage !== ''

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      <ChakraBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Star className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold text-cosmic">AI Name Generator</h1>
          </div>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/20"
          >
            Back to Dashboard
          </Button>
        </header>

        {/* Form Section */}
        <Card className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-cosmic mb-6 text-center">
            Enter Birth Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="birthTime">Birth Time</Label>
              <Input
                type="time"
                id="birthTime"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="birthLocation">Birth Location</Label>
              <Input
                type="text"
                id="birthLocation"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="preferredLanguage">Preferred Language</Label>
              <Select
                value={preferredLanguage}
                onValueChange={(value) => setPreferredLanguage(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Name Length Slider */}
          <div className="mb-4 mt-6">
            <Label className="block text-sm font-medium text-foreground mb-2">
              Name Length
            </Label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {nameLength[0]}
              </span>
              <Slider
                defaultValue={nameLength}
                max={15}
                min={2}
                step={1}
                onValueChange={setNameLength}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground">
                {nameLength[1]}
              </span>
            </div>
          </div>

          {/* Include Options */}
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="includeModern"
              checked={includeModern}
              onCheckedChange={(checked) => setIncludeModern(!!checked)}
            />
            <Label htmlFor="includeModern">Include Modern Names</Label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="includeTraditional"
              checked={includeTraditional}
              onCheckedChange={(checked) => setIncludeTraditional(!!checked)}
            />
            <Label htmlFor="includeTraditional">Include Traditional Names</Label>
          </div>

          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={isProcessing || !isFormValid}
              className="nebula-gradient text-white text-xl py-6 px-12 hover:opacity-90 transition-all duration-300 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-6 h-6 mr-3 animate-spin" />
                  Revealing Names...
                </>
              ) : (
                <>
                  <Crown className="w-6 h-6 mr-3" />
                  REVEAL SECRET NAMES
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Result Section */}
        {result && (
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold text-cosmic mb-6 text-center">
              Astrology Results
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Birth Chart
                </h3>
                <p className="text-muted-foreground">
                  Birth Sign: {result.birthSign}
                </p>
                <p className="text-muted-foreground">
                  Nakshatra: {result.nakshatra}
                </p>
                <p className="text-muted-foreground">
                  Lucky Numbers: {result.luckyNumbers.join(', ')}
                </p>
                <p className="text-muted-foreground">
                  Lucky Colors: {result.luckyColors.join(', ')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Planetary Influence
                </h3>
                <p className="text-muted-foreground">
                  {result.planetaryInfluence}
                </p>
              </div>
            </div>

            {/* Suggested Names */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Suggested Names
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result.suggestedNames.map((name, index) => (
                  <Card key={index} className="p-4 border border-primary/20">
                    <h4 className="font-semibold text-foreground">{name.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Meaning: {name.meaning}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Origin: {name.origin}
                    </p>
                    <p className="text-sm text-accent">
                      Score: {name.score}/10
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Recommendations
              </h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {result.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <Button
                onClick={() => generatePDF(result)}
                className="nebula-gradient text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-sm"
              />
              <Button
                onClick={() => shareViaEmail(result, email)}
                className="bg-accent hover:bg-accent/90 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Share via Email
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Consultation
