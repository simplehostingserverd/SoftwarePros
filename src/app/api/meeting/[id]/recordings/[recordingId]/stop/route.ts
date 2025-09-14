import { NextRequest, NextResponse } from "next/server";
import { createRealtimeKitClient } from "@/lib/realtimekit";

// POST /api/meeting/[id]/recordings/[recordingId]/stop - Stop recording
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; recordingId: string }> }
) {
  try {
    const { id: meetingId, recordingId } = await params;
    const client = createRealtimeKitClient();

    const response = await client.stopRecording(meetingId, recordingId);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error stopping recording:", error);
    return NextResponse.json(
      { error: "Failed to stop recording", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}