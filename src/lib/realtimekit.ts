interface RealtimeKitConfig {
  orgId: string;
  apiKey: string;
  apiUrl: string;
  authHeader?: string;
}

// Meeting interfaces
interface CreateMeetingRequest {
  title?: string;
  preferred_region?: "ap-south-1" | "ap-southeast-1" | "us-east-1" | "eu-central-1" | null;
  record_on_start?: boolean;
  live_stream_on_start?: boolean;
  persist_chat?: boolean;
  summarize_on_end?: boolean;
  transcription_enabled?: boolean;
  max_participants?: number;
  webhook_url?: string;
}

interface UpdateMeetingRequest {
  title?: string;
  record_on_start?: boolean;
  live_stream_on_start?: boolean;
  persist_chat?: boolean;
  summarize_on_end?: boolean;
  transcription_enabled?: boolean;
  max_participants?: number;
  webhook_url?: string;
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
  transcription_enabled?: boolean;
  max_participants?: number;
  webhook_url?: string;
  is_large?: boolean;
  status: "ACTIVE" | "INACTIVE" | "ENDED";
}

interface MeetingResponse {
  success: boolean;
  data: MeetingData;
}

interface MeetingListResponse {
  success: boolean;
  data: MeetingData[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

// Participant interfaces
interface CreateParticipantRequest {
  name: string;
  preset_name: string;
  custom_participant_id?: string;
  client_specific_id?: string;
  metadata?: Record<string, any>;
}

interface ParticipantData {
  id: string;
  name: string;
  preset_name: string;
  custom_participant_id?: string;
  client_specific_id?: string;
  metadata?: Record<string, any>;
  token: string;
  meeting_id: string;
  created_at: string;
  expires_at: string;
  status: "ACTIVE" | "INACTIVE";
}

interface ParticipantResponse {
  success: boolean;
  data: ParticipantData;
}

interface ParticipantListResponse {
  success: boolean;
  data: ParticipantData[];
}

interface ParticipantToken {
  token: string;
  participantId: string;
  expiresAt: string;
}

// Preset interfaces
interface PresetData {
  id: string;
  name: string;
  permissions: {
    can_produce_video?: boolean;
    can_produce_audio?: boolean;
    can_produce_screenshare?: boolean;
    can_consume_video?: boolean;
    can_consume_audio?: boolean;
    can_consume_screenshare?: boolean;
    can_send_chat?: boolean;
    can_receive_chat?: boolean;
    can_control_recording?: boolean;
    can_control_livestream?: boolean;
  };
  created_at: string;
  updated_at: string;
}

interface CreatePresetRequest {
  name: string;
  permissions: PresetData["permissions"];
}

interface PresetResponse {
  success: boolean;
  data: PresetData;
}

interface PresetListResponse {
  success: boolean;
  data: PresetData[];
}

// Recording interfaces
interface RecordingData {
  id: string;
  meeting_id: string;
  status: "RECORDING" | "STOPPED" | "PROCESSING" | "READY" | "FAILED";
  download_url?: string;
  file_size?: number;
  duration?: number;
  started_at: string;
  stopped_at?: string;
  created_at: string;
  updated_at: string;
}

interface RecordingResponse {
  success: boolean;
  data: RecordingData;
}

interface RecordingListResponse {
  success: boolean;
  data: RecordingData[];
}

// Livestream interfaces
interface LivestreamData {
  id: string;
  meeting_id: string;
  rtmp_url?: string;
  stream_key?: string;
  status: "STREAMING" | "STOPPED" | "FAILED";
  viewers?: number;
  started_at: string;
  stopped_at?: string;
  created_at: string;
  updated_at: string;
}

interface CreateLivestreamRequest {
  rtmp_url: string;
  stream_key?: string;
}

interface LivestreamResponse {
  success: boolean;
  data: LivestreamData;
}

interface LivestreamListResponse {
  success: boolean;
  data: LivestreamData[];
}

// Session interfaces
interface SessionData {
  id: string;
  meeting_id: string;
  participant_id: string;
  joined_at: string;
  left_at?: string;
  duration?: number;
  connection_quality?: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  audio_stats?: Record<string, any>;
  video_stats?: Record<string, any>;
}

interface SessionResponse {
  success: boolean;
  data: SessionData;
}

interface SessionListResponse {
  success: boolean;
  data: SessionData[];
}

// Transcript interfaces
interface TranscriptData {
  id: string;
  meeting_id: string;
  participant_id?: string;
  text: string;
  timestamp: string;
  confidence?: number;
  language?: string;
}

interface TranscriptResponse {
  success: boolean;
  data: TranscriptData[];
}

// Webhook interfaces
interface WebhookData {
  id: string;
  url: string;
  events: string[];
  secret?: string;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  updated_at: string;
}

interface CreateWebhookRequest {
  url: string;
  events: string[];
  secret?: string;
}

interface WebhookResponse {
  success: boolean;
  data: WebhookData;
}

interface WebhookListResponse {
  success: boolean;
  data: WebhookData[];
}

// Analytics interfaces
interface AnalyticsData {
  meeting_id: string;
  total_participants: number;
  total_duration: number;
  peak_participants: number;
  total_messages: number;
  recording_duration?: number;
  livestream_duration?: number;
  date: string;
}

interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsData[];
}

// Available presets from your dashboard
type AvailablePreset =
  | "group_call_host"
  | "group_call_participant"
  | "livestream_host"
  | "livestream_viewer"
  | "webinar_presenter"
  | "webinar_viewer";

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
    const credentials = Buffer.from(`${this.config.orgId}:${this.config.apiKey}`).toString(
      "base64",
    );
    const authHeader = `Basic ${credentials}`;
    console.log(`Generated Basic Auth for org: ${this.config.orgId}`);
    console.log(`Auth header format: Basic [base64(${this.config.orgId}:***)]`);
    return authHeader;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any,
    queryParams?: Record<string, string | number>,
  ): Promise<T> {
    // Remove trailing slash from apiUrl and ensure endpoint starts with /
    const baseUrl = this.config.apiUrl.replace(/\/$/, "");
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    let url = `${baseUrl}${cleanEndpoint}`;

    // Add query parameters if provided
    if (queryParams) {
      const params = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
      url += `?${params.toString()}`;
    }
    const authHeader = this.generateAuthHeader();
    const headers: HeadersInit = {
      Authorization: authHeader,
      "Content-Type": "application/json",
    };

    console.log(`RealtimeKit API Request: ${method} ${url}`);
    console.log(`Headers:`, { ...headers, Authorization: "[REDACTED]" });
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
        `RealtimeKit API error: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const responseData = await response.json();
    console.log(`Success response:`, responseData);
    return responseData;
  }

  // ========== MEETINGS API ==========

  async createMeeting(request: CreateMeetingRequest = {}): Promise<MeetingResponse> {
    const meetingData: Record<string, any> = {
      title: request.title || `Consultation ${new Date().toISOString()}`,
      preferred_region: request.preferred_region || "us-east-1",
      record_on_start: request.record_on_start || false,
      live_stream_on_start: request.live_stream_on_start || false,
      persist_chat: request.persist_chat || false,
      summarize_on_end: request.summarize_on_end || false,
    };

    // Only include optional fields if they are provided
    if (request.transcription_enabled !== undefined) {
      meetingData.transcription_enabled = request.transcription_enabled;
    }
    if (request.max_participants !== undefined) {
      meetingData.max_participants = request.max_participants;
    }
    if (request.webhook_url !== undefined) {
      meetingData.webhook_url = request.webhook_url;
    }

    return await this.makeRequest<MeetingResponse>("/meetings", "POST", meetingData);
  }

  async getMeeting(meetingId: string): Promise<MeetingResponse> {
    try {
      return await this.makeRequest<MeetingResponse>(`/meetings/${meetingId}`);
    } catch (error) {
      console.log("Failed with /meetings, trying /meeting");
      return await this.makeRequest<MeetingResponse>(`/meeting/${meetingId}`);
    }
  }

  async updateMeeting(meetingId: string, request: UpdateMeetingRequest): Promise<MeetingResponse> {
    return await this.makeRequest<MeetingResponse>(`/meetings/${meetingId}`, "PUT", request);
  }

  async deleteMeeting(meetingId: string): Promise<void> {
    try {
      await this.makeRequest(`/meetings/${meetingId}`, "DELETE");
    } catch (error) {
      console.log("Failed with /meetings, trying /meeting");
      await this.makeRequest(`/meeting/${meetingId}`, "DELETE");
    }
  }

  async listMeetings(page = 1, limit = 50): Promise<MeetingListResponse> {
    return await this.makeRequest<MeetingListResponse>("/meetings", "GET", undefined, {
      page,
      limit,
    });
  }

  async endMeeting(meetingId: string): Promise<MeetingResponse> {
    return await this.makeRequest<MeetingResponse>(`/meetings/${meetingId}/end`, "POST");
  }

  // ========== PARTICIPANTS API ==========

  async createParticipant(
    meetingId: string,
    request: CreateParticipantRequest,
  ): Promise<ParticipantResponse> {
    return await this.makeRequest<ParticipantResponse>(
      `/meetings/${meetingId}/participants`,
      "POST",
      request,
    );
  }

  async createParticipantToken(
    meetingId: string,
    participantName: string,
    preset: AvailablePreset = "group_call_participant",
  ): Promise<ParticipantToken> {
    // Use the correct presets from your dashboard
    const participantData: CreateParticipantRequest = {
      name: participantName,
      preset_name: preset,
      custom_participant_id: `participant-${Date.now()}-${participantName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`,
    };

    console.log(`Creating participant for meeting ${meetingId}:`, participantData);

    try {
      // RealtimeKit Add Participant API endpoint
      const response = await this.makeRequest<ParticipantResponse>(
        `/meetings/${meetingId}/participants`,
        "POST",
        participantData,
      );

      console.log(`Participant creation response:`, response);

      // RealtimeKit returns the token in the response
      return {
        token: response.data.token,
        participantId: response.data.id,
        expiresAt: response.data.expires_at,
      };
    } catch (error) {
      console.error("RealtimeKit participant creation failed:", error);
      throw new Error(
        `Failed to create participant token: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async getParticipant(meetingId: string, participantId: string): Promise<ParticipantResponse> {
    return await this.makeRequest<ParticipantResponse>(
      `/meetings/${meetingId}/participants/${participantId}`,
    );
  }

  async listParticipants(meetingId: string): Promise<ParticipantListResponse> {
    return await this.makeRequest<ParticipantListResponse>(`/meetings/${meetingId}/participants`);
  }

  async removeParticipant(meetingId: string, participantId: string): Promise<void> {
    await this.makeRequest(`/meetings/${meetingId}/participants/${participantId}`, "DELETE");
  }

  async updateParticipant(
    meetingId: string,
    participantId: string,
    request: Partial<CreateParticipantRequest>,
  ): Promise<ParticipantResponse> {
    return await this.makeRequest<ParticipantResponse>(
      `/meetings/${meetingId}/participants/${participantId}`,
      "PUT",
      request,
    );
  }

  // ========== PRESETS API ==========

  async createPreset(request: CreatePresetRequest): Promise<PresetResponse> {
    return await this.makeRequest<PresetResponse>("/presets", "POST", request);
  }

  async getPreset(presetId: string): Promise<PresetResponse> {
    return await this.makeRequest<PresetResponse>(`/presets/${presetId}`);
  }

  async listPresets(): Promise<PresetListResponse> {
    return await this.makeRequest<PresetListResponse>("/presets");
  }

  async updatePreset(
    presetId: string,
    request: Partial<CreatePresetRequest>,
  ): Promise<PresetResponse> {
    return await this.makeRequest<PresetResponse>(`/presets/${presetId}`, "PUT", request);
  }

  async deletePreset(presetId: string): Promise<void> {
    await this.makeRequest(`/presets/${presetId}`, "DELETE");
  }

  // ========== RECORDINGS API ==========

  async startRecording(meetingId: string): Promise<RecordingResponse> {
    return await this.makeRequest<RecordingResponse>(`/meetings/${meetingId}/recordings`, "POST");
  }

  async stopRecording(meetingId: string, recordingId: string): Promise<RecordingResponse> {
    return await this.makeRequest<RecordingResponse>(
      `/meetings/${meetingId}/recordings/${recordingId}/stop`,
      "POST",
    );
  }

  async getRecording(meetingId: string, recordingId: string): Promise<RecordingResponse> {
    return await this.makeRequest<RecordingResponse>(
      `/meetings/${meetingId}/recordings/${recordingId}`,
    );
  }

  async listRecordings(meetingId: string): Promise<RecordingListResponse> {
    return await this.makeRequest<RecordingListResponse>(`/meetings/${meetingId}/recordings`);
  }

  async deleteRecording(meetingId: string, recordingId: string): Promise<void> {
    await this.makeRequest(`/meetings/${meetingId}/recordings/${recordingId}`, "DELETE");
  }

  // ========== LIVESTREAMS API ==========

  async startLivestream(
    meetingId: string,
    request: CreateLivestreamRequest,
  ): Promise<LivestreamResponse> {
    return await this.makeRequest<LivestreamResponse>(
      `/meetings/${meetingId}/livestreams`,
      "POST",
      request,
    );
  }

  async stopLivestream(meetingId: string, livestreamId: string): Promise<LivestreamResponse> {
    return await this.makeRequest<LivestreamResponse>(
      `/meetings/${meetingId}/livestreams/${livestreamId}/stop`,
      "POST",
    );
  }

  async getLivestream(meetingId: string, livestreamId: string): Promise<LivestreamResponse> {
    return await this.makeRequest<LivestreamResponse>(
      `/meetings/${meetingId}/livestreams/${livestreamId}`,
    );
  }

  async listLivestreams(meetingId: string): Promise<LivestreamListResponse> {
    return await this.makeRequest<LivestreamListResponse>(`/meetings/${meetingId}/livestreams`);
  }

  // ========== SESSIONS API ==========

  async getSession(meetingId: string, sessionId: string): Promise<SessionResponse> {
    return await this.makeRequest<SessionResponse>(`/meetings/${meetingId}/sessions/${sessionId}`);
  }

  async listSessions(meetingId: string): Promise<SessionListResponse> {
    return await this.makeRequest<SessionListResponse>(`/meetings/${meetingId}/sessions`);
  }

  // ========== TRANSCRIPTS API ==========

  async getTranscripts(meetingId: string): Promise<TranscriptResponse> {
    return await this.makeRequest<TranscriptResponse>(`/meetings/${meetingId}/transcripts`);
  }

  async getParticipantTranscripts(
    meetingId: string,
    participantId: string,
  ): Promise<TranscriptResponse> {
    return await this.makeRequest<TranscriptResponse>(
      `/meetings/${meetingId}/participants/${participantId}/transcripts`,
    );
  }

  // ========== WEBHOOKS API ==========

  async createWebhook(request: CreateWebhookRequest): Promise<WebhookResponse> {
    return await this.makeRequest<WebhookResponse>("/webhooks", "POST", request);
  }

  async getWebhook(webhookId: string): Promise<WebhookResponse> {
    return await this.makeRequest<WebhookResponse>(`/webhooks/${webhookId}`);
  }

  async listWebhooks(): Promise<WebhookListResponse> {
    return await this.makeRequest<WebhookListResponse>("/webhooks");
  }

  async updateWebhook(
    webhookId: string,
    request: Partial<CreateWebhookRequest>,
  ): Promise<WebhookResponse> {
    return await this.makeRequest<WebhookResponse>(`/webhooks/${webhookId}`, "PUT", request);
  }

  async deleteWebhook(webhookId: string): Promise<void> {
    await this.makeRequest(`/webhooks/${webhookId}`, "DELETE");
  }

  // ========== ANALYTICS API ==========

  async getAnalytics(
    startDate: string,
    endDate: string,
    meetingId?: string,
  ): Promise<AnalyticsResponse> {
    const queryParams: Record<string, string> = {
      start_date: startDate,
      end_date: endDate,
    };

    if (meetingId) {
      queryParams.meeting_id = meetingId;
    }

    return await this.makeRequest<AnalyticsResponse>("/analytics", "GET", undefined, queryParams);
  }

  async getMeetingAnalytics(meetingId: string): Promise<AnalyticsResponse> {
    return await this.makeRequest<AnalyticsResponse>(`/meetings/${meetingId}/analytics`);
  }

  // ========== UTILITY METHODS ==========

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return await this.makeRequest<{ status: string; timestamp: string }>("/health");
  }

  async getOrganizationInfo(): Promise<{
    id: string;
    name: string;
    plan: string;
    limits: Record<string, number>;
  }> {
    return await this.makeRequest<{
      id: string;
      name: string;
      plan: string;
      limits: Record<string, number>;
    }>("/organization");
  }
}

