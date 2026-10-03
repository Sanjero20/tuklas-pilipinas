import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import CtaBand from "../components/sections/CtaBand";

function LandingPage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Features />
      <CtaBand />
    </main>
  );
}

export default LandingPage;
