import FAQ from "@/components/ui/faq";
import LinkButton from "@/components/ui/Link";
import { MoveRight, ShieldCheck, Headphones, Zap, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layouts/navbar/Navbar";
import Testimonials from "@/components/sections/testimonial";
import { WhatsApp } from "@/lib/icons";
import Link from "next/link";
import TabSection from "@/components/sections/product-tabs/TabSection";
import AOSInitializer from "@/components/AOSInitializer";
import Footer from "@/components/layouts/footer";
import React, { Suspense } from "react";
import Articles from "@/components/page-sections/Articles";
import TopProducts from "@/components/sections/TopProducts";

const productionPillars = [
  {
    title: "Manufacturing Excellence",
    description:
      "Modern factory lines ensure consistent quality across panels, inverters, and batteries.",
  },
  {
    title: "Nationwide Distribution",
    description:
      "Robust logistics and regional warehouses for fast, reliable delivery.",
  },
  {
    title: "Retail & Project Sales",
    description:
      "Dedicated teams for residential, commercial, and mega‑project supply.",
  },
  {
    title: "After‑Sales Support",
    description:
      "Service centers and certified technicians for maintenance and warranty care.",
  },
];

const stats = [
  { value: "18+", label: "Years in Business" },
  { value: "30+", label: "Service Centers" },
  { value: "50+", label: "Certified Installers" },
  { value: "10k+", label: "Happy Customers" },
];

const whyChooseUs = [
  {
    icon: <ShieldCheck size={28} className="text-primary" />,
    title: "Certified & Trusted",
    description:
      "Every product is tested and certified to meet international standards, giving you peace of mind.",
  },
  {
    icon: <Zap size={28} className="text-primary" />,
    title: "High Performance",
    description:
      "Industry-leading efficiency ratings on panels, inverters, and batteries built for Nigeria's climate.",
  },
  {
    icon: <MapPin size={28} className="text-primary" />,
    title: "Nationwide Coverage",
    description:
      "12+ service centers across Nigeria ensure you're never far from expert support.",
  },
  {
    icon: <Headphones size={28} className="text-primary" />,
    title: "Dedicated After-Sales",
    description:
      "Our team is always available for maintenance, warranty claims, and technical guidance.",
  },
];
export const metadata: Metadata = {
  title: "Home - Felicity Solar",
  description:
    "We have the best Solar products in town. Hybrid inverter, MPPT controller, Solar lithium battery, Gel battery, Solar all in one street light",
};

export default function Home() {
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
            {/* <source
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/video/upload/q_auto:eco,f_auto,w_960/v1757957869/felicity_bg-video_dacbci.mp4`}
              type="video/mp4"
            /> */}
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
                  <span className="lg:block">Power homes, businesses, and </span>
                  <span className="lg:block">
                    mega projects with a{" "}
                    <span className="text-primary"> brand </span>
                  </span>
                  <span className="md:block">you can trust.</span>
                </h1>
              </div>
              <p
                className="text-white font-medium text-lg"
                data-aos="fade-right"
              >
                Felicity Solar delivers end-to-end solutions — production,
                sales, installation, and after-sales support nationwide.
              </p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <LinkButton
                className="transition-all duration-250 hover:scale-105 hover:bg-[#363f48] hover:text-white"
                variant={"primary"}
                href="https://api.whatsapp.com/send/?text=Hi%20Felicity%20Solar,%20I%20need%20a%20free%20quote&phone=2348171479561&utm_source=website&utm_medium=cta&utm_campaign=whatsapp"
                size={"lg"}
                label="Get a Free Quote"
              />
              <Link
                href="/products"
                className="flex items-center gap-2 text-white/80 hover:text-white"
              >
                Browse products <MoveRight size={18} />
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
                <h3 className="text-base italic text-primary">Our Products</h3>
                <h2 className="text-[#101928] text-2xl md:text-3xl font-bold">
                  Top Selling Products
                </h2>
                <p className="text-[#667185] font-medium text-base max-w-lg">
                  Discover our best-performing solar solutions — trusted by
                  thousands of homes and businesses across Nigeria.
                </p>
              </div>
              <Link
                href="/products"
                className="flex items-center gap-2 text-primary font-semibold hover:underline shrink-0"
              >
                See all products <MoveRight size={18} />
              </Link>
            </div>
            <TopProducts />
          </div>
        </section>

        {/* ─── WHY CHOOSE US ────────────────────────────── */}
        <section className="py-18 md:py-24 bg-[#F7F9FC]">
          <div className="flex gap-y-12 mx-auto w-[90%] 2xl:w-[75%] flex-col">
            <div className="flex flex-col items-center gap-y-3 text-center" data-aos="fade-up">
              <h3 className="text-base italic text-primary">Why Felicity Solar</h3>
              <h2 className="text-[#101928] text-2xl md:text-3xl font-bold">
                Built Around Your Needs
              </h2>
              <p className="text-[#667185] font-medium text-base max-w-xl">
                From quality products to dedicated support, everything we do is
                designed to give you reliable power — worry-free.
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
                Felicity Solar Products
              </h3>
              <h2 className="text-[#101928] text-2xl md:text-3xl font-bold">
                What do we Offer to you?
              </h2>
              <h3 className="text-[#667185] font-medium text-base text-center">
                Solar Panels. Batteries. Inverters. All in One Place.
              </h3>
            </div>
            <TabSection />
          </div>
        </section>

        {/* ─── ABOUT US ─────────────────────────────────── */}
        {/*    <section className="flex flex-col lg:flex-row gap-y-20 py-18 md:py-32 mx-auto w-[90%] 2xl:w-[75%] md:gap-x-8 lg:gap-x-26">
          <div
            id="example-anchor"
            className="flex flex-col gap-y-4 basis-1/2"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <h3 className="text-base italic text-primary">About us</h3>
            <h2 className="uppercase text-[#101928] text-2xl md:text-3xl font-bold">
              FELICITY SOLAR NIG LTD
            </h2>
            <div className="flex flex-col gap-y-4">
              <p className="text-[#667185] text-base font-medium">
                Established in 2016 and headquartered in Festac, Lagos, Felicity
                Solar Nigeria has grown to become one of the most recognized and
                trusted solar energy brands in the country.
              </p>
              <p className="text-[#667185] text-base font-medium">
                With a strong focus on sales and after-sales support, we have
                built a robust network of over 12 service centers across
                Nigeria—ensuring fast, efficient, and professional assistance
                for our customers nationwide.
              </p>
              <p className="text-[#667185] text-base font-medium">
                Felicity Solar is a forward-thinking company committed to
                advancing clean energy solutions.
              </p>
            </div>
            <LinkButton
              href="/about-us"
              label="Read more"
              className="w-[132px]"
            />
          </div>
          <div
            className="flex basis-1/2 lg:justify-center"
            data-aos="slide-up"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="500"
          >
            <Image
              src={"/assets/images/about_us_image.png"}
              alt="About Felicity solar limited"
              width={481}
              height={475}
            />
          </div>
        </section> */}

        {/* ─── PRODUCTION & SALES ───────────────────────── */}
        <section className="py-20 md:py-28 bg-[#101928]">
          <div className="mx-auto w-[90%] 2xl:w-[75%] grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <div
              className="text-white flex flex-col gap-6"
              data-aos="fade-right"
            >
              <h3 className="text-sm italic text-primary">
                Production &amp; sales
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold">
                From factory floor to field installation
              </h2>
              <p className="text-white/70 text-base">
                We control the full pipeline — manufacturing, distribution, and
                retail sales — so customers get consistent quality and
                after-sales support.
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

        {/* ─── CERTIFIED INSTALLERS ─────────────────────── */}
        <section className="py-18 md:py-32">
          <div className="flex gap-y-12 mx-auto w-[95%] md:w-[90%] 2xl:w-[75%] gap-x-26 flex-col">
            <div className="flex items-center flex-col gap-y-4">
              <h3 className="text-base italic text-primary">Service Center</h3>
              <h2
                className="text-[#101928] text-2xl md:text-3xl font-bold"
                data-aos="zoom-in"
              >
                Trusted after Service centre Near You
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
                Customer success stories
              </h3>
              <h2
                className="text-[#101928] text-2xl md:text-3xl font-bold text-center md:text-left"
                data-aos="zoom-in"
              >
                See what our customers are saying
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
            Frequently Asked Questions
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
                  Ready to Enjoy Uninterrupted Power?
                </h2>
                <p className="text-sm md:text-base lg:text-sm text-white font-medium text-center">
                  Felicity is built to run residential solar workflows end to
                  end or can be a plug and play{" "}
                  <span className="lg:block">
                    solution with other existing apps.
                  </span>
                </p>
              </div>
              <div className="flex gap-x-6 flex-col md:flex-row gap-y-8 md:gap-y-0">
                <LinkButton
                  className="max-w-[310px] px-6 text-base font-medium h-12 md:max-h-12 group-hover:text-white"
                  variant={"white"}
                  href={"/get-a-free-quote"}
                  label="Get a Free Quote Now"
                  icon={<MoveRight className="ml-2" />}
                />
                <Link
                  href="https://api.whatsapp.com/send/?text=Hi&phone=2348171479561&utm_source=website&utm_medium=cta&utm_campaign=whatsapp"
                  target="__blank"
                  className="flex justify-center items-center gap-x-2 h-12 rounded-md max-w-[310px] bg-[#25D366] px-6 text-base font-medium md:max-h-12 group-hover:text-white"
                >
                  <WhatsApp />
                  <span>Send a Message</span>
                  <MoveRight className="ml-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={<p>Loading contact info...</p>}>
        <Footer />
      </Suspense>
    </React.Fragment>
  );
}
