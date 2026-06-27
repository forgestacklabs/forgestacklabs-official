import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description: "Verify a Forgestack Labs internship or employment certificate using its serial number.",
  robots: { index: false, follow: false, nocache: true },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
