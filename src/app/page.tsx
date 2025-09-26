import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSeals from "@/components/TrustSeals";
import type { Metadata } from "next";

// Force dynamic rendering to prevent framer-motion SSG issues
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rio Grande Valley Software Developers | Healthcare IT Solutions Harlingen TX",
  description:
    "SoftwarePros - Leading Rio Grande Valley software development company in Harlingen, TX. Custom healthcare IT solutions, HIPAA-compliant systems, and enterprise consulting for RGV businesses. Professional software developers serving South Texas since 2020.",
  alternates: {
    canonical: "https://softwarepros.org",
  },
  openGraph: {
    title: "Rio Grande Valley Software Developers | Healthcare IT Solutions Harlingen TX",
    description:
      "Leading Rio Grande Valley software development company in Harlingen, TX. Custom healthcare IT solutions, HIPAA-compliant systems, and enterprise consulting for RGV businesses.",
    url: "https://softwarepros.org",
    images: [
      {
        url: "/images/softwarepros-logo.png",
        width: 512,
        height: 512,
        alt: "SoftwarePros",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
      <TrustSeals />
    </>
  );
}
