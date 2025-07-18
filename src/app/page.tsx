import CTASection from '@/components/CTASection';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import type { Metadata } from 'next';

// Force dynamic rendering to prevent framer-motion SSG issues
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'SoftwarePros.org | Custom Software Solutions & Tech Consulting',
  description:
    'Professional software development, consulting, and digital solutions for startups and enterprises. Built by experts. Trusted by businesses.',
  alternates: {
    canonical: 'https://softwarepros.org',
  },
  openGraph: {
    title: 'SoftwarePros.org | Custom Software Solutions & Tech Consulting',
    description:
      'Professional software development, consulting, and digital solutions for startups and enterprises. Built by experts. Trusted by businesses.',
    url: 'https://softwarepros.org',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SoftwarePros - Custom Software Solutions & Tech Consulting',
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CTASection />
    </div>
  );
}

