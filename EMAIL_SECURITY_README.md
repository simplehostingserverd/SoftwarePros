# SoftwarePros Secure Email System

## Overview

The SoftwarePros application now includes a comprehensive, enterprise-grade secure email system built on top of nodemailer with advanced security features. This system provides protection against spam, abuse, and various email-based attacks while maintaining high deliverability.

## Security Features

### 🔒 TLS 1.3 Only
- **Maximum Security**: Uses only TLS 1.3 for encrypted communications
- **Forward Secrecy**: Perfect forward secrecy with modern cipher suites
- **Certificate Validation**: Strict certificate validation prevents man-in-the-middle attacks

### 🛡️ Rate Limiting
- **Configurable Limits**: 10 emails per hour per IP address by default
- **Smart Detection**: Tracks by IP address and email address
- **Automatic Cleanup**: Memory-efficient with automatic cleanup of old entries

### ✅ Input Validation & Sanitization
- **Content Length Limits**: Prevents oversized emails
- **XSS Protection**: Removes potentially malicious HTML/JavaScript
- **Email Format Validation**: Strict email format checking
- **Suspicious Content Detection**: Blocks spam-like content patterns

### 🔐 Security Headers
- **Anti-Abuse Headers**: Comprehensive security headers for abuse reporting
- **Client Tracking**: IP address tracking for security monitoring
- **Content Protection**: XSS protection and content type validation

### 🛡️ SPF & Content Security
- **SPF Validation**: Validates sender domains against allowed lists
- **Content Scanning**: Scans for malicious content patterns
- **Size Limits**: Prevents email bombing attacks

### 📊 Security Monitoring
- **Comprehensive Logging**: Detailed security event logging
- **Threat Detection**: Real-time threat detection and alerting
- **Error Tracking**: Enhanced error handling with security context

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Primary Email Configuration (choose one)

# MailerSend (Recommended)
MAILERSEND_API_KEY=your_api_key
MAILERSEND_ADMIN_EMAIL=admin@yourdomain.com

# SMTP Configuration
SMTP_HOST=aquareefdirect.com
SMTP_PORT=465
SMTP_USER=your_username
SMTP_PASS=your_password

# aquareefdirect.com SMTP Configuration
SMTP_HOST=aquareefdirect.com
SMTP_PORT=465
SMTP_USER=admin@aquareefdirect.com
SMTP_PASS=your_password
SMTP_SECURE=true

# Security Configuration
CONTACT_FROM_EMAIL=noreply@yourdomain.com
DEBUG_EMAIL=false

# Optional: DKIM for enhanced deliverability
DKIM_PRIVATE_KEY=your_dkim_key
DKIM_KEY_SELECTOR=default
DKIM_DOMAIN=yourdomain.com
```

### Security Settings

The system includes these security defaults:

- **Rate Limit**: 10 emails per hour per IP
- **Max Email Size**: 10MB
- **TLS Version**: 1.3 only
- **Content Validation**: Enabled
- **SPF Checking**: Enabled

## Usage

### Basic Email Sending

```typescript
import { sendContactEmail } from '@/lib/mailer';

const emailData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "555-0123",
  company: "Example Corp",
  serviceType: "Web Development",
  message: "Hello, I'd like to discuss a project...",
  subject: "Project Inquiry"
};

// Send with client IP for rate limiting
const result = await sendContactEmail(emailData, clientIP);
```

### Security Features in Action

The secure email system performs these checks automatically:

1. **Input Validation**: Validates and sanitizes all input data
2. **Rate Limiting**: Checks if the sender is within rate limits
3. **Content Security**: Scans content for threats
4. **SPF Validation**: Validates sender domain
5. **Secure Transport**: Uses TLS 1.3 for transmission
6. **Security Headers**: Adds comprehensive security headers

### Response Format

```typescript
{
  messageId: "1234567890@example.com",
  securityInfo: {
    rateLimitPassed: true,
    inputValidated: true,
    inputSanitized: true,
    secureTransport: true,
    securityCheckPassed: true,
    securityDetails: {
      spf: { valid: true },
      content: { valid: true, threats: [] },
      securityHeaders: { ... }
    }
  }
}
```

## Security Monitoring

### Log Events

The system logs these security events:

- **Rate Limit Exceeded**: When users exceed email limits
- **Validation Failed**: When input validation fails
- **Content Threats**: When malicious content is detected
- **SPF Failures**: When SPF validation fails
- **Certificate Errors**: When TLS certificate validation fails

### Error Handling

Security-related errors include detailed information:

```typescript
try {
  await sendContactEmail(emailData, clientIP);
} catch (error) {
  if (error.message.includes("Rate limit")) {
    // Handle rate limiting
  }
  if (error.message.includes("Validation failed")) {
    // Handle validation errors
  }
  if (error.message.includes("Security check failed")) {
    // Handle security violations
  }
}
```

## Best Practices

### For Developers

1. **Always include client IP** for proper rate limiting
2. **Validate input on frontend** before sending to API
3. **Monitor security logs** for abuse patterns
4. **Use environment variables** for all configuration
5. **Test with various email providers** for compatibility

### For System Administrators

1. **Configure DKIM** for better email deliverability
2. **Set up DMARC** for email authentication
3. **Monitor rate limiting** for abuse detection
4. **Configure security monitoring** for alerts
5. **Regular security audits** of email configurations

## Troubleshooting

### Common Issues

**Rate Limiting Errors:**
- Check if the same IP is sending too many emails
- Verify the rate limit configuration
- Consider increasing limits for legitimate use cases

**TLS Connection Errors:**
- Verify SMTP server supports TLS 1.3
- Check firewall settings for outbound TLS connections
- Ensure certificates are valid and trusted

**Validation Errors:**
- Check input data format and length
- Verify email addresses are properly formatted
- Ensure content doesn't contain suspicious patterns

### Debug Mode

Enable debug logging:

```bash
DEBUG_EMAIL=true
```

This will provide detailed logs of all email operations and security checks.

## Performance

- **Rate Limiting**: Minimal performance impact with in-memory storage
- **Validation**: Fast regex-based validation with caching
- **TLS 1.3**: Modern, efficient encryption with hardware acceleration
- **Security Headers**: Minimal overhead with comprehensive protection

## Compliance

This email system helps with:

- **GDPR Compliance**: Data protection and security measures
- **CAN-SPAM Compliance**: Proper headers and unsubscribe mechanisms
- **Email Security Standards**: Modern encryption and authentication
- **Abuse Prevention**: Rate limiting and content filtering

## Support

For security-related issues:

1. Check the security logs in your application logs
2. Verify your environment configuration
3. Test with the email test endpoint: `/api/test-email`
4. Contact security@softwarepros.org for security incidents

---

**Security is our priority.** This system provides enterprise-grade email security while maintaining ease of use and high deliverability.