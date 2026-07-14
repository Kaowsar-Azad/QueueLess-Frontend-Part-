import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";
import FeaturedServices from "@/components/home/FeaturedServices";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white flex flex-col">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <FeaturedServices />
      {/* Other sections like BenefitsSection will be added here later */}
    </main>
  );
}
