import nodemailer from 'nodemailer';

export type ContactEmailData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  message: string;
  subject?: string;
  budget?: string;
  timeline?: string;
  contactMethod?: string;
  bestTimeToReach?: string;
  website?: string;
  hearAboutUs?: string;
};

// Send all contact emails to Proton address as requested
const RECIPIENT_EMAIL = 'simplehostingserverd@proton.me';
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  `no-reply@${process.env.VERCEL_URL || process.env.HOSTNAME || 'softwarepros.org'}`;

async function resolveTransport() {
  // Prefer explicit SMTP if provided
  if (process.env.SMTP_HOST) {
    const port = process.env.SMTP_PORT ? Number.parseInt(process.env.SMTP_PORT, 10) : 587;
    const secure = process.env.SMTP_SECURE === 'true' ? true : port === 465;
    const auth = process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || '' }
      : undefined;

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth,
      // Avoid TLS issues in common dev SMTPs
      tls: { rejectUnauthorized: false },
      connectionTimeout: 15_000,
      socketTimeout: 15_000,
    });
  }

  // In development (or on Windows dev boxes) with no SMTP configured,
  // use an Ethereal account so messages succeed and provide a preview URL.
  if (process.env.NODE_ENV !== 'production') {
    try {
      const testAccount = await nodemailer.createTestAccount();
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    } catch {
      // Fallback to JSON transport to prevent failures entirely
      return nodemailer.createTransport({ jsonTransport: true });
    }
  }

  // Fallback to system sendmail (common on cPanel/Exim) in production Linux
  return nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: process.env.SENDMAIL_PATH || '/usr/sbin/sendmail',
  });
}

function buildHtmlEmail(data: ContactEmailData) {
  const lines: string[] = [];
  lines.push(`<h2>New Contact Form Submission</h2>`);
  lines.push('<table cellspacing="0" cellpadding="6" style="border-collapse:collapse">');
  const addRow = (label: string, value?: string) => {
    if (!value) return;
    lines.push(
      `<tr><td style="font-weight:600;border-bottom:1px solid #eee">${label}</td><td style="border-bottom:1px solid #eee">${value}</td></tr>`
    );
  };
  addRow('Name', data.name);
  addRow('Email', data.email);
  addRow('Phone', data.phone);
  addRow('Company', data.company);
  addRow('Website', data.website);
  addRow('Service Type', data.serviceType);
  addRow('Project Subject', data.subject);
  addRow('Budget', data.budget);
  addRow('Timeline', data.timeline);
  addRow('Preferred Contact Method', data.contactMethod);
  addRow('Best Time to Reach', data.bestTimeToReach);
  addRow('Heard About Us', data.hearAboutUs);
  addRow('Message', data.message);
  lines.push('</table>');
  return lines.join('');
}

function buildTextEmail(data: ContactEmailData) {
  const fields: Array<[string, string | undefined]> = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Company', data.company],
    ['Website', data.website],
    ['Service Type', data.serviceType],
    ['Project Subject', data.subject],
    ['Budget', data.budget],
    ['Timeline', data.timeline],
    ['Preferred Contact Method', data.contactMethod],
    ['Best Time to Reach', data.bestTimeToReach],
    ['Heard About Us', data.hearAboutUs],
    ['Message', data.message],
  ];
  return fields
    .filter(([, v]) => !!v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
}

export async function sendContactEmail(data: ContactEmailData) {
  const transporter = await resolveTransport();

  const subjectBase = data.subject?.trim() || 'New Contact Message';
  const subject = `${subjectBase} - ${data.name} (${data.serviceType || 'General'})`;

  const info = await transporter.sendMail({
    from: FROM_EMAIL,
    to: RECIPIENT_EMAIL,
    replyTo: data.email,
    subject,
    text: buildTextEmail(data),
    html: buildHtmlEmail(data),
  });

  const preview = nodemailer.getTestMessageUrl?.(info);
  if (preview) {
    // Helpful during development
    // eslint-disable-next-line no-console
    console.log('Contact email preview URL:', preview);
  }

  return info;
}
