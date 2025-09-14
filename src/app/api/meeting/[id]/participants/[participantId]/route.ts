import { NextRequest, NextResponse } from "next/server";
import { createRealtimeKitClient, type CreateParticipantRequest } from "@/lib/realtimekit";

// GET /api/meeting/[id]/participants/[participantId] - Get participant details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; participantId: string }> }
) {
  try {
    const { id: meetingId, participantId } = await params;
    const client = createRealtimeKitClient();

    const response = await client.getParticipant(meetingId, participantId);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting participant:", error);
    return NextResponse.json(
      { error: "Failed to get participant", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// PUT /api/meeting/[id]/participants/[participantId] - Update participant
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; participantId: string }> }
) {
  try {
    const { id: meetingId, participantId } = await params;
    const body = await request.json() as Partial<CreateParticipantRequest>;
    const client = createRealtimeKitClient();

    const response = await client.updateParticipant(meetingId, participantId, body);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating participant:", error);
    return NextResponse.json(
      { error: "Failed to update participant", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// DELETE /api/meeting/[id]/participants/[participantId] - Remove participant
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; participantId: string }> }
) {
  try {
    const { id: meetingId, participantId } = await params;
    const client = createRealtimeKitClient();

    await client.removeParticipant(meetingId, participantId);

    return NextResponse.json({ success: true, message: "Participant removed successfully" });
  } catch (error) {
    console.error("Error removing participant:", error);
    return NextResponse.json(
      { error: "Failed to remove participant", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}