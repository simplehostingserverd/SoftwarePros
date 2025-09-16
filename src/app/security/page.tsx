import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security - SoftwarePros",
  description:
    "Security practices and measures at SoftwarePros - Learn how we protect your data and ensure secure development.",
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Security</h1>
          <p className="text-gray-400">Our commitment to keeping your data and projects secure</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Security Commitment</h2>
            <p className="text-gray-300 mb-4">
              At SoftwarePros, security is not an afterthought—it's built into everything we do. We
              implement industry-leading security practices to protect your data, code, and business
              information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure cloud storage with regular backups</li>
              <li>Access controls and authentication protocols</li>
              <li>Regular security audits and vulnerability assessments</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Secure Development Practices</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Secure coding standards and code reviews</li>
              <li>Automated security testing and vulnerability scanning</li>
              <li>OWASP Top 10 compliance</li>
              <li>Regular dependency updates and security patches</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Compliance & Certifications</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>HIPAA compliance for healthcare applications</li>
              <li>GDPR compliance for data protection</li>
              <li>SOC 2 Type II security controls</li>
              <li>ISO 27001 information security standards</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Infrastructure Security</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Multi-factor authentication for all team accounts</li>
              <li>VPN access for remote development</li>
              <li>Encrypted development environments</li>
              <li>Regular security training for all team members</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Incident Response</h2>
            <p className="text-gray-300 mb-4">
              We have a comprehensive incident response plan in place to quickly identify, contain,
              and resolve any security issues. Our team is available 24/7 to respond to security
              concerns.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Report a Security Issue</h2>
            <p className="text-gray-300">
              If you discover a security vulnerability, please report it immediately to{" "}
              <a
                href="mailto:info@softwarepros.org"
                className="text-purple-400 hover:text-purple-300"
              >
                info@softwarepros.org
              </a>
              . We take all security reports seriously and will respond promptly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
