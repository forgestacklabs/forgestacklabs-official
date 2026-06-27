import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development in Mangaluru",
  description:
    "Forgestack Labs is a custom software development company in Mangaluru, Karnataka, building secure web applications, SaaS platforms, dashboards, and workflow systems.",
  keywords: [
    "custom software development Mangaluru",
    "custom software development Mangalore",
    "software company in Mangaluru",
    "web application development Mangalore",
    "SaaS development company Karnataka",
    "enterprise software development India",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Custom Software Development in Mangaluru | Forgestack Labs",
    description:
      "Discuss a secure custom web application, SaaS platform, operational dashboard, or workflow system with our Mangaluru engineering team.",
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
    "Custom software engineering for secure web applications, SaaS platforms, operational dashboards, and workflow automation.",
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
  areaServed: ["Mangaluru", "Karnataka", "India"],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}
