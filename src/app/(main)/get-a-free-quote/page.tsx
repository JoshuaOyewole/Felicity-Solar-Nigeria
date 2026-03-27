import Navbar from '@/components/layouts/navbar/Navbar'
import GetQuote from '@/components/sections/get-a-quote'
import { Metadata } from 'next'
import React from 'react'

////

export const metadata: Metadata = {
  title: 'Get a Free Solar Quote | Felicity Solar Nigeria',
  description: 'Free solar quote from Felicity Solar Nigeria. Tell us your power needs — we will recommend the right inverter, battery and solar panels for your home or business.',
  keywords: ['felicity solar free quote', 'solar quote nigeria', 'felicity solar price list', 'solar system quote nigeria', 'felicity solar nigeria'],
  openGraph: {
    title: 'Get a Free Solar Quote | Felicity Solar Nigeria',
    description: 'Tell us your power needs and we will recommend the right Felicity Solar system for your home or business.',
    url: '/get-a-free-quote',
    images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Get a Free Solar Quote Nigeria' }],
  },
}
function page() {
  return (
    <div>
      <Navbar linkClassName="text-grey-800 font-semibold" className='hidden border-b border-grey-100 lg:flex bg-white' variant='primary' />
      <GetQuote />
    </div>
  )
}

export default page