import { LandingPage, landingMetadata, seoLandings } from "../seoLandingPages";

export const metadata = landingMetadata(seoLandings.aiAutomation);

export default function Page() {
  return <LandingPage entry={seoLandings.aiAutomation} />;
}
