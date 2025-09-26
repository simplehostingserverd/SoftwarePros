/**
 * Authentication Security Utilities
 * Enterprise-grade security functions for authentication
 */

import crypto from "crypto";
import type {
  AuthError,
  AuthErrorCode,
  LoginAttempt,
  LoginCredentials,
  PasswordReset,
  RegisterData,
  SecurityEvent,
} from "@/types/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  AUTH_CONFIG,
  AUTH_ERROR_MESSAGES,
  COMMON_PASSWORDS,
  PASSWORD_REQUIREMENTS,
  SECURITY_THRESHOLDS,
} from "./config";

// Password validation schema
export const passwordSchema = z
  .string()
  .min(PASSWORD_REQUIREMENTS.minLength, PASSWORD_REQUIREMENTS.messages.minLength)
  .regex(PASSWORD_REQUIREMENTS.patterns.uppercase, PASSWORD_REQUIREMENTS.messages.uppercase)
  .regex(PASSWORD_REQUIREMENTS.patterns.lowercase, PASSWORD_REQUIREMENTS.messages.lowercase)
  .regex(PASSWORD_REQUIREMENTS.patterns.numbers, PASSWORD_REQUIREMENTS.messages.numbers)
  .regex(PASSWORD_REQUIREMENTS.patterns.symbols, PASSWORD_REQUIREMENTS.messages.symbols)
  .refine(
    (password) => !COMMON_PASSWORDS.includes(password.toLowerCase()),
    PASSWORD_REQUIREMENTS.messages.common,
  );

// Email validation schema
export const emailSchema = z.string().email("Invalid email format").toLowerCase().trim();

// Registration validation schema
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
    company: z.string().max(100, "Company name too long").optional(),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms and conditions"),
    acceptPrivacy: z.boolean().refine((val) => val === true, "You must accept the privacy policy"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Login validation schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
  twoFactorCode: z
    .string()
    .length(6)
    .regex(/^\d{6}$/, "Two-factor code must be 6 digits")
    .optional(),
});

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

// Password reset schema
export const passwordResetSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12; // NIST recommended minimum
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Generate a cryptographically secure session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

/**
 * Generate a secure refresh token
 */
export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(PASSWORD_REQUIREMENTS.messages.minLength);
  }

  if (!PASSWORD_REQUIREMENTS.patterns.uppercase.test(password)) {
    errors.push(PASSWORD_REQUIREMENTS.messages.uppercase);
  }

  if (!PASSWORD_REQUIREMENTS.patterns.lowercase.test(password)) {
    errors.push(PASSWORD_REQUIREMENTS.messages.lowercase);
  }

  if (!PASSWORD_REQUIREMENTS.patterns.numbers.test(password)) {
    errors.push(PASSWORD_REQUIREMENTS.messages.numbers);
  }

  if (!PASSWORD_REQUIREMENTS.patterns.symbols.test(password)) {
    errors.push(PASSWORD_REQUIREMENTS.messages.symbols);
  }

  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push(PASSWORD_REQUIREMENTS.messages.common);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if password is compromised (basic check)
 */
export function isPasswordCompromised(password: string): boolean {
  // In production, check against HaveIBeenPwned API
  return COMMON_PASSWORDS.includes(password.toLowerCase());
}

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .substring(0, 1000); // Limit length
}

/**
 * Create authentication error
 */
export function createAuthError(code: AuthErrorCode, details?: Record<string, any>): AuthError {
  return {
    code,
    message: AUTH_ERROR_MESSAGES[code],
    details,
  };
}

/**
 * Check if error is a rate limiting error
 */
export function isRateLimitError(error: AuthError): boolean {
  return error.code === "RATE_LIMIT_EXCEEDED" || error.code === "TOO_MANY_ATTEMPTS";
}

/**
 * Check if error requires two-factor authentication
 */
export function requiresTwoFactor(error: AuthError): boolean {
  return error.code === "TWO_FACTOR_REQUIRED";
}

/**
 * Generate secure backup codes for 2FA
 */
export function generateBackupCodes(count = 10): string[] {
  const codes: string[] = [];

  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(4).toString("hex").toUpperCase();
    codes.push(code);
  }

  return codes;
}

/**
 * Hash backup codes for storage
 */
