import { LandingPage, landingMetadata, seoLandings } from "../seoLandingPages";

export const metadata = landingMetadata(seoLandings.productEngineering);

export default function Page() {
  return <LandingPage entry={seoLandings.productEngineering} />;
}
