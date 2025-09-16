import { createRealtimeKitClient } from "@/lib/realtimekit";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: meetingId } = await params;

    if (!meetingId) {
      return NextResponse.json({ error: "Meeting ID is required" }, { status: 400 });
    }

    const client = createRealtimeKitClient();
    const meeting = await client.getMeeting(meetingId);

    return NextResponse.json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.error("Error fetching meeting:", error);

    if (error instanceof Error && error.message.includes("404")) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to fetch meeting details" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: meetingId } = await params;

    if (!meetingId) {
      return NextResponse.json({ error: "Meeting ID is required" }, { status: 400 });
    }

    const client = createRealtimeKitClient();
    await client.deleteMeeting(meetingId);

    return NextResponse.json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting meeting:", error);

    if (error instanceof Error && error.message.includes("404")) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete meeting" }, { status: 500 });
  }
}
