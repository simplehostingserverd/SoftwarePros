import { sendContactEmail } from "@/lib/mailer";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().min(2),
  serviceType: z.string().min(1),
  message: z.string().min(10),
  subject: z.string().optional(),
  budget: z.string().min(1),
  timeline: z.string().optional(),
  contactMethod: z.string().optional(),
  bestTimeToReach: z.string().min(1),
  website: z
    .string()
    .url()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  hearAboutUs: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consent is required",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const data = contactSchema.parse(payload);

    await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      serviceType: data.serviceType,
      message: data.message,
      subject: data.subject,
      budget: data.budget,
      timeline: data.timeline,
      contactMethod: data.contactMethod,
      bestTimeToReach: data.bestTimeToReach,
      website: data.website,
      hearAboutUs: data.hearAboutUs,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    
    // Handle Zod validation errors
    if (
      error &&
      typeof error === "object" &&
      "issues" in (error as Record<string, unknown>) &&
      Array.isArray((error as Record<string, unknown>).issues)
    ) {
      return NextResponse.json(
        { error: "Validation failed", details: (error as { issues: unknown[] }).issues },
        { status: 400 },
      );
    }
    
    // Handle email sending errors with more detail
    if (error instanceof Error) {
      console.error("Email error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Provide helpful error messages for common email issues
      if (error.message.includes("ECONNREFUSED") || error.message.includes("ENOTFOUND")) {
        return NextResponse.json(
          { error: "Email service temporarily unavailable. Please try again later." },
          { status: 503 }
        );
      }
      
      if (error.message.includes("Authentication failed") || error.message.includes("Invalid login")) {
        return NextResponse.json(
          { error: "Email configuration error. Please contact support." },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
