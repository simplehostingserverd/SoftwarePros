import {
  Analytics,
  Cloud,
  DevicesOther as Responsive,
  Search,
  Security,
  ShoppingCart,
  Speed,
  Web,
} from "@mui/icons-material";
import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: "Web Development Services - SoftwarePros | Custom Web Applications",
  description:
    "Professional web development services including responsive websites, e-commerce platforms, web applications, and progressive web apps using modern technologies.",
  openGraph: {
    title: "Web Development Services - SoftwarePros",
    description: "Custom web development solutions for businesses of all sizes.",
    url: "https://softwarepros.org/services/web-development",
  },
};

interface WebService {
  icon: React.ElementType;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
}

const webServices: WebService[] = [
  {
    icon: Web,
    title: "Custom Web Applications",
    description: "Scalable, high-performance web applications tailored to your business needs.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
    features: [
      "Custom functionality",
      "Database integration",
      "API development",
      "Real-time features",
      "Admin dashboards",
    ],
  },
  {
    icon: Responsive,
    title: "Responsive Websites",
    description: "Mobile-first, responsive websites that look great on all devices.",
    technologies: ["HTML5", "CSS3", "JavaScript", "TailwindCSS"],
    features: [
      "Mobile optimization",
      "Cross-browser compatibility",
      "Fast loading times",
      "SEO optimization",
      "Content management",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Complete e-commerce platforms with payment processing and inventory management.",
    technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal"],
    features: [
      "Product catalogs",
      "Payment processing",
      "Inventory management",
      "Order tracking",
      "Customer accounts",
    ],
  },
  {
    icon: Speed,
    title: "Progressive Web Apps",
    description: "App-like experiences that work offline and can be installed on devices.",
    technologies: ["PWA", "Service Workers", "Web App Manifest"],
    features: [
      "Offline functionality",
      "Push notifications",
      "App-like interface",
      "Fast performance",
      "Cross-platform",
    ],
  },
  {
    icon: Search,
    title: "SEO & Performance",
    description: "Search engine optimization and performance improvements for better visibility.",
    technologies: ["Google Analytics", "Search Console", "Lighthouse"],
    features: [
      "Technical SEO",
      "Performance optimization",
      "Core Web Vitals",
      "Schema markup",
      "Analytics setup",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Deployment",
    description: "Scalable cloud hosting and deployment solutions for your web applications.",
    technologies: ["AWS", "Vercel", "Netlify", "Docker"],
    features: [
      "Auto-scaling",
      "CDN integration",
      "SSL certificates",
      "Backup solutions",
      "Monitoring & alerts",
    ],
  },
];

const technologies: string[] = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "PHP",
  "Laravel",
  "Express.js",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
  "GraphQL",
  "REST APIs",
  "AWS",
  "Google Cloud",
  "Azure",
  "Docker",
  "Kubernetes",
  "CI/CD",
];

export default function WebDevelopmentPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Web className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Web Development Services</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Create powerful, scalable web applications that drive your business forward. From simple
            websites to complex enterprise solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Web Development Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-blue-400 mr-3" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-blue-600 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                          {feature}
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

      {/* Technologies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors duration-300"
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Web Application?</h2>
          <p className="text-gray-400 mb-8">
            Let's discuss your project requirements and create a solution that exceeds your
            expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Get Free Quote
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
