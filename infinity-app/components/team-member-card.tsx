import Image from "next/image"
import { Twitter, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { TeamMemberProps } from "@/types"

export function TeamMemberCard({ name, role, content, image, altText, width, height, linkedin, twitter }: TeamMemberProps) {
    return (
        <Card className="TeamMemberCard bg-[#FFFFFF14] border border-[#FFFFFF14] text-white rounded-[24px] cursor-pointer max-w-[340px] w-full flex flex-col">
            <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex flex-col items-start mb-4">
                    <div className="relative max-w-[60px] max-h-[60px] w-full h-full mb-6 overflow-hidden rounded-full">
                        <Image
                            src={image}
                            alt={altText}
                            width={width}
                            height={height}
                            sizes="(max-width: 768px) 60px, 60px"
                            className="object-cover"
                        />
                    </div>
                    <h3 className="text-[18px] font-medium text-white pb-[5px]">{name}</h3>
                    <p className="text-[#FFFFFF66] text-base font-normal">{role}</p>
                </div>

                <p className="text-base font-normal text-[#FFFFFF66] mb-[44px] flex-grow">{content}</p>

                <div className="flex justify-start gap-3 mt-auto">
                    {twitter && (
                        <Link
                            href={twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-[#FFFFFF14] rounded-[4px] w-8 h-8 flex items-center justify-center hover:bg-zinc-700 transition-colors duration-100"
                            aria-label={`${name}'s Twitter`}
                        >
                            <Twitter className="w-4 h-4 text-white stroke-white" />
                        </Link>
                    )}
                    {linkedin && (
                        <Link
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-[#FFFFFF14] rounded-[4px] w-8 h-8 flex items-center justify-center hover:bg-zinc-700 transition-colors duration-100"
                            aria-label={`${name}'s LinkedIn`}
                        >
                            <Linkedin className="w-4 h-4 text-white stroke-white" />
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}