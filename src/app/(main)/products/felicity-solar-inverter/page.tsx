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
  title: 'Felicity Hybrid Inverters Nigeria | 3KVA, 6KVA, 8KVA, 10KVA Price List',
  description: 'Felicity hybrid inverters in Nigeria — 3KVA, 6KVA, 8KVA and 10KVA models. Best inverter prices with warranty. Compare specs and order online or find a dealer near you.',
  keywords: ['felicity inverter', 'felicity hybrid inverter', 'felicity solar inverter', 'felicity inverter price in nigeria', '3kva felicity hybrid inverter', '6kva felicity inverter', '8kva felicity inverter', '10kva felicity inverter price in nigeria', 'felicity 8kva hybrid inverter', 'felicity 6kva hybrid inverter'],
  openGraph: {
    title: 'Felicity Hybrid Inverters Nigeria | 3KVA to 10KVA',
    description: 'Buy Felicity hybrid inverters in Nigeria. 3KVA, 6KVA, 8KVA and 10KVA models with warranty. Best inverter prices.',
    url: '/products/felicity-solar-inverter',
    images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Felicity Hybrid Inverters Nigeria' }],
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
          <Link href={"/products"} className='text-grey-400 font-medium text-sm' aria-label='link to products'>Products </Link>
          <span className='text-grey-700 text-sm font-medium flex items-center'><ChevronRight color='#98A2B3' size={16} /> Inverters</span>
        </div>

        <div className="flex flex-col justify-center items-center xl:rounded-xl relative h-56 xl:w-[75%] xl:mx-auto">
          <Image src={"/assets/images/solar_batteries_bg2.webp"} alt='felicity solar products' width={1200} height={250} priority className='xl:rounded-xl h-full object-repeat object-cover' />
          <div className="absolute z-20">
            <h1 className='text-white text-4xl lg:text-5xl font-semibold'>Felicity Solar Inverters</h1>
          </div>
          <div className="overlay absolute top-0 left-0 w-full opacity-70 bg-amber-700 h-full xl:rounded-xl"></div>
        </div>

      </section>
      <section className='py-32 mx-auto w-[90%] 2xl:w-[75%]'>
        <div className=" w-full flex items-center ">
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