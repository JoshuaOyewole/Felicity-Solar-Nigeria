import Navbar from '@/components/layouts/navbar/Navbar'
import Image from 'next/image'
import React from 'react'
import type { Metadata } from 'next'
import Project from '@/components/ui/project'
import { capitalizeFirstLetter } from '@/lib/constants'
//


export type IProjects = {
  content: string,
  created_at?: string,
  id: number | string,
  projectState: string,
  state_logo: string,
  state_name: string,
  thumbnail: string
  title: string,
  updated_at?: string
}
export type IError = {
  status: string,
  error: string
}

type Props = {
  params: Promise<{ state: string }>
}

const getStateProjects = async (
  stateId: string
): Promise<{ data?: IProjects[]; status: number; error?: string }> => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/project_showcases/state/${stateId}`)
    .then(response => response.json())
    .then((resp: { data?: IProjects[]; status: number | string; message?: string; error?: string }) => {
      const status = typeof resp.status === 'string' ? parseInt(resp.status) : resp.status;

      if (status !== 200) {
        return { status, error: resp.error || resp.message || 'Unknown error' };
      }

      return { status, data: resp.data };
    })
    .catch(error => {
      return { status: 500, error: 'Network or parsing error: ' + error.message };
    });
};


export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const stateId = (await params).state;

  let state: IProjects[] = [{
    state_name: "",
    state_logo: "",
    id: "",
    content: "",
    thumbnail: "",
    title: "",
    projectState: "",

  }];

  const res = await getStateProjects(stateId);

  if (res.status == 200) {
    state = res.data ?? [];
  }

  return {
    title: capitalizeFirstLetter(state[0].state_name) + ' Projects',
    description: 'Explore our projects in ' + state[0].state_name,
    twitter: {
      card: 'summary_large_image',
      title: capitalizeFirstLetter(state[0].state_name) + ' Projects',
      description: 'Explore our projects in ' + capitalizeFirstLetter(state[0].state_name),
      images: [state[0].state_logo]
    }
  }
}

async function Page({ params }: { params: Promise<{ stateId: string }> }) {
  const stateId = (await params).stateId;

  const res = await getStateProjects(stateId);
  const states = res.data ?? [];


  return (
    <main className='font-[family-name:var(--font-inter)]'>

      <Navbar linkClassName="text-grey-800 font-semibold" className='hidden lg:flex bg-white text-black border-b border-grey-100' variant='primary' />

      <section className='flex justify-center py-12 flex-col mt-6 lg:mt-0'>
        <div className="flex flex-col justify-center items-center xl:rounded-xl relative h-56 xl:w-[75%] xl:mx-auto mx-auto w-full 2xl:w-[75%]">
          <Image src={"/assets/images/solar_street_light.jpg"} alt='felicity solar products' width={1200} height={250} className='xl:rounded-xl h-full  object-fit' />
          <div className="absolute z-20">
            {states.length > 0 ? <h1 className='text-white text-4xl lg:text-5xl  font-semibold'>{capitalizeFirstLetter(states[0].state_name)} Projects Showcase</h1> : <h1 className='text-white text-4xl lg:text-5xl  font-semibold'>Projects Showcase</h1>}
          </div>
          <div className="overlay absolute top-0 left-0 w-full opacity-70 bg-amber-700 h-full xl:rounded-xl"></div>
        </div>
      </section>

      <section className='flex justify-center my-22 flex-col mx-auto w-[90%] 2xl:w-[75%]'>
        <div className="grid gap-x-9 gap-y-20 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {
            states.length > 0 ?
              states.map(state => {
                return <Project
                  key={state.id}
                  data={state}
                />
              })
              :
              <h2 className='font-inter text-red-600 ml-4 font-medium'>No project currently available</h2>
          }

        </div>

      </section>
    </main>
  )
}

export default Page