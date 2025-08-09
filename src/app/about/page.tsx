import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SoftwarePros — Healthcare Software Experts',
  description:
    'We design and build HIPAA-compliant healthcare software. 15+ years delivering secure EHR/EMR, practice management, and enterprise platforms.',
  alternates: { canonical: 'https://softwarepros.org/about' },
};

export default function AboutPage() {
  const stats = [
    { label: 'Years Experience', value: '15+' },
    { label: 'HIPAA Projects', value: '60+' },
    { label: 'Avg. Uptime', value: '99.99%' },
    { label: 'Clients Served', value: '100+' },
  ];

  const values = [
    {
      title: 'Compliance by Design',
      description:
        'Security, auditability, and PHI protection are first-class citizens in our architecture, not afterthoughts.',
    },
    {
      title: 'Outcome Focused',
      description:
        'We ship measurable improvements to clinical workflows, billing accuracy, and patient satisfaction.',
    },
    {
      title: 'Operational Excellence',
      description:
        'SLAs, observability, and incident response baked into delivery so your team sleeps at night.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Building secure healthcare software that clinicians love
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              SoftwarePros is led by Michael Trevino and a small team of senior
              engineers and designers. We specialize in HIPAA-compliant systems—EHR/EMR,
              practice management, telehealth, and integrations with clearinghouses
              and diagnostic platforms.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg border bg-gray-50 p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border p-6 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-900">What we do</h2>
            <ul className="mt-4 space-y-3 text-gray-700 list-disc pl-5">
              <li>EHR/EMR modules, scheduling, eligibility, eRx, eLabs</li>
              <li>HL7, FHIR, X12 270/271/835/837 integrations</li>
              <li>Security reviews, HIPAA risk assessments, SOC2 prep</li>
              <li>Native and cross‑platform mobile apps for clinicians and patients</li>
              <li>Cloud migrations, DevOps, observability, and cost optimization</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our values</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-gray-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border p-8 bg-white shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Leadership</h2>
          <p className="mt-4 text-gray-700">
            Michael Trevino has led teams delivering mission‑critical software for
            Fortune 500 healthcare organizations and fast‑growing practices. He
            partners directly with physician leadership and operations to align
            technology with clinical outcomes, revenue cycle, and compliance.
          </p>
        </div>
      </section>

      <section className="bg-indigo-600">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Need a HIPAA‑compliant product team?
          </h2>
          <p className="mt-3 text-indigo-100">
            We’ll scope your goals and propose a pragmatic roadmap in under a week.
          </p>
          <a
            className="inline-flex mt-6 px-6 py-3 rounded-lg bg-white text-indigo-700 font-medium hover:bg-gray-100"
            href="/contact"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}


