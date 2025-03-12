import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await AuthService.verifyToken();
      if (result.valid) {
        setIsAuthenticated(true);
        setUser(result.username);
        localStorage.setItem('username', result.username);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('username');
      }
      setCheckingAuth(false);
    };
    verifyAuth();
  }, []);

  const login = async (username, password) => {
    const success = await AuthService.login(username, password);
    if (success) {
      setIsAuthenticated(true);
      setUser(username);
      localStorage.setItem('username', username);
      return true;
    }
    throw new Error('Login failed');
  };

  const register = async (username, email, password) => {
    const result = await AuthService.register(username, email, password);
    if (result) {
      return true;
    }
    throw new Error('Registration failed');
  };

  const logout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('username');
  };

  if (checkingAuth) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
