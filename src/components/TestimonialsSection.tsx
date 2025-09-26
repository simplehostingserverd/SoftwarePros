"use client";

import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    title: "Chief Medical Officer",
    company: "Regional Medical Center",
    avatar: "/images/testimonials/dr-sarah-johnson.jpg",
    rating: 5,
    testimonial:
      "SoftwarePros transformed our entire healthcare delivery system. The EHR implementation was seamless, and the ongoing support has been exceptional. Our patient satisfaction scores have never been higher.",
    results: "60% reduction in patient wait times, 40% improvement in billing accuracy",
  },
  {
    name: "Dr. Michael Chen",
    title: "Practice Owner",
    company: "Dental Excellence Group",
    avatar: "/images/testimonials/dr-michael-chen.jpg",
    rating: 5,
    testimonial:
      "The practice management system has revolutionized how we operate across our 15 locations. Real-time reporting and centralized management have improved our efficiency tremendously.",
    results: "50% reduction in administrative overhead, 30% decrease in appointment no-shows",
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Medical Director",
    company: "Metro Clinic Network",
    avatar: "/images/testimonials/dr-emily-rodriguez.jpg",
    rating: 5,
    testimonial:
      "The telemedicine platform allowed us to continue serving our patients during the most challenging times. The technology is robust, secure, and user-friendly for both staff and patients.",
    results: "300% increase in patient consultations, 90% patient satisfaction with virtual visits",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real testimonials from healthcare professionals who've transformed their operations with
            our software solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-300 mb-6 italic text-lg leading-relaxed">
                "{testimonial.testimonial}"
              </blockquote>

              {/* Results */}
              <div className="mb-6 p-3 bg-blue-600/10 rounded-lg border border-blue-500/20">
                <p className="text-blue-300 text-sm font-medium">Key Results:</p>
                <p className="text-blue-200 text-sm">{testimonial.results}</p>
              </div>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.title}</div>
                  <div className="text-purple-400 text-sm font-medium">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Case Studies
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
