"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Globe } from "lucide-react"
import CursorFollower from "./cursor-follower"
import Logo from "@/public/images/main-logo.png"
import DrawerHeader from "./drawer-header"
import AnimatedText from "./animated-text"
// import CursorFollower from "@/components/cursor-follower"

export default function Hero() {
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
        <div className="relative w-full min-h-screen overflow-hidden bg-white">
            {/* Cursor follower */}
            <CursorFollower position={mousePosition} />

            <DrawerHeader />

            {/* Hero content */}
            <div className="container mx-auto px-8 pt-12 md:pt-24">
                <div className="relative">
                    {/* Background text */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 select-none">
                        <div className="text-2xl md:text-8xl font-black leading-none">BRANDING</div>
                        <div className="text-2xl md:text-8xl font-black leading-none">WEB</div>
                        <div className="text-2xl md:text-8xl font-black leading-none">STRATEGY</div>
                    </div>

                    {/* Main content */}
                    <div className="relative z-10">
                        <div className="flex items-center mb-4">
                            <AnimatedText text="BRANDING" className="text-2xl md:text-8xl font-black leading-none" />
                            <div className="ml-4 w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
                                <Image
                                    src={Logo}
                                    alt="Skull icon"
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className="mr-4 w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
                                <Image
                                    src={Logo}
                                    alt="Controller icon"
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                />
                            </div>
                            <AnimatedText text="WEB" className="text-[10vw] md:text-[8vw] font-black leading-none" />
                            <div className="ml-auto italic text-xl md:text-2xl text-[#c9b18c] font-light">
                                projects full of surprises
                            </div>
                        </div>

                        <div className="flex items-center mb-12">
                            <div className="italic text-xl md:text-2xl text-[#c9b18c] font-light mr-auto">
                                results that speak for themselves
                            </div>
                            <AnimatedText text="STRATEGY" className="text-[10vw] md:text-[8vw] font-black leading-none" />
                            <div className="ml-4 w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
                                <Image
                                    src={Logo}
                                    alt="Coffee cup icon"
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex items-start mt-16 mb-24">
                            <div className="w-12 h-12 mr-6">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                    <path d="M20 12H4M4 12L10 18M4 12L10 6" />
                                </svg>
                            </div>
                            <div className="max-w-md">
                                <p className="text-xl md:text-2xl text-gray-700">
                                    Want to stand out from the crowd?
                                    <br />
                                    Let us bring your project to the next level.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social links */}
            <div className="absolute bottom-8 left-8 flex flex-col space-y-4">
                <Link href="/" aria-label="Facebook">
                    <Facebook className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
                </Link>
                <Link href="/" aria-label="Instagram">
                    <Instagram className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
                </Link>
                <Link href="/" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
                </Link>
                <Link href="/" aria-label="Website">
                    <Globe className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
                </Link>
            </div>

            {/* Francais link */}
            <div className="absolute bottom-8 right-8 transform rotate-90 origin-bottom-right">
                <Link href="/" className="text-gray-700 hover:text-red-500 transition-colors">
                    Français
                </Link>
            </div>
        </div>
    )
}

