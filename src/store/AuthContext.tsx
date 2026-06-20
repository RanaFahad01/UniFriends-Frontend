import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client';
import { hasSession } from '../api/session';
import type { User } from '../types/user';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(hasSession());

  useEffect(() => {
    if (!hasSession()) {
      return;
    }

    apiFetch<User>('/api/users/me')
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function refreshUser(): Promise<void> {
    const updated = await apiFetch<User>('/api/users/me');
    setUser(updated);
  }

  async function logout(): Promise<void> {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/login';
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
