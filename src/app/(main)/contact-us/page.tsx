import { IFooterData } from '@/components/layouts/footer'
import Navbar from '@/components/layouts/navbar/Navbar'
import ContactForm from '@/components/sections/contact-us/contact-us'

import { Mail, MapPinHouse, PhoneOutgoing } from 'lucide-react'

import { Metadata } from 'next'
import React from 'react'




export const metadata: Metadata = {
  title: 'Contact Felicity Solar Nigeria | Call or WhatsApp',
  description: 'Contact Felicity Solar Nigeria for products, pricing and support. Call or WhatsApp us — offices in Lagos, Abuja and across Nigeria. We reply within 24 hours.',
  keywords: ['contact felicity solar', 'felicity solar nigeria phone number', 'felicity solar abuja', 'felicity solar lagos', 'felicity nigeria'],
  openGraph: {
    title: 'Contact Felicity Solar Nigeria',
    description: 'Call or WhatsApp Felicity Solar Nigeria for products, pricing and technical support. Offices across Nigeria.',
    url: '/contact-us',
    images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Contact Felicity Solar Nigeria' }],
  },
}

async function page() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/contact-details`, {
    next: { revalidate: 3600 },
    // cache: 'no-store'// Revalidate every hour
  });
  const response: {
    data: IFooterData,
    message: string,
    status: number
  } = await res.json();
  if (!response || !response.data) {
    return <p>An error occured.</p>;
  }
  const details = response.data;

  return (
    <div className="flex flex-col font-[family-name:var(--font-inter)]">
      <Navbar linkClassName="text-grey-800 font-semibold" className='hidden lg:flex bg-white w-full text-grey-800 border-b border-grey-100 ' variant='primary' />

      <section className='w-full lg:w-4/5 pb-32 flex flex-col lg:gap-y-22 pt-14 mx-auto mt-12 lg:mt-0'>
        <div className="flex w-[99%] lg:w-3/5 mx-auto min-h-[300px] justify-center items-center md:bg-center bg-right bg-no-repeat bg-cover lg:min-w-[1027px] bg-[url('/assets/images/contact_us_lg.png')] flex-col gap-y-3 rounded-lg">
          <h1 className='font-bold px-4 md:px-0 text-3xl md:text-4xl text-white'>How can we help you?</h1>
          <p className='leading-5 text-sm 2xl:text-base text-center text-white'>Get in touch with our sales and support teams for demos, <span className='md:block'>system requirements, or product questions.</span></p>
        </div>
        <div className="flex flex-col lg:flex-row md:gap-x-12 2xl:w-[85%] mx-auto">
          <div className="flex order-2 lg:order-1 basis-full md:basis-3/5 2xl:basis-[65%] flex-col gap-y-8 bg-[#f7f7f7] py-16 md:px-6 rounded-sm">
            <div className="flex w-[90%] mx-auto flex-col gap-y-6 mb-6">
              <h4 className='flex items-center font-medium'><span className='mr-1 bg-primary rounded-xs px-2 text-white '>Feel free</span>to contact us</h4>
              <h2 className='text-2xl md:text-3xl font-semibold'>Let’s Get in Touch</h2>
            </div>

            <div className="flex flex-col">
              <ContactForm />
            </div>
          </div>
          <div className="flex md:grid md:grid-cols-2 lg:flex order-1 lg:order-2 basis-2/5 2xl:basis-[35%] gap-y-10 flex-col py-10 px-4 md:px-10 lg:px-4">
            <div className="flex justify-start gap-x-2">
              <Mail size={35} color='#ed6f20a0' />
              <div className="flex flex-col">
                <h3 className='font-medium md:font-semibold  text-base text-grey-700 '>{details.email}</h3>
                <p className='text-sm italic leading-6 text-primary font-medium'>
                  Send an Email
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-x-2">
              <PhoneOutgoing size={30} color='#ed6f20a0' />

              <div className="flex flex-col">
                <h3 className='font-medium md:font-semibold text-base text-grey-700 '>{details.phone}</h3>
                <p className='text-sm italic leading-6 text-primary font-medium'>
                  Make a Call
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-x-2">

              <MapPinHouse size={50} color='#ed6f20a0' />

              <div className="flex flex-col">
                <h3 className='font-medium md:font-semibold text-base text-grey-700 '>{details.address}</h3>
                <p className='text-sm italic leading-6 text-primary font-medium'>
                  Office Address
                </p>
              </div>
            </div>


          </div>

        </div>
      </section>
    </div>
  )
}

export default page