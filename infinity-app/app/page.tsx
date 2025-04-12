import BlogSection from "@/components/sections/BlogSection";
import { StartupTeam } from "@/components/sections/StartupTeam";
import HomeHero from "@/components/sections/HomeHero";
import Header from "@/components/Header";
import ProductTeamSection from "@/components/sections/ProductTeamSection";
import HeroParagraph from "@/components/sections/HeroParagraph";
import Beyond9To5 from "@/components/sections/Beyond9To5";

export default function Home() {

  return (
    <main className="min-h-screen">
      <Header />
      <HomeHero />
      <HeroParagraph />
      <ProductTeamSection />
      <StartupTeam />
      <Beyond9To5 />
      <BlogSection />
    </main>
  );
}
