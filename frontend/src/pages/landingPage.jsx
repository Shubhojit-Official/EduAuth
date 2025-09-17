import { Navbar } from "../components/Navbar";
import { Home } from "../components/landing/home";
import { HowWorks } from "../components/landing/howWorks";
import { SystemFeatures } from "../components/landing/systemFeatures";
import { LandingFooter } from "../components/landing/landingFooter";

export const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <HowWorks />
            <SystemFeatures />
            <LandingFooter />
        </div>
    )
}