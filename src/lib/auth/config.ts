/**
 * Authentication Configuration
 * Security-focused configuration for enterprise authentication
 */

import type { SecurityConfig } from '@/types/auth';

export const AUTH_CONFIG: SecurityConfig = {
  // Password requirements - NIST 800-63B compliant
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    preventCommonPasswords: true,
  },

  // Session security - secure by default
  session: {
    maxDuration: 60 * 60 * 8, // 8 hours
    refreshTokenDuration: 60 * 60 * 24 * 30, // 30 days
    maxConcurrentSessions: 3,
    requireSecureCookies: true,
    sessionTimeoutWarning: 60 * 15, // 15 minutes before expiry
  },

  // Rate limiting - prevent brute force attacks
  rateLimit: {
    loginAttempts: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxAttempts: 5,
    },
    passwordReset: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 3,
    },
  },

  // Two-factor authentication
  twoFactor: {
    enabled: true,
    issuer: 'SoftwarePros',
    backupCodesCount: 10,
  },

  // Security monitoring
  monitoring: {
    logFailedAttempts: true,
    logSuccessfulLogins: true,
    suspiciousActivityThreshold: 3,
    notifyOnSuspiciousActivity: true,
  },
};

// Common weak passwords to prevent
export const COMMON_PASSWORDS = [
  'password', 'password123', '123456', '123456789', 'qwerty', 'abc123',
  'password1', 'admin', 'letmein', 'welcome', 'monkey', '1234567890',
  'password12', 'qwerty123', 'admin123', 'root123', 'user123',
];

// Password strength requirements
export const PASSWORD_REQUIREMENTS = {
  minLength: AUTH_CONFIG.password.minLength,
  patterns: {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numbers: /[0-9]/,
    symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  },
  messages: {
    minLength: `Password must be at least ${AUTH_CONFIG.password.minLength} characters long`,
    uppercase: 'Password must contain at least one uppercase letter',
    lowercase: 'Password must contain at least one lowercase letter',
    numbers: 'Password must contain at least one number',
    symbols: 'Password must contain at least one special character',
    common: 'Password is too common and easily guessable',
  },
};

// Session cookie configuration
export const SESSION_COOKIE_CONFIG = {
  name: 'softwarepros_session',
  options: {
    httpOnly: true,
    secure: AUTH_CONFIG.session.requireSecureCookies,
    sameSite: 'strict' as const,
    maxAge: AUTH_CONFIG.session.maxDuration,
    path: '/',
  },
};

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  login: {
    windowMs: AUTH_CONFIG.rateLimit.loginAttempts.windowMs,
    max: AUTH_CONFIG.rateLimit.loginAttempts.maxAttempts,
    message: 'Too many login attempts. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },
  passwordReset: {
    windowMs: AUTH_CONFIG.rateLimit.passwordReset.windowMs,
    max: AUTH_CONFIG.rateLimit.passwordReset.maxRequests,
    message: 'Too many password reset requests. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },
};

// Security headers for authentication routes
export const AUTH_SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

// Two-factor authentication configuration
export const TWO_FACTOR_CONFIG = {
  issuer: AUTH_CONFIG.twoFactor.issuer,
  digits: 6,
  step: 30, // 30 seconds
  window: 2, // Allow 2 steps either way for clock drift
  backupCodesCount: AUTH_CONFIG.twoFactor.backupCodesCount,
};

// User roles and permissions
export const USER_ROLES = {
  admin: {
    name: 'Administrator',
    permissions: [
      'user:read', 'user:write', 'user:delete',
      'client:read', 'client:write', 'client:delete',
      'project:read', 'project:write', 'project:delete',
      'system:admin', 'system:config',
    ],
  },
  manager: {
    name: 'Project Manager',
    permissions: [
      'client:read', 'client:write',
      'project:read', 'project:write',
      'user:read',
    ],
  },
  user: {
    name: 'Team Member',
    permissions: [
      'project:read',
      'client:read',
    ],
  },
  client: {
    name: 'Client',
    permissions: [
      'project:read:own',
      'client:read:own',
    ],
  },
} as const;

// Authentication error messages
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_NOT_VERIFIED: 'Please verify your email address before logging in',
  ACCOUNT_SUSPENDED: 'Your account has been suspended. Please contact support.',
  TOO_MANY_ATTEMPTS: 'Too many login attempts. Please try again later.',
  INVALID_TOKEN: 'Invalid or expired token',
  EXPIRED_TOKEN: 'Your session has expired. Please log in again.',
  WEAK_PASSWORD: 'Password does not meet security requirements',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
  INVALID_EMAIL_FORMAT: 'Please enter a valid email address',
  TWO_FACTOR_REQUIRED: 'Two-factor authentication code is required',
  INVALID_TWO_FACTOR_CODE: 'Invalid two-factor authentication code',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  UNAUTHORIZED: 'You do not have permission to perform this action',
  SERVER_ERROR: 'An internal error occurred. Please try again later.',
} as const;

// Security monitoring thresholds
export const SECURITY_THRESHOLDS = {
  SUSPICIOUS_LOGIN_ATTEMPTS: AUTH_CONFIG.monitoring.suspiciousActivityThreshold,
  BRUTE_FORCE_THRESHOLD: 10,
  UNUSUAL_LOCATION_THRESHOLD: 5,
  RAPID_SESSION_CREATION_THRESHOLD: 3,
} as const;

// Audit log configuration
export const AUDIT_LOG_CONFIG = {
  enabled: true,
  events: [
    'login_success',
    'login_failed',
    'logout',
    'password_change',
    'password_reset',
    'two_factor_enabled',
    'two_factor_disabled',
    'session_created',
    'session_destroyed',
    'suspicious_activity',
  ],
  retentionDays: 90,
} as const;