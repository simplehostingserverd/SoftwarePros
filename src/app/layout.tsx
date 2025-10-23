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
    default: "SoftwarePros | Financial Technology, Blockchain & Real Estate Software Development",
    template: "%s | SoftwarePros",
  },
  description:
    "SoftwarePros - Leading Rio Grande Valley software development company in Harlingen, TX specializing in Financial Services, Wealth Management, Cryptocurrency & Blockchain, Real Estate Technology, and AI/ML Solutions. Professional B2B software consulting for RGV enterprises.",
  keywords: [
    "software development",
    "custom software solutions",
    "tech consulting",
    "Rio Grande Valley software developers",
    "Harlingen TX software development",
    "RGV software company",
    "South Texas software developers",
    "Valley software development",
    "Brownsville software developers",
    "McAllen software development",

    // Financial Services & FinTech
    "financial services software",
    "fintech development RGV",
    "wealth management software Texas",
    "portfolio management systems",
    "trading platform development",
    "banking software solutions",
    "payment processing systems",
    "financial analytics software",
    "robo-advisor development",
    "investment management software",
    "financial compliance software",
    "risk management systems",
    "financial forecasting AI",

    // Cryptocurrency & Blockchain
    "blockchain development RGV",
    "cryptocurrency software Texas",
    "crypto exchange development",
    "crypto wallet development",
    "DeFi application development",
    "smart contract development",
    "NFT platform development",
    "crypto hardware building",
    "Web3 development Texas",
    "blockchain consulting RGV",
    "crypto trading bot development",
    "tokenization platforms",

    // Real Estate Technology
    "real estate software development",
    "property management software RGV",
    "real estate CRM Texas",
    "MLS integration systems",
    "real estate analytics software",
    "property listing platforms",
    "real estate investment software",
    "real estate transaction management",
    "commercial real estate software",
    "virtual tour solutions",

    // AI & Machine Learning
    "AI development RGV",
    "machine learning Texas",
    "predictive analytics",
    "AI trading algorithms",
    "natural language processing",
    "computer vision development",
    "MLOps consulting",

    // Enterprise & B2B
    "B2B software development",
    "enterprise software",
    "web application development",
    "mobile app development",
    "startup technology solutions",
    "software architecture",
    "digital transformation",
    "technology consulting",
    "cloud infrastructure",
    "API development",
    "software consulting services Valley",
    "enterprise software development RGV",
    "custom application development Texas",
    "software architecture consulting Valley",
    "digital transformation consulting RGV",
    "technology strategy consulting Texas",
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
    title: "SoftwarePros.org | FinTech, Blockchain & Real Estate Software Development",
    description:
      "Professional B2B software development for Financial Services, Wealth Management, Cryptocurrency & Blockchain, Real Estate Technology, AI/ML, and Full-Stack Web & Mobile Applications. Enterprise solutions for growing businesses.",
    images: [
      {
        url: "/images/softwarepros-logo.png",
        width: 512,
        height: 512,
        alt: "SoftwarePros - FinTech, Blockchain & Real Estate Software",
      },
      {
        url: "/images/softwarepros-logo.png",
        width: 1200,
        height: 630,
        alt: "SoftwarePros Financial Technology & Blockchain Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@softwareprosdev",
    creator: "@softwareprosdev",
    title: "SoftwarePros.org | FinTech, Blockchain & Real Estate Software",
    description:
      "Professional B2B software development for Financial Services, Cryptocurrency, Real Estate Technology, AI/ML, and Full-Stack Web & Mobile Applications.",
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
    "geo.placename": "Harlingen, Texas, Rio Grande Valley",
    "geo.position": "26.1906;-97.6961",
    ICBM: "26.1906, -97.6961",
    "geo.region.name": "Rio Grande Valley",
    "geo.locality": "Harlingen",
    "geo.state": "Texas",
    "geo.country": "United States",
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
      "Leading Rio Grande Valley software development company in Harlingen, TX providing professional B2B solutions for Financial Services, Wealth Management, Cryptocurrency & Blockchain, Real Estate Technology, AI/ML, and Full-Stack Web & Mobile Applications. Enterprise software consulting throughout South Texas and beyond.",
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
    areaServed: [
      {
        "@type": "Place",
        name: "Rio Grande Valley",
        geo: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "26.1906",
            longitude: "-97.6961",
          },
          geoRadius: "50 miles",
        },
      },
      {
        "@type": "Place",
        name: "Harlingen, TX",
        geo: {
          "@type": "GeoCoordinates",
          latitude: "26.1906",
          longitude: "-97.6961",
        },
      },
      {
        "@type": "Place",
        name: "Brownsville, TX",
      },
      {
        "@type": "Place",
        name: "McAllen, TX",
      },
      {
        "@type": "Place",
        name: "South Padre Island, TX",
      },
    ],
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
            name: "Financial Services & FinTech Software",
            description: "Custom financial technology, wealth management platforms, trading systems, and banking solutions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cryptocurrency & Blockchain Development",
            description: "Crypto exchanges, DeFi applications, smart contracts, Web3 development, and crypto hardware building",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Real Estate Technology Solutions",
            description: "Property management systems, real estate CRM, MLS integration, and investment platforms",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI & Machine Learning",
            description: "Custom AI solutions, predictive analytics, financial forecasting, and intelligent automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web & Mobile Development",
            description: "Custom web applications, progressive web apps, native and cross-platform mobile applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise Software & B2B Solutions",
            description: "Scalable enterprise platforms, cloud infrastructure, API development, and system integration",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technology Consulting",
            description: "Strategic technology consulting, digital transformation, and software architecture",
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
    name: "SoftwarePros - Rio Grande Valley Software Development",
    url: "https://softwarepros.org",
    description:
      "Leading Rio Grande Valley software development company in Harlingen, TX providing professional B2B solutions for Financial Services, Wealth Management, Cryptocurrency & Blockchain, Real Estate Technology, AI/ML, and Full-Stack Web & Mobile Applications. Enterprise consulting throughout South Texas and beyond.",
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
