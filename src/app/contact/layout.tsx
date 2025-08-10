import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact SoftwarePros | Healthcare Software Development & Consulting',
  description:
    'Get in touch with SoftwarePros for expert healthcare software development, HIPAA compliance solutions, and technology consulting. Contact us for a free consultation on your software needs.',
  keywords: [
    'contact softwarepros',
    'healthcare software consultation',
    'HIPAA compliance consulting',
    'medical software development contact',
    'healthcare IT consulting',
    'software development quote',
    'technology consulting services',
    'medical practice software',
    'enterprise software development',
    'software consulting contact',
    'healthcare technology support',
    'medical software support',
    'software development inquiry',
    'healthcare IT support',
    'technology consulting contact',
  ],
  alternates: {
    canonical: 'https://softwarepros.org/contact',
  },
  openGraph: {
    title: 'Contact SoftwarePros | Healthcare Software Development & Consulting',
    description:
      'Get in touch with SoftwarePros for expert healthcare software development, HIPAA compliance solutions, and technology consulting. Contact us for a free consultation.',
    url: 'https://softwarepros.org/contact',
    type: 'website',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Contact SoftwarePros - Healthcare Software Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SoftwarePros | Healthcare Software Development & Consulting',
    description:
      'Get in touch with SoftwarePros for expert healthcare software development, HIPAA compliance solutions, and technology consulting.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
