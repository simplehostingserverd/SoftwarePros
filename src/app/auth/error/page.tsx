"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, Button, Alert } from "@mui/joy";
import { useEffect, useState } from "react";

const errorMessages = {
  AccessDenied: "Access was denied. Please try again or contact support if the problem persists.",
  Signin: "There was an error signing you in. Please try again.",
  OAuthSignin: "There was an error with the OAuth provider. Please try again.",
  OAuthCallback: "There was an error during the OAuth callback. Please try again.",
  OAuthCreateAccount: "Could not create OAuth account. Please try again.",
  EmailCreateAccount: "Could not create account with email. Please try again.",
  Callback: "There was an error in the callback handler. Please try again.",
  OAuthAccountNotLinked: "The OAuth account is not linked to an existing account. Please sign in with your original account first.",
  EmailSignin: "Check your email for a sign in link.",
  CredentialsSignin: "Invalid credentials. Please check your email and password.",
  SessionRequired: "Please sign in to access this page.",
  Default: "An unexpected error occurred. Please try again."
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam && errorParam in errorMessages) {
      setError(errorMessages[errorParam as keyof typeof errorMessages]);
    } else {
      setError(errorMessages.Default);
    }
  }, [searchParams]);

  const handleRetry = () => {
    router.push("/auth/signin");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.body",
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography level="h1" sx={{ mb: 2, color: "danger.main" }}>
          Authentication Error
        </Typography>

        <Alert color="danger" variant="soft" sx={{ mb: 4 }}>
          {error}
        </Alert>

        <Typography level="body-md" sx={{ mb: 4, color: "text.secondary" }}>
          We encountered an issue while trying to sign you in. This could be due to:
        </Typography>

        <Box sx={{ mb: 4, textAlign: "left" }}>
          <Typography level="body-sm" sx={{ mb: 1 }}>
            • OAuth provider permissions not granted
          </Typography>
          <Typography level="body-sm" sx={{ mb: 1 }}>
            • Network connectivity issues
          </Typography>
          <Typography level="body-sm" sx={{ mb: 1 }}>
            • Temporary service unavailability
          </Typography>
          <Typography level="body-sm">
            • Account configuration issues
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="solid"
            color="primary"
            onClick={handleRetry}
            sx={{ minWidth: 120 }}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            onClick={handleHome}
            sx={{ minWidth: 120 }}
          >
            Go Home
          </Button>
        </Box>

        <Typography level="body-xs" sx={{ mt: 4, color: "text.tertiary" }}>
          If this problem persists, please contact our support team.
        </Typography>
      </Box>
    </Box>
  );
}