import type { Metadata } from "next";
import HomePageContent from "@/components/home/HomePageContent";
import Footer from "@/components/layouts/footer";

export const metadata: Metadata = {
  title: "Home - Felicity Solar",
  description:
    "We have the best Solar products in town. Hybrid inverter, MPPT controller, Solar lithium battery, Gel battery, Solar all in one street light",
};

export default function Home() {
  return (
    <>
      <HomePageContent />
      <Footer />
    </>
  );
}