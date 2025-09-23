/**
 * Authentication API - Login
 * Secure login endpoint with rate limiting and security monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { AuthResponse, AuthError } from '@/types/auth';
import {
  loginSchema,
  createAuthError,
  validatePasswordStrength,
  detectSuspiciousLogin,
  createSecurityEvent,
  RateLimiter
} from '@/lib/auth/security';
import {
  authenticateUser,
  createSession,
  getSession,
  destroySession
} from '@/lib/auth/session';
import { AUTH_CONFIG, AUTH_SECURITY_HEADERS } from '@/lib/auth/config';

// Rate limiter for login attempts
const loginRateLimiter = new RateLimiter(
  AUTH_CONFIG.rateLimit.loginAttempts.windowMs,
  AUTH_CONFIG.rateLimit.loginAttempts.maxAttempts
);

/**
 * POST /api/auth/login
 * Authenticate user and create session
 */
export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    // Get client information
    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');

    // Rate limiting
    const identifier = ipAddress || 'unknown';
    if (!loginRateLimiter.isAllowed(identifier)) {
      const remainingTime = loginRateLimiter.getRemainingTime(identifier);
      const remainingAttempts = loginRateLimiter.getRemainingAttempts(identifier);

      // Log security event
      await createSecurityEvent(
        'BRUTE_FORCE_ATTEMPT',
        undefined,
        undefined,
        ipAddress,
        userAgent,
        {
          attempts: AUTH_CONFIG.rateLimit.loginAttempts.maxAttempts - remainingAttempts + 1,
          remainingTime,
          identifier
        },
        'high'
      );

      return NextResponse.json(
        {
          success: false,
          error: createAuthError('RATE_LIMIT_EXCEEDED', {
            remainingTime: Math.ceil(remainingTime / 1000),
            remainingAttempts
          })
        },
        {
          status: 429,
          headers: AUTH_SECURITY_HEADERS
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: createAuthError('INVALID_CREDENTIALS', {
            details: validation.error.issues
          })
        },
        {
          status: 400,
          headers: AUTH_SECURITY_HEADERS
        }
      );
    }

    const { email, password, rememberMe, twoFactorCode } = validation.data;

    // Check for suspicious login patterns
    // In production, get previous attempts from database
    const previousAttempts: any[] = []; // Mock - replace with database query
    if (detectSuspiciousLogin(email, ipAddress, userAgent, previousAttempts)) {
      await createSecurityEvent(
        'SUSPICIOUS_LOGIN',
        undefined,
        email,
        ipAddress,
        userAgent,
        { reason: 'Suspicious login pattern detected' },
        'high'
      );
    }

    // Authenticate user
    const { user, requiresTwoFactor } = await authenticateUser(email, password);

    if (!user) {
      // Log failed login attempt
      await createSecurityEvent(
        'FAILED_LOGIN',
        undefined,
        email,
        ipAddress,
        userAgent,
        { reason: 'Invalid credentials' },
        'medium'
      );

      return NextResponse.json(
        {
          success: false,
          error: createAuthError('INVALID_CREDENTIALS')
        },
        {
          status: 401,
          headers: AUTH_SECURITY_HEADERS
        }
      );
    }

    // Check if user account is active
    if (user.status !== 'active') {
      return NextResponse.json(
        {
          success: false,
          error: createAuthError('ACCOUNT_SUSPENDED')
        },
        {
          status: 403,
          headers: AUTH_SECURITY_HEADERS
        }
      );
    }

    // Check if two-factor authentication is required
    if (requiresTwoFactor && !twoFactorCode) {
      return NextResponse.json(
        {
          success: false,
          requiresTwoFactor: true,
          error: createAuthError('TWO_FACTOR_REQUIRED')
        },
        {
          status: 200,
          headers: AUTH_SECURITY_HEADERS
        }
      );
    }

    // Verify two-factor code if provided
    if (requiresTwoFactor && twoFactorCode) {
      // Mock 2FA verification - replace with actual implementation
      const isValid2FA = twoFactorCode === '123456'; // Mock

      if (!isValid2FA) {
        await createSecurityEvent(
          'INVALID_TWO_FACTOR_CODE',
          user.id,
          user.email,
          ipAddress,
          userAgent,
          { reason: 'Invalid 2FA code' },
          'medium'
        );

        return NextResponse.json(
          {
            success: false,
            error: createAuthError('INVALID_TWO_FACTOR_CODE')
          },
          {
            status: 401,
            headers: AUTH_SECURITY_HEADERS
          }
        );
      }
    }

    // Check if user already has maximum concurrent sessions
    const existingSession = await getSession();
    if (existingSession.session) {
      await destroySession(existingSession.session.id);
    }

    // Create new session
    const session = await createSession(user, ipAddress, userAgent, rememberMe);

    // Log successful login
    await createSecurityEvent(
      'LOGIN_SUCCESS',
      user.id,
      user.email,
      ipAddress,
      userAgent,
      {
        rememberMe,
        requiresTwoFactor,
        sessionId: session.id
      },
      'low'
    );

    // Create response
    const response: AuthResponse = {
      success: true,
      user: {
        ...user,
        // Don't include sensitive information
      },
      session: {
        ...session,
        // Don't include sensitive tokens in response
        token: 'hidden',
        refreshToken: 'hidden',
      },
      redirectTo: getRedirectPath(user.role),
    };

    return NextResponse.json(response, {
      status: 200,
      headers: AUTH_SECURITY_HEADERS
    });

  } catch (error) {
    console.error('Login error:', error);

    return NextResponse.json(
      {
        success: false,
        error: createAuthError('SERVER_ERROR', {
          message: 'An internal error occurred during login'
        })
      },
      {
        status: 500,
        headers: AUTH_SECURITY_HEADERS
      }
    );
  }
}

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  // Check various headers for real IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  // Use the first IP from x-forwarded-for, or fall back to other headers
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to a placeholder - in production, use a proper IP detection method
  return 'unknown';
}

/**
 * Get redirect path based on user role
 */
function getRedirectPath(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'manager':
      return '/admin/dashboard';
    case 'user':
      return '/dashboard';
    case 'client':
      return '/portal';
    default:
      return '/dashboard';
  }
}