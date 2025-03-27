'use client'

import { ReactNode, useMemo, useRef } from "react"
import { BendArrowDown } from "./icons.svg"
import { TeamMemberCard, type TeamMemberProps } from "./team-member-card"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TeamSectionProps {
    title: ReactNode | string
    subtitle?: string
    teamMembers: TeamMemberProps[]
}

export function TeamShowcase({ title, subtitle, teamMembers }: TeamSectionProps) {
    const isReversed = false;
    const movingContainer = useRef<HTMLDivElement>(null);
    const timeline = useRef<GSAPTimeline>(null)

    useGSAP(() => {
        // Translate the container half of its width to the left (the width of list)
        // Then set it back to the start, and repeat infinitely.
        const setupInfiniteMarqueeTimeline = () => {
            gsap.set(movingContainer.current, {
                xPercent: isReversed ? -50 : 0,
            });

            timeline.current = gsap
                .timeline({
                    defaults: { ease: "none", repeat: -1 },
                })
                .to(movingContainer.current, {
                    xPercent: isReversed ? 0 : -50,
                    duration: 8,
                })
                .set(movingContainer.current, { xPercent: 0 });
        };

        setupInfiniteMarqueeTimeline();
    }, {
        dependencies: [isReversed],
    });

    // Additional logic for pointer enter / leave animations
    const timelineTimeScaleTween = useRef<GSAPTween>(null);

    const onPointerEnter = () => {
        if (!timeline.current) return;
        timelineTimeScaleTween.current?.kill();
        timelineTimeScaleTween.current = gsap.to(timeline.current, {
            timeScale: 0.25,
            duration: 0.4,
        });
    };
    const onPointerLeave = () => {
        if (!timeline.current) return;
        timelineTimeScaleTween.current?.kill();
        timelineTimeScaleTween.current = gsap.to(timeline.current, {
            timeScale: 1,
            duration: 0.2,
        });
    };

    const list = useMemo(() => {
        return (
            <div className="flex items-center justify-start gap-5 xl:gap-[50px]">
                {teamMembers.map((member) => (
                    <TeamMemberCard key={member.name} {...member} />
                ))}
            </div>
        )
    }, [teamMembers])

    return (
        <section className="w-full bg-[#222222] py-5 xl:pt-[72px] xl:pb-[172px]">
            <div className="page-width p-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center xl:pb-[48px] xl:mb-[72px] px-4 lg:px-6 xl:px-[140px]">
                    <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#F1F1F1] max-w-[812px]">{title}</h2>

                    {subtitle && (
                        <div className="mt-4 md:mt-0 flex flex-col-reverse items-center text-white">
                            <span className="font-handwriting text-lg xl:text-[30px] color-brand-red">Of course, Why not?</span>
                            <BendArrowDown
                                color="#ffffff"
                            />
                        </div>
                    )}
                </div>

                <div className="overflow-hidden select-none w-full"
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                >
                    <div ref={movingContainer} className="w-full flex gap-5 xl:gap-[50px]">
                        {list}
                        {list}
                        {list}
                        {list}
                        {list}
                        {list}
                    </div>
                </div>
            </div>
        </section>
    )
}

