import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MarketOpportunityChart = dynamic(() => import('@/components/investors/MarketOpportunityChart'), { ssr: false });
const TractionKPIChart = dynamic(() => import('@/components/investors/TractionKPIChart'), { ssr: false });
const GoToMarketFunnel = dynamic(() => import('@/components/investors/GoToMarketFunnel'), { ssr: false });
const CompetitiveRadar = dynamic(() => import('@/components/investors/CompetitiveRadar'), { ssr: false });
const AskUseOfFunds = dynamic(() => import('@/components/investors/AskUseOfFunds'), { ssr: false });
const MetricsStatCards = dynamic(() => import('@/components/investors/MetricsStatCards'), { ssr: false });

export const metadata: Metadata = {
  title: 'Investors | SoftwarePros — Pitch Deck Overview',
  description:
    'Investor overview for SoftwarePros with market, traction, GTM, competitive edge, and use of funds. Pitch-deck style with interactive charts.',
  alternates: { canonical: 'https://softwarepros.org/investors' },
  openGraph: {
    title: 'Investors | SoftwarePros — Pitch Deck Overview',
    description:
      'Market size, traction, competitive advantages, GTM funnel, and use of funds, presented as an interactive pitch deck.',
    url: 'https://softwarepros.org/investors',
    type: 'website',
    images: [{ url: '/web-app-manifest-512x512.png', width: 512, height: 512, alt: 'SoftwarePros Investor Overview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investors | SoftwarePros — Pitch Deck Overview',
    description: 'Interactive charts showcasing market, traction, GTM, and more.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200 via-white to-transparent" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              SoftwarePros Investor Overview
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              HIPAA-grade healthcare platforms. Enterprise reliability. Efficient go-to-market.
            </p>
            <div className="mt-8">
              <MetricsStatCards />
            </div>
          </div>
        </div>
      </section>

      {/* Market + Traction */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Market Opportunity</h2>
              <span className="text-sm text-gray-500">to 2030</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">Healthcare software TAM forecast approaching $104B.</p>
            <div className="mt-4">
              <MarketOpportunityChart />
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-gray-600">
              <li>Interoperability mandates (FHIR), AI-assisted care, telemedicine growth</li>
              <li>Focus: SMB clinics and mid-market providers</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Traction & Outcomes</h2>
            <p className="mt-2 text-sm text-gray-600">Proven results across providers and patients.</p>
            <div className="mt-4">
              <TractionKPIChart />
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-gray-600">
              <li>100k+ patients served | 50+ providers</li>
              <li>Up to 40% cost reduction via workflow automation</li>
              <li>99.9% uptime | Zero HIPAA violations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Differentiation + Competitive */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Technology Differentiators</h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700">
              <li>Security-first architecture and HIPAA frameworks</li>
              <li>Interoperability: HL7, FHIR R4, SMART on FHIR</li>
              <li>Cloud-native, autoscaling, IaC & DevOps automation</li>
              <li>AI/MLOps pipelines for regulated deployments</li>
            </ul>
            <div className="mt-4">
              <CompetitiveRadar />
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Go-to-Market Funnel</h2>
            <p className="mt-2 text-sm text-gray-600">Efficient B2B motion to MSOs and group practices.</p>
            <div className="mt-4">
              <GoToMarketFunnel />
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-gray-600">
              <li>Inbound content + targeted outbound</li>
              <li>Partnerships with EHR vendors and health networks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Use of Funds + Contact */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Use of Funds</h2>
            <p className="mt-2 text-sm text-gray-600">Balanced between product velocity and GTM scale.</p>
            <div className="mt-4">
              <AskUseOfFunds />
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-gray-600">
              <li>Engineering & Security to maintain HIPAA-grade reliability</li>
              <li>GTM to accelerate market penetration and ARR growth</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Leadership & Contact</h2>
            <p className="mt-2 text-sm text-gray-700">Michael Trevino — CEO & Founder</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700">
              <li>15+ years building Fortune 500-grade systems</li>
              <li>Healthcare, security, and compliance expertise</li>
              <li>Delivered regulated software at scale</li>
            </ul>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


