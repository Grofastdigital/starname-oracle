
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, User, Video, Phone, MessageSquare, Star, ArrowLeft, Crown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import StarField from '@/components/StarField';
import ChatBot from '@/components/ChatBot';

interface Astrologer {
  id: string;
  name: string;
  experience: string;
  rating: number;
  specialization: string;
  languages: string[];
  hourlyRate: number;
  image: string;
  totalConsultations: number;
}

const AstrologerBooking = () => {
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const astrologers: Astrologer[] = [
    {
      id: '1',
      name: 'Dr. Ravi Kumar',
      experience: '15+ years',
      rating: 4.8,
      specialization: 'Vedic Astrology & Numerology',
      languages: ['Tamil', 'English', 'Hindi'],
      hourlyRate: 2500,
      image: '/placeholder.svg',
      totalConsultations: 5420
    },
    {
      id: '2',
      name: 'Priya Sharma',
      experience: '12+ years',
      rating: 4.7,
      specialization: 'Child Naming & Birth Chart',
      languages: ['Hindi', 'English', 'Punjabi'],
      hourlyRate: 2000,
      image: '/placeholder.svg',
      totalConsultations: 3890
    },
    {
      id: '3',
      name: 'Acharya Venkatesh',
      experience: '20+ years',
      rating: 4.9,
      specialization: 'Traditional Vedic Astrology',
      languages: ['Tamil', 'Telugu', 'Sanskrit'],
      hourlyRate: 3000,
      image: '/placeholder.svg',
      totalConsultations: 7650
    },
    {
      id: '4',
      name: 'Dr. Meera Nair',
      experience: '10+ years',
      rating: 4.6,
      specialization: 'Nakshatra Analysis',
      languages: ['Malayalam', 'English', 'Tamil'],
      hourlyRate: 1800,
      image: '/placeholder.svg',
      totalConsultations: 2340
    },
    {
      id: '5',
      name: 'Pandit Suresh Joshi',
      experience: '18+ years',
      rating: 4.8,
      specialization: 'Remedial Astrology',
      languages: ['Hindi', 'Gujarati', 'English'],
      hourlyRate: 2200,
      image: '/placeholder.svg',
      totalConsultations: 4560
    },
    {
      id: '6',
      name: 'Dr. Lakshmi Devi',
      experience: '14+ years',
      rating: 4.5,
      specialization: 'Rashi & Gotra Analysis',
      languages: ['Telugu', 'Hindi', 'English'],
      hourlyRate: 1900,
      image: '/placeholder.svg',
      totalConsultations: 3120
    },
    {
      id: '7',
      name: 'Guruji Ramesh',
      experience: '25+ years',
      rating: 4.9,
      specialization: 'Ancient Vedic Traditions',
      languages: ['Sanskrit', 'Tamil', 'Hindi'],
      hourlyRate: 3500,
      image: '/placeholder.svg',
      totalConsultations: 9870
    },
    {
      id: '8',
      name: 'Smt. Kavitha Iyer',
      experience: '11+ years',
      rating: 4.4,
      specialization: 'Modern Astrology & Psychology',
      languages: ['Tamil', 'English', 'Malayalam'],
      hourlyRate: 1700,
      image: '/placeholder.svg',
      totalConsultations: 2890
    },
    {
      id: '9',
      name: 'Acharya Bharat',
      experience: '16+ years',
      rating: 4.7,
      specialization: 'Gemstone & Remedies',
      languages: ['Hindi', 'Marathi', 'English'],
      hourlyRate: 2300,
      image: '/placeholder.svg',
      totalConsultations: 4230
    },
    {
      id: '10',
      name: 'Dr. Anjali Reddy',
      experience: '13+ years',
      rating: 4.6,
      specialization: 'Career & Life Path',
      languages: ['Telugu', 'English', 'Kannada'],
      hourlyRate: 2100,
      image: '/placeholder.svg',
      totalConsultations: 3670
    }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  // Simulate some booked slots
  const bookedSlots = ['10:00 AM', '02:30 PM', '04:00 PM'];

  const consultationTypes = [
    { id: 'phone', name: 'Phone Consultation', icon: Phone },
    { id: 'video', name: 'Video Call', icon: Video },
    { id: 'chat', name: 'Chat Session', icon: MessageSquare }
  ];

  const handleBooking = async () => {
    if (!selectedAstrologer || !selectedDate || !selectedTime || !consultationType) {
      toast.error('Please select astrologer, date, time, and consultation type');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedConsultation = consultationTypes.find(c => c.id === consultationType);
      
      toast.success(
        `Booking confirmed with ${selectedAstrologer.name}! ${selectedConsultation?.name} scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}. You will receive a confirmation email shortly.`
      );
      
      // Reset form
      setSelectedAstrologer(null);
      setSelectedDate(undefined);
      setSelectedTime('');
      setConsultationType('');
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
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
            <User className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold text-cosmic">Expert Astrologer Connect</h1>
            <User className="w-8 h-8 text-primary animate-pulse" />
          </div>
          
          <div></div>
        </header>

        {!selectedAstrologer ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cosmic mb-4">Choose Your Astrologer</h2>
              <p className="text-muted-foreground">Select from our certified astrologers for personalized consultation</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {astrologers.map((astrologer) => (
                <Card key={astrologer.id} className="glass-card p-6 hover:scale-105 transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-cosmic mb-2">{astrologer.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-primary">{astrologer.rating}</span>
                      <span className="text-sm text-muted-foreground">({astrologer.totalConsultations} consultations)</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm font-medium text-foreground">Experience</p>
                      <p className="text-sm text-muted-foreground">{astrologer.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Specialization</p>
                      <p className="text-sm text-muted-foreground">{astrologer.specialization}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Languages</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {astrologer.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Consultation Fee</span>
                      <span className="font-bold text-primary">₹{astrologer.hourlyRate}/hour</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedAstrologer(astrologer)}
                    className="w-full nebula-gradient text-white"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Select Astrologer
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="glass-card p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold text-cosmic">Book with {selectedAstrologer.name}</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-primary font-semibold">{selectedAstrologer.rating}</span>
                    <span className="text-muted-foreground">• ₹{selectedAstrologer.hourlyRate}/hour</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedAstrologer(null)}
                className="border-primary/40 text-primary hover:bg-primary/20"
              >
                Change Astrologer
              </Button>
            </div>

            <div className="space-y-6">
              {/* Consultation Type Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Choose Consultation Type
                </label>
                <div className="grid gap-3">
                  {consultationTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-primary/50",
                          consultationType === type.id 
                            ? "border-primary bg-primary/10" 
                            : "border-muted"
                        )}
                        onClick={() => setConsultationType(type.id)}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-primary" />
                          <span className="font-medium text-foreground">{type.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Date (Monday - Saturday)
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Time (9:00 AM - 6:00 PM)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = bookedSlots.includes(time);
                    return (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        disabled={isBooked}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "text-xs",
                          isBooked && "opacity-50 cursor-not-allowed",
                          selectedTime === time && "nebula-gradient text-white"
                        )}
                      >
                        {time}
                        {isBooked && <span className="ml-1">(Booked)</span>}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Booking Summary */}
              {selectedDate && selectedTime && consultationType && (
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Booking Summary</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Astrologer: {selectedAstrologer.name}</div>
                    <div>Date: {format(selectedDate, 'PPP')}</div>
                    <div>Time: {selectedTime}</div>
                    <div>Type: {consultationTypes.find(c => c.id === consultationType)?.name}</div>
                    <div className="font-semibold text-primary">
                      Fee: ₹{selectedAstrologer.hourlyRate}/hour
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedAstrologer(null)}
                  className="flex-1"
                >
                  Back to Astrologers
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || !consultationType || isSubmitting}
                  className="flex-1 nebula-gradient text-white"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AstrologerBooking;
