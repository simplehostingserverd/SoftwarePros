"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  Input,
  FormControl,
  FormLabel,
  Grid,
  Divider,
  Chip,
  Sheet,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import {
  Security,
  QrCode2,
  Key,
  Warning,
  CheckCircle,
  Shield,
  Download,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
  manualEntryKey: string;
}

export default function TwoFactorAuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [setupData, setSetupData] = useState<TwoFactorSetup | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const handleSetup2FA = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/auth/2fa/setup", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to setup 2FA");
      }

      const data = await response.json();
      setSetupData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to setup 2FA");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to verify 2FA");
      }

      setSuccess("Two-factor authentication has been enabled successfully!");
      setShowBackupCodes(true);
      setVerificationCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify 2FA");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDisable2FA = async () => {
    const password = prompt("Please enter your password to disable 2FA:");
    if (!password) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/2fa/disable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to disable 2FA");
      }

      setSuccess("Two-factor authentication has been disabled");
      setSetupData(null);
      setShowBackupCodes(false);
      // Refresh session to update 2FA status
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disable 2FA");
    } finally {
      setLoading(false);
    }
  };

  const downloadBackupCodes = () => {
    if (!setupData?.backupCodes) return;

    const content = `SoftwarePros - Two-Factor Authentication Backup Codes
Generated: ${new Date().toLocaleString()}
Account: ${session?.user?.email}

IMPORTANT: Store these codes in a secure location. Each code can only be used once.

${setupData.backupCodes.map((code, index) => `${index + 1}. ${code}`).join('\n')}

These codes can be used to access your account if you lose access to your authenticator app.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `softwarepros-backup-codes-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (status === "loading") {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography level="body-lg">Loading...</Typography>
      </Box>
    );
  }

  if (!session) {
    return null;
  }

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
      <Card sx={{ width: "100%", maxWidth: 600, boxShadow: "lg" }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Security sx={{ fontSize: 48, color: "primary.500", mb: 2 }} />
            <Typography level="h2" sx={{ mb: 1 }}>
              Two-Factor Authentication
            </Typography>
            <Typography level="body-md" sx={{ color: "text.secondary" }}>
              Add an extra layer of security to your account
            </Typography>
          </Box>

          {error && (
            <Alert color="danger" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert color="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {/* Current Status */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Shield color={session.user?.twoFactorEnabled ? "success" : "warning"} />
                <Typography level="title-md">Current Status</Typography>
                <Chip
                  color={session.user?.twoFactorEnabled ? "success" : "warning"}
                  variant="soft"
                >
                  {session.user?.twoFactorEnabled ? "Enabled" : "Disabled"}
                </Chip>
              </Box>
              <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                {session.user?.twoFactorEnabled
                  ? "Your account is protected with two-factor authentication"
                  : "Your account is not protected with two-factor authentication"}
              </Typography>
            </CardContent>
          </Card>

          {!session.user?.twoFactorEnabled && !setupData && (
            <Box sx={{ textAlign: "center" }}>
              <Typography level="body-md" sx={{ mb: 3 }}>
                Two-factor authentication adds an extra layer of security to your account.
                You'll need to provide a code from your authenticator app when signing in.
              </Typography>
              <Button
                onClick={handleSetup2FA}
                loading={loading}
                startDecorator={<Security />}
                size="lg"
              >
                Setup Two-Factor Authentication
              </Button>
            </Box>
          )}

          {setupData && !success && (
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="title-md" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                      <QrCode2 />
                      Scan QR Code
                    </Typography>
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                      <img
                        src={setupData.qrCode}
                        alt="2FA QR Code"
                        style={{ maxWidth: "200px", height: "auto" }}
                      />
                    </Box>
                    <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                      Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="title-md" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                      <Key />
                      Manual Entry
                    </Typography>
                    <Typography level="body-sm" sx={{ mb: 2 }}>
                      If you can't scan the QR code, enter this secret manually:
                    </Typography>
                    <Sheet sx={{ p: 2, bgcolor: "neutral.100", borderRadius: "sm", mb: 2 }}>
                      <Typography level="body-sm" sx={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                        {setupData.manualEntryKey}
                      </Typography>
                    </Sheet>
                    <Typography level="body-xs" sx={{ color: "text.secondary" }}>
                      Account: {session.user?.email}<br />
                      Issuer: SoftwarePros
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="title-md" sx={{ mb: 2 }}>
                      Verify Setup
                    </Typography>
                    <Typography level="body-sm" sx={{ mb: 2 }}>
                      Enter the 6-digit code from your authenticator app to verify the setup:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "end" }}>
                      <FormControl sx={{ flex: 1 }}>
                        <FormLabel>Verification Code</FormLabel>
                        <Input
                          placeholder="000000"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          slotProps={{
                            input: {
                              style: { textAlign: "center", fontSize: "1.5rem", letterSpacing: "0.5rem" }
                            }
                          }}
                        />
                      </FormControl>
                      <Button
                        onClick={handleVerify2FA}
                        loading={isVerifying}
                        disabled={verificationCode.length !== 6}
                        startDecorator={<CheckCircle />}
                      >
                        Verify
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {showBackupCodes && setupData?.backupCodes && (
            <Card variant="outlined" sx={{ mt: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Warning color="warning" />
                  <Typography level="title-md">Backup Codes</Typography>
                </Box>
                <Typography level="body-sm" sx={{ mb: 2, color: "warning.600" }}>
                  Save these backup codes in a secure location. Each code can only be used once
                  and will allow you to access your account if you lose your authenticator device.
                </Typography>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {setupData.backupCodes.map((code, index) => (
                    <Grid key={index} xs={6} sm={4}>
                      <Sheet sx={{ p: 1, textAlign: "center", bgcolor: "neutral.100", borderRadius: "sm" }}>
                        <Typography level="body-sm" sx={{ fontFamily: "monospace" }}>
                          {code}
                        </Typography>
                      </Sheet>
                    </Grid>
                  ))}
                </Grid>
                <Button
                  onClick={downloadBackupCodes}
                  variant="outlined"
                  startDecorator={<Download />}
                  fullWidth
                >
                  Download Backup Codes
                </Button>
              </CardContent>
            </Card>
          )}

          {session.user?.twoFactorEnabled && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Divider sx={{ my: 3 }}>Advanced Options</Divider>
              <Button
                onClick={handleDisable2FA}
                loading={loading}
                color="danger"
                variant="outlined"
              >
                Disable Two-Factor Authentication
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}