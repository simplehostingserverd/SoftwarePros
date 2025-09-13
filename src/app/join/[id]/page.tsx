"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@mui/joy";
import { VideoCall, CallEnd, Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";

export default function JoinMeetingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const meetingId = params?.id as string;
  const participantId = searchParams?.get("participant");
  const token = searchParams?.get("token");
  const isHost = searchParams?.get("host") === "true";

  useEffect(() => {
    if (!meetingId || !participantId || !token) {
      setError("Invalid meeting link. Missing required parameters.");
      return;
    }

    // Initialize RealtimeKit SDK when it becomes available
    // For now, we'll show a placeholder interface
    console.log("Meeting details:", { meetingId, participantId, token: token.substring(0, 20) + "..." });
  }, [meetingId, participantId, token]);

  const connectToMeeting = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // This is where you would initialize the Cloudflare RealtimeKit SDK
      // For now, we'll simulate the connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
    } catch (err) {
      setError("Failed to connect to the meeting. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectFromMeeting = () => {
    setIsConnected(false);
    window.close(); // Close the meeting window
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Implementation would control actual mic state via RealtimeKit SDK
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // Implementation would control actual video state via RealtimeKit SDK
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-600 mb-4">
            <VideoCall className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Unable to Join Meeting
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.close()}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Close Window
          </Button>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-blue-600 mb-4">
            <VideoCall className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to Join Meeting
          </h1>
          <p className="text-gray-600 mb-6">
            Meeting ID: {meetingId}
            {isHost && <span className="block text-blue-600 font-medium">You are the host</span>}
          </p>
          <Button
            onClick={connectToMeeting}
            loading={isConnecting}
            startDecorator={<VideoCall />}
            className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
          >
            {isConnecting ? "Connecting..." : "Join Meeting"}
          </Button>
          <div className="text-xs text-gray-500">
            Powered by Cloudflare RealtimeKit
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Video area */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted={isMuted}
        />

        {/* Video overlay info */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded">
          Meeting: {meetingId} {isHost && "(Host)"}
        </div>

        {/* Muted indicator */}
        {isMuted && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-2 rounded">
            Muted
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-900 p-4 flex justify-center space-x-4">
        <Button
          onClick={toggleMute}
          variant={isMuted ? "solid" : "outlined"}
          color={isMuted ? "danger" : "neutral"}
          className="rounded-full p-3"
        >
          {isMuted ? <MicOff /> : <Mic />}
        </Button>

        <Button
          onClick={toggleVideo}
          variant={isVideoOff ? "solid" : "outlined"}
          color={isVideoOff ? "danger" : "neutral"}
          className="rounded-full p-3"
        >
          {isVideoOff ? <VideocamOff /> : <Videocam />}
        </Button>

        <Button
          onClick={disconnectFromMeeting}
          color="danger"
          className="rounded-full p-3 bg-red-600 hover:bg-red-700"
        >
          <CallEnd />
        </Button>
      </div>
    </div>
  );
}