// Factory function to create client with environment variables
export function createRealtimeKitClient(): RealtimeKitClient {
  const orgId = process.env.CLOUDFLARE_REALTIME_ORG_ID;
  const apiKey = process.env.CLOUDFLARE_REALTIME_API_KEY;
  const authHeader = process.env.CLOUDFLARE_REALTIME_AUTH_HEADER;
  const apiUrl =
    process.env.CLOUDFLARE_REALTIME_API_URL || "https://api.realtime.cloudflare.com/v2";

  console.log(
    `RealtimeKit Config: orgId=${!!orgId}, apiKey=${!!apiKey}, authHeader=${!!authHeader}`,
  );
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
      "CLOUDFLARE_REALTIME_ORG_ID and CLOUDFLARE_REALTIME_API_KEY",
  );
}

export type {
  // Config and client
  RealtimeKitConfig,
  // Meeting types
  CreateMeetingRequest,
  UpdateMeetingRequest,
  MeetingData,
  MeetingResponse,
  MeetingListResponse,
  // Participant types
  CreateParticipantRequest,
  ParticipantData,
  ParticipantResponse,
  ParticipantListResponse,
  ParticipantToken,
  // Preset types
  PresetData,
  CreatePresetRequest,
  PresetResponse,
  PresetListResponse,
  AvailablePreset,
  // Recording types
  RecordingData,
  RecordingResponse,
  RecordingListResponse,
  // Livestream types
  LivestreamData,
  CreateLivestreamRequest,
  LivestreamResponse,
  LivestreamListResponse,
  // Session types
  SessionData,
  SessionResponse,
  SessionListResponse,
  // Transcript types
  TranscriptData,
  TranscriptResponse,
  // Webhook types
  WebhookData,
  CreateWebhookRequest,
  WebhookResponse,
  WebhookListResponse,
  // Analytics types
  AnalyticsData,
  AnalyticsResponse,
};

export { RealtimeKitClient };
