'use client';

interface StructuredDataProps {
  type:
    | 'organization'
    | 'website'
    | 'service'
    | 'person'
    | 'article'
    | 'breadcrumb'
    | 'faq'
    | 'howto';
  data: Record<string, string | number | boolean | object>;
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
          name: 'SoftwarePros',
          url: 'https://softwarepros.org',
          logo: 'https://softwarepros.org/web-app-manifest-512x512.png',
          description:
            'Professional HIPAA-compliant medical software solutions for healthcare providers.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '950 E. Van Buren St.',
            addressLocality: 'Brownsville',
            addressRegion: 'TX',
            postalCode: '78520',
            addressCountry: 'US',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-956-357-5588',
            contactType: 'customer service',
            email: 'info@softwarepros.org',
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
          name: 'SoftwarePros',
          url: 'https://softwarepros.org',
          description:
            'Professional HIPAA-compliant medical software solutions for healthcare providers.',
          publisher: {
            '@type': 'Organization',
            name: 'SoftwarePros',
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
            streetAddress: '950 E. Van Buren St.',
            addressLocality: 'Brownsville',
            addressRegion: 'TX',
            postalCode: '78520',
            addressCountry: 'US',
          },
          ...data,
        };

      case 'article':
        return {
          ...baseData,
          '@type': 'Article',
          headline: data.headline || 'Software Development Article',
          description: data.description || 'Professional software development insights',
          author: {
            '@type': 'Person',
            name: 'SoftwarePros Team',
            url: 'https://softwarepros.org/about',
          },
          publisher: {
            '@type': 'Organization',
            name: 'SoftwarePros',
            logo: {
              '@type': 'ImageObject',
              url: 'https://softwarepros.org/web-app-manifest-512x512.png',
            },
          },
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url || 'https://softwarepros.org',
          },
          ...data,
        };

      case 'breadcrumb':
        return {
          ...baseData,
          '@type': 'BreadcrumbList',
          itemListElement: data.itemListElement || [],
        };

      case 'faq':
        return {
          ...baseData,
          '@type': 'FAQPage',
          mainEntity: data.mainEntity || [],
        };

      case 'howto':
        return {
          ...baseData,
          '@type': 'HowTo',
          name: data.name || 'Software Development Process',
          description: data.description || 'Step-by-step guide to software development',
          step: data.step || [],
          totalTime: data.totalTime || 'PT1H',
          ...data,
        };

      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(getStructuredData())}
    </script>
  );
}
