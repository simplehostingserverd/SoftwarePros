interface RealtimeKitConfig {
  orgId: string;
  apiKey: string;
  apiUrl: string;
  authHeader?: string;
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
    // If we have a pre-generated auth header, use it directly
    if (this.config.authHeader) {
      return this.config.authHeader;
    }

    // Otherwise, use Basic Auth with Organization ID and API Key
    const credentials = Buffer.from(`${this.config.orgId}:${this.config.apiKey}`).toString("base64");
    return `Basic ${credentials}`;
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
      "X-Organization-ID": this.config.orgId,
    };

    console.log(`RealtimeKit API Request: ${method} ${url}`);
    console.log(`Headers:`, { ...headers, Authorization: '[REDACTED]' });
    if (body) {
      console.log(`Body:`, body);
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    console.log(`Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error response:`, errorText);
      throw new Error(
        `RealtimeKit API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const responseData = await response.json();
    console.log(`Success response:`, responseData);
    return responseData;
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

    // Try different endpoint patterns that RealtimeKit might use
    try {
      return await this.makeRequest<MeetingResponse>("/meetings", "POST", meetingData);
    } catch (error) {
      // If /meetings fails, try alternative endpoints
      try {
        return await this.makeRequest<MeetingResponse>("/rooms", "POST", meetingData);
      } catch (roomsError) {
        try {
          return await this.makeRequest<MeetingResponse>("/sessions", "POST", meetingData);
        } catch (sessionsError) {
          // If all fail, throw the original error
          throw error;
        }
      }
    }
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
  const orgId = process.env.CLOUDFLARE_REALTIME_ORG_ID;
  const apiKey = process.env.CLOUDFLARE_REALTIME_API_KEY;
  const authHeader = process.env.CLOUDFLARE_REALTIME_AUTH_HEADER;
  const apiUrl = process.env.CLOUDFLARE_REALTIME_API_URL || "https://api.realtime.cloudflare.com/v1";

  // Check if we have either the auth header OR both orgId and apiKey
  if (authHeader) {
    return new RealtimeKitClient({
      orgId: orgId || "default", // orgId still needed for X-Organization-ID header
      apiKey: "not-needed-with-auth-header",
      apiUrl,
      authHeader,
    });
  }

  if (!orgId || !apiKey) {
    throw new Error(
      "Missing required Cloudflare RealtimeKit environment variables. Need either:\n" +
      "1. CLOUDFLARE_REALTIME_AUTH_HEADER (pre-generated token), OR\n" +
      "2. Both CLOUDFLARE_REALTIME_ORG_ID and CLOUDFLARE_REALTIME_API_KEY"
    );
  }

  return new RealtimeKitClient({
    orgId,
    apiKey,
    apiUrl,
  });
}

export type { CreateMeetingRequest, MeetingResponse, ParticipantToken, RealtimeKitConfig };
export { RealtimeKitClient };