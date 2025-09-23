import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Only allow this in development or for debugging
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const debugInfo = {
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Missing",
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "❌ Missing",
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ? "✅ Set" : "❌ Missing",
    },
    expectedCallbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
    currentUrl: request.url,
    headers: {
      host: request.headers.get("host"),
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer"),
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(debugInfo, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}