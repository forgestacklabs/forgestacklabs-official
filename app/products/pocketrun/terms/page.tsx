import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "PocketRun Terms and Conditions",
  description: "Terms governing access to and use of the PocketRun Android application.",
  alternates: { canonical: "/products/pocketrun/terms" },
};

const terms = [
  ["1. Acceptance", "By downloading, installing, accessing, or using PocketRun, you agree to these Terms and Conditions. If you do not agree, do not use the service."],
  ["2. Service and accounts", "PocketRun provides tools for personal and shared trip expenses, settlements, collaboration, receipt handling, and project or small-business expense records. Features may vary by plan, entitlement, permissions, device, region, and technical availability. You are responsible for accurate account information and for safeguarding your credentials."],
  ["3. Expenses, settlements, and collaboration", "Users are responsible for confirming expense amounts, payers, participants, categories, dates, payment status, approvals, and settlement records. Unless expressly offered as a payment service, PocketRun does not transfer money or independently verify that an external payment occurred."],
  ["4. Business Workspace", "Business Workspace calculations depend on information and configuration supplied by users. Users must have authority to enter or share client and business information and must verify outputs before using them for invoices, accounts, taxation, reporting, contracts, or other consequential purposes."],
  ["5. Offline use and synchronization", "Locally stored records may not be immediately available to collaborators. Users should confirm synchronization has completed and review any conflict, duplication, or discrepancy."],
  ["6. Subscriptions and Google Play", "Paid access, Trip Passes, renewals, cancellations, and refunds are subject to the offering shown at purchase and applicable Google Play terms and policies."],
  ["7. User data and acceptable use", "You retain your rights in information you lawfully submit and grant ForgeStack Labs LLP the limited rights needed to operate, secure, and maintain PocketRun. You must not misuse the service, violate law, infringe rights, upload unauthorized content, circumvent access controls, or interfere with service security or availability."],
  ["8. Availability and termination", "ForgeStack Labs LLP may modify, update, restrict, suspend, or discontinue features where reasonably necessary for security, maintenance, legal compliance, technical development, or business operations. Account and data deletion remain subject to the Privacy Policy and applicable retention requirements."],
];

export default function PocketRunTermsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-36 text-[#121212]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "PocketRun", path: "/products/pocketrun" }, { name: "Terms and Conditions", path: "/products/pocketrun/terms" }]} />
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[#121212]/55"><Link href="/products/pocketrun">PocketRun</Link> <span aria-hidden>/</span> Terms &amp; Conditions</nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.35em] text-[#71896f]">PocketRun legal</p>
        <h1 className="mt-5 text-5xl font-medium tracking-tight md:text-7xl">Terms &amp; Conditions</h1>
        <p className="mt-6 text-sm text-[#121212]/55">Effective September 27, 2026</p>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#121212]/65">These terms govern access to and use of PocketRun, an Android application operated by ForgeStack Labs LLP.</p>

        <div className="mt-16 space-y-6">
          {terms.map(([title, body]) => (
            <section key={title} className="rounded-[2rem] border border-[#121212]/10 bg-white/65 p-7 md:p-9">
              <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-[#121212]/65">{body}</p>
            </section>
          ))}

          <section className="rounded-[2rem] border border-[#121212]/15 bg-white p-7 md:p-9">
            <h2 className="text-2xl font-medium tracking-tight">Disclaimers</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[#121212]/65">
              <p><strong className="font-semibold text-[#121212]">Financial and Accounting Disclaimer:</strong> PocketRun is a record-keeping and expense-management tool. It is not an accounting, auditing, taxation, legal, investment, banking, lending, insurance, or financial-advisory service.</p>
              <p>Calculations, balances, suggested settlements, project costs, profit distributions, and other outputs are generated based on information entered or processed through the service and should be independently verified before being relied upon for financial, accounting, tax, business, or other consequential purposes.</p>
              <p>PocketRun is provided on an as-available basis to the maximum extent permitted by applicable law. ForgeStack Labs LLP does not guarantee reimbursement, settlement, collection of money, client payment, project profitability, or any financial outcome.</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#121212]/10 bg-white/65 p-7 md:p-9">
            <h2 className="text-2xl font-medium tracking-tight">Privacy, governing law, and contact</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[#121212]/65">
              <p>Use of PocketRun is also subject to the <Link href="/products/pocketrun/privacy" className="font-medium text-[#121212] underline underline-offset-4">PocketRun Privacy Policy</Link>. These terms are governed by the laws of India, subject to mandatory applicable law.</p>
              <p>Questions may be sent to <a href="mailto:hello@forgestacklabs.com" className="font-medium text-[#121212] underline underline-offset-4">hello@forgestacklabs.com</a>. ForgeStack Labs LLP is based in Mangaluru, Karnataka, India.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
