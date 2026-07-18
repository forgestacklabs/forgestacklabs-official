import { LandingPage, landingMetadata, seoLandings } from "../seoLandingPages";

export const metadata = landingMetadata(seoLandings.customWebMobile);

export default function Page() {
  return <LandingPage entry={seoLandings.customWebMobile} />;
}
