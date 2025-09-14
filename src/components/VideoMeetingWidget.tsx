"use client";

import { Close, PersonAdd, Phone, VideoCall } from "@mui/icons-material";
import { Button } from "@mui/joy";
import { useState } from "react";

interface MeetingResponse {
  success: boolean;
  meeting: {
    id: string;
    name: string;
    description?: string;
    joinUrl: string;
    hostUrl: string;
    createdAt: string;
  };
  participant: {
    token: string;
    participantId: string;
    expiresAt: string;
  };
}

interface VideoMeetingWidgetProps {
  participantName: string;
  onMeetingCreated?: (meeting: MeetingResponse) => void;
  disabled?: boolean;
}

export default function VideoMeetingWidget({
  participantName,
  onMeetingCreated,
  disabled = false,
}: VideoMeetingWidgetProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [meeting, setMeeting] = useState<MeetingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createMeeting = async () => {
    if (!participantName.trim()) {
      setError("Please provide your name first");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/meeting/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participantName: participantName.trim(),
          name: `Consultation with ${participantName.trim()}`,
          description: "Video consultation meeting with SoftwarePros team",
          isHost: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.details
          ? `${data.error}: ${data.details}`
          : data.error || "Failed to create meeting";

        throw new Error(errorMessage);
      }

      setMeeting(data);
      onMeetingCreated?.(data);
    } catch (err) {
      console.error("Error creating meeting:", err);
      setError(err instanceof Error ? err.message : "Failed to create meeting");
    } finally {
      setIsCreating(false);
    }
  };

  const joinMeeting = () => {
    if (meeting?.meeting.joinUrl) {
      window.open(meeting.meeting.joinUrl, "_blank", "width=1200,height=800");
    }
  };

  const closeMeeting = () => {
    setMeeting(null);
    setError(null);
  };

  if (meeting) {
    return (
      <div className="rounded-lg border border-success-200 bg-success-50 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-success-100 p-2">
              <VideoCall className="h-5 w-5 text-success-600" />
            </div>
            <div>
              <h3 className="font-semibold text-success-900">Meeting Ready!</h3>
              <p className="text-sm text-success-700">
                Your video consultation room has been created
              </p>
            </div>
          </div>
          <Button
            variant="plain"
            size="sm"
            onClick={closeMeeting}
            className="text-success-600 hover:bg-success-100"
          >
            <Close className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded border border-success-200 bg-white p-3">
            <div className="text-xs font-medium text-success-600 uppercase tracking-wide">
              Meeting Details
            </div>
            <div className="mt-1 text-sm text-gray-900">
              <div>
                <strong>Meeting:</strong> {meeting.meeting.name}
              </div>
              <div>
                <strong>Created:</strong> {new Date(meeting.meeting.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Participant:</strong> {participantName}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={joinMeeting}
              startDecorator={<VideoCall />}
              className="flex-1 bg-success-600 hover:bg-success-700"
            >
              Join Video Call
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigator.clipboard.writeText(meeting.meeting.joinUrl);
              }}
              className="border-success-200 text-success-700 hover:bg-success-50"
            >
              Copy Link
            </Button>
          </div>

          <div className="text-xs text-success-600 bg-success-100 rounded p-2">
            <strong>Note:</strong> We'll join the meeting shortly after you connect. The meeting
            link expires in 1 hour.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-full bg-blue-100 p-2">
          <VideoCall className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Schedule Video Consultation</h3>
          <p className="text-sm text-gray-600">Start an instant video call with our team</p>
        </div>
      </div>

      {error && (
        <div className="mb-3 rounded border border-danger-200 bg-danger-50 p-3 text-sm text-danger-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div className="rounded border border-gray-200 bg-white p-3">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Video Meeting Features
          </div>
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <VideoCall className="h-4 w-4 text-blue-500" />
              HD video and crystal-clear audio
            </li>
            <li className="flex items-center gap-2">
              <PersonAdd className="h-4 w-4 text-blue-500" />
              Instant connection - no downloads required
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-500" />
              Screen sharing for technical discussions
            </li>
          </ul>
        </div>

        <Button
          onClick={createMeeting}
          loading={isCreating}
          disabled={disabled || !participantName.trim()}
          startDecorator={<VideoCall />}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isCreating ? "Creating Meeting..." : "Start Video Consultation"}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          Powered by Cloudflare RealtimeKit - Enterprise-grade security
        </div>
      </div>
    </div>
  );
}
