"use client";

import { emailAutomation } from "@/lib/email-automation";
import type { Client } from "@/types/onboarding";
import { Business, CheckCircle, Launch, Person, Settings } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  Option,
  Select,
  Step,
  StepButton,
  StepIndicator,
  Stepper,
  Textarea,
  Typography,
} from "@mui/joy";
import { useState } from "react";

interface OnboardingWorkflowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (client: Client) => void;
}

export default function OnboardingWorkflow({
  isOpen,
  onClose,
  onComplete,
}: OnboardingWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    companySize: "small" as "startup" | "small" | "medium" | "enterprise",

    // Step 2: Project Details
    projectType: "web" as "web" | "mobile" | "healthcare" | "consulting" | "custom",
    projectDescription: "",
    budget: "",
    expectedLaunchDate: "",
    urgency: "normal" as "low" | "normal" | "high" | "urgent",

    // Step 3: Requirements & Scope
    requirements: "",
    features: [] as string[],
    targetAudience: "",
    designPreferences: "",

    // Step 4: Technical Details
    domainName: "",
    hostingProvider: "",
    hasExistingWebsite: false,
    integrationsNeeded: [] as string[],
    specialRequirements: "",
  });

  const steps = [
    {
      title: "Basic Information",
      icon: <Person />,
      description: "Company and contact details",
    },
    {
      title: "Project Details",
      icon: <Business />,
      description: "Project type and requirements",
    },
    {
      title: "Scope & Features",
      icon: <Settings />,
      description: "Define project scope",
    },
    {
      title: "Technical Setup",
      icon: <Launch />,
      description: "Technical requirements",
    },
  ];

  const projectTypes = [
    {
      value: "web",
      label: "Web Development",
      description: "Websites, web applications, e-commerce",
    },
    { value: "mobile", label: "Mobile App", description: "iOS and Android applications" },
    {
      value: "healthcare",
      label: "Healthcare Software",
      description: "HIPAA-compliant medical software",
    },
    { value: "consulting", label: "Consulting", description: "Technical consulting and strategy" },
    { value: "custom", label: "Custom Solution", description: "Specialized software development" },
  ];

  const commonFeatures = [
    "User Authentication",
    "Payment Processing",
    "Content Management",
    "E-commerce",
    "API Integration",
    "Real-time Features",
    "Analytics & Reporting",
    "Mobile Responsive",
    "SEO Optimization",
    "Admin Dashboard",
    "Email Integration",
    "Social Media Integration",
  ];

  const integrationOptions = [
    "CRM (Salesforce, HubSpot)",
    "Payment Gateway (Stripe, PayPal)",
    "Email Marketing (Mailchimp, SendGrid)",
    "Analytics (Google Analytics, Mixpanel)",
    "Social Media APIs",
    "Third-party APIs",
    "Database Migration",
    "Legacy System Integration",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setFormData((prev) => ({
      ...prev,
      integrationsNeeded: prev.integrationsNeeded.includes(integration)
        ? prev.integrationsNeeded.filter((i) => i !== integration)
        : [...prev.integrationsNeeded, integration],
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(formData.companyName && formData.contactName && formData.email);
      case 1:
        return !!(formData.projectType && formData.projectDescription);
      case 2:
        return !!(formData.requirements && formData.targetAudience);
      case 3:
        return true; // Technical details are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      setError(null);
    } else {
      setError("Please fill in all required fields before continuing.");
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create client onboarding
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          industry: formData.industry,
          companySize: formData.companySize,
          projectType: formData.projectType,
          budget: formData.budget ? Number.parseInt(formData.budget) : undefined,
          expectedLaunchDate: formData.expectedLaunchDate || undefined,
          notes: `
Project Description: ${formData.projectDescription}
Requirements: ${formData.requirements}
Features: ${formData.features.join(", ")}
Target Audience: ${formData.targetAudience}
Design Preferences: ${formData.designPreferences}
Domain: ${formData.domainName}
Hosting: ${formData.hostingProvider}
Integrations: ${formData.integrationsNeeded.join(", ")}
Special Requirements: ${formData.specialRequirements}
          `.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create client onboarding");
      }

      const result = await response.json();

      // Trigger welcome email
      // await emailAutomation.sendOnboardingEmail('welcome', result.client);

      onComplete(result.client);
      onClose();

      // Reset form
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        industry: "",
        companySize: "small",
        projectType: "web",
        projectDescription: "",
        budget: "",
        expectedLaunchDate: "",
        urgency: "normal",
        requirements: "",
        features: [],
        targetAudience: "",
        designPreferences: "",
        domainName: "",
        hostingProvider: "",
        hasExistingWebsite: false,
        integrationsNeeded: [],
        specialRequirements: "",
      });
      setCurrentStep(0);
    } catch (err) {
      console.error("Error creating onboarding:", err);
      setError("Failed to start onboarding process. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl required>
                <FormLabel>Company Name</FormLabel>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Your company name"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>Contact Name</FormLabel>
                <Input
                  value={formData.contactName}
                  onChange={(e) => handleInputChange("contactName", e.target.value)}
                  placeholder="Your full name"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@company.com"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Industry</FormLabel>
                <Input
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  placeholder="Technology, Healthcare, etc."
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <FormLabel>Company Size</FormLabel>
                <Select
                  value={formData.companySize}
                  onChange={(_, value) => handleInputChange("companySize", value)}
                >
                  <Option value="startup">Startup (1-10 employees)</Option>
                  <Option value="small">Small (11-50 employees)</Option>
                  <Option value="medium">Medium (51-200 employees)</Option>
                  <Option value="enterprise">Enterprise (200+ employees)</Option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl required>
                <FormLabel>Project Type</FormLabel>
                <Select
                  value={formData.projectType}
                  onChange={(_, value) => handleInputChange("projectType", value)}
                >
                  {projectTypes.map((type) => (
                    <Option key={type.value} value={type.value}>
                      <Box>
                        <Typography level="title-sm">{type.label}</Typography>
                        <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                          {type.description}
                        </Typography>
                      </Box>
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl required>
                <FormLabel>Project Description</FormLabel>
                <Textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                  placeholder="Describe your project goals, vision, and what you want to achieve..."
                  minRows={3}
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Budget Range (USD)</FormLabel>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  placeholder="50000"
                  startDecorator="$"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Expected Launch Date</FormLabel>
                <Input
                  type="date"
                  value={formData.expectedLaunchDate}
                  onChange={(e) => handleInputChange("expectedLaunchDate", e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <FormLabel>Project Urgency</FormLabel>
                <Select
                  value={formData.urgency}
                  onChange={(_, value) => handleInputChange("urgency", value)}
                >
                  <Option value="low">Low - Flexible timeline</Option>
                  <Option value="normal">Normal - Standard timeline</Option>
                  <Option value="high">High - Expedited timeline</Option>
                  <Option value="urgent">Urgent - Rush project</Option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl required>
                <FormLabel>Detailed Requirements</FormLabel>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="List your specific requirements, functionality needs, and any must-have features..."
                  minRows={4}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormLabel>Common Features (select all that apply)</FormLabel>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {commonFeatures.map((feature) => (
                  <Chip
                    key={feature}
                    variant={formData.features.includes(feature) ? "solid" : "outlined"}
                    onClick={() => handleFeatureToggle(feature)}
                    sx={{ cursor: "pointer" }}
                  >
                    {feature}
                  </Chip>
                ))}
              </Box>
            </Grid>
            <Grid xs={12}>
              <FormControl required>
                <FormLabel>Target Audience</FormLabel>
                <Textarea
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  placeholder="Describe your target users, customers, or audience..."
                  minRows={2}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <FormLabel>Design Preferences</FormLabel>
                <Textarea
                  value={formData.designPreferences}
                  onChange={(e) => handleInputChange("designPreferences", e.target.value)}
                  placeholder="Any specific design styles, colors, or examples you like..."
                  minRows={2}
                />
              </FormControl>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Domain Name</FormLabel>
                <Input
                  value={formData.domainName}
                  onChange={(e) => handleInputChange("domainName", e.target.value)}
                  placeholder="yoursite.com"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Hosting Provider</FormLabel>
                <Input
                  value={formData.hostingProvider}
                  onChange={(e) => handleInputChange("hostingProvider", e.target.value)}
                  placeholder="AWS, GoDaddy, etc."
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormLabel>Integrations Needed</FormLabel>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {integrationOptions.map((integration) => (
                  <Chip
                    key={integration}
                    variant={
                      formData.integrationsNeeded.includes(integration) ? "solid" : "outlined"
                    }
                    onClick={() => handleIntegrationToggle(integration)}
                    sx={{ cursor: "pointer" }}
                  >
                    {integration}
                  </Chip>
                ))}
              </Box>
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <FormLabel>Special Requirements</FormLabel>
                <Textarea
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                  placeholder="Any special requirements, compliance needs, or technical constraints..."
                  minRows={3}
                />
              </FormControl>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90vw", sm: "80vw", md: "700px" },
          maxHeight: "90vh",
          bgcolor: "background.popup",
          borderRadius: 2,
          boxShadow: 24,
          outline: "none",
          overflow: "auto",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            Start New Client Onboarding
          </Typography>
          <Typography level="body-md" sx={{ color: "text.secondary", mb: 3 }}>
            Set up a comprehensive onboarding process for your new client
          </Typography>

          {/* Stepper */}
          <Stepper sx={{ mb: 4 }}>
            {steps.map((step, index) => (
              <Step
                key={index}
                indicator={
                  <StepIndicator
                    variant={index <= currentStep ? "solid" : "outlined"}
                    color={index < currentStep ? "success" : "primary"}
                  >
                    {index < currentStep ? <CheckCircle /> : step.icon}
                  </StepIndicator>
                }
              >
                <StepButton onClick={() => setCurrentStep(index)} disabled={index > currentStep}>
                  <Box>
                    <Typography level="title-sm">{step.title}</Typography>
                    <Typography level="body-xs">{step.description}</Typography>
                  </Box>
                </StepButton>
              </Step>
            ))}
          </Stepper>

          {/* Error Alert */}
          {error && (
            <Alert color="danger" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Step Content */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 2 }}>
                {steps[currentStep].title}
              </Typography>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button variant="outlined" onClick={handleBack} disabled={currentStep === 0 || loading}>
              Back
            </Button>

            <Typography level="body-sm" sx={{ color: "text.secondary" }}>
              Step {currentStep + 1} of {steps.length}
            </Typography>

            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={loading}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                loading={loading}
                startDecorator={loading ? <CircularProgress size="sm" /> : <Launch />}
              >
                Start Onboarding
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
