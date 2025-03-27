import Image, { StaticImageData } from "next/image"

import TeamUser1 from '@/public/images/TeamUser1.png'
import { cn } from "@/lib/utils"
import SectionWrapper from "./SectionWrapper"
import { BendArrowDown } from "./icons.svg"

export default function TeamSection() {
    return (
        <SectionWrapper className="py-4 xl:pt-[72px] xl:pb-[77px] bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[19px] xl:py-6">
                <h2 className="text-2xl xl:text-[40px] font-bold max-w-[600px]">
                    SHOULD I SHOW YOU WHAT <span className="color-brand-red">PRODUCTS</span> I&apos;VE BUILT?
                </h2>
                <div className="mt-4 md:mt-0 flex items-center">
                    <span className="font-handwriting text-lg xl:text-[30px] color-brand-red">Of course, Why not?</span>
                    <BendArrowDown
                        color="#313131"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <TeamUserCard img={TeamUser1} name="Eddy Denison" role="CFO" content="Our CFO brings strategic vision and financial expertise, guiding our growth and ensuring long-term stability" />
                <TeamUserCard img={TeamUser1} name="Mark Robben" role="CEO" content="Our CEO leads with vision and dedication, driving innovation and inspiring our team to achieve new heights" contentFirst={true} />
                <TeamUserCard img={TeamUser1} name="John.J Dawson" role="CTO" content="Our CTO spearheads technology and innovation, ensuring our solutions are cutting-edge and future-ready" />
            </div>
        </SectionWrapper>
    )
}

function TeamUserCard({ img, name, role, content, contentFirst }: { img: StaticImageData, name: string, role: string, content: string, contentFirst?: boolean }) {
    return (
        <div className={cn("flex gap-[22px]", contentFirst ? 'flex-col-reverse' : 'flex-col')}>
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
                <Image
                    src={img}
                    alt="Eddy Denison"
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