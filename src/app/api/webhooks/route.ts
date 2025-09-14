import { NextRequest, NextResponse } from "next/server";
import { createRealtimeKitClient, type CreateWebhookRequest } from "@/lib/realtimekit";

// GET /api/webhooks - List all webhooks
export async function GET(request: NextRequest) {
  try {
    const client = createRealtimeKitClient();

    const response = await client.listWebhooks();

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error listing webhooks:", error);
    return NextResponse.json(
      { error: "Failed to list webhooks", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST /api/webhooks - Create a new webhook
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateWebhookRequest;
    const client = createRealtimeKitClient();

    // Validate required fields
    if (!body.url || !body.events || !Array.isArray(body.events) || body.events.length === 0) {
      return NextResponse.json(
        { error: "URL and events array are required" },
        { status: 400 }
      );
    }

    const response = await client.createWebhook(body);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating webhook:", error);
    return NextResponse.json(
      { error: "Failed to create webhook", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}