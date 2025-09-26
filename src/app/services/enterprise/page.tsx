import {
  Analytics,
  AutoGraph,
  Business,
  CloudQueue,
  Hub as Integration,
  Inventory,
  People,
  Security,
} from "@mui/icons-material";
import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: "Enterprise Solutions - SoftwarePros | Custom Business Software",
  description:
    "Enterprise software development services including ERP systems, CRM solutions, business intelligence, and custom enterprise applications for large organizations.",
  alternates: {
    canonical: "https://softwarepros.org/services/enterprise",
  },
  openGraph: {
    title: "Enterprise Solutions - SoftwarePros",
    description: "Scalable enterprise software solutions for large organizations.",
    url: "https://softwarepros.org/services/enterprise",
  },
};

interface EnterpriseService {
  icon: React.ElementType;
  title: string;
  description: string;
  solutions: string[];
  benefits: string[];
}

const enterpriseServices: EnterpriseService[] = [
  {
    icon: Business,
    title: "ERP Systems",
    description:
      "Comprehensive Enterprise Resource Planning solutions to streamline business operations.",
    solutions: ["Financial Management", "Supply Chain", "Human Resources", "Manufacturing"],
    benefits: [
      "Unified business processes",
      "Real-time reporting",
      "Improved efficiency",
      "Cost reduction",
      "Better decision making",
    ],
  },
  {
    icon: People,
    title: "CRM Solutions",
    description:
      "Customer Relationship Management systems to enhance customer interactions and sales.",
    solutions: ["Sales Automation", "Customer Service", "Marketing Automation", "Analytics"],
    benefits: [
      "Improved customer satisfaction",
      "Increased sales",
      "Better lead management",
      "Enhanced communication",
      "Data-driven insights",
    ],
  },
  {
    icon: Analytics,
    title: "Business Intelligence",
    description: "Advanced analytics and reporting solutions for data-driven decision making.",
    solutions: ["Data Warehousing", "Reporting Dashboards", "Predictive Analytics", "KPI Tracking"],
    benefits: [
      "Real-time insights",
      "Performance monitoring",
      "Trend analysis",
      "Automated reporting",
      "Strategic planning",
    ],
  },
  {
    icon: Integration,
    title: "System Integration",
    description: "Seamless integration of existing systems and third-party applications.",
    solutions: ["API Development", "Data Migration", "Legacy Modernization", "Middleware"],
    benefits: [
      "Unified data flow",
      "Reduced silos",
      "Improved productivity",
      "Cost savings",
      "Enhanced security",
    ],
  },
  {
    icon: CloudQueue,
    title: "Cloud Migration",
    description:
      "Strategic cloud adoption and migration services for scalability and cost optimization.",
    solutions: ["AWS Migration", "Azure Migration", "Hybrid Cloud", "Multi-Cloud"],
    benefits: [
      "Scalability",
      "Cost optimization",
      "Improved reliability",
      "Enhanced security",
      "Global accessibility",
    ],
  },
  {
    icon: Inventory,
    title: "Supply Chain Management",
    description: "End-to-end supply chain optimization and management solutions.",
    solutions: ["Inventory Management", "Procurement", "Logistics", "Vendor Management"],
    benefits: [
      "Reduced costs",
      "Improved visibility",
      "Better planning",
      "Risk mitigation",
      "Faster delivery",
    ],
  },
];

const industries: string[] = [
  "Healthcare",
  "Manufacturing",
  "Financial Services",
  "Retail & E-commerce",
  "Education",
  "Government",
  "Energy & Utilities",
  "Transportation",
  "Real Estate",
  "Non-Profit",
  "Technology",
  "Hospitality",
];

const technologies: string[] = [
  "Microsoft .NET",
  "Java Enterprise",
  "Python Django",
  "Node.js",
  "React",
  "Angular",
  "Vue.js",
  "PostgreSQL",
  "SQL Server",
  "Oracle",
  "MongoDB",
  "Redis",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Microservices",
];

export default function EnterprisePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Business className="w-16 h-16 text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Enterprise Solutions</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Scalable, secure enterprise software solutions that transform how large organizations
            operate. From ERP systems to business intelligence platforms.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Discuss Your Enterprise Needs
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Enterprise Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-orange-400 mr-3" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Solutions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.solutions.map((solution) => (
                        <span
                          key={solution}
                          className="px-2 py-1 bg-orange-600 text-xs rounded-full"
                        >
                          {solution}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                          {benefit}
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

      {/* Industries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors duration-300"
              >
                <span className="text-sm font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Enterprise Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-750 transition-colors duration-300"
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Enterprise Development Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Discovery & Analysis",
                description: "Understanding your business requirements and current systems",
              },
              {
                step: "2",
                title: "Architecture Design",
                description: "Designing scalable and secure system architecture",
              },
              {
                step: "3",
                title: "Development & Testing",
                description: "Agile development with continuous testing and quality assurance",
              },
              {
                step: "4",
                title: "Deployment & Support",
                description: "Smooth deployment and ongoing maintenance and support",
              },
            ].map((phase) => (
              <div key={phase.title} className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{phase.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-400 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Transform Your Enterprise Operations</h2>
          <p className="text-gray-400 mb-8">
            Ready to modernize your business with custom enterprise solutions? Let's discuss how we
            can help streamline your operations and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              View Enterprise Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
