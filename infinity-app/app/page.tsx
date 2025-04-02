'use client'

import BlogSection from "@/components/sections/BlogSection";
import { Footer } from "@/components/sections/Footer";
// import Hero from "@/components/hero";
import TeamSection from "@/components/sections/TeamSection";
import Team1 from '@/public/images/James Lee.png'
import { TeamShowcase } from "@/components/sections/TeamShowcase";
import InfoHeroIntro from "@/components/sections/InfoHeroIntro";
import { Beyond9To5 } from "@/components/sections/Beyond9To5";
import HomeHero from "@/components/sections/HomeHero";
import Header from "@/components/Header";
import CursorFollower from "@/components/cursor-follower";
import { useEffect, useState } from "react";
const teamMembers = [
  {
    name: "FLIPDD",
    role: "CFO",
    description:
      "Our CFO brings strategic vision and financial expertise, guiding our growth and ensuring long-term stability",
    imageUrl: Team1,
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "James Lee",
    role: "CEO",
    description:
      "Our CEO leads with vision and dedication, driving innovation and inspiring our team to achieve new heights",
    imageUrl: Team1,
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Jennifer Mendy",
    role: "CMO",
    description:
      "Our CMO shapes our brand's growth strategy, connecting us with audiences and driving impactful engagement",
    imageUrl: Team1,
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Mark Robben",
    role: "CTO",
    description:
      "Our CTO spearheads technology and innovation, ensuring our solutions are cutting-edge and future-ready",
    imageUrl: Team1,
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com",
  },
]

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])
  return (
    <main className="min-h-screen">
      <Header />
      <CursorFollower position={mousePosition} />
      <HomeHero />
      <InfoHeroIntro />
      <TeamShowcase
        title={
          <>
            WANNA KNOW ABOUT THE <br /> STARTUPS I&apos;VE BUILT AND UNBUILT?
          </>
        }
        subtitle="Yes, that's interesting!"
        teamMembers={teamMembers}
      />
      <Beyond9To5
        title={
          <>
            WANNA KNOW ABOUT THE <br /> STARTUPS I&apos;VE BUILT AND UNBUILT?
          </>
        }
        subtitle="Yes, that's interesting!"
        teamMembers={teamMembers}
      />
      <TeamSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
