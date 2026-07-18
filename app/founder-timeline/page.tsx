import type { Metadata } from "next";
import InteractiveTimelinePage from "@/components/InteractiveTimelinePage";

export const metadata: Metadata = {
  title: "Founder Timeline",
  description: "Founder timeline and principles behind ForgeStack Labs.",
  alternates: { canonical: "/founder-timeline" },
};

const items = [
  { eyebrow: "Sriharsha", title: "Product strategy and vision.", copy: "Every product begins with understanding the problem, not the technology." },
  { eyebrow: "Hardhik", title: "Architecture and engineering foundations.", copy: "Great architecture should remain invisible while supporting everything around it." },
  { eyebrow: "Pulavarson", title: "Product delivery and user experience.", copy: "The best interface is the one users never have to think about." },
  { eyebrow: "Shared principles", title: "Curiosity, ownership, transparency, craftsmanship.", copy: "The founding team shares a long-term belief that software quality and trust are built one decision at a time." },
] as const;

export default function FounderTimelinePage() {
  return (
    <InteractiveTimelinePage
      eyebrow="Founder Timeline"
      title="The people behind ForgeStack."
      intro="Products are shaped by people. This page frames the founder roles, principles, and shared commitment behind the company."
      items={items}
    />
  );
}
