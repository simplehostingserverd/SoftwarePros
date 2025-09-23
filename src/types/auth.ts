/**
 * Authentication System Types
 * Enterprise-grade authentication with security best practices
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  timezone: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  dashboard: {
    defaultView: 'overview' | 'projects' | 'clients';
    itemsPerPage: number;
  };
}

export type UserRole = 'admin' | 'manager' | 'user' | 'client';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
  createdAt: string;
  lastActivityAt: string;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  location?: {
    country: string;
    region: string;
    city: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  company?: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TwoFactorSetup {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  session?: AuthSession;
  requiresTwoFactor?: boolean;
  twoFactorSetup?: TwoFactorSetup;
  error?: AuthError;
  redirectTo?: string;
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, any>;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_NOT_VERIFIED'
  | 'ACCOUNT_SUSPENDED'
  | 'TOO_MANY_ATTEMPTS'
  | 'INVALID_TOKEN'
  | 'EXPIRED_TOKEN'
  | 'WEAK_PASSWORD'
  | 'EMAIL_ALREADY_EXISTS'
  | 'INVALID_EMAIL_FORMAT'
  | 'TWO_FACTOR_REQUIRED'
  | 'INVALID_TWO_FACTOR_CODE'
  | 'RATE_LIMIT_EXCEEDED'
  | 'SESSION_EXPIRED'
  | 'UNAUTHORIZED'
  | 'SERVER_ERROR';

export interface SecurityConfig {
  // Password requirements
  password: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    preventCommonPasswords: boolean;
  };

  // Session security
  session: {
    maxDuration: number; // in seconds
    refreshTokenDuration: number; // in seconds
    maxConcurrentSessions: number;
    requireSecureCookies: boolean;
    sessionTimeoutWarning: number; // seconds before expiry
  };

  // Rate limiting
  rateLimit: {
    loginAttempts: {
      windowMs: number;
      maxAttempts: number;
    };
    passwordReset: {
      windowMs: number;
      maxRequests: number;
    };
  };

  // Two-factor authentication
  twoFactor: {
    enabled: boolean;
    issuer: string;
    backupCodesCount: number;
  };

  // Security monitoring
  monitoring: {
    logFailedAttempts: boolean;
    logSuccessfulLogins: boolean;
    suspiciousActivityThreshold: number;
    notifyOnSuspiciousActivity: boolean;
  };
}

export interface LoginAttempt {
  id: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
  reason?: string;
  location?: {
    country: string;
    region: string;
    city: string;
  };
}

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  userId?: string;
  email?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  resolvedAt?: string;
}

export type SecurityEventType =
  | 'FAILED_LOGIN'
  | 'SUSPICIOUS_LOGIN'
  | 'BRUTE_FORCE_ATTEMPT'
  | 'SESSION_HIJACKING'
  | 'UNAUTHORIZED_ACCESS'
  | 'TWO_FACTOR_BYPASS'
  | 'PASSWORD_RESET_ABUSE'
  | 'ACCOUNT_LOCKOUT'
  | 'SUSPICIOUS_ACTIVITY'
  | 'LOGIN_SUCCESS'
  | 'INVALID_TWO_FACTOR_CODE';

export interface AuthContext {
  user: User | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  permissions: string[];
  hasRole: (role: UserRole) => boolean;
  hasPermission: (permission: string) => boolean;
}

export interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: AuthError | null;
}