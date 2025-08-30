
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, Sparkles } from 'lucide-react'
import StarField from '@/components/StarField'

const Auth = () => {
  const { user, signInWithGoogle, loading } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="min-h-screen cosmic-bg relative">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="glass-card p-8 max-w-md w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold text-cosmic">StarName Oracle</h1>
            <Star className="w-10 h-10 text-primary animate-pulse" />
          </div>
          
          <p className="text-muted-foreground mb-8">
            Sign in to discover the perfect name written in the stars
          </p>
          
          <div className="flex items-center justify-center gap-2 text-accent mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Start with 10 free credits</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full nebula-gradient text-white hover:opacity-90 transition-all duration-300 py-3"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Auth
