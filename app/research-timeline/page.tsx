import type { Metadata } from "next";
import InteractiveTimelinePage from "@/components/InteractiveTimelinePage";

export const metadata: Metadata = {
  title: "Research Timeline",
  description: "ForgeStack Labs research timeline across AI, operational intelligence, offline computing, automation, and digital twins.",
  alternates: { canonical: "/research-timeline" },
};

const items = [
  { eyebrow: "Observation", title: "Research begins with operations.", copy: "We study how businesses actually work before deciding what technology belongs in the system." },
  { eyebrow: "Experiment", title: "Ideas are tested before they become products.", copy: "Some ideas become platforms, some become internal tools, and many remain on the whiteboard until proven useful." },
  { eyebrow: "Innovation", title: "Digital twins, offline computing, and AI.", copy: "Research themes focus on artificial intelligence, operational intelligence, offline workflows, enterprise automation, and connected digital representations." },
  { eyebrow: "Roadmap", title: "Research feeds future products.", copy: "The ForgeStack ecosystem is designed to keep evolving as new operational problems become clear." },
] as const;

export default function ResearchTimelinePage() {
  return (
    <InteractiveTimelinePage
      eyebrow="Research Timeline"
      title="Every great product begins with curiosity."
      intro="The research timeline shows how observation, experiments, and operational patterns become future product directions."
      items={items}
    />
  );
}
