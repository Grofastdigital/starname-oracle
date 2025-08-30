
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Sparkles, Crown, LogOut, CreditCard, Plus, User, MessageCircle, BookOpenCheck, Heart, Calendar, TrendingUp, Eye } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import StarField from '@/components/StarField'
import ChakraBackground from '@/components/ChakraBackground'
import ChatBot from '@/components/ChatBot'

const Dashboard = () => {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [consultationStats, setConsultationStats] = useState({
    total: 0,
    recent: [] as any[]
  })
  const [bookingHistory, setBookingHistory] = useState([])

  useEffect(() => {
    if (profile?.id) {
      fetchConsultationStats()
      fetchBookingHistory()
    }
  }, [profile?.id])

  const fetchConsultationStats = async () => {
    try {
      const { data: consultations, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setConsultationStats({
        total: consultations?.length || 0,
        recent: consultations?.slice(0, 5) || []
      })
    } catch (error) {
      console.error('Error fetching consultation stats:', error)
    }
  }

  const fetchBookingHistory = async () => {
    // Simulate booking history - in real app, this would come from a bookings table
    const mockBookings = [
      {
        id: 1,
        astrologer: 'Dr. Ravi Kumar',
        date: '2025-08-25',
        time: '2:00 PM',
        status: 'completed'
      },
      {
        id: 2,
        astrologer: 'Smt. Lakshmi Devi',
        date: '2025-08-28',
        time: '10:30 AM', 
        status: 'upcoming'
      }
    ]
    setBookingHistory(mockBookings)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleConsultationClick = (consultation) => {
    // Navigate to results page with consultation data
    navigate('/consultation', { 
      state: { 
        result: {
          birthSign: consultation.birth_sign,
          nakshatra: consultation.nakshatra || 'Ashwini',
          luckyNumbers: consultation.lucky_numbers || [1, 3, 9],
          luckyColors: consultation.lucky_colors || ['Red', 'Yellow'],
          suggestedNames: consultation.suggested_names || [],
          planetaryInfluence: consultation.planetary_influence || 'Strong planetary alignment',
          recommendations: consultation.recommendations || []
        }
      }
    })
  }

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      <ChakraBackground />
      <ChatBot />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Star className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold text-cosmic">AstroName AI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Card className="glass-card px-4 py-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">{profile?.credits || 0} Credits</span>
              </div>
            </Card>
            
            <Link to="/pricing">
              <Button className="nebula-gradient text-white hover:opacity-90 transition-all duration-300">
                <CreditCard className="w-4 h-4 mr-2" />
                Buy Credits
              </Button>
            </Link>
            
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Welcome Section */}
        <Card className="glass-card p-8 text-center mb-8 animate-glow">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold text-cosmic">
              Welcome, {profile?.full_name || 'Stargazer'}!
            </h2>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          
          <p className="text-muted-foreground mb-6">
            Unveil the cosmic secrets hidden in the stars for your little one's perfect name
          </p>
        </Card>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">🎯 AI Name Generator</h3>
            <p className="text-muted-foreground mb-4">Get personalized Vedic names based on your child's birth chart</p>
            <Link to="/consultation">
              <Button className="nebula-gradient text-white hover:opacity-90 transition-all duration-300 w-full">
                <Plus className="w-5 h-5 mr-2" />
                Generate Names
              </Button>
            </Link>
          </Card>
          
          <Card className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
            <User className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">👨‍🏫 Expert Astrologer Connect</h3>
            <p className="text-muted-foreground mb-4">Book personal consultation with certified astrologers</p>
            <Link to="/astrologer-booking">
              <Button 
                className="bg-accent hover:bg-accent/90 text-white w-full"
              >
                <BookOpenCheck className="w-5 h-5 mr-2" />
                Book Session
              </Button>
            </Link>
          </Card>
          
          <Card className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">🤖 AI Name Assistant</h3>
            <p className="text-muted-foreground mb-4">Chat with AI for name guidance and cosmic insights</p>
            <Button 
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/20 w-full"
              onClick={() => {
                const chatBot = document.querySelector('[data-testid="chatbot-toggle"]') as HTMLElement;
                if (chatBot) chatBot.click();
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat Now
            </Button>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card p-6 text-center hover:scale-105 transition-all duration-300">
            <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Available Credits</h3>
            <Badge className="nebula-gradient text-white px-4 py-2 text-lg">
              {profile?.credits || 0}
            </Badge>
          </Card>
          
          <Card className="glass-card p-6 text-center hover:scale-105 transition-all duration-300">
            <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Total Consultations</h3>
            <p className="text-2xl font-bold text-accent">{consultationStats.total}</p>
          </Card>
          
          <Card className="glass-card p-6 text-center hover:scale-105 transition-all duration-300">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Favorite Names</h3>
            <p className="text-2xl font-bold text-primary">0</p>
          </Card>

          <Card className="glass-card p-6 text-center hover:scale-105 transition-all duration-300">
            <Calendar className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Booked Appointments</h3>
            <p className="text-2xl font-bold text-accent">{bookingHistory.length}</p>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-bold text-cosmic mb-6 text-center">Recent Consultations</h3>
          
          {consultationStats.recent.length > 0 ? (
            <div className="space-y-4">
              {consultationStats.recent.map((consultation, index) => (
                <Card 
                  key={consultation.id} 
                  className="p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer hover:bg-primary/5"
                  onClick={() => handleConsultationClick(consultation)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Consultation #{consultationStats.total - index}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {consultation.birth_location} • {consultation.preferred_language}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(consultation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <Badge 
                          className={consultation.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                        >
                          {consultation.status}
                        </Badge>
                        {consultation.suggested_names && (
                          <p className="text-sm text-accent mt-1">
                            {consultation.suggested_names.length} names generated
                          </p>
                        )}
                      </div>
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No consultations yet</p>
              <p className="text-sm mt-2">Start your cosmic journey by creating your first consultation!</p>
              <Link to="/consultation">
                <Button className="nebula-gradient text-white mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Start Now
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
