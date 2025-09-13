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
    const meetingResponse = await client.createMeeting({
      title: name || `Consultation with ${participantName}`,
      preferred_region: "us-east-1",
      record_on_start: false, // Disable recording for privacy by default
      live_stream_on_start: false,
      persist_chat: false,
      summarize_on_end: false,
    });

    if (!meetingResponse.success) {
      throw new Error("Failed to create meeting");
    }

    const meeting = meetingResponse.data;

    // Return meeting details - participant tokens would need to be created separately
    // via the RealtimeKit client-side SDK
    return NextResponse.json({
      success: true,
      meeting: {
        id: meeting.id,
        title: meeting.title,
        status: meeting.status,
        createdAt: meeting.created_at,
        preferredRegion: meeting.preferred_region,
        // Note: Join URLs are typically generated client-side with the RealtimeKit SDK
        // using the meeting ID and participant authentication
        meetingId: meeting.id,
      },
      instructions: {
        message: "Meeting created successfully. Use RealtimeKit SDK to join.",
        sdkInfo: "Initialize RealtimeKit with this meeting ID to join the call.",
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