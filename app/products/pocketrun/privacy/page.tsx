import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "PocketRun Privacy Policy",
  description: "How ForgeStack Labs LLP collects, uses, stores, and protects information when you use PocketRun.",
  alternates: { canonical: "/products/pocketrun/privacy" },
};

const sections = [
  {
    title: "1. Information PocketRun processes",
    body: [
      "Account information such as your name, email address, authentication identifiers, and profile details.",
      "Expense information you enter, including trips, amounts, categories, members, payment details you choose to record, balances, settlements, and business-workspace records.",
      "Collaboration information, including invitations, membership, approval requests, and activity associated with shared trips or workspaces.",
      "Receipts and other files you choose to attach. Eligible features may store these files in cloud storage for backup, restoration, and sharing with authorized collaborators.",
      "Technical information needed to operate and secure the service, including device and app information, session data, diagnostics, and notification tokens.",
      "Support feedback you choose to submit, including its title, details, category, submission time and PocketRun account ID. If you opt in, feedback also includes app version, build number, Android version, device model, workspace, plan and theme. Expenses and receipt files are not automatically attached to feedback; please do not include passwords or sensitive payment information.",
      "Safety reports, including the reported trip or Business Workspace, account or content reference, reason and details you provide, and your reporting account ID. Blocking preferences are used to prevent further cloud sharing with blocked accounts.",
      "Subscription and entitlement information. Purchases made through Google Play are processed by Google; PocketRun does not receive your full payment-card details.",
    ],
  },
  {
    title: "2. How we use information",
    body: [
      "We use information to authenticate users, provide expense and collaboration features, synchronize eligible data, back up and restore eligible receipts, deliver notifications, maintain subscriptions, prevent misuse, troubleshoot failures, and provide customer support.",
      "We do not use PocketRun to hold, transfer, or lend money. Recorded payment or UPI information is used to help users coordinate settlements and does not make PocketRun a bank or payment processor.",
    ],
  },
  {
    title: "3. Service providers and sharing",
    body: [
      "PocketRun uses service providers such as Supabase for authentication, database, and storage capabilities; Firebase Cloud Messaging for app notifications; and Google Play for distribution and subscription purchases.",
      "We use Notion to manage support feedback. Submitted feedback and its PocketRun account ID are sent to Notion; device diagnostics are forwarded only when you select the diagnostic-information option. Safety reports are stored in Supabase and restricted to authorized support personnel, rather than disclosed to the reported user.",
      "Shared-trip and workspace information is visible to authorized owners and collaborators according to their roles. We may also disclose information when required by law or when necessary to protect users, ForgeStack Labs LLP, or the service.",
      "We do not sell personal information.",
    ],
  },
  {
    title: "4. Storage, security, and retention",
    body: [
      "Some PocketRun information may remain on your device, while cloud-enabled features store eligible information with our service providers. We use access controls and other reasonable safeguards, but no method of storage or transmission is completely secure.",
      "We retain information for as long as needed to provide PocketRun, comply with legal obligations, resolve disputes, and enforce agreements. Feature-specific cloud retention periods may also apply and will be shown in the app where relevant.",
      "When account deletion is processed, we clear account-linked feedback text and diagnostics from current Notion records and move those records to Trash. Notion's API does not support permanent page deletion. Provider-managed revision history, Trash and backup copies may remain under the provider's retention settings; we handle any additional removal requests through provider and support processes. Deletion is not reported as complete when the automated feedback-cleanup step fails.",
    ],
  },
  {
    title: "5. Your choices and rights",
    body: [
      "You can review or update available profile information in PocketRun and remove content through the controls provided in the app. Shared content may remain visible to other authorized collaborators where required to preserve a trip or workspace record.",
      "You may request access, correction, export, or deletion of your personal information by using the in-app account controls or contacting us. We may need to verify your identity before completing a request.",
      "When you confirm account deletion in the current PocketRun app, Business Pass renewal is cancelled before account deletion. The account-deletion guide provides Google Play recovery instructions if cancellation fails.",
      "Verified email account-deletion requests will be completed within 30 days after identity verification. The public account-deletion page explains the steps, retained-data exceptions and Business Pass renewal cancellation before account deletion, with Google Play recovery instructions if cancellation fails. Safety records may be retained where necessary for abuse prevention, dispute resolution or legal obligations; access is restricted and any applicable retention exception will be explained when a deletion request is processed.",
    ],
  },
  {
    title: "6. Children, changes, and contact",
    body: [
      "PocketRun is not directed to children under 13. If you believe a child has provided personal information, contact us so we can investigate and take appropriate action.",
      "We may update this policy as PocketRun changes. The updated version will be posted on this page with a revised effective date.",
      "For privacy questions or requests, email hello@forgestacklabs.com. ForgeStack Labs LLP is based in Mangaluru, Karnataka, India.",
    ],
  },
];

export default function PocketRunPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-36 text-[#121212]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "PocketRun", path: "/products/pocketrun" }, { name: "Privacy Policy", path: "/products/pocketrun/privacy" }]} />
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[#121212]/55"><Link href="/products/pocketrun">PocketRun</Link> <span aria-hidden>/</span> Privacy Policy</nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.35em] text-[#71896f]">PocketRun legal</p>
        <h1 className="mt-5 text-5xl font-medium tracking-tight md:text-7xl">Privacy Policy</h1>
        <p className="mt-6 text-sm text-[#121212]/55">Updated October 2, 2026</p>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#121212]/65">This policy explains how ForgeStack Labs LLP collects, uses, stores, and protects information when you use the PocketRun Android application and its related cloud services.</p>

        <div className="mt-16 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[2rem] border border-[#121212]/10 bg-white/65 p-7 md:p-9">
              <h2 className="text-2xl font-medium tracking-tight">{section.title}</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#121212]/65">
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href="mailto:hello@forgestacklabs.com?subject=PocketRun%20Privacy%20Request" className="rounded-full bg-[#121212] px-6 py-3 text-sm font-medium text-white">Contact us about privacy</a>
          <Link href="/privacy" className="rounded-full border border-[#121212]/15 px-6 py-3 text-sm font-medium">ForgeStack Labs privacy</Link>
        </div>
      </div>
    </main>
  );
}
