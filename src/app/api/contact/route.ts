import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/mailer';

export const runtime = 'nodejs';

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
  website: z.string().url().optional().or(z.literal('').transform(() => undefined)),
  hearAboutUs: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: 'Consent is required',
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
    console.error('Contact form error:', error);
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json({ error: 'Validation failed', details: (error as any).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}