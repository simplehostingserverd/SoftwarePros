import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Healthcare Software Resources | SoftwarePros — Guides, Checklists & Tools',
  description:
    'Actionable resources for healthcare IT: HIPAA checklists, EHR best practices, integration guides, and calculators to plan budgets and roadmaps.',
  alternates: { canonical: 'https://softwarepros.org/resources' },
};

type Resource = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

const guides: Resource[] = [
  {
    title: 'HIPAA Security Rule Checklist',
    description:
      'Practical checklist aligned to Administrative, Physical, and Technical safeguards.',
    href: '/resources#hipaa-checklist',
    badge: 'Download',
  },
  {
    title: 'EHR Implementation Playbook',
    description: 'A phased approach covering discovery, migration, go‑live, and training.',
    href: '/resources#ehr-playbook',
  },
  {
    title: 'Healthcare Integrations Guide (HL7, FHIR, X12)',
    description: 'Patterns for robust eligibility, claims, and lab interfaces with observability.',
    href: '/resources#integrations',
  },
];

const tools: Resource[] = [
  {
    title: 'Software Cost Calculator',
    description: 'Estimate budget by scope, team composition, security, and hosting model.',
    href: '/resources#cost-calculator',
    badge: 'Live',
  },
  {
    title: 'Risk Register Template',
    description: 'Track threats, likelihood, impact, and mitigations for HIPAA compliance.',
    href: '/resources#risk-register',
  },
  {
    title: 'Vendor Due Diligence Checklist',
    description: 'Questions to evaluate third‑party systems handling PHI, including BAAs.',
    href: '/resources#vendor-dd',
  },
];
import CostCalculator from '@/components/CostCalculator';

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Healthcare IT Resources</h1>
          <p className="mt-4 text-lg text-gray-600">
            Curated guides and tools we use when building HIPAA‑compliant software. No fluff—just
            templates and playbooks your team can use today.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-semibold text-gray-900">Guides & Playbooks</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {guides.map((g) => (
            <article key={g.title} className="rounded-xl border p-6 shadow-sm bg-white">
              <h3 className="font-semibold text-gray-900">{g.title}</h3>
              <p className="mt-2 text-gray-600">{g.description}</p>
              <Link
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                href={g.href}
              >
                {g.badge ? (
                  <span className="mr-2 rounded-md bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">
                    {g.badge}
                  </span>
                ) : null}
                View resource
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Tools & Templates</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {tools.map((t) => (
              <article key={t.title} className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">{t.title}</h3>
                <p className="mt-2 text-gray-600">{t.description}</p>
                <Link
                  className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                  href={t.href}
                >
                  {t.badge ? (
                    <span className="mr-2 rounded-md bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">
                      {t.badge}
                    </span>
                  ) : null}
                  Use template
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-12">
        <div id="hipaa-checklist" className="rounded-2xl border p-6">
          <h3 className="text-xl font-semibold text-gray-900">HIPAA Security Rule Checklist</h3>
          <ul className="mt-4 grid gap-2 md:grid-cols-2 list-disc pl-6 text-gray-700">
            <li>Administrative: policies, training, risk analysis, sanctions</li>
            <li>Physical: facility access, workstation security, device controls</li>
            <li>Technical: access control, audit logs, integrity, encryption, SSO/MFA</li>
            <li>BAAs with vendors handling PHI and defined breach procedures</li>
          </ul>
          <a
            href="/api/resources/hipaa-checklist"
            className="mt-4 inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
          >
            Download PDF
          </a>
        </div>

        <div id="ehr-playbook" className="rounded-2xl border p-6">
          <h3 className="text-xl font-semibold text-gray-900">EHR Implementation Playbook</h3>
          <ol className="mt-4 list-decimal pl-6 text-gray-700 space-y-1">
            <li>Discovery & workflow mapping</li>
            <li>Data migration & validation strategy</li>
            <li>Security model and access provisioning</li>
            <li>Go‑live plan, training, and hypercare</li>
          </ol>
        </div>

        <div id="integrations" className="rounded-2xl border p-6">
          <h3 className="text-xl font-semibold text-gray-900">Integrations Guide</h3>
          <p className="mt-2 text-gray-700">
            Use message queues, retry semantics, and outbox patterns to decouple partner uptime from
            your core workflows. Capture structured error codes and provide human‑actionable
            dashboards for rev‑cycle teams.
          </p>
        </div>

        <div id="cost-calculator" className="rounded-2xl border p-6">
          <CostCalculator />
        </div>

        <div id="risk-register" className="rounded-2xl border p-6">
          <h3 className="text-xl font-semibold text-gray-900">Risk Register Template</h3>
          <p className="mt-2 text-gray-700">
            CSV/Notion template mapping threat → likelihood → impact → mitigation → owner.
          </p>
          <a
            href="/api/resources/risk-register"
            className="mt-4 inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
          >
            Download PDF
          </a>
        </div>

        <div id="vendor-dd" className="rounded-2xl border p-6">
          <h3 className="text-xl font-semibold text-gray-900">Vendor Due Diligence</h3>
          <p className="mt-2 text-gray-700">
            BAA coverage, data residency, encryption, logging, and breach notification SLAs.
          </p>
          <a
            href="/api/resources/vendor-dd"
            className="mt-4 inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
          >
            Download PDF
          </a>
        </div>
      </section>

      <section className="bg-indigo-600">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Need a custom guide or template?
          </h2>
          <p className="mt-3 text-indigo-100">
            Tell us what you’re building—we’ll share a tailored checklist within 48 hours.
          </p>
          <a
            className="inline-flex mt-6 px-6 py-3 rounded-lg bg-white text-indigo-700 font-medium hover:bg-gray-100"
            href="/contact"
          >
            Request help
          </a>
        </div>
      </section>
    </main>
  );
}
