import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers in Software Engineering",
  description:
    "Explore future software engineering and product internship opportunities at Forgestack Labs in Mangaluru, Karnataka.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at Forgestack Labs",
    description: "Future software engineering and product opportunities in Mangaluru, Karnataka.",
    url: "/careers",
    type: "website",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
