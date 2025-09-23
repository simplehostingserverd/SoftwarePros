/**
 * Authentication API - Logout
 * Secure logout endpoint with session cleanup
 */

import { NextRequest, NextResponse } from 'next/server';
import type { AuthResponse } from '@/types/auth';
import { getSession, destroySession } from '@/lib/auth/session';
import { AUTH_SECURITY_HEADERS } from '@/lib/auth/config';

/**
 * POST /api/auth/logout
 * Destroy user session and log out
 */
export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    // Get current session
    const { session } = await getSession();

    if (session) {
      // Destroy the session
      await destroySession(session.id);

      // Log logout event
      console.log(`User ${session.userId} logged out from ${session.ipAddress}`);
    }

    // Create response
    const response: AuthResponse = {
      success: true,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: AUTH_SECURITY_HEADERS
    });

  } catch (error) {
    console.error('Logout error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An internal error occurred during logout'
        }
      },
      {
        status: 500,
        headers: AUTH_SECURITY_HEADERS
      }
    );
  }
}