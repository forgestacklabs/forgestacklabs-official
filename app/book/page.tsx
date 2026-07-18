import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";

export const metadata: Metadata = {
  title: "The ForgeStack Book",
  description:
    "Read The ForgeStack Book online, including the ForgeStack philosophy, story, capabilities, Fuel OS, engineering principles, research, founders, and partnership letter.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "The ForgeStack Book | Forgestack Labs",
    description:
      "The online ForgeStack Book reader with chapters covering philosophy, capabilities, Fuel OS, engineering, research, founders, and partnership.",
    url: "/book",
    type: "website",
  },
};

const items = [
  {
    eyebrow: "Online reader",
    title: "Read the full ForgeStack Book.",
    copy:
      "Open the interactive reader with page progress, table of contents, search, bookmarks, mobile page turning, and the complete company narrative.",
    href: "/forgestack-capability-deck.html",
    points: ["Online reader", "Progress indicator", "Table of contents"],
  },
  {
    eyebrow: "PDF",
    title: "Download the capability deck.",
    copy:
      "Download a concise PDF capability deck covering what we build, the delivery model, Fuel OS, and how to engage ForgeStack Labs.",
    href: "/capability-deck/download",
    points: ["PDF download", "Capability overview", "Engagement summary"],
  },
  {
    eyebrow: "Chapters",
    title: "One source of truth for website messaging.",
    copy:
      "The website roadmap reuses the Book across homepage, The Lab, Engineering Capabilities, Fuel OS, Manifesto, Research, Contact, and SEO pages.",
    points: ["All chapters", "Consistent messaging", "Editorial source"],
  },
] as const;

export default function BookPage() {
  return (
    <EditorialPage
      eyebrow="The ForgeStack Book"
      title="A company book, not a brochure."
      intro="The ForgeStack Book documents how we think, why we build, what we believe, and the standards that define every product and partnership."
      items={items}
    />
  );
}
