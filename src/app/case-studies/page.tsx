import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Software Case Studies | SoftwarePros — Measurable Results',
  description:
    'Detailed case studies showcasing cost reductions, reliability improvements, and HIPAA compliance from SoftwarePros healthcare software implementations. See real results from medical practices, hospitals, and clinics.',
  keywords: [
    'healthcare software case studies',
    'medical software case studies',
    'EHR implementation case studies',
    'HIPAA compliance case studies',
    'medical practice software results',
    'healthcare technology case studies',
    'hospital software case studies',
    'dental software case studies',
    'telemedicine platform case studies',
    'healthcare software outcomes',
    'medical software success stories',
    'healthcare IT case studies',
    'medical practice management case studies',
    'healthcare software cost reduction',
    'medical software reliability',
    'healthcare software compliance',
    'medical software implementation results',
    'healthcare technology outcomes',
    'medical practice software case studies',
    'healthcare software ROI',
  ],
  alternates: {
    canonical: 'https://softwarepros.org/case-studies',
  },
  openGraph: {
    title: 'Healthcare Software Case Studies | SoftwarePros — Measurable Results',
    description:
      'See how SoftwarePros delivers measurable outcomes for healthcare providers: cost savings, uptime improvements, and HIPAA compliance. Real results from medical practices, hospitals, and clinics.',
    url: 'https://softwarepros.org/case-studies',
    type: 'website',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'SoftwarePros Healthcare Software Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Software Case Studies | SoftwarePros — Measurable Results',
    description: 'See how SoftwarePros delivers measurable outcomes for healthcare providers: cost savings, uptime improvements, and HIPAA compliance.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function CaseStudiesPage() {
  const studies = [
    {
      title: 'Multi-Clinic Network: 40% Cost Reduction via Workflow Automation',
      metrics: ['40% lower operational costs', '99.9% uptime', 'Zero HIPAA violations'],
      summary:
        'Automated scheduling, claims, and reporting across a network of clinics. Integrated EHR and billing for end-to-end efficiency.',
    },
    {
      title: 'Telemedicine Platform: 10x Scale During Seasonal Surges',
      metrics: ['100,000+ patients served', 'Auto-scaling', 'Sub-200ms P95 latency'],
      summary:
        'Cloud-native design with autoscaling, observability, and hardened security for high-traffic events.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Case Studies</h1>
          <p className="text-lg text-gray-600">
            Real results from regulated healthcare environments. We focus on measurable outcomes and
            reliability.
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          {studies.map((s) => (
            <article key={s.title} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">{s.title}</h2>
              <ul className="flex flex-wrap gap-2 mb-4">
                {s.metrics.map((m) => (
                  <li key={m} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    {m}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700">{s.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}


