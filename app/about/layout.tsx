import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Software Engineering Lab in Mangaluru",
  description:
    "Meet Forgestack Labs, a Mangaluru-based software engineering company building proprietary SaaS products and custom business applications in-house.",
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
    description: "An in-house product and custom software engineering team based in Mangaluru, Karnataka.",
    url: "/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Forgestack Labs Mangaluru" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
