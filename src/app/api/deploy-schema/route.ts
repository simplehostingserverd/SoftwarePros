import { exec } from "child_process";
import { promisify } from "util";
import { type NextRequest, NextResponse } from "next/server";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Simple security check - only allow in development or with special header
    const isProduction = process.env.NODE_ENV === "production";
    const authHeader = request.headers.get("x-deploy-auth");

    if (isProduction && authHeader !== process.env.DEPLOY_AUTH_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🚀 Starting database schema deployment...");

    // Generate Prisma client
    console.log("📦 Generating Prisma client...");
    const { stdout: generateOutput, stderr: generateError } =
      await execAsync("npx prisma generate");

    if (generateError && !generateError.includes("warn")) {
      console.error("Generate error:", generateError);
      return NextResponse.json(
        {
          error: "Failed to generate Prisma client",
          details: generateError,
        },
        { status: 500 },
      );
    }

    console.log("Generate output:", generateOutput);

    // Push schema to database
    console.log("🗄️  Pushing schema to database...");
    const { stdout: pushOutput, stderr: pushError } = await execAsync(
      "npx prisma db push --accept-data-loss",
    );

    if (pushError && !pushError.includes("warn")) {
      console.error("Push error:", pushError);
      return NextResponse.json(
        {
          error: "Failed to push schema to database",
          details: pushError,
        },
        { status: 500 },
      );
    }

    console.log("Push output:", pushOutput);

    console.log("✅ Database schema deployment completed successfully!");

    return NextResponse.json({
      success: true,
      message: "Database schema deployed successfully",
      generateOutput,
      pushOutput,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error deploying schema:", error);
    return NextResponse.json(
      {
        error: "Internal server error during schema deployment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Schema deployment endpoint. Use POST to deploy.",
    requiresAuth: process.env.NODE_ENV === "production",
    timestamp: new Date().toISOString(),
  });
}
