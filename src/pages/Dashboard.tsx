
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Sparkles, Crown, LogOut, CreditCard, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import StarField from '@/components/StarField'
import ChatBot from '@/components/ChatBot'

const Dashboard = () => {
  const { profile, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      <ChatBot />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Star className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold text-cosmic">StarName Oracle</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Card className="glass-card px-4 py-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">{profile?.credits || 0} Credits</span>
              </div>
            </Card>
            
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
        <Card className="glass-card p-8 text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold text-cosmic">
              Welcome, {profile?.full_name || 'Stargazer'}!
            </h2>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          
          <p className="text-muted-foreground mb-6">
            Ready to discover the perfect cosmic name for your little star?
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/consultation">
              <Button className="nebula-gradient text-white hover:opacity-90 transition-all duration-300 px-8 py-3">
                <Plus className="w-5 h-5 mr-2" />
                New Consultation
              </Button>
            </Link>
            
            <Link to="/pricing">
              <Button
                variant="outline"
                className="border-accent/40 text-accent hover:bg-accent/20 px-8 py-3"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Buy More Credits
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card p-6 text-center">
            <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Available Credits</h3>
            <Badge className="nebula-gradient text-white px-4 py-2 text-lg">
              {profile?.credits || 0}
            </Badge>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <Star className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Consultations</h3>
            <p className="text-2xl font-bold text-accent">0</p>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Favorite Names</h3>
            <p className="text-2xl font-bold text-primary">0</p>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-bold text-cosmic mb-6 text-center">Recent Consultations</h3>
          <div className="text-center text-muted-foreground py-12">
            <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No consultations yet</p>
            <p className="text-sm mt-2">Start your cosmic journey by creating your first consultation!</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
