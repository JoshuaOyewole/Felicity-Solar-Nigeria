"use client";

import FAQ from "@/components/ui/faq";
import LinkButton from "@/components/ui/Link";
import { MoveRight, ShieldCheck, Headphones, Zap, MapPin } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layouts/navbar/Navbar";
import Testimonials from "@/components/sections/testimonial";
import { WhatsApp } from "@/lib/icons";
import Link from "next/link";
import TabSection from "@/components/sections/product-tabs/TabSection";
import AOSInitializer from "@/components/AOSInitializer";
import React from "react";
import Articles from "@/components/page-sections/Articles";
import TopProducts from "@/components/sections/TopProducts";
import { useTranslation } from "react-i18next";

export default function HomePageContent() {
  const { t } = useTranslation("home");

  const productionPillars = [
    {
      title: t("production_pillars.p1_title"),
      description: t("production_pillars.p1_desc"),
    },
    {
      title: t("production_pillars.p2_title"),
      description: t("production_pillars.p2_desc"),
    },
    {
      title: t("production_pillars.p3_title"),
      description: t("production_pillars.p3_desc"),
    },
    {
      title: t("production_pillars.p4_title"),
      description: t("production_pillars.p4_desc"),
    },
  ];

  const stats = [
    { value: "18+", label: t("stats.years") },
    { value: "30+", label: t("stats.service_centers") },
    { value: "50+", label: t("stats.installers") },
    { value: "10k+", label: t("stats.customers") },
  ];

  const whyChooseUs = [
    {
      icon: <ShieldCheck size={28} className="text-primary" />,
      title: t("why_us.certified_title"),
      description: t("why_us.certified_desc"),
    },
    {
      icon: <Zap size={28} className="text-primary" />,
      title: t("why_us.performance_title"),
      description: t("why_us.performance_desc"),
    },
    {
      icon: <MapPin size={28} className="text-primary" />,
      title: t("why_us.coverage_title"),
      description: t("why_us.coverage_desc"),
    },
    {
      icon: <Headphones size={28} className="text-primary" />,
      title: t("why_us.support_title"),
      description: t("why_us.support_desc"),
    },
  ];

  return (
    <React.Fragment>
      <AOSInitializer />

      <main>
        {/* ─── HERO ─────────────────────────────────────── */}
        <section className="relative flex flex-col h-screen md:h-[70vh] xl:h-[95vh] justify-center overflow-x-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster="/assets/images/landing_page_hero1.png"
            id="hero-video"
          >
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black/70 z-10" />

          <Navbar
            linkClassName="text-white"
            className="mx-auto top-0 absolute w-full lg:flex z-50 text-black"
            variant="white"
          />

          <div className="w-[90%] xl:w-[80%] 2xl:w-[75%] mx-auto gap-y-20 lg:gap-y-8 flex flex-col z-40">
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col">
                <h1
                  className="text-4xl md:text-5xl block md:leading-14 xl:leading-16 lg:text-6xl lg:flex gap-y-2 flex-col font-semibold text-white w-full xl:w-[90%] md:w-full"
                  data-aos="zoom-in"
                >
                  <span className="lg:block">{t("hero.title_part1")}</span>
                  <span className="lg:block">
                    {t("hero.title_part2")}{" "}
                    <span className="text-primary">{t("hero.title_highlight")} </span>
                  </span>
                  <span className="md:block">{t("hero.title_part3")}</span>
                </h1>
              </div>
              <p
                className="text-white font-medium text-lg"
                data-aos="fade-right"
              >
                {t("hero.subtitle")}
              </p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <LinkButton
                className="transition-all duration-250 hover:scale-105 hover:bg-[#363f48] hover:text-white"
                variant={"primary"}
                href="https://api.whatsapp.com/send/?text=Hi%20Felicity%20Solar,%20I%20need%20a%20free%20quote&phone=2348171479561&utm_source=website&utm_medium=cta&utm_campaign=whatsapp"
                size={"lg"}
                label={t("hero.cta_quote")}
              />
              <Link
                href="/products"
                className="flex items-center gap-2 text-white/80 hover:text-white"
              >
                {t("hero.cta_browse")} <MoveRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── STATS STRIP ──────────────────────────────── */}
        <section className=" py-8">
          <div className="mx-auto pt-10 w-[90%] 2xl:w-[75%] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-y-1 text-center px-4"
                data-aos="fade-up"
              >
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {s.value}
                </span>
                <span className="text-sm text-grey-500 font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TOP SELLING PRODUCTS ─────────────────────── */}
        <section className="py-18 md:py-24">
          <div className="flex gap-y-12 mx-auto w-[90%] 2xl:w-[75%] flex-col">
            <div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-y-4"
              data-aos="fade-up"
            >
              <div className="flex flex-col gap-y-2">
                <h3 className="text-base italic text-primary">{t("products_section.eyebrow")}</h3>
                <h2 className="text-[#101928] text-2xl md:text-3xl font-bold">
                  {t("products_section.title")}
                </h2>
                <p className="text-[#667185] font-medium text-base max-w-lg">
                  {t("products_section.description")}
                </p>
              </div>
              <Link
                href="/products"
                className="flex items-center gap-2 text-primary font-semibold hover:underline shrink-0"
              >
                {t("products_section.see_all")} <MoveRight size={18} />
              </Link>
            </div>
            <TopProducts />
          </div>
        </section>

        {/* ─── WHY CHOOSE US ────────────────────────────── */}
        <section className="py-18 md:py-24 bg-[#F7F9FC]">
          <div className="flex gap-y-12 mx-auto w-[90%] 2xl:w-[75%] flex-col">
            <div className="flex flex-col items-center gap-y-3 text-center" data-aos="fade-up">
              <h3 className="text-base italic text-primary">{t("why_us.eyebrow")}</h3>
              <h2 className="text-[#101928] text-2xl md:text-3xl font-bold">
                {t("why_us.title")}
              </h2>
              <p className="text-[#667185] font-medium text-base max-w-xl">
                {t("why_us.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
              {whyChooseUs.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-grey-200 p-6 flex flex-col gap-y-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-[#101928] text-base">
                    {item.title}
                  </h4>
                  <p className="text-[#667185] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRODUCTS BY CATEGORY ─────────────────────── */}
        <section className="py-18 md:py-32">
          <div className="flex gap-y-12 mx-auto w-[90%] 2xl:w-[75%] gap-x-26 flex-col">
            <div className="flex items-center flex-col gap-y-4">
              <h3 className="text-base italic text-primary">
                {t("products_offer.eyebrow")}
              </h3>
              <h2 className="text-[#101928] text-2xl md:text-3xl font-bold">
                {t("products_offer.title")}
              </h2>
              <h3 className="text-[#667185] font-medium text-base text-center">
                {t("products_offer.subtitle")}
              </h3>
            </div>
            <TabSection />
          </div>
        </section>

        {/* ─── PRODUCTION & SALES ───────────────────────── */}
        <section className="py-20 md:py-28 bg-[#101928]">
          <div className="mx-auto w-[90%] 2xl:w-[75%] grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <div
              className="text-white flex flex-col gap-6"
              data-aos="fade-right"
            >
              <h3 className="text-sm italic text-primary">
                {t("production_pillars.eyebrow")}
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold">
                {t("production_pillars.title")}
              </h2>
              <p className="text-white/70 text-base">
                {t("production_pillars.subtitle")}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {productionPillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="font-semibold">{pillar.title}</p>
                    <p className="text-sm text-white/70">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4" data-aos="zoom-in">
              <Image
                src="/assets/images/production_line.jpg"
                alt="Production line"
                width={520}
                height={360}
                className="rounded-2xl object-cover"
              />
              <Image
                src="/assets/images/warehouse_products.png"
                alt="Warehouse products"
                width={520}
                height={280}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* ─── SERVICE CENTER ─────────────────────── */}
        <section className="py-18 md:py-32">
          <div className="flex gap-y-12 mx-auto w-[95%] md:w-[90%] 2xl:w-[75%] gap-x-26 flex-col">
            <div className="flex items-center flex-col gap-y-4">
              <h3 className="text-base italic text-primary">Service Center</h3>
              <h2
                className="text-[#101928] text-2xl md:text-3xl font-bold"
                data-aos="zoom-in"
              >
                Expert After-Sales Support for Your Solar System
              </h2>
            </div>
            <div
              className="flex flex-col gap-y-8 lg:flex-row bg-primary rounded-lg min-h-[400px] py-12 px-6 md:px-8 xl:px-22 justify-between"
              data-aos="fade-up"
            >
              <div className="flex flex-col gap-y-8 md:gap-y-16 basis-2/5">
                <Image
                  src={"/assets/images/location_frame_1.png"}
                  width={224}
                  height={44}
                  alt="locations logos"
                />
                <div className="flex gap-y-4 flex-col">
                  <h3 className="text-xl md:text-3xl lg:text-xl font-bold text-white">
                    Need a Certified After sales service centre you Can trust?
                  </h3>
                  <p className="text-sm md:text-base lg:text-sm text-white font-medium">
                    We&apos;ve partnered with trained and verified professionals to
                    ensure your solar setup is done right — safely, efficiently,
                    and to the highest standards.
                  </p>
                </div>
                <LinkButton
                  className="max-w-[254px] max-h-12 font-semibold"
                  variant={"white"}
                  href="/after-sales"
                  label="Find a Centre Near You"
                  icon={<MoveRight className="ml-2" />}
                />
              </div>
              <div className="flex flex-col gap-y-8 basis-1/2 md:hidden lg:flex">
                <Image
                  src={"/assets/images/location_frame_2.png"}
                  width={519}
                  height={370}
                  alt="location pin point where felicity solar limited have their offices"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─────────────────────────────── */}
        <section className="py-18 md:py-32 custom-gradient">
          <div className="flex flex-col mx-auto w-[95%] 2xl:w-[90%] gap-x-26 gap-y-20">
            <div className="flex justify-center items-center flex-col gap-y-4">
              <h3 className="text-base italic text-primary">
                {t("testimonials.eyebrow")}
              </h3>
              <h2
                className="text-[#101928] text-2xl md:text-3xl font-bold text-center md:text-left"
                data-aos="zoom-in"
              >
                {t("testimonials.title")}
              </h2>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────── */}
        <section className="py-18 md:py-10 lg:py-32 flex-col flex gap-y-22">
          <h2
            className="text-[#101928] text-2xl md:text-3xl text-center font-bold"
            data-aos="zoom-in"
          >
            {t("faq.title")}
          </h2>
          <div className="flex gap-y-12 mx-auto w-[98%] md:w-[90%] 2xl:w-[75%] gap-x-26 flex-col">
            <FAQ />
          </div>
        </section>

        {/* ─── BLOG / ARTICLES ──────────────────────────── */}
        <Articles />

        {/* ─── CTA ──────────────────────────────────────── */}
        <section className="py-18 md:py-10 lg:py-32">
          <div className="flex gap-y-12 mx-auto w-[95%] md:w-[90%] 2xl:w-[75%] flex-col">
            <div className="flex justify-center items-center flex-col bg-cover bg-center bg-no-repeat bg-[url('/assets/images/cta_section.png')] w-full min-h-[700px] md:min-h-[500px] rounded-lg py-12 px-6 md:px-2 lg:px-22 gap-y-8">
              <div className="flex flex-col gap-y-3">
                <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-white text-center lg:text-left">
                  {t("cta_banner.title")}
                </h2>
                <p className="text-sm md:text-base lg:text-sm text-white font-medium text-center">
                  {t("cta_banner.subtitle")}
                </p>
              </div>
              <div className="flex gap-x-6 flex-col md:flex-row gap-y-8 md:gap-y-0">
                <LinkButton
                  className="max-w-[310px] px-6 text-base font-medium h-12 md:max-h-12 group-hover:text-white"
                  variant={"white"}
                  href={"/get-a-free-quote"}
                  label={t("cta_banner.button1")}
                  icon={<MoveRight className="ml-2" />}
                />
                <Link
                  href="https://api.whatsapp.com/send/?text=Hi&phone=2348171479561&utm_source=website&utm_medium=cta&utm_campaign=whatsapp"
                  target="__blank"
                  className="flex justify-center items-center gap-x-2 h-12 rounded-md max-w-[310px] bg-[#25D366] px-6 text-base font-medium md:max-h-12 group-hover:text-white"
                >
                  <WhatsApp />
                  <span>{t("cta_banner.button2")}</span>
                  <MoveRight className="ml-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

    </React.Fragment>
  );
}
