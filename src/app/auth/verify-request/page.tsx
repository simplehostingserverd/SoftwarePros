"use client";

import { Alert, Box, Button, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function VerifyRequestPage() {
  const router = useRouter();

  const handleBackToSignIn = () => {
    router.push("/auth/signin");
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
        <Typography level="h1" sx={{ mb: 2, color: "primary.main" }}>
          Check Your Email
        </Typography>

        <Alert color="primary" variant="soft" sx={{ mb: 4 }}>
          A sign in link has been sent to your email address.
        </Alert>

        <Typography level="body-md" sx={{ mb: 4, color: "text.secondary" }}>
          Please check your email and click the link to complete your sign in. The link will expire
          in 24 hours.
        </Typography>

        <Box sx={{ mb: 4, textAlign: "left" }}>
          <Typography level="body-sm" sx={{ mb: 1 }}>
            • Check your spam/junk folder if you don't see the email
          </Typography>
          <Typography level="body-sm" sx={{ mb: 1 }}>
            • The email may take a few minutes to arrive
          </Typography>
          <Typography level="body-sm">• Make sure you entered the correct email address</Typography>
        </Box>

        <Button
          variant="outlined"
          color="neutral"
          onClick={handleBackToSignIn}
          sx={{ minWidth: 120 }}
        >
          Back to Sign In
        </Button>

        <Typography level="body-xs" sx={{ mt: 4, color: "text.tertiary" }}>
          Didn't receive an email? Try signing in again or contact support.
        </Typography>
      </Box>
    </Box>
  );
}
