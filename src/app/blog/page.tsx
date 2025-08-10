import { db } from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";
export const dynamic = "force-dynamic";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  createdAt: Date;
  publishedAt: Date | null;
  author: {
    name: string | null;
  };
  categories: Array<{
    category: {
      id: string;
      name: string;
    };
  }>;
}

export const metadata: Metadata = {
  title: "Medical Software Development Blog | Healthcare AI & HIPAA Compliance | SoftwarePros",
  description:
    "Expert insights on medical software development, healthcare AI, HIPAA compliance, EHR systems, telemedicine platforms, and cutting-edge healthcare technology. Stay updated with the latest innovations in medical software engineering.",
  keywords: [
    "medical software development",
    "healthcare software engineering",
    "HIPAA compliant software",
    "EHR system development",
    "telemedicine platform development",
    "healthcare AI development",
    "medical device software",
    "healthcare compliance software",
    "medical practice management software",
    "healthcare cybersecurity",
    "medical imaging software",
    "healthcare data analytics",
    "medical software architecture",
    "healthcare software testing",
    "medical software validation",
    "healthcare software deployment",
    "medical software maintenance",
    "healthcare software security",
    "medical software integration",
    "healthcare software optimization",
  ],
  alternates: {
    canonical: "https://softwarepros.org/blog",
  },
  openGraph: {
    title: "Medical Software Development Blog | Healthcare AI & HIPAA Compliance | SoftwarePros",
    description:
      "Expert insights on medical software development, healthcare AI, HIPAA compliance, EHR systems, and cutting-edge healthcare technology.",
    url: "https://softwarepros.org/blog",
    type: "website",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "SoftwarePros Medical Software Development Blog",
      },
      {
        url: "/images/placeholder.svg",
        width: 1200,
        height: 630,
        alt: "SoftwarePros Healthcare Technology Insights Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Software Development Blog | Healthcare AI & HIPAA Compliance | SoftwarePros",
    description:
      "Expert insights on medical software development, healthcare AI, HIPAA compliance, EHR systems, and cutting-edge healthcare technology.",
    images: ["/web-app-manifest-512x512.png"],
  },
};

