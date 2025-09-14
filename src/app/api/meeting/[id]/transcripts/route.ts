import { NextRequest, NextResponse } from "next/server";
import { createRealtimeKitClient } from "@/lib/realtimekit";

// GET /api/meeting/[id]/transcripts - Get meeting transcripts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: meetingId } = await params;
    const client = createRealtimeKitClient();

    const response = await client.getTranscripts(meetingId);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting transcripts:", error);
    return NextResponse.json(
      { error: "Failed to get transcripts", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}