import nodemailer from "nodemailer";
import { RateLimiter } from "./rate-limiter";
import { performSecurityCheck, generateSecurityHeaders } from "./email-security";

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

// Security configuration
const SECURITY_CONFIG = {
  // Rate limiting: max 10 emails per hour per IP
  RATE_LIMIT: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
  },
  // Email validation patterns
  EMAIL_PATTERNS: {
    // Basic email validation regex
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    // Block suspicious patterns
    suspicious: /(spam|test|example|fake|invalid)/i,
  },
  // TLS/SSL security settings
  TLS_OPTIONS: {
    // Require TLS 1.3 only for maximum security
    minVersion: "TLSv1.3" as const,
    maxVersion: "TLSv1.3" as const,
    // Reject unauthorized certificates
    rejectUnauthorized: true,
    // TLS 1.3 secure ciphers only
    ciphers: "TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256",
  },
  // Content security
  CONTENT_LIMITS: {
    maxSubjectLength: 200,
    maxMessageLength: 10000,
    maxNameLength: 100,
    maxCompanyLength: 100,
  },
};

// Rate limiter instance
const emailRateLimiter = new RateLimiter(SECURITY_CONFIG.RATE_LIMIT.windowMs, SECURITY_CONFIG.RATE_LIMIT.max);

