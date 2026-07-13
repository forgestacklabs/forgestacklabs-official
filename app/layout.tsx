import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import BackgroundField from "@/components/BackgroundField";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ReloadRedirect from "@/components/ReloadRedirect";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://www.forgestacklabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Operational Software & Enterprise Engineering | Forgestack Labs",
    template: "%s | Forgestack Labs",
  },
  description:
    "ForgeStack Labs engineers operational software, enterprise platforms, Fuel OS, AI workflows, and secure scalable systems for complex real-world operations.",
  keywords: [
    "operational software engineering",
    "enterprise software engineering",
    "enterprise product engineering",
    "fuel station management software",
    "petrol pump management software India",
    "offline-first fuel station POS",
    "fuel inventory management software",
    "custom software development Mangaluru",
    "custom software development Mangalore",
    "web application development Mangaluru",
    "Forgestack Labs",
  ],
  authors: [{ name: "Forgestack Labs LLP", url: siteUrl }],
  creator: "Forgestack Labs LLP",
  publisher: "Forgestack Labs LLP",
  applicationName: "Forgestack Labs",
  category: "Technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Operational Software & Enterprise Engineering | Forgestack Labs",
    description:
      "Operational software, enterprise platforms, Fuel OS, AI workflows, and secure scalable systems for complex real-world operations.",
    url: "/",
    siteName: "Forgestack Labs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Forgestack Labs software engineering and Fuel OS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operational Software & Enterprise Engineering | Forgestack Labs",
    description:
      "Operational software, enterprise platforms, Fuel OS, AI workflows, and secure scalable systems for complex real-world operations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Forgestack Labs LLP",
      alternateName: ["Forgestack Labs", "ForgeStack Labs"],
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      email: "hello@forgestacklabs.com",
      slogan: "When Vision Meets Precision",
      description:
        "Software engineering company building operational software, enterprise platforms, Fuel OS, AI workflows, and secure scalable systems.",
      knowsAbout: [
        "Operational software engineering",
        "Enterprise software engineering",
        "Enterprise product engineering",
        "Fuel station management software",
        "Offline-first software",
        "Custom web application development",
        "SaaS product engineering",
        "Backend API development",
        "Operational dashboards",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mangaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Mangaluru" },
        { "@type": "State", name: "Karnataka" },
        { "@type": "Country", name: "India" },
      ],
      sameAs: ["https://www.goodfirms.co/company/forgestack-labs-llp"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Forgestack Labs",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-ink font-sans text-white">
        <ReloadRedirect />
        <BackgroundField />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
              <Analytics />
      </body>
    </html>
  );
}



