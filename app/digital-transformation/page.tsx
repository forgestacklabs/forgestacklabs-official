import { LandingPage, landingMetadata, seoLandings } from "../seoLandingPages";

export const metadata = landingMetadata(seoLandings.digitalTransformation);

export default function Page() {
  return <LandingPage entry={seoLandings.digitalTransformation} />;
}
