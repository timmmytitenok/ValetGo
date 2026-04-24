import { Footer } from "./components/footer";
import { FAQSection } from "./components/faq-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { HeroSection } from "./components/hero-section";
import { Navbar } from "./components/navbar";
import { FinalCTASection } from "./components/final-cta-section";
import { WhoItsForSection } from "./components/who-its-for-section";
import { WhyValetGoSection } from "./components/why-valetgo-section";

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#050505] text-white">
      <Navbar />
      <main>
        <HeroSection />
        <WhoItsForSection />
        <WhyValetGoSection />
        <HowItWorksSection />
        <FAQSection />
      </main>
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/final-cta-background.png')" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/58 via-black/42 to-black/62"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-black/4" aria-hidden />
        <div className="relative z-10">
          <FinalCTASection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
