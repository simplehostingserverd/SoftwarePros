import { NextRequest, NextResponse } from "next/server";
import { createRealtimeKitClient } from "@/lib/realtimekit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, participantName, isHost = false } = body;

    // Validate required fields
    if (!participantName) {
      return NextResponse.json(
        { error: "Participant name is required" },
        { status: 400 }
      );
    }

    const client = createRealtimeKitClient();

    // Create a new meeting
    const meeting = await client.createMeeting({
      name: name || `Consultation with ${participantName}`,
      description: description || "Video consultation meeting",
      maxParticipants: 2, // Consultant + client
      autoJoin: true,
      recording: false, // Disable recording for privacy by default
      metadata: {
        participantName,
        createdBy: "contact-form",
        timestamp: new Date().toISOString(),
      },
    });

    // Create participant token
    const participantToken = await client.createParticipantToken(
      meeting.id,
      participantName,
      isHost
    );

    // Return meeting details and participant token
    return NextResponse.json({
      success: true,
      meeting: {
        id: meeting.id,
        name: meeting.name,
        description: meeting.description,
        joinUrl: meeting.joinUrl,
        hostUrl: meeting.hostUrl,
        createdAt: meeting.createdAt,
      },
      participant: {
        token: participantToken.token,
        participantId: participantToken.participantId,
        expiresAt: participantToken.expiresAt,
      },
    });
  } catch (error) {
    console.error("Error creating meeting:", error);

    // Handle specific RealtimeKit errors
    if (error instanceof Error) {
      if (error.message.includes("API error")) {
        return NextResponse.json(
          { error: "Failed to create meeting with Cloudflare RealtimeKit" },
          { status: 500 }
        );
      }

      if (error.message.includes("Missing required")) {
        return NextResponse.json(
          { error: "RealtimeKit is not properly configured" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}