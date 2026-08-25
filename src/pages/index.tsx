import Capabilities from "@/components/sections/Capabilities";
import EarlyAccess from "@/components/sections/EarlyAccess";
import FAQs from "@/components/sections/FAQs";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Security from "@/components/sections/Security";
import Solutions from "@/components/sections/Solutions";
import Who from "@/components/sections/Who";
import Works from "@/components/sections/Works";

export default function Home() {
  return (
    <div className="flex flex-col gap-30 overflow-x-hidden">
      <Hero />
      <Problem />
      <Solutions />
      <Capabilities />
      <Security />
      <Works />
      <Who />
      <EarlyAccess />
      <FAQs />
    </div>
  );
}
