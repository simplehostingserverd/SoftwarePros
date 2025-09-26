import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies - SoftwarePros | Healthcare Software Success Stories",
  description:
    "Explore our successful healthcare software implementations with real results. Case studies from hospitals, clinics, and medical practices showing improved efficiency, HIPAA compliance, and patient care. Client testimonials and reviews.",
  keywords: [
    "healthcare software case studies",
    "EHR implementation success stories",
    "medical software testimonials",
    "healthcare IT case studies",
    "HIPAA compliance success",
    "practice management case studies",
    "telemedicine implementation",
    "healthcare software reviews",
    "medical software client testimonials",
    "healthcare technology success stories",
  ],
  alternates: {
    canonical: "https://softwarepros.org/portfolio",
  },
  openGraph: {
    title: "Portfolio & Case Studies - SoftwarePros | Healthcare Software Success Stories",
    description:
      "Real success stories from healthcare software implementations. Client testimonials, case studies, and measurable results from our healthcare technology solutions.",
    url: "https://softwarepros.org/portfolio",
    type: "website",
    images: [
      {
        url: "/images/softwarepros-logo.png",
        width: 512,
        height: 512,
        alt: "SoftwarePros Healthcare Software Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Software Success Stories | SoftwarePros",
    description:
      "Real client testimonials and case studies from successful healthcare software implementations.",
    images: ["/images/softwarepros-logo.png"],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
