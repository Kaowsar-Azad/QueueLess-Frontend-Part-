import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";
import FeaturedServices from "@/components/home/FeaturedServices";
import BenefitsSection from "@/components/home/BenefitsSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsFAQ from "@/components/home/TestimonialsFAQ";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white flex flex-col">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <FeaturedServices />
      <BenefitsSection />
      <StatsSection />
      <TestimonialsFAQ />
    </main>
  );
}
