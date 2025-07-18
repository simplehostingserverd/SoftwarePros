import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Software Pros | Get Your Healthcare Software Quote',
  description:
    'Contact Software Pros for HIPAA-compliant healthcare software solutions. Get a free consultation for your medical practice, clinic, or hospital software needs.',
  openGraph: {
    title: 'Contact Us - Software Pros',
    description: 'Get in touch for healthcare software solutions and HIPAA compliance consulting.',
    url: 'https://softwarepros.org/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
