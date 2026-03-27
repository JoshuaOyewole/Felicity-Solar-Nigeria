//import { Metadata } from 'next';
import Navbar from '@/components/layouts/navbar/Navbar'
import ProductImageGallery from '@/components/layouts/product_image_gallery'
import RatingStar from '@/components/layouts/rating-star'
import VideoWidget from '@/components/ui/VideoWidget'
import { ChevronLeft, ChevronRight, DownloadCloudIcon } from 'lucide-react'
import Link from 'next/link'
//import React from 'react'
import { getActualPrice, getProductId } from '@/lib/constants'
import { Metadata } from 'next'
import { IProduct } from '../../page'
import ProcessOrder from '@/components/ui/processOrder'
import GA4Tracker from '@/utils/G4Tracker'


type Props = {
    params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const slug = (await params).slug;

    const id = getProductId(slug) ?? "";

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products/${id}`, {
            next: { revalidate: 3600 }, // Optional: revalidate every 60s
        });

        if (!res.ok) {
            throw new Error("Failed to fetch product");
        }

        const data: {
            data: IProduct;
            message: string;
            status: number;
        } = await res.json();

        const product = data.data;

        return {
            title: `${product.product_name} | Felicity Solar`,
            description: product.description.slice(0, 160), // Shorten description for SEO
            openGraph: {
                images: [product.image_1],
            },
        };
    } catch (error) {
        console.error(error);

        return {
            title: "Product Not Found | Felicity Solar",
            description: "We couldn't find this product. Browse our catalog for more solar solutions.",
        };
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    // Fetch product details from the API
    const id = getProductId(slug) ?? "";
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products/${id}`, {
        next: { revalidate: 3600 } // Revalidate every hour
    });
    const response: {
        data: IProduct,
        message: string,
        status: number
    } = await res.json();
    if (!response || !response.data) {
        return <p>An error occured.</p>;
    }
    const product = response.data;

    return (
        <main className='font-[family-name:var(--font-inter)]'>
            <Navbar linkClassName="text-grey-800 font-semibold" className='hidden lg:flex bg-white text-black border-b border-grey-100' variant='primary' />
            {/* GA4 tracking */}
            <GA4Tracker product={{
                id: product.id,
                product_name: product.product_name,
                category_name: product.category_name,
                price: Number(product.price)
            }} />

            <section className='flex justify-center flex-col mt-12 lg:mt-0 w-[90%] 2xl:w-[75%] mx-auto'>
                <div className="flex lg:hidden my-10 ">
                    <Link href={"/products"} className='text-grey-400 items-center flex font-medium text-sm' aria-label='link to products page'><ChevronLeft color='#98A2B3' size={16} /> Go back</Link>
                </div>
                <div className=" items-center my-10 flex-row gap-x-1 hidden lg:flex">
                    <Link href={"/products"} className='text-grey-400 items-center flex font-medium text-sm' aria-label='link to products page'> Products</Link>
                    <Link href={"/products/felicity-solar-street-light"} className='text-grey-400 items-center flex font-medium text-sm' aria-label='link to products page'> <ChevronRight color='#98A2B3' size={16} />Solar Street Lights</Link>

                    <span className='text-grey-700 text-sm font-medium flex items-center'><ChevronRight color='#98A2B3' size={16} />{product?.product_name}</span>
                </div>


                <div className="container mx-auto py-8">
                    <div className="flex gap-x-10 flex-col md:flex-row">

                        <ProductImageGallery
                            cover={product?.image_1}
                            img2={product?.image_2}
                            img3={product?.image_3}
                            img4={product?.image_4}
                        />


                        <div className="w-full md:w-1/2 md;px-4">
                            <h2 className="text-3xl font-bold mb-2">{product?.product_name}</h2>
                            <p className="text-gray-600 mb-4">Category: <span className='bg-grey-100 rounded-sm py-1 px-2'>{product.category_name}</span></p>
                            <div className="mb-4">
                                <span className="text-2xl font-bold mr-2">&#8358;{getActualPrice(product.price, product.discount_rate).toLocaleString()}</span>
                                {/* product?.category_name */}
                                <span className="text-gray-500 line-through">&#8358;{Number(product?.price).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <RatingStar />
                                <RatingStar />
                                <RatingStar />
                                <RatingStar />
                                <RatingStar />
                                <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
                            </div>
                            {/*  <p className="text-gray-700 mb-6">Experience premium sound quality and industry-leading noise cancellation
                                with
                                these wireless headphones. Perfect for music lovers and frequent travelers.
                            </p> */}


                            {/* 
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                                <div className="flex space-x-2">
                                    <button
                                        className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                                    <button
                                        className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                                    <button
                                        className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                                </div>
                            </div>

                          
                            //Quantity
                            <div className="mb-6">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                                <input type="number" id="quantity" name="quantity" min="1" value="1"
                                    className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            </div> 
                            */}

                            <div className="flex space-x-4 mb-6 mt-10 flex-col gap-y-6">
                                <ProcessOrder productName={product?.product_name ?? ""} productId={product?.id ?? ""} />
                                <div className="w-full">
                                    <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                                    <div className='keyFeatures-container flex flex-col gap-y-4' dangerouslySetInnerHTML={{ __html: product?.key_features }} />
                                </div>


                                {product?.manual &&
                                    <Link href={product?.manual} className='flex items-center justify-center border rounded-full border-primary px-4 font-inter font-medium text-primary hover:bg-primary hover:text-white transition-all hover:cursor-pointer h-11 w-[190px]'>
                                        <DownloadCloudIcon className='mr-2' /> Product Manual
                                    </Link>
                                }
                                {/*   <button
                                    className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    Wishlist
                                </button> */}
                            </div>


                        </div>
                    </div>
                    <div className='w-full'>

                        <div className="flex produt_description mt-10 flex-col">
                            <h3 className="text-lg font-semibold mb-2">Description:</h3>

                            <div className='flex flex-col gap-y-4' dangerouslySetInnerHTML={{ __html: product?.description }} />
                        </div>

                        {/* Product Video Section */}
                        {product?.video_link && (
                            <div className="mt-10">
                                <VideoWidget 
                                    videoUrl={product.video_link}
                                    title={`${product.product_name} - Product Demo`}
                                    className="max-w-4xl"
                                />
                            </div>
                        )}

                    </div>
                </div>
            </section>

        </main >
    )
}
