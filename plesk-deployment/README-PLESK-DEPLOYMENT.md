# Plesk Deployment Guide

This package contains a production-ready Next.js application optimized for Plesk hosting.

## Quick Start

1. **Upload** this entire folder to your Plesk domain's httpdocs directory
2. **Install dependencies**: Run `npm install --production` in the domain directory
3. **Configure environment**: Copy `.env.example` to `.env` and configure your settings
4. **Start application**: Use `npm start` or directly `node app.js` as your startup script

## Plesk Configuration

### Node.js Settings
- **Startup File**: `app.js` (or use `npm start`)
- **Environment**: `production` (automatically set)
- **Node.js Version**: 18+ or latest LTS
- **Production Mode**: Enabled by default via npm scripts

### Environment Variables
Configure these in Plesk or your `.env` file:

```
NODE_ENV=production
PORT=3000
HOSTNAME=localhost

# Email Configuration (choose one)
# Option 1: Custom SMTP
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your-password

# Option 2: Gmail SMTP
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```

### Domain Configuration
- Point your domain to this directory
- Ensure Node.js is enabled for the domain
- Set the startup script to `app.js`

## Files Structure
- `app.js` - Plesk-compatible server entry point
- `server.js` - Alternative server (if needed)
- `.next/` - Built Next.js application
- `public/` - Static assets
- `src/` - Source code
- `package.json` - Dependencies
- `next.config.js` - Next.js configuration

## Support
For deployment issues, check the Plesk logs and ensure:
1. Node.js version is 18+
2. All dependencies are installed
3. Environment variables are set correctly
4. Domain is properly configured

## Security Notes
- Never commit `.env` files with real credentials
- Ensure HTTPS is enabled in Plesk
- Configure proper firewall rules