import type { Metadata } from "next";
import ForgeOSShell from "@/components/forgeos/ForgeOSShell";
export const metadata: Metadata = { title: "ForgeOS", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) { return <ForgeOSShell>{children}</ForgeOSShell>; }
