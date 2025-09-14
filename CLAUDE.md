# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (Next.js dev)
- `npm run build` - Build for production
- `npm start` - Start production server using Next.js built-in server

### Code Quality
- `npm run lint` - Run Biome linter and formatter check
- `npm run lint:fix` - Auto-fix linting issues with Biome
- `npm run format` - Format code with Biome

### Deployment
- `npm run optimize` - Convert images and build for production
- `npm run convert-images` - Optimize images for web
- `npm run postinstall` - Automatically runs build after install

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **UI**: MUI Joy Components + Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Code Quality**: Biome (replaces ESLint/Prettier)
- **Email**: MailerSend API + Nodemailer with SMTP fallback configuration
- **Video Meetings**: Cloudflare RealtimeKit integration
- **PDF Generation**: PDFKit for resources
- **Deployment**: Custom Node.js servers for production/cPanel

### Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── about/        # About page with layout
│   ├── api/          # API routes (contact, resources, meeting, health, test-email)
│   ├── contact/      # Contact page with form
│   ├── portfolio/    # Portfolio/case studies
│   ├── services/     # Service pages (web, mobile, healthcare, etc.)
│   ├── investors/    # Investor-focused content
│   └── layout.tsx    # Root layout with MUI Joy theme
├── components/       # Reusable React components
│   └── investors/    # Investor-specific components
├── hooks/           # Custom React hooks (scroll animations)
└── lib/             # Utility functions (mailer)

scripts/
└── convert-images.js # Image optimization script
```

### Key Configuration Files
- `next.config.js` - Next.js configuration with cPanel optimizations
- `biome.json` - Code formatting and linting rules (2-space indentation, 100-char line width)
- `tsconfig.json` - TypeScript configuration with strict settings
- `tailwind.config.js` - Tailwind CSS configuration
- `server.js` - Custom production server
- `app.js` - cPanel-compatible server with enhanced logging

### Development Server Options
The project uses Next.js standard server configuration:
1. **Development**: `npm run dev` (standard Next.js dev server)
2. **Production**: `npm start` (Next.js production server)

### Key Features
- **Contact Form**: MailerSend API integration with SMTP fallback options
- **Video Meetings**: Cloudflare RealtimeKit integration for secure video calls
- **Resource Downloads**: PDF generation for HIPAA checklists, vendor due diligence, risk registers
- **Investor Section**: Business metrics, charts, and competitive analysis
- **SEO Optimization**: Structured data, sitemaps, and meta tags

### Code Style
- **Formatter**: Biome (configured for 2-space indentation, 100-char lines)
- **TypeScript**: Strict mode enabled with no implicit any
- **Import organization**: Automatic with Biome
- Path aliases configured: `@/*` maps to `src/*`

### Deployment Notes
- Configured for cPanel hosting with Node.js
- Multiple entry points for different hosting environments
- Image optimization and compression built-in
- Security headers and performance optimizations included

### Email Configuration
The contact form uses MailerSend API with SMTP fallback options:

**Primary Configuration (MailerSend API):**
```
MAILERSEND_API_TOKEN=your-mailersend-api-token
```

**Fallback SMTP Options (in priority order):**
1. **Custom SMTP**:
   ```
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=contact@yourdomain.com
   SMTP_PASS=your-password
   ```
2. **Gmail SMTP**:
   ```
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   ```

**Environment Variables:**
- Copy `.env.example` to `.env.local` for development
- Contact emails are sent to `simplehostingserverd@proton.me`
- System automatically falls back from MailerSend to SMTP if API fails

### Video Meeting Configuration
Cloudflare RealtimeKit integration for secure video calls:

```
REALTIMEKIT_API_URL=https://api.cloudflare.com/client/v4/accounts/{account_id}/calls/turn
REALTIMEKIT_API_TOKEN=your-cloudflare-api-token
```

**API Routes:**
- `POST /api/meeting/create` - Create new meeting session
- `GET /api/meeting/[id]` - Join existing meeting
- `GET /api/meeting/debug` - Debug meeting configuration