import type { Metadata } from "next";
import InteractiveTimelinePage from "@/components/InteractiveTimelinePage";

export const metadata: Metadata = {
  title: "ForgeStack Timeline",
  description: "The ForgeStack Labs origin timeline from the founding conversation to Fuel OS development.",
  alternates: { canonical: "/timeline" },
};

const items = [
  { eyebrow: "18 Dec 2025", title: "The phone call.", copy: "A conversation between friends turned the idea of building products into a real commitment." },
  { eyebrow: "18 Dec 2025", title: "Three founders commit.", copy: "Sriharsha, Hardhik, and Pulavarson chose trust, ownership, and commitment before certainty existed." },
  { eyebrow: "Dec 2025", title: "The first product direction.", copy: "Fuel retail operations became the first problem space because the team understood the complexity from lived experience." },
  { eyebrow: "Jan 2026", title: "Fuel OS development begins.", copy: "The company began turning manual reconciliation, disconnected records, and offline dependency into a connected operating system." },
] as const;

export default function TimelinePage() {
  return (
    <InteractiveTimelinePage
      eyebrow="Interactive Timeline"
      title="Three friends. One conversation. One commitment."
      intro="The ForgeStack timeline traces the moments that turned a shared belief into a company and a product direction."
      items={items}
    />
  );
}
