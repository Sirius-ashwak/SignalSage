'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface MockUser {
  uid: string;
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

// Mock user storage using localStorage
const STORAGE_KEY = 'mock_auth_user';
const USERS_KEY = 'mock_auth_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, pass: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get stored users
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: Record<string, { password: string; uid: string }> = usersStr ? JSON.parse(usersStr) : {};
    
    // Check if user exists and password matches
    if (users[email] && users[email].password === pass) {
      const mockUser: MockUser = {
        uid: users[email].uid,
        email,
        displayName: email.split('@')[0],
      };
      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      return { user: mockUser };
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (email: string, pass: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get stored users
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: Record<string, { password: string; uid: string }> = usersStr ? JSON.parse(usersStr) : {};
    
    // Check if user already exists
    if (users[email]) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const mockUser: MockUser = {
      uid: `mock-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      email,
      displayName: email.split('@')[0],
    };
    
    // Store user credentials
    users[email] = { password: pass, uid: mockUser.uid };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Set as current user
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return { user: mockUser };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
