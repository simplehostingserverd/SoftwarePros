# Email Configuration for Contact Form

This guide helps you set up email functionality for the contact form on your SoftwarePros website, specifically for cPanel/Namecheap hosting.

## Quick Setup for cPanel (Recommended)

### Step 1: Create Email Account
1. Log into your cPanel
2. Go to "Email Accounts"
3. Create a new email account (e.g., `contact@yourdomain.com`)
4. Set a strong password

### Step 2: Get SMTP Settings
In cPanel, go to "Email" → "Email Accounts" → "Configure Mail Client" for your email account:
- **Incoming Server**: `mail.yourdomain.com` (or provided by host)
- **Outgoing Server**: `mail.yourdomain.com` (or provided by host)
- **Port**: Usually `587` (TLS) or `465` (SSL)
- **Username**: Your full email address
- **Password**: Your email password

### Step 3: Configure Environment Variables
Add these to your hosting environment or `.env.local` file:

```bash
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="contact@yourdomain.com"
SMTP_PASS="your-email-password"
CONTACT_FROM_EMAIL="contact@yourdomain.com"
```

## Alternative Setup Options

### Option 1: Gmail SMTP
If you prefer using Gmail:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use these environment variables:

```bash
GMAIL_USER="your-gmail@gmail.com"
GMAIL_APP_PASSWORD="your-16-character-app-password"
```

### Option 2: Localhost SMTP (Automatic Fallback)
Most cPanel servers have mail servers running locally. If no SMTP settings are provided, the system will automatically try:
- `localhost:25` (most common)
- Sendmail fallback

## Testing the Setup

### Development Testing
1. Set `NODE_ENV="development"` 
2. The system will use Ethereal Email for testing
3. Check console logs for preview URLs

### Production Testing
1. Fill out the contact form on your website
2. Check the server logs for connection status
3. Verify emails are received at `simplehostingserverd@proton.me`

## Troubleshooting

### Common Issues

**"SMTP configuration error"**
- Verify SMTP_HOST, SMTP_USER, and SMTP_PASS are correct
- Check if your email password is correct
- Try port 465 with SMTP_SECURE="true"

**"Connection refused"**
- Your hosting provider might block external SMTP
- Try using localhost settings (remove SMTP_* variables)
- Contact your hosting provider about SMTP restrictions

**"Authentication failed"**
- Double-check username (usually full email address)
- Verify password is correct
- For Gmail, ensure you're using App Password, not regular password

### Namecheap Specific Settings
For Namecheap cPanel hosting:
- SMTP Host: Usually `mail.yourdomain.com`
- Port: `587` (TLS) or `465` (SSL)
- Authentication required: Yes
- Username: Full email address

### Environment Variables in cPanel
To set environment variables in cPanel:
1. Go to "Terminal" or "File Manager"
2. Edit `.env.local` in your app root
3. Or add them through Node.js app settings if available

## Security Notes
- Never commit `.env.local` to version control
- Use strong passwords for email accounts
- Consider using dedicated email for contact form
- Regularly rotate email passwords

## Support
If you continue having issues:
1. Check server logs for detailed error messages
2. Contact your hosting provider about SMTP settings
3. Test with different SMTP configurations