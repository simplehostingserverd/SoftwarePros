import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    // Test email data
    const testData = {
      name: "Email Test",
      email: "test@example.com",
      phone: "555-0123",
      company: "Test Company",
      serviceType: "Email Configuration Test",
      message: "This is a test email to verify the email configuration is working properly.",
      subject: "SoftwarePros Email Test - Configuration Working",
    };

    console.log("Starting email test...");
    console.log("Email Configuration check:");
    console.log(`- MAILERSEND_API_KEY: ${process.env.MAILERSEND_API_KEY ? process.env.MAILERSEND_API_KEY.substring(0, 15) + "..." : "NOT SET"}`);
    console.log(`- SMTP_HOST: ${process.env.SMTP_HOST || "NOT SET"}`);
    console.log(`- SMTP_PORT: ${process.env.SMTP_PORT || "NOT SET"}`);
    console.log(`- SMTP_USER: ${process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 15) + "..." : "NOT SET"}`);
    console.log(`- SMTP_PASS: ${process.env.SMTP_PASS ? "SET (hidden)" : "NOT SET"}`);
    console.log(`- CONTACT_FROM_EMAIL: ${process.env.CONTACT_FROM_EMAIL || "NOT SET"}`);

    const result = await sendContactEmail(testData);

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      details: {
        messageId: result.messageId,
        preview: result.previewUrl || null,
        sentAt: new Date().toISOString(),
        smtpHost: process.env.SMTP_HOST,
        fromEmail: process.env.CONTACT_FROM_EMAIL,
      }
    });

  } catch (error) {
    console.error("Email test failed:", error);

    // Handle specific email errors with helpful suggestions
    if (error instanceof Error) {
      // SMTP connection errors
      if (error.message.includes("ECONNREFUSED")) {
        return NextResponse.json({
          success: false,
          error: "SMTP connection refused",
          details: "Cannot connect to SMTP server. Check host and port settings.",
          suggestions: [
            "Verify SMTP_HOST is correct (should be smtp.mailersend.net)",
            "Check if SMTP_PORT is correct (should be 587)",
            "Ensure firewall allows outbound SMTP connections"
          ],
          currentConfig: {
            host: process.env.SMTP_HOST || "not set",
            port: process.env.SMTP_PORT || "not set"
          }
        }, { status: 500 });
      }

      // Authentication errors
      if (error.message.includes("Invalid login") || error.message.includes("authentication") || error.message.includes("535")) {
        return NextResponse.json({
          success: false,
          error: "SMTP authentication failed",
          details: "Username or password is incorrect",
          suggestions: [
            "Verify SMTP_USER is correct",
            "Check SMTP_PASS is correct",
            "Make sure you're using the correct MailerSend credentials"
          ],
          currentConfig: {
            user: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 15) + "..." : "not set"
          }
        }, { status: 500 });
      }

      // DNS/hostname errors
      if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
        return NextResponse.json({
          success: false,
          error: "SMTP hostname not found",
          details: "Cannot resolve SMTP server hostname",
          suggestions: [
            "Check SMTP_HOST spelling (should be smtp.mailersend.net)",
            "Verify internet connection",
            "Check DNS resolution"
          ],
          currentConfig: {
            host: process.env.SMTP_HOST || "not set"
          }
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: "Check server logs for more information",
      suggestions: [
        "Verify all SMTP environment variables are set correctly",
        "Check MailerSend account status and credentials",
        "Ensure from email domain matches MailerSend domain"
      ]
    }, { status: 500 });
  }
}

export async function GET() {
  // Check environment variables without exposing sensitive data
  const smtpStatus = {
    hasMailerSendApiKey: !!process.env.MAILERSEND_API_KEY,
    hasSmtpHost: !!process.env.SMTP_HOST,
    hasSmtpPort: !!process.env.SMTP_PORT,
    hasSmtpUser: !!process.env.SMTP_USER,
    hasSmtpPass: !!process.env.SMTP_PASS,
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailPass: !!process.env.GMAIL_APP_PASSWORD,
    hasContactFromEmail: !!process.env.CONTACT_FROM_EMAIL,
    mailerSendApiKey: process.env.MAILERSEND_API_KEY ? process.env.MAILERSEND_API_KEY.substring(0, 15) + "..." : "not set",
    smtpHost: process.env.SMTP_HOST || "not set",
    smtpPort: process.env.SMTP_PORT || "not set",
    smtpUser: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 15) + "..." : "not set",
    contactFromEmail: process.env.CONTACT_FROM_EMAIL || "not set",
    nodeEnv: process.env.NODE_ENV,
    sendmailPath: process.env.SENDMAIL_PATH || "/usr/sbin/sendmail",
  };

  const issues: string[] = [];

  // Check email configuration
  const hasMailerSendConfig = smtpStatus.hasMailerSendApiKey && smtpStatus.hasContactFromEmail;
  const hasSmtpConfig = smtpStatus.hasSmtpHost && smtpStatus.hasSmtpUser && smtpStatus.hasSmtpPass;
  const hasGmailConfig = smtpStatus.hasGmailUser && smtpStatus.hasGmailPass;

  if (!hasMailerSendConfig && !hasSmtpConfig && !hasGmailConfig) {
    if (!smtpStatus.hasMailerSendApiKey) issues.push("Missing MAILERSEND_API_KEY environment variable (recommended)");
    if (!smtpStatus.hasSmtpHost) issues.push("Alternative: Missing SMTP_HOST environment variable");
    if (!smtpStatus.hasSmtpUser) issues.push("Alternative: Missing SMTP_USER environment variable");
    if (!smtpStatus.hasSmtpPass) issues.push("Alternative: Missing SMTP_PASS environment variable");
    if (!smtpStatus.hasGmailUser && !smtpStatus.hasGmailPass) {
      issues.push("Alternative: Set GMAIL_USER and GMAIL_APP_PASSWORD");
    }
  }

  if (!smtpStatus.hasContactFromEmail) {
    issues.push("Missing CONTACT_FROM_EMAIL environment variable");
  }

  const isConfigured = hasMailerSendConfig || (hasSmtpConfig || hasGmailConfig) && smtpStatus.hasContactFromEmail;

  return NextResponse.json({
    message: "Email test endpoint. Use POST to send a test email.",
    configured: isConfigured,
    smtp: smtpStatus,
    issues: issues.length > 0 ? issues : null,
    instructions: !isConfigured ? {
      step1: "Set your MailerSend configuration (recommended):",
      envVars: [
        "MAILERSEND_API_KEY=mlsn.db414639726e405bdf0da66af9e1e38f7d444decd7344ffd2813fdb167816a73",
        "CONTACT_FROM_EMAIL=noreply@test-eqvygm0kpqjl0p7w.mlsender.net"
      ],
      step2: "Alternatively, use SMTP:",
      smtpVars: [
        "SMTP_HOST=smtp.mailersend.net",
        "SMTP_PORT=587",
        "SMTP_USER=MS_vExnkE@test-eqvygm0kpqjl0p7w.mlsender.net",
        "SMTP_PASS=mssp.ZNBr34Y.3zxk54vpzxq4jy6v.1V2Lb2b",
        "CONTACT_FROM_EMAIL=noreply@test-eqvygm0kpqjl0p7w.mlsender.net"
      ],
      step3: "Then POST to this endpoint to test email sending"
    } : {
      usage: "POST to this endpoint to send a test email and verify email is working",
      method: hasMailerSendConfig ? "MailerSend API" : hasSmtpConfig ? "SMTP" : "Gmail"
    }
  });
}