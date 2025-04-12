import Image from "next/image"

import { cn } from "@/lib/utils"
import SectionWrapper from "../SectionWrapper"
import { BendArrowDown } from "../Icons"
import { getProductTeamData } from "@/actions"

export default async function ProductTeamSection() {
    const { title, caption, members } = await getProductTeamData();
    return (
        <SectionWrapper className="py-4 xl:pt-[72px] xl:pb-[77px] bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[19px] xl:py-6">
                <h2 className="text-2xl xl:text-[40px] font-bold max-w-[600px]">{title}</h2>
                <div className="mt-4 md:mt-0 flex items-center">
                    <span className="font-handwriting text-lg xl:text-[30px] color-brand-red">{caption}</span>
                    <BendArrowDown
                        color="#313131"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {members.map((member, i) => (
                    <TeamUserCard
                        key={member.id}
                        img={member.image || "/placeholder.svg"}
                        alt={member.altText}
                        name={member.name}
                        role={member.role}
                        content={member.content}
                        contentFirst={i % 2 !== 0}
                    />
                ))}
            </div>
        </SectionWrapper>
    )
}

function TeamUserCard({ img, alt, name, role, content, contentFirst }: { img: string, alt: string, name: string, role: string, content: string, contentFirst?: boolean }) {
    return (
        <div className={cn("flex gap-[22px]", contentFirst ? 'flex-col-reverse' : 'flex-col')}>
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
                <Image
                    src={img}
                    alt={alt}
                    width={400}
                    height={400}
                    className="mix-blend-multiply object-cover absolute bottom-0 z-1"
                />
                <div className="team-card-shadow absolute bottom-0 w-full h-1/2 aspect-square rounded-b-3xl"></div>
            </div>
            <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-1.5">
                    <h3 className="font-medium text-[#313131] text-[18px]">{name}</h3>
                    <span className="font-normal text-[#313131] text-base">{role}</span>
                </div>
                <p className="font-normal text-[#313131] text-base">{content}</p>
            </div>
        </div>
    )
}