import crypto from "crypto";

interface RealtimeKitConfig {
  appId: string;
  appSecret: string;
  apiUrl: string;
  orgId?: string;
}

interface CreateMeetingRequest {
  name?: string;
  description?: string;
  maxParticipants?: number;
  autoJoin?: boolean;
  recording?: boolean;
  metadata?: Record<string, any>;
}

interface MeetingResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  status: string;
  joinUrl: string;
  hostUrl: string;
  participants: Array<{
    id: string;
    name: string;
    joinedAt: string;
    status: string;
  }>;
}

interface ParticipantToken {
  token: string;
  participantId: string;
  expiresAt: string;
}

class RealtimeKitClient {
  private config: RealtimeKitConfig;

  constructor(config: RealtimeKitConfig) {
    this.config = config;
  }

  private generateAuthHeader(): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = `${this.config.appId}:${timestamp}`;
    const signature = crypto
      .createHmac("sha256", this.config.appSecret)
      .update(payload)
      .digest("hex");

    return `Bearer ${Buffer.from(`${payload}:${signature}`).toString("base64")}`;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
  ): Promise<T> {
    const url = `${this.config.apiUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Authorization": this.generateAuthHeader(),
      "Content-Type": "application/json",
      "User-Agent": "SoftwarePros-RealtimeKit/1.0",
    };

    if (this.config.orgId) {
      headers["X-Organization-ID"] = this.config.orgId;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `RealtimeKit API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  }

  async createMeeting(request: CreateMeetingRequest = {}): Promise<MeetingResponse> {
    const meetingData = {
      name: request.name || `Meeting ${new Date().toISOString()}`,
      description: request.description || "Video consultation meeting",
      maxParticipants: request.maxParticipants || 10,
      autoJoin: request.autoJoin !== false,
      recording: request.recording || false,
      metadata: request.metadata || {},
    };

    return this.makeRequest<MeetingResponse>("/meetings", "POST", meetingData);
  }

  async getMeeting(meetingId: string): Promise<MeetingResponse> {
    return this.makeRequest<MeetingResponse>(`/meetings/${meetingId}`);
  }

  async deleteMeeting(meetingId: string): Promise<void> {
    await this.makeRequest(`/meetings/${meetingId}`, "DELETE");
  }

  async createParticipantToken(
    meetingId: string,
    participantName: string,
    isHost = false
  ): Promise<ParticipantToken> {
    const tokenData = {
      meetingId,
      participantName,
      role: isHost ? "host" : "participant",
      expiresIn: 3600, // 1 hour
    };

    return this.makeRequest<ParticipantToken>(
      `/meetings/${meetingId}/tokens`,
      "POST",
      tokenData
    );
  }

  async listMeetings(): Promise<{ meetings: MeetingResponse[] }> {
    return this.makeRequest<{ meetings: MeetingResponse[] }>("/meetings");
  }
}

// Factory function to create client with environment variables
export function createRealtimeKitClient(): RealtimeKitClient {
  const appId = process.env.CLOUDFLARE_REALTIME_APP_ID;
  const appSecret = process.env.CLOUDFLARE_REALTIME_APP_SECRET;
  const apiUrl = process.env.CLOUDFLARE_REALTIME_API_URL || "https://rtc.live.cloudflare.com/v1";
  const orgId = process.env.CLOUDFLARE_REALTIME_ORG_ID;

  if (!appId || !appSecret) {
    throw new Error(
      "Missing required Cloudflare RealtimeKit environment variables: CLOUDFLARE_REALTIME_APP_ID and CLOUDFLARE_REALTIME_APP_SECRET"
    );
  }

  return new RealtimeKitClient({
    appId,
    appSecret,
    apiUrl,
    orgId,
  });
}

export type { CreateMeetingRequest, MeetingResponse, ParticipantToken, RealtimeKitConfig };
export { RealtimeKitClient };