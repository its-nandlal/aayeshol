import Hero from "@/components/hero";
import AppScreenshot from "@/components/app-screenshot"; 
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-worcks";
import Platforms from "@/components/platform";
import ValueProp from "@/components/value-props";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import { SectionDivider } from "@/components/shared";
import Navbar from "@/components/nav/main-navbar";

// Grain noise texture — subtle luxury feel
function Grain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-100 opacity-[0.028]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

// Background mesh — no blur-heavy elements
function BackgroundMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Primary glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-150 rounded-full bg-indigo-600/9 blur-[130px]" />
      {/* Side accents */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-violet-700/6 blur-[100px]" />
      <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-indigo-600/[0.06] blur-[100px]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Grain />
      <BackgroundMesh />

      <div className="relative min-h-screen overflow-x-hidden bg-[#06060f]">
        <Navbar />

        <main>
          <Hero />
          <AppScreenshot />

          <SectionDivider />
          <Features />

          <SectionDivider />
          <HowItWorks />

          <SectionDivider />
          <Platforms />

          <SectionDivider />
          <ValueProp />

          <SectionDivider />
          <CTA />
        </main>

        <SectionDivider />
        <Footer />
      </div>
    </>
  );
}