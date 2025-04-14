'use client'

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getHeroParagraph } from "@/actions";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function parseMarkdownToHTML(content: string): string {
    return content
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
        .replace(/\n/g, "<br/>"); // optional: handle line breaks
}

export default function HeroParagraph({ className = "" }: { className?: string }) {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const [content, setContent] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [buttonLink, setButtonLink] = useState("#");

    useEffect(() => {
        getHeroParagraph().then(({ content, buttonText, buttonLink }) => {
            setContent(parseMarkdownToHTML(content));
            setButtonText(buttonText);
            setButtonLink(buttonLink);
        });
    }, []);

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
            <div className="page-width py-5 xl:pt-[249px] xl:pb-[275px]">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center flex flex-col items-center justify-center gap-12">
                        <p
                            ref={textRef}
                            className="text-[32px] text-[#F1F1F1] leading-[1.6]"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />

                        <a
                            ref={buttonRef}
                            href={buttonLink}
                            className="uppercase text-white font-normal w-[248px] h-[51px] bg-brand-red rounded-[12px] text-base transition-colors duration-300 flex items-center justify-center"
                        >
                            {buttonText}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};