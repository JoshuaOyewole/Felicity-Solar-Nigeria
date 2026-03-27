import type { Metadata } from "next";
import HomePageContent from "@/components/home/HomePageContent";
import Footer from "@/components/layouts/footer";

export const metadata: Metadata = {
  title: "Felicity Solar Nigeria — Official Website",
  description: "Official Felicity Solar Nigeria. Hybrid inverters, lithium batteries, solar panels & MPPT controllers. View price list, find dealers, and get a free quote.",
  keywords: ["felicity solar", "felicity solar nigeria", "felicity solar official website", "felicity solar price list", "felicity inverter", "felicity lithium battery", "solar inverter nigeria", "solar panel nigeria"],
  openGraph: {
    title: "Felicity Solar Nigeria — Official Website",
    description: "Buy genuine Felicity Solar inverters, batteries and solar panels in Nigeria. View price list and get a free quote.",
    url: "/",
    images: [{ url: "/assets/images/solar_street_light.jpg", width: 1200, height: 630, alt: "Felicity Solar Nigeria" }],
  },
};

export default function Home() {
  return (
    <>
      <HomePageContent />
      <Footer />
    </>
  );
}