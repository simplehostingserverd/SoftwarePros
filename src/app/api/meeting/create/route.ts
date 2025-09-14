import { NextRequest, NextResponse } from "next/server";
import { createRealtimeKitClient, type AvailablePreset } from "@/lib/realtimekit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, participantName, isHost = false, preset } = body;

    // Validate required fields
    if (!participantName) {
      return NextResponse.json(
        { error: "Participant name is required" },
        { status: 400 }
      );
    }

    const client = createRealtimeKitClient();

    // Create a new meeting
    const meetingResponse = await client.createMeeting({
      title: name || `Consultation with ${participantName}`,
      preferred_region: "us-east-1",
      record_on_start: false, // Disable recording for privacy by default
      live_stream_on_start: false,
      persist_chat: true, // Enable chat for consultations
      summarize_on_end: false,
      // Note: transcription_enabled and max_participants may not be supported by RealtimeKit API
    });

    if (!meetingResponse.success) {
      throw new Error("Failed to create meeting");
    }

    const meeting = meetingResponse.data;

    // Determine the correct preset based on the participant role
    let participantPreset: AvailablePreset;
    if (preset && (preset as AvailablePreset)) {
      participantPreset = preset as AvailablePreset;
    } else if (isHost) {
      participantPreset = "group_call_host"; // Use host preset from dashboard
    } else {
      participantPreset = "group_call_participant"; // Use participant preset from dashboard
    }

    // Create participant token for joining the meeting
    const participantToken = await client.createParticipantToken(
      meeting.id,
      participantName,
      participantPreset
    );

    // For Cloudflare RealtimeKit, joins are typically done via SDK with tokens
    // We'll create a custom join page that initializes the SDK with the token
    const joinUrl = `/join/${meeting.id}?participant=${participantToken.participantId}&token=${encodeURIComponent(participantToken.token)}`;
    const hostUrl = isHost ? `/join/${meeting.id}?host=true&participant=${participantToken.participantId}&token=${encodeURIComponent(participantToken.token)}` : joinUrl;

    return NextResponse.json({
      success: true,
      meeting: {
        id: meeting.id,
        name: meeting.title, // Widget expects 'name', not 'title'
        description: `Video consultation with ${participantName}`,
        joinUrl: joinUrl,
        hostUrl: hostUrl,
        createdAt: meeting.created_at,
        status: meeting.status,
        preferredRegion: meeting.preferred_region,
        preset: participantPreset,
      },
      participant: {
        token: participantToken.token,
        participantId: participantToken.participantId,
        expiresAt: participantToken.expiresAt,
        preset: participantPreset,
      },
    });
  } catch (error) {
    console.error("Error creating meeting:", error);

    // Handle specific RealtimeKit errors
    if (error instanceof Error) {
      // Configuration errors
      if (error.message.includes("Missing required")) {
        return NextResponse.json(
          {
            error: "RealtimeKit is not configured",
            details: "Missing Cloudflare RealtimeKit environment variables",
            instructions: "Visit /api/meeting/debug for setup instructions"
          },
          { status: 500 }
        );
      }

      // API errors
      if (error.message.includes("API error")) {
        return NextResponse.json(
          {
            error: "Failed to create meeting with Cloudflare RealtimeKit",
            details: error.message,
            instructions: "Check your API credentials and try again"
          },
          { status: 500 }
        );
      }

      // Network/connection errors
      if (error.message.includes("fetch")) {
        return NextResponse.json(
          {
            error: "Network error connecting to RealtimeKit",
            details: "Unable to reach Cloudflare RealtimeKit API",
            instructions: "Check your internet connection and API URL"
          },
          { status: 500 }
        );
      }

      // Return the actual error message for debugging
      return NextResponse.json(
        {
          error: "RealtimeKit integration error",
          details: error.message,
          instructions: "Check server logs for more details"
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        instructions: "Visit /api/meeting/debug to check configuration"
      },
      { status: 500 }
    );
  }
}