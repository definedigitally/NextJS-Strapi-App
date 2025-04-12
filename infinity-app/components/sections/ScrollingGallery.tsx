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

export default function ScrollingGallery() {
    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [topRowImages, setTopRowImages] = useState<GalleryImage[]>([])
    const [bottomRowImages, setBottomRowImages] = useState<GalleryImage[]>([])

    const sectionRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const captionRef = useRef<HTMLParagraphElement>(null)
    const topRowRef = useRef<HTMLDivElement>(null)
    const bottomRowRef = useRef<HTMLDivElement>(null)

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
        console.log('Top row:', topRowImages)
        console.log('Bottom row:', bottomRowImages)
    }, [bottomRowImages, topRowImages])

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
                bottomTween = gsap.to(bottomRowRef.current, {
                    xPercent: -50,
                    ease: "none",
                    duration: 40,
                    repeat: -1,
                })
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
            // Clean up animations when component unmounts
            scrollTrigger.kill()
            topTween?.kill()
            bottomTween?.kill()
        }
    }, [])

    return (
        <section ref={sectionRef} className="w-full py-16 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                    <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        {title?.split(" ").map((word, idx) =>
                            word.toLowerCase() === "9" || word.toLowerCase() === "5" ? (
                                <span key={idx} className="text-red-500">{word} </span>
                            ) : (
                                <span key={idx}>{word} </span>
                            )
                        )}
                    </h2>
                    <p ref={captionRef} className="text-sm md:text-base italic text-gray-300 max-w-md text-right">{caption}</p>
                </div>
            </div>

            {/* Top row - RTL scrolling */}
            <div className="relative overflow-hidden mb-4 xl:mb-10">
                <div ref={topRowRef} className="flex gap-4 xl:gap-10 w-fit">
                    {/* Double the images to create seamless loop */}
                    {[...topRowImages, ...topRowImages, ...topRowImages, ...topRowImages, ...topRowImages].map((image, index) => (
                        <div
                            key={index}
                            className={`relative w-[${image.width}px] h-[${image.height}px] xl:w-[320px] xl:h-[240px] overflow-hidden rounded-lg group`}
                        >
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
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

            {/* Bottom row - LTR scrolling */}
            <div className="relative overflow-hidden">
                <div ref={bottomRowRef} className="flex gap-4 xl:gap-10 w-fit">
                    {/* Double the images to create seamless loop */}
                    {[...bottomRowImages, ...bottomRowImages, ...bottomRowImages, ...bottomRowImages, ...bottomRowImages].map((image, index) => (
                        <div
                            key={index}
                            className={`relative w-[${image.width}px] h-[${image.height}px] xl:w-[320px] xl:h-[240px] overflow-hidden rounded-lg group`}
                        >
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
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
