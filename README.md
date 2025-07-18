# Software Pros - Healthcare Software Solutions Website

A professional, modern website for Software Pros, showcasing HIPAA-compliant medical software solutions for healthcare providers. Built with Next.js 15, MUI Joy Components, and Framer Motion.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with TypeScript, MUI Joy Components, and Framer Motion
- **Responsive Design**: Mobile-first approach with beautiful animations
- **SEO Optimized**: Comprehensive SEO with structured data, sitemap, and meta tags
- **HIPAA Focus**: Specialized content for healthcare software solutions
- **Professional UI**: Clean, modern design with smooth animations
- **Code Quality**: Biome for linting and formatting, strict TypeScript configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: MUI Joy Components
- **Styling**: Tailwind CSS + MUI Joy theming
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **SEO**: next-seo with structured data
- **Code Quality**: Biome (ESLint + Prettier alternative)
- **Font**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd software-pros-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio/Case studies page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading component
│   ├── page.tsx           # Home page
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # Reusable components
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Hero section component
│   ├── Navigation.tsx     # Navigation component
│   ├── ScrollToTop.tsx    # Scroll to top button
│   ├── ServicesOverview.tsx # Services overview
│   └── StructuredData.tsx # SEO structured data
└── public/               # Static assets
```

## 🎨 Design System

The website uses MUI Joy Components with a custom theme focused on:
- **Primary Color**: Blue (#0066CC) - representing trust and professionalism
- **Typography**: Inter font for excellent readability
- **Spacing**: Consistent 8px grid system
- **Animations**: Subtle, professional animations using Framer Motion

## 📱 Pages

1. **Home** (`/`) - Hero section with company overview and services
2. **About** (`/about`) - Detailed company information and founder background
3. **Services** (`/services`) - Comprehensive service offerings
4. **Portfolio** (`/portfolio`) - Case studies and client testimonials
5. **Contact** (`/contact`) - Contact form and company information

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run Biome linter
npm run lint:fix    # Fix linting issues
npm run format      # Format code with Biome
```

## 🌐 SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Structured Data**: JSON-LD structured data for better search visibility
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions
- **Open Graph**: Social media sharing optimization
- **Performance**: Optimized images and code splitting

## 📊 Performance

- **Core Web Vitals**: Optimized for excellent performance scores
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loading
- **Bundle Analysis**: Optimized bundle size with tree shaking

## 🔒 Security

- **TypeScript**: Type safety throughout the application
- **Input Validation**: Zod schema validation for forms
- **XSS Protection**: React's built-in XSS protection
- **HTTPS Ready**: Configured for secure deployment

## 🚀 Deployment

See [CPANELDEPLOYMENTGUIDE.md](./CPANELDEPLOYMENTGUIDE.md) for detailed deployment instructions on cPanel with Node.js.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Software Pros. All rights reserved.

## 📞 Support

For support or questions about this website:
- Email: info@softwarepros.com
- Phone: (956) 555-0123
- Website: https://softwarepros.com

---

**Built with ❤️ by Software Pros - Transforming Healthcare Through Technology**
