# Coolify Deployment Guide

This project is ready for deployment on Coolify using Docker Compose.

## Quick Deploy

1. **Import Project** in Coolify:
   - Select "Docker Compose" as deployment type
   - Connect your GitHub repository
   - Branch: `main`

2. **Environment Variables** (set in Coolify):
   ```
   NODE_ENV=production
   SMTP_HOST=mail.your-domain.com
   SMTP_PORT=587
   SMTP_USER=contact@your-domain.com
   SMTP_PASS=your-smtp-password
   CONTACT_EMAIL=your-email@domain.com
   ```

3. **Domain Configuration**:
   - Primary domain: `softwarepros.org`
   - Alias: `www.softwarepros.org`
   - SSL: Automatic (Let's Encrypt)

## Docker Configuration

### Files Created
- `Dockerfile` - Multi-stage build optimized for production
- `docker-compose.yml` - Coolify-compatible service definition
- `.dockerignore` - Excludes unnecessary files from build
- `src/app/api/health/route.ts` - Health check endpoint

### Features
- **Production optimized** Next.js build
- **Health checks** for container monitoring
- **Automatic SSL** via Traefik labels
- **Environment-based** email configuration
- **Security headers** and performance optimizations

## Environment Options

### Email Configuration (Priority Order)
1. **Custom SMTP** (recommended):
   ```
   SMTP_HOST=mail.your-domain.com
   SMTP_PORT=587
   SMTP_USER=contact@your-domain.com
   SMTP_PASS=your-password
   ```

2. **Gmail SMTP** (alternative):
   ```
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   ```

3. **Localhost SMTP** (automatic fallback)

### Application Settings
```
CONTACT_EMAIL=simplehostingserverd@proton.me
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Coolify Setup Steps

1. **Add New Project** in Coolify
2. **Select Docker Compose** deployment type
3. **Connect Repository**: `https://github.com/your-username/SoftwarePros`
4. **Set Branch**: `main`
5. **Configure Domain**: Add your domain and enable SSL
6. **Add Environment Variables** from the list above
7. **Deploy**: Coolify will build and deploy automatically

## Health Monitoring

- Health check endpoint: `/api/health`
- Container health checks every 30 seconds
- Automatic restart on failure
- Build and runtime logs available in Coolify dashboard

## Performance Features

- Multi-stage Docker build for smaller image size
- Next.js standalone output for optimal container deployment
- Static asset optimization and caching
- Production-grade security headers
- Automatic compression and performance optimizations

## Support

Check Coolify logs if deployment fails:
1. Build logs - for compilation issues
2. Runtime logs - for application errors  
3. Health check logs - for service monitoring

The application will be available at your configured domain once deployed.