import Navbar from '@/components/layouts/navbar/Navbar'
import Articles from '@/components/sections/articles/articles'
import { Metadata } from 'next'


//

export const metadata: Metadata = {
    title: 'Solar Energy Blog | Tips, Guides & News — Felicity Solar',
    description: 'Felicity Solar Nigeria blog — inverter guides, battery price updates, solar installation tips and energy news for Nigerian homes and businesses.',
    keywords: ['felicity solar blog', 'solar energy nigeria', 'solar inverter guide nigeria', 'felicity solar news', 'solar battery guide nigeria'],
    openGraph: {
      title: 'Felicity Solar Blog | Solar Tips & News Nigeria',
      description: 'Solar guides, battery price updates, installation tips and energy news from Felicity Solar Nigeria.',
      url: '/blog',
      images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'Felicity Solar Blog' }],
    },
}

function index() {

    return (
        <main className='font-inter  overflow-y-hidden'>

            <Navbar linkClassName="text-grey-800 font-semibold" className='hidden lg:flex bg-white text-black border-b border-grey-100' variant='primary' />
            <section className='flex flex-col pt-32 pb-8 lg:pb-18 custom-gradient'>
                <div className="flex mx-auto w-[90%] flex-col gap-y-8 2xl:w-[75%]">
                    <h1 className=' text-3xl lg:text-6xl font-semibold md:leading-13 lg:leading-16  md:text-5xl '>Insights, Innovations & Impact from Felicity Solar</h1>
                    <p className=' lg:text-lg text-grey-800 font-medium'>Stay informed with the latest updates from Felicity Solar. <span className='hidden xl:inline'>Discover solar industry news, expert tips, new product launches, success stories, and events shaping the future of clean energy in Africa and beyond.</span></p>
                </div>
            </section>
            <section className='flex flex-col gap-y-32 pt-14 pb-22 lg:py-32 mx-auto w-[90%] 2xl:w-[75%] md:gap-x-8 lg:gap-x-26'>
                <Articles />
            </section>

        </main>
    )
}

export default index