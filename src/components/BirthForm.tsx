
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Calendar, Clock, MapPin, Heart, Sparkles, Globe } from 'lucide-react';
import { BirthData } from '@/utils/astrology';

interface BirthFormProps {
  onSubmit: (data: BirthData) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const BirthForm = ({ onSubmit, isLoading, disabled = false }: BirthFormProps) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '12:00',
    location: '',
    gender: '',
    cultural: '',
    startsWith: '',
    preference: '',
    language: 'English'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.location || !formData.gender) return;

    const birthData: BirthData = {
      birthDate: formData.date,
      birthTime: formData.time,
      birthLocation: formData.location,
      gender: formData.gender,
      culturalPreference: formData.cultural || undefined,
      nameTheme: formData.preference || undefined,
      preferredLanguage: formData.language,
      startsWith: formData.startsWith || undefined
    };

    onSubmit(birthData);
  };

  return (
    <Card className="glass-card p-8 max-w-2xl mx-auto animate-glow">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cosmic mb-2">Birth Chart Consultation</h2>
        <p className="text-muted-foreground">Enter the sacred details to unlock cosmic name wisdom</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Birth Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-accent">
              <Calendar className="w-4 h-4" />
              Birth Date *
            </Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="cosmic-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-accent">
              <Clock className="w-4 h-4" />
              Birth Time
            </Label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              className="cosmic-input"
            />
          </div>
        </div>

        {/* Birth Location */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-accent">
            <MapPin className="w-4 h-4" />
            Birth Location *
          </Label>
          <Input
            type="text"
            placeholder="Enter city, state, country"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="cosmic-input"
            required
          />
        </div>

        {/* Gender & Language */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-accent">
              <Heart className="w-4 h-4" />
              Baby Gender *
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger className="cosmic-input">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boy">Boy</SelectItem>
                <SelectItem value="girl">Girl</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-accent">
              <Globe className="w-4 h-4" />
              Preferred Language *
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))} defaultValue="English">
              <SelectTrigger className="cosmic-input">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Tamil">Tamil (தமிழ்)</SelectItem>
                <SelectItem value="Hindi">Hindi (हिंदी)</SelectItem>
                <SelectItem value="Malayalam">Malayalam (മലയാളം)</SelectItem>
                <SelectItem value="Kannada">Kannada (ಕನ್ನಡ)</SelectItem>
                <SelectItem value="Telugu">Telugu (తెలుగు)</SelectItem>
                <SelectItem value="Bengali">Bengali (বাংলা)</SelectItem>
                <SelectItem value="Gujarati">Gujarati (ગુજરાતી)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cultural Background */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-accent">
            <Sparkles className="w-4 h-4" />
            Cultural Background
          </Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, cultural: value }))}>
            <SelectTrigger className="cosmic-input">
              <SelectValue placeholder="Choose cultural preference (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hindu/Sanskrit Names">Hindu/Sanskrit Names</SelectItem>
              <SelectItem value="Tamil Names">Tamil Names</SelectItem>
              <SelectItem value="Modern/International Names">Modern/International Names</SelectItem>
              <SelectItem value="Islamic Names">Islamic Names</SelectItem>
              <SelectItem value="Christian Names">Christian Names</SelectItem>
              <SelectItem value="Sikh Names">Sikh Names</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Name Preferences */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-accent">Starting Letter (Optional)</Label>
            <Input
              type="text"
              placeholder="e.g., A, S, K"
              maxLength={1}
              value={formData.startsWith}
              onChange={(e) => setFormData(prev => ({ ...prev, startsWith: e.target.value.toUpperCase() }))}
              className="cosmic-input"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-accent">Name Theme Preference</Label>
            <Input
              type="text"
              placeholder="e.g., victory names, nature names, divine names"
              value={formData.preference}
              onChange={(e) => setFormData(prev => ({ ...prev, preference: e.target.value }))}
              className="cosmic-input"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !formData.date || !formData.location || !formData.gender}
          className="w-full nebula-gradient text-white py-3 text-lg font-semibold hover:opacity-90 transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Consulting the Stars...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Reveal My Child's Cosmic Names
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>✨ Your birth details are used only for astrological calculations ✨</p>
      </div>
    </Card>
  );
};

export default BirthForm;
