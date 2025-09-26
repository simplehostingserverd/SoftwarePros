import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "FAQ - SoftwarePros | Healthcare Software Development Questions",
  description:
    "Frequently asked questions about SoftwarePros healthcare software development services, HIPAA compliance, project timelines, and our development process.",
  keywords: [
    "healthcare software FAQ",
    "HIPAA compliance questions",
    "software development FAQ",
    "EHR development questions",
    "healthcare IT questions",
    "medical software FAQ",
    "software development process",
    "healthcare technology questions",
  ],
  alternates: {
    canonical: "https://softwarepros.org/faq",
  },
  openGraph: {
    title: "FAQ - SoftwarePros | Healthcare Software Development Questions",
    description:
      "Get answers to frequently asked questions about our healthcare software development services, HIPAA compliance, and project process.",
    url: "https://softwarepros.org/faq",
    type: "website",
  },
};

export default function FAQPage() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What types of healthcare software do you develop?",
          answer:
            "We specialize in EHR/EMR systems, practice management software, telemedicine platforms, patient portals, mobile health apps, and healthcare integrations. Our solutions are HIPAA-compliant and designed specifically for healthcare organizations.",
        },
        {
          question: "How long does a typical healthcare software project take?",
          answer:
            "Project timelines vary based on complexity. A simple patient portal might take 3-4 months, while a comprehensive EHR system could take 8-12 months. We provide detailed timelines during our initial consultation.",
        },
        {
          question: "Do you work with healthcare organizations of all sizes?",
          answer:
            "Yes, we work with solo practitioners, small clinics, large hospital systems, and everything in between. Our solutions are scalable and can be tailored to organizations of any size.",
        },
        {
          question: "What makes SoftwarePros different from other development companies?",
          answer:
            "We exclusively focus on healthcare software with 15+ years of experience in HIPAA compliance, healthcare workflows, and medical integrations. Our team understands the unique challenges of healthcare technology and regulatory requirements.",
        },
      ],
    },
    {
      category: "HIPAA & Security",
      questions: [
        {
          question: "How do you ensure HIPAA compliance?",
          answer:
            "HIPAA compliance is built into every layer of our development process. We implement encryption, access controls, audit trails, and follow security best practices. We also conduct regular security assessments and provide Business Associate Agreements (BAAs).",
        },
        {
          question: "Do you provide security audits and risk assessments?",
          answer:
            "Yes, we offer comprehensive security audits, HIPAA risk assessments, and SOC2 preparation services. We can audit existing systems and provide detailed remediation plans.",
        },
        {
          question: "What security measures do you implement?",
          answer:
            "We implement end-to-end encryption, multi-factor authentication, role-based access controls, audit logging, secure data backup, and regular security monitoring. All systems are designed with security-first architecture.",
        },
      ],
    },
    {
      category: "Development Process",
      questions: [
        {
          question: "What is your development methodology?",
          answer:
            "We use Agile development with regular sprints, continuous testing, and frequent client feedback. This ensures transparency, quality, and that the final product meets your exact requirements.",
        },
        {
          question: "Do you provide ongoing support and maintenance?",
          answer:
            "Yes, we offer comprehensive support and maintenance packages including bug fixes, security updates, feature enhancements, and 24/7 monitoring. We're committed to long-term partnerships with our clients.",
        },
        {
          question: "Can you integrate with existing healthcare systems?",
          answer:
            "Absolutely. We have extensive experience with HL7 FHIR, X12 EDI, and other healthcare standards. We can integrate with existing EHRs, practice management systems, labs, pharmacies, and insurance providers.",
        },
        {
          question: "Do you provide training and documentation?",
          answer:
            "Yes, we provide comprehensive training for your team, detailed documentation, and ongoing support to ensure successful adoption of your new software system.",
        },
      ],
    },
    {
      category: "Pricing & Process",
      questions: [
        {
          question: "How do you price your projects?",
          answer:
            "We provide transparent, fixed-price quotes for defined project scopes. For ongoing development, we offer hourly rates or monthly retainer packages. All pricing is discussed upfront with no hidden fees.",
        },
        {
          question: "What information do you need to provide a quote?",
          answer:
            "We need to understand your specific requirements, current systems, user count, compliance needs, and timeline. We typically schedule a consultation call to discuss your project in detail.",
        },
        {
          question: "Do you offer free consultations?",
          answer:
            "Yes, we provide free initial consultations to understand your needs, discuss potential solutions, and provide project estimates. There's no obligation and we're happy to answer your questions.",
        },
        {
          question: "What is your payment structure?",
          answer:
            "We typically structure payments in milestones aligned with project phases. This ensures you see progress before making payments and helps manage cash flow for both parties.",
        },
      ],
    },
  ];

  return (
    <>
      {/* Structured Data Schema for FAQ */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.flatMap((category) =>
            category.questions.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          ),
        })}
      </Script>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl leading-8 text-gray-600 mb-8">
                Get answers to common questions about our healthcare software development services,
                HIPAA compliance, project process, and more.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Important Notice</h2>
                <p className="text-gray-700 leading-relaxed">
                  SoftwarePros.org is not affiliated in any way with SoftwarePros.com or 'Software
                  Pros' (or any similarly named entities in New York City or elsewhere). Any claims,
                  complaints, or reviews pertaining to those organizations do not apply to us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqs.map((category) => (
                <div key={category.category} className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b border-gray-200">
                    {category.category}
                  </h2>
                  <div className="space-y-6">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                        <p className="text-gray-700 leading-7">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're here to help! Contact us for a free consultation to discuss your specific
              healthcare software needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors shadow-lg"
              >
                Contact Us
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border border-white text-lg font-medium rounded-lg text-white hover:bg-blue-700 transition-colors"
              >
                View Services
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
