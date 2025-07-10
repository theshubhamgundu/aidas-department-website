import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  userRole: 'admin' | 'student' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'student' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserRole(data?.role || 'student');
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('student');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      toast.success('Signed in successfully');

      const userId = authData.user?.id;

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('role, rollNumber')
        .eq('id', userId)
        .single();

      if (profileError || !profileData) throw profileError || new Error('User profile not found');

      const role = profileData.role;
      const rollNumber = profileData.rollNumber;

      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('rollNumber', rollNumber)
        .single();

      if (studentError || !studentData) throw studentError || new Error('Student data not found');

      localStorage.setItem('currentUser', JSON.stringify(studentData));
      localStorage.setItem('userType', role);

      setUser(authData.user);
      setUserRole(role);
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data: verifiedData, error: verifyError } = await supabase
        .from('verified_students')
        .select('*')
        .eq('roll_number', userData.roll_number)
        .eq('student_name', userData.student_name)
        .eq('year', userData.year)
        .single();

      if (verifyError || !verifiedData) {
        throw new Error("You are not a verified student. Please contact admin.");
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      });

      if (signUpError) throw signUpError;
      const user = signUpData.user;
      if (!user) throw new Error("User creation failed");

      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{
          id: user.id,
          email: email,
          role: 'student',
          rollNumber: userData.roll_number
        }]);

      if (profileError) throw profileError;

      toast.success('Account created successfully');
    } catch (error: any) {
      console.error('Signup error:', error.message);
      toast.error(error.message || 'Signup failed');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userType');
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
      throw error;
    }
  };

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
  );
};
