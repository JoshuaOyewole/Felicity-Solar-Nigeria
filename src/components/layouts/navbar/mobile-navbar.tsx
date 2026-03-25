"use client";

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileProductDropdown from './components/MobileProductDropdown';
import MobileShowcaseDropdown from './components/MobileShowcaseDropdown';

//

function MobileNavbar() {
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = useState<string>("default");
    const isHomePage = pathname === '/'

    const openDropdown = (dropdown: string) => {
        setActiveDropdown(dropdown);
    };

    const closeDropdown = () => {
        setActiveDropdown("default");
    };

    return (
        <div className={`flex absolute top-0 justify-between items-center z-50 w-full p-4 mx-auto lg:hidden `}>
            <Link href={"/"} >
                <Image src={isHomePage ? "/logo.png" : "/logo1.png"} width={110} height={48} alt='logo' />
            </Link>
            <Sheet >
                <SheetTrigger asChild>
                    <button className="border-none h-auto">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12H21M3 6H21M9 18H21" stroke={isHomePage ? "#fff" : "#000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </SheetTrigger>
                <SheetContent
                    className="bg-black flex flex-col p-0 pt-24 w-full font-inter"
                    style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.10)" }}
                    goback={closeDropdown}
                    activedropdown={activeDropdown}
                >
                    <div className="flex flex-col justify-end items-start gap-4 w-[90%] mx-auto font-inter gap-y-16">
                        {/* Menu Items */}
                        {activeDropdown === "default" && (
                            <div className='w-full flex gap-y-32 flex-col'>
                                <ul className=" space-y-4 list-none">
                                    <li className='items-center justify-between text-white pb-4  flex ' >
                                        <Link href="/" className='font-inter text-base '>Home</Link>

                                    </li>
                                    <li className='pb-4 '>
                                        <Link href="/about-us" className="w-full text-white text-left font-inter text-base">
                                            About us
                                        </Link>
                                    </li>
                                    <li
                                        onClick={() => openDropdown("products")}
                                        className="w-full text-white text-left font-inter text-base flex justify-between pb-4 items-center "
                                    >
                                        Products
                                        <ChevronRight size={18} />
                                    </li>
                                    <li className='pb-4 '>
                                        <Link href="/after-sales" className="w-full text-white text-left font-inter text-base">
                                            After sales service centers
                                        </Link>
                                    </li>
                                    {/******************** 
                                   <li
                                        onClick={() => openDropdown("project_showcases")}
                                        className="w-full text-white text-left font-inter text-base flex justify-between pb-4 items-center "
                                    >

                                        Product show cases
                                        <ChevronRight size={18} />
                                    </li> 
                                    **********************/}
                                    <li className='pb-4 '>
                                        <Link href="/blog" className="w-full text-white text-left font-inter text-base ">
                                            Blog
                                        </Link>
                                    </li>
                                    <li className='pb-4 '>
                                        <Link href="/contact-us" className="w-full text-white text-left font-inter text-base ">
                                            Contact us
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        )}

                        {/* Produts Items */}
                        {activeDropdown === "products" && (
                            <MobileProductDropdown />
                        )}
                        {/* Project Showcases Items */}
                        {activeDropdown === "project_showcases" && (
                            <MobileShowcaseDropdown />
                        )}


                        <div className=" space-y-7 w-full">
                            <button className="bg-white w-full outline-none h-12 py-2 rounded-lg flex items-center justify-center">
                                <span className='font-inter font-medium text-base'>Get a Quote </span>
                            </button>

                        </div>

                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNavbar