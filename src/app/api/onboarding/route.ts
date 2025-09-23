import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { apiRateLimiter } from "@/lib/rate-limiter";
import type { OnboardingDashboardData } from "@/types/onboarding";
import { CompanySize, ProjectType, OnboardingStepType } from "@prisma/client";

// GET /api/onboarding - Get client dashboard data
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const canMakeRequest = await apiRateLimiter.canMakeRequest(`api:${clientIp}`);

    if (!canMakeRequest) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
    }

    // Fetch client with related data
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        onboardingSteps: {
          include: {
            resources: true,
          },
          orderBy: { createdAt: 'asc' }
        },
        communications: {
          orderBy: { scheduledDate: 'desc' }
        },
        accessRequests: {
          orderBy: { createdAt: 'desc' }
        },
        projects: {
          include: {
            phases: {
              include: {
                tasks: {
                  where: {
                    status: { not: 'DONE' }
                  },
                  orderBy: { dueDate: 'asc' }
                }
              }
            },
            deliverables: {
              where: {
                status: { in: ['PENDING', 'IN_PROGRESS', 'REVIEW'] }
              },
              orderBy: { dueDate: 'asc' }
            }
          }
        }
      }
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Calculate progress stats
    const completedSteps = client.onboardingSteps.filter(s => s.status === 'COMPLETED').length;
    const totalSteps = client.onboardingSteps.length;
    const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

    // Get upcoming tasks from all projects
    const upcomingTasks = client.projects.flatMap(project =>
      project.phases.flatMap(phase => phase.tasks)
    ).slice(0, 5); // Limit to 5 most urgent tasks

    // Get recent deliverables
    const recentDeliverables = client.projects.flatMap(project => project.deliverables).slice(0, 5);

    const dashboardData: OnboardingDashboardData = {
      client: {
        id: client.id,
        companyName: client.companyName,
        contactName: client.contactName,
        email: client.email,
        phone: client.phone || undefined,
        industry: client.industry || undefined,
        companySize: client.companySize?.toLowerCase() as any,
        projectType: client.projectType?.toLowerCase() as any,
        status: client.status.toLowerCase() as any,
        createdAt: client.createdAt.toISOString(),
        updatedAt: client.updatedAt.toISOString(),
        kickoffDate: client.kickoffDate?.toISOString(),
        expectedLaunchDate: client.expectedLaunchDate?.toISOString(),
        budget: client.budget || undefined,
        notes: client.notes || undefined,
      },
      onboardingSteps: client.onboardingSteps.map(step => ({
        id: step.id,
        clientId: step.clientId,
        step: step.step.toLowerCase() as any,
        title: step.title,
        description: step.description,
        status: step.status.toLowerCase() as any,
        dueDate: step.dueDate?.toISOString(),
        completedDate: step.completedDate?.toISOString(),
        assignee: step.assignee || undefined,
        requirements: step.requirements,
        resources: step.resources?.map(resource => ({
          id: resource.id,
          title: resource.title,
          type: resource.type.toLowerCase() as any,
          url: resource.url || undefined,
          content: resource.content || undefined,
          description: resource.description || undefined,
          required: resource.required,
        }))
      })),
      upcomingTasks: upcomingTasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || undefined,
        assignee: task.assignee || undefined,
        dueDate: task.dueDate.toISOString(),
        status: task.status.toLowerCase() as any,
        priority: task.priority.toLowerCase() as any,
        dependencies: task.dependencies,
        estimatedHours: task.estimatedHours || undefined,
        actualHours: task.actualHours || undefined,
      })),
      recentDeliverables: recentDeliverables.map(deliverable => ({
        id: deliverable.id,
        name: deliverable.name,
        description: deliverable.description,
        type: deliverable.type.toLowerCase() as any,
        status: deliverable.status.toLowerCase() as any,
        dueDate: deliverable.dueDate.toISOString(),
        completedDate: deliverable.completedDate?.toISOString(),
        assignee: deliverable.assignee || undefined,
        files: [],
        feedback: []
      })),
      communications: client.communications.map(comm => ({
        id: comm.id,
        clientId: comm.clientId,
        type: comm.type.toLowerCase() as any,
        scheduledDate: comm.scheduledDate.toISOString(),
        completedDate: comm.completedDate?.toISOString(),
        method: comm.method.toLowerCase() as any,
        status: comm.status.toLowerCase() as any,
        notes: comm.notes || undefined,
        attendees: comm.attendees,
      })),
      accessRequests: client.accessRequests.map(access => ({
        id: access.id,
        clientId: access.clientId,
        type: access.type.toLowerCase() as any,
        serviceName: access.serviceName,
        status: access.status.toLowerCase() as any,
        notes: access.notes || undefined,
        credentials: access.credentialsData ? JSON.parse(access.credentialsData) : undefined,
      })),
      stats: {
        progressPercentage,
        completedSteps,
        totalSteps,
        nextMilestone: undefined, // TODO: implement milestone logic
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
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const canMakeRequest = await apiRateLimiter.canMakeRequest(`api:${clientIp}`);

    if (!canMakeRequest) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

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
      expectedLaunchDate,
      notes
    } = body;

    // Validate required fields
    if (!companyName || !contactName || !email || !projectType) {
      return NextResponse.json(
        { error: "Missing required fields: companyName, contactName, email, projectType" },
        { status: 400 }
      );
    }

    // Check if client with this email already exists
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      return NextResponse.json(
        { error: "A client with this email address already exists" },
        { status: 409 }
      );
    }

    // Convert string values to enum values
    const companySizeEnum = companySize ? (companySize.toUpperCase() as CompanySize) : CompanySize.SMALL;
    const projectTypeEnum = projectType ? (projectType.toUpperCase() as ProjectType) : ProjectType.WEB;

    // Create new client with transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Create the client
      const newClient = await tx.client.create({
        data: {
          companyName,
          contactName,
          email,
          phone: phone || undefined,
          industry: industry || undefined,
          companySize: companySizeEnum,
          projectType: projectTypeEnum,
          budget: budget ? parseInt(budget.toString()) : undefined,
          expectedLaunchDate: expectedLaunchDate ? new Date(expectedLaunchDate) : undefined,
          notes: notes || undefined,
          status: 'ONBOARDING',
        }
      });

      // Create initial onboarding steps
      const onboardingSteps = await Promise.all([
        tx.onboardingStep.create({
          data: {
            clientId: newClient.id,
            step: OnboardingStepType.WELCOME,
            title: "Welcome & Project Kickoff",
            description: "Schedule and complete the initial project kickoff meeting",
            status: 'PENDING',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            requirements: ["Schedule kickoff meeting", "Prepare project requirements", "Review contract"],
          }
        }),
        tx.onboardingStep.create({
          data: {
            clientId: newClient.id,
            step: OnboardingStepType.ACCESS_SETUP,
            title: "Access Setup & Credentials",
            description: "Collect all necessary credentials and account access",
            status: 'PENDING',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
            requirements: [
              "Domain registrar access",
              "Hosting credentials",
              "Email provider access",
              "Analytics accounts",
              "Social media accounts"
            ],
          }
        }),
        tx.onboardingStep.create({
          data: {
            clientId: newClient.id,
            step: OnboardingStepType.TRAINING,
            title: "Training & Resources",
            description: "Complete training materials and access resources",
            status: 'PENDING',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            requirements: ["Review communication guide", "Watch platform overview"],
          }
        }),
        tx.onboardingStep.create({
          data: {
            clientId: newClient.id,
            step: OnboardingStepType.COMMUNICATION,
            title: "Communication Cadence",
            description: "Set up regular check-ins and communication schedule",
            status: 'PENDING',
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
            requirements: ["Schedule weekly check-ins", "Configure notification preferences"],
          }
        })
      ]);

      // Create onboarding resources for the training step
      const trainingStep = onboardingSteps.find(s => s.step === OnboardingStepType.TRAINING);
      if (trainingStep) {
        await Promise.all([
          tx.onboardingResource.create({
            data: {
              stepId: trainingStep.id,
              title: "Project Communication Guide",
              type: 'DOCUMENT',
              description: "How we'll communicate throughout the project",
              required: true,
              content: "This guide outlines our communication protocols, meeting schedules, and preferred channels for different types of updates."
            }
          }),
          tx.onboardingResource.create({
            data: {
              stepId: trainingStep.id,
              title: "Platform Overview Video",
              type: 'VIDEO',
              description: "Introduction to your new platform",
              required: true,
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/resources/platform-overview`
            }
          })
        ]);
      }

      // Log activity
      await tx.activityLog.create({
        data: {
          type: 'CLIENT_ADDED',
          description: `New client onboarding started for ${companyName}`,
          clientId: newClient.id,
          metadata: JSON.stringify({
            projectType: projectTypeEnum,
            companySize: companySizeEnum,
            budget: budget ? parseInt(budget.toString()) : null
          })
        }
      });

      return { client: newClient, onboardingSteps };
    });

    // Trigger welcome email (implement email service)
    await sendWelcomeEmail(result.client);

    return NextResponse.json({
      success: true,
      client: {
        id: result.client.id,
        companyName: result.client.companyName,
        contactName: result.client.contactName,
        email: result.client.email,
        phone: result.client.phone || undefined,
        industry: result.client.industry || undefined,
        companySize: result.client.companySize?.toLowerCase(),
        projectType: result.client.projectType?.toLowerCase(),
        status: result.client.status.toLowerCase(),
        createdAt: result.client.createdAt.toISOString(),
        updatedAt: result.client.updatedAt.toISOString(),
        expectedLaunchDate: result.client.expectedLaunchDate?.toISOString(),
        budget: result.client.budget || undefined,
        notes: result.client.notes || undefined,
      },
      onboardingSteps: result.onboardingSteps.map(step => ({
        id: step.id,
        clientId: step.clientId,
        step: step.step.toLowerCase(),
        title: step.title,
        description: step.description,
        status: step.status.toLowerCase(),
        dueDate: step.dueDate?.toISOString(),
        requirements: step.requirements,
      })),
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
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const canMakeRequest = await apiRateLimiter.canMakeRequest(`api:${clientIp}`);

    if (!canMakeRequest) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { stepId, status, completedDate, notes } = body;

    if (!stepId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: stepId, status" },
        { status: 400 }
      );
    }

    // Convert status to enum
    const statusEnum = status.toUpperCase() as any;

    // Update the step in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find and update the step
      const existingStep = await tx.onboardingStep.findUnique({
        where: { id: stepId },
        include: { client: true }
      });

      if (!existingStep) {
        throw new Error('Onboarding step not found');
      }

      const updatedStep = await tx.onboardingStep.update({
        where: { id: stepId },
        data: {
          status: statusEnum,
          completedDate: statusEnum === 'COMPLETED' ?
            (completedDate ? new Date(completedDate) : new Date()) :
            null,
        }
      });

      // Log activity
      await tx.activityLog.create({
        data: {
          type: statusEnum === 'COMPLETED' ? 'MILESTONE_REACHED' : 'CLIENT_ADDED',
          description: `Onboarding step "${existingStep.title}" marked as ${status.toLowerCase()} for ${existingStep.client.companyName}`,
          clientId: existingStep.clientId,
          metadata: JSON.stringify({
            stepId: stepId,
            stepTitle: existingStep.title,
            stepType: existingStep.step,
            newStatus: statusEnum,
            notes: notes || null
          })
        }
      });

      return { step: updatedStep, client: existingStep.client };
    });

    // If this step is completed, potentially trigger next step or send notification
    if (statusEnum === 'COMPLETED') {
      await handleStepCompletion(result.step, result.client);
    }

    return NextResponse.json({
      success: true,
      step: {
        id: result.step.id,
        clientId: result.step.clientId,
        step: result.step.step.toLowerCase(),
        title: result.step.title,
        description: result.step.description,
        status: result.step.status.toLowerCase(),
        dueDate: result.step.dueDate?.toISOString(),
        completedDate: result.step.completedDate?.toISOString(),
        assignee: result.step.assignee || undefined,
        requirements: result.step.requirements,
      },
      message: "Onboarding step updated successfully",
    });
  } catch (error) {
    console.error("Error updating onboarding step:", error);

    if (error instanceof Error && error.message === 'Onboarding step not found') {
      return NextResponse.json(
        { error: "Onboarding step not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to send welcome email
async function sendWelcomeEmail(client: any) {
  try {
    console.log(`📧 Sending welcome email to ${client.email} for ${client.companyName}`);

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

    // TODO: Implement email service integration
    // For now, just log the email content
    console.log('Email content:', emailContent);

    // Send email using your preferred service (MailerSend, etc.)
    // await emailService.send(emailContent);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

// Helper function to handle step completion
async function handleStepCompletion(step: any, client: any) {
  try {
    console.log(`✅ Step completed: ${step.title} for client ${client.companyName}`);

    // Trigger follow-up actions based on step type
    switch (step.step) {
      case 'WELCOME':
        // Schedule access setup reminder
        console.log("📅 Scheduling access setup reminder");
        await prisma.communication.create({
          data: {
            clientId: client.id,
            type: 'CHECK_IN',
            scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            method: 'EMAIL',
            status: 'SCHEDULED',
            notes: 'Reminder to collect access credentials and setup information'
          }
        });
        break;

      case 'ACCESS_SETUP':
        // Notify team that access is ready
        console.log("🔑 Notifying team that client access is ready");
        await prisma.activityLog.create({
          data: {
            type: 'ACCESS_GRANTED',
            description: `Access credentials received from ${client.companyName}`,
            clientId: client.id,
            metadata: JSON.stringify({
              stepCompleted: step.title,
              nextActions: ['Begin technical setup', 'Schedule development kickoff']
            })
          }
        });
        break;

      case 'TRAINING':
        // Schedule first check-in
        console.log("📞 Scheduling first check-in meeting");
        await prisma.communication.create({
          data: {
            clientId: client.id,
            type: 'CHECK_IN',
            scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            method: 'MEETING',
            status: 'SCHEDULED',
            notes: 'First project check-in meeting to discuss progress and next steps'
          }
        });
        break;

      case 'COMMUNICATION':
        // Move client to active status
        console.log("🚀 Moving client to active project status");
        await prisma.client.update({
          where: { id: client.id },
          data: { status: 'ACTIVE' }
        });

        await prisma.activityLog.create({
          data: {
            type: 'PROJECT_STARTED',
            description: `${client.companyName} onboarding completed - project is now active`,
            clientId: client.id,
            metadata: JSON.stringify({
              onboardingCompletedAt: new Date().toISOString(),
              projectType: client.projectType
            })
          }
        });
        break;
    }
  } catch (error) {
    console.error('Error handling step completion:', error);
  }
}