import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Delete Your PocketRun Account",
  description: "Instructions for deleting a PocketRun account and its associated data.",
  alternates: { canonical: "/products/pocketrun/account-deletion" },
};

const deletedItems = [
  "Your PocketRun profile and authentication account.",
  "Personal cloud trips and expenses owned by your account.",
  "Cloud receipts and attachments associated with your account.",
  "Collaboration and notification data associated with your account.",
  "Business data associated with your account where deletion is permitted and does not adversely affect other authorized workspace members.",
];

const retainedItems = [
  "Purchase and subscription records.",
  "Fraud-prevention and security logs.",
  "Records required to be retained by applicable law.",
  "Information necessary to resolve disputes or enforce legal rights.",
  "Temporary encrypted backup copies until their normal backup-expiry cycle.",
  "Shared records needed by other authorized trip or workspace participants; where appropriate and permitted, these records may be anonymized rather than fully removed.",
];

const sensitiveItems = [
  "Your password, OTP, verification code, or authentication token.",
  "Payment-card information.",
  "Full receipts or documents unless specifically requested through an authorized support process.",
  "Other sensitive information that is not required to identify your account.",
];

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-[#121212]/10 bg-white/65 p-7 md:p-9">
      <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-[#121212]/65">{children}</div>
    </section>
  );
}

export default function PocketRunAccountDeletionPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-36 text-[#121212]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "PocketRun", path: "/products/pocketrun" }, { name: "Account Deletion", path: "/products/pocketrun/account-deletion" }]} />
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[#121212]/55"><Link href="/products/pocketrun">PocketRun</Link> <span aria-hidden>/</span> Account Deletion</nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.35em] text-[#71896f]">PocketRun account support</p>
        <h1 className="mt-5 text-5xl font-medium tracking-tight md:text-7xl">Delete your account</h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#121212]/65">You can request deletion of your PocketRun account and associated data. Use the in-app option when you can access PocketRun, or email our support team when you cannot access the app.</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="mailto:hello@forgestacklabs.com?subject=PocketRun%20Account%20Deletion%20Request" className="rounded-full bg-[#121212] px-6 py-3 text-sm font-medium text-white">Request deletion by email</a>
          <Link href="/products/pocketrun/privacy" className="rounded-full border border-[#121212]/15 px-6 py-3 text-sm font-medium">Privacy Policy</Link>
        </div>

        <div className="mt-16 space-y-6">
          <InfoCard title="Delete your account in PocketRun">
            <p>If you can access the Android app, open:</p>
            <p className="font-semibold text-[#121212]">Profile / Settings → Account → Delete Account</p>
            <p>Follow the instructions shown in the app to confirm your deletion request.</p>
          </InfoCard>

          <InfoCard title="Request deletion by email">
            <p>If you cannot access your account or no longer have the app installed, email <a href="mailto:hello@forgestacklabs.com?subject=PocketRun%20Account%20Deletion%20Request" className="font-medium text-[#121212] underline underline-offset-4">hello@forgestacklabs.com</a>.</p>
            <p>Include your PocketRun account email address, your display name if available, and a clear statement requesting deletion of your PocketRun account.</p>
            <p>ForgeStack Labs LLP may contact you for reasonable identity verification before processing the request.</p>
          </InfoCard>

          <InfoCard title="Do not send sensitive information">
            <ul className="list-disc space-y-2 pl-5">{sensitiveItems.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>We will not ask you to send your password or OTP by email.</p>
          </InfoCard>

          <InfoCard title="What will be deleted">
            <p>After your request is verified and processed, PocketRun will delete personal account data and associated data that is eligible for deletion, including where applicable:</p>
            <ul className="list-disc space-y-2 pl-5">{deletedItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </InfoCard>

          <InfoCard title="Information that may be retained">
            <p>Some information may need to be retained for a limited period or where deletion is not appropriate or legally permitted:</p>
            <ul className="list-disc space-y-2 pl-5">{retainedItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </InfoCard>

          <InfoCard title="Shared trips and Business Workspaces">
            <p>Deleting your account does not necessarily remove every record previously shared with another authorized participant. Shared expense information may remain relevant to other trip members, while Business Workspace records may be accessible to multiple authorized users.</p>
            <p>These records will be handled according to the PocketRun Privacy Policy and applicable requirements.</p>
          </InfoCard>

          <InfoCard title="Processing time and identity verification">
            <p>Verified deletion requests will be reviewed and processed within a reasonable period. Additional identity verification may be required to protect accounts from unauthorized deletion.</p>
            <p>Certain information may remain temporarily in backups, security logs, or legally required records until the applicable retention period expires.</p>
          </InfoCard>

          <InfoCard title="Legal documents and support">
            <p>Review the <Link href="/products/pocketrun/privacy" className="font-medium text-[#121212] underline underline-offset-4">PocketRun Privacy Policy</Link> and <Link href="/products/pocketrun/terms" className="font-medium text-[#121212] underline underline-offset-4">Terms &amp; Conditions</Link>.</p>
            <p>For help, contact ForgeStack Labs LLP at <a href="mailto:hello@forgestacklabs.com" className="font-medium text-[#121212] underline underline-offset-4">hello@forgestacklabs.com</a>.</p>
          </InfoCard>
        </div>
      </div>
    </main>
  );
}
