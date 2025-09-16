# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (Next.js dev)
- `npm run build` - Build for production
- `npm start` - Start production server (Next.js built-in)

### Code Quality
- `npm run lint` - Run Biome linter and formatter check
- `npm run lint:fix` - Auto-fix linting issues with Biome
- `npm run format` - Format code with Biome

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **UI**: MUI Joy Components + Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Code Quality**: Biome (replaces ESLint/Prettier)
- **Email**: Nodemailer with SMTP configuration
- **PDF Generation**: PDFKit for resources
- **Deployment**: Docker with Coolify support, Next.js standalone build

### Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── about/        # About page with layout
│   ├── api/          # API routes (contact, resources)
│   ├── contact/      # Contact page with form
│   ├── portfolio/    # Portfolio/case studies
│   ├── services/     # Service pages (web, mobile, healthcare, etc.)
│   ├── investors/    # Investor-focused content
│   └── layout.tsx    # Root layout with MUI Joy theme
├── components/       # Reusable React components
│   └── investors/    # Investor-specific components
├── hooks/           # Custom React hooks (scroll animations)
└── lib/             # Utility functions (mailer)

scripts/             # Build and deployment scripts
public/              # Static assets and images
```

### Key Configuration Files
- `next.config.js` - Next.js configuration with standalone output for Docker
- `biome.json` - Code formatting and linting rules (2-space indentation, 100-char line width)
- `tsconfig.json` - TypeScript configuration with strict settings
- `tailwind.config.js` - Tailwind CSS configuration
- `Dockerfile` - Multi-stage Docker build for production deployment
- `docker-compose.yml` - Coolify-compatible service definition

### Development & Deployment
- **Development**: `npm run dev` - Next.js development server with hot reloading
- **Production Build**: `npm run build` - Creates optimized standalone build
- **Production Start**: `npm start` - Starts the production server
- **Docker Deployment**: Uses multi-stage Dockerfile for optimized container builds
- **Coolify Support**: Ready for one-click deployment with environment variable configuration

### Key Features
- **Contact Form**: Email integration with multiple SMTP options
- **Resource Downloads**: PDF generation for HIPAA checklists, vendor due diligence
- **Investor Section**: Business metrics, charts, and competitive analysis
- **SEO Optimization**: Structured data, sitemaps, and meta tags

### Code Style
- **Formatter**: Biome (configured for 2-space indentation, 100-char lines)
- **TypeScript**: Strict mode enabled with no implicit any
- **Import organization**: Automatic with Biome
- Path aliases configured: `@/*` maps to `src/*`

### Deployment Notes
- **Docker-first**: Optimized for container deployment with Coolify
- **Multi-stage builds**: Minimal production image size
- **Health checks**: Built-in container health monitoring at `/api/health`
- **SSL/TLS**: Automatic Let's Encrypt certificates via Traefik labels
- **Performance**: Next.js standalone output for optimal container deployment
- **Environment-based configuration**: All settings configurable via environment variables

### Email Configuration
The contact form requires email configuration with multiple fallback options:

**Configuration Options (in priority order):**
1. **Custom SMTP** (recommended for cPanel):
   ```
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=contact@yourdomain.com
   SMTP_PASS=your-password
   ```
2. **Gmail SMTP** (alternative):
   ```
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   ```
3. **cPanel Localhost SMTP** (automatic fallback)

**Environment Variables:**
- Copy `.env.example` to `.env.local` for development
- Set production variables in Coolify environment or hosting platform
- Contact emails are sent to `simplehostingserverd@proton.me`
- System automatically falls back through configuration options

## Docker & Deployment

### Quick Deployment with Coolify
1. Import project as "Docker Compose" type
2. Set environment variables for email configuration
3. Configure domain with automatic SSL
4. Deploy with single click

### Key Docker Files
- `Dockerfile` - Multi-stage build (Node 18 Alpine base)
- `docker-compose.yml` - Service definition with health checks
- `COOLIFY_DEPLOYMENT.md` - Complete deployment guide
- `.dockerignore` - Optimized build context