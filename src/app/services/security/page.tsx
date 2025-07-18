import {
  Assessment,
  Backup,
  Lock,
  MonitorHeart,
  Policy,
  Security,
  Shield,
  VerifiedUser,
} from '@mui/icons-material';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security Services - SoftwarePros | Cybersecurity & Data Protection',
  description:
    'Comprehensive security services including penetration testing, security audits, HIPAA compliance, and data protection for healthcare and enterprise applications.',
  openGraph: {
    title: 'Security Services - SoftwarePros',
    description: 'Professional cybersecurity services and data protection solutions.',
    url: 'https://softwarepros.org/services/security',
  },
};

interface SecurityService {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}

const securityServices: SecurityService[] = [
  {
    icon: Assessment,
    title: 'Security Audits & Assessments',
    description:
      'Comprehensive security evaluations to identify vulnerabilities and compliance gaps.',
    features: [
      'Vulnerability assessments',
      'Penetration testing',
      'Code security reviews',
      'Infrastructure audits',
      'Compliance assessments',
    ],
  },
  {
    icon: Shield,
    title: 'HIPAA Compliance',
    description: 'Specialized healthcare security services ensuring HIPAA compliance.',
    features: [
      'HIPAA risk assessments',
      'Business Associate Agreements',
      'Security policies & procedures',
      'Staff training programs',
      'Ongoing compliance monitoring',
    ],
  },
  {
    icon: Lock,
    title: 'Data Protection & Encryption',
    description: 'Advanced data protection strategies and encryption implementations.',
    features: [
      'End-to-end encryption',
      'Database security',
      'API security',
      'Data loss prevention',
      'Secure data transmission',
    ],
  },
  {
    icon: VerifiedUser,
    title: 'Identity & Access Management',
    description: 'Robust authentication and authorization systems.',
    features: [
      'Multi-factor authentication',
      'Single sign-on (SSO)',
      'Role-based access control',
      'Identity federation',
      'Privileged access management',
    ],
  },
  {
    icon: Policy,
    title: 'Security Policies & Training',
    description: 'Comprehensive security governance and employee education.',
    features: [
      'Security policy development',
      'Incident response planning',
      'Employee security training',
      'Security awareness programs',
      'Compliance documentation',
    ],
  },
  {
    icon: MonitorHeart,
    title: 'Security Monitoring & Response',
    description: '24/7 security monitoring and incident response services.',
    features: [
      'Real-time threat monitoring',
      'Incident response',
      'Security event analysis',
      'Threat intelligence',
      'Forensic analysis',
    ],
  },
];

export default function SecurityServicesPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Security className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Security Services</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Protect your business with comprehensive cybersecurity solutions. From HIPAA compliance
            to advanced threat protection, we secure your digital assets.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Get Security Assessment
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-purple-400 mr-3" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Business?</h2>
          <p className="text-gray-400 mb-8">
            Contact us today for a comprehensive security assessment and customized protection
            strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              View Security Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

