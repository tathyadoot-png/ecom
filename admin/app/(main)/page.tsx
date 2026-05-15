import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Education from "../components/sections/Education";
import Legal from "../components/sections/Legal";
import Sports from "../components/sections/Sports";
import Contact from "../components/sections/Contact";
import Media from "../components/sections/Media";
import CredibilityStrip from "../components/sections/credibility";
import PillarsPage from "../(pages)/pillars/page";
import PublicImpactPage from "../(pages)/publicImpact/page";
import FeaturedPage from "../(pages)/featured/page";
import leadershipPage from "../(pages)/leadership/page";
import LeadershipSection from "../components/sections/Leaderships";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <CredibilityStrip/>
      <About />
      {/* <PillarsPage/> */}
      <Education/>
      <PublicImpactPage/>
      {/* <FeaturedPage/> */}
      <LeadershipSection/>
      <Sports/>
      <Legal/>
      <Media/>
    <Contact/>
    </main>
  );
}