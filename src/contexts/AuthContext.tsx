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
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      // Get user email to determine if admin
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user?.email) throw userError || new Error('User not found');
      
      const email = user.email;
      
      // Check if this is an admin
      const isAdmin = email.includes('@vit.ac.in') && (
        email.includes('admin') || 
        email.includes('faculty') || 
        email.includes('hod') ||
        email === 'admin@vit.ac.in'
      );

      if (isAdmin) {
        setUserRole('admin');
        localStorage.setItem('userType', 'admin');
      } else {
        // For students, check user_profiles
        const { data, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', userId)
          .single();

        if (error || !data) throw error || new Error('Student profile not found');
        setUserRole(data.role || 'student');
        localStorage.setItem('userType', data.role || 'student');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      toast.success('Signed in successfully');

      const userId = authData.user?.id;
      setUser(authData.user);

      // Check if this is an admin login (by email domain or specific emails)
      const isAdmin = email.includes('@vit.ac.in') && (
        email.includes('admin') || 
        email.includes('faculty') || 
        email.includes('hod') ||
        email === 'admin@vit.ac.in'
      );

      if (isAdmin) {
        // Admin login - no user_profiles check needed
        setUserRole('admin');
        localStorage.setItem('userType', 'admin');
      } else {
        // Student login - verify via user_profiles
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('role, roll_number')
          .eq('id', userId)
          .single();

        if (profileError || !profileData) throw profileError || new Error('Student profile not found');

        const role = profileData.role || 'student';
        setUserRole(role);

        // Store student data
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .select('*')
          .eq('roll_number', profileData.roll_number)
          .single();

        if (studentError || !studentData) throw studentError || new Error('Student data not found');
        localStorage.setItem('currentUser', JSON.stringify(studentData));

        localStorage.setItem('userType', role);
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
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
          email,
          roll_number: userData.roll_number
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

      setUser(null);
      setUserRole(null);

      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Sign-out failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
