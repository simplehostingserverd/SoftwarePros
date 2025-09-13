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
      subject: "Email Test",
    };

    console.log("Starting email test...");

    const result = await sendContactEmail(testData);

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      messageId: result.messageId,
      preview: result.previewUrl || null,
    });

  } catch (error) {
    console.error("Email test failed:", error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: "Check server logs for more information"
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Email test endpoint. Use POST to send a test email.",
    environmentStatus: {
      hasCustomSMTP: !!(process.env.SMTP_HOST && process.env.SMTP_USER),
      hasGmail: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
      nodeEnv: process.env.NODE_ENV,
      sendmailPath: process.env.SENDMAIL_PATH || "/usr/sbin/sendmail",
    }
  });
}