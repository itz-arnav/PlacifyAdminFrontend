import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyStoredToken = async () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          const valid = await AuthService.verifyToken(token);
          setIsAuthenticated(valid);
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    };
    verifyStoredToken();
  }, []);

  const login = async (username, password) => {
    const result = await AuthService.login(username, password);
    if (result) {
      setIsAuthenticated(true);
      return true;
    }
    throw new Error('Login failed');
  };

  // Note: On successful registration, we are NOT setting isAuthenticated.
  const register = async (username, email, password) => {
    const result = await AuthService.register(username, email, password);
    if (result) {
      return true;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  if (checkingAuth) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
