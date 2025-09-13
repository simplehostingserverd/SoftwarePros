interface RealtimeKitConfig {
  orgId: string;
  apiKey: string;
  apiUrl: string;
  authHeader?: string;
}

interface CreateMeetingRequest {
  title?: string;
  preferred_region?: "ap-south-1" | "ap-southeast-1" | "us-east-1" | "eu-central-1" | null;
  record_on_start?: boolean;
  live_stream_on_start?: boolean;
  persist_chat?: boolean;
  summarize_on_end?: boolean;
}

interface MeetingData {
  id: string;
  title: string;
  preferred_region: string | null;
  created_at: string;
  record_on_start: boolean;
  updated_at: string;
  live_stream_on_start: boolean;
  persist_chat: boolean;
  summarize_on_end: boolean;
  status: "ACTIVE" | "INACTIVE";
}

interface MeetingResponse {
  success: boolean;
  data: MeetingData;
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
      console.log("Using pre-generated auth header");
      return this.config.authHeader;
    }

    // Otherwise, use Basic Auth with Organization ID and API Key
    // Format: Basic base64(orgId:apiKey)
    const credentials = Buffer.from(`${this.config.orgId}:${this.config.apiKey}`).toString("base64");
    const authHeader = `Basic ${credentials}`;
    console.log(`Generated Basic Auth for org: ${this.config.orgId}`);
    console.log(`Auth header format: Basic [base64(${this.config.orgId}:***)]`);
    return authHeader;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
  ): Promise<T> {
    const url = `${this.config.apiUrl}${endpoint}`;
    const authHeader = this.generateAuthHeader();
    const headers: HeadersInit = {
      "Authorization": authHeader,
      "Content-Type": "application/json",
    };

    console.log(`RealtimeKit API Request: ${method} ${url}`);
    console.log(`Headers:`, { ...headers, Authorization: '[REDACTED]' });
    console.log(`Full auth header (first 20 chars): ${authHeader.substring(0, 20)}...`);
    if (body) {
      console.log(`Request body:`, JSON.stringify(body, null, 2));
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
      title: request.title || `Consultation ${new Date().toISOString()}`,
      preferred_region: request.preferred_region || "us-east-1",
      record_on_start: request.record_on_start || false,
      live_stream_on_start: request.live_stream_on_start || false,
      persist_chat: request.persist_chat || false,
      summarize_on_end: request.summarize_on_end || false,
    };

    return await this.makeRequest<MeetingResponse>("/meetings", "POST", meetingData);
  }

  async getMeeting(meetingId: string): Promise<MeetingResponse> {
    return await this.makeRequest<MeetingResponse>(`/meetings/${meetingId}`);
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

    // Try singular form first, then plural as fallback
    try {
      return await this.makeRequest<ParticipantToken>(
        `/meeting/${meetingId}/tokens`,
        "POST",
        tokenData
      );
    } catch (error) {
      return this.makeRequest<ParticipantToken>(
        `/meetings/${meetingId}/tokens`,
        "POST",
        tokenData
      );
    }
  }

  async listMeetings(): Promise<{ meetings: MeetingResponse[] }> {
    // Try singular form first, then plural as fallback
    try {
      return await this.makeRequest<{ meetings: MeetingResponse[] }>("/meeting");
    } catch (error) {
      return this.makeRequest<{ meetings: MeetingResponse[] }>("/meetings");
    }
  }
}

// Factory function to create client with environment variables
export function createRealtimeKitClient(): RealtimeKitClient {
  const orgId = process.env.CLOUDFLARE_REALTIME_ORG_ID;
  const apiKey = process.env.CLOUDFLARE_REALTIME_API_KEY;
  const authHeader = process.env.CLOUDFLARE_REALTIME_AUTH_HEADER;
  const apiUrl = process.env.CLOUDFLARE_REALTIME_API_URL || "https://api.realtime.cloudflare.com/v2";

  console.log(`RealtimeKit Config: orgId=${!!orgId}, apiKey=${!!apiKey}, authHeader=${!!authHeader}`);
  console.log(`API URL: ${apiUrl}`);

  // Prefer orgId + apiKey over authHeader for better debugging
  if (orgId && apiKey) {
    console.log("Using Organization ID + API Key authentication");
    return new RealtimeKitClient({
      orgId,
      apiKey,
      apiUrl,
    });
  }

  // Fallback to auth header if provided
  if (authHeader && orgId) {
    console.log("Using pre-generated auth header");
    return new RealtimeKitClient({
      orgId,
      apiKey: "not-needed-with-auth-header",
      apiUrl,
      authHeader,
    });
  }

  throw new Error(
    "Missing required Cloudflare RealtimeKit environment variables. Need:\n" +
    "CLOUDFLARE_REALTIME_ORG_ID and CLOUDFLARE_REALTIME_API_KEY"
  );
}

export type { CreateMeetingRequest, MeetingResponse, ParticipantToken, RealtimeKitConfig };
export { RealtimeKitClient };