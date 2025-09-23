/**
 * Session Management
 * Secure session handling with encryption and validation
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import type {
  AuthSession,
  User,
  AuthError,
  AuthErrorCode
} from '@/types/auth';
import {
  SESSION_COOKIE_CONFIG,
  AUTH_CONFIG
} from './config';
import {
  createAuthError,
  generateSecureToken,
  isValidSessionToken,
  isValidRefreshToken,
  createHMAC,
  verifyHMAC,
  RateLimiter
} from './security';

// In-memory session store (replace with Redis in production)
const sessions = new Map<string, AuthSession>();
const refreshTokens = new Map<string, string>(); // token -> sessionId

// Rate limiter for session operations
const sessionRateLimiter = new RateLimiter(
  60 * 1000, // 1 minute
  10 // 10 attempts per minute
);

/**
 * Create a new secure session
 */
export async function createSession(
  user: User,
  ipAddress: string,
  userAgent: string,
  rememberMe: boolean = false
): Promise<AuthSession> {
  // Check concurrent session limit
  const userSessions = Array.from(sessions.values()).filter(s => s.userId === user.id);
  if (userSessions.length >= AUTH_CONFIG.session.maxConcurrentSessions) {
    // Remove oldest session
    const oldestSession = userSessions.reduce((oldest, current) =>
      new Date(current.createdAt) < new Date(oldest.createdAt) ? current : oldest
    );
    await destroySession(oldestSession.id);
  }

  const sessionId = generateSecureToken(32);
  const sessionToken = generateSecureToken(64);
  const refreshToken = generateSecureToken(64);

  const now = new Date();
  const expiresAt = new Date(now.getTime() + (AUTH_CONFIG.session.maxDuration * 1000));

  const session: AuthSession = {
    id: sessionId,
    userId: user.id,
    token: sessionToken,
    refreshToken,
    expiresAt: expiresAt.toISOString(),
    createdAt: now.toISOString(),
    lastActivityAt: now.toISOString(),
    ipAddress,
    userAgent,
    isActive: true,
  };

  // Store session
  sessions.set(sessionId, session);
  refreshTokens.set(refreshToken, sessionId);

  // Set secure cookie
  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE_CONFIG.name,
    sessionToken,
    {
      ...SESSION_COOKIE_CONFIG.options,
      maxAge: rememberMe ? AUTH_CONFIG.session.refreshTokenDuration : AUTH_CONFIG.session.maxDuration,
    }
  );

  return session;
}

/**
 * Validate and get session from token
 */
export async function getSession(token?: string): Promise<{ session: AuthSession | null; user: User | null }> {
  try {
    // Get token from cookie if not provided
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_CONFIG.name)?.value;
    }

    if (!token || !isValidSessionToken(token)) {
      return { session: null, user: null };
    }

    // Find session by token
    const session = Array.from(sessions.values()).find(s => s.token === token && s.isActive);

    if (!session) {
      return { session: null, user: null };
    }

    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      await destroySession(session.id);
      return { session: null, user: null };
    }

    // Update last activity
    session.lastActivityAt = new Date().toISOString();
    sessions.set(session.id, session);

    // Get user (mock - replace with database query)
    const user = await getUserById(session.userId);

    return { session, user };
  } catch (error) {
    console.error('Session validation error:', error);
    return { session: null, user: null };
  }
}

/**
 * Refresh session using refresh token
 */
export async function refreshSession(refreshToken: string): Promise<{ session: AuthSession | null; user: User | null }> {
  try {
    if (!isValidRefreshToken(refreshToken)) {
      return { session: null, user: null };
    }

    const sessionId = refreshTokens.get(refreshToken);
    if (!sessionId) {
      return { session: null, user: null };
    }

    const session = sessions.get(sessionId);
    if (!session || !session.isActive) {
      return { session: null, user: null };
    }

    // Check if refresh token is still valid (30 days)
    const refreshTokenAge = Date.now() - new Date(session.createdAt).getTime();
    if (refreshTokenAge > AUTH_CONFIG.session.refreshTokenDuration * 1000) {
      await destroySession(session.id);
      return { session: null, user: null };
    }

    // Create new session
    const user = await getUserById(session.userId);
    if (!user) {
      return { session: null, user: null };
    }

    // Destroy old session
    await destroySession(session.id);

    // Create new session
    const newSession = await createSession(user, session.ipAddress, session.userAgent);

    return { session: newSession, user };
  } catch (error) {
    console.error('Session refresh error:', error);
    return { session: null, user: null };
  }
}

/**
 * Destroy session
 */
export async function destroySession(sessionId: string): Promise<void> {
  const session = sessions.get(sessionId);
  if (session) {
    session.isActive = false;
    sessions.set(sessionId, session);

    // Remove refresh token
    refreshTokens.delete(session.refreshToken);

    // Clear cookie
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_CONFIG.name);
  }
}

/**
 * Destroy all sessions for a user
 */
