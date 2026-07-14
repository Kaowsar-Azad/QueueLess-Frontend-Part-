import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";
import FeaturedServices from "@/components/home/FeaturedServices";
import BenefitsSection from "@/components/home/BenefitsSection";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white flex flex-col">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <FeaturedServices />
      <BenefitsSection />
      {/* Other sections like StatsSection will be added here later */}
    </main>
  );
}
