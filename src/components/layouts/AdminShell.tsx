"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";

const PAGE_TITLES: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/products": "Products",
    "/admin/orders": "Orders",
    "/admin/blogs": "Blogs",
    "/admin/contact-details": "Contact Details",
    "/admin/project-showcases": "Project Showcases",
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const title =
        Object.entries(PAGE_TITLES).find(([path]) => pathname.startsWith(path))?.[1] ?? "Admin";

    return (
        <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">

            {/* Desktop sidebar */}
            <aside className="hidden md:flex md:basis-1/5 flex-col bg-black text-white py-8 shrink-0">
                <AdminNavbar />
            </aside>

            {/* Mobile overlay drawer */}
            {open && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setOpen(false)}
                    />
                    <aside className="absolute left-0 top-0 h-full w-[280px] bg-black text-white py-6 flex flex-col overflow-y-auto">
                        <div className="flex justify-end px-5 mb-2">
                            <button
                                onClick={() => setOpen(false)}
                                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <AdminNavbar onClose={() => setOpen(false)} />
                    </aside>
                </div>
            )}

            {/* Main content */}
            <main className="flex-1 flex flex-col overflow-hidden min-w-0 md:basis-4/5">
                {/* Mobile top bar */}
                <div className="md:hidden shrink-0 h-14 bg-white border-b border-grey-100 flex items-center px-4 gap-3">
                    <button
                        onClick={() => setOpen(true)}
                        className="p-1.5 rounded-lg text-grey-600 hover:bg-grey-100 transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                    <span className="font-inter font-bold text-grey-900 text-base">{title}</span>
                </div>
                {children}
            </main>
        </div>
    );
}
