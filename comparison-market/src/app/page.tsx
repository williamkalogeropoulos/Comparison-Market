import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeatureShowcase } from "@/components/feature-showcase";
import { DarkFeatures } from "@/components/dark-features";
import { Footer } from "@/components/footer";
import { WelcomeMessage } from "@/components/welcome-message";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <WelcomeMessage />
      <HeroSection />
      <FeatureShowcase />
      <DarkFeatures />
      <Footer />
    </main>
  );
}
