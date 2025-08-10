"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Ready to Build Something Amazing?
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's discuss your project and turn your ideas into reality with cutting-edge technology
            solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link
              href="/contact"
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Arrow right"
                >
                  <title>Arrow right</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/portfolio"
              className="px-10 py-5 border-2 border-purple-500/50 text-purple-300 font-bold text-lg rounded-full hover:border-purple-400 hover:text-purple-200 hover:bg-purple-500/10 transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>

          {/* Contact Info */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-purple-400 font-semibold">Email</div>
              <a 
                href="mailto:contact@softwarepros.org"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                contact@softwarepros.org
              </a>
            </div>
            <div className="space-y-2">
              <div className="text-purple-400 font-semibold">Response Time</div>
              <div className="text-gray-300">Within 24 hours</div>
            </div>
            <div className="space-y-2">
              <div className="text-purple-400 font-semibold">Free Consultation</div>
              <div className="text-gray-300">30-minute strategy call</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
