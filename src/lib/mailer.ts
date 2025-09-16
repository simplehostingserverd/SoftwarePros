import nodemailer from "nodemailer";

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

// Send all contact emails to admin address (required for MailerSend trial accounts)
const RECIPIENT_EMAIL = process.env.MAILERSEND_ADMIN_EMAIL || "simplehostingserverd@proton.me";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  `no-reply@${process.env.VERCEL_URL || process.env.HOSTNAME || "softwarepros.org"}`;

async function resolveTransport() {
  // Try multiple SMTP configurations in order of preference

  // 1. Explicit SMTP configuration (highest priority)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const port = process.env.SMTP_PORT ? Number.parseInt(process.env.SMTP_PORT, 10) : 587;
    const secure = process.env.SMTP_SECURE === "true" ? true : port === 465;

    console.log(`Attempting SMTP connection to ${process.env.SMTP_HOST}:${port}`);

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: "SSLv3",
        },
        connectionTimeout: 30_000,
        socketTimeout: 30_000,
        logger: process.env.NODE_ENV === "development",
        debug: process.env.NODE_ENV === "development",
      });

      // Test the connection
      await transporter.verify();
      console.log("SMTP connection verified successfully");
      return transporter;
    } catch (error) {
      console.error("SMTP connection failed:", error);
      throw new Error(
        `SMTP configuration error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // 2. Gmail SMTP (if Gmail credentials are provided)
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    console.log("Attempting Gmail SMTP connection");

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      });

      await transporter.verify();
      console.log("Gmail SMTP connection verified successfully");
      return transporter;
    } catch (error) {
      console.error("Gmail SMTP connection failed:", error);
      throw new Error(
        `Gmail configuration error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // 3. Development mode - use Ethereal for testing
  if (process.env.NODE_ENV === "development") {
    console.log("Development mode: Creating Ethereal test account");

    try {
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      console.log("Ethereal test account created successfully");
      return transporter;
    } catch (error) {
      console.error("Ethereal test account creation failed:", error);

      // Final fallback for development - JSON transport
      console.log("Using JSON transport as final fallback");
      return nodemailer.createTransport({
        streamTransport: true,
        newline: "unix",
        buffer: true,
      });
    }
  }

  // 4. Production fallback - try cPanel localhost SMTP
  console.log("Production mode: Attempting localhost SMTP connection");

  try {
    const transporter = nodemailer.createTransport({
      host: "localhost",
      port: 25,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10_000,
      socketTimeout: 10_000,
    });

    await transporter.verify();
    console.log("Localhost SMTP connection verified successfully");
    return transporter;
  } catch (error) {
    console.error("Localhost SMTP failed:", error);

    // Final production fallback - sendmail
    console.log("Attempting sendmail fallback");

    try {
      const transporter = nodemailer.createTransport({
        sendmail: true,
        newline: "unix",
        path: process.env.SENDMAIL_PATH || "/usr/sbin/sendmail",
      });

      console.log("Sendmail transporter created successfully");
      return transporter;
    } catch (sendmailError) {
      console.error("Sendmail fallback failed:", sendmailError);
      throw new Error("No working email transport found. Please configure SMTP settings.");
    }
  }
}

function buildHtmlEmail(data: ContactEmailData) {
  const lines: string[] = [];
  lines.push("<h2>New Contact Form Submission</h2>");
  lines.push('<table cellspacing="0" cellpadding="6" style="border-collapse:collapse">');
  const addRow = (label: string, value?: string) => {
    if (!value) return;
    lines.push(
      `<tr><td style="font-weight:600;border-bottom:1px solid #eee">${label}</td><td style="border-bottom:1px solid #eee">${value}</td></tr>`,
    );
  };
  addRow("Name", data.name);
  addRow("Email", data.email);
  addRow("Phone", data.phone);
  addRow("Company", data.company);
  addRow("Website", data.website);
  addRow("Service Type", data.serviceType);
  addRow("Project Subject", data.subject);
  addRow("Budget", data.budget);
  addRow("Timeline", data.timeline);
  addRow("Preferred Contact Method", data.contactMethod);
  addRow("Best Time to Reach", data.bestTimeToReach);
  addRow("Heard About Us", data.hearAboutUs);
  addRow("Message", data.message);
  lines.push("</table>");
  return lines.join("");
}

function buildTextEmail(data: ContactEmailData) {
  const fields: Array<[string, string | undefined]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company],
    ["Website", data.website],
    ["Service Type", data.serviceType],
    ["Project Subject", data.subject],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
    ["Preferred Contact Method", data.contactMethod],
    ["Best Time to Reach", data.bestTimeToReach],
    ["Heard About Us", data.hearAboutUs],
    ["Message", data.message],
  ];
  return fields
    .filter(([, v]) => !!v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    console.log("Attempting to send contact email...");
    const transporter = await resolveTransport();

    const subjectBase = data.subject?.trim() || "New Contact Message";
    const subject = `${subjectBase} - ${data.name} (${data.serviceType || "General"})`;

    const mailOptions = {
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: data.email,
      subject,
      text: buildTextEmail(data),
      html: buildHtmlEmail(data),
    };

    const info = await (transporter as nodemailer.Transporter).sendMail(mailOptions);

    const preview = nodemailer.getTestMessageUrl?.(info);
    if (preview) {
      // Helpful during development
      console.log("Contact email preview URL:", preview);
    }

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
}
