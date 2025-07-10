import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  userRole: 'admin' | 'student' | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<'admin' | 'student' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchUserRole(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchUserRole(session.user.id)
      else setUserRole(null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) throw error
      setUserRole(data?.role || 'student')
    } catch (error) {
      console.error('Error fetching user role:', error)
      setUserRole('student')
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast.success('Signed in successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in')
      throw error
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      // ✅ Match against verified_students table
      const { data: verifiedStudent, error: matchError } = await supabase
        .from('verified_students')
        .select('*')
        .eq('H.T No.', userData.rollNumber.trim().toUpperCase())
        .eq('Student Name', userData.name.trim())
        .eq('Year', userData.year.trim())
        .single()

      if (matchError || !verifiedStudent) {
        throw new Error('You are not a verified student. Please contact the department.')
      }

      // ✅ Register in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error

      // ✅ Create profile record
      if (data.user) {
        await supabase.from('user_profiles').insert([{
          id: data.user.id,
          email,
          role: 'student',
          ...userData
        }])
      }

      toast.success('Account created successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account')
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out')
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      userRole,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}
