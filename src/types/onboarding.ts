// B2B Onboarding System Types

export interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  industry?: string;
  companySize?: "startup" | "small" | "medium" | "enterprise";
  projectType?: "web" | "mobile" | "healthcare" | "consulting" | "custom";
  status: "lead" | "onboarding" | "active" | "completed" | "paused";
  createdAt: string;
  updatedAt: string;
  kickoffDate?: string;
  expectedLaunchDate?: string;
  budget?: number;
  notes?: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description: string;
  scope: string[];
  deliverables: Deliverable[];
  milestones: Milestone[];
  timeline: ProjectTimeline;
  status: "planning" | "in_progress" | "review" | "completed" | "on_hold";
  budget: number;
  assignedTeam: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  type: "design" | "development" | "content" | "review" | "deployment";
  status: "pending" | "in_progress" | "review" | "approved" | "delivered";
  dueDate: string;
  completedDate?: string;
  assignee?: string;
  files?: DeliverableFile[];
  feedback?: ClientFeedback[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: "upcoming" | "current" | "completed" | "delayed";
  deliverables: string[]; // deliverable IDs
  paymentAmount?: number;
  paymentStatus?: "pending" | "paid" | "overdue";
}

export interface ProjectTimeline {
  startDate: string;
  endDate: string;
  phases: ProjectPhase[];
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "current" | "completed";
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  dependencies?: string[]; // task IDs
  estimatedHours?: number;
  actualHours?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  skills: string[];
}

export interface OnboardingStep {
  id: string;
  clientId: string;
  step: "welcome" | "access_setup" | "training" | "communication" | "project_start";
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "skipped";
  dueDate?: string;
  completedDate?: string;
  assignee?: string;
  requirements?: string[];
  resources?: OnboardingResource[];
}

export interface OnboardingResource {
  id: string;
  title: string;
  type: "document" | "video" | "template" | "link" | "form";
  url?: string;
  content?: string;
  description?: string;
  required: boolean;
}

export interface ClientAccess {
  id: string;
  clientId: string;
  type: "domain" | "hosting" | "cms" | "analytics" | "email" | "third_party";
  serviceName: string;
  status: "pending" | "received" | "configured";
  notes?: string;
  credentials?: {
    username?: string;
    url?: string;
    apiKey?: string;
    notes?: string;
  };
}

export interface Communication {
  id: string;
  clientId: string;
  type: "check_in" | "feedback" | "milestone" | "issue" | "general";
  scheduledDate: string;
  completedDate?: string;
  method: "email" | "call" | "meeting" | "slack";
  status: "scheduled" | "completed" | "missed" | "rescheduled";
  notes?: string;
  attendees?: string[];
}

export interface ClientFeedback {
  id: string;
  clientId: string;
  projectId?: string;
  deliverableId?: string;
  type: "general" | "deliverable" | "process" | "concern";
  content: string;
  rating?: number; // 1-5 scale
  status: "new" | "acknowledged" | "addressed" | "resolved";
  createdAt: string;
  respondedAt?: string;
  response?: string;
}

export interface DeliverableFile {
  id: string;
  name: string;
  type: "image" | "document" | "video" | "code" | "other";
  url: string;
  size: number;
  uploadedAt: string;
  version: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  type: "welcome" | "milestone" | "feedback" | "completion";
  subject: string;
  content: string;
  variables: string[]; // template variables like {{clientName}}
}

export interface DashboardStats {
  totalClients: number;
  activeProjects: number;
  completedProjects: number;
  upcomingDeadlines: number;
  pendingFeedback: number;
  revenueThisMonth: number;
  clientSatisfactionScore: number;
}

// API Response Types
export interface OnboardingDashboardData {
  client: Client;
  project?: Project;
  onboardingSteps: OnboardingStep[];
  upcomingTasks: Task[];
  recentDeliverables: Deliverable[];
  communications: Communication[];
  accessRequests: ClientAccess[];
  stats: {
    progressPercentage: number;
    completedSteps: number;
    totalSteps: number;
    nextMilestone?: Milestone;
  };
}

export interface AdminDashboardData {
  stats: DashboardStats;
  clients: Client[];
  recentActivity: ActivityItem[];
  upcomingDeadlines: {
    deliverables: Deliverable[];
    milestones: Milestone[];
    communications: Communication[];
  };
  pendingItems: {
    accessRequests: ClientAccess[];
    feedback: ClientFeedback[];
    approvals: Deliverable[];
  };
}

export interface ActivityItem {
  id: string;
  type:
    | "client_added"
    | "project_started"
    | "deliverable_completed"
    | "feedback_received"
    | "milestone_reached"
    | "communication_scheduled"
    | "access_granted";
  description: string;
  timestamp: string;
  clientId?: string;
  projectId?: string;
}
