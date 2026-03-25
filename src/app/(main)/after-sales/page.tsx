import Navbar from "@/components/layouts/navbar/Navbar";
import { ChevronRight, Wrench, Clock, MapPin } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import ServiceCenters, { ServiceCenter } from "./ServiceCenters";

export const metadata: Metadata = {
    title: "After-Sales Service Centers - Felicity Solar",
    description:
        "Find a Felicity Solar after-sales service center near you for repairs, maintenance, and technical support across Nigeria.",
};

const stats = [
    { icon: MapPin, value: "20+", label: "Service Centers Nationwide" },
    { icon: Wrench, value: "Expert", label: "Trained Technicians" },
    { icon: Clock, value: "Fast", label: "Turnaround Time" },
];

async function fetchServiceCenters(): Promise<ServiceCenter[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/service-centers`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const json: { data: ServiceCenter[] } = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}

export default async function AfterSalesPage() {
    const centers = await fetchServiceCenters();
    return (
        <main className="font-[family-name:var(--font-inter)]">
            <Navbar
                linkClassName="text-grey-800 font-semibold"
                className="hidden lg:flex bg-white text-black border-b border-grey-100"
                variant="primary"
            />

            {/* Breadcrumb */}
            <section className="flex flex-col mt-12 lg:mt-0 pt-6 w-[90%] 2xl:w-[75%] mx-auto">
                <div className="items-center flex-row gap-x-1 hidden lg:flex">
                    <Link
                        href="/"
                        className="text-grey-400 font-medium text-sm hover:text-primary transition-colors"
                    >
                        Homepage
                    </Link>
                    <ChevronRight color="#98A2B3" size={16} />
                    <span className="text-grey-700 font-medium text-sm">
                        After-Sales Service
                    </span>
                </div>
            </section>

            {/* Hero */}
            <header className="w-[90%] 2xl:w-[75%] mx-auto pt-10 pb-12 flex flex-col gap-y-4 items-center text-center">
                <span className="text-primary text-sm italic font-medium">
                    We&apos;re here for you
                </span>
                <h1 className="text-grey-900 text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                    After-Sales Service Centers
                </h1>
                <p className="text-grey-500 text-base leading-7 max-w-xl">
                    Need a repair, warranty service, or routine maintenance? Visit any of
                    our certified service centers across Nigeria for fast, professional
                    support from trained Felicity Solar technicians.
                </p>

                {/* Stats strip */}
                <div className="mt-6 w-full max-w-2xl bg-grey-950 rounded-xl grid grid-cols-3 divide-x divide-white/10 py-5">
                    {stats.map(({ icon: Icon, value, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-y-1 px-4"
                        >
                            <Icon size={20} className="text-primary mb-1" />
                            <span className="text-white font-bold text-lg md:text-xl">
                                {value}
                            </span>
                            <span className="text-grey-400 text-xs md:text-sm text-center leading-4">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </header>

            {/* Service center cards with search */}
            <ServiceCenters data={centers} />

            {/* CTA */}
            <section className="custom-gradient py-16">
                <div className="w-[90%] 2xl:w-[75%] mx-auto flex flex-col md:flex-row items-center justify-between gap-y-6 gap-x-8">
                    <div className="flex flex-col gap-y-2 text-center md:text-left">
                        <h2 className="text-grey-900 text-2xl font-bold">
                            Can&apos;t find a center near you?
                        </h2>
                        <p className="text-grey-500 text-sm leading-6">
                            Contact our headquarters directly and we&apos;ll connect you with
                            the nearest support team.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-end shrink-0">
                        <Link
                            href="/contact-us"
                            className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/get-a-free-quote"
                            className="px-6 py-2.5 border border-grey-200 bg-white text-grey-800 text-sm font-semibold rounded-lg hover:bg-grey-100 transition-colors"
                        >
                            Get a Free Quote
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
