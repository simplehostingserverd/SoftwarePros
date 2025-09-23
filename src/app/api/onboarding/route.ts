import { NextRequest, NextResponse } from "next/server";
import type { Client, OnboardingStep, OnboardingDashboardData } from "@/types/onboarding";

// Mock database - replace with actual database integration
const mockClients: Client[] = [
  {
    id: "client-1",
    companyName: "TechCorp Solutions",
    contactName: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    industry: "Technology",
    companySize: "medium",
    projectType: "web",
    status: "onboarding",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-22T14:30:00Z",
    kickoffDate: "2025-01-25T15:00:00Z",
    expectedLaunchDate: "2025-04-15T00:00:00Z",
    budget: 75000,
  },
];

const mockOnboardingSteps: OnboardingStep[] = [
  {
    id: "step-1",
    clientId: "client-1",
    step: "welcome",
    title: "Welcome & Project Kickoff",
    description: "Initial meeting to confirm scope, deliverables, timelines, and responsibilities",
    status: "completed",
    completedDate: "2025-01-16T10:00:00Z",
    requirements: ["Signed contract", "Initial payment", "Project requirements document"],
  },
  {
    id: "step-2",
    clientId: "client-1",
    step: "access_setup",
    title: "Access Setup & Credentials",
    description: "Collect all necessary credentials, permissions, and account access",
    status: "in_progress",
    dueDate: "2025-01-24T17:00:00Z",
    requirements: [
      "Domain registrar access",
      "Hosting credentials",
      "Email provider access",
      "Analytics accounts",
      "Social media accounts"
    ],
  },
];

// GET /api/onboarding - Get client dashboard data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
    }

    const client = mockClients.find(c => c.id === clientId);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const onboardingSteps = mockOnboardingSteps.filter(s => s.clientId === clientId);

    const dashboardData: OnboardingDashboardData = {
      client,
      onboardingSteps,
      upcomingTasks: [
        {
          id: "task-1",
          title: "Provide brand assets",
          description: "Logo files, brand colors, fonts, and style guide",
          dueDate: "2025-01-24T17:00:00Z",
          status: "todo",
          priority: "high",
        },
      ],
      recentDeliverables: [],
      communications: [],
      accessRequests: [],
      stats: {
        progressPercentage: 25,
        completedSteps: 1,
        totalSteps: 4,
      },
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching onboarding data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/onboarding - Create new client and start onboarding
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      industry,
      companySize,
      projectType,
      budget,
      expectedLaunchDate
    } = body;

    // Validate required fields
    if (!companyName || !contactName || !email || !projectType) {
      return NextResponse.json(
        { error: "Missing required fields: companyName, contactName, email, projectType" },
        { status: 400 }
      );
    }

    // Create new client
    const newClient: Client = {
      id: `client-${Date.now()}`,
      companyName,
      contactName,
      email,
      phone,
      industry,
      companySize,
      projectType,
      status: "onboarding",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expectedLaunchDate,
      budget,
    };

    // Create initial onboarding steps
    const initialSteps: OnboardingStep[] = [
      {
        id: `step-${Date.now()}-1`,
        clientId: newClient.id,
        step: "welcome",
        title: "Welcome & Project Kickoff",
        description: "Schedule and complete the initial project kickoff meeting",
        status: "pending",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        requirements: ["Schedule kickoff meeting", "Prepare project requirements", "Review contract"],
      },
      {
        id: `step-${Date.now()}-2`,
        clientId: newClient.id,
        step: "access_setup",
        title: "Access Setup & Credentials",
        description: "Collect all necessary credentials and account access",
        status: "pending",
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        requirements: [
          "Domain registrar access",
          "Hosting credentials",
          "Email provider access",
          "Analytics accounts",
          "Social media accounts"
        ],
      },
      {
        id: `step-${Date.now()}-3`,
        clientId: newClient.id,
        step: "training",
        title: "Training & Resources",
        description: "Complete training materials and access resources",
        status: "pending",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        resources: [
          {
            id: `res-${Date.now()}-1`,
            title: "Project Communication Guide",
            type: "document",
            description: "How we'll communicate throughout the project",
            required: true,
          },
          {
            id: `res-${Date.now()}-2`,
            title: "Platform Overview Video",
            type: "video",
            description: "Introduction to your new platform",
            required: true,
          },
        ],
      },
      {
        id: `step-${Date.now()}-4`,
        clientId: newClient.id,
        step: "communication",
        title: "Communication Cadence",
        description: "Set up regular check-ins and communication schedule",
        status: "pending",
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
      },
    ];

    // In a real app, save to database
    mockClients.push(newClient);
    mockOnboardingSteps.push(...initialSteps);

    // Trigger welcome email (implement email service)
    await sendWelcomeEmail(newClient);

    return NextResponse.json({
      success: true,
      client: newClient,
      onboardingSteps: initialSteps,
      message: "Client onboarding started successfully",
    });
  } catch (error) {
    console.error("Error creating client onboarding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/onboarding - Update onboarding step status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { stepId, status, completedDate, notes } = body;

    if (!stepId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: stepId, status" },
        { status: 400 }
      );
    }

    // Find and update the step
    const stepIndex = mockOnboardingSteps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) {
      return NextResponse.json(
        { error: "Onboarding step not found" },
        { status: 404 }
      );
    }

    mockOnboardingSteps[stepIndex] = {
      ...mockOnboardingSteps[stepIndex],
      status,
      completedDate: status === "completed" ? completedDate || new Date().toISOString() : undefined,
    };

    // If this step is completed, potentially trigger next step or send notification
    if (status === "completed") {
      await handleStepCompletion(mockOnboardingSteps[stepIndex]);
    }

    return NextResponse.json({
      success: true,
      step: mockOnboardingSteps[stepIndex],
      message: "Onboarding step updated successfully",
    });
  } catch (error) {
    console.error("Error updating onboarding step:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to send welcome email
async function sendWelcomeEmail(client: Client) {
  // Implement email service integration
  console.log(`Sending welcome email to ${client.email} for ${client.companyName}`);

  // Example email content
  const emailContent = {
    to: client.email,
    subject: `Welcome to SoftwarePros - ${client.companyName} Project Kickoff`,
    template: "welcome",
    data: {
      clientName: client.contactName,
      companyName: client.companyName,
      projectType: client.projectType,
      portalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/portal?clientId=${client.id}`,
    },
  };

  // Send email using your preferred service (MailerSend, etc.)
  // await emailService.send(emailContent);
}

// Helper function to handle step completion
async function handleStepCompletion(step: OnboardingStep) {
  console.log(`Step completed: ${step.title} for client ${step.clientId}`);

  // Trigger follow-up actions based on step type
  switch (step.step) {
    case "welcome":
      // Schedule access setup reminder
      console.log("Scheduling access setup reminder");
      break;
    case "access_setup":
      // Notify team that access is ready
      console.log("Notifying team that client access is ready");
      break;
    case "training":
      // Schedule first check-in
      console.log("Scheduling first check-in meeting");
      break;
    case "communication":
      // Move client to active status
      console.log("Moving client to active project status");
      break;
  }
}