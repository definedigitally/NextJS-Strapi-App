"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { X, Facebook, Instagram, Linkedin, Globe, AlignJustify } from "lucide-react"
import SkullImage from '@/public/images/skull.webp'
import LogoImage from '@/public/images/main-logo.png'

export default function DrawerHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const drawerRef = useRef<HTMLDivElement>(null)
    const menuItemsRef = useRef<HTMLDivElement>(null)
    const socialLinksRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)

    // Timeline for animations
    const tl = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        // Initialize the timeline
        tl.current = gsap.timeline({ paused: true })

        // Set initial state
        gsap.set(drawerRef.current, {
            yPercent: -100,
            opacity: 1,
        })

        if (menuItemsRef.current && socialLinksRef.current && closeButtonRef.current) {
            gsap.set([menuItemsRef.current.children, socialLinksRef.current.children, closeButtonRef.current], {
                y: 20,
                opacity: 0,
            })
        }

        // Create animation sequence
        tl.current
            .to(drawerRef.current, {
                yPercent: 0,
                duration: 0.8,
                ease: "power3.inOut",
            })
            .to(
                menuItemsRef.current?.children || [],
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.4",
            )
            .to(
                socialLinksRef.current?.children || [],
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "-=0.3",
            )
            .to(
                closeButtonRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "-=0.4",
            )

        // Clean up
        return () => {
            tl.current?.kill()
        }
    }, [])

    useEffect(() => {
        if (tl.current) {
            if (isOpen) {
                // Play the animation
                document.body.style.overflow = "hidden" // Prevent scrolling when drawer is open
                tl.current.play()
            } else {
                // Reverse the animation
                document.body.style.overflow = ""
                tl.current.reverse()
            }
        }
    }, [isOpen])

    const toggleDrawer = () => {
        setIsOpen(prev => {
            const newState = !prev
            console.log("is open =", newState)
            return newState
        })
        console.log('toggleDrawer clciked')
    }

    return (
        <>
            {/* Fixed header with logo and hamburger */}
            <header className="fixed top-0 left-0 w-full z-[1] px-8 py-6 flex justify-between items-center">
                <div ref={logoRef} className="z-50">
                    <Link href="/" className="block">
                        <Image
                            src={LogoImage}
                            alt="Fatfish Logo"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>

                <button
                    ref={hamburgerRef}
                    onClick={toggleDrawer}
                    className={`z-50 flex flex-col justify-center items-center cursor-pointer w-10 h-10 focus:outline-none ${isOpen ? "invisible" : "visible"}`}
                    aria-label="Toggle menu"
                >
                    <AlignJustify />
                </button>
            </header>

            {/* Drawer menu */}
            <div ref={drawerRef} className="fixed top-0 left-0 w-full h-screen bg-red-500 z-[2] opacity-0">
                <div className="container mx-auto h-full flex flex-col justify-between py-24 px-8 md:px-16">
                    {/* Close button */}
                    <button
                        ref={closeButtonRef}
                        onClick={toggleDrawer}
                        className="absolute top-6 right-8 text-white pointer-events-[all]"
                        aria-label="Close menu"
                    >
                        <X size={32} />
                    </button>

                    {/* Menu items */}
                    <div ref={menuItemsRef} className="flex flex-col space-y-6 mt-16">
                        <Link
                            href="/projects"
                            className="text-[#e8d7b4] text-6xl md:text-8xl font-bold hover:text-white transition-colors"
                        >
                            <div className="flex items-center">
                                <div className="menu-item-icon-container mr-4">
                                    <Image className="menu-item-icon lazyloaded"
                                        src={SkullImage}
                                        alt="Skull icon"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                PROJECTS
                                <span className="ml-4 text-2xl text-white">32</span>
                            </div>
                        </Link>

                        <Link
                            href="/agency"
                            className="text-white text-6xl md:text-8xl font-bold hover:text-[#e8d7b4] transition-colors"
                        >
                            AGENCY
                        </Link>

                        <Link
                            href="/expertise"
                            className="text-white text-6xl md:text-8xl font-bold hover:text-[#e8d7b4] transition-colors"
                        >
                            EXPERTISE
                        </Link>

                        <div className="text-white text-xl mt-8 flex items-center">
                            <div className="menu-item-icon-container mr-4">
                                <Image className="menu-item-icon lazyloaded"
                                    src={SkullImage}
                                    alt="Skull icon"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            branding + web + strategy
                        </div>
                    </div>

                    {/* Right side content */}
                    <div className="mt-12 md:absolute md:right-16 md:top-1/2 md:transform md:-translate-y-1/2 max-w-sm">
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">FEEL LIKE GETTING A NEW JOB?</h2>
                        <p className="text-white mb-6">
                            At fatfish, our fuel is challenges (and coffee), and we like to have fun, even between 9 and 5. If you are
                            like us...
                        </p>
                        <Link
                            href="/careers"
                            className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                        >
                            JOIN OUR TEAM
                        </Link>
                    </div>

                    {/* Social links */}
                    <div ref={socialLinksRef} className="absolute bottom-8 left-8 flex flex-col space-y-4">
                        <Link href="/" aria-label="Facebook">
                            <Facebook className="w-5 h-5 text-white hover:text-[#e8d7b4] transition-colors" />
                        </Link>
                        <Link href="/" aria-label="Instagram">
                            <Instagram className="w-5 h-5 text-white hover:text-[#e8d7b4] transition-colors" />
                        </Link>
                        <Link href="/" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5 text-white hover:text-[#e8d7b4] transition-colors" />
                        </Link>
                        <Link href="/" aria-label="Website">
                            <Globe className="w-5 h-5 text-white hover:text-[#e8d7b4] transition-colors" />
                        </Link>
                    </div>

                    {/* Francais link */}
                    <div className="absolute bottom-8 right-8 transform rotate-90 origin-bottom-right">
                        <Link href="/" className="text-white hover:text-[#e8d7b4] transition-colors">
                            Français
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

