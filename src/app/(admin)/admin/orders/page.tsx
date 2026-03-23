import { capitalizeFirstLetterOfEachWord } from '@/lib/constants'
import { format } from 'date-fns'
import { Metadata } from 'next'
import React from 'react'

export type IOrder = {
    "id": number,
    "product_name": string,
    "email": string,
    "phone": string,
    "fullnames": string,
    "additionalMessage": string,
    "qty": number,
    "created_at": string
};

export const metadata: Metadata = {
    title: 'Orders Listing - Felicity Solar',
    description: 'We have the best Solar products in town. Hybrid inverter, MPPT controller, Solar lithium battery, Gel battery, Solar all in one street light',
}

async function index() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders`, {
        next: { revalidate: 60 },
        credentials: "include"
    });
    const response: {
        data: IOrder[],
        message: string,
        status: number
    } = await res.json();


    if (!response || !response.data) {
        return <p>An error occured.</p>;
    }

    const new_orders = response.data;


    return (
        <div className='h-full flex flex-col'>
            <header className="hidden md:flex min-h-16 h-[7vh] bg-white py-8 border border-[#F0F2F5] justify-start px-6 items-center text-grey-800 font-bold text-2xl">
                Orders Listing
            </header>
            <div className="flex-1 overflow-y-auto py-8 px-4 sm:px-6 flex flex-col gap-y-12">
                <div className="flex justify-between items-center w-full">
                    <h2 className='text-grey-800 font-inter text-base font-semibold'>All Orders</h2>

                </div>

                {new_orders.length > 0 ?
                    <div className="flex flex-col gap-y-8 h-full w-full  bg-white rounded-md">
                        <div className="relative overflow-y-scroll appearance-none  shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className=" text-gray-700 uppercase bg-grey-100 dark:bg-gray-700 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 ">Product Name</th>
                                        <th scope="col" className="px-6 py-3">Full Names</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Phone</th>
                                        <th scope="col" className="px-6 py-3">Qty</th>
                                        <th scope="col" className="px-6 py-3">Message</th>
                                        <th scope="col" className="px-6 py-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {new_orders.map((order) => (
                                        <tr key={order.id} className="bg-white border-b dark:text-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-4">{capitalizeFirstLetterOfEachWord(order.product_name)}</td>
                                            <td className="px-4 py-4">{capitalizeFirstLetterOfEachWord(order.fullnames)}</td>
                                            <td className="px-4 py-4">{order.email}</td>
                                            <td className="px-4 py-4">{order.phone}</td>
                                            <td className="px-4 py-4">{order.qty}</td>
                                            <td className="px-4 py-4">{order.additionalMessage || 'N/A'}</td>
                                            <td className="px-4 py-4">{format(new Date(order.created_at), 'dd MMM yyyy')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>
                    :
                    <p className='flex justify-center items-center h-full dark:text-red-800 text-lg font-medium italic'>No new orders</p>
                }
            </div>
        </div>
    )
}

export default index;


