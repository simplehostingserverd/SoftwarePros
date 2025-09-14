import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check environment variables without exposing sensitive data
    const envStatus = {
      hasOrgId: !!process.env.CLOUDFLARE_REALTIME_ORG_ID,
      hasApiKey: !!process.env.CLOUDFLARE_REALTIME_API_KEY,
      hasAuthHeader: !!process.env.CLOUDFLARE_REALTIME_AUTH_HEADER,
      hasApiUrl: !!process.env.CLOUDFLARE_REALTIME_API_URL,
      apiUrl: process.env.CLOUDFLARE_REALTIME_API_URL || "https://api.realtime.cloudflare.com/v2",
      nodeEnv: process.env.NODE_ENV,
    };

    const issues: string[] = [];

    // Check if we have either auth header OR both orgId and apiKey
    const hasAuthHeader = envStatus.hasAuthHeader;
    const hasBasicAuth = envStatus.hasOrgId && envStatus.hasApiKey;

    if (!hasAuthHeader && !hasBasicAuth) {
      if (!envStatus.hasOrgId) {
        issues.push("Missing CLOUDFLARE_REALTIME_ORG_ID environment variable");
      }
      if (!envStatus.hasApiKey) {
        issues.push("Missing CLOUDFLARE_REALTIME_API_KEY environment variable");
      }
      if (!envStatus.hasAuthHeader) {
        issues.push("Alternative: You can use CLOUDFLARE_REALTIME_AUTH_HEADER instead");
      }
    }

    const isConfigured = hasAuthHeader || hasBasicAuth;

    return NextResponse.json({
      configured: isConfigured,
      environment: envStatus,
      issues: issues.length > 0 ? issues : null,
      instructions: !isConfigured
        ? {
            step1: "Get your credentials from https://dash.cloudflare.com/calls",
            step2: "Choose one of these authentication methods:",
            method1: {
              name: "Basic Auth (Organization ID + API Key)",
              envVars: [
                "CLOUDFLARE_REALTIME_ORG_ID=your-organization-id",
                "CLOUDFLARE_REALTIME_API_KEY=your-api-key",
                "CLOUDFLARE_REALTIME_API_URL=https://api.realtime.cloudflare.com/v2",
              ],
            },
            method2: {
              name: "Pre-generated Auth Header",
              envVars: [
                "CLOUDFLARE_REALTIME_AUTH_HEADER=Bearer your-pre-generated-token",
                "CLOUDFLARE_REALTIME_ORG_ID=your-organization-id",
                "CLOUDFLARE_REALTIME_API_URL=https://api.realtime.cloudflare.com/v2",
              ],
            },
          }
        : null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Debug endpoint error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
