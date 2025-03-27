import Image, { StaticImageData } from "next/image"
import { Twitter, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export interface TeamMemberProps {
    name: string
    role: string
    description: string
    imageUrl: string | StaticImageData
    twitterUrl?: string
    linkedinUrl?: string
}

export function TeamMemberCard({ name, role, description, imageUrl, twitterUrl, linkedinUrl }: TeamMemberProps) {
    return (
        <Card className="bg-[#FFFFFF14] border border-[#FFFFFF14] text-white h-full rounded-[24px] cursor-pointer w-[340px]">
            <CardContent className="p-6 flex flex-col h-full">
                <div className="flex flex-col items-start mb-4">
                    <div className="relative w-[60px] h-[60px] mb-6 overflow-hidden rounded-full">
                        <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 60px, 60px"
                            className="object-cover"
                        />
                    </div>
                    <h3 className="text-[18px] font-medium text-white pb-[5px]">{name}</h3>
                    <p className="text-[#FFFFFF66] text-base font-normal">{role}</p>
                </div>

                <p className="text-base font-normal text-[#FFFFFF66] mb-[44px] flex-grow">{description}</p>

                <div className="flex justify-start gap-3 mt-auto">
                    {twitterUrl && (
                        <Link
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-[#FFFFFF14] rounded-[4px] w-8 h-8 flex items-center justify-center hover:bg-zinc-700 transition-colors duration-100"
                            aria-label={`${name}'s Twitter`}
                        >
                            <Twitter className="w-4 h-4 text-white stroke-white" />
                        </Link>
                    )}
                    {linkedinUrl && (
                        <Link
                            href={linkedinUrl}
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