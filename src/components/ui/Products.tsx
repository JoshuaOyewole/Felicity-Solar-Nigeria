"use client";
import  { useState } from 'react'
import { fetchProduts } from '@/app/(admin)/admin/products/components/Products';
import { useQuery } from '@tanstack/react-query';

import Product from './product';
import Pagination from './pagination';


function Products() {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 20;


    const query = useQuery({
        queryKey: ['products', currentPage],
        queryFn: () => fetchProduts(currentPage, limit),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev,
    })
    const handleChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (query.isLoading) {
        return (
            <div className="flex flex-col gap-y-6 w-full">
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-3 sm:gap-y-14 sm:gap-x-7">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="w-full sm:min-h-[517px] sm:min-w-[264px] max-w-[396px] animate-pulse">
                            <div className="aspect-square w-full rounded-lg bg-gray-200"></div>
                            <div className="mt-4 h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="mt-2 h-5 bg-gray-200 rounded w-1/2 mx-auto"></div>
                            <div className="mt-4 h-8 bg-gray-200 rounded w-24 mx-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    if (query.isError) {
        return <div className='flex h-screen font-semibold text-red-700'>Error loading products...</div>
    }
    const products = query.data?.data ?? [];
    const pagination = query.data?.pagination;


    if (products.length === 0) {
        return <p className='text-lg font-medium'>No Product currently available</p>
    }

    return (
        <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-3 sm:gap-y-14 sm:gap-x-7">
                {
                    products.map(p => {
                        return (
                            <Product
                                details={p}
                                key={p.id}
                                category_path=""
                            />

                        )
                    })
                }
            </div>


            <Pagination totalPages={pagination?.total_pages ?? 0} currentPage={currentPage} onPageChange={handleChange} />
        </div>

    )


}

export default Products