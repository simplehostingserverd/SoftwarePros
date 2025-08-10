import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Software Services - Software Pros | HIPAA Compliant Solutions",
  description:
    "Comprehensive healthcare software services including medical clinic software, dental practice management, hospital systems, HIPAA compliance, and cloud solutions.",
  openGraph: {
    title: "Healthcare Software Services - Software Pros",
    description:
      "Comprehensive healthcare software services for medical practices, hospitals, and healthcare providers.",
    url: "https://softwarepros.org/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
