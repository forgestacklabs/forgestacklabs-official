import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { services, servicesAnswers } from "./services-data";

// Replace forgestacklabs.com below if the production domain differs.
const SITE_URL = "https://www.forgestacklabs.com";

export const metadata: Metadata = {
  title: "Software Development Services | ForgeStack Labs",
  description:
    "ForgeStack Labs builds custom software, enterprise systems, web and mobile apps, and AI-enabled automation — from a team that also builds and operates its own SaaS products.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Software Development Services | ForgeStack Labs",
    description:
      "Custom software, enterprise systems, web and mobile apps, AI automation, and product engineering — delivered by a product-first engineering team.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "ForgeStack Labs",
      url: SITE_URL,
    },
    name: "Software Engineering Services",
    description:
      "Custom software development, enterprise software, web and mobile app development, AI solutions & automation, product engineering, and API/system integration.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ForgeStack Labs Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.shortCopy,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesAnswers.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicesPageClient />
    </>
  );
}