import { createRealtimeKitClient } from "@/lib/realtimekit";
import { type NextRequest, NextResponse } from "next/server";

// GET /api/meeting/[id]/recordings - List all recordings for a meeting
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: meetingId } = await params;
    const client = createRealtimeKitClient();

    const response = await client.listRecordings(meetingId);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error listing recordings:", error);
    return NextResponse.json(
      {
        error: "Failed to list recordings",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST /api/meeting/[id]/recordings - Start recording a meeting
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: meetingId } = await params;
    const client = createRealtimeKitClient();

    const response = await client.startRecording(meetingId);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error starting recording:", error);
    return NextResponse.json(
      {
        error: "Failed to start recording",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
