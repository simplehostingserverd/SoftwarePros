import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Software Case Studies | SoftwarePros — Measurable Results",
  description:
    "Detailed case studies showcasing cost reductions, reliability improvements, and HIPAA compliance from SoftwarePros healthcare software implementations. See real results from medical practices, hospitals, and clinics.",
  keywords: [
    "healthcare software case studies",
    "medical software case studies",
    "EHR implementation case studies",
    "HIPAA compliance case studies",
    "medical practice software results",
    "healthcare technology case studies",
    "hospital software case studies",
    "dental software case studies",
    "telemedicine platform case studies",
    "healthcare software outcomes",
    "medical software success stories",
    "healthcare IT case studies",
    "medical practice management case studies",
    "healthcare software cost reduction",
    "medical software reliability",
    "healthcare software compliance",
    "medical software implementation results",
    "healthcare technology outcomes",
    "medical practice software case studies",
    "healthcare software ROI",
  ],
  alternates: {
    canonical: "https://softwarepros.org/case-studies",
  },
  openGraph: {
    title: "Healthcare Software Case Studies | SoftwarePros — Measurable Results",
    description:
      "See how SoftwarePros delivers measurable outcomes for healthcare providers: cost savings, uptime improvements, and HIPAA compliance. Real results from medical practices, hospitals, and clinics.",
    url: "https://softwarepros.org/case-studies",
    type: "website",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "SoftwarePros Healthcare Software Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Software Case Studies | SoftwarePros — Measurable Results",
    description:
      "See how SoftwarePros delivers measurable outcomes for healthcare providers: cost savings, uptime improvements, and HIPAA compliance.",
    images: ["/web-app-manifest-512x512.png"],
  },
};

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Multi-Clinic Network: 40% Cost Reduction via Workflow Automation",
      client: "Regional Healthcare Partners",
      type: "Multi-Clinic Network",
      industry: "Primary Care & Specialty Clinics",
      challenge:
        "Managing 12 clinics with disparate systems, manual processes, and inconsistent patient experiences.",
      solution:
        "Integrated EHR platform with automated scheduling, claims processing, and centralized reporting.",
      results: [
        "40% reduction in operational costs",
        "99.9% system uptime achieved",
        "Zero HIPAA violations in 3 years",
        "60% faster patient check-in process",
        "85% improvement in billing accuracy",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "HL7 FHIR"],
      duration: "10 months",
      teamSize: "15 developers",
      metrics: ["40% lower operational costs", "99.9% uptime", "Zero HIPAA violations"],
      summary:
        "Automated scheduling, claims, and reporting across a network of clinics. Integrated EHR and billing for end-to-end efficiency.",
    },
    {
      title: "Telemedicine Platform: 10x Scale During Seasonal Surges",
      client: "Metro Health Systems",
      type: "Hospital Network",
      industry: "Multi-Specialty Hospital System",
      challenge:
        "Need for scalable telemedicine solution to handle 10x patient volume during flu season.",
      solution:
        "Cloud-native telemedicine platform with auto-scaling, real-time monitoring, and enterprise security.",
      results: [
        "100,000+ patients served during peak",
        "Auto-scaling from 100 to 10,000 concurrent users",
        "Sub-200ms P95 latency maintained",
        "99.99% uptime during critical periods",
        "Zero security incidents",
      ],
      technologies: ["React Native", "WebRTC", "Node.js", "MongoDB", "AWS"],
      duration: "6 months",
      teamSize: "12 developers",
      metrics: ["100,000+ patients served", "Auto-scaling", "Sub-200ms P95 latency"],
      summary:
        "Cloud-native design with autoscaling, observability, and hardened security for high-traffic events.",
    },
    {
      title: "Dental Practice: 50% Revenue Increase Through Digital Transformation",
      client: "Dental Excellence Group",
      type: "Dental Practice",
      industry: "Multi-Location Dental Chain",
      challenge: "Managing 15 dental locations with inconsistent systems and poor data visibility.",
      solution:
        "Unified practice management system with digital imaging, automated scheduling, and centralized reporting.",
      results: [
        "50% increase in revenue per patient",
        "30% reduction in appointment no-shows",
        "25% improvement in treatment acceptance",
        "Centralized reporting across all locations",
        "95% staff adoption rate",
      ],
      technologies: ["Vue.js", "Python", "MySQL", "Azure", "DICOM"],
      duration: "8 months",
      teamSize: "10 developers",
      metrics: ["50% revenue increase", "30% fewer no-shows", "95% staff adoption"],
      summary:
        "Digital transformation including imaging, scheduling, and patient management across multiple locations.",
    },
    {
      title: "Specialty Clinic: 70% Faster Patient Processing",
      client: "Advanced Cardiology Associates",
      type: "Specialty Clinic",
      industry: "Cardiology Practice",
      challenge:
        "Manual patient intake and scheduling causing long wait times and patient dissatisfaction.",
      solution:
        "Streamlined patient portal with automated intake forms, appointment scheduling, and result notifications.",
      results: [
        "70% faster patient processing",
        "90% reduction in paperwork",
        "50% decrease in patient wait times",
        "Improved patient satisfaction scores",
        "Enhanced clinical workflow efficiency",
      ],
      technologies: ["React", "TypeScript", "PostgreSQL", "Docker", "Redis"],
      duration: "4 months",
      teamSize: "6 developers",
      metrics: ["70% faster processing", "90% less paperwork", "50% shorter waits"],
      summary:
        "Patient portal automation reducing administrative burden and improving clinical efficiency.",
    },
    {
      title: "Rural Hospital: 24/7 Remote Monitoring Implementation",
      client: "Rural Health Network",
      type: "Rural Hospital",
      industry: "Critical Access Hospital",
      challenge:
        "Limited specialist availability and need for 24/7 patient monitoring in remote location.",
      solution:
        "Remote monitoring system with telemedicine integration and automated alert systems.",
      results: [
        "24/7 specialist coverage achieved",
        "40% reduction in patient transfers",
        "Improved patient outcomes",
        "Enhanced staff efficiency",
        "Cost savings on specialist travel",
      ],
      technologies: ["React", "WebRTC", "Node.js", "PostgreSQL", "IoT Integration"],
      duration: "7 months",
      teamSize: "8 developers",
      metrics: ["24/7 coverage", "40% fewer transfers", "Improved outcomes"],
      summary: "Remote monitoring and telemedicine solution for rural healthcare access.",
    },
    {
      title: "Pharmacy Chain: Medication Management & Compliance",
      client: "Community Pharmacy Network",
      type: "Pharmacy Chain",
      industry: "Retail Pharmacy",
      challenge: "Managing medication dispensing, inventory, and compliance across 25 locations.",
      solution:
        "Integrated pharmacy management system with automated compliance checks and inventory management.",
      results: [
        "99.9% medication accuracy rate",
        "Zero compliance violations",
        "30% reduction in inventory waste",
        "Improved patient safety",
        "Streamlined regulatory reporting",
      ],
      technologies: ["Angular", "Java", "Oracle", "Docker", "HIPAA Compliance"],
      duration: "9 months",
      teamSize: "14 developers",
      metrics: ["99.9% accuracy", "Zero violations", "30% less waste"],
      summary: "Comprehensive pharmacy management with automated compliance and safety features.",
    },
  ];

  const stats = [
    { label: "Projects Completed", value: "60+" },
    { label: "Avg. Cost Reduction", value: "35%" },
    { label: "Avg. Uptime", value: "99.9%" },
    { label: "Client Satisfaction", value: "98%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Healthcare Software Case Studies
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Real results from regulated healthcare environments. We focus on measurable outcomes,
              reliability, and compliance that drive business value.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <article key={study.title} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{study.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="font-medium">{study.client}</span>
                        <span>•</span>
                        <span>{study.type}</span>
                        <span>•</span>
                        <span>{study.industry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Challenge & Solution */}
                  <div className="mb-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h3>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Solution</h3>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Results</h3>
                    <ul className="space-y-2">
                      {study.results.map((result) => (
                        <li key={result} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-700">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Details */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Duration:</span>
                        <span className="ml-2 text-gray-900">{study.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Team Size:</span>
                        <span className="ml-2 text-gray-900">{study.teamSize}</span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mt-4">
                      <span className="font-medium text-gray-600 text-sm">Technologies:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to See Similar Results?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your healthcare organization achieve measurable
            improvements in efficiency, compliance, and patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              View Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
