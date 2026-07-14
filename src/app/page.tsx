import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white flex flex-col">
      <HeroSection />
      {/* Other sections like HowItWorks, PopularCategories will be added here later */}
    </main>
  );
}
