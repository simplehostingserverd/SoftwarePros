# Coolify Deployment Guide for SoftwarePros

## Overview

This guide provides instructions for deploying SoftwarePros to Coolify VPS with security best practices and optimal configuration.

## Prerequisites

- Coolify account with VPS access
- Domain name configured
- Environment variables prepared
- Database (PostgreSQL recommended)
- Redis (for session storage and rate limiting)

## Quick Deployment

### 1. Repository Setup

1. Fork or clone the SoftwarePros repository
2. Ensure all environment variables are configured
3. Push to your Git repository

### 2. Coolify Project Setup

1. **Create New Project**
   - Go to Coolify dashboard
   - Click "New Project"
   - Select "Git Repository"
   - Enter your repository URL

2. **Configure Build Settings**
   - **Build Pack**: Nixpacks (auto-detected)
   - **Node.js Version**: 18.x
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

3. **Environment Variables**

Add these environment variables in Coolify:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
PORT=3000

# Database
DATABASE_URL=postgresql://username:password@host:5432/database

# Redis (for sessions and rate limiting)
REDIS_URL=redis://host:6379

# Authentication
NEXTAUTH_SECRET=your-secure-random-string
NEXTAUTH_URL=https://yourdomain.com

# Email Configuration (choose one)

# MailerSend (Recommended)
MAILERSEND_API_KEY=your-mailersend-api-key
MAILERSEND_ADMIN_EMAIL=admin@yourdomain.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com

# SMTP Configuration
SMTP_HOST=smtp.mailersend.net
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
CONTACT_FROM_EMAIL=noreply@yourdomain.com

# Security
SESSION_SECRET=your-session-secret
ENCRYPTION_KEY=your-encryption-key

# Optional: DKIM for enhanced email deliverability
DKIM_PRIVATE_KEY=your-dkim-private-key
DKIM_KEY_SELECTOR=default
DKIM_DOMAIN=yourdomain.com

# Optional: DMARC
DMARC_RUA=mailto:dmarc-reports@yourdomain.com
```

### 3. Domain Configuration

1. **Add Domain**
   - In Coolify, go to your project
   - Click "Domains"
   - Add your domain (e.g., `yourdomain.com`)

2. **SSL Certificate**
   - Coolify automatically provisions SSL certificates via Let's Encrypt
   - Ensure your domain has proper DNS configuration

### 4. Database Setup

1. **Add PostgreSQL Database**
   - In Coolify, go to "Services"
   - Add "PostgreSQL"
   - Configure database name, username, and password
   - Note the connection details for environment variables

2. **Add Redis**
   - Add "Redis" service
   - Configure for session storage and rate limiting

### 5. Deploy

1. **Initial Deployment**
   - Click "Deploy" in Coolify
   - Monitor build logs
   - Check for any build errors

2. **Health Check**
   - Verify application is running on your domain
   - Check `/api/health` endpoint

## Security Configuration

### Firewall Rules

Coolify automatically configures firewall rules, but ensure these ports are open:
- **80** (HTTP) - Redirected to HTTPS
- **443** (HTTPS) - Main application
- **22** (SSH) - For Coolify management

### Security Headers

The application includes comprehensive security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### Rate Limiting

- Login attempts: 5 per hour per IP
- Password reset: 3 per hour per IP
- Email sending: 10 per hour per IP

### Session Security

- Secure HTTP-only cookies
- 8-hour session duration
- 30-day refresh token duration
- Maximum 3 concurrent sessions per user

## Monitoring and Logs

### Application Logs

- **Access Logs**: `/var/log/coolify/application.log`
- **Error Logs**: `/var/log/coolify/error.log`
- **Nginx Logs**: `/var/log/nginx/`

### Health Checks

- **Endpoint**: `https://yourdomain.com/api/health`
- **Frequency**: Every 30 seconds
- **Timeout**: 10 seconds

### Database Monitoring

- Monitor connection pool usage
- Check for slow queries
- Set up automated backups

## Performance Optimization

### Caching

1. **Static Assets**
   - Automatically cached by Nixpacks
   - 1-year cache for static files
   - Proper cache headers configured

2. **Database**
   - Connection pooling configured
   - Query optimization recommended

3. **Redis**
   - Session storage
   - Rate limiting data
   - Cache for frequently accessed data

### Build Optimization

- **Minification**: Enabled
- **Compression**: Enabled
- **Tree Shaking**: Automatic
- **Image Optimization**: Automatic with Next.js

## Backup Strategy

### Database Backups

1. **Automated Backups**
   - Daily database backups
   - 30-day retention
   - Encrypted storage

2. **Manual Backups**
   - Before major deployments
   - Before configuration changes
   - Export user data regularly

### File Backups

- Application code in Git
- Static assets in cloud storage
- Configuration in environment variables

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Coolify
   - Verify Node.js version compatibility
   - Ensure all dependencies are installed

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check database service status
   - Ensure network connectivity

3. **Email Not Sending**
   - Verify email service configuration
   - Check API keys and credentials
   - Test with `/api/test-email`

4. **Authentication Issues**
   - Check NEXTAUTH_SECRET configuration
   - Verify session configuration
   - Check Redis connectivity

### Debug Mode

Enable debug logging:

```bash
DEBUG_EMAIL=true
NODE_ENV=development
```

### Performance Issues

1. **Slow Loading**
   - Check database query performance
   - Verify Redis connectivity
   - Monitor memory usage

2. **High CPU Usage**
   - Check for memory leaks
   - Monitor concurrent connections
   - Review application logs

## Scaling

### Horizontal Scaling

1. **Load Balancer**
   - Configure Coolify load balancer
   - Add multiple application instances
   - Set up health checks

2. **Database Scaling**
   - Use read replicas for read-heavy workloads
   - Implement connection pooling
   - Consider database clustering

3. **Redis Clustering**
   - For high-traffic applications
   - Session storage across multiple nodes

### Vertical Scaling

- Upgrade VPS resources (CPU, RAM, Storage)
- Monitor resource usage
- Scale based on traffic patterns

## Maintenance

### Regular Tasks

1. **Security Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Regular security audits

2. **Performance Monitoring**
   - Monitor application metrics
   - Database performance
   - User experience metrics

3. **Backup Verification**
   - Test backup restoration
   - Verify data integrity
   - Update backup procedures

### Emergency Procedures

1. **Service Outage**
   - Check Coolify dashboard
   - Review application logs
   - Verify system resources

2. **Security Incident**
   - Isolate affected services
   - Review security logs
   - Notify relevant parties

3. **Data Loss**
   - Restore from backups
   - Verify data integrity
   - Investigate root cause

## Support

### Resources

- **Coolify Documentation**: https://coolify.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Security Best Practices**: Included in this repository

### Contact

For deployment issues:
1. Check Coolify dashboard logs
2. Review application logs
3. Check system resource usage
4. Contact Coolify support if needed

---

**Deployment Status**: ✅ Ready for production deployment

**Security Level**: 🔒 Enterprise-grade security implemented

**Performance**: ⚡ Optimized for production workloads