import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Fuel OS — Fuel Station Management Software",
  description: "Fuel OS is ForgeStack Labs software for fuel-station billing, inventory, shifts, reconciliation, credit management, and reporting.",
  alternates: { canonical: "/products/fuel-os" },
  openGraph: { title: "Fuel OS | ForgeStack Labs", description: "Operational software for fuel-station teams.", url: "/products/fuel-os", type: "website" },
};

const capabilities = ["Billing and point-of-sale workflows", "Inventory and wet-stock records", "Shift controls and reconciliation", "Credit-customer management", "Operational reporting", "Offline-first field workflows"];

export default function FuelOSPage() {
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Fuel OS", applicationCategory: "BusinessApplication", operatingSystem: "Web and mobile", description: "Fuel-station operations software for billing, inventory, shifts, reconciliation, credit management, and reporting.", creator: { "@type": "Organization", name: "ForgeStack Labs LLP" }, url: "https://www.forgestacklabs.com/products/fuel-os" };
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-36 text-[#121212]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Fuel OS", path: "/products/fuel-os" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[#121212]/55"><Link href="/products">Products</Link> <span aria-hidden>/</span> Fuel OS</nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.35em] text-[#71896f]">A ForgeStack Labs product</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-medium tracking-tight md:text-7xl">Fuel-station operations in one connected system.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#121212]/65">Fuel OS is designed to connect billing, stock, shifts, reconciliation, credit, and reporting for fuel-station owners and operating teams, including workflows that must continue through unreliable connectivity.</p>
        <div className="mt-10 flex flex-wrap gap-3"><Link href="/contact?mode=demo&product=fuel-os#contact-inquiry" data-analytics="product_cta" data-analytics-context="fuel-os" className="rounded-full bg-[#121212] px-6 py-3 text-sm font-medium text-white">Request a Fuel OS conversation</Link><Link href="/products" className="rounded-full border border-[#121212]/15 px-6 py-3 text-sm font-medium">View all products</Link></div>
        <section className="mt-20"><h2 className="text-3xl font-medium tracking-tight">Published capability areas</h2><p className="mt-4 max-w-2xl text-[#121212]/60">These describe product scope, not customer outcome claims or availability guarantees.</p><ul className="mt-8 grid gap-4 md:grid-cols-2">{capabilities.map((item) => <li key={item} className="rounded-2xl border border-[#121212]/10 bg-white/65 p-5">{item}</li>)}</ul></section>
      </div>
    </main>
  );
}
