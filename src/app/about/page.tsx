import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'About SoftwarePros — Healthcare Software Development Experts | 15+ Years Experience',
  description:
    'Learn about SoftwarePros, a leading healthcare software development company with 15+ years of experience building HIPAA-compliant EHR/EMR systems, practice management software, and telemedicine platforms. Discover our mission, values, and track record of delivering secure healthcare solutions.',
  keywords: [
    'healthcare software development company',
    'HIPAA compliant software developers',
    'EHR EMR development experts',
    'medical software company',
    'healthcare technology consultants',
    'practice management software developers',
    'telemedicine platform development',
    'healthcare software experts',
    'medical software development team',
    'healthcare IT consulting',
    'healthcare software architecture',
    'medical practice software company',
    'healthcare compliance experts',
    'healthcare software engineers',
    'medical software development services',
  ],
  alternates: { 
    canonical: 'https://softwarepros.org/about' 
  },
  openGraph: {
    title: 'About SoftwarePros — Healthcare Software Development Experts',
    description: 'Leading healthcare software development company with 15+ years building HIPAA-compliant systems. Discover our mission, values, and track record.',
    url: 'https://softwarepros.org/about',
    type: 'website',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'SoftwarePros Healthcare Software Development Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SoftwarePros — Healthcare Software Development Experts',
    description: 'Leading healthcare software development company with 15+ years building HIPAA-compliant systems.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function AboutPage() {
  const stats = [
    { label: 'Years Experience', value: '15+', description: 'Delivering healthcare software solutions' },
    { label: 'HIPAA Projects', value: '60+', description: 'Compliant systems deployed' },
    { label: 'Avg. Uptime', value: '99.99%', description: 'System reliability guarantee' },
    { label: 'Clients Served', value: '100+', description: 'Healthcare organizations' },
    { label: 'Team Members', value: '25+', description: 'Expert developers & designers' },
    { label: 'Success Rate', value: '98%', description: 'Project delivery success' },
  ];

  const values = [
    {
      title: 'Compliance by Design',
      description:
        'Security, auditability, and PHI protection are first-class citizens in our architecture, not afterthoughts. We build HIPAA compliance into every layer of our software.',
      icon: '🔒',
    },
    {
      title: 'Outcome Focused',
      description:
        'We ship measurable improvements to clinical workflows, billing accuracy, and patient satisfaction. Every feature is designed to solve real healthcare problems.',
      icon: '📊',
    },
    {
      title: 'Operational Excellence',
      description:
        'SLAs, observability, and incident response baked into delivery so your team sleeps at night. We maintain enterprise-grade reliability standards.',
      icon: '⚡',
    },
    {
      title: 'Innovation Driven',
      description:
        'We stay ahead of healthcare technology trends, implementing cutting-edge solutions like AI-powered diagnostics, blockchain for data integrity, and IoT integration.',
      icon: '🚀',
    },
  ];

  const services = [
    {
      category: 'Electronic Health Records',
      items: ['EHR/EMR Development', 'Patient Portal Systems', 'Clinical Decision Support', 'Lab Results Integration', 'Prescription Management'],
    },
    {
      category: 'Practice Management',
      items: ['Appointment Scheduling', 'Billing & Revenue Cycle', 'Insurance Claims Processing', 'Inventory Management', 'Reporting & Analytics'],
    },
    {
      category: 'Telemedicine & Remote Care',
      items: ['Video Consultation Platforms', 'Remote Patient Monitoring', 'Mobile Health Apps', 'Secure Messaging', 'Virtual Waiting Rooms'],
    },
    {
      category: 'Integration & Compliance',
      items: ['HL7 FHIR Integration', 'HIPAA Compliance Tools', 'SOC2 Preparation', 'Security Audits', 'Data Migration Services'],
    },
  ];

  const technologies = [
    'React & React Native', 'Node.js & TypeScript', 'Python & Django', 'PostgreSQL & MongoDB', 
    'AWS & Azure Cloud', 'Docker & Kubernetes', 'HL7 FHIR', 'DICOM Imaging', 'WebRTC', 'Blockchain'
  ];

  const certifications = [
    'HIPAA Compliance Expert', 'AWS Certified Solutions Architect', 'Microsoft Azure Certified', 
    'Google Cloud Professional', 'Certified Scrum Master', 'ISO 27001 Trained'
  ];

  return (
    <>
      {/* Structured Data Schema */}
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SoftwarePros",
            "url": "https://softwarepros.org",
            "logo": "https://softwarepros.org/web-app-manifest-512x512.png",
            "description": "Healthcare software development company specializing in HIPAA-compliant EHR/EMR systems, practice management software, and telemedicine platforms.",
            "foundingDate": "2008",
            "numberOfEmployees": "25",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "info@softwarepros.org"
            },
            "sameAs": [
              "https://softwarepros.org",
              "https://linkedin.com/company/softwarepros"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Healthcare Software Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "EHR/EMR Development",
                    "description": "Custom electronic health record and electronic medical record systems"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Practice Management Software",
                    "description": "Comprehensive practice management solutions for healthcare providers"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Telemedicine Platforms",
                    "description": "Secure video consultation and remote patient monitoring systems"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "100"
            }
          })
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                  Building secure healthcare software that clinicians love
                </h1>
                <p className="text-xl leading-8 text-gray-600 mb-8">
                  SoftwarePros is a leading healthcare software development company led by Michael Trevino 
                  and a team of senior engineers and designers. We specialize in building HIPAA-compliant 
                  systems that transform healthcare delivery—from EHR/EMR platforms to practice management 
                  solutions and cutting-edge telemedicine applications.
                </p>
                <p className="text-lg leading-7 text-gray-600 mb-8">
                  With over 15 years of experience serving healthcare organizations, we understand the unique 
                  challenges of regulated environments and deliver solutions that improve patient care while 
                  ensuring compliance and operational efficiency.
                </p>
                
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {stats.slice(0, 4).map((stat) => (
                    <div key={stat.label} className="rounded-xl border bg-white p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-2xl border p-8 shadow-lg bg-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Do</h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span>EHR/EMR modules, scheduling, eligibility, eRx, eLabs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span>HL7, FHIR, X12 270/271/835/837 integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span>Security reviews, HIPAA risk assessments, SOC2 prep</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span>Native and cross‑platform mobile apps for clinicians and patients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span>Cloud migrations, DevOps, observability, and cost optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-xl text-gray-600 leading-8">
                We're on a mission to democratize access to high-quality healthcare software, 
                making advanced technology accessible to healthcare providers of all sizes while 
                maintaining the highest standards of security and compliance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-7">
                  To empower healthcare providers with innovative, secure, and user-friendly software 
                  solutions that enhance patient care, streamline operations, and ensure regulatory 
                  compliance. We believe every healthcare organization deserves access to enterprise-grade 
                  technology that works seamlessly in real-world clinical environments.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-7">
                  To be the most trusted partner in healthcare software development, known for 
                  delivering solutions that not only meet today's needs but anticipate tomorrow's 
                  challenges. We envision a future where healthcare technology enhances rather than 
                  hinders the patient-provider relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide every decision we make and every line of code we write
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-6">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Healthcare Software Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From concept to deployment, we provide end-to-end healthcare software solutions
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <div key={service.category} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.category}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-700">
                        <span className="text-green-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Technology Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We leverage cutting-edge technologies to build robust, scalable healthcare solutions
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Leadership & Expertise
                </h2>
                <p className="text-xl text-gray-600">
                  Meet the team driving innovation in healthcare software development
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Michael Trevino</h3>
                    <p className="text-lg text-blue-600 font-medium mb-4">Founder & CEO</p>
                    <p className="text-gray-700 leading-7 mb-6">
                      Michael Trevino has led teams delivering mission‑critical software for 
                      Fortune 500 healthcare organizations and fast‑growing practices. With over 
                      15 years of experience in healthcare technology, he partners directly with 
                      physician leadership and operations to align technology with clinical outcomes, 
                      revenue cycle, and compliance.
                    </p>
                    <p className="text-gray-700 leading-7 mb-6">
                      His expertise spans EHR/EMR systems, practice management software, telemedicine 
                      platforms, and healthcare integrations. Michael has successfully delivered 
                      solutions for hospitals, clinics, dental practices, and specialty medical groups.
                    </p>
                    
                    {/* Certifications */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Certifications & Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {certifications.map((cert) => (
                          <span
                            key={cert}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-6xl text-white font-bold">MT</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Healthcare Software Development Expert<br />
                      HIPAA Compliance Specialist<br />
                      Enterprise Architecture Consultant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company History Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Journey
                </h2>
                <p className="text-xl text-gray-600">
                  From startup to industry leader in healthcare software development
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="text-3xl font-bold text-blue-600">2008</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Company Founded</h3>
                    <p className="text-gray-700">
                      SoftwarePros was established with a vision to make healthcare software 
                      accessible to organizations of all sizes.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-3xl font-bold text-blue-600">2012</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">First HIPAA Project</h3>
                    <p className="text-gray-700">
                      Successfully delivered our first HIPAA-compliant EHR system, establishing 
                      our expertise in healthcare compliance.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-3xl font-bold text-blue-600">2016</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Telemedicine Expansion</h3>
                    <p className="text-gray-700">
                      Launched our telemedicine platform development services, helping healthcare 
                      providers adapt to changing patient needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-3xl font-bold text-blue-600">2020</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pandemic Response</h3>
                    <p className="text-gray-700">
                      Rapidly deployed telemedicine solutions for healthcare providers during 
                      the COVID-19 pandemic, ensuring continuity of care.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-3xl font-bold text-blue-600">2024</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">AI & Innovation</h3>
                    <p className="text-gray-700">
                      Leading the industry in AI-powered healthcare solutions, blockchain 
                      integration, and next-generation telemedicine platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Technology?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Let's discuss how we can help your healthcare organization achieve measurable 
              improvements in efficiency, compliance, and patient care. We'll scope your goals 
              and propose a pragmatic roadmap in under a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors shadow-lg"
              >
                Get Started Today
              </a>
              <a
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 border border-white text-lg font-medium rounded-lg text-white hover:bg-blue-700 transition-colors"
              >
                View Our Work
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


