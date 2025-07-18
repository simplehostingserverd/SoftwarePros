import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SoftwarePros.org | Custom Software Solutions & Tech Consulting',
    template: '%s | SoftwarePros.org',
  },
  description:
    'Professional software development, consulting, and digital solutions for startups and enterprises. Built by experts. Trusted by businesses.',
  keywords: [
    'software development',
    'custom software solutions',
    'tech consulting',
    'web application development',
    'mobile app development',
    'enterprise software',
    'startup technology solutions',
    'software architecture',
    'digital transformation',
    'technology consulting',
  ],
  authors: [{ name: 'SoftwarePros', url: 'https://softwarepros.org' }],
  creator: 'SoftwarePros',
  publisher: 'SoftwarePros',
  metadataBase: new URL('https://softwarepros.org'),
  alternates: {
    canonical: 'https://softwarepros.org',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://softwarepros.org',
    siteName: 'SoftwarePros',
    title: 'SoftwarePros.org | Custom Software Solutions & Tech Consulting',
    description:
      'Professional software development, consulting, and digital solutions for startups and enterprises. Built by experts. Trusted by businesses.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SoftwarePros - Custom Software Solutions & Tech Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softwarepros',
    creator: '@softwarepros',
    title: 'SoftwarePros.org | Custom Software Solutions & Tech Consulting',
    description:
      'Professional software development, consulting, and digital solutions for startups and enterprises.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SoftwarePros',
    url: 'https://softwarepros.org',
    logo: 'https://softwarepros.org/logo.png',
    description:
      'Professional software development, consulting, and digital solutions for startups and enterprises.',
    foundingDate: '2020',
    numberOfEmployees: '10-50',
    industry: 'Software Development',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-0123',
      contactType: 'customer service',
      email: 'contact@softwarepros.org',
    },
    sameAs: [
      'https://www.linkedin.com/company/softwarepros',
      'https://twitter.com/softwarepros',
      'https://github.com/softwarepros',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SoftwarePros - Custom Software Solutions',
    url: 'https://softwarepros.org',
    description:
      'Professional software development, consulting, and digital solutions for startups and enterprises.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://softwarepros.org/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
