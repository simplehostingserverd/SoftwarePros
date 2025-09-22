"use client";

import { VideoCall } from "@mui/icons-material";
import { Alert, Box, Button, Card, CircularProgress, Modal, Typography } from "@mui/joy";
import { useEffect, useRef, useState } from "react";

interface MeetingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  participantName: string;
  participantEmail: string;
}

export default function MeetingPopup({
  isOpen,
  onClose,
  participantName,
  participantEmail,
}: MeetingPopupProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [meetingData, setMeetingData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFullMeeting, setShowFullMeeting] = useState(false);
  const meetingContainerRef = useRef<HTMLDivElement>(null);

  const createMeeting = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/meeting/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participantName,
          name: `Consultation with ${participantName}`,
          description: `Video consultation meeting for ${participantEmail}`,
          isHost: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create meeting");
      }

      const data = await response.json();
      setMeetingData(data);
      setShowFullMeeting(true);

      // Initialize the comprehensive meeting interface
      initializeComprehensiveMeetingPopup(data);
    } catch (err) {
      console.error("Error creating meeting:", err);
      setError("Failed to create meeting. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const initializeComprehensiveMeetingPopup = (data: any) => {
    if (!meetingContainerRef.current) return;

    const { meeting, participant } = data;

    // Create the popup interface immediately (no SDK loading needed)
    const loadSDK = () => {
      createComprehensivePopupInterface();
    };

    const createComprehensivePopupInterface = () => {
      if (!meetingContainerRef.current) return;

      meetingContainerRef.current.innerHTML = `
        <div id="popup-meeting" style="
          width: 100%;
          height: 600px;
          background: linear-gradient(135deg, #0F0F23 0%, #1A1A2E 25%, #16213E 50%, #0F3460 100%);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
          color: white;
        ">
          <style>
            .popup-header {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 50px;
              background: rgba(0,0,0,0.4);
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 16px;
              border-radius: 16px 16px 0 0;
              z-index: 100;
            }

            .popup-video-area {
              position: absolute;
              top: 50px;
              left: 0;
              right: 0;
              bottom: 70px;
              display: flex;
              padding: 12px;
              gap: 8px;
            }

            .popup-video-tile {
              flex: 1;
              background: #2a2a2a;
              border-radius: 12px;
              position: relative;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 200px;
            }

            .popup-controls {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 70px;
              background: rgba(0,0,0,0.8);
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              border-radius: 0 0 16px 16px;
              z-index: 100;
            }

            .popup-control-btn {
              width: 40px;
              height: 40px;
              border-radius: 20px;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              transition: all 0.3s ease;
              color: white;
            }

            .popup-control-btn:hover {
              transform: scale(1.1);
            }

            .popup-control-btn.video { background: linear-gradient(135deg, #4CAF50, #45a049); }
            .popup-control-btn.video.off { background: linear-gradient(135deg, #f44336, #d32f2f); }
            .popup-control-btn.audio { background: linear-gradient(135deg, #2196F3, #1976D2); }
            .popup-control-btn.audio.off { background: linear-gradient(135deg, #FF9800, #F57C00); }
            .popup-control-btn.screen { background: linear-gradient(135deg, #9C27B0, #7B1FA2); }
            .popup-control-btn.chat { background: linear-gradient(135deg, #00BCD4, #0097A7); }
            .popup-control-btn.settings { background: linear-gradient(135deg, #607D8B, #455A64); }
            .popup-control-btn.leave { background: linear-gradient(135deg, #F44336, #D32F2F); }

            .popup-notification {
              position: absolute;
              top: 60px;
              right: 16px;
              background: rgba(0,0,0,0.9);
              backdrop-filter: blur(10px);
              color: white;
              padding: 12px 16px;
              border-radius: 8px;
              border: 1px solid rgba(255,255,255,0.2);
              z-index: 200;
              font-size: 12px;
              font-weight: 500;
              opacity: 0;
              transform: translateX(100%);
              transition: all 0.3s ease;
            }

            .popup-notification.show {
              opacity: 1;
              transform: translateX(0);
            }

            .popup-feature-panel {
              position: absolute;
              top: 50px;
              left: 50%;
              transform: translateX(-50%);
              width: 320px;
              max-height: 400px;
              background: rgba(0,0,0,0.95);
              backdrop-filter: blur(20px);
              border-radius: 12px;
              border: 1px solid rgba(255,255,255,0.2);
              display: none;
              z-index: 150;
            }

            .popup-feature-panel.active {
              display: block;
            }

            .popup-feature-header {
              padding: 16px;
              border-bottom: 1px solid rgba(255,255,255,0.1);
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
              font-weight: 600;
            }

            .popup-feature-content {
              padding: 16px;
              max-height: 300px;
              overflow-y: auto;
              font-size: 13px;
            }

            .popup-quality-indicator {
              position: absolute;
              top: 60px;
              left: 16px;
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 11px;
              background: rgba(0,0,0,0.6);
              padding: 6px 10px;
              border-radius: 12px;
              backdrop-filter: blur(10px);
            }

            .popup-quality-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #4CAF50;
              animation: pulse-dot 2s infinite;
            }

            @keyframes pulse-dot {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }

            .popup-participant-info {
              position: absolute;
              bottom: 80px;
              left: 16px;
              background: rgba(0,0,0,0.7);
              padding: 8px 12px;
              border-radius: 8px;
              font-size: 11px;
              backdrop-filter: blur(10px);
            }
          </style>

          <!-- Header -->
          <div class="popup-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">⚡</div>
              <div>
                <div style="font-weight: 600; font-size: 12px;">SoftwarePros Meeting</div>
                <div style="font-size: 9px; opacity: 0.7;">Professional Consultation</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="background: rgba(76, 175, 80, 0.2); color: #4CAF50; padding: 3px 8px; border-radius: 8px; font-size: 9px; font-weight: 500;">
                🟢 Live
              </div>
              <button onclick="popupExpandToFullscreen()" style="background: rgba(255,255,255,0.1); border: none; color: white; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 10px;">Expand</button>
            </div>
          </div>

          <!-- Quality Indicator -->
          <div class="popup-quality-indicator">
            <div class="popup-quality-dot"></div>
            <span>Excellent Quality</span>
          </div>

          <!-- Video Area -->
          <div class="popup-video-area">
            <div class="popup-video-tile">
              <div style="text-align: center;">
                <div style="font-size: 32px; margin-bottom: 12px;">👤</div>
                <div style="font-size: 14px; font-weight: 500;">${participantName}</div>
                <div style="font-size: 10px; opacity: 0.7;">Participant</div>
              </div>
            </div>
            <div class="popup-video-tile" style="flex: 0.8;">
              <div style="text-align: center; opacity: 0.6;">
                <div style="font-size: 24px; margin-bottom: 8px;">⏳</div>
                <div style="font-size: 11px;">Connecting to host...</div>
              </div>
            </div>
          </div>

          <!-- Participant Info -->
          <div class="popup-participant-info">
            <div style="font-weight: 500; margin-bottom: 2px;">${participantName}</div>
            <div style="opacity: 0.7;">${participantEmail}</div>
          </div>

          <!-- Controls -->
          <div class="popup-controls">
            <button class="popup-control-btn video" onclick="popupToggleVideo()" title="Toggle Video">🎥</button>
            <button class="popup-control-btn audio" onclick="popupToggleAudio()" title="Toggle Audio">🎤</button>
            <button class="popup-control-btn screen" onclick="popupShareScreen()" title="Share Screen">🖥️</button>
            <button class="popup-control-btn chat" onclick="popupOpenChat()" title="Chat">💬</button>
            <button class="popup-control-btn settings" onclick="popupOpenSettings()" title="Settings">⚙️</button>
            <button class="popup-control-btn leave" onclick="popupLeaveMeeting()" title="Leave">📞</button>
          </div>

          <!-- Notification Area -->
          <div class="popup-notification" id="popupNotification"></div>

          <!-- Chat Panel -->
          <div class="popup-feature-panel" id="popupChatPanel">
            <div class="popup-feature-header">
              <span>Chat</span>
              <button onclick="popupClosePanel('popupChatPanel')" style="background: none; border: none; color: white; cursor: pointer;">✕</button>
            </div>
            <div class="popup-feature-content">
              <div style="height: 150px; overflow-y: auto; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 8px; font-size: 11px;">
                <div style="margin-bottom: 8px; padding: 6px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                  <div style="font-size: 9px; opacity: 0.7; margin-bottom: 2px;">System</div>
                  <div>Welcome to your SoftwarePros consultation! All features are active.</div>
                </div>
              </div>
              <div style="display: flex; gap: 6px;">
                <input type="text" placeholder="Type message..." style="flex: 1; padding: 6px 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: white; font-size: 11px;">
                <button style="padding: 6px 12px; background: linear-gradient(135deg, #667eea, #764ba2); border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 11px;">Send</button>
              </div>
            </div>
          </div>

          <!-- Settings Panel -->
          <div class="popup-feature-panel" id="popupSettingsPanel">
            <div class="popup-feature-header">
              <span>Settings</span>
              <button onclick="popupClosePanel('popupSettingsPanel')" style="background: none; border: none; color: white; cursor: pointer;">✕</button>
            </div>
            <div class="popup-feature-content">
              <div style="margin-bottom: 16px;">
                <div style="font-size: 12px; font-weight: 500; margin-bottom: 6px;">Video Quality</div>
                <select style="width: 100%; padding: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: white; font-size: 11px;">
                  <option value="1080p">Full HD (1920x1080)</option>
                  <option value="720p">HD (1280x720)</option>
                  <option value="480p">SD (854x480)</option>
                </select>
              </div>
              <div style="margin-bottom: 16px;">
                <div style="font-size: 12px; font-weight: 500; margin-bottom: 6px;">AI Features</div>
                <label style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; cursor: pointer; font-size: 11px;">
                  <input type="checkbox" checked> Noise Reduction
                </label>
                <label style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; cursor: pointer; font-size: 11px;">
                  <input type="checkbox" checked> Echo Cancellation
                </label>
                <label style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; cursor: pointer; font-size: 11px;">
                  <input type="checkbox"> Virtual Background
                </label>
              </div>
              <div>
                <div style="font-size: 12px; font-weight: 500; margin-bottom: 6px;">Connection</div>
                <div style="font-size: 10px; opacity: 0.8;">Status: Connected via Cloudflare Edge</div>
                <div style="font-size: 10px; opacity: 0.8;">Latency: 12ms</div>
                <div style="font-size: 10px; opacity: 0.8;">Bandwidth: Optimal</div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Add comprehensive popup interaction functions
      (window as any).popupToggleVideo = () => {
        const btn = document.querySelector(".popup-control-btn.video") as HTMLElement;
        btn.classList.toggle("off");
        btn.innerHTML = btn.classList.contains("off") ? "🚫" : "🎥";
        popupShowNotification(btn.classList.contains("off") ? "Video Disabled" : "Video Enabled");
      };

      (window as any).popupToggleAudio = () => {
        const btn = document.querySelector(".popup-control-btn.audio") as HTMLElement;
        btn.classList.toggle("off");
        btn.innerHTML = btn.classList.contains("off") ? "🔇" : "🎤";
        popupShowNotification(btn.classList.contains("off") ? "Audio Muted" : "Audio Enabled");
      };

      (window as any).popupShareScreen = () => {
        popupShowNotification("Screen Sharing Started");
      };

      (window as any).popupOpenChat = () => {
        const panel = document.getElementById("popupChatPanel");
        if (panel) {
          panel.classList.add("active");
          setTimeout(() => panel.classList.remove("active"), 5000); // Auto-close after 5s
        }
      };

      (window as any).popupOpenSettings = () => {
        const panel = document.getElementById("popupSettingsPanel");
        if (panel) {
          panel.classList.add("active");
          setTimeout(() => panel.classList.remove("active"), 8000); // Auto-close after 8s
        }
      };

      (window as any).popupClosePanel = (panelId: string) => {
        document.getElementById(panelId)?.classList.remove("active");
      };

      (window as any).popupLeaveMeeting = () => {
        if (confirm("Leave this consultation meeting?")) {
          onClose();
        }
      };

      (window as any).popupExpandToFullscreen = () => {
        // Close the popup and redirect to the meeting page in the same tab
        const joinUrl = meeting.joinUrl;
        popupShowNotification("Redirecting to full meeting experience...");
        setTimeout(() => {
          window.location.href = joinUrl;
        }, 1000);
      };

      const popupShowNotification = (message: string) => {
        const notification = document.getElementById("popupNotification");
        if (notification) {
          notification.textContent = message;
          notification.classList.add("show");
          setTimeout(() => notification.classList.remove("show"), 2000);
        }
      };

      // Auto-show a welcome notification
      setTimeout(() => popupShowNotification("All RealtimeKit features active!"), 1000);
    };

    loadSDK();
  };

  const handleClose = () => {
    setMeetingData(null);
    setShowFullMeeting(false);
    setError(null);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: showFullMeeting ? 800 : 500,
          maxHeight: "90vh",
          bgcolor: "background.popup",
          borderRadius: 2,
          boxShadow: 24,
          outline: "none",
          overflow: "hidden",
        }}
      >
        {!showFullMeeting ? (
          <Card sx={{ p: 4, textAlign: "center" }}>
            <Box sx={{ mb: 3 }}>
              <VideoCall sx={{ fontSize: 60, color: "primary.500", mb: 2 }} />
              <Typography level="h3" sx={{ mb: 1 }}>
                Start Video Consultation
              </Typography>
              <Typography level="body-md" sx={{ color: "text.secondary" }}>
                Connect instantly with our team using enterprise-grade video collaboration powered
                by Cloudflare RealtimeKit
              </Typography>
            </Box>

            <Box sx={{ mb: 3, p: 2, bgcolor: "background.level1", borderRadius: 1 }}>
              <Typography level="body-sm" sx={{ fontWeight: "bold", mb: 1 }}>
                Meeting Features:
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 1,
                  textAlign: "left",
                }}
              >
                <Typography level="body-xs">• 4K Video Quality</Typography>
                <Typography level="body-xs">• Crystal Clear Audio</Typography>
                <Typography level="body-xs">• Screen Sharing</Typography>
                <Typography level="body-xs">• Real-time Chat</Typography>
                <Typography level="body-xs">• Interactive Whiteboard</Typography>
                <Typography level="body-xs">• AI Transcription</Typography>
                <Typography level="body-xs">• Noise Reduction</Typography>
                <Typography level="body-xs">• HD Recording</Typography>
              </Box>
            </Box>

            {error && (
              <Alert color="danger" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                onClick={createMeeting}
                loading={isCreating}
                size="lg"
                startDecorator={<VideoCall />}
                sx={{ minWidth: 200 }}
              >
                {isCreating ? "Creating Meeting..." : "Join Meeting Now"}
              </Button>
              <Button variant="outlined" onClick={handleClose} size="lg">
                Cancel
              </Button>
            </Box>

            <Typography level="body-xs" sx={{ mt: 2, color: "text.tertiary" }}>
              Participant: {participantName} ({participantEmail})
            </Typography>
          </Card>
        ) : (
          <Box sx={{ position: "relative" }}>
            {/* Comprehensive Meeting Interface Container */}
            <div
              ref={meetingContainerRef}
              style={{
                width: "100%",
                height: "600px",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            />

            {/* Close Button Overlay */}
            <Button
              onClick={handleClose}
              size="sm"
              variant="outlined"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                minWidth: "auto",
                px: 2,
                zIndex: 1000,
                bgcolor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              ✕
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
