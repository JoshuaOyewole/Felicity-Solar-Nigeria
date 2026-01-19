import Navbar from '@/components/layouts/navbar/Navbar'
import Products from '@/components/ui/Products'
import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type IProduct = {
  id: string,
  product_name: string,
  price: string,
  manual?: string,
  discount_rate: string,
  category_name: string,
  image_1: string,
  image_2: string,
  image_3: string,
  image_4: string,
  image_5: string,
  key_features: string,
  description: string,
  video_link?: string,
  created_at: string,
}
export type IProductsResponse = {
  data: IProduct[],
  message: string,
  status: number
  pagination: {
    current_page: number, total_pages: number, total_rows: number
  }
}

export type IProductResponse = {
  data: IProduct,
  message: string,
  status: number
}


export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Products - Felicity Solar',
  description: 'We have the best Solar products in town. Hybrid inverter, MPPT controller, Solar lithium battery, Gel battery, Solar all in one street light',
}

async function page() {

  return (
    <main className='font-inter'>

      <Navbar linkClassName="text-grey-800 font-semibold" className='hidden lg:flex bg-white text-black border-b border-grey-100' variant='primary' />

      <section className='flex justify-center flex-col mt-12 lg:mt-0 '>
        <div className="flex">
          <div className="flex items-center my-10 flex-row gap-x-1 px-4 lg:px-0 mx-auto w-full 2xl:w-[75%]">
            <Link href={"/"} className='text-grey-400 font-medium text-sm' aria-label='link to homepage'>Home </Link>
            <span className='text-grey-700 text-sm font-medium flex items-center'><ChevronRight color='#98A2B3' size={16} /> Products</span>
          </div>
        </div>


        <div className="flex flex-col justify-center items-center xl:rounded-xl relative h-56 xl:w-[75%] xl:mx-auto">
          <Image src={"/assets/images/solar_street_light.jpg"} alt='felicity solar products' width={1200} height={250} className='xl:rounded-xl h-full  object-fit' />
          <div className="absolute z-20">
            <h1 className='text-white text-4xl lg:text-5xl font-semibold'>Our Products</h1>
          </div>
          <div className="overlay absolute top-0 left-0 w-full opacity-70 bg-amber-700 h-full xl:rounded-xl "></div>
        </div>

      </section>
      <section className='py-32 mx-auto w-[90%] 2xl:w-[75%]'>
        <div className=" w-full flex items-center">

          <Products />
        </div>
      </section>

    </main>
  )
}

export default page

