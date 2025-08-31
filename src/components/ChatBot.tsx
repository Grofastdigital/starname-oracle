import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Star, Crown, Sparkles, Mic, MicOff, Volume2 } from 'lucide-react';

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
      text: "Hello! I'm your AstroName AI Voice Assistant. I can help you with name meanings, astrological guidance, and Vedic naming traditions. You can type or speak to me. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('name') && input.includes('meaning')) {
      return "Name meanings are deeply connected to cosmic energies! Each name carries vibrations that influence personality and destiny. Would you like me to explain the meaning of a specific name or help you understand how names connect to birth charts?";
    }
    
    if (input.includes('rashi') || input.includes('zodiac')) {
      return "Rashi (zodiac signs) play a crucial role in Vedic naming! Each rashi has specific letters and sounds that bring good fortune. For example, Aries (Mesha) names often start with A, L, E, while Taurus (Vrishabha) names begin with B, V, U. Would you like to know more about your child's rashi?";
    }
    
    if (input.includes('nakshatra') || input.includes('star')) {
      return "Nakshatras are the 27 lunar mansions in Vedic astrology! Each nakshatra has specific syllables for naming. For instance, Ashwini nakshatra uses sounds like 'Chu', 'Che', 'Cho', 'La'. This creates perfect harmony between the name and cosmic energies. What's your child's birth date?";
    }
    
    if (input.includes('lucky') || input.includes('number')) {
      return "Lucky numbers in Vedic astrology come from your birth date and nakshatra! These numbers influence major life decisions and can guide name selection. The birth date number and life path number create a unique cosmic signature. Would you like to know how to calculate these?";
    }
    
    if (input.includes('tamil') || input.includes('malayalam') || input.includes('telugu') || input.includes('kannada')) {
      return "Regional names carry beautiful cultural significance! Tamil names often honor deities and nature, Malayalam names reflect spiritual qualities, Telugu names celebrate prosperity, and Kannada names embody strength. Each tradition offers unique cosmic connections. Which language interests you most?";
    }
    
    if (input.includes('boy') || input.includes('girl') || input.includes('gender')) {
      return "Gender influences name selection in Vedic traditions! Boys' names often emphasize strength, leadership, and divine qualities, while girls' names celebrate beauty, wisdom, and prosperity. However, many names carry universal positive vibrations. Are you looking for names for a boy or girl?";
    }
    
    if (input.includes('time') || input.includes('birth time')) {
      return "Birth time is crucial for accurate astrological calculations! It determines the exact nakshatra, rashi, and planetary positions. Even a difference of minutes can change the cosmic influences. Make sure to include AM/PM when providing birth time for the most accurate name suggestions.";
    }
    
    return "I'm here to help with all your astrological naming queries! You can ask me about:\n\n🌟 Name meanings and significance\n🔮 Rashi and Nakshatra guidance\n📊 Lucky numbers and colors\n🌍 Regional naming traditions\n⏰ Birth time importance\n💎 Cosmic connections\n\nWhat would you like to explore? Feel free to speak or type!";
  };

  const quickSuggestions = [
    {
      text: "Explain Rashi importance",
      icon: Star,
      action: () => setInputMessage("How does rashi influence name selection?")
    },
    {
      text: "Name meaning guidance",
      icon: Crown,
      action: () => setInputMessage("How do name meanings affect destiny?")
    },
    {
      text: "Birth time significance",
      icon: Sparkles,
      action: () => setInputMessage("Why is exact birth time important for naming?")
    }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="nebula-gradient text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse font-semibold text-lg"
          data-testid="chatbot-toggle"
        >
          <MessageCircle className="w-6 h-6 mr-2" />
          AI Voice Assistant
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
            <h3 className="font-semibold text-cosmic">AI Voice Assistant</h3>
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
                    : 'bg-muted text-foreground relative'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {!message.isUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(message.text)}
                      className="h-6 w-6 p-0 hover:bg-primary/20"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        <div className="p-2 border-t border-primary/20">
          <div className="flex flex-wrap gap-1 mb-2">
            {quickSuggestions.map((suggestion, index) => {
              const IconComponent = suggestion.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={suggestion.action}
                  className="text-xs border-primary/40 hover:bg-primary/20 flex-1"
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {suggestion.text}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Input with Voice */}
        <div className="p-4 border-t border-primary/20">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type or speak your question..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm flex-1"
            />
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`px-3 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'nebula-gradient'} text-white`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                className="px-3 bg-red-500 hover:bg-red-600 text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button
              onClick={handleSendMessage}
              className="nebula-gradient text-white px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {isListening && (
            <p className="text-xs text-center text-primary mt-2 animate-pulse">
              🎤 Listening... Speak now
            </p>
          )}
          {isSpeaking && (
            <p className="text-xs text-center text-primary mt-2 animate-pulse">
              🔊 Speaking... Click X to stop
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;
