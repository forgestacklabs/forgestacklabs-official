import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "PocketRun — Personal and Shared Expense Tracking",
  description: "PocketRun helps individuals and groups track expenses, receipts, collaborators, and settlements.",
  alternates: { canonical: "/products/pocketrun" },
  openGraph: {
    title: "PocketRun | ForgeStack Labs",
    description: "Personal and shared expense tracking for everyday spending and trips.",
    url: "/products/pocketrun",
    type: "website",
  },
};

const capabilities = [
  "Personal and shared trip expenses",
  "Member balances and settlement flows",
  "Receipt attachment and cloud backup on eligible plans",
  "Invite-based collaboration",
  "Expense review and approval workflows",
  "Business workspaces on eligible plans",
];

export default function PocketRunPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PocketRun",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android",
    description: "Personal and shared expense tracking for individuals, travel groups, and small teams.",
    creator: { "@type": "Organization", name: "ForgeStack Labs LLP" },
    url: "https://www.forgestacklabs.com/products/pocketrun",
  };

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-36 text-[#121212]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "PocketRun", path: "/products/pocketrun" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[#121212]/55"><Link href="/products">Products</Link> <span aria-hidden>/</span> PocketRun</nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.35em] text-[#71896f]">A ForgeStack Labs product</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-medium tracking-tight md:text-7xl">Shared expenses, kept clear.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#121212]/65">PocketRun helps individuals, travel groups, and small teams record expenses, coordinate collaborators, retain receipts, and understand who owes what.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/products/pocketrun/privacy" className="rounded-full bg-[#121212] px-6 py-3 text-sm font-medium text-white">Read the Privacy Policy</Link>
          <Link href="/products/pocketrun/terms" className="rounded-full border border-[#121212]/15 px-6 py-3 text-sm font-medium">Read the Terms &amp; Conditions</Link>
          <Link href="/products/pocketrun/account-deletion" className="rounded-full border border-[#121212]/15 px-6 py-3 text-sm font-medium">Delete your account</Link>
          <Link href="/contact" className="rounded-full border border-[#121212]/15 px-6 py-3 text-sm font-medium">Contact support</Link>
        </div>
        <section className="mt-20">
          <h2 className="text-3xl font-medium tracking-tight">PocketRun capabilities</h2>
          <p className="mt-4 max-w-2xl text-[#121212]/60">Feature availability depends on the selected plan and active entitlements.</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">{capabilities.map((item) => <li key={item} className="rounded-2xl border border-[#121212]/10 bg-white/65 p-5">{item}</li>)}</ul>
        </section>
      </div>
    </main>
  );
}
