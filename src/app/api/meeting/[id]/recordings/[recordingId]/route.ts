import { createRealtimeKitClient } from "@/lib/realtimekit";
import { type NextRequest, NextResponse } from "next/server";

// GET /api/meeting/[id]/recordings/[recordingId] - Get recording details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; recordingId: string }> },
) {
  try {
    const { id: meetingId, recordingId } = await params;
    const client = createRealtimeKitClient();

    const response = await client.getRecording(meetingId, recordingId);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting recording:", error);
    return NextResponse.json(
      {
        error: "Failed to get recording",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/meeting/[id]/recordings/[recordingId] - Delete recording
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; recordingId: string }> },
) {
  try {
    const { id: meetingId, recordingId } = await params;
    const client = createRealtimeKitClient();

    await client.deleteRecording(meetingId, recordingId);

    return NextResponse.json({ success: true, message: "Recording deleted successfully" });
  } catch (error) {
    console.error("Error deleting recording:", error);
    return NextResponse.json(
      {
        error: "Failed to delete recording",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
