import Image from "next/image";
import BrandLogo from '@/public/images/Brand Logo.png'
import { Facebook, Instagram, Linkedin, Map, PhoneCall, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="p-4 xl:py-[76px] xl:px-[72px] bg-[#191818]">
            <div className="page-width max-w-[1440px] mx-auto flex flex-col items-start gap-5 xl:gap-10">
                <div className="w-full flex flex-col lg:flex-row items-center justify-between">
                    <Image
                        src={BrandLogo}
                        loading="lazy"
                        alt="Infinity"
                        className="w-full xl:max-w-[389px]"
                    />
                    <div className="flex flex-col items-start gap-9 xl:gap-[70px]">
                        <div className="flex flex-col items-start gap-3">
                            <div className="flex items-center justify-start gap-2 xl:gap-4">
                                <div className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                    <Map className="w-[16px] h-[18px]" />
                                </div>
                                <p className="font-normal text-[18px] text-white">123 Maple Street, Springfield</p>
                            </div>
                            <div className="flex items-center justify-start gap-2 xl:gap-4">
                                <div className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                    <PhoneCall className="w-[16px] h-[18px]" />
                                </div>
                                <p className="font-normal text-[18px] text-white"><a href="telto:+916292226351">+91 6292226351</a></p>
                            </div>
                        </div>
                        <div className="socials flex items-center justify-start md:gap-6">
                            <span className="text-white none md:block">Social Media</span>
                            <div className="flex items-center justify-start gap-4">
                                <div className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                    <Link href="#"><Twitter className="w-[16px] h-[18px] text-white hover:text-[#4EA62F] duration-200 transition-colors ease-in-out" /></Link>
                                </div>
                                <div className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                    <Link href="#"><Facebook className="w-[16px] h-[18px] text-white hover:text-[#4EA62F] duration-200 transition-colors ease-in-out" /></Link>
                                </div>
                                <div className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                    <Link href="#"><Instagram className="w-[16px] h-[18px] text-white hover:text-[#4EA62F] duration-200 transition-colors ease-in-out" /></Link>
                                </div>
                                <div className="flex items-center justify-center rounded-[60px] text-white border-brand-dark w-[56px] h-[56px]">
                                    <Link href="#"><Linkedin className="w-[16px] h-[18px] text-white hover:text-[#4EA62F] duration-200 transition-colors ease-in-out" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hr bg-white w-full h-[1px]"></div>
                <div className="flex items-center justify-start gap-5 xl:gap-10">
                    <Link href="#" className="text-white text-[18px]">Home</Link>
                    <Link href="#" className="text-white text-[18px]">Features</Link>
                    <Link href="#" className="text-white text-[18px]">Blogs</Link>
                    <Link href="#" className="text-white text-[18px]">Pricing</Link>
                </div>
            </div>
        </footer>
    )
}