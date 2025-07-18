import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Software Pros | Healthcare Software Experts',
  description:
    "Learn about Michael Trevino and Software Pros' 15+ years of experience in healthcare software development. Fortune 500 expertise in HIPAA-compliant solutions for medical practices.",
  openGraph: {
    title: 'About Us - Software Pros | Healthcare Software Experts',
    description:
      "Learn about Michael Trevino and Software Pros' expertise in healthcare software development and HIPAA compliance.",
    url: 'https://softwarepros.org/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
