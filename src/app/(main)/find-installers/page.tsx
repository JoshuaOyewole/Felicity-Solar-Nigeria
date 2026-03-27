export const dynamic = "force-dynamic";
import InstallersFilter from '@/components/InstallerFilter'
import Navbar from '@/components/layouts/navbar/Navbar'
import Goback from '@/components/ui/go-back'
import InstallerCard from '@/components/ui/InstallerCard'
import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
//import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
//import { toast } from 'react-toastify'

/* interface PageProps {
  searchParams?: { stateId?: string };
} */

export type Iinstaller = {
  id: string,
  fullnames: string,
  email: string,
  phone: string,
  state_name: string,
  address: string,
  created_at: string,
}

export type IinstallersResponse = {
  data: Iinstaller[],
  message: string,
  status: number
}
/* async function fetchInstallers(stateId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/installers/${stateId}`);
    if (!res.ok) throw new Error('Failed to fetch installers');
    return await res.json();
  } catch (error) {
    console.error(error);
  }

} */

export const metadata: Metadata = {
  title: 'Find Felicity Solar Dealers & Installers | Nigeria',
  description: 'Find certified Felicity Solar dealers and installers in your state — Lagos, Abuja, Port Harcourt and across Nigeria. Get professional solar installation near you.',
  keywords: ['felicity solar abuja', 'felicity solar dealers nigeria', 'felicity solar installer nigeria', 'felicity solar distributor', 'find solar installer nigeria'],
  openGraph: {
    title: 'Find Felicity Solar Dealers & Installers Nigeria',
    description: 'Locate certified Felicity Solar dealers and installers in Lagos, Abuja, Port Harcourt and across Nigeria.',
    url: '/find-installers',
    images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Felicity Solar Installers Nigeria' }],
  },
}

async function Page({ searchParams }: { searchParams: Promise<{ stateId: number | string }> }) {
  //const stateId = (await searchParams)?.stateId ?? "";
  const { stateId = "" } = await searchParams;

  let installers: IinstallersResponse["data"] = [];
  let errorMessage = "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/installers/${stateId}`, {
      next: { revalidate: 3600 },
      //cache: "no-store", // Ensures fresh data each time
    });

    if (!res.ok) {
      throw new Error(`API error! Status: ${res.status}`);
    }

    const data: IinstallersResponse = await res.json();
    installers = data.data;

  } catch (error) {
    console.error("Failed to fetch installers:", error);
    errorMessage = "We couldn’t find any installers for the selected state. Please check your selection and try again.";
  }

  //Handling error


  return (
    <main className='font-[family-name:var(--font-inter)]'>

      <Navbar linkClassName="text-grey-800 font-semibold" className='hidden lg:flex bg-white text-black border-b border-grey-100' variant='primary' />

      <section className='flex flex-col lg:flex-row pt-12 mx-auto w-[90%] 2xl:w-[75%] md:gap-x-8 lg:gap-x-26 gap-y-10 lg:gap-y-0'>
        <div className="flex lg:hidden my-10 ">
          <Goback />
        </div>
        <div className=" items-center flex-row gap-x-1 hidden lg:flex">
          <Link href={"/"} className='text-grey-400 items-center flex font-medium text-sm' aria-label='link to homepage'> Homepage</Link>
          <p className='text-grey-700 items-center flex font-medium text-sm' aria-label='link to products page'><ChevronRight color='#98A2B3' size={16} />Installers</p>
        </div>

      </section>
      <header className='mb-2 lg:mb-20'>
        <h2 className=' text-grey-900 text-4xl font-bold text-center'>Certified Installers </h2>
      </header>
      {
        errorMessage ?
          <main className="grid min-h-full place-items-center bg-white px-6 py-2 sm:py-4 lg:px-8 lg:mb-20">
            <InstallersFilter defaultValue={stateId} />
            <div className="text-center">
              {/*     <p className="text-base font-semibold text-indigo-600">404</p> */}
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">No Installers Found</h1>
              <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{errorMessage}</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/find-installers" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">All Installers</Link>

              </div>
            </div>
          </main>
          :
          <>
            <InstallersFilter defaultValue={stateId} />

            <section className='grid gap-y-10 lg:gap-y-20 grid-cols-1 md:grid-cols-3 gap-x-10 pt-8 pb-22 mx-auto w-[95%] sm:w-[90%] 2xl:w-[80%]'>
              {
                installers.length > 0 ? installers.map(d => {
                  return (
                    <InstallerCard d={d} key={d?.id} />
                  )
                }) :
                  <p className='font-inter text-base text-red-600 font-medium'>No Installer found!</p>
              }
            </section>
          </>

      }


    </main>
  )
}

export default Page