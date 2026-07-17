import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Retail Architecture & Engineering Resources",
  description:
    "Explore Forgestack Labs architecture presentations, product mechanics, videos, and engineering notes for offline-first fuel retail systems.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Engineering Resources | Forgestack Labs",
    description: "Architecture presentations and engineering notes for offline-first fuel retail software.",
    url: "/resources",
    type: "website",
  },
};

const resourcesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://forgestacklabs.com/resources#page",
  url: "https://forgestacklabs.com/resources",
  name: "Forgestack Labs Engineering Resources",
  description: "Videos, architecture presentations, and engineering notes about Forgestack Labs and its offline-first fuel retail systems.",
  about: [
    "Offline-first software architecture",
    "Fuel station management software",
    "Fuel retail operations",
    "Software engineering standards",
  ],
  hasPart: [
    {
      "@type": "VideoObject",
      name: "Forgestack Labs Architecture Overview",
      description: "An overview of how Forgestack approaches offline-first architecture for fuel retail operations.",
      thumbnailUrl: "https://forgestacklabs.com/gallery/slide1.png",
      uploadDate: "2026-06-23T18:09:45+05:30",
      contentUrl: "https://forgestacklabs.com/gallery/demo_vedio.mp4",
    },
    {
      "@type": "CreativeWork",
      name: "Forgestack Labs Corporate and Architecture Overview",
      description: "A visual architecture deck covering Forgestack Labs, Fuel OS, and the engineering model behind the platform.",
      url: "https://forgestacklabs.com/resources#architecture-deck",
    },
  ],
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesSchema) }} />
      {children}
    </>
  );
}
