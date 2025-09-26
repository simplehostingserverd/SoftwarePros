"use client";

import { PASSWORD_REQUIREMENTS } from "@/lib/auth/config";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Business,
  CheckCircle,
  CreditCard,
  GitHub,
  Person,
  PersonAdd,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Link,
  Option,
  Select,
  Step,
  StepButton,
  StepIndicator,
  Stepper,
  Textarea,
  Typography,
} from "@mui/joy";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Enhanced validation schema for B2B registration
const registrationSchema = z
  .object({
    // Personal Information
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(PASSWORD_REQUIREMENTS.minLength, PASSWORD_REQUIREMENTS.messages.minLength)
      .regex(PASSWORD_REQUIREMENTS.patterns.uppercase, PASSWORD_REQUIREMENTS.messages.uppercase)
      .regex(PASSWORD_REQUIREMENTS.patterns.lowercase, PASSWORD_REQUIREMENTS.messages.lowercase)
      .regex(PASSWORD_REQUIREMENTS.patterns.numbers, PASSWORD_REQUIREMENTS.messages.numbers)
      .regex(PASSWORD_REQUIREMENTS.patterns.symbols, PASSWORD_REQUIREMENTS.messages.symbols),
    confirmPassword: z.string(),

    // Business Information
    companyName: z.string().min(2, "Company name is required"),
    companySize: z.enum(["startup", "small", "medium", "enterprise"]),
    industry: z.string().min(2, "Industry is required"),
    phone: z.string().optional(),

    // Project Information
    projectType: z.enum(["web", "mobile", "healthcare", "consulting", "custom"]),
    projectDescription: z.string().min(10, "Please provide a brief project description"),
    budget: z.string().min(1, "Budget range is required"),
    timeline: z.string().min(1, "Timeline is required"),

    // Legal
    termsAccepted: z.boolean().refine((val) => val, "You must accept the terms and conditions"),
    privacyAccepted: z.boolean().refine((val) => val, "You must accept the privacy policy"),
    marketingOptIn: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const projectTypes = [
  { value: "web", label: "Web Development", description: "Websites, web applications, e-commerce" },
  { value: "mobile", label: "Mobile App", description: "iOS and Android applications" },
  {
    value: "healthcare",
    label: "Healthcare Software",
    description: "HIPAA-compliant medical software",
  },
  { value: "consulting", label: "Consulting", description: "Technical consulting and strategy" },
  { value: "custom", label: "Custom Solution", description: "Specialized software development" },
];

const budgetRanges = [
  "Under $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "$250,000 - $500,000",
  "$500,000+",
  "Let's discuss",
];

const timelineOptions = [
  "ASAP (Rush project)",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "12+ months",
  "Flexible timeline",
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur", // Only validate on blur, not on every change
  });

  const steps = [
    { title: "Account", icon: <Person />, description: "Personal details" },
    { title: "Business", icon: <Business />, description: "Company information" },
    { title: "Project", icon: <CreditCard />, description: "Project details" },
  ];

  const validateStep = async (step: number): Promise<boolean> => {
    const fieldsToValidate = {
      0: ["name", "email", "password", "confirmPassword"],
      1: ["companyName", "companySize", "industry"],
      2: [
        "projectType",
        "projectDescription",
        "budget",
        "timeline",
        "termsAccepted",
        "privacyAccepted",
      ],
    }[step] as (keyof RegistrationFormData)[];

    return await trigger(fieldsToValidate);
  };

  const handleNext = async () => {
    setHasValidated(true);
    const isValid = await validateStep(currentStep);
    if (isValid) {
      // Clear password fields when moving away from account step for security
      if (currentStep === 0) {
        setShowPassword(false);
        setShowConfirmPassword(false);
      }
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      setError(null);
      setHasValidated(false); // Reset validation state for next step
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setError(null);
    setHasValidated(false);
  };

  // Helper function to show errors only after validation
  const showError = (fieldError: any) => fieldError && hasValidated;

  // Helper function to safely get error message
  const getErrorMessage = (fieldError: any) => fieldError?.message || "";

  const onSubmit = async (data: RegistrationFormData) => {
    setHasValidated(true);
    setLoading(true);
    setError(null);

    try {
      // Register user account
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "client", // B2B clients get client role
        }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Create onboarding record
      const onboardingResponse = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: data.companyName,
          contactName: data.name,
          email: data.email,
          phone: data.phone,
          industry: data.industry,
          companySize: data.companySize,
          projectType: data.projectType,
          budget: data.budget.includes("$")
            ? Number.parseInt(data.budget.replace(/[^0-9]/g, ""))
            : undefined,
          notes: `
Project Description: ${data.projectDescription}
Timeline: ${data.timeline}
Marketing Opt-in: ${data.marketingOptIn ? "Yes" : "No"}
          `.trim(),
        }),
      });

      if (!onboardingResponse.ok) {
        const errorData = await onboardingResponse.json();
        throw new Error(errorData.message || "Onboarding setup failed");
      }

      // Auto sign in after successful registration
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push("/portal?welcome=true");
      } else {
        router.push("/auth/signin?message=Registration successful, please sign in");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    try {
      await signIn("github", {
        callbackUrl: "/onboarding/github-setup",
      });
    } catch (err) {
      setError("Failed to sign in with GitHub. Please try again.");
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl error={!!errors.name}>
                <FormLabel>Full Name *</FormLabel>
                <Input placeholder="John Smith" {...register("name")} error={!!errors.name} />
                {showError(errors.name) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.name)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl error={!!errors.email}>
                <FormLabel>Business Email *</FormLabel>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  {...register("email")}
                  error={!!errors.email}
                />
                {showError(errors.email) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.email)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl error={!!errors.password}>
                <FormLabel>Password *</FormLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  {...register("password")}
                  error={!!errors.password}
                  endDecorator={
                    <IconButton
                      size="sm"
                      variant="plain"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
                {showError(errors.password) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.password)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl error={!!errors.confirmPassword}>
                <FormLabel>Confirm Password *</FormLabel>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  endDecorator={
                    <IconButton
                      size="sm"
                      variant="plain"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
                {showError(errors.confirmPassword) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.confirmPassword)}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl error={!!errors.companyName}>
                <FormLabel>Company Name *</FormLabel>
                <Input
                  placeholder="Your Company Inc."
                  {...register("companyName")}
                  error={!!errors.companyName}
                />
                {showError(errors.companyName) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.companyName)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl error={!!errors.companySize}>
                <FormLabel>Company Size *</FormLabel>
                <Select
                  placeholder="Select company size"
                  value={watch("companySize") || ""}
                  onChange={(_, value) =>
                    setValue("companySize", value as "startup" | "small" | "medium" | "enterprise")
                  }
                >
                  <Option value="startup">Startup (1-10 employees)</Option>
                  <Option value="small">Small (11-50 employees)</Option>
                  <Option value="medium">Medium (51-200 employees)</Option>
                  <Option value="enterprise">Enterprise (200+ employees)</Option>
                </Select>
                {showError(errors.companySize) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.companySize)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl error={!!errors.industry}>
                <FormLabel>Industry *</FormLabel>
                <Input
                  placeholder="e.g., Technology, Healthcare"
                  {...register("industry")}
                  error={!!errors.industry}
                />
                {showError(errors.industry) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.industry)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="+1 (555) 123-4567" {...register("phone")} />
              </FormControl>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl error={!!errors.projectType}>
                <FormLabel>Project Type *</FormLabel>
                <Select
                  placeholder="Select project type"
                  value={watch("projectType") || ""}
                  onChange={(_, value) =>
                    setValue(
                      "projectType",
                      value as "web" | "mobile" | "healthcare" | "consulting" | "custom",
                    )
                  }
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
                {showError(errors.projectType) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.projectType)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl error={!!errors.projectDescription}>
                <FormLabel>Project Description *</FormLabel>
                <Textarea
                  placeholder="Describe your project goals and requirements..."
                  minRows={3}
                  {...register("projectDescription")}
                />
                {showError(errors.projectDescription) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.projectDescription)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl error={!!errors.budget}>
                <FormLabel>Budget Range *</FormLabel>
                <Select
                  placeholder="Select budget range"
                  value={watch("budget") || ""}
                  onChange={(_, value) => setValue("budget", value as string)}
                >
                  {budgetRanges.map((range) => (
                    <Option key={range} value={range}>
                      {range}
                    </Option>
                  ))}
                </Select>
                {showError(errors.budget) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.budget)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl error={!!errors.timeline}>
                <FormLabel>Timeline *</FormLabel>
                <Select
                  placeholder="Select timeline"
                  value={watch("timeline") || ""}
                  onChange={(_, value) => setValue("timeline", value as string)}
                >
                  {timelineOptions.map((timeline) => (
                    <Option key={timeline} value={timeline}>
                      {timeline}
                    </Option>
                  ))}
                </Select>
                {showError(errors.timeline) && (
                  <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                    {getErrorMessage(errors.timeline)}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <Box sx={{ mt: 2 }}>
                <FormControl error={!!errors.termsAccepted}>
                  <Checkbox
                    {...register("termsAccepted")}
                    label={
                      <Typography level="body-sm">
                        I agree to the{" "}
                        <Link component={NextLink} href="/terms" target="_blank">
                          Terms of Service
                        </Link>
                        *
                      </Typography>
                    }
                  />
                  {showError(errors.termsAccepted) && (
                    <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                      {getErrorMessage(errors.termsAccepted)}
                    </Typography>
                  )}
                </FormControl>

                <FormControl error={!!errors.privacyAccepted} sx={{ mt: 1 }}>
                  <Checkbox
                    {...register("privacyAccepted")}
                    label={
                      <Typography level="body-sm">
                        I agree to the{" "}
                        <Link component={NextLink} href="/privacy" target="_blank">
                          Privacy Policy
                        </Link>
                        *
                      </Typography>
                    }
                  />
                  {showError(errors.privacyAccepted) && (
                    <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                      {getErrorMessage(errors.privacyAccepted)}
                    </Typography>
                  )}
                </FormControl>

                <FormControl sx={{ mt: 1 }}>
                  <Checkbox
                    {...register("marketingOptIn")}
                    label={
                      <Typography level="body-sm">
                        I'd like to receive updates about SoftwarePros services and industry
                        insights
                      </Typography>
                    }
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.surface",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          boxShadow: "lg",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography level="h2" sx={{ mb: 1 }}>
              Start Your Project
            </Typography>
            <Typography level="body-md" sx={{ color: "text.secondary" }}>
              Join SoftwarePros for enterprise software development
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert color="danger" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* GitHub Sign Up Option */}
          {currentStep === 0 && (
            <>
              <Button
                fullWidth
                variant="outlined"
                startDecorator={<GitHub />}
                onClick={handleGitHubSignIn}
                loading={loading}
                sx={{ mb: 3 }}
              >
                Continue with GitHub
              </Button>
              <Divider sx={{ my: 3 }}>OR</Divider>
            </>
          )}

          {/* Progress Stepper */}
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
                <StepButton disabled>
                  <Box>
                    <Typography level="title-sm">{step.title}</Typography>
                    <Typography level="body-xs">{step.description}</Typography>
                  </Box>
                </StepButton>
              </Step>
            ))}
          </Stepper>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography level="title-lg" sx={{ mb: 2 }}>
                  {steps[currentStep].title} Information
                </Typography>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={currentStep === 0 || loading}
              >
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
                  type="submit"
                  loading={loading}
                  startDecorator={<PersonAdd />}
                  disabled={loading}
                >
                  Create Account
                </Button>
              )}
            </Box>
          </form>

          {/* Footer */}
          <Box sx={{ textAlign: "center" }}>
            <Typography level="body-sm" sx={{ color: "text.secondary" }}>
              Already have an account?{" "}
              <Link component={NextLink} href="/auth/signin" color="primary">
                Sign in here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
