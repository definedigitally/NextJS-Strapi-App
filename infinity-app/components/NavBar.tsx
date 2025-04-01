import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white z-10 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            <span className="text-red-500">fatF!sh</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">My Ventures<sup className="text-red-500 ml-0.5">32</sup></Link>
                        <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">Products</Link>
                        <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">Blogs</Link>
                        <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">9-5</Link>
                        <Link href="#" className="text-[#222222] hover:text-gray-900 text-sm">9-5</Link>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button className="text-[#222222] hover:text-gray-900 text-sm">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};