export async function hashBackupCodes(codes: string[]): Promise<string[]> {
  return Promise.all(codes.map((code) => bcrypt.hash(code, 12)));
}

/**
 * Verify backup code
 */
export async function verifyBackupCode(code: string, hashedCodes: string[]): Promise<boolean> {
  for (const hashedCode of hashedCodes) {
    if (await bcrypt.compare(code, hashedCode)) {
      return true;
    }
  }
  return false;
}

/**
 * Calculate password entropy (strength score)
 */
export function calculatePasswordEntropy(password: string): number {
  const charset = new Set(password.split(""));
  const charsetSize = charset.size;

  // Basic entropy calculation: log2(charset_size ^ password_length)
  return Math.log2(Math.pow(charsetSize, password.length));
}

/**
 * Get password strength level
 */
export function getPasswordStrengthLevel(entropy: number): "weak" | "fair" | "good" | "strong" {
  if (entropy < 40) return "weak";
  if (entropy < 60) return "fair";
  if (entropy < 80) return "good";
  return "strong";
}

/**
 * Detect suspicious login patterns
 */
export function detectSuspiciousLogin(
  email: string,
  ipAddress: string,
  userAgent: string,
  previousAttempts: LoginAttempt[],
): boolean {
  const recentAttempts = previousAttempts.filter(
    (attempt) => Date.now() - new Date(attempt.timestamp).getTime() < 60 * 60 * 1000, // Last hour
  );

  // Check for rapid failed attempts
  const failedAttempts = recentAttempts.filter((attempt) => !attempt.success);
  if (failedAttempts.length >= SECURITY_THRESHOLDS.SUSPICIOUS_LOGIN_ATTEMPTS) {
    return true;
  }

  // Check for attempts from different countries (would need geoIP data)
  // Check for unusual user agents
  // Check for unusual timing patterns

  return false;
}

/**
 * Create security event log
 */
export function createSecurityEvent(
  type: SecurityEvent["type"],
  userId: string | undefined,
  email: string | undefined,
  ipAddress: string,
  userAgent: string,
  details: Record<string, any>,
  severity: SecurityEvent["severity"] = "medium",
): SecurityEvent {
  return {
    id: generateSecureToken(16),
    type,
    userId,
    email,
    ipAddress,
    userAgent,
    timestamp: new Date().toISOString(),
    details,
    severity,
    resolved: false,
  };
}

/**
 * Validate session token format
 */
export function isValidSessionToken(token: string): boolean {
  // Session tokens should be 128 characters (64 bytes in hex)
  return /^[a-f0-9]{128}$/.test(token);
}

/**
 * Validate refresh token format
 */
export function isValidRefreshToken(token: string): boolean {
  // Refresh tokens should be 128 characters (64 bytes in hex)
  return /^[a-f0-9]{128}$/.test(token);
}

/**
 * Check if IP address is from a trusted location
 */
export function isTrustedIP(ipAddress: string, trustedIPs: string[]): boolean {
  return trustedIPs.includes(ipAddress);
}

/**
 * Generate secure random bytes
 */
export function generateSecureRandomBytes(length: number): Buffer {
  return crypto.randomBytes(length);
}

/**
 * Create HMAC signature for data integrity
 */
export function createHMAC(data: string, key: string): string {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

/**
 * Verify HMAC signature
 */
export function verifyHMAC(data: string, signature: string, key: string): boolean {
  const expectedSignature = createHMAC(data, key);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

/**
 * Encrypt sensitive data
 */
export function encryptSensitiveData(data: string, key: string): string {
  const algorithm = "aes-256-gcm";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, key);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return iv.toString("hex") + ":" + authTag.toString("hex") + ":" + encrypted;
}

/**
 * Decrypt sensitive data
 */
export function decryptSensitiveData(encryptedData: string, key: string): string {
  const algorithm = "aes-256-gcm";
  const parts = encryptedData.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const authTag = Buffer.from(parts[1], "hex");
  const encrypted = parts[2];

  const decipher = crypto.createDecipher(algorithm, key);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(
    private windowMs: number,
    private maxAttempts: number,
  ) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record || now > record.resetTime) {
      // Reset or initialize
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (record.count >= this.maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;

    return Math.max(0, record.resetTime - Date.now());
  }

  getRemainingAttempts(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return this.maxAttempts;

    return Math.max(0, this.maxAttempts - record.count);
  }
}
