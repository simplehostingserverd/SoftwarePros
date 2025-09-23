import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AUTH_ERROR_MESSAGES, PASSWORD_REQUIREMENTS, RATE_LIMIT_CONFIG } from "@/lib/auth/config";
import { hashPassword, RateLimiter } from "@/lib/auth/security";

// Registration schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(PASSWORD_REQUIREMENTS.minLength)
    .regex(PASSWORD_REQUIREMENTS.patterns.uppercase)
    .regex(PASSWORD_REQUIREMENTS.patterns.lowercase)
    .regex(PASSWORD_REQUIREMENTS.patterns.numbers)
    .regex(PASSWORD_REQUIREMENTS.patterns.symbols),
  role: z.enum(["user", "client", "admin"]).default("client"),
});

// Initialize rate limiter for registration
const rateLimiter = new RateLimiter(
  RATE_LIMIT_CONFIG.passwordReset.windowMs, // 1 hour
  3 // Max 3 registration attempts per hour
);

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.headers.get("x-forwarded-for") ||
                      request.headers.get("x-real-ip") ||
                      "anonymous";

    if (!rateLimiter.isAllowed(identifier)) {
      return NextResponse.json(
        { error: AUTH_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: AUTH_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        status: "active",
        emailVerified: new Date(), // For demo purposes, consider email verified
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }


    return NextResponse.json(
      { error: AUTH_ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}