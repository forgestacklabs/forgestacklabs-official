import { LandingPage, landingMetadata, seoLandings } from "../seoLandingPages";

export const metadata = landingMetadata(seoLandings.enterpriseSoftware);

export default function Page() {
  return <LandingPage entry={seoLandings.enterpriseSoftware} />;
}
