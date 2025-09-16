import { type CreateParticipantRequest, createRealtimeKitClient } from "@/lib/realtimekit";
import { type NextRequest, NextResponse } from "next/server";

// GET /api/meeting/[id]/participants - List all participants in a meeting
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: meetingId } = await params;
    const client = createRealtimeKitClient();

    const response = await client.listParticipants(meetingId);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error listing participants:", error);
    return NextResponse.json(
      {
        error: "Failed to list participants",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST /api/meeting/[id]/participants - Add a participant to a meeting
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: meetingId } = await params;
    const body = (await request.json()) as CreateParticipantRequest;
    const client = createRealtimeKitClient();

    // Validate required fields
    if (!body.name || !body.preset_name) {
      return NextResponse.json({ error: "Name and preset_name are required" }, { status: 400 });
    }

    // Add custom_participant_id if not provided
    if (!body.custom_participant_id) {
      body.custom_participant_id = `participant-${Date.now()}-${body.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`;
    }

    const response = await client.createParticipant(meetingId, body);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error adding participant:", error);
    return NextResponse.json(
      {
        error: "Failed to add participant",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
