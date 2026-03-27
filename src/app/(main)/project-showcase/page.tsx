import Navbar from '@/components/layouts/navbar/Navbar'
import Image from 'next/image'
import React from 'react'
import type { Metadata } from 'next'
import Projects from './components/Projects'

//


export const metadata: Metadata = {
  title: "Felicity Solar Project Showcases | Real Installations Nigeria",
  description: "Real Felicity Solar installations across Nigeria. Browse residential and commercial projects featuring hybrid inverters, lithium batteries and solar panel systems.",
  keywords: ['felicity solar projects', 'solar installation nigeria', 'felicity solar nigeria', 'solar system installation photos nigeria'],
  openGraph: {
    title: 'Felicity Solar Project Showcases Nigeria',
    description: 'Browse real Felicity Solar residential and commercial installations across Nigeria.',
    url: '/project-showcase',
    images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Felicity Solar Project Showcases Nigeria' }],
  },
}


function page() {

  return (
    <main className='font-[family-name:var(--font-inter)]'>

      <Navbar linkClassName="text-grey-800 font-semibold" className='hidden lg:flex bg-white text-black border-b border-grey-100' variant='primary' />

      <section className='flex justify-center gap-y-10 my-12 flex-col'>
        <div className="flex flex-col justify-center items-center xl:rounded-xl relative  xl:w-[75%] xl:mx-auto h-56 mx-auto w-full 2xl:w-[75%]">
          <Image src={"/assets/images/solar_street_light.jpg"} alt='felicity solar products' width={1200} height={250} className='xl:rounded-xl h-full  object-fit' />
          <div className="absolute z-20">
            <h1 className='text-white text-4xl lg:text-5xl  font-semibold'>Project Showcases</h1>
          </div>
          <div className="overlay absolute top-0 left-0 w-full opacity-70 bg-amber-700 h-full xl:rounded-xl"></div>
        </div>
      </section>

      <Projects />
    </main>
  )
}

export default page