
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          credits: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          credits?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          credits?: number
          created_at?: string
          updated_at?: string
        }
      }
      consultations: {
        Row: {
          id: string
          user_id: string
          birth_date: string
          birth_time: string
          birth_location: string
          latitude: number | null
          longitude: number | null
          gender: string
          cultural_preference: string | null
          name_theme: string | null
          preferred_language: string
          starts_with: string | null
          status: string
          birth_sign: string | null
          suggested_names: any
          lucky_numbers: number[] | null
          lucky_colors: string[] | null
          planetary_influence: string | null
          recommendations: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          birth_date: string
          birth_time: string
          birth_location: string
          latitude?: number | null
          longitude?: number | null
          gender: string
          cultural_preference?: string | null
          name_theme?: string | null
          preferred_language?: string
          starts_with?: string | null
          status?: string
          birth_sign?: string | null
          suggested_names?: any
          lucky_numbers?: number[] | null
          lucky_colors?: string[] | null
          planetary_influence?: string | null
          recommendations?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          birth_date?: string
          birth_time?: string
          birth_location?: string
          latitude?: number | null
          longitude?: number | null
          gender?: string
          cultural_preference?: string | null
          name_theme?: string | null
          preferred_language?: string
          starts_with?: string | null
          status?: string
          birth_sign?: string | null
          suggested_names?: any
          lucky_numbers?: number[] | null
          lucky_colors?: string[] | null
          planetary_influence?: string | null
          recommendations?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          amount: number
          credits_purchased: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          amount: number
          credits_purchased: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          amount?: number
          credits_purchased?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
