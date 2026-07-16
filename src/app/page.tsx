import HeroWorkspace from "@/components/workspace/HeroWorkspace";
import SystemProfile from "@/components/workspace/SystemProfile";
import SvgPipeline from "@/components/workspace/SvgPipeline";
import CapabilityMatrix from "@/components/workspace/CapabilityMatrix";
import FeaturedProjects from "@/components/workspace/FeaturedProjects";
import ContactCTA from "@/components/workspace/ContactCTA";
import TechMarquee from "@/components/workspace/TechMarquee";
import AiTerminal from "@/components/workspace/AiTerminal";

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-20 w-full overflow-hidden">
      <HeroWorkspace />
      <TechMarquee />
      <SystemProfile />
      <CapabilityMatrix />
      <FeaturedProjects />
      <AiTerminal />
      <SvgPipeline />
      <ContactCTA />
    </div>
  );
}
