import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Station Management Software India",
  description:
    "Forgestack Fuel OS is offline-first fuel station management software for billing, shifts, tank inventory, reconciliation, B2B credit, and remote operations.",
  keywords: [
    "fuel station management software India",
    "petrol pump management software",
    "petrol pump billing software",
    "fuel inventory management system",
    "offline fuel station POS",
    "fuel station shift management",
    "petrol pump reconciliation software",
    "Forgestack Fuel OS",
  ],
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Forgestack Fuel OS | Offline-First Fuel Station Software",
    description:
      "Manage billing, inventory, shifts, reconciliation, credit, and remote operations with an offline-first fuel retail platform.",
    url: "/products",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Forgestack Fuel OS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgestack Fuel OS | Fuel Station Management Software",
    description: "Offline-first operations, billing, inventory, and reconciliation for fuel stations.",
    images: ["/og-image.png"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Forgestack Fuel OS",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Fuel Station Management Software",
  operatingSystem: "Web, Android",
  url: "https://forgestacklabs.com/products",
  description:
    "Offline-first fuel station management software for billing, shifts, tank inventory, reconciliation, B2B credit, and remote operational visibility.",
  provider: {
    "@type": "Organization",
    name: "Forgestack Labs LLP",
    url: "https://forgestacklabs.com",
  },
  featureList: [
    "Offline-first billing and operations",
    "Fuel tank and nozzle inventory tracking",
    "Shift management and reconciliation",
    "B2B credit control",
    "Remote station visibility",
  ],
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {children}
    </>
  );
}

