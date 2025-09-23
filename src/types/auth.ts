/**
 * Authentication and Security Types
 * Type definitions for the authentication system
 */

// User roles
export type UserRole = "admin" | "manager" | "user" | "client";

// User status
export type UserStatus = "active" | "inactive" | "suspended" | "pending";

// Company sizes for B2B onboarding
export type CompanySize = "startup" | "small" | "medium" | "enterprise";

// Project types for B2B onboarding
export type ProjectType = "web" | "mobile" | "healthcare" | "consulting" | "custom";

// Authentication credentials
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

// Security event types
export interface SecurityEvent {
  id: string;
  type: "login_success" | "login_failed" | "logout" | "password_change" | "password_reset" |
        "two_factor_enabled" | "two_factor_disabled" | "session_created" | "session_destroyed" |
        "suspicious_activity" | "brute_force_attempt" | "account_locked";
  userId?: string;
  email?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  details: Record<string, any>;
  severity: "low" | "medium" | "high" | "critical";
  resolved: boolean;
}

// Login attempt tracking
export interface LoginAttempt {
  email: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
  failureReason?: string;
}

// Security configuration
export interface SecurityConfig {
  password: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    preventCommonPasswords: boolean;
  };
  session: {
    maxDuration: number;
    refreshTokenDuration: number;
    maxConcurrentSessions: number;
    requireSecureCookies: boolean;
    sessionTimeoutWarning: number;
  };
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
  twoFactor: {
    enabled: boolean;
    issuer: string;
    backupCodesCount: number;
  };
  monitoring: {
    logFailedAttempts: boolean;
    logSuccessfulLogins: boolean;
    suspiciousActivityThreshold: number;
    notifyOnSuspiciousActivity: boolean;
  };
}
