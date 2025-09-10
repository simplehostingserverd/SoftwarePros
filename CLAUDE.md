# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (Next.js dev)
- `npm run build` - Build for production (includes Prisma generate)
- `npm start` - Start production server using custom server.js
- `npm run start:next` - Start using Next.js built-in server
- `npm run start:cpanel` - Start using cPanel-compatible app.js

### Code Quality
- `npm run lint` - Run Biome linter and formatter check
- `npm run lint:fix` - Auto-fix linting issues with Biome
- `npm run format` - Format code with Biome

### Database
- `npm run db:seed` - Seed the database using Prisma
- Database uses PostgreSQL with Prisma ORM

### Deployment
- `npm run optimize` - Convert images and build for production
- `npm run convert-images` - Optimize images for web

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **UI**: MUI Joy Components + Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Prisma adapter
- **Animations**: Framer Motion
- **Code Quality**: Biome (replaces ESLint/Prettier)
- **Deployment**: Custom Node.js servers for production/cPanel

### Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── about/
│   ├── contact/
│   ├── portfolio/
│   ├── services/
│   └── layout.tsx    # Root layout with MUI Joy theme
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
└── lib/             # Utility functions and configurations

prisma/
├── schema.prisma    # Database schema (PostgreSQL)
└── seed.ts          # Database seeding script
```

### Key Configuration Files
- `next.config.js` - Next.js configuration with cPanel optimizations
- `biome.json` - Code formatting and linting rules (2-space indentation, 100-char line width)
- `tsconfig.json` - TypeScript configuration with strict settings
- `tailwind.config.js` - Tailwind CSS configuration
- `server.js` - Custom production server
- `app.js` - cPanel-compatible server with enhanced logging

### Development Server Options
The project has three server configurations:
1. **Development**: `npm run dev` (standard Next.js dev server)
2. **Production**: `npm start` (uses server.js)
3. **cPanel**: `npm run start:cpanel` (uses app.js with cPanel optimizations)

### Database Schema
- **User model**: Authentication with roles (USER/ADMIN)
- **Image model**: File upload management with user relations
- Uses Prisma migrations and seeding

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
- Prisma generate runs automatically before build

### Email Configuration
The contact form requires email configuration. See `EMAIL_SETUP.md` for detailed instructions.

**Quick Setup for cPanel:**
1. Create email account in cPanel
2. Set environment variables:
   ```
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=contact@yourdomain.com
   SMTP_PASS=your-password
   ```
3. Emails are automatically sent to `simplehostingserverd@proton.me`

**Environment Variables:**
- Copy `.env.example` to `.env.local` for development
- Set production variables in cPanel environment or hosting settings
- The system automatically falls back to localhost SMTP if no configuration is provided