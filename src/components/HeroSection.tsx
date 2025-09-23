"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div
          className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Logo and Main Heading */}
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/30">
                <img
                  src="/images/softwarepros-logo.png"
                  alt="SoftwarePros Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
              SoftwarePros
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-4xl mx-auto">
              Custom Software Solutions & Tech Consulting
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Professional software development, consulting, and digital solutions for startups and
            enterprises. Built by experts. Trusted by businesses worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border-2 border-purple-500/50 text-purple-300 font-semibold rounded-full hover:border-purple-400 hover:text-purple-200 hover:bg-purple-500/10 transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>

        {/* Animated Code Blocks - Full Width Below */}
        <div className="pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatedCodeBlock
            title="Frontend"
            code={`const App = () => {
  return (
    <div className="modern">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};`}
            delay={800}
          />
          <AnimatedCodeBlock
            title="Backend"
            code={`app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json({ success: true, user });
});`}
            delay={1000}
          />
          <AnimatedCodeBlock
            title="Database"
            code={`SELECT u.name, p.title
FROM users u
JOIN projects p ON u.id = p.user_id
WHERE p.status = 'active';`}
            delay={1200}
          />
        </div>
      </div>
    </section>
  );
}

interface AnimatedCodeBlockProps {
  title: string;
  code: string;
  delay: number;
}

function AnimatedCodeBlock({ title, code, delay }: AnimatedCodeBlockProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <span className="text-gray-400 text-sm font-mono">{title}</span>
      </div>
      <pre className="text-sm text-gray-300 font-mono overflow-hidden">
        <code>{code}</code>
      </pre>
    </div>
  );
}
