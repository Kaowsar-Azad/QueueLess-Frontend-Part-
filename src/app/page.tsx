import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white flex flex-col">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      {/* Other sections like FeaturedServices will be added here later */}
    </main>
  );
}
