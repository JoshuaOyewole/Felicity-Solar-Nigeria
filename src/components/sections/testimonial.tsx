"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import { testimonials as staticTestimonials } from "../../lib/data";

export class testimonial {
  name!: string;
  location!: string;
  img!: string;
  message!: string;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    }
  ],
};

const Testimonials = () => {
  const { t } = useTranslation("home");

  const testimonials = staticTestimonials.map((tm, i) => {
    const key = `t${i + 1}` as const;
    return {
      ...tm,
      name:     t(`testimonials.${key}_name`,     { defaultValue: tm.name }),
      location: t(`testimonials.${key}_location`, { defaultValue: tm.location }),
      message:  t(`testimonials.${key}_message`,  { defaultValue: tm.message }),
    };
  });

  return (
    <Slider {...settings}>
      {testimonials.map((tm: testimonial, i: number) => {
        return (
          <aside key={i} className="p-4 ">
            <div className=" p-4 rounded-lg bg-white  flex flex-col  ">

              <p className="text-base text-grey-700 mt-6 mb-8">
                {tm.message}
              </p>
              <div className="flex gap-x-2 items-center">
                <Image
                  src={`${tm.img}`}
                  alt={tm.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover h-11 w-11 bg-center bg-cover"
                />
                <div className="flex flex-col  gap-x-3 items-start">
                  <h3 className=" text-base text-grey-800 font-semibold">
                    {tm.name}</h3>
                  <p className="text-grey-700 font-medium text-sm">
                    {tm.location}
                  </p>
                </div>
              </div>


            </div>
          </aside>
        );
      })}
    </Slider >
  );
};

export default Testimonials;
