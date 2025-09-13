import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies - Software Pros | Healthcare Software Success Stories",
  description:
    "Explore our successful healthcare software implementations. Case studies from hospitals, clinics, and medical practices showing improved efficiency and patient care.",
  openGraph: {
    title: "Portfolio & Case Studies - Software Pros",
    description: "Successful healthcare software implementations and client testimonials.",
    url: "https://softwarepros.org/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
