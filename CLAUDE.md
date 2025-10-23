# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production (creates standalone output)
- `npm start` - Start production server

### Code Quality
- `npm run lint` - Run Biome linter and formatter check
- `npm run lint:fix` - Auto-fix linting issues with Biome
- `npm run format` - Format code with Biome

### Database
- `npx prisma generate` - Generate Prisma client after schema changes
- `npx prisma db push` - Push schema changes to database (development)
- `npx prisma studio` - Open Prisma Studio for database GUI

## Architecture Overview

This is a **Next.js 15 software development company website** specializing in **Financial Services, Real Estate, Local Government, AI, and Blockchain/Crypto solutions** with B2B client onboarding system, authentication, and video meeting capabilities.

### Tech Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Caching/Rate Limiting**: Redis (with fallback to in-memory)
- **Authentication**: NextAuth.js v4 with GitHub OAuth and credentials
- **UI**: MUI Joy Components + Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Video Meetings**: Cloudflare RealtimeKit
- **Email**: Nodemailer with SMTP (cPanel compatible)
- **PDF Generation**: PDFKit
- **Code Quality**: Biome (replaces ESLint/Prettier)
- **Deployment**: Docker with Coolify support

### Project Structure
```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints (NextAuth, 2FA, registration)
│   │   ├── contact/         # Contact form submission
│   │   ├── meeting/         # Cloudflare RealtimeKit video meeting APIs
│   │   ├── onboarding/      # B2B client onboarding system
│   │   ├── presets/         # Configuration presets
│   │   ├── resources/       # PDF resource downloads (compliance, security, risk assessment)
│   │   ├── health/          # Health check endpoint
│   │   └── test-db/         # Database connection testing
│   ├── auth/                # Authentication pages (signin, register, 2FA, error)
│   ├── admin/               # Admin dashboard
│   ├── join/[meetingId]/    # Video meeting room pages
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── services/            # Service pages (financial, real-estate, government, ai, blockchain)
│   ├── case-studies/        # Case studies page
│   ├── faq/                 # FAQ page
│   ├── portfolio/           # Portfolio page
│   ├── feed.xml/            # RSS feed generation
│   ├── manifest.webmanifest/# PWA manifest
│   ├── robots.ts            # Robots.txt generation
│   ├── sitemap.ts           # Sitemap generation
│   ├── layout.tsx           # Root layout with SEO and structured data
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # Reusable React components
│   ├── ClientLayout.tsx     # Client-side layout wrapper
│   ├── Footer.tsx           # Site footer
│   ├── HeroSection.tsx      # Hero component
│   ├── Navigation.tsx       # Navigation menu
│   ├── ScrollToTop.tsx      # Scroll to top button
│   └── StructuredData.tsx   # JSON-LD structured data
├── lib/                     # Utility libraries
│   ├── auth/               # Authentication utilities
│   │   ├── nextauth.ts     # NextAuth.js configuration
│   │   ├── config.ts       # Auth constants and config
│   │   └── security.ts     # Security utilities
│   ├── prisma.ts           # Prisma client singleton
│   ├── db.ts               # Database utilities
│   ├── redis.ts            # Redis connection with fallback
│   ├── rate-limiter.ts     # Rate limiting utilities
│   ├── realtimekit.ts      # Cloudflare RealtimeKit integration
│   ├── mailer.ts           # SMTP email sending
│   ├── email-security.ts   # Email security validation
│   └── email-automation.ts # Automated email workflows
├── hooks/                   # Custom React hooks
└── types/                   # TypeScript type definitions

prisma/
└── schema.prisma           # Database schema (User, Account, Session, Client, Project, etc.)

public/                      # Static assets
├── images/                  # Images and logos
└── resources/               # Downloadable resources (compliance checklists, security templates)
```

### Database Architecture

**Authentication Models** (NextAuth.js schema):
- `User` - Users with email/password or OAuth, 2FA support, role-based access
- `Account` - OAuth account linkage
- `Session` - Session management
- `VerificationToken` - Email verification tokens

