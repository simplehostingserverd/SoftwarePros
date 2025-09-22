import type { Metadata } from "next";
import InvestorsClient from "./InvestorsClient";

export const metadata: Metadata = {
  title: "Investors | SoftwarePros — Pitch Deck Overview",
  description:
    "Investor overview for SoftwarePros with market, traction, GTM, competitive edge, and use of funds. Pitch-deck style with interactive charts.",
  alternates: { canonical: "https://softwarepros.org/investors" },
  openGraph: {
    title: "Investors | SoftwarePros — Pitch Deck Overview",
    description:
      "Market size, traction, competitive advantages, GTM funnel, and use of funds, presented as an interactive pitch deck.",
    url: "https://softwarepros.org/investors",
    type: "website",
    images: [
      {
        url: "/images/softwarepros-logo.png",
        width: 512,
        height: 512,
        alt: "SoftwarePros Investor Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investors | SoftwarePros — Pitch Deck Overview",
    description: "Interactive charts showcasing market, traction, GTM, and more.",
    images: ["/images/softwarepros-logo.png"],
  },
};

export default function InvestorsPage() {
  return <InvestorsClient />;
}