// 12 New SEO-Optimized Medical Software Development Blog Posts
const medicalSoftwarePosts: BlogPost[] = [
  {
    id: "1",
    title:
      "Complete Guide to HIPAA Compliant Medical Software Development: Security, Privacy & Compliance",
    slug: "hipaa-compliant-medical-software-development-guide",
    excerpt:
      "Master HIPAA compliance in medical software development with our comprehensive guide covering data encryption, access controls, audit trails, and regulatory requirements for healthcare applications.",
    featuredImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-20"),
    publishedAt: new Date("2024-12-20"),
    author: { name: "Dr. Sarah Chen" },
    categories: [{ category: { id: "1", name: "Healthcare Compliance" } }],
  },
  {
    id: "2",
    title: "Building Scalable EHR Systems: Architecture Patterns for Modern Healthcare Platforms",
    slug: "building-scalable-ehr-systems-architecture-patterns",
    excerpt:
      "Discover proven architecture patterns for building scalable Electronic Health Record systems that handle millions of patients while maintaining performance, security, and compliance standards.",
    featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-18"),
    publishedAt: new Date("2024-12-18"),
    author: { name: "Michael Rodriguez" },
    categories: [{ category: { id: "2", name: "EHR Development" } }],
  },
  {
    id: "3",
    title: "AI-Powered Medical Diagnostics: Machine Learning Implementation in Healthcare Software",
    slug: "ai-powered-medical-diagnostics-machine-learning-implementation",
    excerpt:
      "Learn how to implement AI-powered medical diagnostics in healthcare software, including model development, validation, FDA approval processes, and integration with existing medical systems.",
    featuredImage: "https://images.unsplash.com/photo-1559757175-08c4e7d01a53?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-15"),
    publishedAt: new Date("2024-12-15"),
    author: { name: "Dr. Sarah Chen" },
    categories: [{ category: { id: "3", name: "AI & Machine Learning" } }],
  },
  {
    id: "4",
    title: "Telemedicine Platform Development: Building Secure, Scalable Virtual Care Solutions",
    slug: "telemedicine-platform-development-secure-scalable-solutions",
    excerpt:
      "Comprehensive guide to developing telemedicine platforms with real-time video, secure messaging, appointment scheduling, and integration with EHR systems for comprehensive virtual care.",
    featuredImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-12"),
    publishedAt: new Date("2024-12-12"),
    author: { name: "Michael Rodriguez" },
    categories: [{ category: { id: "4", name: "Telemedicine Development" } }],
  },
  {
    id: "5",
    title:
      "Medical Device Software Development: FDA Regulations, Safety Standards & Best Practices",
    slug: "medical-device-software-development-fda-regulations-safety",
    excerpt:
      "Essential guide to medical device software development covering FDA regulations, IEC 62304 compliance, risk management, software validation, and safety-critical development practices.",
    featuredImage:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-10"),
    publishedAt: new Date("2024-12-10"),
    author: { name: "Dr. Sarah Chen" },
    categories: [{ category: { id: "5", name: "Medical Device Software" } }],
  },
  {
    id: "6",
    title:
      "Healthcare Data Analytics Platform Development: Big Data Solutions for Medical Insights",
    slug: "healthcare-data-analytics-platform-development-big-data-solutions",
    excerpt:
      "Build powerful healthcare data analytics platforms that process massive datasets, provide real-time insights, and enable evidence-based decision making for healthcare providers.",
    featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-08"),
    publishedAt: new Date("2024-12-08"),
    author: { name: "Michael Rodriguez" },
    categories: [{ category: { id: "6", name: "Healthcare Analytics" } }],
  },
  {
    id: "7",
    title: "Medical Practice Management Software: Complete Practice Workflow Automation Solutions",
    slug: "medical-practice-management-software-workflow-automation",
    excerpt:
      "Develop comprehensive medical practice management software that automates scheduling, billing, patient communication, and administrative workflows for healthcare practices of all sizes.",
    featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-05"),
    publishedAt: new Date("2024-12-05"),
    author: { name: "Dr. Sarah Chen" },
    categories: [{ category: { id: "7", name: "Practice Management" } }],
  },
  {
    id: "8",
    title: "Healthcare Cybersecurity: Advanced Threat Protection for Medical Software Systems",
    slug: "healthcare-cybersecurity-advanced-threat-protection-medical-systems",
    excerpt:
      "Implement enterprise-grade cybersecurity measures for medical software systems including threat detection, incident response, penetration testing, and compliance with healthcare security standards.",
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-03"),
    publishedAt: new Date("2024-12-03"),
    author: { name: "Michael Rodriguez" },
    categories: [{ category: { id: "8", name: "Healthcare Security" } }],
  },
  {
    id: "9",
    title: "Medical Imaging Software Development: AI-Enhanced Radiology & Diagnostic Tools",
    slug: "medical-imaging-software-development-ai-enhanced-radiology",
    excerpt:
      "Create advanced medical imaging software with AI-powered analysis, DICOM compliance, 3D visualization, and integration with PACS systems for comprehensive diagnostic imaging solutions.",
    featuredImage: "https://images.unsplash.com/photo-1559757175-08c4e7d01a53?w=800&h=400&fit=crop",
    createdAt: new Date("2024-12-01"),
    publishedAt: new Date("2024-12-01"),
    author: { name: "Dr. Sarah Chen" },
    categories: [{ category: { id: "9", name: "Medical Imaging" } }],
  },
  {
    id: "10",
    title: "Healthcare Software Testing & Validation: Quality Assurance for Medical Applications",
    slug: "healthcare-software-testing-validation-quality-assurance",
    excerpt:
      "Comprehensive testing and validation strategies for healthcare software including unit testing, integration testing, user acceptance testing, and compliance validation for medical applications.",
    featuredImage:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop",
    createdAt: new Date("2024-11-28"),
    publishedAt: new Date("2024-11-28"),
    author: { name: "Michael Rodriguez" },
    categories: [{ category: { id: "10", name: "Software Testing" } }],
  },
  {
    id: "11",
    title: "Medical Software Integration: HL7 FHIR, APIs & Interoperability Solutions",
    slug: "medical-software-integration-hl7-fhir-apis-interoperability",
    excerpt:
      "Master medical software integration using HL7 FHIR standards, RESTful APIs, and interoperability solutions to connect disparate healthcare systems and enable seamless data exchange.",
    featuredImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop",
    createdAt: new Date("2024-11-25"),
    publishedAt: new Date("2024-11-25"),
    author: { name: "Dr. Sarah Chen" },
    categories: [{ category: { id: "11", name: "Healthcare Integration" } }],
  },
  {
    id: "12",
    title: "Medical Software Deployment & DevOps: Production-Ready Healthcare Applications",
    slug: "medical-software-deployment-devops-production-ready-healthcare",
    excerpt:
      "Complete DevOps pipeline for medical software deployment including CI/CD, infrastructure as code, monitoring, logging, and production deployment strategies for healthcare applications.",
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    createdAt: new Date("2024-11-22"),
    publishedAt: new Date("2024-11-22"),
    author: { name: "Michael Rodriguez" },
    categories: [{ category: { id: "12", name: "DevOps & Deployment" } }],
  },
];

async function getPosts() {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.log("No DATABASE_URL found, using medical software posts");
      return medicalSoftwarePosts;
    }

    const posts = await db.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 12,
    });

    // If no posts found in database, return medical software posts
    if (posts.length === 0) {
      console.log("No posts found in database, using medical software posts");
      return medicalSoftwarePosts;
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Return medical software posts if database is not available
    return medicalSoftwarePosts;
  }
}

export default async function BlogPage() {
  try {
    const posts = await getPosts();

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Medical Software Development Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Expert guidance on healthcare software development, HIPAA compliance, AI integration,
              and cutting-edge medical technology. Stay ahead with the latest innovations in medical
              software engineering.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                HIPAA Compliance
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                AI & Machine Learning
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                EHR Systems
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                Telemedicine
              </span>
            </div>
          </div>

          {/* Blog Posts */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: BlogPost) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {post.featuredImage && (
                    <div className="relative">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                          Medical Software
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <time dateTime={post.publishedAt?.toISOString()}>
                        {post.publishedAt?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {post.author.name && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="font-medium text-gray-700">By {post.author.name}</span>
                        </>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((postCategory) => (
                          <span
                            key={postCategory.category.id}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                          >
                            {postCategory.category.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      Read Full Article
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No posts yet</h2>
              <p className="text-gray-600">
                Check back soon for our latest medical software development insights!
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Build Your Medical Software Solution?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our expert team specializes in developing HIPAA-compliant healthcare applications,
              AI-powered medical software, and scalable EHR systems. Let's discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started Today
              </Link>
              <Link
                href="/services/healthcare-practice-management"
                className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering blog page:", error);
    // Fallback UI if something goes wrong
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Medical Software Development Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Expert guidance on healthcare software development, HIPAA compliance, AI integration,
              and cutting-edge medical technology.
            </p>
          </div>

          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
            <p className="text-gray-600">
              Please wait while we load our latest medical software development insights!
            </p>
          </div>
        </div>
      </div>
    );
  }
}
