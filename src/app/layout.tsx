import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SoftwarePros | Custom Software Development & Healthcare IT Solutions",
    template: "%s | SoftwarePros",
  },
  description:
    "SoftwarePros - Leading custom software development company specializing in healthcare IT, HIPAA-compliant systems, enterprise solutions, and digital transformation. Professional software consulting for startups and enterprises.",
  keywords: [
    "software development",
    "custom software solutions",
    "tech consulting",
    "web application development",
    "mobile app development",
    "enterprise software",
    "startup technology solutions",
    "software architecture",
    "digital transformation",
    "technology consulting",
    "healthcare software",
    "HIPAA compliance",
    "medical practice management",
    "dental software",
    "hospital management systems",
    "pharmacy software",
    "telemedicine solutions",
    "healthcare IT consulting",
    "medical billing software",
    "electronic health records",
    "EHR EMR systems",
    "practice management software",
    "healthcare technology",
    "medical software development",
    "healthcare consulting",
    "software consulting services",
    "enterprise software development",
    "custom application development",
    "software architecture consulting",
    "digital transformation consulting",
    "technology strategy consulting",
  ],
  authors: [{ name: "SoftwarePros", url: "https://softwarepros.org" }],
  creator: "SoftwarePros",
  publisher: "SoftwarePros",
  metadataBase: new URL("https://softwarepros.org"),
  alternates: {
    canonical: "https://softwarepros.org",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://softwarepros.org",
    siteName: "SoftwarePros",
    title: "SoftwarePros.org | Custom Software Solutions & Tech Consulting",
    description:
      "Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software, HIPAA compliance, and enterprise solutions.",
    images: [
      {
        url: "/images/softwarepros-logo.png",
        width: 512,
        height: 512,
        alt: "SoftwarePros - Custom Software Solutions",
      },
      {
        url: "/images/softwarepros-logo.png",
        width: 1200,
        height: 630,
        alt: "SoftwarePros Healthcare Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@softwareprosdev",
    creator: "@softwareprosdev",
    title: "SoftwarePros.org | Custom Software Solutions & Tech Consulting",
    description:
      "Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software and HIPAA compliance.",
    images: ["/images/softwarepros-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "Software Development Services",
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Brownsville, Texas",
    "geo.position": "25.9018;-97.4975",
    ICBM: "25.9018, -97.4975",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    name: "SoftwarePros",
    alternateName: "Software Pros",
    url: "https://softwarepros.org",
    logo: {
      "@type": "ImageObject",
      url: "https://softwarepros.org/web-app-manifest-512x512.png",
      width: 512,
      height: 512,
    },
    description:
      "Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software, HIPAA compliance, and enterprise solutions.",
    foundingDate: "2020",
    numberOfEmployees: "10-50",
    industry: "Software Development",
    sector: "Technology",
    address: {
      "@type": "PostalAddress",
      streetAddress: "222 E. Van Buren Ave.",
      addressLocality: "Harlingen",
      addressRegion: "TX",
      postalCode: "78550",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-956-357-5588",
        contactType: "customer service",
        email: "info@softwarepros.org",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-956-357-5588",
        contactType: "technical support",
        email: "info@softwarepros.org",
        availableLanguage: "English",
      },
    ],
    founder: {
      "@type": "Person",
      name: "Michael Trevino",
      jobTitle: "CEO & Founder",
      url: "https://softwarepros.org/about",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Healthcare Software Development",
            description: "HIPAA-compliant medical software solutions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise Software Development",
            description: "Custom enterprise solutions for large organizations",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technology Consulting",
            description: "Strategic technology consulting services",
          },
        },
      ],
    },
    sameAs: [
      "https://www.linkedin.com/in/michael-trevino-538480375/",
      "https://x.com/softwareprosdev",
      "https://github.com/softwarepros",
      "https://instagram.com/softwareprosdev",
    ],
  };

  const websiteData = {
    name: "SoftwarePros - Custom Software Solutions",
    url: "https://softwarepros.org",
    description:
      "Professional software development, consulting, and digital solutions for startups and enterprises. Specializing in healthcare software, HIPAA compliance, and enterprise solutions.",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://softwarepros.org/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "SoftwarePros",
      url: "https://softwarepros.org",
    },
    mainEntity: {
      "@type": "Organization",
      name: "SoftwarePros",
      url: "https://softwarepros.org",
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
        <StructuredData type="organization" data={organizationData} />
        <StructuredData type="website" data={websiteData} />
        <StructuredData
          type="howto"
          data={{
            name: "Contact SoftwarePros",
            description: "How to contact SoftwarePros for software development services",
            step: [
              { "@type": "HowToStep", name: "Visit website", url: "https://softwarepros.org" },
              {
                "@type": "HowToStep",
                name: "Open contact page",
                url: "https://softwarepros.org/contact",
              },
              {
                "@type": "HowToStep",
                name: "Submit form",
                url: "https://softwarepros.org/contact",
                itemListElement: [
                  { "@type": "HowToDirection", text: "Provide your name and email" },
                  { "@type": "HowToDirection", text: "Describe your project" },
                ],
              },
            ],
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
