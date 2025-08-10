import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - SoftwarePros",
  description:
    "Privacy Policy for SoftwarePros - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information you provide directly to us, such as when you create an account,
              contact us, or use our services. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Name and contact information</li>
              <li>Company information</li>
              <li>Project requirements and specifications</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Provide and improve our services</li>
              <li>Communicate with you about projects and services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third
              parties without your consent, except as described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