**B2B Onboarding Models**:
- `Client` - Company clients with status tracking (LEAD → ONBOARDING → ACTIVE → COMPLETED)
- `Project` - Client projects with scope, budget, status
- `Deliverable` - Project deliverables with files and approvals
- `Milestone` - Project milestones with payment tracking
- `ProjectPhase` - Project phases with tasks
- `Task` - Individual tasks with assignees, priorities, dependencies
- `TeamMember` - Team members with skills
- `OnboardingStep` - Structured onboarding workflow steps
- `ClientAccess` - Track client access credentials (encrypted)
- `Communication` - Scheduled communications and meetings
- `ClientFeedback` - Client feedback and satisfaction ratings
- `ActivityLog` - Audit trail of all system activities
- `EmailTemplate` - Email templates for automation

### Authentication System

**Providers**:
- GitHub OAuth (configured in .env with GITHUB_CLIENT_ID/GITHUB_CLIENT_SECRET)
- Email/Password with bcrypt hashing

**Features**:
- Two-factor authentication (2FA) with TOTP and backup codes
- Account lockout after failed login attempts
- Role-based access control (user, admin)
- Account status management (active, suspended)
- Session management with JWT

**Key Files**:
- `src/lib/auth/nextauth.ts` - NextAuth.js configuration
- `src/app/api/auth/[...nextauth]/route.ts` - Auth endpoint
- `src/app/api/auth/2fa/` - 2FA setup/verify/disable endpoints
- `src/app/api/auth/register/route.ts` - User registration
- `src/app/auth/signin/page.tsx` - Sign in page
- `src/app/auth/register/page.tsx` - Registration page
- `src/app/auth/2fa/page.tsx` - 2FA verification page

### Video Meeting Integration

Uses **Cloudflare RealtimeKit** for secure, scalable video meetings.

**Environment Variables**:
- `CLOUDFLARE_REALTIME_ORG_ID`
- `CLOUDFLARE_REALTIME_API_KEY`
- `CLOUDFLARE_REALTIME_API_URL`

**API Endpoints**:
- `POST /api/meeting/create` - Create new meeting session
- `GET /api/meeting/[id]` - Get meeting details
- `POST /api/meeting/[id]/participants` - Add participant
- `DELETE /api/meeting/[id]/participants/[participantId]` - Remove participant
- `POST /api/meeting/[id]/recordings` - Start recording
- `POST /api/meeting/[id]/recordings/[recordingId]/stop` - Stop recording
- `GET /api/meeting/[id]/transcripts` - Get transcripts

**Meeting Flow**:
1. Create meeting via API → returns `meetingId`
2. Client navigates to `/join/[meetingId]`
3. RealtimeKit handles WebRTC connections and media

### Email Configuration

**SMTP-only configuration** optimized for cPanel hosting:

```bash
SMTP_HOST=your.domain.com
SMTP_PORT=465
SMTP_USER=admin@yourdomain.com
SMTP_PASS=your_password
SMTP_SECURE=true
CONTACT_EMAIL=admin@yourdomain.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com
```

**Email Features**:
- Contact form submissions
- Automated onboarding emails
- Milestone notifications
- 2FA verification codes
- Email security validation (SPF, DKIM, DMARC)
- Rate limiting protection

**Key Files**:
- `src/lib/mailer.ts` - SMTP email sending
- `src/lib/email-security.ts` - Email validation and security
- `src/lib/email-automation.ts` - Automated workflows
- `src/app/api/contact/route.ts` - Contact form handler

### Code Style & Configuration

**Biome Configuration** (`biome.json`):
- 2-space indentation
- 100-character line width
- Auto-organize imports
- Strict TypeScript rules: `noExplicitAny` as error
- Enforces exhaustive dependencies in hooks

**TypeScript Configuration** (`tsconfig.json`):
- Strict mode enabled
- `noImplicitAny: true`
- Path alias: `@/*` maps to `src/*`
- Target: ES2022

**Next.js Configuration** (`next.config.js`):
- Standalone output for Docker deployment
- Image optimization disabled for static export
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Performance optimizations (compression, cache headers)
- Transpiles MUI packages
- Modularized MUI icon imports for smaller bundles

### Environment Variables

Copy `.env.example` to `.env.local` for development. **Required variables**:

**Database**:
- `DATABASE_URL` - PostgreSQL connection string

