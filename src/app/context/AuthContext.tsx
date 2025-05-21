'use client';

import { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: string | null;
  setUser: (userId: string | null) => void;
  account: { name: string; email: string } | null;
  setAccount: (account: { name: string; email: string } | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  account: null,
  setAccount: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [account, setAccount] = useState<{ name: string; email: string } | null>(null);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, account, setAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};