import Navbar from '@/components/layouts/navbar/Navbar'
import Product from '@/components/ui/product'
import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IProductsResponse } from '../page'

//

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Felicity Lithium Batteries Nigeria | 5KWh to 25KWh Price List',
  description: 'Felicity lithium batteries in Nigeria — 5KWh to 25KWh LiFePO4 batteries. View our battery price list, compare specs, and get the best prices on Felicity solar batteries online.',
  keywords: ['felicity lithium battery', 'felicity solar battery', 'felicity battery', 'felicity lithium battery price in nigeria', 'felicity lithium battery price list', '5kwh felicity lithium battery', '25kwh felicity lithium battery', 'felicity 5kwh lithium battery', 'felicity inverter battery'],
  openGraph: {
    title: 'Felicity Lithium Batteries Nigeria | 5KWh to 25KWh',
    description: 'Shop Felicity lithium batteries in Nigeria. 5KWh to 25KWh LiFePO4. View price list and order online.',
    url: '/products/felicity-solar-batteries',
    images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Felicity Lithium Batteries Nigeria' }],
  },
}, { next: { revalidate: 3600 } });
  const response: IProductsResponse = await res.json();
  if (!response || !response.data) {
    return <p>No products available at the moment.</p>;
  }

  return (
    <main className='font-[family-name:var(--font-inter)]'>

      <Navbar linkClassName="text-grey-800 font-semibold" className='hidden lg:flex bg-white text-black border-b border-grey-100' variant='primary' />

      <section className='flex justify-center flex-col mt-12 lg:mt-0'>
        <div className="flex items-center my-10 flex-row gap-x-1 mx-auto w-[90%] 2xl:w-[75%]">
          <Link href={"/"} className='text-grey-400 flex items-center font-medium text-sm' aria-label='link to homepage'>Home </Link>
          <Link href={"/products"} className='text-grey-400 items-center flex font-medium text-sm' aria-label='link to products page'><ChevronRight color='#98A2B3' size={16} /> Products</Link>
          <span className='text-grey-700 text-sm font-medium flex items-center'><ChevronRight color='#98A2B3' size={16} /> Solar Batteries</span>
        </div>

        <div className="flex flex-col justify-center items-center xl:rounded-xl relative h-56 xl:w-[75%] xl:mx-auto">
          <Image src={"/assets/images/solar_batteries_bg.webp"} alt='felicity solar products' width={1200} height={250} priority className='xl:rounded-xl h-full object-cover' />
          <div className="absolute z-20">
            <h1 className='text-white text-4xl lg:text-5xl font-semibold'>Felicity Solar Batteries</h1>
          </div>
          <div className="overlay absolute top-0 left-0 w-full opacity-70 bg-amber-700 h-full xl:rounded-xl"></div>
        </div>

      </section>
      <section className='py-32 mx-auto w-[90%] 2xl:w-[75%]'>
        <div className=" w-full flex items-center">
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-3 sm:gap-y-14 sm:gap-x-7">
            {response.data && response.data.length > 0 ?
              response.data.map(p => {
                return (
                  <Product
                    details={p}
                    key={p.id}
                    category_path="felicity-solar-batteries"
                  />
                )
              })
              :
              <p>No Product currently available</p>
            }
          </div>


        </div>
      </section>

    </main>
  )
}

export default page