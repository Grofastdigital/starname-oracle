
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Sparkles, Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BirthFormData {
  date: Date | undefined;
  time: string;
  location: string;
  gender: string;
  cultural: string;
  startsWith: string;
  preference: string;
}

interface BirthFormProps {
  onSubmit: (data: BirthFormData) => void;
  isLoading: boolean;
}

const BirthForm = ({ onSubmit, isLoading }: BirthFormProps) => {
  const [formData, setFormData] = useState<BirthFormData>({
    date: undefined,
    time: '',
    location: '',
    gender: '',
    cultural: '',
    startsWith: '',
    preference: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.location || !formData.gender) {
      return;
    }
    onSubmit(formData);
  };

  const culturalOptions = [
    "Hindu/Sanskrit Names",
    "Tamil Names",
    "Telugu Names",
    "Malayalam Names", 
    "Kannada Names",
    "Bengali Names",
    "Gujarati Names",
    "Punjabi Names",
    "Marathi Names",
    "Modern/International Names"
  ];

  const preferenceOptions = [
    "Victory/Success Names",
    "Nature/Elements Names", 
    "Divine/Spiritual Names",
    "Royal/Noble Names",
    "Wisdom/Knowledge Names",
    "Pure/Sacred Names",
    "Prosperity Names",
    "Beautiful/Graceful Names"
  ];

  return (
    <Card className="glass-card p-8 max-w-2xl mx-auto animate-glow">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-cosmic">Birth Chart Details</h2>
          <Star className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">Enter the cosmic coordinates to discover the perfect name</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Birth Date */}
        <div className="space-y-2">
          <Label className="text-foreground font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Birth Date *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal glass-card border-primary/20 hover:border-primary/40",
                  !formData.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {formData.date ? format(formData.date, "PPP") : <span>Pick the birth date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-card border-primary/20" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData({...formData, date})}
                initialFocus
                className="p-3 pointer-events-auto bg-card"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Birth Time */}
        <div className="space-y-2">
          <Label className="text-foreground font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Birth Time *
          </Label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            className="glass-card border-primary/20 focus:border-primary text-foreground"
            required
          />
        </div>

        {/* Birth Location */}
        <div className="space-y-2">
          <Label className="text-foreground font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Birth Location *
          </Label>
          <Input
            type="text"
            placeholder="City, State, Country"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="glass-card border-primary/20 focus:border-primary text-foreground"
            required
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-foreground font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Gender *
          </Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
            <SelectTrigger className="glass-card border-primary/20 focus:border-primary text-foreground">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="glass-card border-primary/20">
              <SelectItem value="boy">Boy</SelectItem>
              <SelectItem value="girl">Girl</SelectItem>
              <SelectItem value="unisex">Unisex</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cultural Background */}
        <div className="space-y-2">
          <Label className="text-foreground font-semibold">Cultural Background</Label>
          <Select value={formData.cultural} onValueChange={(value) => setFormData({...formData, cultural: value})}>
            <SelectTrigger className="glass-card border-primary/20 focus:border-primary text-foreground">
              <SelectValue placeholder="Choose cultural preference (optional)" />
            </SelectTrigger>
            <SelectContent className="glass-card border-primary/20">
              {culturalOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Starts With */}
        <div className="space-y-2">
          <Label className="text-foreground font-semibold">Preferred Starting Letter</Label>
          <Input
            type="text"
            placeholder="e.g., A, S, R (optional)"
            value={formData.startsWith}
            onChange={(e) => setFormData({...formData, startsWith: e.target.value.toUpperCase()})}
            className="glass-card border-primary/20 focus:border-primary text-foreground"
            maxLength={1}
          />
        </div>

        {/* Name Preference */}
        <div className="space-y-2">
          <Label className="text-foreground font-semibold">Name Preference Theme</Label>
          <Select value={formData.preference} onValueChange={(value) => setFormData({...formData, preference: value})}>
            <SelectTrigger className="glass-card border-primary/20 focus:border-primary text-foreground">
              <SelectValue placeholder="Choose thematic preference (optional)" />
            </SelectTrigger>
            <SelectContent className="glass-card border-primary/20">
              {preferenceOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !formData.date || !formData.time || !formData.location || !formData.gender}
          className="w-full nebula-gradient text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-300 animate-glow"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Consulting the Stars...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Discover Your Cosmic Names
            </div>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default BirthForm;
