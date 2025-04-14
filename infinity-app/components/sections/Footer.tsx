/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Map, PhoneCall, Twitter } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import { getSiteFooter } from "@/actions";

const socialIcons: Record<string, JSX.Element> = {
    x: <Twitter className="w-[16px] h-[18px] text-white hover:text-[#4EA62F] duration-200 transition-colors ease-in-out" />,
    facebook: <Facebook className="w-[16px] h-[18px] text-white hover:text-[#4EA62F] duration-200 transition-colors ease-in-out" />,
    instagram: <Instagram className="w-[16px] h-[18px] text-white hover:text-[#4EA62F] duration-200 transition-colors ease-in-out" />,
    linkedin: <Linkedin className="w-[16px] h-[18px] text-white hover:text-[#4EA62F] duration-200 transition-colors ease-in-out" />,
};

export async function Footer() {
    const footer = await getSiteFooter();

    return (
        <footer className="p-4 xl:py-[76px] xl:px-[72px] bg-[#191818]">
            <div className="page-width flex flex-col items-start gap-5 xl:gap-10">
                <div className="w-full flex flex-col lg:flex-row items-center justify-between">
                    {footer.logoLight && (
                        <Image
                            src={footer.logoLight}
                            width={100}
                            height={100}
                            alt="Infinity Light Logo"
                            className="w-full xl:max-w-[389px]"
                        />
                    )}
                    <div className="flex flex-col items-start gap-9 xl:gap-[70px]">
                        <div className="flex flex-col items-start gap-3">
                            <div className="flex items-center justify-start gap-2 xl:gap-4">
                                <div className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                    <Map className="w-[16px] h-[18px]" />
                                </div>
                                <p className="font-normal text-[18px] text-white">{footer.address}</p>
                            </div>
                            <div className="flex items-center justify-start gap-2 xl:gap-4">
                                <div className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                    <PhoneCall className="w-[16px] h-[18px]" />
                                </div>
                                <p className="font-normal text-[18px] text-white">
                                    <a href={`tel:${footer.phone}`}>{footer.phone}</a>
                                </p>
                            </div>
                        </div>
                        <div className="socials flex items-center justify-start md:gap-6">
                            <span className="text-white none md:block">Social Media</span>
                            <div className="flex items-center justify-start gap-4">
                                {footer.socials?.map((social: any, i: number) => (
                                    <div key={i} className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                        <Link href={social.URL.startsWith("http") ? social.URL : `https://${social.URL}`} target="_blank" rel="noopener noreferrer">
                                            {socialIcons[social.Social_Platform] || null}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hr bg-white w-full h-[1px]"></div>
                <div className="flex items-center justify-start gap-5 xl:gap-10">
                    {footer.links?.map((link: any, i: number) => (
                        <Link key={i} href={link.URL} className="text-white text-[18px]">
                            {link.Label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}