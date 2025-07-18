'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Modern, scalable web applications built with cutting-edge technologies and best practices.',
    features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimized'],
    color: 'from-purple-600 to-blue-600',
  },
  {
    number: '02',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment'],
    color: 'from-blue-600 to-cyan-600',
  },
  {
    number: '03',
    title: 'Enterprise Solutions',
    description: 'Custom enterprise software solutions designed to streamline business operations.',
    features: ['Scalable Architecture', 'Cloud Integration', 'Security First', 'API Development'],
    color: 'from-cyan-600 to-teal-600',
  },
  {
    number: '04',
    title: 'Tech Consulting',
    description:
      'Strategic technology consulting to help businesses make informed technology decisions.',
    features: ['Architecture Review', 'Technology Stack', 'Performance Audit', 'Best Practices'],
    color: 'from-teal-600 to-green-600',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Why Choose SoftwarePros?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We deliver cutting-edge solutions that drive business growth and innovation
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: {
    number: string;
    title: string;
    description: string;
    features: string[];
    color: string;
  };
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
      />

      {/* Service Number */}
      <div
        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-6`}
      >
        <span className="text-2xl font-bold text-white">{service.number}</span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

        {/* Features */}
        <div className="space-y-3">
          {service.features.map((feature, featureIndex) => (
            <div
              key={feature}
              className={`flex items-center gap-3 transform transition-all duration-500 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200 + featureIndex * 100}ms` }}
            >
              <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`} />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    </div>
  );
}
