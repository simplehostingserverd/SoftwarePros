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
    'Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software, HIPAA compliance, and enterprise solutions. Built by experts. Trusted by businesses.',
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
    'healthcare software',
    'HIPAA compliance',
    'medical practice management',
    'dental software',
    'hospital management systems',
    'pharmacy software',
    'telemedicine solutions',
    'healthcare IT consulting',
    'medical billing software',
    'electronic health records',
    'EHR EMR systems',
    'practice management software',
    'healthcare technology',
    'medical software development',
    'healthcare consulting',
    'software consulting services',
    'enterprise software development',
    'custom application development',
    'software architecture consulting',
    'digital transformation consulting',
    'technology strategy consulting',
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
      'Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software, HIPAA compliance, and enterprise solutions.',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'SoftwarePros - Custom Software Solutions',
      },
      {
        url: '/images/placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'SoftwarePros Healthcare Software Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softwarepros',
    creator: '@softwarepros',
    title: 'SoftwarePros.org | Custom Software Solutions & Tech Consulting',
    description:
      'Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software and HIPAA compliance.',
    images: ['/web-app-manifest-512x512.png'],
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
  category: 'technology',
  classification: 'Software Development Services',
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Brownsville, Texas',
    'geo.position': '25.9018;-97.4975',
    ICBM: '25.9018, -97.4975',
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
    alternateName: 'Software Pros',
    url: 'https://softwarepros.org',
    logo: {
      '@type': 'ImageObject',
      url: 'https://softwarepros.org/web-app-manifest-512x512.png',
      width: 512,
      height: 512,
    },
    description:
      'Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software, HIPAA compliance, and enterprise solutions.',
    foundingDate: '2020',
    numberOfEmployees: '10-50',
    industry: 'Software Development',
    sector: 'Technology',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '950 E. Van Buren St.',
      addressLocality: 'Brownsville',
      addressRegion: 'TX',
      postalCode: '78520',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-956-357-5588',
        contactType: 'customer service',
        email: 'contact@softwarepros.org',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-956-357-5588',
        contactType: 'technical support',
        email: 'support@softwarepros.org',
        availableLanguage: 'English',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Michael Trevino',
      jobTitle: 'CEO & Founder',
      url: 'https://softwarepros.org/about',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Healthcare Software Development',
            description: 'HIPAA-compliant medical software solutions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Enterprise Software Development',
            description: 'Custom enterprise solutions for large organizations',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Technology Consulting',
            description: 'Strategic technology consulting services',
          },
        },
      ],
    },
    sameAs: [
      'https://www.linkedin.com/company/softwarepros',
      'https://twitter.com/softwarepros',
      'https://github.com/softwarepros',
      'https://www.facebook.com/softwarepros',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SoftwarePros - Custom Software Solutions',
    url: 'https://softwarepros.org',
    description:
      'Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software, HIPAA compliance, and enterprise solutions.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://softwarepros.org/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SoftwarePros',
      url: 'https://softwarepros.org',
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'SoftwarePros',
      url: 'https://softwarepros.org',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="SoftwarePros Blog RSS"
          href="/feed.xml"
        />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'SoftwarePros',
              alternateName: 'Software Pros',
              url: 'https://softwarepros.org',
              description:
                'Professional software development and technology consulting services in Brownsville, Texas',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '950 E. Van Buren St.',
                addressLocality: 'Brownsville',
                addressRegion: 'TX',
                postalCode: '78520',
                addressCountry: 'US',
              },
              telephone: '+1-956-357-5588',
              email: 'contact@softwarepros.org',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 25.9018,
                longitude: -97.4975,
              },
              areaServed: {
                '@type': 'Country',
                name: 'United States',
              },
              serviceArea: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: 25.9018,
                  longitude: -97.4975,
                },
                geoRadius: '50000',
              },
              openingHours: 'Mo-Fr 09:00-17:00',
              priceRange: '$$',
              paymentAccepted: ['Cash', 'Credit Card', 'Check', 'Bank Transfer'],
              currenciesAccepted: 'USD',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://softwarepros.org',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Services',
                  item: 'https://softwarepros.org/services',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'About',
                  item: 'https://softwarepros.org/about',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Contact',
                  item: 'https://softwarepros.org/contact',
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
