"use client";

import Navbar from "@/components/layouts/navbar/Navbar";
import Milestones from "@/components/sections/milestones";
import { why_choose_us } from "@/lib/data";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutPageContent() {
  const { t } = useTranslation("about");

  return (
    <main className="font-[family-name:var(--font-inter)]">
      <Navbar
        linkClassName="text-grey-800 font-semibold"
        className="hidden border-b border-grey-100 lg:flex bg-white"
        variant="primary"
      />

      <section className="flex flex-col lg:flex-row mt-12 py-32 mx-auto w-[90%] 2xl:w-[75%] md:gap-x-8 lg:gap-x-26 gap-y-10 lg:gap-y-0">
        <div className="order-2 lg:order-1 flex flex-col gap-y-4 basis-1/2">
          <h3 className="text-base italize italic text-primary">{t("eyebrow")}</h3>
          <h2 className="uppercase text-[101928] text-2xl font-bold">{t("company_name")}</h2>
          <div className="flex flex-col gap-y-4">
            <p className="text-[#667185] text-base font-medium leading-8">{t("p1")}</p>
            <p className="text-[#667185] text-base font-medium leading-8">{t("p2")}</p>
            <p className="text-[#667185] text-base font-medium leading-8">{t("p3")}</p>
            <p className="text-[#667185] text-base font-medium leading-8">{t("p4")}</p>
            <p className="text-[#667185] text-base font-medium leading-8">{t("p5")}</p>
            <p className="text-[#667185] text-base font-medium leading-8">{t("p6")}</p>
            <p className="text-[#667185] text-base font-medium leading-8">{t("p7")}</p>
          </div>
        </div>
        <div className="order-1 lg:order-2flex basis-1/2 h-96 justify-center items-start">
          <Image
            src={"/assets/images/about_us.png"}
            alt="About Felicity solar limited"
            width={481}
            height={475}
          />
        </div>
      </section>

      <section className="py-32  custom-gradient">
        <div className="flex flex-col mx-auto w-[95%] 2xl:w-[90%]  gap-x-26 gap-y-20">
          <div className="flex justify-center items-center flex-col gap-y-4">
            <h3 className="text-base italize italic text-primary">{t("why_eyebrow")}</h3>
            <h2 className=" text-grey-900 text-3xl font-bold text-center">{t("why_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 xl:grid-cols-4 gap-x-8">
            {why_choose_us.map((a) => (
              <div
                key={a.title}
                className="flex py-9 items-center justify-center px-8 rounded-lg bg-white flex-col gap-y-7 custom-shadow"
              >
                <Image
                  src={a.icon}
                  alt={a.title}
                  width={48}
                  height={48}
                  className="w-auto h-auto"
                />
                <h3 className="font-semibold text-base text-grey-700">{a.title}</h3>
                <p className="text-sm text-center leading-6 text-[#667185]  font-medium">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 flex-col flex gap-y-22">
        <div className="flex gap-y-26 mx-auto w-[90%]  gap-x-26 flex-col">
          <h2 className=" text-grey-900 text-3xl font-bold">{t("milestones_title")}</h2>
          <Milestones />
        </div>
      </section>
    </main>
  );
}
