import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check environment variables without exposing sensitive data
    const envStatus = {
      hasAppId: !!process.env.CLOUDFLARE_REALTIME_APP_ID,
      hasAppSecret: !!process.env.CLOUDFLARE_REALTIME_APP_SECRET,
      hasApiUrl: !!process.env.CLOUDFLARE_REALTIME_API_URL,
      hasOrgId: !!process.env.CLOUDFLARE_REALTIME_ORG_ID,
      apiUrl: process.env.CLOUDFLARE_REALTIME_API_URL || "https://rtc.live.cloudflare.com/v1",
      nodeEnv: process.env.NODE_ENV,
    };

    const issues: string[] = [];

    if (!envStatus.hasAppId) {
      issues.push("Missing CLOUDFLARE_REALTIME_APP_ID environment variable");
    }

    if (!envStatus.hasAppSecret) {
      issues.push("Missing CLOUDFLARE_REALTIME_APP_SECRET environment variable");
    }

    const isConfigured = envStatus.hasAppId && envStatus.hasAppSecret;

    return NextResponse.json({
      configured: isConfigured,
      environment: envStatus,
      issues: issues.length > 0 ? issues : null,
      instructions: !isConfigured ? {
        step1: "Get your credentials from https://dash.cloudflare.com/calls",
        step2: "Add to your .env.local file:",
        envVars: [
          "CLOUDFLARE_REALTIME_APP_ID=your-app-id",
          "CLOUDFLARE_REALTIME_APP_SECRET=your-app-secret",
          "CLOUDFLARE_REALTIME_API_URL=https://rtc.live.cloudflare.com/v1"
        ]
      } : null
    });
  } catch (error) {
    return NextResponse.json({
      error: "Debug endpoint error",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}