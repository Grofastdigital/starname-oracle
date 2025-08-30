
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Calendar, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your StarName Oracle assistant. I can help you with astrological queries or connect you with a real astrologer. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('astrologer') || input.includes('appointment') || input.includes('book')) {
      return "I can help you book an appointment with our expert astrologers! Our certified astrologers are available for personalized consultations. Would you like to schedule a session? Please provide your preferred date and time.";
    }
    
    if (input.includes('name') || input.includes('baby')) {
      return "For personalized baby name suggestions based on astrological calculations, please use our main consultation form. I can also help you understand how different names align with cosmic energies. What specific aspect of naming would you like to know about?";
    }
    
    if (input.includes('birth chart') || input.includes('horoscope')) {
      return "Birth charts reveal the cosmic blueprint of personality and destiny. Our AI analyzes planetary positions at the time of birth to suggest harmonious names. Would you like to know more about how birth charts influence name selection?";
    }
    
    return "I'm here to help with all your astrological queries! You can ask me about birth charts, name meanings, planetary influences, or book an appointment with our expert astrologers. What would you like to explore?";
  };

  const handleBookAppointment = () => {
    const appointmentMessage: Message = {
      id: messages.length + 1,
      text: "I'd like to book an appointment with a real astrologer",
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, appointmentMessage]);

    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        text: "Perfect! I'll connect you with our expert astrologers. Please choose your preferred consultation type:\n\n📞 Phone Consultation - ₹1500/hour\n💻 Video Call - ₹2000/hour\n📝 Chat Session - ₹1000/hour\n\nOur astrologers are available Monday-Sunday, 9 AM - 9 PM. When would you prefer to schedule your session?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="nebula-gradient text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px]">
      <Card className="glass-card h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-cosmic">StarName Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="hover:bg-primary/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.isUser
                    ? 'nebula-gradient text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-2 border-t border-primary/20">
          <div className="flex gap-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookAppointment}
              className="text-xs border-primary/40 hover:bg-primary/20"
            >
              <Calendar className="w-3 h-3 mr-1" />
              Book Astrologer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("How do names affect destiny?")}
              className="text-xs border-primary/40 hover:bg-primary/20"
            >
              <User className="w-3 h-3 mr-1" />
              Name Guidance
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-primary/20">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about astrology or book consultation..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button
              onClick={handleSendMessage}
              className="nebula-gradient text-white px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;
