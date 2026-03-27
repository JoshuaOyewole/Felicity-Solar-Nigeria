"use client";

import { MapPin, Phone, User, Search, Navigation, Building2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

export type ServiceCenterContact = {
    name: string;
    address: string;
    phone: string;
};

export type ServiceCenter = {
    id: string;
    city: string;
    state: string;
    contacts: ServiceCenterContact[];
};

type StateGroup = {
    state: string;
    centers: ServiceCenter[];
};


function getMapsUrl(address: string) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Nigeria")}`;
}

function normalizePhone(phone: string) {
    return phone.replace(/\s+/g, "");
}

/** Group an array of centers by state, preserving insertion order of first appearance. */
function groupByState(centers: ServiceCenter[]): StateGroup[] {
    const map = new Map<string, ServiceCenter[]>();
    for (const c of centers) {
        if (!map.has(c.state)) map.set(c.state, []);
        map.get(c.state)!.push(c);
    }
    return Array.from(map.entries()).map(([state, cs]) => ({ state, centers: cs }));
}

export default function ServiceCenters({ data }: { data: ServiceCenter[] }) {
    const { t } = useTranslation("after-sales");
    const [query, setQuery] = useState("");

    const groups: StateGroup[] = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = q
            ? data.filter(
                  (c) =>
                      c.city.toLowerCase().includes(q) ||
                      c.state.toLowerCase().includes(q)
              )
            : data;
        return groupByState(filtered);
    }, [query, data]);

    const totalCenters = groups.reduce((n, g) => n + g.centers.length, 0);

    return (
        <section className="py-16 md:py-24">
            <div className="w-[90%] 2xl:w-[75%] mx-auto flex flex-col gap-y-10">

                {/* Search bar */}
                <div className="flex flex-col items-center gap-y-3">
                    <div className="relative w-full max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-400 pointer-events-none"
                            size={18}
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t("search_placeholder")}
                            className="w-full h-11 pl-10 pr-4 border border-grey-200 rounded-lg text-sm text-grey-900 placeholder:text-grey-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                        />
                    </div>
                    <p className="text-grey-500 text-sm">
                        {t("centers_found", { count: totalCenters })}
                        {groups.length !== totalCenters && ` ${t("across_states", { count: groups.length })}`}
                    </p>
                </div>

                {/* Cards grid */}
                {groups.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {groups.map((group) => (
                            <article
                                key={group.state}
                                className="break-inside-avoid flex flex-col bg-white rounded-xl border border-grey-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                {/* Top accent bar */}
                                <div className="h-1.5 w-full bg-primary" />

                                {/* State header */}
                                <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-grey-100">
                                    <h2 className="text-grey-900 text-xl font-bold leading-tight">
                                        {group.state}
                                    </h2>
                                    {group.centers.length > 1 && (
                                        <span className="flex items-center gap-x-1 bg-orange-50 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-100">
                                            <Building2 size={11} />
                                            {t("locations", { count: group.centers.length })}
                                        </span>
                                    )}
                                </div>

                                {/* One section per location within the state */}
                                <div className="flex flex-col divide-y divide-grey-100 flex-1">
                                    {group.centers.map((center, idx) => (
                                        <div key={idx} className="flex flex-col gap-y-3 p-5">
                                            {/* City label — only show when there are multiple */}
                                            {group.centers.length > 1 && (
                                                <p className="text-xs font-semibold text-grey-400 uppercase tracking-wider">
                                                    {center.city}
                                                </p>
                                            )}

                                            {/* Contacts */}
                                            <div className="flex flex-col gap-y-1">
                                                {center.contacts.map((contact, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex flex-col gap-y-2 py-2 border-b border-grey-100 last:border-0"
                                                    >
                                                        <div className="flex items-center justify-between gap-x-2">
                                                            <div className="flex items-center gap-x-2 min-w-0">
                                                                <User size={13} className="text-grey-400 shrink-0" />
                                                                <span className="text-grey-700 text-sm font-medium truncate">
                                                                    {contact.name}
                                                                </span>
                                                            </div>
                                                            <a
                                                                href={`tel:${normalizePhone(contact.phone)}`}
                                                                className="flex items-center gap-x-1 text-primary text-sm font-semibold hover:underline shrink-0"
                                                                aria-label={`Call ${contact.name}`}
                                                            >
                                                                <Phone size={12} />
                                                                {contact.phone}
                                                            </a>
                                                        </div>
                                                        <div className="flex items-start gap-x-2">
                                                            <MapPin size={13} className="text-primary mt-0.5 shrink-0" />
                                                            <p className="text-grey-500 text-xs leading-4">{contact.address}</p>
                                                        </div>
                                                        <a
                                                            href={getMapsUrl(contact.address)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="self-start flex items-center gap-x-1 text-primary text-xs font-semibold hover:underline"
                                                        >
                                                            <Navigation size={11} />
                                                            {t("get_directions")}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Card footer — call first contact */}
                                <div className="border-t border-grey-100">
                                    <a
                                        href={`tel:${normalizePhone(group.centers[0].contacts[0].phone)}`}
                                        className="flex w-full items-center justify-center gap-x-1.5 py-3 text-sm font-medium text-grey-700 hover:bg-grey-100 transition-colors duration-150"
                                    >
                                        <Phone size={14} />
                                        {t("call_now")}
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 gap-y-3 text-center">
                        <Search size={40} className="text-grey-200" />
                        <p className="text-grey-700 font-semibold text-lg">{t("no_results_title")}</p>
                        <p className="text-grey-500 text-sm">
                            {t("no_results_subtitle")}
                        </p>
                        <button
                            onClick={() => setQuery("")}
                            className="mt-2 text-primary text-sm font-medium hover:underline"
                        >
                            {t("clear_search")}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
