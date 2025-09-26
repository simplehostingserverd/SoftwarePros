/**
 * Email Security Configuration and Validation
 * Provides DKIM, SPF, and other email security features
 */

export interface EmailSecurityConfig {
  // DKIM configuration
  dkim: {
    enabled: boolean;
    privateKey?: string;
    keySelector?: string;
    domainName?: string;
  };

  // SPF configuration
  spf: {
    enabled: boolean;
    allowedDomains: string[];
    allowedIPs: string[];
  };

  // DMARC configuration
  dmarc: {
    enabled: boolean;
    policy: "none" | "quarantine" | "reject";
    rua?: string;
  };

  // Content security
  content: {
    maxEmailSize: number; // in bytes
    allowedMimeTypes: string[];
    scanForMalware: boolean;
    blockExecutableContent: boolean;
  };

  // Rate limiting (per domain)
  rateLimiting: {
    enabled: boolean;
    maxEmailsPerHour: number;
    maxEmailsPerDay: number;
    burstLimit: number;
  };
}

export const DEFAULT_EMAIL_SECURITY_CONFIG: EmailSecurityConfig = {
  dkim: {
    enabled: false, // Set to true when DKIM keys are configured
    privateKey: process.env.DKIM_PRIVATE_KEY,
    keySelector: process.env.DKIM_KEY_SELECTOR || "default",
    domainName: process.env.DKIM_DOMAIN,
  },

  spf: {
    enabled: true,
    allowedDomains: ["softwarepros.org", "aquareefdirect.com"],
    allowedIPs: [], // Add specific IPs if needed
  },

  dmarc: {
    enabled: false, // Set to true when DMARC is configured
    policy: "none",
    rua: process.env.DMARC_RUA,
  },

  content: {
    maxEmailSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ["text/plain", "text/html", "multipart/alternative", "multipart/mixed"],
    scanForMalware: true,
    blockExecutableContent: true,
  },

  rateLimiting: {
    enabled: true,
    maxEmailsPerHour: 100,
    maxEmailsPerDay: 1000,
    burstLimit: 10,
  },
};

/**
 * Validate SPF record for sender domain
 */
export function validateSPF(domain: string, clientIP: string): { valid: boolean; reason?: string } {
  if (!DEFAULT_EMAIL_SECURITY_CONFIG.spf.enabled) {
    return { valid: true };
  }

  // Basic SPF validation - in production, use a proper SPF library
  const allowedDomains = DEFAULT_EMAIL_SECURITY_CONFIG.spf.allowedDomains;

  if (allowedDomains.some((allowed) => domain.endsWith(allowed))) {
    return { valid: true };
  }

  return {
    valid: false,
    reason: `Domain ${domain} not in allowed SPF domains: ${allowedDomains.join(", ")}`,
  };
}

/**
 * Validate email content for security threats
 */
export function validateEmailContent(
  subject: string,
  html: string,
  text: string,
): { valid: boolean; threats: string[] } {
  const threats: string[] = [];
  const config = DEFAULT_EMAIL_SECURITY_CONFIG.content;

  // Check email size
  const totalSize = Buffer.byteLength(html || "", "utf8") + Buffer.byteLength(text || "", "utf8");
  if (totalSize > config.maxEmailSize) {
    threats.push(`Email size ${totalSize} bytes exceeds limit of ${config.maxEmailSize} bytes`);
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<applet/i,
    /<form/i,
    /<input/i,
    /<meta/i,
    /<link/i,
  ];

  if (config.blockExecutableContent) {
    suspiciousPatterns.forEach((pattern) => {
      if (pattern.test(html)) {
        threats.push(`Blocked potentially executable content: ${pattern}`);
      }
    });
  }

  // Check for excessive links
  const linkCount = (html.match(/<a\s+href=/gi) || []).length;
  if (linkCount > 20) {
    threats.push(`Excessive links detected: ${linkCount} links`);
  }

  // Check for suspicious URLs
  const urlPattern = /https?:\/\/[^\s<>"']+/gi;
  const urls = html.match(urlPattern) || [];
  const suspiciousDomains = ["fake", "malware", "phish", "spam"];

  urls.forEach((url) => {
    if (suspiciousDomains.some((domain) => url.toLowerCase().includes(domain))) {
      threats.push(`Suspicious URL detected: ${url}`);
    }
  });

  return {
    valid: threats.length === 0,
    threats,
  };
}

/**
 * Generate security headers for email
 */
export function generateSecurityHeaders(clientIP?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Security-Scan": "SoftwarePros Email Security v2.0",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "X-Report-Abuse": "Report abuse to: security@softwarepros.org",
  };

  if (clientIP) {
    headers["X-Client-IP"] = clientIP;
    headers["X-Originating-IP"] = clientIP;
  }

  // Add security timestamp
  headers["X-Security-Timestamp"] = new Date().toISOString();

  return headers;
}

/**
 * Log security events for monitoring
 */
export function logSecurityEvent(
  event: "rate_limit" | "validation_failed" | "content_threat" | "spf_failed",
  details: Record<string, any>,
): void {
  const securityLog = {
    timestamp: new Date().toISOString(),
    event,
    details,
    severity: event === "rate_limit" ? "low" : event === "validation_failed" ? "medium" : "high",
  };

  console.warn("Email Security Event:", securityLog);

  // In production, send to security monitoring system
  // Example: sendToSecurityMonitoring(securityLog);
}

/**
 * Comprehensive email security check
 */
export async function performSecurityCheck(
  emailData: {
    to: string;
    from: string;
    subject: string;
    html: string;
    text: string;
  },
  clientIP?: string,
): Promise<{ passed: boolean; reason?: string; details: any }> {
  const details: any = {};

  try {
    // 1. SPF validation
    const domain = emailData.from.split("@")[1];
    const spfResult = validateSPF(domain, clientIP || "");
    details.spf = spfResult;

    if (!spfResult.valid) {
      logSecurityEvent("spf_failed", { domain, clientIP, reason: spfResult.reason });
      return { passed: false, reason: spfResult.reason, details };
    }

    // 2. Content validation
    const contentResult = validateEmailContent(emailData.subject, emailData.html, emailData.text);
    details.content = contentResult;

    if (!contentResult.valid) {
      logSecurityEvent("content_threat", {
        threats: contentResult.threats,
        subject: emailData.subject,
      });
      return {
        passed: false,
        reason: `Content security threats: ${contentResult.threats.join(", ")}`,
        details,
      };
    }

    // 3. Generate security headers
    details.securityHeaders = generateSecurityHeaders(clientIP);

    console.log("Email security check passed:", { domain, clientIP });
    return { passed: true, details };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown security check error";
    logSecurityEvent("validation_failed", { error: errorMsg, emailData });
    return { passed: false, reason: errorMsg, details };
  }
}
