import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../services-data";
import ServiceDetailClient from "./ServiceDetailClient";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const SITE_URL = "https://www.forgestacklabs.com";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};

  return {
    title: `${service.title} | ForgeStack Labs`,
    description: service.shortCopy,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ForgeStack Labs`,
      description: service.shortCopy,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: "ForgeStack Labs", url: SITE_URL },
    name: service.title,
    description: service.longCopy,
    url: `${SITE_URL}/services/${service.slug}`,
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}