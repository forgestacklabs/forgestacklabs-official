import { LandingPage, landingMetadata, seoLandings } from "../seoLandingPages";

export const metadata = landingMetadata(seoLandings.offlineFirstApps);

export default function Page() {
  return <LandingPage entry={seoLandings.offlineFirstApps} />;
}
