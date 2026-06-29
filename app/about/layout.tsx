import type { Metadata } from "next";
import { customSoftwareAnswers } from "@/lib/aeo-content";

export const metadata: Metadata = {
  title: "About Our Software Engineering Lab in Mangaluru",
  description:
    "Meet Forgestack Labs, a DPIIT-recognized Mangaluru software engineering company building Forgestack Fuel OS, proprietary SaaS, and custom business applications in-house.",
  keywords: [
    "software engineering company Mangaluru",
    "software company Mangalore",
    "SaaS company Karnataka",
    "custom application developers Mangaluru",
    "Forgestack Labs LLP",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Forgestack Labs | Software Engineering in Mangaluru",
    description: "An in-house product and custom software engineering company based in Mangaluru, Karnataka.",
    url: "/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Forgestack Labs Mangaluru" }],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://forgestacklabs.com/about#page",
  url: "https://forgestacklabs.com/about",
  name: "About Forgestack Labs",
  description: "Company facts, engineering approach, and culture at Forgestack Labs LLP in Mangaluru, Karnataka.",
  mainEntity: {
    "@id": "https://forgestacklabs.com/#organization",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: customSoftwareAnswers.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}

