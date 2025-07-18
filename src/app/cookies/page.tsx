import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - SoftwarePros',
  description:
    'Cookie Policy for SoftwarePros - Learn how we use cookies and similar technologies.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p className="text-gray-300 mb-4">
              Cookies are small text files that are stored on your computer or mobile device when
              you visit our website. They help us provide you with a better experience by
              remembering your preferences and improving our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-gray-300 mb-4">We use cookies for:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Essential website functionality</li>
              <li>Remembering your preferences</li>
              <li>Analytics and performance monitoring</li>
              <li>Improving user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-300">
                  These cookies are necessary for the website to function properly and cannot be
                  disabled.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Analytics Cookies</h3>
                <p className="text-gray-300">
                  These help us understand how visitors interact with our website by collecting
                  anonymous information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Preference Cookies</h3>
                <p className="text-gray-300">
                  These remember your choices and preferences to provide a personalized experience.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-gray-300 mb-4">
              You can control and manage cookies through your browser settings. Please note that
              disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-300">
              If you have questions about our use of cookies, please contact us at{' '}
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

