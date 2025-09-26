import { sendContactEmail } from "@/lib/mailer";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Email validation data using the actual SMTP domain
    const validationData = {
      name: "Email Validation User",
      email: "admin@aquareefdirect.com",
      phone: "555-0123",
      company: "SoftwarePros Support",
      serviceType: "Email Configuration Check",
      message:
        "This is an email configuration check to verify the email system is working properly.",
      subject: "SoftwarePros Email Configuration - System Working",
    };

    console.log("Starting email test...");
    console.log("SMTP Configuration check:");
    console.log(`- SMTP_HOST: ${process.env.SMTP_HOST || "NOT SET"}`);
    console.log(`- SMTP_PORT: ${process.env.SMTP_PORT || "NOT SET"}`);
    console.log(
      `- SMTP_USER: ${process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 15) + "..." : "NOT SET"}`,
    );
    console.log(`- SMTP_PASS: ${process.env.SMTP_PASS ? "SET (hidden)" : "NOT SET"}`);
    console.log(`- CONTACT_EMAIL: ${process.env.CONTACT_EMAIL || "NOT SET"}`);
    console.log(`- CONTACT_FROM_EMAIL: ${process.env.CONTACT_FROM_EMAIL || "NOT SET"}`);

    const result = await sendContactEmail(validationData);

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      details: {
        messageId: result.messageId,
        preview: result.previewUrl || null,
        sentAt: new Date().toISOString(),
        smtpHost: process.env.SMTP_HOST,
        fromEmail: process.env.CONTACT_FROM_EMAIL,
      },
    });
  } catch (error) {
    console.error("Email test failed:", error);

    // Handle specific email errors with helpful suggestions
    if (error instanceof Error) {
      // SMTP connection errors
      if (error.message.includes("ECONNREFUSED")) {
        return NextResponse.json(
          {
            success: false,
            error: "SMTP connection refused",
            details: "Cannot connect to SMTP server. Check host and port settings.",
            suggestions: [
              "Verify SMTP_HOST is correct",
              "Check if SMTP_PORT is correct (usually 587 or 465)",
              "Ensure firewall allows outbound SMTP connections",
            ],
            currentConfig: {
              host: process.env.SMTP_HOST || "not set",
              port: process.env.SMTP_PORT || "not set",
            },
          },
          { status: 500 },
        );
      }

      // Authentication errors
      if (
        error.message.includes("Invalid login") ||
        error.message.includes("authentication") ||
        error.message.includes("535")
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "SMTP authentication failed",
            details: "Username or password is incorrect",
            suggestions: [
              "Verify SMTP_USER is correct",
              "Check SMTP_PASS is correct",
              "Make sure you're using the correct SMTP credentials from your hosting provider",
            ],
            currentConfig: {
              user: process.env.SMTP_USER
                ? process.env.SMTP_USER.substring(0, 15) + "..."
                : "not set",
            },
          },
          { status: 500 },
        );
      }

      // DNS/hostname errors
      if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
        return NextResponse.json(
          {
            success: false,
            error: "SMTP hostname not found",
            details: "Cannot resolve SMTP server hostname",
            suggestions: [
              "Check SMTP_HOST spelling",
              "Verify internet connection",
              "Check DNS resolution",
            ],
            currentConfig: {
              host: process.env.SMTP_HOST || "not set",
            },
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: "Check server logs for more information",
        suggestions: [
          "Verify all SMTP environment variables are set correctly",
          "Check your hosting provider's SMTP settings",
          "Ensure from email domain matches your hosted domain",
        ],
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Check environment variables without exposing sensitive data
  const smtpStatus = {
    hasSmtpHost: !!process.env.SMTP_HOST,
    hasSmtpPort: !!process.env.SMTP_PORT,
    hasSmtpUser: !!process.env.SMTP_USER,
    hasSmtpPass: !!process.env.SMTP_PASS,
    hasContactEmail: !!process.env.CONTACT_EMAIL,
    hasContactFromEmail: !!process.env.CONTACT_FROM_EMAIL,
    smtpHost: process.env.SMTP_HOST || "not set",
    smtpPort: process.env.SMTP_PORT || "not set",
    smtpUser: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 3) + "..." : "not set",
    contactEmail: process.env.CONTACT_EMAIL || "not set",
    contactFromEmail: process.env.CONTACT_FROM_EMAIL || "not set",
    nodeEnv: process.env.NODE_ENV,
  };

  const issues: string[] = [];

  // Check email configuration
  const hasSmtpConfig = smtpStatus.hasSmtpHost && smtpStatus.hasSmtpUser && smtpStatus.hasSmtpPass;

  if (!hasSmtpConfig) {
    if (!smtpStatus.hasSmtpHost) issues.push("Missing SMTP_HOST environment variable");
    if (!smtpStatus.hasSmtpUser) issues.push("Missing SMTP_USER environment variable");
    if (!smtpStatus.hasSmtpPass) issues.push("Missing SMTP_PASS environment variable");
  }

  if (!smtpStatus.hasContactEmail) {
    issues.push("Missing CONTACT_EMAIL environment variable");
  }

  if (!smtpStatus.hasContactFromEmail) {
    issues.push("Missing CONTACT_FROM_EMAIL environment variable");
  }

  const isConfigured =
    hasSmtpConfig && smtpStatus.hasContactEmail && smtpStatus.hasContactFromEmail;

  return NextResponse.json({
    message: "Email test endpoint. Use POST to send a test email.",
    configured: isConfigured,
    smtp: smtpStatus,
    issues: issues.length > 0 ? issues : null,
    instructions: !isConfigured
      ? {
          step1: "Set your SMTP configuration:",
          envVars: [
            "SMTP_HOST=your.domain.com",
            "SMTP_PORT=465",
            "SMTP_USER=admin@yourdomain.com",
            "SMTP_PASS=your_password",
            "SMTP_SECURE=true",
            "CONTACT_EMAIL=admin@yourdomain.com",
            "CONTACT_FROM_EMAIL=noreply@yourdomain.com",
          ],
          step2: "Then POST to this endpoint to test email sending",
        }
      : {
          usage: "POST to this endpoint to send a test email and verify email is working",
          method: "SMTP",
        },
  });
}
