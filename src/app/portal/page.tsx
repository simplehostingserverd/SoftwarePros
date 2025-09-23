"use client";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Typography,
  Avatar,
  Button,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemDecorator,
  ListItemContent,
  Sheet,
  Divider,
} from "@mui/joy";
import {
  CheckCircle,
  Schedule,
  Assignment,
  Group,
  Feedback,
  CloudDownload,
  VideoCall,
  KeyboardArrowDown,
  PlayArrow,
  Description,
  Link as LinkIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { OnboardingDashboardData, OnboardingStep, Deliverable, Communication } from "@/types/onboarding";

export default function ClientPortalPage() {
  const [dashboardData, setDashboardData] = useState<OnboardingDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: OnboardingDashboardData = {
      client: {
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
      onboardingSteps: [
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
        {
          id: "step-3",
          clientId: "client-1",
          step: "training",
          title: "Training & Resources",
          description: "Access training materials, documentation, and resources",
          status: "pending",
          dueDate: "2025-01-26T17:00:00Z",
          resources: [
            {
              id: "res-1",
              title: "Project Communication Guide",
              type: "document",
              description: "How we'll communicate throughout the project",
              required: true,
            },
            {
              id: "res-2",
              title: "Platform Overview Video",
              type: "video",
              description: "Introduction to your new website platform",
              required: true,
            },
          ],
        },
        {
          id: "step-4",
          clientId: "client-1",
          step: "communication",
          title: "Communication Cadence",
          description: "Set up regular check-ins and communication schedule",
          status: "pending",
          dueDate: "2025-01-27T17:00:00Z",
        },
      ],
      upcomingTasks: [
        {
          id: "task-1",
          title: "Provide brand assets",
          description: "Logo files, brand colors, fonts, and style guide",
          dueDate: "2025-01-24T17:00:00Z",
          status: "todo",
          priority: "high",
        },
        {
          id: "task-2",
          title: "Content review meeting",
          description: "Review initial wireframes and content structure",
          dueDate: "2025-01-28T15:00:00Z",
          status: "todo",
          priority: "medium",
        },
      ],
      recentDeliverables: [
        {
          id: "del-1",
          name: "Project Scope Document",
          description: "Detailed project requirements and specifications",
          type: "review",
          status: "delivered",
          dueDate: "2025-01-20T17:00:00Z",
          completedDate: "2025-01-19T14:30:00Z",
          files: [
            {
              id: "file-1",
              name: "TechCorp_Project_Scope_v1.pdf",
              type: "document",
              url: "/documents/scope.pdf",
              size: 2048000,
              uploadedAt: "2025-01-19T14:30:00Z",
              version: 1,
            },
          ],
        },
        {
          id: "del-2",
          name: "Initial Wireframes",
          description: "Homepage and key page layouts",
          type: "design",
          status: "review",
          dueDate: "2025-01-25T17:00:00Z",
          files: [
            {
              id: "file-2",
              name: "Homepage_Wireframe_v1.png",
              type: "image",
              url: "/designs/wireframe.png",
              size: 1024000,
              uploadedAt: "2025-01-23T11:15:00Z",
              version: 1,
            },
          ],
        },
      ],
      communications: [
        {
          id: "comm-1",
          clientId: "client-1",
          type: "kickoff",
          scheduledDate: "2025-01-25T15:00:00Z",
          method: "meeting",
          status: "scheduled",
          attendees: ["John Smith", "Sarah Johnson (PM)", "Mike Chen (Lead Dev)"],
        },
        {
          id: "comm-2",
          clientId: "client-1",
          type: "check_in",
          scheduledDate: "2025-02-01T14:00:00Z",
          method: "call",
          status: "scheduled",
        },
      ],
      accessRequests: [
        {
          id: "access-1",
          clientId: "client-1",
          type: "domain",
          serviceName: "GoDaddy Domain Management",
          status: "pending",
          notes: "Need access to update DNS settings",
        },
        {
          id: "access-2",
          clientId: "client-1",
          type: "hosting",
          serviceName: "AWS Hosting Account",
          status: "pending",
          notes: "Hosting credentials for deployment",
        },
      ],
      stats: {
        progressPercentage: 25,
        completedSteps: 1,
        totalSteps: 4,
        nextMilestone: {
          id: "milestone-1",
          name: "Design Approval",
          description: "Complete wireframes and design mockups",
          dueDate: "2025-02-15T17:00:00Z",
          status: "upcoming",
          deliverables: ["del-2"],
          paymentAmount: 25000,
          paymentStatus: "pending",
        },
      },
    };

    setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography level="h2" sx={{ mb: 3 }}>Loading your project dashboard...</Typography>
        <LinearProgress />
      </Box>
    );
  }

  if (!dashboardData) return null;

  const { client, onboardingSteps, upcomingTasks, recentDeliverables, communications, accessRequests, stats } = dashboardData;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography level="h1" sx={{ mb: 1 }}>
          Welcome, {client.contactName}
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", mb: 2 }}>
          {client.companyName} • {client.projectType?.toUpperCase()} Project
        </Typography>

        {/* Progress Overview */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography level="title-lg">Project Progress</Typography>
              <Chip color="primary" variant="soft">
                {stats.progressPercentage}% Complete
              </Chip>
            </Box>
            <LinearProgress
              determinate
              value={stats.progressPercentage}
              sx={{ mb: 2, height: 8, borderRadius: 4 }}
            />
            <Typography level="body-sm" sx={{ color: "text.secondary" }}>
              {stats.completedSteps} of {stats.totalSteps} onboarding steps completed
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid xs={12} md={8}>
          {/* Onboarding Steps */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle color="primary" />
                Onboarding Steps
              </Typography>

              {onboardingSteps.map((step, index) => (
                <Accordion key={step.id} expanded={step.status === "in_progress"}>
                  <AccordionSummary>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                      <Avatar
                        size="sm"
                        sx={{
                          bgcolor: step.status === "completed" ? "success.500" :
                                  step.status === "in_progress" ? "warning.500" : "neutral.300"
                        }}
                      >
                        {step.status === "completed" ? <CheckCircle /> : index + 1}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography level="title-sm">{step.title}</Typography>
                        <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                          {step.description}
                        </Typography>
                      </Box>
                      <Chip
                        size="sm"
                        color={
                          step.status === "completed" ? "success" :
                          step.status === "in_progress" ? "warning" : "neutral"
                        }
                        variant="soft"
                      >
                        {step.status.replace("_", " ")}
                      </Chip>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {step.requirements && (
                      <Box sx={{ mb: 2 }}>
                        <Typography level="body-sm" sx={{ fontWeight: 600, mb: 1 }}>
                          Requirements:
                        </Typography>
                        <List size="sm">
                          {step.requirements.map((req, i) => (
                            <ListItem key={i}>
                              <ListItemDecorator>•</ListItemDecorator>
                              <ListItemContent>{req}</ListItemContent>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {step.resources && (
                      <Box>
                        <Typography level="body-sm" sx={{ fontWeight: 600, mb: 1 }}>
                          Resources:
                        </Typography>
                        <List size="sm">
                          {step.resources.map((resource) => (
                            <ListItem key={resource.id} sx={{ alignItems: "flex-start" }}>
                              <ListItemDecorator>
                                {resource.type === "video" ? <PlayArrow /> :
                                 resource.type === "document" ? <Description /> : <LinkIcon />}
                              </ListItemDecorator>
                              <ListItemContent>
                                <Typography level="title-sm">{resource.title}</Typography>
                                <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                                  {resource.description}
                                </Typography>
                                {resource.required && (
                                  <Chip size="sm" color="danger" variant="soft" sx={{ mt: 0.5 }}>
                                    Required
                                  </Chip>
                                )}
                              </ListItemContent>
                              <Button size="sm" variant="outlined">
                                {resource.type === "video" ? "Watch" : "Download"}
                              </Button>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          {/* Recent Deliverables */}
          <Card>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Assignment color="primary" />
                Recent Deliverables
              </Typography>

              {recentDeliverables.map((deliverable) => (
                <Sheet key={deliverable.id} sx={{ p: 2, mb: 2, borderRadius: "sm", border: "1px solid", borderColor: "divider" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Box>
                      <Typography level="title-sm">{deliverable.name}</Typography>
                      <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                        {deliverable.description}
                      </Typography>
                    </Box>
                    <Chip
                      size="sm"
                      color={
                        deliverable.status === "delivered" ? "success" :
                        deliverable.status === "review" ? "warning" : "neutral"
                      }
                      variant="soft"
                    >
                      {deliverable.status}
                    </Chip>
                  </Box>

                  {deliverable.files && deliverable.files.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography level="body-sm" sx={{ fontWeight: 600, mb: 1 }}>Files:</Typography>
                      {deliverable.files.map((file) => (
                        <Box key={file.id} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                          <Description fontSize="small" />
                          <Box sx={{ flex: 1 }}>
                            <Typography level="body-sm">{file.name}</Typography>
                            <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                              {Math.round(file.size / 1024)}KB • v{file.version}
                            </Typography>
                          </Box>
                          <IconButton size="sm" variant="outlined">
                            <CloudDownload />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {deliverable.status === "review" && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                      <Button size="sm" sx={{ mr: 1 }}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outlined">
                        Request Changes
                      </Button>
                    </Box>
                  )}
                </Sheet>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid xs={12} md={4}>
          {/* Next Milestone */}
          {stats.nextMilestone && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography level="title-md" sx={{ mb: 2 }}>Next Milestone</Typography>
                <Typography level="title-sm" sx={{ mb: 1 }}>
                  {stats.nextMilestone.name}
                </Typography>
                <Typography level="body-sm" sx={{ color: "text.secondary", mb: 2 }}>
                  {stats.nextMilestone.description}
                </Typography>
                <Typography level="body-xs" sx={{ mb: 2 }}>
                  Due: {new Date(stats.nextMilestone.dueDate).toLocaleDateString()}
                </Typography>
                {stats.nextMilestone.paymentAmount && (
                  <Box sx={{ p: 2, bgcolor: "success.50", borderRadius: "sm" }}>
                    <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                      Payment: ${stats.nextMilestone.paymentAmount.toLocaleString()}
                    </Typography>
                    <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                      Due upon completion
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          {/* Your Tasks */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography level="title-md" sx={{ mb: 2 }}>Your Action Items</Typography>
              {upcomingTasks.map((task) => (
                <Box key={task.id} sx={{ mb: 2, pb: 2, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { border: "none", mb: 0, pb: 0 } }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Chip
                      size="sm"
                      color={task.priority === "high" ? "danger" : task.priority === "medium" ? "warning" : "neutral"}
                      variant="soft"
                    >
                      {task.priority}
                    </Chip>
                    <Box sx={{ flex: 1 }}>
                      <Typography level="title-sm">{task.title}</Typography>
                      <Typography level="body-xs" sx={{ color: "text.secondary", mb: 1 }}>
                        {task.description}
                      </Typography>
                      <Typography level="body-xs" sx={{ color: "warning.500" }}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Communications */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography level="title-md" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Schedule color="primary" />
                Upcoming Meetings
              </Typography>
              {communications.map((comm) => (
                <Box key={comm.id} sx={{ mb: 2, p: 2, bgcolor: "primary.50", borderRadius: "sm" }}>
                  <Typography level="title-sm" sx={{ mb: 1 }}>
                    {comm.type.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </Typography>
                  <Typography level="body-sm" sx={{ mb: 1 }}>
                    {new Date(comm.scheduledDate).toLocaleDateString()} at{" "}
                    {new Date(comm.scheduledDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </Typography>
                  {comm.attendees && (
                    <Typography level="body-xs" sx={{ color: "text.secondary", mb: 2 }}>
                      Attendees: {comm.attendees.join(", ")}
                    </Typography>
                  )}
                  <Button size="sm" startDecorator={<VideoCall />}>
                    Join Meeting
                  </Button>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Pending Access Requests */}
          {accessRequests.length > 0 && (
            <Card>
              <CardContent>
                <Typography level="title-md" sx={{ mb: 2 }}>Pending Access Requests</Typography>
                {accessRequests.map((access) => (
                  <Box key={access.id} sx={{ mb: 2 }}>
                    <Typography level="title-sm">{access.serviceName}</Typography>
                    <Typography level="body-xs" sx={{ color: "text.secondary", mb: 1 }}>
                      {access.notes}
                    </Typography>
                    <Chip size="sm" color="warning" variant="soft">
                      {access.status}
                    </Chip>
                  </Box>
                ))}
                <Button size="sm" variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Provide Access Details
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}