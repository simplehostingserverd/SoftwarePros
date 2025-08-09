import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investors | SoftwarePros — Healthcare Software Market Opportunity & Growth',
  description:
    'Investor overview for SoftwarePros: $104B healthcare software market opportunity, proven traction with 100,000+ patients served, technology differentiators, and growth strategy in HIPAA-compliant healthcare platforms.',
  keywords: [
    'softwarepros investors',
    'healthcare software investment',
    'medical software investment opportunity',
    'HIPAA compliant software investment',
    'healthcare technology investment',
    'medical practice software investment',
    'healthcare software market opportunity',
    'medical software market size',
    'healthcare IT investment',
    'telemedicine software investment',
    'EHR software investment',
    'healthcare software growth',
    'medical software traction',
    'healthcare technology differentiators',
    'medical software competitive advantages',
    'healthcare software leadership',
    'medical software growth strategy',
    'healthcare software market forecast',
    'medical software investment overview',
    'healthcare software company investment',
  ],
  alternates: {
    canonical: 'https://softwarepros.org/investors',
  },
  openGraph: {
    title: 'Investors | SoftwarePros — Healthcare Software Market Opportunity & Growth',
    description:
      'Market size, traction, competitive advantages, leadership, and growth plans for SoftwarePros in healthcare software. $104B market opportunity with proven results.',
    url: 'https://softwarepros.org/investors',
    type: 'website',
    images: [
      { 
        url: '/web-app-manifest-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'SoftwarePros Investor Overview' 
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investors | SoftwarePros — Healthcare Software Market Opportunity & Growth',
    description: 'Market size, traction, competitive advantages, leadership, and growth plans for SoftwarePros in healthcare software.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Investor Overview</h1>
          <p className="text-lg text-gray-600">
            SoftwarePros builds secure, HIPAA-compliant healthcare platforms with Fortune 500-grade
            engineering. This page highlights our market, traction, differentiators, and growth plan.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Market Opportunity</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Healthcare software market forecast: ~$104B by 2030</li>
              <li>Target: HIPAA-compliant clinical platforms for SMB clinics and mid-market providers</li>
              <li>Strong tailwinds: telemedicine, AI-assisted care, interoperability mandates (FHIR)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Traction & Outcomes</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>100,000+ patients served across 50+ healthcare providers</li>
              <li>Up to 40% operational cost reduction for clinics through workflow automation</li>
              <li>99.9% uptime across mission-critical systems</li>
              <li>Zero HIPAA violations across client implementations</li>
            </ul>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Technology Differentiators</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Security-first architecture and proprietary HIPAA compliance frameworks</li>
              <li>Interoperability leadership: HL7 v2, FHIR R4, SMART on FHIR</li>
              <li>Cloud-native, auto-scaling platforms with DevOps automation</li>
              <li>AI/MLOps pipelines designed for regulated deployments</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Growth Strategy</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Expand telemedicine, practice management, and AI-assisted documentation</li>
              <li>Geographic expansion and partnerships with EHR vendors and health networks</li>
              <li>Content-driven inbound pipeline; targeted outbound to MSOs and group practices</li>
              <li>Product roadmap: cost calculator, HIPAA compliance suite, integration toolkits</li>
            </ul>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Leadership</h2>
            <p className="text-gray-700 mb-2">Michael Trevino — CEO & Founder</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>15+ years building mission-critical systems for Fortune 500</li>
              <li>Healthcare, security, and compliance expertise</li>
              <li>Track record of delivering regulated software at scale</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Social Proof</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Testimonials: measurable cost savings and reliability improvements</li>
              <li>Certifications/partnerships: HIPAA, SOC 2 alignment, major cloud providers</li>
              <li>Speaking engagements and industry recognition</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-700">For investor inquiries, contact us via the contact form.</p>
            <a href="/contact" className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded">Contact Us</a>
          </div>
        </section>
      </div>
    </div>
  );
}


