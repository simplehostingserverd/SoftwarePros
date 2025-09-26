import { testDatabaseConnection } from "@/lib/db";
import { testRedisConnection } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const results = {
      database: {
        status: "unknown",
        connection: false,
        error: null as string | null,
        url: process.env.DATABASE_URL ? "configured" : "not configured",
      },
      redis: {
        status: "unknown",
        connection: false,
        error: null as string | null,
        url: process.env.REDIS_URL || "redis://localhost:6379",
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        coolifyDeployment: !!process.env.DATABASE_URL?.includes("coolify"),
        hasRedisConfig: !!process.env.REDIS_URL || !!process.env.REDIS_HOST,
      },
    };

    // Test database connection
    try {
      results.database.connection = await testDatabaseConnection();
      results.database.status = results.database.connection ? "connected" : "failed";
    } catch (error) {
      results.database.status = "error";
      results.database.error = error instanceof Error ? error.message : "Unknown error";
    }

    // Test Redis connection
    try {
      results.redis.connection = await testRedisConnection();
      results.redis.status = results.redis.connection ? "connected" : "failed";
    } catch (error) {
      results.redis.status = "error";
      results.redis.error = error instanceof Error ? error.message : "Unknown error";
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error("Error testing connections:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to test connections",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
