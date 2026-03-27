import Navbar from "@/components/layouts/navbar/Navbar";
import { Metadata } from "next";
import AfterSalesContent from "./AfterSalesContent";
import { ServiceCenter } from "./ServiceCenters";

export const metadata: Metadata = {
    title: "After-Sales Service Centers - Felicity Solar",
    description:
        "Find a Felicity Solar after-sales service center near you for repairs, maintenance, and technical support across Nigeria.",
};

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
            <AfterSalesContent centers={centers} />
        </main>
    );
}