**Redis** (optional but recommended):
- `REDIS_URL` - Redis connection string
- `REDIS_HOST` - Redis hostname
- `REDIS_PORT` - Redis port (default: 6379)
- `REDIS_PASSWORD` - Redis password (if any)
- `REDIS_DB` - Database number (default: 0)

**Authentication**:
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Site URL (e.g., https://softwarepros.org)
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth secret

**Email**:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`
- `CONTACT_EMAIL`, `CONTACT_FROM_EMAIL`

**Video Meetings**:
- `CLOUDFLARE_REALTIME_ORG_ID`
- `CLOUDFLARE_REALTIME_API_KEY`
- `CLOUDFLARE_REALTIME_API_URL`

**B2B Onboarding**:
- `ONBOARDING_ADMIN_EMAIL` - Admin email for notifications
- `ONBOARDING_PORTAL_URL` - Client portal URL

### Docker Deployment

**Multi-stage Dockerfile** optimized for production:
1. **deps stage**: Install production dependencies
2. **builder stage**: Build Next.js app with Prisma client generation
3. **runner stage**: Minimal production image with standalone output

**Key Features**:
- Node.js 18 Alpine base (minimal size)
- Standalone output for optimal performance
- Non-root user (nextjs:nodejs)
- Health checks via `/api/health`
- Prisma client included in build

**Coolify Deployment**:
1. Import project as "Docker Compose" type
2. Set environment variables (database, Redis, email, auth)
3. Configure domain with automatic SSL (Traefik)
4. Deploy with single click

See `COOLIFY_DEPLOYMENT.md` for detailed deployment guide.

### Rate Limiting & Caching

**Redis Integration** (`src/lib/redis.ts`):
- Primary: Redis connection for production
- Fallback: In-memory Map for development/when Redis unavailable
- Automatic fallback on connection failure

**Rate Limiting** (`src/lib/rate-limiter.ts`):
- API endpoint protection
- Email throttling
- Configurable limits per endpoint
- Uses `rate-limiter-flexible` package

### SEO & Structured Data

**Comprehensive SEO Features**:
- Meta tags with Rio Grande Valley (RGV) targeting
- Open Graph and Twitter Card tags
- JSON-LD structured data (Organization, Website, HowTo)
- Auto-generated sitemap (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- RSS feed (`/feed.xml`)
- Geo-targeting for Harlingen, TX and RGV area

**Structured Data Types** (in `src/components/StructuredData.tsx`):
- Organization
- Website
- HowTo
- Service offerings

### B2B Onboarding System

**4-Step Onboarding Workflow**:
1. **Welcome** - Initial client welcome and documentation
2. **Kickoff** - Project kickoff meeting and setup
3. **Access Setup** - Gather and configure client access credentials
4. **Training** - Client training and handoff

**API Usage**:
```bash
# Create new client
POST /api/onboarding
{
  "companyName": "Company Name",
  "contactName": "John Doe",
  "email": "john@company.com",
  "projectType": "WEB" | "MOBILE" | "HEALTHCARE" | "CONSULTING"
}

# Get client dashboard
GET /api/onboarding?clientId={id}

# Update onboarding step
PUT /api/onboarding?stepId={id}
{
  "status": "COMPLETED"
}
```

**Activity Logging**:
All system activities are automatically logged to `ActivityLog` model for audit trails.

### Testing Endpoints

- `/api/health` - Health check (database connectivity)
- `/api/test-db` - Test PostgreSQL and Redis connections
- `/api/test-email` - Test email configuration
- `/api/meeting/debug` - Debug meeting configuration

### Key Conventions

**File Naming**:
- Pages: `page.tsx` (App Router convention)
- Layouts: `layout.tsx`
- API routes: `route.ts`
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `mailer.ts`)

**Import Paths**:
- Use `@/` alias for absolute imports from `src/`
- Example: `import { prisma } from "@/lib/prisma"`

**Component Patterns**:
- Server Components by default (App Router)
- Client Components: Add `"use client"` directive when using hooks or interactivity
- Example: `ClientLayout.tsx` wraps client-side providers

**Database Access**:
- Always use the Prisma client singleton from `@/lib/prisma`
- Never create new PrismaClient instances

**Error Handling**:
- API routes return proper HTTP status codes with JSON error messages
- Client-side errors display user-friendly messages
- Auth errors use constants from `src/lib/auth/config.ts`
