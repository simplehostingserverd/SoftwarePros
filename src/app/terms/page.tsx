import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - SoftwarePros',
  description:
    'Terms of Service for SoftwarePros - Learn about our terms and conditions for using our services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using SoftwarePros services, you accept and agree to be bound by the
              terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
            <p className="text-gray-300 mb-4">
              SoftwarePros provides custom software development, consulting, and digital solutions.
              We reserve the right to modify or discontinue services at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Client Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Provide accurate and complete project requirements</li>
              <li>Respond to communications in a timely manner</li>
              <li>Provide necessary access and resources for project completion</li>
              <li>Make payments according to agreed terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-gray-300 mb-4">
              Upon full payment, clients receive ownership of custom-developed software.
              SoftwarePros retains rights to general methodologies and frameworks used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-300 mb-4">
              SoftwarePros shall not be liable for any indirect, incidental, special, or
              consequential damages arising from the use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
            <p className="text-gray-300">
              For questions about these Terms of Service, contact us at{' '}
              <a
                href="mailto:contact@softwarepros.org"
                className="text-purple-400 hover:text-purple-300"
              >
                contact@softwarepros.org
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

