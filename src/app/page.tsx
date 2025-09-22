import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import type { Metadata } from "next";

// Force dynamic rendering to prevent framer-motion SSG issues
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SoftwarePros | Custom Software Development & Healthcare IT Solutions",
  description:
    "SoftwarePros - Custom software development, healthcare IT solutions, HIPAA-compliant systems, and enterprise consulting. Professional software development, tech consulting, and digital transformation for startups and enterprises.",
  alternates: {
    canonical: "https://softwarepros.org",
  },
  openGraph: {
    title: "SoftwarePros | Custom Software Development & Healthcare IT Solutions",
    description:
      "SoftwarePros - Custom software development, healthcare IT solutions, HIPAA-compliant systems, and enterprise consulting. Professional software development for startups and enterprises.",
    url: "https://softwarepros.org",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "SoftwarePros",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CTASection />
    </div>
  );
}
