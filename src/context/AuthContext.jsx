import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on mount
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Get profile pic from user metadata if available
          const pic = session.user.user_metadata?.picture || session.user.user_metadata?.avatar_url;
          setProfilePic(pic || null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const pic = session.user.user_metadata?.picture || session.user.user_metadata?.avatar_url;
        setProfilePic(pic || null);

        // Update last_login in profiles table
        await supabase
          .from('profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', session.user.id);
      } else {
        setUser(null);
        setProfilePic(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    
    if (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
    
    return data;
  };

  const loginWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error logging in with email:', error);
      throw error;
    }

    return data;
  };

  const signUpWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      console.error('Error signing up:', error);
      throw error;
    }

    return data;
  };

  const clearSupabaseSessionStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        Object.keys(window.localStorage || {}).forEach((key) => {
          if (key.startsWith('sb-')) {
            window.localStorage.removeItem(key);
          }
        });
        Object.keys(window.sessionStorage || {}).forEach((key) => {
          if (key.startsWith('sb-')) {
            window.sessionStorage.removeItem(key);
          }
        });
      }
    } catch (storageErr) {
      console.warn('Failed to clear Supabase session storage:', storageErr);
    }
  };

  const withTimeout = async (promise, timeoutMs) => {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs))
    ]);
  };

  const logout = async () => {
    try {
      // Attempt to sign out locally first to clear stored session
      await withTimeout(supabase.auth.signOut({ scope: 'local' }), 3000);
      // Also revoke refresh token to avoid lingering sessions
      await withTimeout(supabase.auth.signOut({ scope: 'global' }), 3000);
    } catch (error) {
      console.warn('Supabase signOut encountered an issue (continuing anyway):', error);
    } finally {
      clearSupabaseSessionStorage();
      setUser(null);
      setProfilePic(null);
    }
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      profilePic, 
      loading,
      loginWithGoogle,
      loginWithEmail,
      signUpWithEmail,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
