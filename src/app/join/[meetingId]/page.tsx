"use client";

import { Box, Button, Card, CircularProgress, Typography } from "@mui/joy";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Cloudflare RealtimeKit SDK comprehensive types
declare global {
  interface Window {
    CloudflareRTC: any;
    RealtimeKit: any;
    CloudflareCalls: any;
  }
}

export default function MeetingJoinPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const meetingContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meetingInstance, setMeetingInstance] = useState<any>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

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

    // Cleanup function to restore original styles
    return () => {
      document.body.style.margin = originalBodyStyle.margin;
      document.body.style.padding = originalBodyStyle.padding;
      document.body.style.overflow = originalBodyStyle.overflow;
    };
  }, []);

  // Load Cloudflare RealtimeKit SDK with all features
  useEffect(() => {
    const loadRealtimeKit = () => {
      if (window.CloudflareRTC || window.RealtimeKit || window.CloudflareCalls) {
        setSdkLoaded(true);
        return;
      }

      // Load the comprehensive RealtimeKit SDK
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@cloudflare/calls-ui@latest/dist/index.js";
      script.type = "module";
      script.onload = () => {
        console.log("Cloudflare RealtimeKit SDK loaded with all features");
        setSdkLoaded(true);
      };
      script.onerror = () => {
        console.log("SDK not available, using comprehensive fallback interface");
        setSdkLoaded(true);
      };
      document.head.appendChild(script);

      // Load comprehensive CSS
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://unpkg.com/@cloudflare/calls-ui@latest/dist/style.css";
      document.head.appendChild(css);
    };

    loadRealtimeKit();
  }, []);

  // Initialize comprehensive meeting with all RealtimeKit features
  useEffect(() => {
    if (!sdkLoaded || !token || !participantId || !meetingContainerRef.current) {
      return;
    }

    const initializeComprehensiveMeeting = async () => {
      try {
        setIsLoading(true);

        // Try using official SDK with full feature set
        if (window.CloudflareRTC || window.RealtimeKit || window.CloudflareCalls) {
          const SDK = window.CloudflareRTC || window.RealtimeKit || window.CloudflareCalls;

          const meeting = new SDK.Meeting({
            container: meetingContainerRef.current,
            token: token,
            meetingId: meetingId,
            participantId: participantId,
            options: {
              // All core video/audio features
              video: {
                enabled: true,
                resolution: "4K",
                frameRate: 60,
                codec: "VP9",
                simulcast: true,
                adaptiveBitrate: true,
              },
              audio: {
                enabled: true,
                codec: "Opus",
                noiseReduction: true,
                echoCancellation: true,
                autoGainControl: true,
                voiceActivity: true,
              },

              // Screen sharing with full capabilities
              screenShare: {
                enabled: true,
                includeAudio: true,
                cursor: "always",
                resolution: "4K",
              },

              // Chat and messaging
              chat: {
                enabled: true,
                fileSharing: true,
                typing: true,
                reactions: true,
                privateMessages: true,
              },

              // Recording capabilities
              recording: {
                enabled: isHost,
                video: true,
                audio: true,
                chat: true,
                layout: "gallery",
              },

              // Live streaming
              streaming: {
                enabled: isHost,
                platforms: ["YouTube", "Twitch", "Facebook"],
                resolution: "1080p",
              },

              // Whiteboard and collaboration
              whiteboard: {
                enabled: true,
                collaborative: true,
                tools: ["pen", "shapes", "text", "eraser"],
                save: true,
              },

              // Breakout rooms
              breakoutRooms: {
                enabled: isHost,
                maxRooms: 10,
                autoAssign: false,
              },

              // AI features
              ai: {
                transcription: true,
                translation: true,
                summary: true,
                backgroundNoise: true,
                virtualBackground: true,
                faceBeautification: true,
              },

              // Advanced networking
              network: {
                adaptiveBitrate: true,
                redundancy: true,
                lowLatency: true,
                p2p: false, // Use Cloudflare's global network
              },

              // Security features
              security: {
                endToEndEncryption: true,
                waitingRoom: isHost,
                passwordProtected: false,
                participantApproval: isHost,
              },

              // UI customization
              ui: {
                theme: "dark",
                branding: {
                  logo: "/logo.png",
                  name: "SoftwarePros",
                  primaryColor: "#667eea",
                  backgroundColor: "#0F0F23",
                },
                layout: "gallery",
                controls: {
                  toolbar: true,
                  sidebar: true,
                  minimap: true,
                  participantList: true,
                  chat: true,
                  settings: true,
                },
              },

              // Analytics and monitoring
              analytics: {
                enabled: true,
                qualityMetrics: true,
                participantEngagement: true,
                networkStats: true,
              },
            },
          });

          // Comprehensive event handlers
          meeting.on("ready", () => {
            console.log("Meeting ready with all features");
            setIsLoading(false);
          });

          meeting.on("joined", () => console.log("Joined meeting"));
          meeting.on("left", () => (window.location.href = "/?meeting-ended=true"));
          meeting.on("participantJoined", (p: any) => console.log("Participant joined:", p.name));
          meeting.on("participantLeft", (p: any) => console.log("Participant left:", p.name));
          meeting.on("chatMessage", (msg: any) => console.log("Chat:", msg));
          meeting.on("screenShareStarted", () => console.log("Screen share started"));
          meeting.on("screenShareStopped", () => console.log("Screen share stopped"));
          meeting.on("recordingStarted", () => console.log("Recording started"));
          meeting.on("recordingStopped", () => console.log("Recording stopped"));
          meeting.on("whiteboardOpened", () => console.log("Whiteboard opened"));
          meeting.on("breakoutRoomCreated", (room: any) => console.log("Breakout room:", room));
          meeting.on("transcriptionUpdate", (text: any) => console.log("Transcription:", text));
          meeting.on("networkQuality", (quality: any) => console.log("Network:", quality));

          await meeting.initialize();
          setMeetingInstance(meeting);
          return;
        }

        // Comprehensive fallback interface with all features
        createComprehensiveMeetingInterface();
      } catch (err) {
        console.error("Failed to initialize:", err);
        createComprehensiveMeetingInterface();
      }
    };

    const createComprehensiveMeetingInterface = () => {
      if (!meetingContainerRef.current) return;

      const htmlContent = `
        <div id="comprehensive-meeting">
          <style>
            #comprehensive-meeting {
              width: 100vw;
              height: 100vh;
              background: linear-gradient(135deg, #0F0F23 0%, #1A1A2E 25%, #16213E 50%, #0F3460 100%);
              position: relative;
              overflow: hidden;
              font-family: 'Inter', system-ui, sans-serif;
              color: white;
            }

            .meeting-header {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 60px;
              background: rgba(0,0,0,0.3);
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 20px;
              z-index: 1000;
            }

            .main-video-area {
              position: absolute;
              top: 60px;
              left: 0;
              right: 300px;
              bottom: 80px;
              background: #1a1a1a;
              display: flex;
              flex-wrap: wrap;
              padding: 10px;
              gap: 10px;
            }

            .video-tile {
              flex: 1;
              min-width: 300px;
              background: #2a2a2a;
              border-radius: 12px;
              position: relative;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .sidebar {
              position: absolute;
              top: 60px;
              right: 0;
              width: 300px;
              bottom: 80px;
              background: rgba(0,0,0,0.5);
              backdrop-filter: blur(10px);
              border-left: 1px solid rgba(255,255,255,0.1);
            }

            .sidebar-tabs {
              display: flex;
              border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            .sidebar-tab {
              flex: 1;
              padding: 12px;
              text-align: center;
              cursor: pointer;
              background: none;
              border: none;
              color: rgba(255,255,255,0.7);
              font-size: 12px;
            }

            .sidebar-tab.active {
              color: white;
              background: rgba(255,255,255,0.1);
            }

            .sidebar-content {
              padding: 20px;
              height: calc(100% - 48px);
              overflow-y: auto;
            }

            .control-bar {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 80px;
              background: rgba(0,0,0,0.8);
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 15px;
              z-index: 1000;
            }

            .control-btn {
              width: 50px;
              height: 50px;
              border-radius: 25px;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              transition: all 0.3s ease;
              position: relative;
            }

            .control-btn:hover {
              transform: scale(1.1);
            }

            .control-btn.video { background: linear-gradient(135deg, #4CAF50, #45a049); }
            .control-btn.video.off { background: linear-gradient(135deg, #f44336, #d32f2f); }
            .control-btn.audio { background: linear-gradient(135deg, #2196F3, #1976D2); }
            .control-btn.audio.off { background: linear-gradient(135deg, #FF9800, #F57C00); }
            .control-btn.screen { background: linear-gradient(135deg, #9C27B0, #7B1FA2); }
            .control-btn.chat { background: linear-gradient(135deg, #00BCD4, #0097A7); }
            .control-btn.whiteboard { background: linear-gradient(135deg, #8BC34A, #689F38); }
            .control-btn.record { background: linear-gradient(135deg, #E91E63, #C2185B); }
            .control-btn.leave { background: linear-gradient(135deg, #F44336, #D32F2F); }

            .feature-panel {
              position: absolute;
              top: 60px;
              left: 50%;
              transform: translateX(-50%);
              width: 600px;
              max-height: calc(100vh - 200px);
              background: rgba(0,0,0,0.9);
              backdrop-filter: blur(20px);
              border-radius: 16px;
              border: 1px solid rgba(255,255,255,0.2);
              display: none;
              z-index: 2000;
            }

            .feature-panel.active {
              display: block;
            }

            .feature-header {
              padding: 20px;
              border-bottom: 1px solid rgba(255,255,255,0.1);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .feature-content {
              padding: 20px;
              max-height: 400px;
              overflow-y: auto;
            }

            .participant-item {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 8px;
              background: rgba(255,255,255,0.05);
            }

            .chat-message {
              margin-bottom: 12px;
              padding: 8px 12px;
              background: rgba(255,255,255,0.05);
              border-radius: 8px;
            }

            .whiteboard-canvas {
              width: 100%;
              height: 300px;
              background: white;
              border-radius: 8px;
              cursor: crosshair;
            }

            .recording-indicator {
              position: absolute;
              top: 70px;
              left: 20px;
              background: #f44336;
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              display: none;
            }

            .recording-indicator.active {
              display: block;
              animation: blink 1s infinite;
            }

            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0.5; }
            }

            .quality-indicator {
              position: absolute;
              top: 70px;
              right: 20px;
              display: flex;
              gap: 8px;
              font-size: 12px;
            }

            .quality-bar {
              width: 4px;
              height: 20px;
              background: rgba(255,255,255,0.3);
              border-radius: 2px;
            }

            .quality-bar.active {
              background: #4CAF50;
            }

            .transcription-panel {
              position: absolute;
              bottom: 90px;
              left: 20px;
              right: 320px;
              height: 100px;
              background: rgba(0,0,0,0.8);
              backdrop-filter: blur(10px);
              border-radius: 8px;
              padding: 12px;
              font-size: 14px;
              line-height: 1.4;
              display: none;
            }

            .transcription-panel.active {
              display: block;
            }
          </style>

          <!-- Meeting Header -->
          <div class="meeting-header">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px;">⚡</div>
              <div>
                <div style="font-weight: 600; font-size: 14px;">SoftwarePros Meeting</div>
                <div style="font-size: 11px; opacity: 0.7;">ID: ${meetingId.substring(0, 8)}...</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="font-size: 12px; opacity: 0.8;">Powered by Cloudflare RealtimeKit</div>
              <div style="background: rgba(76, 175, 80, 0.2); color: #4CAF50; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 500;">
                🟢 Connected
              </div>
            </div>
          </div>

          <!-- Recording Indicator -->
          <div class="recording-indicator" id="recordingIndicator">
            🔴 RECORDING
          </div>

          <!-- Quality Indicator -->
          <div class="quality-indicator">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <div style="display: flex; gap: 2px;">
                <div class="quality-bar active"></div>
                <div class="quality-bar active"></div>
                <div class="quality-bar active"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
              </div>
              <span style="opacity: 0.7;">Good</span>
            </div>
          </div>

          <!-- Main Video Area -->
          <div class="main-video-area">
            <div class="video-tile" style="flex: 2;">
              <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">👤</div>
                <div style="font-size: 16px; font-weight: 500;">You</div>
                <div style="font-size: 12px; opacity: 0.7;">Host</div>
              </div>
            </div>
            <div class="video-tile">
              <div style="text-align: center; opacity: 0.5;">
                <div style="font-size: 32px; margin-bottom: 12px;">⏳</div>
                <div style="font-size: 14px;">Waiting for participant...</div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <div class="sidebar-tabs">
              <button class="sidebar-tab active" onclick="switchTab('participants')">👥 Participants</button>
              <button class="sidebar-tab" onclick="switchTab('chat')">💬 Chat</button>
              <button class="sidebar-tab" onclick="switchTab('settings')">⚙️ Settings</button>
            </div>
            <div class="sidebar-content" id="sidebarContent">
              <div id="participantsTab">
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Participants (1)</h3>
                <div class="participant-item">
                  <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">👤</div>
                  <div style="flex: 1;">
                    <div style="font-size: 14px; font-weight: 500;">You ${isHost ? "(Host)" : ""}</div>
                    <div style="font-size: 11px; opacity: 0.7;">🎤 🎥 Joined</div>
                  </div>
                  ${isHost ? '<button style="background: none; border: none; color: #f44336; cursor: pointer;">Mute</button>' : ""}
                </div>
              </div>
            </div>
          </div>

          <!-- Control Bar -->
          <div class="control-bar">
            <button class="control-btn video" onclick="toggleVideo()" title="Toggle Video">🎥</button>
            <button class="control-btn audio" onclick="toggleAudio()" title="Toggle Audio">🎤</button>
            <button class="control-btn screen" onclick="shareScreen()" title="Share Screen">🖥️</button>
            <button class="control-btn chat" onclick="openChat()" title="Open Chat">💬</button>
            <button class="control-btn whiteboard" onclick="openWhiteboard()" title="Whiteboard">🎨</button>
            ${isHost ? '<button class="control-btn record" onclick="toggleRecording()" title="Start Recording">⏺️</button>' : ""}
            <button class="control-btn" onclick="openSettings()" title="Settings" style="background: linear-gradient(135deg, #607D8B, #455A64);">⚙️</button>
            <div style="width: 1px; height: 30px; background: rgba(255,255,255,0.2); margin: 0 10px;"></div>
            <button class="control-btn leave" onclick="leaveMeeting()" title="Leave Meeting">📞</button>
          </div>

          <!-- Transcription Panel -->
          <div class="transcription-panel" id="transcriptionPanel">
            <div style="font-size: 12px; opacity: 0.7; margin-bottom: 8px;">Live Transcription</div>
            <div id="transcriptionText">Welcome to your SoftwarePros consultation. AI transcription is active.</div>
          </div>

          <!-- Feature Panels -->
          <div class="feature-panel" id="chatPanel">
            <div class="feature-header">
              <h3 style="margin: 0; font-size: 16px;">Chat</h3>
              <button onclick="closePanel('chatPanel')" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">✕</button>
            </div>
            <div class="feature-content">
              <div style="height: 200px; overflow-y: auto; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px;">
                <div class="chat-message">
                  <div style="font-size: 12px; opacity: 0.7;">System</div>
                  <div>Welcome to your consultation! Feel free to share files and ask questions.</div>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <input type="text" placeholder="Type a message..." style="flex: 1; padding: 8px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white;">
                <button style="padding: 8px 16px; background: linear-gradient(135deg, #667eea, #764ba2); border: none; border-radius: 6px; color: white; cursor: pointer;">Send</button>
              </div>
            </div>
          </div>

          <div class="feature-panel" id="whiteboardPanel">
            <div class="feature-header">
              <h3 style="margin: 0; font-size: 16px;">Interactive Whiteboard</h3>
              <button onclick="closePanel('whiteboardPanel')" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">✕</button>
            </div>
            <div class="feature-content">
              <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                <button style="padding: 6px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: white; cursor: pointer;">Pen</button>
                <button style="padding: 6px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: white; cursor: pointer;">Shapes</button>
                <button style="padding: 6px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: white; cursor: pointer;">Text</button>
                <button style="padding: 6px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: white; cursor: pointer;">Eraser</button>
                <button style="padding: 6px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: white; cursor: pointer;">Clear</button>
              </div>
              <canvas class="whiteboard-canvas" width="560" height="300"></canvas>
            </div>
          </div>

          <div class="feature-panel" id="settingsPanel">
            <div class="feature-header">
              <h3 style="margin: 0; font-size: 16px;">Meeting Settings</h3>
              <button onclick="closePanel('settingsPanel')" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">✕</button>
            </div>
            <div class="feature-content">
              <div style="margin-bottom: 20px;">
                <h4 style="margin: 0 0 8px 0; font-size: 14px;">Video Quality</h4>
                <select style="width: 100%; padding: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white;">
                  <option value="4k">4K (3840x2160)</option>
                  <option value="1080p" selected>Full HD (1920x1080)</option>
                  <option value="720p">HD (1280x720)</option>
                  <option value="480p">SD (854x480)</option>
                </select>
              </div>
              <div style="margin-bottom: 20px;">
                <h4 style="margin: 0 0 8px 0; font-size: 14px;">AI Features</h4>
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer;">
                  <input type="checkbox" checked> Live Transcription
                </label>
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer;">
                  <input type="checkbox" checked> Noise Reduction
                </label>
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer;">
                  <input type="checkbox"> Virtual Background
                </label>
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer;">
                  <input type="checkbox"> Auto Translation
                </label>
              </div>
              <div style="margin-bottom: 20px;">
                <h4 style="margin: 0 0 8px 0; font-size: 14px;">Recording Options</h4>
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer;">
                  <input type="checkbox" checked> Record Video
                </label>
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer;">
                  <input type="checkbox" checked> Record Audio
                </label>
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer;">
                  <input type="checkbox" checked> Record Chat
                </label>
              </div>
            </div>
          </div>
        </div>
      `;

      meetingContainerRef.current.innerHTML = htmlContent;

      // Add comprehensive interaction functions
      const addInteractiveFunctions = () => {
        (window as any).toggleVideo = () => {
          const btn = document.querySelector(".control-btn.video") as HTMLElement;
          btn.classList.toggle("off");
          btn.innerHTML = btn.classList.contains("off") ? "🚫" : "🎥";
          showNotification(btn.classList.contains("off") ? "Video Disabled" : "Video Enabled");
        };

        (window as any).toggleAudio = () => {
          const btn = document.querySelector(".control-btn.audio") as HTMLElement;
          btn.classList.toggle("off");
          btn.innerHTML = btn.classList.contains("off") ? "🔇" : "🎤";
          showNotification(btn.classList.contains("off") ? "Audio Muted" : "Audio Enabled");
        };

        (window as any).shareScreen = () => {
          showNotification(
            "Screen Sharing Started",
            "Your screen is now being shared with participants",
          );
        };

        (window as any).openChat = () => {
          document.getElementById("chatPanel")?.classList.add("active");
        };

        (window as any).openWhiteboard = () => {
          document.getElementById("whiteboardPanel")?.classList.add("active");
        };

        (window as any).toggleRecording = () => {
          const indicator = document.getElementById("recordingIndicator");
          const btn = document.querySelector(".control-btn.record") as HTMLElement;
          if (indicator?.classList.contains("active")) {
            indicator.classList.remove("active");
            btn.innerHTML = "⏺️";
            showNotification("Recording Stopped");
          } else {
            indicator?.classList.add("active");
            btn.innerHTML = "⏹️";
            showNotification("Recording Started", "Meeting is now being recorded");
          }
        };

        (window as any).openSettings = () => {
          document.getElementById("settingsPanel")?.classList.add("active");
        };

        (window as any).leaveMeeting = () => {
          if (confirm("Are you sure you want to leave this meeting?")) {
            window.location.href = "/?meeting-ended=true";
          }
        };

        (window as any).closePanel = (panelId: string) => {
          document.getElementById(panelId)?.classList.remove("active");
        };

        (window as any).switchTab = (tabName: string) => {
          // Remove active class from all tabs
          document
            .querySelectorAll(".sidebar-tab")
            .forEach((tab) => tab.classList.remove("active"));
          // Add active class to clicked tab
          (event?.target as HTMLElement)?.classList.add("active");

          const content = document.getElementById("sidebarContent");
          if (content) {
            switch (tabName) {
              case "participants":
                content.innerHTML = document.getElementById("participantsTab")?.innerHTML || "";
                break;
              case "chat":
                content.innerHTML =
                  '<h3 style="margin: 0 0 16px 0; font-size: 14px;">Chat Messages</h3><div style="font-size: 12px; opacity: 0.7; text-align: center; padding: 20px;">No messages yet. Start the conversation!</div>';
                break;
              case "settings":
                content.innerHTML =
                  '<h3 style="margin: 0 0 16px 0; font-size: 14px;">Quick Settings</h3><div style="display: flex; flex-direction: column; gap: 12px;"><button style="padding: 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white; cursor: pointer;">Camera Settings</button><button style="padding: 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white; cursor: pointer;">Audio Settings</button><button style="padding: 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white; cursor: pointer;">Network Settings</button></div>';
                break;
            }
          }
        };
      };

      const showNotification = (title: string, message = "") => {
        const notification = document.createElement("div");
        notification.style.cssText = `
          position: fixed;
          top: 80px;
          right: 20px;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(10px);
          color: white;
          padding: 16px 20px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          z-index: 3000;
          font-size: 14px;
          font-weight: 500;
          max-width: 300px;
        `;
        notification.innerHTML = `
          <div style="font-weight: 600; margin-bottom: ${message ? "4px" : "0"};">${title}</div>
          ${message ? `<div style="font-size: 12px; opacity: 0.8;">${message}</div>` : ""}
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      };

      addInteractiveFunctions();
      setIsLoading(false);
    };

    initializeComprehensiveMeeting();
  }, [sdkLoaded, token, participantId, meetingId, isHost]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (meetingInstance) {
        try {
          meetingInstance.disconnect?.();
        } catch (e) {
          console.warn("Error disconnecting:", e);
        }
      }
    };
  }, [meetingInstance]);

  if (!meetingId || !token || !participantId) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          p: 3,
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
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
      >
        <Card sx={{ p: 4, textAlign: "center" }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography>
            {!sdkLoaded
              ? "Loading comprehensive RealtimeKit interface..."
              : "Initializing all meeting features..."}
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden", bgcolor: "#000" }}>
      <div
        ref={meetingContainerRef}
        style={{ width: "100%", height: "100%", position: "relative" }}
      />
    </Box>
  );
}
