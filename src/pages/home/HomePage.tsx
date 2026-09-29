import AIDiscoverySection from "../../components/home/AIDiscoverySection";
import GenreSection from "../../components/home/GenreSection";
import HeroSection from "../../components/home/HeroSection";
import RandomDiscoverySection from "../../components/home/RandomDiscoverySection";
import TrendingSection from "../../components/home/TrendingSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrendingSection />
      <GenreSection />
      <AIDiscoverySection />
      <RandomDiscoverySection />
    </main>
  );
}