export async function destroyAllUserSessions(userId: string): Promise<void> {
  const userSessions = Array.from(sessions.values()).filter(s => s.userId === userId);

  for (const session of userSessions) {
    await destroySession(session.id);
  }
}

/**
 * Validate session from request
 */
export async function validateRequestSession(request: NextRequest): Promise<{ session: AuthSession | null; user: User | null }> {
  try {
    const token = request.cookies.get(SESSION_COOKIE_CONFIG.name)?.value;
    return await getSession(token);
  } catch (error) {
    console.error('Request session validation error:', error);
    return { session: null, user: null };
  }
}

/**
 * Check if session is valid for API routes
 */
export async function requireAuth(request: NextRequest): Promise<{ session: AuthSession; user: User } | Response> {
  const { session, user } = await validateRequestSession(request);

  if (!session || !user) {
    return new Response(
      JSON.stringify(createAuthError('UNAUTHORIZED')),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  return { session, user };
}

/**
 * Check if user has required role
 */
export function hasRole(user: User, requiredRole: string): boolean {
  const roleHierarchy = ['client', 'user', 'manager', 'admin'];
  const userRoleIndex = roleHierarchy.indexOf(user.role);
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole as any);

  return userRoleIndex >= requiredRoleIndex;
}

/**
 * Check if user has required permission
 */
export function hasPermission(user: User, permission: string): boolean {
  // Mock permissions - replace with actual permission system
  const permissions: Record<string, string[]> = {
    admin: ['*'],
    manager: ['client:read', 'client:write', 'project:read', 'project:write'],
    user: ['project:read', 'client:read'],
    client: ['project:read:own', 'client:read:own'],
  };

  const userPermissions = permissions[user.role] || [];
  return userPermissions.includes('*') || userPermissions.includes(permission);
}

/**
 * Update session activity
 */
export async function updateSessionActivity(sessionId: string): Promise<void> {
  const session = sessions.get(sessionId);
  if (session && session.isActive) {
    session.lastActivityAt = new Date().toISOString();
    sessions.set(sessionId, session);
  }
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions(): Promise<void> {
  const now = new Date();

  for (const [sessionId, session] of sessions.entries()) {
    if (new Date(session.expiresAt) < now) {
      await destroySession(sessionId);
    }
  }
}

/**
 * Get session info for security monitoring
 */
export function getSessionInfo(token: string): AuthSession | null {
  return Array.from(sessions.values()).find(s => s.token === token && s.isActive) || null;
}

/**
 * Check if IP address matches session
 */
export function validateSessionIP(session: AuthSession, ipAddress: string): boolean {
  // In production, implement more sophisticated IP validation
  // Consider VPNs, proxies, and legitimate IP changes
  return session.ipAddress === ipAddress;
}

/**
 * Create session fingerprint for additional security
 */
export function createSessionFingerprint(userAgent: string, ipAddress: string): string {
  const data = `${userAgent}:${ipAddress}:${Date.now()}`;
  return createHMAC(data, process.env.SESSION_SECRET || 'fallback-secret');
}

/**
 * Validate session fingerprint
 */
export function validateSessionFingerprint(fingerprint: string, userAgent: string, ipAddress: string): boolean {
  const expectedFingerprint = createSessionFingerprint(userAgent, ipAddress);
  return verifyHMAC(expectedFingerprint, fingerprint, process.env.SESSION_SECRET || 'fallback-secret');
}

// Mock user database - replace with actual database
const mockUsers = new Map<string, User>();

/**
 * Mock user creation (replace with database)
 */
export async function createUser(userData: Partial<User>): Promise<User> {
  const user: User = {
    id: generateSecureToken(16),
    email: userData.email!,
    name: userData.name!,
    role: userData.role || 'user',
    status: userData.status || 'active',
    emailVerified: false,
    twoFactorEnabled: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profile: userData.profile,
  };

  mockUsers.set(user.id, user);
  return user;
}

/**
 * Mock user retrieval (replace with database)
 */
export async function getUserById(id: string): Promise<User | null> {
  return mockUsers.get(id) || null;
}

/**
 * Mock user retrieval by email (replace with database)
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  for (const user of mockUsers.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * Mock user authentication (replace with database)
 */
export async function authenticateUser(email: string, password: string): Promise<{ user: User | null; requiresTwoFactor: boolean }> {
  const user = await getUserByEmail(email);

  if (!user || user.status !== 'active') {
    return { user: null, requiresTwoFactor: false };
  }

  // Mock password verification - replace with actual bcrypt
  const isValidPassword = password === 'password123'; // Mock

  if (!isValidPassword) {
    return { user: null, requiresTwoFactor: false };
  }

  return {
    user,
    requiresTwoFactor: user.twoFactorEnabled
  };
}

// Initialize cleanup interval
if (typeof window === 'undefined') {
  // Server-side only
  setInterval(cleanupExpiredSessions, 60 * 60 * 1000); // Every hour
}