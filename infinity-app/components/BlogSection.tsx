import Image from "next/image"
import Link from "next/link"
import BlogPostImg from '@/public/images/BlogPost.png'
import { Button } from "./ui/button"
import SectionWrapper from "./SectionWrapper"

export default function BlogSection() {
    const blogPosts = [
        {
            id: 1,
            title: "How Online Learning is Transforming Education",
            category: "Education",
            date: "January 27, 2025",
            readTime: "4 min read",
            image: BlogPostImg,
        },
        {
            id: 2,
            title: "Top 5 Skills to Future-Proof Your Career in 2025",
            category: "Education",
            date: "January 27, 2025",
            readTime: "4 min read",
            image: BlogPostImg,
        },
        {
            id: 3,
            title: "The Secrets Behind Learning from Industry Experts",
            category: "Education",
            date: "January 27, 2025",
            readTime: "4 min read",
            image: BlogPostImg,
        },
    ]

    return (
        <SectionWrapper className="bg-[#FAFAFA] py-16">
            <h2 className="text-[#141219] font-bold text-2xl lg:text-5xl lg:max-w-[620px] mb-[30px] lg:mb-[60px]">DO YOU WRITE BLOGS OR DO PODCASTS?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px] lg:px-[66px]">
                {blogPosts.map((post) => (
                    <Link href="#" key={post.id} className="group">
                        <div className="bg-white p-3 lg:p-6 rounded-3xl blog-card-shadow overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col items-start gap-6">
                            <div className="relative w-full h-[242px] overflow-hidden rounded-2xl blog-img-shadow">
                                <Image
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <span className="bg-[#F5F2FF] text-[#5D38DE] text-sm font-bold py-2 px-[20px] flex items-center justify-center rounded-[40px]">{post.category}</span>
                                <h2 className="text-[18px] font-bold text-[#141219] mb-4 group-hover:text-purple-600 transition-colors">
                                    {post.title}
                                </h2>
                                <div className="w-full h-[1px] bg-[#0000001A] block"></div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[#141219] font-normal text-base">{post.date}</span>
                                    <span className="text-[#00000099]">|</span>
                                    <span className="text-[#141219] font-normal text-base">{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <Button className="bg-brand-red hover:bg-red-600 text-white h-[56px] font-bold text-base lg:text-[18px] py-2 px-8 lg:px-8 lg:py-4 rounded-full transition-colors">See all</Button>
            </div>
        </SectionWrapper>
    )
}