import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { company_nav_links } from "@/lib/data";
import { products_nav_links } from "@/lib/data";
import { Facebook, Instagram, Linkedin, YoutubeIcon } from 'lucide-react';


export type IFooterData = {
    "id": number,
    "phone": string,
    "email": string,
    "address": string,
    "created_at": string,
    "updated_at": string
}

async function Footer() {
    const currentYear = new Date().getFullYear();
    let details: IFooterData | null = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/contact-details`, {
            cache: 'no-store'// Revalidate every hour
        });
        if (!res.ok) throw new Error('Failed to fetch contact details');

        const response: {
            data: IFooterData;
            message: string;
            status: number;
        } = await res.json();

       
        details = response.data;

    } catch (error) {
        console.error('Error fetching contact details:', error);
    }



    return (
        <footer className="bg-black py-20">
            <div className="grid gap-y-12 mx-auto w-[90%] 2xl:w-[75%] gap-x-8 grid-cols-4 md:grid-cols-3 xl:grid-cols-4">
                <div className="flex w-full md:w-[155px] h-[64px] col-start-1 col-end-5 xl:col-start-1 xl:col-end-2">
                    <Image src={"/logo.png"} className="w-auto h-auto" width={155} height={64} alt="felicity solar limited" priority />
                </div>

                <div className="flex flex-col gap-y-4 col-start-1 md:col-end-2 col-end-3 xl:col-start-2 xl:col-end-3">
                    <h4 className="text-primary font-bold text-sm">Company</h4>
                    <ul className="flex flex-col gap-y-4">
                        {company_nav_links.map(c => {
                            return (
                                <li key={c.label}>
                                    <Link href={c.url} className="text-white font-medium text-sm" >
                                        {c.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="flex flex-col gap-y-4 col-start-3 md:col-start-2 md:col-end-3 col-end-5 xl:col-start-3 xl:col-end-4 ">
                    <h4 className="text-primary font-bold text-sm">Products</h4>
                    <ul className="flex flex-col gap-y-4">
                        {products_nav_links.map(c => {
                            return (
                                <li key={c.label}>
                                    <Link href={c.url} className="text-white font-medium text-sm" >
                                        {c.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="flex flex-col gap-y-4 col-start-1 col-end-5 md:col-start-3 md:col-end-4 xl:col-start-4 xl:col-end-5">
                    {
                        details?.phone && <p className="font-semibold text-sm text-white">
                            <span>Tel:</span> <Link href={details?.phone || ""}>{details?.phone}</Link>
                        </p>
                    }
                    {
                        details?.email && <p className="font-semibold text-sm text-white">
                            <span>Email:</span> <Link href={`mailto:${details?.email}`}>{details?.email}</Link>
                        </p>
                    }
                    {
                        details?.address && <p className="font-semibold text-sm text-white">
                            {details?.address}
                            {/* Estate 2, Omotayo Omotosho Street, Durbar Road, Amuwo Odofin Estate, Lagos State Nigeria */}
                        </p>
                    }

                    <div className="social-links gap-x-4 items-center flex">
                        <Link href={"https://www.facebook.com/share/1CbSDGBnJi/?mibextid=wwXIfr"} target="__blank">
                            <Facebook size={20} color='white' />
                        </Link>
                        <Link href={"https://www.instagram.com/felicitysolarnig?igsh=MWR4ZDYzeml3b3Ezbw=="} target="__blank">
                            <Instagram size={20} color='white' />
                        </Link>
                        <Link href={"https://www.linkedin.com/in/felicity-solar-nig"} target="__blank" >
                            <Linkedin size={20} color='white' />
                        </Link>
                        {/* <Link href={"https://www.tiktok.com/@felicitysolarnigeria?_t=ZM-8yD4WHp6GOM&_r=1"} >
                            <Image src={tiktokLogo} alt='tiktok logo' height={20} width={20} />
                        </Link> */}
                        <Link href={"http://www.youtube.com/@felicitysolarnigeria"} target="__blank">
                            <YoutubeIcon size={20} color='white' />
                        </Link>
                    </div>
                </div>
                <p className='font-inter text-sm lg:text-base md:text-center text-white col-start-1 col-end-5'><span>Copyright &copy; {currentYear} All Rights Reserved | </span> Developed by
                    <Link href="https://www.orisfinatech.com.ng" target="__blank" className='text-primary pl-2'>Orisfina Tech</Link> 
                  {/*   <span className='text-primary'> {" "}Orisfina Tech</span> */}
                </p>

            </div>
        </footer>
    )
}

export default Footer
