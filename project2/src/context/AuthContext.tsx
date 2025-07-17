// Context per gestire l'autenticazione dell'utente
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isDocente: boolean;
  isStudente: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Carica l'utente dal localStorage al mount del componente
  useEffect(() => {
    const savedUser = localStorage.getItem('diario_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Salva l'utente nel localStorage per persistenza
    localStorage.setItem('diario_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // Rimuovi l'utente dal localStorage
    localStorage.removeItem('diario_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isDocente: user?.ruolo === 'DOCENTE',
    isStudente: user?.ruolo === 'STUDENTE',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizzato per usare il context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};