/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type {
  User,
  AuthSession,
  AuthState,
  AuthContext as AuthContextType,
  LoginCredentials,
  AuthResponse,
  UserRole
} from '@/types/auth';
import { getSession } from '@/lib/auth/session';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const { session, user } = await getSession();

      setAuthState({
        user,
        session,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      setAuthState({
        user: null,
        session: null,
        isLoading: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Failed to initialize authentication',
        },
      });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result: AuthResponse = await response.json();

      if (result.success && result.user && result.session) {
        setAuthState({
          user: result.user,
          session: result.session,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || {
            code: 'SERVER_ERROR',
            message: 'Login failed',
          },
        }));
      }

      return result;
    } catch (error) {
      const authError = {
        code: 'SERVER_ERROR' as const,
        message: 'Network error during login',
      };

      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: authError,
      }));

      return {
        success: false,
        error: authError,
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      setAuthState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local state
      setAuthState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
    }
  };

  const refreshSession = async (): Promise<boolean> => {
    try {
      if (!authState.session?.refreshToken) {
        return false;
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: authState.session.refreshToken,
        }),
      });

      const result: AuthResponse = await response.json();

      if (result.success && result.user && result.session) {
        setAuthState({
          user: result.user,
          session: result.session,
          isLoading: false,
          error: null,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Session refresh error:', error);
      return false;
    }
  };

  const hasRole = (role: string): boolean => {
    return authState.user?.role === role;
  };

  const hasPermission = (permission: string): boolean => {
    // Mock permission check - replace with actual implementation
    if (!authState.user) return false;

    const permissions: Record<string, string[]> = {
      admin: ['*'],
      manager: ['client:read', 'client:write', 'project:read', 'project:write'],
      user: ['project:read', 'client:read'],
      client: ['project:read:own', 'client:read:own'],
    };

    const userPermissions = permissions[authState.user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  const permissions = authState.user ? [
    // Mock permissions based on role
    ...(authState.user.role === 'admin' ? ['*'] : []),
    ...(authState.user.role === 'manager' ? ['client:read', 'client:write', 'project:read', 'project:write'] : []),
    ...(authState.user.role === 'user' ? ['project:read', 'client:read'] : []),
    ...(authState.user.role === 'client' ? ['project:read:own', 'client:read:own'] : []),
  ] : [];

  const contextValue: AuthContextType = {
    user: authState.user,
    session: authState.session,
    isLoading: authState.isLoading,
    isAuthenticated: !!authState.user,
    permissions,
    hasRole,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for checking specific permissions
export function usePermission(permission: string): boolean {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
}

// Hook for checking specific roles
export function useRole(role: UserRole): boolean {
  const { hasRole } = useAuth();
  return hasRole(role);
}

// Hook for admin-only content
export function useAdmin(): boolean {
  return useRole('admin');
}