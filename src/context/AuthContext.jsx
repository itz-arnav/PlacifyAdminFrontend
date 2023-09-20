import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check local storage for JWT and update authentication state
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    // Call AuthService.login here
    const result = await AuthService.login(username, password);
    if (result) {
      setIsAuthenticated(true);
    }else{
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
