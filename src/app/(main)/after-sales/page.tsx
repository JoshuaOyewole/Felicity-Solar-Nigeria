import Navbar from "@/components/layouts/navbar/Navbar";
import { Metadata } from "next";
import AfterSalesContent from "./AfterSalesContent";
import { ServiceCenter } from "./ServiceCenters";

export const metadata: Metadata = {
    title: "After-Sales Service Centres | Felicity Solar Nigeria",
    description:
        "Felicity Solar after-sales service centres across Nigeria. Warranty claims, repairs, maintenance and technical support in Lagos, Abuja, Port Harcourt and more.",
    keywords: ['felicity solar after sales', 'felicity solar service centre nigeria', 'felicity solar warranty', 'felicity solar repair nigeria'],
    openGraph: {
      title: 'Felicity Solar After-Sales Service Centres Nigeria',
      description: 'Find Felicity Solar service centres for warranty, repairs and technical support across Nigeria.',
      url: '/after-sales',
      images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Felicity Solar Service Centres Nigeria' }],
    },
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

