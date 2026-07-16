import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development for India & International Clients",
  description:
    "Forgestack Labs builds custom software projects, SaaS platforms, dashboards, integrations, AI workflows, and operational systems for companies in India and international markets.",
  keywords: [
    "custom software development Mangaluru",
    "custom software development Mangalore",
    "custom software development India",
    "custom software development international clients",
    "remote software development company India",
    "custom software projects",
    "software company in Mangaluru",
    "web application development Mangalore",
    "SaaS development company Karnataka",
    "enterprise software development India",
    "enterprise software development global",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Custom Software Development for India & International Clients | Forgestack Labs",
    description:
      "Discuss a secure custom web application, SaaS platform, operational dashboard, integration, AI workflow, or business system with our engineering team.",
    url: "/contact",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Forgestack Labs custom software development" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software Development",
  serviceType: "Custom web application and SaaS development",
  url: "https://forgestacklabs.com/contact",
  description:
    "Custom software engineering for secure web applications, SaaS platforms, operational dashboards, integrations, AI workflows, and workflow automation for India and international markets.",
  provider: {
    "@type": "Organization",
    name: "Forgestack Labs LLP",
    url: "https://forgestacklabs.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mangaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  },
  areaServed: ["Mangaluru", "Karnataka", "India", "United States", "United Kingdom", "United Arab Emirates", "Europe", "Global"],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}




