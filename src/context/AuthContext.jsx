import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Helper function to get initial state from localStorage
const getInitialUser = () => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
};

const getInitialProfilePic = () => {
  const saved = localStorage.getItem('profilePic');
  return (saved && saved.trim()) ? saved : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [profilePic, setProfilePic] = useState(getInitialProfilePic);

  const login = (userData, pic = null) => {
    setUser(userData);
    const validPic = (pic && pic.trim()) ? pic : null;
    setProfilePic(validPic);
    localStorage.setItem('user', JSON.stringify(userData));
    if (validPic) {
      localStorage.setItem('profilePic', validPic);
    } else {
      localStorage.removeItem('profilePic');
    }
  };

  const logout = () => {
    setUser(null);
    setProfilePic(null);
    localStorage.removeItem('user');
    localStorage.removeItem('profilePic');
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, profilePic, login, logout }}>
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
