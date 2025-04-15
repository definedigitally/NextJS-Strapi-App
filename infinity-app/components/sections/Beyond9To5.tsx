"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getBeyondWorkGallery } from "@/actions"

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface GalleryImage {
    src: string
    alt: string
    caption?: string
    width: number
    height: number
}

export default function Beyond9To5() {
    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [topRowImages, setTopRowImages] = useState<GalleryImage[]>([])
    const [bottomRowImages, setBottomRowImages] = useState<GalleryImage[]>([])

    const sectionRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const captionRef = useRef<HTMLParagraphElement>(null)
    const topRowRef = useRef<HTMLDivElement>(null)
    const bottomRowRef = useRef<HTMLDivElement>(null)
    const topTweenRef = useRef<GSAPTween | null>(null);
    const bottomTweenRef = useRef<GSAPTween | null>(null);

    useEffect(() => {
        getBeyondWorkGallery().then((data) => {
            setTitle(data.title)
            setCaption(data.caption)
            setTopRowImages(data.topRowImages)
            setBottomRowImages(data.bottomRowImages)
            // console.log('Top row:', data.topRowImages)
            // console.log('Bottom row:', data.bottomRowImages)
        })
    }, [])

    useEffect(() => {
        // Create a timeline for the section animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
            },
        })

        // Animate heading from left
        tl.fromTo(headingRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

        // Animate caption from right
        tl.fromTo(
            captionRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6", // Start slightly before the heading animation finishes
        )

        // Set up the infinite scrolling animations for both rows
        // Only start these animations when the section is in view
        let topTween: GSAPTween
        let bottomTween: GSAPTween

        const scrollTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            onEnter: () => {
                // Top row scrolling (RTL)
                topTween = gsap.to(topRowRef.current, {
                    xPercent: -100,
                    ease: "none",
                    duration: 40,
                    repeat: -1,
                })

                // Bottom row scrolling (LTR)
                bottomTween = gsap.fromTo(
                    bottomRowRef.current,
                    { xPercent: -100 }, // Start off-screen to the left
                    {
                        xPercent: 0, // Scroll to original position
                        ease: "none",
                        duration: 40,
                        repeat: -1,
                    }
                )

                topTweenRef.current = gsap.to(topRowRef.current, {
                    xPercent: -100,
                    ease: "none",
                    duration: 40,
                    repeat: -1,
                });

                bottomTweenRef.current = gsap.fromTo(
                    bottomRowRef.current,
                    { xPercent: -100 },
                    {
                        xPercent: 0,
                        ease: "none",
                        duration: 40,
                        repeat: -1,
                    }
                )
            },
            onLeaveBack: () => {
                topTween.pause()
                bottomTween.pause()
            },
            onEnterBack: () => {
                topTween.resume()
                bottomTween.resume()
            }
        })

        return () => {
            scrollTrigger.kill()
            topTween?.kill()
            bottomTween?.kill()
            topTweenRef.current?.kill();
            bottomTweenRef.current?.kill();
        }
    }, [])

    return (
        <section ref={sectionRef} className="w-full py-16 bg-black text-white overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center xl:pb-[50px] xl:mb-[82px] px-4 lg:px-6 xl:px-[140px] w-full max-w-[1440px] mx-auto">
                <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-[40px] font-bold">
                    {title?.split(" ").map((word, idx) => (
                        <span key={idx} className={((idx + 1) % 2 === 0) ? "color-brand-red" : ""}>
                            {word}{" "}
                        </span>
                    ))}
                </h2>
                <p ref={captionRef} className="text-sm md:text-base italic text-gray-300 max-w-md text-right">{caption}</p>
            </div>

            {/* Top row - RTL scrolling */}
            <div className="relative overflow-hidden mb-4 xl:mb-10">
                <div ref={topRowRef} className="flex gap-4 xl:gap-10 w-fit min-h-full">
                    {/* Double the images to create seamless loop */}
                    {[...topRowImages, ...topRowImages, ...topRowImages, ...topRowImages, ...topRowImages].map((image, index) => (
                        <div
                            key={index}
                            style={{
                                minWidth: `${image.width}px`,
                                minHeight: `${image.height}px`
                            }}
                            className={`relative min-h-full rounded-lg group`}
                        >
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                loading="lazy"
                                className={`transition-transform duration-500 w-full h-full`}
                            />
                            {image.caption && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">{image.caption}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom row - LTR scrolling */}
            <div className="relative overflow-hidden">
                <div ref={bottomRowRef} className="flex gap-4 xl:gap-10 w-fit min-h-full">
                    {/* Double the images to create seamless loop */}
                    {[...bottomRowImages, ...bottomRowImages, ...bottomRowImages, ...bottomRowImages, ...bottomRowImages].map((image, index) => (
                        <div
                            key={index}
                            style={{
                                minWidth: `${image.width}px`,
                                minHeight: `${image.height}px`
                            }}
                            className={`relative min-h-full rounded-lg group`}
                        >
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                loading="lazy"
                                className={`transition-transform duration-500 w-full h-full`}
                            />
                            {image.caption && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                    <p className="text-white text-center">{image.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
