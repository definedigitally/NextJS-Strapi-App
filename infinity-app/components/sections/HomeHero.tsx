'use client'

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { SlopyCurvyArrow } from "../Icons";

export default function HomeHero() {
    gsap.registerPlugin(ScrollTrigger);
    const [activeWord, setActiveWord] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const productRef = useRef<HTMLDivElement>(null);
    const pitchRef = useRef<HTMLDivElement>(null);
    const passionRef = useRef<HTMLDivElement>(null);
    const taglineRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dynamicTextRef = useRef<HTMLDivElement>(null);

    const dynamicTexts = {
        PRODUCT: "Transform your ideas into exceptional products that captivate and deliver outstanding experiences to your customers.",
        PITCH: "Craft compelling digital experiences that communicate your vision clearly and convince stakeholders of your product's value.",
        PASSION: "Infuse your work with strategic thinking that drives innovation and sets your offerings apart from the competition."
    };

    const taglines = {
        PRODUCT: "what if' is where the magic begins!'",
        PITCH: "wild ideas to crazy executions!",
        PASSION: "because average is boring!"
    };

    useEffect(() => {
        // Initial animations when component mounts
        const tl = gsap.timeline();

        // Animate the three text lines from sides
        tl.fromTo(
            productRef.current,
            { x: -150, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(
                pitchRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            )
            .fromTo(
                passionRef.current,
                { x: -150, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            );

        // Set up scroll animations
        if (sectionRef.current) {
            // Animation for scrolling down - words move out to sides
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    // Move the words out as user scrolls down
                    if (self.direction === 1) { // scrolling down
                        gsap.to(productRef.current, { x: -150 * self.progress, opacity: 1 - self.progress });
                        gsap.to(pitchRef.current, { x: 100 * self.progress, opacity: 1 - self.progress });
                        gsap.to(passionRef.current, { x: -150 * self.progress, opacity: 1 - self.progress });
                    } else { // scrolling up
                        gsap.to(productRef.current, { x: 0, opacity: 1 });
                        gsap.to(pitchRef.current, { x: 0, opacity: 1 });
                        gsap.to(passionRef.current, { x: 0, opacity: 1 });
                    }
                }
            });
        }

        // Initialize taglines as hidden
        gsap.set(taglineRefs.current, { x: -50, opacity: 0 });

        return () => {
            // Clean up ScrollTrigger when component unmounts
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        if (activeWord) {
            // Animate dynamic text
            const tl = gsap.timeline();

            if (dynamicTextRef.current) {
                tl.fromTo(
                    dynamicTextRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                );
            }

            // Animate tagline for active word
            const index = activeWord === "PRODUCT" ? 0 : activeWord === "PITCH" ? 1 : 2;
            gsap.to(taglineRefs.current[index], {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power5.out"
            });

            // Shake icon animation
            gsap.to(iconRefs.current[index], {
                rotation: 10,
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                ease: "none"
            });
        }

        return () => {
            if (activeWord) {
                // Reset animations on hover out
                const index = activeWord === "PRODUCT" ? 0 : activeWord === "PITCH" ? 1 : 2;
                gsap.to(taglineRefs.current[index], {
                    x: -20,
                    opacity: 0,
                    duration: 0.3
                });

                // Animate out dynamic text
                if (dynamicTextRef.current) {
                    gsap.to(dynamicTextRef.current, {
                        y: -20,
                        opacity: 0,
                        duration: 0.3
                    });
                }
            }
        };
    }, [activeWord]);

    const handleWordHover = (word: string) => {
        setActiveWord(word);
    };

    const handleWordLeave = () => {
        setActiveWord(null);
    };

    return (
        <section ref={sectionRef} className="home-intro px-0 py-16 xl:py-32 flex items-center justify-center w-full h-full xl:min-h-dvh overflow-hidden">
            <div className="home-intro__wrapper bg-white w-[calc(100%-2rem)] xl:w-[calc(calc(100vw-2.5rem*2)-calc(calc(100vw-2.5rem*2)/12)*1.5)] max-w-[2048px] mx-auto mt-20">
                <div className="expertises-marquees">
                    <div ref={productRef} className="expertises-marquees__expertise mb-4 xl:mb-8 flex [transform:translate3d(4rem,0px,0px)]">
                        <div className="expertises-marquees__expertise-title-ctn relative">
                            <h1 onMouseEnter={() => handleWordHover("PRODUCT")}
                                onMouseLeave={handleWordLeave} data-title="PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT "
                                className={cn("expertises-marquees__expertise-link u-text-stroke hover:cursor-pointer",
                                    activeWord === "PRODUCT" && "expertises-marquees__expertise-link-active")}>
                                PRODUCT</h1>
                            <p
                                ref={(el) => {
                                    if (el) taglineRefs.current[0] = el;
                                }}
                                className="hidden lg:flex absolute w-full h-full top-0 items-center right-[-110%] whitespace-nowrap text-sm italic xl:text-3xl text-[#222222]"
                            >
                                {taglines.PRODUCT}
                            </p>
                        </div>
                    </div>
                    <div ref={pitchRef} className="expertises-marquees__expertise mb-4 xl:mb-8 flex [transform:translate3d(0px,0px,0px)] justify-center">
                        <div className="expertises-marquees__expertise-title-ctn relative m-0">
                            <h1 onMouseEnter={() => handleWordHover("PITCH")}
                                onMouseLeave={handleWordLeave} data-title="PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH PITCH "
                                className={cn("expertises-marquees__expertise-link u-text-stroke hover:cursor-pointer",
                                    activeWord === "PITCH" && "expertises-marquees__expertise-link-active")}>
                                PITCH</h1>
                            <p
                                ref={(el) => {
                                    if (el) taglineRefs.current[1] = el;
                                }}
                                className="hidden lg:flex absolute w-full h-full top-0 items-center right-[-110%] whitespace-nowrap text-sm italic xl:text-3xl text-[#222222]">
                                {taglines.PITCH}
                            </p>
                        </div>
                    </div>
                    <div ref={passionRef} className="expertises-marquees__expertise mb-4 xl:mb-8 flex [transform:translate3d(-5rem,0px,0px)] justify-end">
                        <div className="expertises-marquees__expertise-title-ctn relative m-0">
                            <h1 onMouseEnter={() => handleWordHover("PASSION")}
                                onMouseLeave={handleWordLeave} data-title="PASSION PASSION PASSION PASSION PASSION PASSION PASSION PASSION PASSION PASSION PASSION "
                                className={cn("expertises-marquees__expertise-link u-text-stroke hover:cursor-pointer",
                                    activeWord === "PASSION" && "expertises-marquees__expertise-link-active")}>
                                PASSION</h1>
                            <p
                                ref={(el) => {
                                    if (el) taglineRefs.current[2] = el;
                                }}
                                className="hidden lg:flex absolute w-full h-full top-0 items-center left-[-110%] whitespace-nowrap text-sm italic xl:text-3xl text-[#222222]"
                            >
                                {taglines.PASSION}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex items-center justify-center">
                    {activeWord ? (
                        <>
                            <div className="w-full lg:w-1/2 lg:ms-auto flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-5">
                                <SlopyCurvyArrow className="size-8 lg:size-16 rotate-90 lg:rotate-0" />
                                <div
                                    ref={dynamicTextRef}
                                    className="text-center max-w-2xl mx-auto text-base text-[#222222]"
                                >
                                    {dynamicTexts[activeWord as keyof typeof dynamicTexts]}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full lg:w-1/2 lg:ms-auto flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-5">
                            <SlopyCurvyArrow className="size-8 lg:size-16 rotate-90 lg:rotate-0" />
                            <div
                                ref={dynamicTextRef}
                                className="text-center max-w-2xl mx-auto text-base text-[#222222]"
                            >
                                {dynamicTexts.PASSION}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}

