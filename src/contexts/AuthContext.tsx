
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  credits: number
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId)
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return
      }

      console.log('Profile fetched successfully:', data)
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    // Set up auth state listener FIRST - CRITICAL: Not async!
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.id)
      
      // Only synchronous state updates here
      setUser(session?.user ?? null)
      
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      // Defer profile fetching with setTimeout to avoid deadlock
      if (session?.user) {
        timeoutId = setTimeout(() => {
          fetchProfile(session.user.id)
        }, 0)
      } else {
        setProfile(null)
      }
      
      // Always set loading to false
      setLoading(false)
    })

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Defer profile fetching
        timeoutId = setTimeout(() => {
          fetchProfile(session.user.id)
        }, 0)
      }
      
      setLoading(false)
    })

    // Add a safety timeout to prevent infinite loading
    const safetyTimeout = setTimeout(() => {
      console.log('Safety timeout triggered - stopping loading')
      setLoading(false)
    }, 10000) // 10 second max loading time

    return () => {
      subscription.unsubscribe()
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      clearTimeout(safetyTimeout)
    }
  }, [])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
    if (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    user,
    profile,
    signInWithGoogle,
    signOut,
    loading,
    refreshProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
