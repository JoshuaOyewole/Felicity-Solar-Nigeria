"use client";
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import Project from '@/components/ui/project'
import Pagination from '@/components/ui/pagination'
import { IPagination } from '@/app/(admin)/admin/blogs/components/Articles'
import { IProjects } from '../state/[stateId]/page';


type IResponse = {
    data: IProjects[],
    message: string,
    status: number,
    pagination: IPagination

}
const fetchProjects = async (payload: { page: string | number, limit: string | number }): Promise<IResponse> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/project_showcases?page=${payload.page}&limit=${payload.limit}`, {
            //cache: 'no-store'// Revalidate every hour
            next: { revalidate: 3600 },
        });
        const response: IResponse = await res.json();
        return response;
    } catch (error) {
        throw error;
    }
}

function Projects() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const { isLoading, data } = useQuery({
        queryKey: ["get-projects"],
        queryFn: () => fetchProjects({ page: currentPage, limit })
    })

    if (isLoading) {
        return <div className='flex justify-center  h-screen'>
            <div className="w-[70%] mx-auto">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] w-full mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] w-full"></div>

                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] w-full mb-4 mt-8"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] w-full"></div>
            </div>
        </div>
    }

    const handleChange = (page: number) => {
        setCurrentPage(page)
    }
    const projects = data?.data ?? [];
    const pagination = data?.pagination

    return (
        <>
            <section className='flex justify-center my-22 gap-y-20  flex-col gap mx-auto w-[90%] 2xl:w-[75%]'>
                <div className="grid gap-x-9 gap-y-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {projects.length > 0 ?

                        projects?.map(p => {
                            return <Project key={p.id} data={p} />
                        })
                        :
                        <p className='font-inter text-base text-red-600'>No Project Showcases available</p>
                    }

                    {/* 
          <Project state="kano" id={"50K System Installed at Felicity Solar's New Plant"} />
        */}

                </div>
                <Pagination onPageChange={handleChange} currentPage={currentPage} totalPages={pagination?.total_pages ?? 0} />
            </section>


        </>

    )
}

export default Projects