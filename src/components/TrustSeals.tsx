"use client";

import React from "react";

const trustSeals = [
  {
    name: "HIPAA Compliant",
    description: "Healthcare data protection certified",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.8C8,12.2 8.6,11.7 9.2,11.7V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
      </svg>
    ),
    color: "text-blue-600 bg-blue-50",
  },
  {
    name: "SOC 2 Certified",
    description: "Security & availability standards",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17,9H7V7A5,5 0 0,1 12,2A5,5 0 0,1 17,7V9M6,20V10H18V20H6M12,17.5A1.5,1.5 0 0,1 10.5,16A1.5,1.5 0 0,1 12,14.5A1.5,1.5 0 0,1 13.5,16A1.5,1.5 0 0,1 12,17.5Z" />
      </svg>
    ),
    color: "text-green-600 bg-green-50",
  },
  {
    name: "AWS Certified",
    description: "Cloud infrastructure expertise",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.5,10.5C6.5,9.7 7.2,9 8,9H16C16.8,9 17.5,9.7 17.5,10.5V16.5C17.5,17.3 16.8,18 16,18H8C7.2,18 6.5,17.3 6.5,16.5V10.5M8,11.5V15.5H16V11.5H8M20,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V5A2,2 0 0,0 20,3M20,19H4V5H20V19Z" />
      </svg>
    ),
    color: "text-orange-600 bg-orange-50",
  },
  {
    name: "ISO 27001 Trained",
    description: "Information security management",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
      </svg>
    ),
    color: "text-purple-600 bg-purple-50",
  },
  {
    name: "HL7 FHIR Certified",
    description: "Healthcare data interoperability",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19,3H5C3.9,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M17,17H7V15H17V17M17,13H7V11H17V13M17,9H7V7H17V9Z" />
      </svg>
    ),
    color: "text-red-600 bg-red-50",
  },
  {
    name: "99.9% Uptime",
    description: "Guaranteed system reliability",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
      </svg>
    ),
    color: "text-emerald-600 bg-emerald-50",
  },
];

export default function TrustSeals() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Organizations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our certifications and guarantees ensure your healthcare software meets the highest
            standards for security, compliance, and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustSeals.map((seal) => (
            <div
              key={seal.name}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${seal.color} mb-4`}
                >
                  {seal.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{seal.name}</h3>
                <p className="text-gray-600 text-sm">{seal.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 text-sm">Healthcare Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
                <div className="text-gray-600 text-sm">Patients Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> SoftwarePros.org is not affiliated with SoftwarePros.com
              or any similarly named entities. Our certifications, client testimonials, and track
              record are specific to our organization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
