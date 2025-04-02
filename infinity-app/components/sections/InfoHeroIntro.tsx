'use client'

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface InfoHeroIntroProps {
    className?: string;
}

const InfoHeroIntro: React.FC<InfoHeroIntroProps> = ({ className = "" }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Create timeline for the animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 100%", // Start animation when the top of the section is 80% from the top of the viewport
                end: "top 10%", // End animation when the top of the section is 30% from the top of the viewport
                scrub: 2, // Smooth scrubbing effect
                toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
            }
        });

        // Add animations to the timeline
        tl.fromTo(
            textRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        ).fromTo(
            buttonRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            "-=1.3" // Start slightly before the previous animation ends
        );

        // Cleanup function
        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className={`w-full bg-[#222222] ${className}`}>
            <div className="page-width w-full px-4 lg:px-6 xl:px-[88px] py-5 xl:pt-[249px] xl:pb-[379px]">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center flex flex-col items-center justify-center gap-12">
                        <p ref={textRef} className='text-[32px] text-[#F1F1F1]'>
                            For the past <strong>28 years of circling the sun,</strong> I&apos;ve <strong>built ventures, broken things</strong> (only to fix them better), and <strong>chased ideas</strong> that keep me up at night. <strong>☕ Fueled by endless cups of chai,</strong> I&apos;m always on the hunt for something <strong>crazy good, wildly ambitious, and just a little bit impossible.</strong>
                        </p>

                        <button
                            ref={buttonRef}
                            type="button"
                            className="uppercase text-white font-normal w-[248px] h-[51px] bg-brand-red rounded-[12px] text-base transition-colors duration-300 flex items-center justify-center"
                        >
                            Who is anant exactly?
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoHeroIntro;