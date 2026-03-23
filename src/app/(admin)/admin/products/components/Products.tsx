"use client";
import React, { useState } from 'react';
//import { Delete, DeleteIcon, Trash, Trash2 } from 'lucide-react'
import { IProductsResponse } from '@/app/(main)/products/page';
import { useQuery } from '@tanstack/react-query';
import { capitalizeFirstLetterOfEachWord, getActualPrice } from '@/lib/constants';
import { SquarePen } from 'lucide-react';
import { format } from 'date-fns';
import DeleteProduct from './DeleteProduct';
import Link from 'next/link';
import Pagination from '@/components/ui/pagination';

export const fetchProduts = async (page: number, limit: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products?page=${page}&limit=${limit}`);
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    const response: IProductsResponse = await res.json();
    return response;
}



function Products() {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 20;


    const query = useQuery({
        queryKey: ['products', currentPage],
        queryFn: () => fetchProduts(currentPage, limit)
    })
    const handleChange = (page: number) => {
        setCurrentPage(page)
    }
    const { data, isLoading, isError } = query;

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
        return <div className='flex h-screen font-semibold text-red-700'>Error loading products...</div>
    }
    if (!data || !data.data || data.data.length === 0) {
        return <div className='flex justify-center items-center h-screen dark:text-red-600 font-semibold text-lg'>No products found</div>
    }
    const products: IProductsResponse = data;

    return (
        <div className="relative shadow-md sm:rounded-lg pb-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className=" text-gray-700 bg-grey-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4 text-base">
                            {/*  <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div> */}
                            Product Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-base">
                            Date Added
                        </th>
                        <th scope="col" className="px-6 py-3 text-base">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-base">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-base">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.data.map(p => {
                        return <tr key={p.id}>
                            <td className="font-inter p-5 text-sm lg:text-base leading-6 font-medium text-gray-900 break-words"> {p.product_name}</td>
                            <td className="font-inter p-5 whitespace-nowrap text-sm lg:text-base leading-6 font-medium text-gray-900 ">{format(new Date(p.created_at), "do MMM, yyyy h:mmaaa")}</td>
                            <td className="font-inter p-5 whitespace-nowrap text-sm lg:text-base leading-6 font-medium text-gray-900"> {capitalizeFirstLetterOfEachWord(p.category_name)} </td>
                            <td className="font-inter p-5 whitespace-nowrap text-sm lg:text-base leading-6 font-medium text-gray-900">
                                {/*  &#8358;{Number(p?.price).toLocaleString()} */}

                                &#8358;{Number(getActualPrice(p?.price, p?.discount_rate)).toLocaleString()}
                            </td>
                            <td className="font-inter p-5 whitespace-nowrap text-sm lg:text-base leading-6 font-medium text-gray-900 ">
                                <div className="flex gap-x-6 items-center">
                                    <Link href={`/admin/products/edit/${p.id}`}>
                                        <SquarePen size={20} color='#00102e' />
                                    </Link>
                                    <DeleteProduct id={p.id} />
                                </div>


                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <Pagination totalPages={products.pagination.total_pages} currentPage={currentPage} onPageChange={handleChange} />
        </div>
    )
}

export default Products