import {
  Architecture,
  Assessment,
  Lightbulb,
  Psychology,
  School,
  Support,
  Timeline,
  TrendingUp,
} from "@mui/icons-material";
import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: "Tech Consulting Services - SoftwarePros | Strategic Technology Guidance",
  description:
    "Expert technology consulting services including digital transformation, architecture design, technology strategy, and technical leadership for businesses of all sizes.",
  alternates: {
    canonical: "https://softwarepros.org/services/consulting",
  },
  openGraph: {
    title: "Tech Consulting Services - SoftwarePros",
    description: "Strategic technology consulting and digital transformation services.",
    url: "https://softwarepros.org/services/consulting",
  },
};

interface ConsultingService {
  icon: React.ElementType;
  title: string;
  description: string;
  deliverables: string[];
  outcomes: string[];
}

const consultingServices: ConsultingService[] = [
  {
    icon: TrendingUp,
    title: "Digital Transformation Strategy",
    description:
      "Comprehensive digital transformation roadmaps to modernize your business operations.",
    deliverables: [
      "Current State Assessment",
      "Future State Vision",
      "Transformation Roadmap",
      "ROI Analysis",
    ],
    outcomes: [
      "Improved operational efficiency",
      "Enhanced customer experience",
      "Competitive advantage",
      "Cost optimization",
      "Future-ready technology stack",
    ],
  },
  {
    icon: Architecture,
    title: "Technology Architecture",
    description: "Scalable and secure technology architecture design for enterprise applications.",
    deliverables: [
      "Architecture Blueprint",
      "Technology Stack Recommendations",
      "Security Framework",
      "Scalability Plan",
    ],
    outcomes: [
      "Robust system architecture",
      "Improved performance",
      "Enhanced security",
      "Better maintainability",
      "Reduced technical debt",
    ],
  },
  {
    icon: Assessment,
    title: "Technology Assessment",
    description: "Comprehensive evaluation of existing technology infrastructure and applications.",
    deliverables: [
      "Technical Audit Report",
      "Gap Analysis",
      "Risk Assessment",
      "Improvement Recommendations",
    ],
    outcomes: [
      "Clear understanding of current state",
      "Identified improvement areas",
      "Risk mitigation strategies",
      "Optimized technology investments",
      "Enhanced system reliability",
    ],
  },
  {
    icon: Psychology,
    title: "CTO Advisory Services",
    description: "Strategic technology leadership and guidance for growing businesses.",
    deliverables: [
      "Technology Strategy",
      "Team Structure Recommendations",
      "Process Optimization",
      "Vendor Evaluation",
    ],
    outcomes: [
      "Strategic technology direction",
      "Improved team productivity",
      "Better technology decisions",
      "Reduced development costs",
      "Faster time to market",
    ],
  },
  {
    icon: Timeline,
    title: "Project Management",
    description:
      "Expert project management for complex technology initiatives and transformations.",
    deliverables: [
      "Project Plans",
      "Risk Management",
      "Progress Reporting",
      "Stakeholder Communication",
    ],
    outcomes: [
      "On-time project delivery",
      "Budget adherence",
      "Quality deliverables",
      "Stakeholder satisfaction",
      "Reduced project risks",
    ],
  },
  {
    icon: School,
    title: "Team Training & Development",
    description: "Technical training and skill development programs for your development teams.",
    deliverables: [
      "Training Curriculum",
      "Hands-on Workshops",
      "Best Practices Guide",
      "Mentoring Programs",
    ],
    outcomes: [
      "Enhanced team skills",
      "Improved code quality",
      "Better development practices",
      "Increased productivity",
      "Reduced knowledge gaps",
    ],
  },
];

const consultingAreas: string[] = [
  "Cloud Strategy",
  "DevOps Implementation",
  "Agile Transformation",
  "Security Strategy",
  "Data Strategy",
  "API Strategy",
  "Microservices Architecture",
  "Legacy Modernization",
  "Technology Due Diligence",
  "Vendor Selection",
  "Team Scaling",
  "Process Optimization",
];

const industries: string[] = [
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Retail",
  "Education",
  "Government",
  "Startups",
  "Enterprise",
];

export default function ConsultingPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Psychology className="w-16 h-16 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Tech Consulting Services</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Strategic technology guidance to accelerate your digital transformation. Expert
            consulting services to optimize your technology investments and drive business growth.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Schedule Strategy Session
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Consulting Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-indigo-400 mr-3" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Deliverables:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((deliverable) => (
                        <span
                          key={deliverable}
                          className="px-2 py-1 bg-indigo-600 text-xs rounded-full"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Outcomes:</h4>
                    <ul className="space-y-1">
                      {service.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consulting Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Consulting Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {consultingAreas.map((area) => (
              <div
                key={area}
                className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors duration-300"
              >
                <span className="text-sm font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Consulting Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Discovery",
                description:
                  "Understanding your business goals, challenges, and current technology landscape",
                icon: Assessment,
              },
              {
                step: "2",
                title: "Analysis",
                description:
                  "Deep dive analysis of systems, processes, and identifying improvement opportunities",
                icon: Lightbulb,
              },
              {
                step: "3",
                title: "Strategy",
                description:
                  "Developing comprehensive strategies and roadmaps aligned with business objectives",
                icon: Timeline,
              },
              {
                step: "4",
                title: "Implementation",
                description: "Guiding execution with ongoing support and monitoring progress",
                icon: Support,
              },
            ].map((phase) => {
              const IconComponent = phase.icon;
              return (
                <div key={phase.title} className="text-center">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 -mt-12">
                    <span className="text-white font-bold text-sm">{phase.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                  <p className="text-gray-400 text-sm">{phase.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors duration-300"
              >
                <span className="text-lg font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Accelerate Your Digital Transformation?
          </h2>
          <p className="text-gray-400 mb-8">
            Let's discuss your technology challenges and create a strategic roadmap for success. Our
            expert consultants are ready to guide your transformation journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
