"use client";

import { ChevronRight, Wrench, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ServiceCenters, { ServiceCenter } from "./ServiceCenters";

const STATS = [
    { icon: MapPin, value: "20+", key: "stat_centers" },
    { icon: Wrench, value: "Expert", key: "stat_technicians" },
    { icon: Clock, value: "Fast", key: "stat_turnaround" },
];

export default function AfterSalesContent({ centers }: { centers: ServiceCenter[] }) {
    const { t } = useTranslation("after-sales");

    return (
        <>
            {/* Breadcrumb */}
            <section className="flex flex-col mt-12 lg:mt-0 pt-6 w-[90%] 2xl:w-[75%] mx-auto">
                <div className="items-center flex-row gap-x-1 hidden lg:flex">
                    <Link
                        href="/"
                        className="text-grey-400 font-medium text-sm hover:text-primary transition-colors"
                    >
                        {t("breadcrumb_home")}
                    </Link>
                    <ChevronRight color="#98A2B3" size={16} />
                    <span className="text-grey-700 font-medium text-sm">
                        {t("breadcrumb_page")}
                    </span>
                </div>
            </section>

            {/* Hero */}
            <header className="w-[90%] 2xl:w-[75%] mx-auto pt-10 pb-12 flex flex-col gap-y-4 items-center text-center">
                <span className="text-primary text-sm italic font-medium">
                    {t("hero_eyebrow")}
                </span>
                <h1 className="text-grey-900 text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                    {t("hero_title")}
                </h1>
                <p className="text-grey-500 text-base leading-7 max-w-xl">
                    {t("hero_description")}
                </p>

                {/* Stats strip */}
                <div className="mt-6 w-full max-w-2xl bg-grey-950 rounded-xl grid grid-cols-3 divide-x divide-white/10 py-5">
                    {STATS.map(({ icon: Icon, value, key }) => (
                        <div
                            key={key}
                            className="flex flex-col items-center gap-y-1 px-4"
                        >
                            <Icon size={20} className="text-primary mb-1" />
                            <span className="text-white font-bold text-lg md:text-xl">
                                {value}
                            </span>
                            <span className="text-grey-400 text-xs md:text-sm text-center leading-4">
                                {t(key)}
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
                            {t("cta_title")}
                        </h2>
                        <p className="text-grey-500 text-sm leading-6">
                            {t("cta_description")}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-end shrink-0">
                        <Link
                            href="/contact-us"
                            className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            {t("cta_contact")}
                        </Link>
                        <Link
                            href="/get-a-free-quote"
                            className="px-6 py-2.5 border border-grey-200 bg-white text-grey-800 text-sm font-semibold rounded-lg hover:bg-grey-100 transition-colors"
                        >
                            {t("cta_quote")}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
