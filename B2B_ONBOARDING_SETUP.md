# B2B Onboarding System Setup Guide

## Overview

Your B2B onboarding system is now complete with:
- ✅ Complete Prisma database schema with 15+ models
- ✅ Redis integration for rate limiting and caching
- ✅ Real database-backed API endpoints
- ✅ Activity logging and automation
- ✅ Comprehensive client management

## Database Schema

The system includes the following key models:
- **Clients**: Company and contact information
- **Projects**: Project management with phases and tasks
- **OnboardingSteps**: Structured onboarding workflow
- **Deliverables**: Track project deliverables and files
- **Communications**: Schedule and track client interactions
- **ActivityLogs**: Audit trail of all system activities

## Coolify Deployment Setup

### 1. PostgreSQL Database

Your PostgreSQL database is already configured in `.env`:
```
DATABASE_URL="postgresql://postgres:z7WWOM4w4b6eFQlgVe9ACnU15c3U26xwryu0VSzUlVF5n1455YKrzBDS61Y5E5fY@w44wsosso0cgsgss0owk4k0w:5432/postgres?sslmode=verify-full&sslrootcert=/etc/ssl/certs/coolify-ca.crt"
```

### 2. Redis Setup in Coolify

1. **Add Redis Service**:
   - In your Coolify project, click "Add Service"
   - Choose "Redis" from the database services
   - Set a name like "softwarepros-redis"
   - Configure the Redis version (latest is fine)

2. **Get Redis Connection Details**:
   After Redis is deployed, get the internal connection details:
   - **Internal URL**: Usually `redis://redis:6379`
   - **External URL**: `redis://your-redis-host:port`

3. **Update Environment Variables**:
   In your Coolify environment variables, add:
   ```
   REDIS_URL=redis://redis:6379
   REDIS_HOST=redis
   REDIS_PORT=6379
   REDIS_PASSWORD=
   REDIS_DB=0
   ```

### 3. Deploy Database Schema

Run this script from your Coolify deployment:

```bash
# In your deployment environment
npm install
npx prisma generate
npx prisma db push
```

Or use the provided batch script:
```cmd
deploy-auth-schema.bat
```

## Environment Variables Checklist

Ensure these are set in your Coolify environment:

### Database
- ✅ `DATABASE_URL` - PostgreSQL connection string

### Redis
- ⏳ `REDIS_URL` - Redis connection string
- ⏳ `REDIS_HOST` - Redis hostname
- ⏳ `REDIS_PORT` - Redis port (usually 6379)
- ⏳ `REDIS_PASSWORD` - Redis password (if any)
- ⏳ `REDIS_DB` - Redis database number (usually 0)

### Authentication
- ✅ `NEXTAUTH_SECRET` - NextAuth secret key
- ✅ `NEXTAUTH_URL` - Your site URL

### Email
- ✅ `MAILERSEND_API_KEY` - MailerSend API key
- ✅ `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` - SMTP configuration

### B2B Onboarding
- ✅ `ONBOARDING_ADMIN_EMAIL` - Admin email for notifications
- ✅ `ONBOARDING_PORTAL_URL` - Client portal URL

## Testing the Setup

### 1. Test Database Connection
Visit: `https://your-domain.com/api/test-db`

This will test both PostgreSQL and Redis connections.

### 2. Test API Endpoints

**Create a new client**:
```bash
curl -X POST https://your-domain.com/api/onboarding \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "contactName": "John Doe",
    "email": "john@testcompany.com",
    "projectType": "web"
  }'
```

**Get client dashboard**:
```bash
curl "https://your-domain.com/api/onboarding?clientId=CLIENT_ID"
```

## Features

### 1. Client Onboarding Workflow
- 4-step onboarding process
- Automated email notifications
- Progress tracking and analytics
- Resource management

### 2. Project Management
- Project phases and tasks
- Deliverable tracking
- Team assignment
- Milestone management

### 3. Communication Tracking
- Scheduled communications
- Meeting management
- Client feedback collection
- Automated follow-ups

### 4. Activity Logging
- Complete audit trail
- Automated activity tracking
- Performance analytics
- Client satisfaction metrics

### 5. Rate Limiting
- Redis-backed rate limiting
- API protection
- Email throttling
- Fallback to in-memory

## File Structure

```
src/
├── app/api/
│   ├── onboarding/route.ts    # Main onboarding API
│   └── test-db/route.ts       # Database testing
├── lib/
│   ├── db.ts                  # Prisma client setup
│   ├── redis.ts               # Redis connection
│   └── rate-limiter.ts        # Rate limiting utilities
├── types/
│   └── onboarding.ts          # TypeScript definitions
└── components/
    └── OnboardingWorkflow.tsx # React component
```

## Next Steps

1. **Connect Redis**: Add Redis service in Coolify and update environment variables
2. **Deploy Schema**: Run `npx prisma db push` in production
3. **Test System**: Use the `/api/test-db` endpoint to verify connections
4. **Create Test Client**: Use the onboarding form to test the full workflow
5. **Monitor Logs**: Check Coolify logs for any connection issues

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` format and credentials
- Check if PostgreSQL service is running in Coolify
- Ensure SSL certificate is properly configured

### Redis Connection Issues
- Add Redis service in Coolify
- Update `REDIS_URL` with correct hostname
- Use internal Coolify service names (usually `redis:6379`)

### Rate Limiting Issues
- System will fallback to in-memory if Redis fails
- Check Redis logs in Coolify
- Verify Redis environment variables

The system is designed to be resilient and will fall back to in-memory operations if Redis is unavailable, but Redis is recommended for production use.