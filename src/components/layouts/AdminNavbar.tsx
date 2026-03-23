"use client"
import { Contact, HomeIcon, NotebookPen, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import LogoutButton from '../ui/Logout'

function AdminNavbar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();

    const navItems = [
        {
            href: "/admin/dashboard",
            label: "Dashboard", icon: <HomeIcon size={16} />
        },
        {
            href: "/admin/products",
            label: "Product listing",
            icon: <ShoppingBag size={16} />
        },
        {
            href: "/admin/orders",
            label: "Orders listing",
            icon: <ShoppingBag size={16} />
        },
        {
            href: "/admin/blogs",
            label: "Blogs",
            icon: <NotebookPen size={16} />
        },
        {
            href: "/admin/contact-details",
            label: "Contact Details",
            icon: <Contact size={16} />
        },
        {
            href: "/admin/project-showcases",
            label: "Project Showcases",
            icon: <Contact size={16} />
        },
    ];

    return (
        <div className="flex flex-col w-[90%] mx-auto gap-y-8">
            <Image src="/logo.png" width={155} height={64} alt="felicity logo" />
            <ul className="flex flex-col gap-y-5">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <li
                            key={item.href}
                            className={`rounded-md flex justify-start items-center h-11 px-4 ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
                        >
                            {item.icon}
                            <Link href={item.href} className="text-sm ml-3 font-medium" onClick={onClose}>
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
                <LogoutButton />
            </ul>
        </div>
    )
}

export default AdminNavbar