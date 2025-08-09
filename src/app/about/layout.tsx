import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SoftwarePros | Healthcare Software Development Experts',
  description:
    "Learn about Michael Trevino and SoftwarePros' 15+ years of experience in healthcare software development. Fortune 500 expertise in HIPAA-compliant solutions for medical practices, hospitals, and healthcare organizations.",
  keywords: [
    'about softwarepros',
    'michael trevino softwarepros',
    'healthcare software experts',
    'HIPAA compliance experts',
    'medical software development company',
    'healthcare technology company',
    'software development experts',
    'healthcare IT experts',
    'medical practice software experts',
    'enterprise software development',
    'healthcare software company',
    'medical technology consulting',
    'software development team',
    'healthcare innovation experts',
    'medical software specialists',
    'technology consulting experts',
    'healthcare software experience',
    'medical practice management experts',
    'EHR EMR development experts',
    'healthcare compliance experts',
  ],
  alternates: {
    canonical: 'https://softwarepros.org/about',
  },
  openGraph: {
    title: 'About SoftwarePros | Healthcare Software Development Experts',
    description:
      "Learn about Michael Trevino and SoftwarePros' expertise in healthcare software development and HIPAA compliance. 15+ years of Fortune 500 experience.",
    url: 'https://softwarepros.org/about',
    type: 'website',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'About SoftwarePros - Healthcare Software Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SoftwarePros | Healthcare Software Development Experts',
    description: "Learn about Michael Trevino and SoftwarePros' expertise in healthcare software development and HIPAA compliance.",
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
