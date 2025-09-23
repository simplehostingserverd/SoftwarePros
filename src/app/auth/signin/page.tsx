"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Alert,
  Link,
  Sheet,
  IconButton,
} from "@mui/joy";
import { GitHub, Visibility, VisibilityOff, Login } from "@mui/icons-material";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        // Check if user has 2FA enabled
        const session = await getSession();
        if (session?.user?.twoFactorEnabled) {
          router.push(`/auth/2fa?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        } else {
          router.push(callbackUrl);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signIn("github", {
        callbackUrl,
      });
    } catch (err) {
      setError("Failed to sign in with GitHub. Please try again.");
      setLoading(false);
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
          maxWidth: 400,
          boxShadow: "lg",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography level="h2" sx={{ mb: 1 }}>
              Sign In
            </Typography>
            <Typography level="body-md" sx={{ color: "text.secondary" }}>
              Welcome back to SoftwarePros
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert color="danger" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* GitHub Sign In */}
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

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl error={!!errors.email} sx={{ mb: 2 }}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                  {errors.email.message}
                </Typography>
              )}
            </FormControl>

            <FormControl error={!!errors.password} sx={{ mb: 3 }}>
              <FormLabel>Password</FormLabel>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
              {errors.password && (
                <Typography level="body-xs" sx={{ color: "danger.500", mt: 0.5 }}>
                  {errors.password.message}
                </Typography>
              )}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              startDecorator={<Login />}
              sx={{ mb: 3 }}
            >
              Sign In
            </Button>
          </form>

          {/* Footer Links */}
          <Box sx={{ textAlign: "center" }}>
            <Typography level="body-sm" sx={{ color: "text.secondary" }}>
              Don't have an account?{" "}
              <Link component={NextLink} href="/auth/register" color="primary">
                Sign up here
              </Link>
            </Typography>
            <Typography level="body-sm" sx={{ color: "text.secondary", mt: 1 }}>
              <Link component={NextLink} href="/auth/forgot-password" color="primary">
                Forgot your password?
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}