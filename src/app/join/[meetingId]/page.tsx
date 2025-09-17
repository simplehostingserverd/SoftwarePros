"use client";

import { Box, Button, Card, CircularProgress, Typography } from "@mui/joy";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MeetingJoinPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const meetingId = params.meetingId as string;
  const participantId = searchParams.get("participant");
  const token = searchParams.get("token");
  const isHost = searchParams.get("host") === "true";

  // Apply full-screen meeting styles
  useEffect(() => {
    // Store original body styles
    const originalBodyStyle = {
      margin: document.body.style.margin,
      padding: document.body.style.padding,
      overflow: document.body.style.overflow,
    };

    // Apply meeting styles
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    // Initialize meeting
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup function to restore original styles
    return () => {
      clearTimeout(timer);
      document.body.style.margin = originalBodyStyle.margin;
      document.body.style.padding = originalBodyStyle.padding;
      document.body.style.overflow = originalBodyStyle.overflow;
    };
  }, []);

  if (!meetingId || !token || !participantId) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          p: 3,
          backgroundColor: "#000",
        }}
      >
        <Card sx={{ p: 4, textAlign: "center", maxWidth: 500 }}>
          <Typography level="h4" color="danger" gutterBottom>
            Invalid Meeting Link
          </Typography>
          <Typography sx={{ mb: 2 }}>
            This meeting link is invalid or expired. Please request a new consultation link.
          </Typography>
          <Button onClick={() => (window.location.href = "/contact")}>
            Request New Consultation
          </Button>
        </Card>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          p: 3,
          backgroundColor: "#000",
        }}
      >
        <Card sx={{ p: 4, textAlign: "center", maxWidth: 500 }}>
          <Typography level="h4" color="danger" gutterBottom>
            Meeting Error
          </Typography>
          <Typography sx={{ mb: 2 }}>{error}</Typography>
          <Button onClick={() => window.location.reload()} sx={{ mr: 2 }}>
            Try Again
          </Button>
          <Button variant="outlined" onClick={() => (window.location.href = "/contact")}>
            Request Support
          </Button>
        </Card>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "white",
        }}
      >
        <Card sx={{ p: 4, textAlign: "center", backgroundColor: "rgba(0,0,0,0.8)" }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography sx={{ color: "white" }}>
            Loading your consultation room...
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 25%, #16213E 50%, #0F3460 100%)",
        position: "relative",
        color: "white",
      }}
    >
      {/* Meeting Header */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            ⚡
          </Box>
          <Box>
            <Typography level="title-sm" sx={{ fontWeight: 600 }}>
              SoftwarePros Consultation
            </Typography>
            <Typography level="body-xs" sx={{ opacity: 0.7 }}>
              Meeting ID: {meetingId.substring(0, 8)}...
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography level="body-xs" sx={{ opacity: 0.8 }}>
            Powered by Cloudflare
          </Typography>
          <Box
            sx={{
              background: "rgba(76, 175, 80, 0.2)",
              color: "#4CAF50",
              px: 2,
              py: 0.5,
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: 500,
            }}
          >
            🟢 Connected
          </Box>
        </Box>
      </Box>

      {/* Main Video Area */}
      <Box
        sx={{
          position: "absolute",
          top: "60px",
          left: 0,
          right: "300px",
          bottom: "80px",
          background: "#1a1a1a",
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          gap: 1,
        }}
      >
        <Box
          sx={{
            flex: 2,
            minWidth: "300px",
            background: "#2a2a2a",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ fontSize: "48px" }}>👤</Box>
          <Typography level="h4">You</Typography>
          <Typography level="body-sm" sx={{ opacity: 0.7 }}>
            {isHost ? "Host" : "Participant"}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: "200px",
            background: "#2a2a2a",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
            opacity: 0.5,
          }}
        >
          <Box sx={{ fontSize: "32px" }}>⏳</Box>
          <Typography level="body-md">Waiting for others...</Typography>
        </Box>
      </Box>

      {/* Sidebar */}
      <Box
        sx={{
          position: "absolute",
          top: "60px",
          right: 0,
          width: "300px",
          bottom: "80px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          p: 2,
        }}
      >
        <Typography level="h4" sx={{ mb: 2 }}>
          Participants (1)
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            👤
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography level="body-md" sx={{ fontWeight: 500 }}>
              You {isHost ? "(Host)" : ""}
            </Typography>
            <Typography level="body-xs" sx={{ opacity: 0.7 }}>
              🎤 🎥 Joined
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Control Bar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          zIndex: 1000,
        }}
      >
        <Button
          size="lg"
          sx={{
            minWidth: 50,
            height: 50,
            borderRadius: "25px",
            background: "linear-gradient(135deg, #4CAF50, #45a049)",
          }}
          title="Toggle Video"
        >
          🎥
        </Button>
        <Button
          size="lg"
          sx={{
            minWidth: 50,
            height: 50,
            borderRadius: "25px",
            background: "linear-gradient(135deg, #2196F3, #1976D2)",
          }}
          title="Toggle Audio"
        >
          🎤
        </Button>
        <Button
          size="lg"
          sx={{
            minWidth: 50,
            height: 50,
            borderRadius: "25px",
            background: "linear-gradient(135deg, #9C27B0, #7B1FA2)",
          }}
          title="Share Screen"
        >
          🖥️
        </Button>
        <Button
          size="lg"
          sx={{
            minWidth: 50,
            height: 50,
            borderRadius: "25px",
            background: "linear-gradient(135deg, #00BCD4, #0097A7)",
          }}
          title="Chat"
        >
          💬
        </Button>
        <Box sx={{ width: "1px", height: "30px", background: "rgba(255,255,255,0.2)", mx: 1 }} />
        <Button
          size="lg"
          sx={{
            minWidth: 50,
            height: 50,
            borderRadius: "25px",
            background: "linear-gradient(135deg, #F44336, #D32F2F)",
          }}
          title="Leave Meeting"
          onClick={() => {
            if (confirm("Are you sure you want to leave this meeting?")) {
              window.location.href = "/?meeting-ended=true";
            }
          }}
        >
          📞
        </Button>
      </Box>

      {/* Info Message */}
      <Box
        sx={{
          position: "absolute",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          px: 3,
          py: 2,
          borderRadius: "8px",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <Typography level="body-sm" sx={{ opacity: 0.9 }}>
          🎉 Welcome to your SoftwarePros consultation! This is a demonstration interface.
          <br />
          Our team will contact you directly to schedule your actual meeting.
        </Typography>
      </Box>
    </Box>
  );
}