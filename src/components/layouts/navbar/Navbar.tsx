"use client";

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/constants';
import LinkButton from '../../ui/Link';
import { cities, nav_items } from '@/lib/data';
import Link from 'next/link';
import MobileNavbar from './mobile-navbar';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Tabs } from 'radix-ui';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type Props = {
    className?: string,
    linkClassName?: string,
    width?: string,
    variant?: "white" | "primary" | "outline"
}

function Navbar({ className, width = "w-[90%]", linkClassName, variant = "white" }: Props) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const { t } = useTranslation('common');

    const NAV_LABEL_KEYS: Record<string, string> = {
        '/': 'nav.home',
        '/about-us': 'nav.about',
        '/products': 'nav.products',
        '/blog': 'nav.blog',
        '/contact-us': 'nav.contact',
        '/after-sales': 'nav.after_sales',
    };

    const getNavLabel = (url: string, fallback: string) =>
        NAV_LABEL_KEYS[url] ? t(NAV_LABEL_KEYS[url]) : fallback;

    return (<React.Fragment>
        <nav className={cn("h-24 hidden lg:flex sticky top-0 z-50 ", className)}>
            <div className={cn("flex justify-between items-center mx-auto", width)}>
                <Link href={"/"}>
                    <Image src={isHomePage ? "/logo.png" : "/logo1.png"} height={64} width={147} alt='felicity solar logo' priority />
                </Link>

                <ul className="flex gap-x-6 list-none">
                    {nav_items.map((nav) => (
                        <li key={nav.url} className="relative group py-4">
                    {nav.children && <button className={`${isHomePage ? "text-white " : "text-grey-800 "} flex items-center gap-1 font-medium`}>
                                {getNavLabel(nav.url ?? '', nav.label)}
                                {nav.children && (
                                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                                )}
                            </button>}
                            {
                                !nav.children && <Link
                                    href={nav.url ?? ""}
                                    className={cn("text-white flex items-center gap-1 font-medium", linkClassName)}
                                >
                                    {getNavLabel(nav.url ?? '', nav.label)}

                                </Link>
                            }


                            {nav.children && (
                                <>
                                    {nav.url === "/project-showcase" &&
                                        <div className='absolute min-w-[460px] left-0 top-[calc(100%+0px)] hidden group-hover:block bg-white text-black shadow-lg rounded-md px-4 py-2 z-50'
                                            data-aos="zoom-in">
                                            <div className="flex flex-col gap-y-3">
                                                <h3 className='text-primary font-inter font-semibold text-lg'>{t('nav.trusted_cities_title')}</h3>
                                                <p className='text-grey-900 font-inter font-normal text-sm'>{t('nav.trusted_cities_desc')}</p>
                                            </div>
                                            <div className="flex-wrap gap-4 py-4 rounded-md flex  items-center">
                                                {cities.map(city => {
                                                    return (
                                                        <Link href={city.path} key={city.name} className=' flex items-center justify-center gap-x-2'>
                                                            <Image src={city.logo} width={36} height={36} alt={city.name} />
                                                            <p className='text-sm hover:underline font-medium text-grey-900'>{city.name}</p>
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        </div>}
                                    {nav.url === "/products" &&
                                        <div className='absolute left-0 top-[calc(100%+0px)] hidden group-hover:flex hover:justify-between group-hover:gap-x-10  bg-white text-black shadow-lg rounded-md min-w-[50vw] mx-auto min-h-80 -translate-x-2/6 px-4 py-6 z-50'>
                                            <Tabs.Root defaultValue="panels" orientation="vertical" className='flex gap-x-6' >
                                                <Tabs.List aria-label="panels" className=' flex-col flex px-4 py-3 lg:w-fit gap-y-4 mx-auto basis-2/5 justify-start items-start border-r border-grey-100'>
                                                    <Tabs.Trigger value={"panels"} className='text-grey-800 text-sm hover:bg-[#fdfdfd] py-3 rounded-md data-[state=active]:bg-grey-100 px-3 xl:text-base font-medium'>
                                                        {t('nav.solar_panels')}
                                                    </Tabs.Trigger>
                                                    <Tabs.Trigger value={"batteries"} className='text-grey-800 text-sm hover:[#fdfdfd] py-3 rounded-md data-[state=active]:bg-grey-100 px-3 xl:text-base font-medium'>
                                                        {t('nav.solar_batteries')}
                                                    </Tabs.Trigger>
                                                    <Tabs.Trigger value={"inverters"} className='text-grey-800 text-sm hover:[#fdfdfd] py-3 rounded-md data-[state=active]:bg-grey-100 px-3 xl:text-base font-medium'>
                                                        {t('nav.inverters')}
                                                    </Tabs.Trigger>
                                                    <Tabs.Trigger value={"controllers"} className='text-grey-800 text-sm hover:[#fdfdfd] py-3 rounded-md px-3 xl:text-base data-[state=active]:bg-grey-100 font-medium'>
                                                        {t('nav.charge_controllers')}
                                                    </Tabs.Trigger>
                                                    <Tabs.Trigger value={"floor_light"} className='text-grey-800 text-sm hover:[#fdfdfd] py-3 rounded-md px-3 xl:text-base data-[state=active]:bg-grey-100 font-medium'>
                                                        {t('nav.solar_light')}
                                                    </Tabs.Trigger>
                                                </Tabs.List>
                                                <Tabs.Content value="panels" className='basis-3/5 flex flex-col gap-y-2'>
                                                    <h3 className=' text-grey-900 text-lg font-medium'>{t('nav.panels_tagline')}</h3>
                                                    <Link href={"/products/felicity-solar-panels"} className='text-base no-underline flex items-center text-primary  font-medium'>{t('nav.find_panel')} <ExternalLink size={16} className='ml-1' /></Link>
                                                    <div className="flex">
                                                        <Image alt='lithium battery front view' src={'/assets/images/FL-M-280W-MONO-panel.jpeg'} width={220} height={250} />
                                                        <Image alt='lithium battery front view' src={'/assets/images/FL-M-350W-MONO-panel.jpeg'} width={220} height={250} />
                                                    </div>
                                                </Tabs.Content>
                                                <Tabs.Content value="batteries" className='basis-3/5  flex flex-col gap-y-2'>
                                                    <h3 className=' text-grey-900 text-lg font-medium'>{t('nav.batteries_tagline')}</h3>
                                                    <Link href={"/products/felicity-solar-batteries"} className='text-base no-underline flex items-center text-primary  font-medium'>{t('nav.explore_batteries')} <ExternalLink size={16} className='ml-1' /></Link>
                                                    <div className="flex">
                                                        <Image alt='lithium battery front view' src={'/assets/images/lithium-battery-front-rear-view.png'} width={220} height={250} />
                                                        <Image alt='lithium battery front view' src={'/assets/images/lithium-battery-front-view.png'} width={220} height={250} />
                                                    </div>
                                                </Tabs.Content>
                                                <Tabs.Content value="inverters" className='basis-3/5 flex flex-col gap-y-2'>
                                                    <h3 className=' text-grey-900 text-lg font-medium'>{t('nav.inverters_tagline')}</h3>
                                                    <Link href={"/products/felicity-solar-inverter"} className='text-base no-underline flex items-center text-primary  font-medium'>{t('nav.get_inverter')} <ExternalLink size={16} className='ml-1' /></Link>
                                                    <div className="flex">
                                                        <Image alt='IVPM 10KVA 48V Pure Sine Wave Inverter With 120A MPPT Charger High Frequency Inverter' src={'/assets/images/1-1e65.webp'} width={220} height={250} />
                                                        <Image alt='IVEM 3KVA 48V Low Voltage Solar System Inverter Bulit-in 110A MPPT Charge Controller' src={'/assets/images/1-c082.webp'} width={220} height={250} />
                                                    </div>
                                                </Tabs.Content>
                                                <Tabs.Content value="controllers" className='basis-3/5 flex flex-col gap-y-2'>
                                                    <h3 className=' text-grey-900 text-lg font-medium'>{t('nav.controllers_tagline')}</h3>
                                                    <Link href={"/products/felicity-charge-controller"} className='text-base no-underline flex items-center text-primary  font-medium'>{t('nav.find_controller')} <ExternalLink size={16} className='ml-1' /></Link>
                                                    <div className="flex">
                                                        <Image alt='45Amps 12V 24v 48v IP20 3-Step mppt Solar Charge Controller' src={'/assets/images/charge_controllers.webp'} width={220} height={250} />
                                                        <Image alt='IVEM 3KVA 48V Low Voltage Solar System Inverter Bulit-in 110A MPPT Charge Controller' src={'/assets/images/charge_controllers2.webp'} width={220} height={250} />
                                                    </div>
                                                </Tabs.Content>
                                                <Tabs.Content value="floor_light" className='basis-3/5 flex flex-col gap-y-2'>
                                                    <h3 className=' text-grey-900 text-lg font-medium'>{t('nav.lights_tagline')}</h3>
                                                    <Link href={"/products/felicity-solar-street-light"} className='text-base no-underline flex items-center text-primary  font-medium'>{t('nav.explore_lighting')} <ExternalLink size={16} className='ml-1' /></Link>
                                                    <div className="flex">
                                                        <Image alt='FL-P2-40W-all-in-one-street-light' src={'/assets/images/FL-P2-40W-all-in-one-street-light-all-view.jpeg'} width={220} height={250} />
                                                        <Image alt='150W Waterproof Solar Outdoor Flood Garden Stadium Reflector Floodlights/Led Flood Light' src={'/assets/images/floor_light2.webp'} width={220} height={250} />
                                                    </div>
                                                </Tabs.Content>
                                            </Tabs.Root>


                                        </div>}

                                </>


                            )}
                        </li>
                    ))}
                </ul>



                <div className="flex items-center gap-3">
                    <LanguageSwitcher theme={isHomePage ? 'light' : 'dark'} />
                    <LinkButton variant={variant} href="https://api.whatsapp.com/send/?text=Hi%20Felicity%20Solar,%20I%20need%20a%20free%20quote&phone=2348171479561&utm_source=website&utm_medium=cta&utm_campaign=whatsapp" label={t('nav.get_quote')} />
                </div>
            </div>

        </nav>
        <MobileNavbar />
    </React.Fragment>


    )
}

export default Navbar

/* 
lg:translate-x-16  @min-[131em]:translate-x-[19rem]
*/