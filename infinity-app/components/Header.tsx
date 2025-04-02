"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { X, Facebook, Instagram, Linkedin, Globe } from "lucide-react";
import SkullImage from "@/public/images/skull.webp";
import LogoImage from "@/public/images/main-logo.png";
import { Hamburger } from "./Icons";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<HTMLDivElement>(null);
    const socialLinksRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!drawerRef.current) return;

        if (isOpen) {
            document.body.classList.add("overflow-hidden");

            // Show drawer and animate in
            gsap.set(drawerRef.current, { display: "block" });

            gsap.fromTo(
                drawerRef.current,
                { yPercent: -100 },
                { yPercent: 0, duration: 0.6, ease: "power3.inOut" }
            );

            gsap.fromTo(
                menuItemsRef.current?.children || [],
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: 0.2,
                }
            );

            gsap.fromTo(
                socialLinksRef.current?.children || [],
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power2.out",
                    delay: 0.3,
                }
            );

            gsap.fromTo(
                closeButtonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.4 }
            );
        } else {
            // Reverse animation and hide
            gsap.to(drawerRef.current, {
                yPercent: -100,
                duration: 0.5,
                ease: "power3.inOut",
                onComplete: () => {
                    gsap.set(drawerRef.current, { display: "none" });
                    document.body.classList.remove("overflow-hidden");
                },
            });
        }
    }, [isOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[10] px-8 py-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="block z-50">
                        <Image
                            src={LogoImage}
                            alt="Fatfish Logo"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                        />
                    </Link>

                    <div className="flex items-center justify-end gap-[90px]">
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="#" className="text-[#222] text-sm hover:text-gray-900">
                                My Ventures
                            </Link>
                            <Link href="#" className="text-[#222] text-sm hover:text-gray-900">
                                Products
                            </Link>
                            <Link href="#" className="text-[#222] text-sm hover:text-gray-900">
                                Blogs
                            </Link>
                            <Link href="#" className="text-[#222] text-sm hover:text-gray-900">
                                9-5
                            </Link>
                        </div>

                        <button
                            onClick={() => setIsOpen(true)}
                            type="button"
                            className={`z-50 w-10 h-10 flex justify-center items-center cursor-pointer ${isOpen ? "invisible" : "visible"
                                }`}
                            aria-label="Open menu"
                        >
                            <Hamburger />
                        </button>
                    </div>
                </div>
            </header>

            {/* Drawer: always mounted, hidden via transform when closed */}
            <div
                ref={drawerRef}
                className="fixed top-0 left-0 w-full h-screen bg-[#cb413f] z-[20] hidden"
            >
                <div className="container mx-auto h-full flex flex-col justify-between py-24 px-8 md:px-16 relative">
                    <button
                        ref={closeButtonRef}
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-8 text-white cursor-pointer"
                        aria-label="Close menu"
                    >
                        <X size={32} />
                    </button>

                    <div ref={menuItemsRef} className="flex flex-col space-y-6 mt-16">
                        <Link
                            href="/projects"
                            className="text-[#e8d7b4] text-6xl md:text-8xl font-bold hover:text-white"
                        >
                            <div className="flex items-center">
                                <Image
                                    src={SkullImage}
                                    alt="Skull icon"
                                    width={40}
                                    height={40}
                                    className="mr-4"
                                />
                                PROJECTS <span className="ml-4 text-2xl text-white">32</span>
                            </div>
                        </Link>

                        <Link
                            href="/agency"
                            className="text-white text-6xl md:text-8xl font-bold hover:text-[#e8d7b4]"
                        >
                            AGENCY
                        </Link>

                        <Link
                            href="/expertise"
                            className="text-white text-6xl md:text-8xl font-bold hover:text-[#e8d7b4]"
                        >
                            EXPERTISE
                        </Link>

                        <div className="text-white text-xl mt-8 flex items-center">
                            <Image
                                src={SkullImage}
                                alt="Skull icon"
                                width={40}
                                height={40}
                                className="mr-4"
                            />
                            branding + web + strategy
                        </div>
                    </div>

                    <div className="mt-12 md:absolute md:right-16 md:top-1/2 md:transform md:-translate-y-1/2 max-w-sm">
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                            FEEL LIKE GETTING A NEW JOB?
                        </h2>
                        <p className="text-white mb-6">
                            At fatfish, our fuel is challenges (and coffee), and we like to
                            have fun, even between 9 and 5. If you are like us...
                        </p>
                        <Link
                            href="/careers"
                            className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800"
                        >
                            JOIN OUR TEAM
                        </Link>
                    </div>

                    <div
                        ref={socialLinksRef}
                        className="absolute bottom-8 left-8 flex flex-col space-y-4"
                    >
                        <Link href="/" aria-label="Facebook">
                            <Facebook className="w-5 h-5 text-white hover:text-[#e8d7b4]" />
                        </Link>
                        <Link href="/" aria-label="Instagram">
                            <Instagram className="w-5 h-5 text-white hover:text-[#e8d7b4]" />
                        </Link>
                        <Link href="/" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5 text-white hover:text-[#e8d7b4]" />
                        </Link>
                        <Link href="/" aria-label="Website">
                            <Globe className="w-5 h-5 text-white hover:text-[#e8d7b4]" />
                        </Link>
                    </div>

                    <div className="absolute bottom-8 right-8 transform rotate-90 origin-bottom-right">
                        <Link
                            href="/"
                            className="text-white hover:text-[#e8d7b4] transition-colors"
                        >
                            Français
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