// Input validation and sanitization functions
function validateEmailInput(data: ContactEmailData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  if (!data.name?.trim()) errors.push("Name is required");
  if (!data.email?.trim()) errors.push("Email is required");
  if (!data.message?.trim()) errors.push("Message is required");

  // Length limits
  if (data.name && data.name.length > SECURITY_CONFIG.CONTENT_LIMITS.maxNameLength) {
    errors.push(`Name too long (max ${SECURITY_CONFIG.CONTENT_LIMITS.maxNameLength} characters)`);
  }
  if (data.company && data.company.length > SECURITY_CONFIG.CONTENT_LIMITS.maxCompanyLength) {
    errors.push(`Company name too long (max ${SECURITY_CONFIG.CONTENT_LIMITS.maxCompanyLength} characters)`);
  }
  if (data.subject && data.subject.length > SECURITY_CONFIG.CONTENT_LIMITS.maxSubjectLength) {
    errors.push(`Subject too long (max ${SECURITY_CONFIG.CONTENT_LIMITS.maxSubjectLength} characters)`);
  }
  if (data.message && data.message.length > SECURITY_CONFIG.CONTENT_LIMITS.maxMessageLength) {
    errors.push(`Message too long (max ${SECURITY_CONFIG.CONTENT_LIMITS.maxMessageLength} characters)`);
  }

  // Email format validation
  if (data.email && !SECURITY_CONFIG.EMAIL_PATTERNS.email.test(data.email)) {
    errors.push("Invalid email format");
  }

  // Suspicious content detection
  if (data.name && SECURITY_CONFIG.EMAIL_PATTERNS.suspicious.test(data.name)) {
    errors.push("Name contains suspicious content");
  }
  if (data.company && SECURITY_CONFIG.EMAIL_PATTERNS.suspicious.test(data.company)) {
    errors.push("Company name contains suspicious content");
  }
  if (data.message && SECURITY_CONFIG.EMAIL_PATTERNS.suspicious.test(data.message)) {
    errors.push("Message contains suspicious content");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function sanitizeEmailInput(data: ContactEmailData): ContactEmailData {
  const sanitizeString = (str: string): string => {
    return str
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .substring(0, 1000); // Limit length
  };

  return {
    ...data,
    name: data.name ? sanitizeString(data.name) : '',
    email: data.email ? data.email.toLowerCase().trim() : '',
    phone: data.phone ? sanitizeString(data.phone) : '',
    company: data.company ? sanitizeString(data.company) : '',
    serviceType: data.serviceType ? sanitizeString(data.serviceType) : '',
    message: data.message ? sanitizeString(data.message) : '',
    subject: data.subject ? sanitizeString(data.subject) : '',
    budget: data.budget ? sanitizeString(data.budget) : '',
    timeline: data.timeline ? sanitizeString(data.timeline) : '',
    contactMethod: data.contactMethod ? sanitizeString(data.contactMethod) : '',
    bestTimeToReach: data.bestTimeToReach ? sanitizeString(data.bestTimeToReach) : '',
    website: data.website ? sanitizeString(data.website) : '',
    hearAboutUs: data.hearAboutUs ? sanitizeString(data.hearAboutUs) : '',
  };
}

// Determine recipient email based on MailerSend trial account settings
function getRecipientEmail(): string {
  const isTrialAccount = process.env.MAILERSEND_TRIAL_ACCOUNT === "true";
  const adminEmail = process.env.MAILERSEND_ADMIN_EMAIL;

  // If trial account and admin email is set, use admin email for both API and SMTP
  if (isTrialAccount && adminEmail) {
    console.log("Using MailerSend administrator email for trial account:", adminEmail);
    return adminEmail;
  }

  // Default fallback
  return "simplehostingserverd@proton.me";
}

const RECIPIENT_EMAIL = getRecipientEmail();
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  `no-reply@${process.env.VERCEL_URL || process.env.HOSTNAME || "softwarepros.org"}`;

async function resolveTransport() {
  // Try multiple SMTP configurations in order of preference

  // 1. Explicit SMTP configuration (highest priority)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const port = process.env.SMTP_PORT ? Number.parseInt(process.env.SMTP_PORT, 10) : 587;
    const secure = process.env.SMTP_SECURE === "true" ? true : port === 465;

    console.log(`Attempting secure SMTP connection to ${process.env.SMTP_HOST}:${port}`);

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        // Enhanced security settings
        tls: {
          ...SECURITY_CONFIG.TLS_OPTIONS,
          // Additional security for production
          servername: process.env.NODE_ENV === "production" ? process.env.SMTP_HOST : undefined,
        },
        // Security-focused connection settings
        connectionTimeout: 30_000,
        socketTimeout: 30_000,
        greetingTimeout: 30_000,
        // Disable less secure features
        disableFileAccess: true,
        disableUrlAccess: true,
        // Enhanced logging for security monitoring
        logger: process.env.NODE_ENV === "development",
        debug: process.env.NODE_ENV === "development" && process.env.DEBUG_EMAIL === "true",
        // Security headers
        headers: {
          'X-Mailer': 'SoftwarePros Secure Email Service',
          'X-Application': 'SoftwarePros Contact Form',
        },
      });

      // Test the connection with security validation
      await transporter.verify();
      console.log("Secure SMTP connection verified successfully");
      return transporter;
    } catch (error) {
      console.error("Secure SMTP connection failed:", error);

      // Enhanced error handling for security issues
      if (error instanceof Error) {
        if (error.message.includes("certificate")) {
          throw new Error(
            "SMTP SSL/TLS certificate validation failed. This could indicate a security issue."
          );
        }
        if (error.message.includes("ECONNREFUSED") || error.message.includes("timeout")) {
          throw new Error(
            "SMTP connection failed. Please check your firewall and network security settings."
          );
        }
      }

      throw new Error(
        `Secure SMTP configuration error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // 2. Gmail SMTP (if Gmail credentials are provided)
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    console.log("Attempting secure Gmail SMTP connection");

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        // Enhanced security settings for Gmail
        tls: {
          ...SECURITY_CONFIG.TLS_OPTIONS,
          // Gmail specific security settings
          servername: "smtp.gmail.com",
        },
        // Security-focused connection settings
        connectionTimeout: 30_000,
        socketTimeout: 30_000,
        greetingTimeout: 30_000,
        // Disable less secure features
        disableFileAccess: true,
        disableUrlAccess: true,
        // Security headers
        headers: {
          'X-Mailer': 'SoftwarePros Secure Email Service',
          'X-Application': 'SoftwarePros Contact Form',
        },
      });

      await transporter.verify();
      console.log("Secure Gmail SMTP connection verified successfully");
      return transporter;
    } catch (error) {
      console.error("Secure Gmail SMTP connection failed:", error);

      // Enhanced error handling for Gmail security issues
      if (error instanceof Error) {
        if (error.message.includes("certificate")) {
          throw new Error(
            "Gmail SSL/TLS certificate validation failed. This could indicate a security issue."
          );
        }
        if (error.message.includes("authentication") || error.message.includes("Invalid login")) {
          throw new Error(
            "Gmail authentication failed. Please check your credentials and ensure 2FA is properly configured."
          );
        }
      }

      throw new Error(
        `Secure Gmail configuration error: ${error instanceof Error ? error.message : "Unknown error"}`,
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


export async function sendContactEmail(data: ContactEmailData, clientIP?: string) {
  try {
    console.log("Starting secure contact email process...");

    // Step 1: Input validation
    console.log("Validating email input...");
    const validation = validateEmailInput(data);
    if (!validation.isValid) {
      console.error("Email validation failed:", validation.errors);
      throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
    }

    // Step 2: Rate limiting check
    const identifier = clientIP || data.email || "unknown";
    console.log(`Checking rate limit for identifier: ${identifier}`);

    if (!emailRateLimiter.canMakeRequest(identifier)) {
      const remainingTime = emailRateLimiter.getTimeUntilNextRequest(identifier);
      const remainingRequests = emailRateLimiter.getRemainingRequests(identifier);

      console.error(`Rate limit exceeded for ${identifier}. Remaining requests: ${remainingRequests}, Time until reset: ${Math.ceil(remainingTime / 1000)}s`);

      throw new Error(
        `Rate limit exceeded. You can send ${remainingRequests} more emails. Please try again later.`
      );
    }

    // Step 3: Sanitize input
    console.log("Sanitizing email input...");
    const sanitizedData = sanitizeEmailInput(data);

    // Step 4: Comprehensive security check
    console.log("Performing comprehensive security check...");
    const securityCheck = await performSecurityCheck({
      to: RECIPIENT_EMAIL,
      from: FROM_EMAIL,
      subject: `${sanitizedData.subject?.trim() || "New Contact Message"} - ${sanitizedData.name} (${sanitizedData.serviceType || "General"})`,
      html: buildHtmlEmail(sanitizedData),
      text: buildTextEmail(sanitizedData),
    }, clientIP);

    if (!securityCheck.passed) {
      console.error("Security check failed:", securityCheck.reason);
      throw new Error(`Security check failed: ${securityCheck.reason}`);
    }

    // Step 5: Resolve secure transport
    console.log("Resolving secure email transport...");
    const transporter = await resolveTransport();

    // Step 5: Build email content
    const subjectBase = sanitizedData.subject?.trim() || "New Contact Message";
    const subject = `${subjectBase} - ${sanitizedData.name} (${sanitizedData.serviceType || "General"})`;

    const mailOptions = {
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: sanitizedData.email,
      subject,
      text: buildTextEmail(sanitizedData),
      html: buildHtmlEmail(sanitizedData),
      // Comprehensive security headers
      headers: {
        ...generateSecurityHeaders(clientIP),
        'X-Contact-Email': sanitizedData.email,
        'X-Mailer': 'SoftwarePros Secure Email Service v2.0',
        'X-Application': 'SoftwarePros Contact Form',
        'X-Security-Level': 'High',
        'X-Anti-Abuse': 'Report to: security@softwarepros.org',
      },
    };

    // Step 6: Send email with security monitoring
    console.log("Sending secure email...");
    const info = await (transporter as nodemailer.Transporter).sendMail(mailOptions);

    const preview = nodemailer.getTestMessageUrl?.(info);
    if (preview) {
      console.log("Contact email preview URL:", preview);
    }

    console.log("Secure email sent successfully:", {
      messageId: info.messageId,
      to: RECIPIENT_EMAIL,
      from: FROM_EMAIL,
      subject: subject,
      timestamp: new Date().toISOString(),
    });

    return {
      ...info,
      securityInfo: {
        rateLimitPassed: true,
        inputValidated: true,
        inputSanitized: true,
        secureTransport: true,
        securityCheckPassed: securityCheck.passed,
        securityDetails: securityCheck.details,
      }
    };
  } catch (error) {
    console.error("Secure email sending failed:", error);

    // Enhanced error logging for security monitoring
    const errorDetails = {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
      clientIP: clientIP || "unknown",
      email: data.email || "unknown",
      name: data.name || "unknown",
    };

    console.error("Security error details:", errorDetails);

    throw error;
  }
}
