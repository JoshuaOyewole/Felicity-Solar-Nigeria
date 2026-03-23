"use client";

import { fetchArticles, IBlog, IPagination } from '@/app/(admin)/admin/blogs/components/Articles';
import Article from '@/components/ui/article'
import Pagination from '@/components/ui/pagination'
import { generateSlug } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'


function Articles() {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 20;


    const { data, isLoading, isError } = useQuery({
        queryKey: ['articles'],
        queryFn: () => fetchArticles(currentPage, limit)
    })

    const handleChange = (page: number) => {
        setCurrentPage(page)
    }


    if (isLoading) {
        return <div className='flex justify-center  h-screen'>
            <div className="w-full">
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
    if (isError) {
        return <div className='flex h-screen font-semibold text-red-700'>Error loading articles...</div>
    }
    if (!data || !data.data || data.data.length === 0) {
        return <div className='flex  items-center font-bold text-red-700 text-3xl'>No Article found</div>
    }


    const articles: IBlog[] = data.data;
    const pagination: IPagination = data.pagination;

  
    return (
        <React.Fragment>
            <div className="grid gap-y-12 grid-cols-1 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                {
                    articles.length > 0 ? articles.map(b => {
                        return (
                            <Article key={b.id} title={b.title} category={b.category} cover={b.thumbnail} url={`/blog/${generateSlug(String(b.title))}-${b.id}`} />
                        )
                    }
                    ) : <p className='text-grey-700 '>No article currently available</p>
                }
            </div>
            <div className="flex justify-center items-center">
                <Pagination currentPage={currentPage} totalPages={pagination.total_pages} onPageChange={handleChange} />
            </div>
        </ React.Fragment>

    )
}

export default Articles