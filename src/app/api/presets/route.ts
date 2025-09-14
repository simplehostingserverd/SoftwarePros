import { NextRequest, NextResponse } from "next/server";
import { createRealtimeKitClient, type CreatePresetRequest } from "@/lib/realtimekit";

// GET /api/presets - List all presets
export async function GET(request: NextRequest) {
  try {
    const client = createRealtimeKitClient();

    const response = await client.listPresets();

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error listing presets:", error);
    return NextResponse.json(
      { error: "Failed to list presets", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST /api/presets - Create a new preset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreatePresetRequest;
    const client = createRealtimeKitClient();

    // Validate required fields
    if (!body.name || !body.permissions) {
      return NextResponse.json(
        { error: "Name and permissions are required" },
        { status: 400 }
      );
    }

    const response = await client.createPreset(body);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating preset:", error);
    return NextResponse.json(
      { error: "Failed to create preset", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}