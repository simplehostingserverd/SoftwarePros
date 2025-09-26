"use client";

import type { ActivityItem, AdminDashboardData, Client } from "@/types/onboarding";
import {
  Add,
  Assignment,
  CheckCircle,
  Edit,
  Feedback,
  People,
  Schedule,
  Search,
  TrendingUp,
  Visibility,
  Warning,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Option,
  Select,
  Sheet,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: AdminDashboardData = {
      stats: {
        totalClients: 24,
        activeProjects: 12,
        completedProjects: 8,
        upcomingDeadlines: 5,
        pendingFeedback: 3,
        revenueThisMonth: 185000,
        clientSatisfactionScore: 4.8,
      },
      clients: [
        {
          id: "client-1",
          companyName: "TechCorp Solutions",
          contactName: "John Smith",
          email: "john@techcorp.com",
          projectType: "web",
          status: "onboarding",
          createdAt: "2025-01-15T10:00:00Z",
          updatedAt: "2025-01-22T14:30:00Z",
          budget: 75000,
        },
        {
          id: "client-2",
          companyName: "HealthTech Inc",
          contactName: "Sarah Johnson",
          email: "sarah@healthtech.com",
          projectType: "healthcare",
          status: "active",
          createdAt: "2025-01-10T09:00:00Z",
          updatedAt: "2025-01-22T16:00:00Z",
          budget: 120000,
        },
        {
          id: "client-3",
          companyName: "Mobile Apps Co",
          contactName: "Mike Chen",
          email: "mike@mobileapps.com",
          projectType: "mobile",
          status: "active",
          createdAt: "2025-01-05T11:00:00Z",
          updatedAt: "2025-01-21T10:30:00Z",
          budget: 95000,
        },
        {
          id: "client-4",
          companyName: "StartupXYZ",
          contactName: "Emily Davis",
          email: "emily@startupxyz.com",
          projectType: "web",
          status: "completed",
          createdAt: "2024-12-01T10:00:00Z",
          updatedAt: "2025-01-15T17:00:00Z",
          budget: 45000,
        },
      ],
      recentActivity: [
        {
          id: "activity-1",
          type: "deliverable_completed",
          description: "Wireframes delivered for TechCorp Solutions",
          timestamp: "2025-01-22T14:30:00Z",
          clientId: "client-1",
        },
        {
          id: "activity-2",
          type: "feedback_received",
          description: "Feedback received from HealthTech Inc on mobile app designs",
          timestamp: "2025-01-22T11:15:00Z",
          clientId: "client-2",
        },
        {
          id: "activity-3",
          type: "milestone_reached",
          description: "Development phase started for Mobile Apps Co",
          timestamp: "2025-01-21T16:45:00Z",
          clientId: "client-3",
        },
        {
          id: "activity-4",
          type: "project_started",
          description: "New project onboarding started for TechCorp Solutions",
          timestamp: "2025-01-21T09:00:00Z",
          clientId: "client-1",
        },
      ],
      upcomingDeadlines: {
        deliverables: [
          {
            id: "del-1",
            name: "Homepage Design Mockups",
            description: "High-fidelity designs for homepage",
            type: "design",
            status: "in_progress",
            dueDate: "2025-01-25T17:00:00Z",
            assignee: "Design Team",
          },
          {
            id: "del-2",
            name: "Mobile App Prototype",
            description: "Interactive prototype for user testing",
            type: "development",
            status: "in_progress",
            dueDate: "2025-01-27T17:00:00Z",
            assignee: "Dev Team",
          },
        ],
        milestones: [
          {
            id: "milestone-1",
            name: "Design Approval",
            description: "Client approval of all design mockups",
            dueDate: "2025-01-28T17:00:00Z",
            status: "upcoming",
            deliverables: ["del-1"],
            paymentAmount: 25000,
            paymentStatus: "pending",
          },
        ],
        communications: [
          {
            id: "comm-1",
            clientId: "client-1",
            type: "milestone",
            scheduledDate: "2025-01-25T15:00:00Z",
            method: "meeting",
            status: "scheduled",
          },
          {
            id: "comm-2",
            clientId: "client-2",
            type: "check_in",
            scheduledDate: "2025-01-26T14:00:00Z",
            method: "call",
            status: "scheduled",
          },
        ],
      },
      pendingItems: {
        accessRequests: [
          {
            id: "access-1",
            clientId: "client-1",
            type: "domain",
            serviceName: "GoDaddy Domain Access",
            status: "pending",
            notes: "Need DNS management access",
          },
          {
            id: "access-2",
            clientId: "client-2",
            type: "hosting",
            serviceName: "AWS Hosting Credentials",
            status: "pending",
            notes: "Deployment access required",
          },
        ],
        feedback: [
          {
            id: "feedback-1",
            clientId: "client-2",
            type: "deliverable",
            content: "The color scheme needs to be more vibrant according to our brand guidelines",
            rating: 4,
            status: "new",
            createdAt: "2025-01-22T11:15:00Z",
          },
        ],
        approvals: [
          {
            id: "del-3",
            name: "Brand Guidelines Document",
            description: "Comprehensive brand and style guide",
            type: "review",
            status: "review",
            dueDate: "2025-01-24T17:00:00Z",
          },
        ],
      },
    };

    setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading || !dashboardData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography level="h2" sx={{ mb: 3 }}>
          Loading admin dashboard...
        </Typography>
      </Box>
    );
  }

  const { stats, clients, recentActivity, upcomingDeadlines, pendingItems } = dashboardData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "active":
        return "primary";
      case "onboarding":
        return "warning";
      case "paused":
        return "neutral";
      default:
        return "neutral";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "client_added":
        return <People />;
      case "project_started":
        return <Assignment />;
      case "deliverable_completed":
        return <CheckCircle />;
      case "feedback_received":
        return <Feedback />;
      case "milestone_reached":
        return <TrendingUp />;
      default:
        return <CheckCircle />;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography level="h1" sx={{ mb: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography level="body-lg" sx={{ color: "text.secondary" }}>
            Manage clients, projects, and onboarding processes
          </Typography>
        </Box>
        <Button startDecorator={<Add />} size="lg">
          Add New Client
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.500" }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography level="h3">{stats.totalClients}</Typography>
                  <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    Total Clients
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "success.500" }}>
                  <Assignment />
                </Avatar>
                <Box>
                  <Typography level="h3">{stats.activeProjects}</Typography>
                  <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    Active Projects
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "warning.500" }}>
                  <Schedule />
                </Avatar>
                <Box>
                  <Typography level="h3">{stats.upcomingDeadlines}</Typography>
                  <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    Upcoming Deadlines
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "info.500" }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography level="h3">${(stats.revenueThisMonth / 1000).toFixed(0)}K</Typography>
                  <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    Revenue This Month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid xs={12} lg={8}>
          {/* Clients Table */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography level="title-lg">Clients</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Input
                    placeholder="Search clients..."
                    startDecorator={<Search />}
                    size="sm"
                    sx={{ minWidth: 200 }}
                  />
                  <Select defaultValue="all" size="sm">
                    <Option value="all">All Status</Option>
                    <Option value="active">Active</Option>
                    <Option value="onboarding">Onboarding</Option>
                    <Option value="completed">Completed</Option>
                  </Select>
                </Box>
              </Box>

              <Sheet sx={{ overflow: "auto" }}>
                <Table hoverRow>
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Project Type</th>
                      <th>Status</th>
                      <th>Budget</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id}>
                        <td>
                          <Box>
                            <Typography level="title-sm">{client.companyName}</Typography>
                            <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                              {client.contactName} • {client.email}
                            </Typography>
                          </Box>
                        </td>
                        <td>
                          <Chip size="sm" variant="soft">
                            {client.projectType?.toUpperCase()}
                          </Chip>
                        </td>
                        <td>
                          <Chip size="sm" color={getStatusColor(client.status)} variant="soft">
                            {client.status}
                          </Chip>
                        </td>
                        <td>
                          <Typography level="body-sm">
                            ${client.budget?.toLocaleString()}
                          </Typography>
                        </td>
                        <td>
                          <Typography level="body-xs">
                            {new Date(client.updatedAt).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton size="sm" variant="outlined">
                              <Visibility />
                            </IconButton>
                            <IconButton size="sm" variant="outlined">
                              <Edit />
                            </IconButton>
                          </Box>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Sheet>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 2 }}>
                Upcoming Deadlines
              </Typography>

              <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value as number)}>
                <TabList>
                  <Tab>Deliverables</Tab>
                  <Tab>Milestones</Tab>
                  <Tab>Communications</Tab>
                </TabList>

                <TabPanel value={0}>
                  <Stack spacing={2}>
                    {upcomingDeadlines.deliverables.map((deliverable) => (
                      <Sheet
                        key={deliverable.id}
                        sx={{
                          p: 2,
                          borderRadius: "sm",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography level="title-sm">{deliverable.name}</Typography>
                            <Typography level="body-xs" sx={{ color: "text.secondary", mb: 1 }}>
                              {deliverable.description}
                            </Typography>
                            <Typography level="body-xs">
                              Due: {new Date(deliverable.dueDate).toLocaleDateString()} • Assignee:{" "}
                              {deliverable.assignee}
                            </Typography>
                          </Box>
                          <Chip size="sm" color="warning" variant="soft">
                            {deliverable.status.replace("_", " ")}
                          </Chip>
                        </Box>
                      </Sheet>
                    ))}
                  </Stack>
                </TabPanel>

                <TabPanel value={1}>
                  <Stack spacing={2}>
                    {upcomingDeadlines.milestones.map((milestone) => (
                      <Sheet
                        key={milestone.id}
                        sx={{
                          p: 2,
                          borderRadius: "sm",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography level="title-sm">{milestone.name}</Typography>
                            <Typography level="body-xs" sx={{ color: "text.secondary", mb: 1 }}>
                              {milestone.description}
                            </Typography>
                            <Typography level="body-xs">
                              Due: {new Date(milestone.dueDate).toLocaleDateString()}
                            </Typography>
                            {milestone.paymentAmount && (
                              <Typography
                                level="body-xs"
                                sx={{ color: "success.500", fontWeight: 600 }}
                              >
                                Payment: ${milestone.paymentAmount.toLocaleString()}
                              </Typography>
                            )}
                          </Box>
                          <Chip size="sm" color="primary" variant="soft">
                            {milestone.status}
                          </Chip>
                        </Box>
                      </Sheet>
                    ))}
                  </Stack>
                </TabPanel>

                <TabPanel value={2}>
                  <Stack spacing={2}>
                    {upcomingDeadlines.communications.map((comm) => (
                      <Sheet
                        key={comm.id}
                        sx={{
                          p: 2,
                          borderRadius: "sm",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography level="title-sm">
                              {comm.type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Typography>
                            <Typography level="body-xs" sx={{ color: "text.secondary", mb: 1 }}>
                              {comm.method.toUpperCase()}
                            </Typography>
                            <Typography level="body-xs">
                              {new Date(comm.scheduledDate).toLocaleDateString()} at{" "}
                              {new Date(comm.scheduledDate).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                          </Box>
                          <Chip size="sm" color="primary" variant="soft">
                            {comm.status}
                          </Chip>
                        </Box>
                      </Sheet>
                    ))}
                  </Stack>
                </TabPanel>
              </Tabs>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid xs={12} lg={4}>
          {/* Pending Items */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                level="title-lg"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Warning color="warning" />
                Pending Items
              </Typography>

              {/* Access Requests */}
              <Typography level="title-sm" sx={{ mb: 1 }}>
                Access Requests ({pendingItems.accessRequests.length})
              </Typography>
              <List size="sm" sx={{ mb: 2 }}>
                {pendingItems.accessRequests.map((access) => (
                  <ListItem key={access.id}>
                    <ListItemContent>
                      <Typography level="title-sm">{access.serviceName}</Typography>
                      <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                        {access.notes}
                      </Typography>
                    </ListItemContent>
                    <Button size="sm" variant="outlined">
                      Review
                    </Button>
                  </ListItem>
                ))}
              </List>

              {/* Feedback */}
              <Typography level="title-sm" sx={{ mb: 1 }}>
                New Feedback ({pendingItems.feedback.length})
              </Typography>
              <List size="sm" sx={{ mb: 2 }}>
                {pendingItems.feedback.map((feedback) => (
                  <ListItem key={feedback.id} sx={{ alignItems: "flex-start" }}>
                    <ListItemContent>
                      <Typography level="body-sm">{feedback.content}</Typography>
                      <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                        Rating: {feedback.rating}/5 stars
                      </Typography>
                    </ListItemContent>
                    <Button size="sm" variant="outlined">
                      Respond
                    </Button>
                  </ListItem>
                ))}
              </List>

              {/* Approvals */}
              <Typography level="title-sm" sx={{ mb: 1 }}>
                Pending Approvals ({pendingItems.approvals.length})
              </Typography>
              <List size="sm">
                {pendingItems.approvals.map((approval) => (
                  <ListItem key={approval.id}>
                    <ListItemContent>
                      <Typography level="title-sm">{approval.name}</Typography>
                      <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                        Due: {new Date(approval.dueDate).toLocaleDateString()}
                      </Typography>
                    </ListItemContent>
                    <Button size="sm" variant="outlined">
                      Review
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemDecorator>
                      <Avatar size="sm" sx={{ bgcolor: "primary.100" }}>
                        {getActivityIcon(activity.type)}
                      </Avatar>
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography level="body-sm">{activity.description}</Typography>
                      <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                        {new Date(activity.timestamp).toLocaleDateString()} at{" "}
                        {new Date(activity.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
