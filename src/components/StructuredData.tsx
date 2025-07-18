'use client';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'service' | 'person';
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: 'Software Pros',
          url: 'https://softwarepros.com',
          logo: 'https://softwarepros.com/logo.png',
          description:
            'Professional HIPAA-compliant medical software solutions for healthcare providers.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Brownsville',
            addressRegion: 'TX',
            addressCountry: 'US',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-956-555-0123',
            contactType: 'customer service',
            email: 'info@softwarepros.com',
          },
          founder: {
            '@type': 'Person',
            name: 'Michael Trevino',
            jobTitle: 'CEO & Founder',
          },
          ...data,
        };

      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: 'Software Pros',
          url: 'https://softwarepros.com',
          description:
            'Professional HIPAA-compliant medical software solutions for healthcare providers.',
          publisher: {
            '@type': 'Organization',
            name: 'Software Pros',
          },
          ...data,
        };

      case 'service':
        return {
          ...baseData,
          '@type': 'Service',
          serviceType: 'Healthcare Software Development',
          provider: {
            '@type': 'Organization',
            name: 'Software Pros',
            url: 'https://softwarepros.com',
          },
          areaServed: {
            '@type': 'Country',
            name: 'United States',
          },
          ...data,
        };

      case 'person':
        return {
          ...baseData,
          '@type': 'Person',
          name: 'Michael Trevino',
          jobTitle: 'CEO & Founder',
          worksFor: {
            '@type': 'Organization',
            name: 'Software Pros',
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Brownsville',
            addressRegion: 'TX',
            addressCountry: 'US',
          },
          ...data,
        };

      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
