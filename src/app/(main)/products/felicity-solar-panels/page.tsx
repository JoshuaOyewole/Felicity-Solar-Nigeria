import Navbar from '@/components/layouts/navbar/Navbar'
import Product from '@/components/ui/product'
import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
//import React from 'react'
import { IProductsResponse } from '../page'

//

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Felicity Solar Panels Nigeria | Buy Mono & Poly Panels Online',
  description: 'Felicity solar panels in Nigeria — monocrystalline and polycrystalline options for homes and businesses. Compare panel specs and prices. Order genuine Felicity panels online.',
  keywords: ['felicity solar panels', 'felicity solar panel price in nigeria', 'solar panel nigeria', 'monocrystalline solar panel nigeria', 'felicity solar panel'],
  openGraph: {
    title: 'Felicity Solar Panels Nigeria',
    description: 'Buy genuine Felicity solar panels in Nigeria. Mono and poly options for homes and businesses. Best prices.',
    url: '/products/felicity-solar-panels',
    images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Felicity Solar Panels Nigeria' }],
  },
}

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products/category/1`, { next: { revalidate: 3600 } });
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
          <span className='text-grey-700 text-sm font-medium flex items-center'><ChevronRight color='#98A2B3' size={16} /> Solar Panels</span>
        </div>

        <div className="flex flex-col justify-center items-center xl:rounded-xl relative h-56 xl:w-[75%] xl:mx-auto">
          <Image src={"/assets/images/solar_panels_bg.webp"} alt='felicity solar products' width={1200} height={250} priority className='xl:rounded-xl h-full object-cover' />
          <div className="absolute z-20">
            <h1 className='text-white text-4xl lg:text-5xl font-semibold'>Solar Panel</h1>
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
                    category_path="felicity-solar-panels"
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