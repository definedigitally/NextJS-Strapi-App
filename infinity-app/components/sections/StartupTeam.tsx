'use client';

import { useEffect, useRef, useState } from 'react';
import { TeamMemberCard } from '../team-member-card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BendArrowDown } from '../Icons';
import { TeamMemberProps } from '@/types';
import { getStartupTeamSection } from '@/actions';

gsap.registerPlugin(ScrollTrigger);

export function StartupTeam() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [teamMembers, setTeamMembers] = useState<TeamMemberProps[]>([]);

    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const captionRef = useRef<HTMLParagraphElement>(null);
    const marqueeRowRef = useRef<HTMLDivElement>(null);

    const marqueeTweenRef = useRef<GSAPTween | null>(null);

    useEffect(() => {
        getStartupTeamSection().then(({ title, subtitle, teamMembers }) => {
            setTitle(title);
            setSubtitle(subtitle);
            setTeamMembers(teamMembers);
        });
    }, []);

    // Setup GSAP entrance and marquee scroll
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
            },
        });

        tl.fromTo(
            headingRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );

        tl.fromTo(
            captionRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
        );

        const scrollTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            onEnter: () => {
                marqueeTweenRef.current = gsap.to(marqueeRowRef.current, {
                    xPercent: -100,
                    ease: 'none',
                    duration: 180,
                    repeat: -1,
                });
            },
            onLeaveBack: () => marqueeTweenRef.current?.pause(),
            onEnterBack: () => marqueeTweenRef.current?.resume(),
        });

        return () => {
            scrollTrigger.kill();
            marqueeTweenRef.current?.kill();
        };
    }, []);

    // Hover pause
    const handlePointerEnter = () => marqueeTweenRef.current?.pause();
    const handlePointerLeave = () => marqueeTweenRef.current?.resume();

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#222222] py-5 xl:pt-[72px] xl:pb-[172px] text-white overflow-hidden"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center xl:pb-[48px] xl:mb-[72px] px-4 lg:px-6 xl:px-[140px] w-full max-w-[1440px] mx-auto">
                <h2
                    ref={headingRef}
                    className="text-3xl md:text-4xl lg:text-[40px] font-bold max-w-[812px]"
                >
                    {title}
                </h2>

                {subtitle && (
                    <div className="mt-4 md:mt-0 flex flex-col-reverse items-center text-white">
                        <span
                            ref={captionRef}
                            className="font-handwriting text-lg xl:text-[30px] color-brand-red"
                        >
                            Of course, Why not?
                        </span>
                        <BendArrowDown color="#ffffff" />
                    </div>
                )}
            </div>

            <div
                className="relative overflow-hidden"
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                <div
                    ref={marqueeRowRef}
                    className="flex gap-5 xl:gap-[50px] w-max flex-1 min-h-full items-stretch"
                >
                    {[...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers,...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers,...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers,...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers,...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers,].map((member, idx) => (
                        <TeamMemberCard key={`${member.name}-${idx}`} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
}
