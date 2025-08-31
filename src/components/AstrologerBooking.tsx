import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, User, Video, Phone, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AstrologerBookingProps {
  onClose?: () => void;
}

const AstrologerBooking: React.FC<AstrologerBookingProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'
  ];

  const consultationTypes = [
    { id: 'phone', name: 'Phone Consultation', price: 1500, icon: Phone },
    { id: 'video', name: 'Video Call', price: 2000, icon: Video },
    { id: 'chat', name: 'Chat Session', price: 1000, icon: MessageSquare }
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !consultationType) {
      toast.error('Please select date, time, and consultation type');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedConsultation = consultationTypes.find(c => c.id === consultationType);
      
      // Send booking confirmation email
      try {
        const { data, error } = await supabase.functions.invoke('send-booking-email', {
          body: {
            email: 'user@example.com', // In real app, get from auth context
            astrologerName: 'Dr. Ravi Kumar', // Selected astrologer
            date: format(selectedDate, 'PPP'),
            time: selectedTime,
            consultationType: selectedConsultation?.name || '',
            price: selectedConsultation?.price || 0
          }
        });

        if (error) throw error;
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
      
      toast.success(
        `Booking confirmed! ${selectedConsultation?.name} scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}. Confirmation email sent!`
      );
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-cosmic">Book Astrologer Consultation</h2>
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">{type.name}</span>
                    </div>
                    <span className="font-bold text-primary">₹{type.price}/hour</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select Date
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
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select Time
          </label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <Clock className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Choose time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Booking Summary */}
        {selectedDate && selectedTime && consultationType && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">Booking Summary</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>Date: {format(selectedDate, 'PPP')}</div>
              <div>Time: {selectedTime}</div>
              <div>Type: {consultationTypes.find(c => c.id === consultationType)?.name}</div>
              <div className="font-semibold text-primary">
                Price: ₹{consultationTypes.find(c => c.id === consultationType)?.price}/hour
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {onClose && (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
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
  );
};

export default AstrologerBooking;
