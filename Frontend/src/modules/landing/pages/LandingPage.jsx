import Footer from "@/components/Footer";
import { CtaSection } from "@landing/components/CtaSection";
import { FeaturesSection } from "@landing/components/FeaturesSection";
import { HeroSection } from "@landing/components/HeroSection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background items-center">
      <main>
        <HeroSection />
        <FeaturesSection />
        <CtaSection /> 
      </main>

      <Footer />
    </div>
  );
}