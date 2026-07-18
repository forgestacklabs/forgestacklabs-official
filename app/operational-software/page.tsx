import { LandingPage, landingMetadata, seoLandings } from "../seoLandingPages";

export const metadata = landingMetadata(seoLandings.operationalSoftware);

export default function Page() {
  return <LandingPage entry={seoLandings.operationalSoftware} />;
}
