"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, YoutubeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { company_nav_links, products_nav_links } from "@/lib/data";
import type { IFooterData } from "./footer";

interface FooterClientProps {
  details: IFooterData | null;
  currentYear: number;
}

export default function FooterClient({ details, currentYear }: FooterClientProps) {
  const { t } = useTranslation("common");

  const companyLinkKeys: Record<string, string> = {
    "/about-us":        "nav.about",
    "/project-showcase":"nav.project_showcase",
    "/blog":            "nav.blog",
    "/contact-us":      "nav.contact",
    "/find-installers": "nav.find_installers",
    "/after-sales":     "nav.after_sales",
  };

  const productLinkKeys: Record<string, string> = {
    "/products/felicity-solar-panels":       "nav.solar_panels",
    "/products/felicity-solar-batteries":    "nav.batteries",
    "/products/felicity-solar-street-light": "nav.street_lights",
    "/products/felicity-solar-inverter":     "nav.inverters",
    "/products/felicity-charge-controller":  "nav.charge_controllers",
    "/products/felicity-solar-lights":       "nav.solar_light",
  };

  return (
    <footer className="bg-black py-20">
      <div className="grid gap-y-12 mx-auto w-[90%] 2xl:w-[75%] gap-x-8 grid-cols-4 md:grid-cols-3 xl:grid-cols-4">
        <div className="flex w-full md:w-[155px] h-[64px] col-start-1 col-end-5 xl:col-start-1 xl:col-end-2">
          <Image
            src={"/logo.png"}
            className="w-auto h-auto"
            width={155}
            height={64}
            alt="felicity solar limited"
            priority
          />
        </div>

        <div className="flex flex-col gap-y-4 col-start-1 md:col-end-2 col-end-3 xl:col-start-2 xl:col-end-3">
          <h4 className="text-primary font-bold text-sm">{t("footer.company")}</h4>
          <ul className="flex flex-col gap-y-4">
            {company_nav_links.map((c) => (
              <li key={c.url}>
                <Link href={c.url} className="text-white font-medium text-sm">
                  {t(companyLinkKeys[c.url] ?? c.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-4 col-start-3 md:col-start-2 md:col-end-3 col-end-5 xl:col-start-3 xl:col-end-4">
          <h4 className="text-primary font-bold text-sm">{t("footer.products")}</h4>
          <ul className="flex flex-col gap-y-4">
            {products_nav_links.map((c) => (
              <li key={c.url}>
                <Link href={c.url} className="text-white font-medium text-sm">
                  {t(productLinkKeys[c.url] ?? c.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-4 col-start-1 col-end-5 md:col-start-3 md:col-end-4 xl:col-start-4 xl:col-end-5">
          {details?.phone && (
            <p className="font-semibold text-sm text-white">
              <span>{t("footer.tel")}:</span>{" "}
              <Link href={details.phone}>{details.phone}</Link>
            </p>
          )}
          {details?.email && (
            <p className="font-semibold text-sm text-white">
              <span>{t("footer.email")}:</span>{" "}
              <Link href={`mailto:${details.email}`}>{details.email}</Link>
            </p>
          )}
          {details?.address && (
            <p className="font-semibold text-sm text-white">{details.address}</p>
          )}

          <div className="social-links gap-x-4 items-center flex">
            <Link href="https://www.facebook.com/share/1CbSDGBnJi/?mibextid=wwXIfr" target="__blank">
              <Facebook size={20} color="white" />
            </Link>
            <Link href="https://www.instagram.com/felicitysolarnig?igsh=MWR4ZDYzeml3b3Ezbw==" target="__blank">
              <Instagram size={20} color="white" />
            </Link>
            <Link href="https://www.linkedin.com/in/felicity-solar-nig" target="__blank">
              <Linkedin size={20} color="white" />
            </Link>
            <Link href="http://www.youtube.com/@felicitysolarnigeria" target="__blank">
              <YoutubeIcon size={20} color="white" />
            </Link>
          </div>
        </div>

        <p className="font-inter text-sm lg:text-base md:text-center text-white col-start-1 col-end-5">
          <span>{t("footer.copyright")} &copy; {currentYear} {t("footer.rights_reserved")} | </span>
          {t("footer.developed_by")}
          <Link href="https://www.orisfinatech.com.ng" target="__blank" className="text-primary pl-2">
            {t("footer.orisfina_tech")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
