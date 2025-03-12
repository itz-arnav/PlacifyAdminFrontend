// AuthContext.js (frontend)
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
        console.log('AuthContext verify: authenticated', result.username);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        console.log('AuthContext verify: not authenticated');
      }
      setCheckingAuth(false);
    };
    verifyAuth();
  }, []);

  const login = async (username, password) => {
    const result = await AuthService.login(username, password);
    if (result.success) {
      setIsAuthenticated(true);
      setUser(result.username);
      console.log('AuthContext login: success', result.username);
      return true;
    }
    console.log('AuthContext login: failed');
    throw new Error('Login failed');
  };

  const register = async (username, email, password) => {
    const success = await AuthService.register(username, email, password);
    if (success) {
      console.log('AuthContext register: success');
      return true;
    }
    console.log('AuthContext register: failed');
    throw new Error('Registration failed');
  };

  const logout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    console.log('AuthContext logout: success');
  };

  if (checkingAuth) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
