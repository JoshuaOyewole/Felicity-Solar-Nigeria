'use client';
import React, { useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { AddProductSchema } from '@/lib/schema';
import { ChevronLeft, CloudUpload } from 'lucide-react';
import { ICreateProduct } from '@/lib/types';
import { toast } from 'react-toastify';
import { SimpleEditor } from '@/components/tiptap/editor/simple-editor';
import { useRouter } from 'next/navigation';
//import { FormFieldProps, AddProductFormData } from '@/lib/types';
//import FormField from '@/components/ui/FormField';


type ICategories = {
    id: string,
    category_name: string,
    slug: string,
    created_at: string,
    updated_at: string
}

const fetchCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`);
    const response: { status: number; message: string; data: ICategories[] } = await res.json();
    return response
}

const createProduct = async (variables: ICreateProduct) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
        credentials: "include",
    });

    if (!res.ok) {
        const errorBody = await res.json();

        const error = new Error(errorBody.error || 'An error occurred');
        // Attach custom structured properties
        (error as any).status = res.status;
        (error as any).data = errorBody;
        throw error;
    }

    const response = await res.json();
    return response;
}

type FormSchema = z.infer<typeof AddProductSchema>;


function AddProduct() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef2 = useRef<HTMLInputElement | null>(null);
    const fileInputRef3 = useRef<HTMLInputElement | null>(null);
    const fileInputRef4 = useRef<HTMLInputElement | null>(null);
    //    const [uploading, setUploading] = useState(false);
    const [description, setDescription] = useState("");
    const [keyFeatures, setKeyFeatures] = useState("");
    const router = useRouter();

    //console.log(uploading);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
    } = useForm<FormSchema>({
        resolver: zodResolver(AddProductSchema),
        defaultValues: {
            name: '',
            category: '',
            // description: description,
            price: '',
            discount: '0',
            //keyFeatures: keyFeatures,
            thumbnail1: '',
            thumbnail2: '',
            thumbnail3: '',
            thumbnail4: null,
            videoLink: '',
        }
    });
    const handleKeyFeatures = (content: string) => {
        if (!content) return;
        setKeyFeatures(content);

    }

    const handleDescription = (desc: string) => {
        if (!desc) return;
        setDescription(desc)
    }

    const handleIconClick = (fileInputRef: React.RefObject<HTMLInputElement | null>) => {
        fileInputRef.current?.click(); // triggers the hidden input
    };


    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldValue: "thumbnail1" | "thumbnail2" | "thumbnail3" | "thumbnail4") => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error('Image too large. Maximum allowed file size is 2MB.');
            e.target.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                toast.error(body.error ?? 'Image upload failed.');
                return;
            }
            const data = await res.json();
            setValue(fieldValue, data.url);
        } catch (err) {
            console.error('Image upload failed:', err);
            toast.error('Image upload failed. Please try again.');
        }
    };

    const mutation = useMutation({
        mutationFn: (variables: ICreateProduct) => createProduct(variables)
    })
    const onSubmit: SubmitHandler<FormSchema> = (data) => {

        const payload: ICreateProduct = {
            product_name: data.name,
            category_id: data.category,
            description: description,
            price: data.price,
            total_stock: "1000", // Assuming a default stock value
            key_features: keyFeatures,
            discount_rate: data.discount,
            image_1: data.thumbnail1,
            image_2: data.thumbnail2,
            image_3: data.thumbnail3,
            image_4: data.thumbnail4 || null, // Allowing thumbnail4 to be optional
            video_link: data.videoLink || undefined,
        }
        mutation.mutate(payload, {
            onSuccess(data) {


                toast.success(data.message);
                setDescription("");
                setKeyFeatures("");
                reset();
                router.push("/admin/products")
                // Optionally, you can reset the form or redirect the user

            },
            onError: (error: any) => {
                toast.error(error.message)
                if (error.status === 403) {
                    router.push("/auth/login")
                }

            },
        });
    }
    const categoriesResponse = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })
    if (categoriesResponse.isLoading) {
        return <div className='flex justify-center px-10 py-30  h-screen'>
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


    const categories = categoriesResponse?.data?.data;

    return (
        <div className="flex flex-col gap-y-6  h-[91vh] overflow-y-scroll">
            <button className='font-inter font-semibold mt-4 px-6 flex text-sm items-center cursor-pointer dark:text-grey-800' onClick={() => router.back()}> <ChevronLeft color='#344054' size={18} /> Back</button>
            <div className="flex py-8 px-6 gap-x-6 ">


                <div className="w-[35%] h-[650px] max-h-max px-4 py-6 bg-white rounded-md">
                    <div className="flex gap-x-6 flex-col gap-y-8">
                        <div className={`flex w-full flex-col px-6 ${`${watch("thumbnail1") ? "bg-center bg-contain bg-no-repeat" : ""}`} rounded-md gap-y-4 bg-grey-75 h-[300px] gap-x-6 items-center justify-center`} style={watch("thumbnail1") ? { backgroundImage: `url(${watch("thumbnail1")})` } : {}}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.4 38H9.86274C8.65111 38 8.04529 38 7.76477 37.7604C7.52136 37.5525 7.39218 37.2407 7.4173 36.9215C7.44624 36.5538 7.87462 36.1254 8.73137 35.2686L25.7373 18.2627C26.5293 17.4707 26.9253 17.0747 27.382 16.9263C27.7837 16.7958 28.2163 16.7958 28.618 16.9263C29.0747 17.0747 29.4707 17.4707 30.2627 18.2627L38 26V28.4M28.4 38C31.7603 38 33.4405 38 34.7239 37.346C35.8529 36.7708 36.7708 35.8529 37.346 34.7239C38 33.4405 38 31.7603 38 28.4M28.4 38H11.6C8.23968 38 6.55953 38 5.27606 37.346C4.14708 36.7708 3.2292 35.8529 2.65396 34.7239C2 33.4405 2 31.7603 2 28.4V11.6C2 8.23968 2 6.55953 2.65396 5.27606C3.2292 4.14708 4.14708 3.2292 5.27606 2.65396C6.55953 2 8.23969 2 11.6 2H28.4C31.7603 2 33.4405 2 34.7239 2.65396C35.8529 3.2292 36.7708 4.14708 37.346 5.27606C38 6.55953 38 8.23969 38 11.6V28.4M17 13C17 15.2091 15.2091 17 13 17C10.7909 17 9 15.2091 9 13C9 10.7909 10.7909 9 13 9C15.2091 9 17 10.7909 17 13Z" stroke="#475367" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </div>
                        <div className="flex gap-x-6">
                            <div className={
                                `flex w-full flex-col px-6 rounded-md ${watch("thumbnail2") ? "bg-center bg-contain bg-no-repeat" : ""} gap-y-4 bg-grey-75 h-[110px] gap-x-6 items-center justify-center`
                            }
                                style={watch("thumbnail2") ? { backgroundImage: `url(${watch("thumbnail2")})` } : {}}>
                                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6 25.8174H6.24183C5.43407 25.8174 5.0302 25.8174 4.84318 25.6577C4.6809 25.5191 4.59479 25.3112 4.61153 25.0984C4.63083 24.8532 4.91641 24.5676 5.48758 23.9965L16.8248 12.6592C17.3529 12.1312 17.6169 11.8672 17.9213 11.7683C18.1891 11.6812 18.4776 11.6812 18.7454 11.7683C19.0498 11.8672 19.3138 12.1312 19.8418 12.6592L25 17.8174V19.4174M18.6 25.8174C20.8402 25.8174 21.9603 25.8174 22.816 25.3814C23.5686 24.9979 24.1805 24.386 24.564 23.6333C25 22.7777 25 21.6576 25 19.4174M18.6 25.8174H7.4C5.15979 25.8174 4.03969 25.8174 3.18404 25.3814C2.43139 24.9979 1.81947 24.386 1.43597 23.6333C1 22.7777 1 21.6576 1 19.4174V8.21738C1 5.97717 1 4.85707 1.43597 4.00142C1.81947 3.24877 2.43139 2.63685 3.18404 2.25336C4.03969 1.81738 5.15979 1.81738 7.4 1.81738H18.6C20.8402 1.81738 21.9603 1.81738 22.816 2.25336C23.5686 2.63685 24.1805 3.24877 24.564 4.00142C25 4.85707 25 5.97717 25 8.21738V19.4174M11 9.15072C11 10.6235 9.80609 11.8174 8.33333 11.8174C6.86057 11.8174 5.66667 10.6235 5.66667 9.15072C5.66667 7.67796 6.86057 6.48405 8.33333 6.48405C9.80609 6.48405 11 7.67796 11 9.15072Z" stroke="#475367" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {/* {watch('thumbnail1') && <p className='text-sm font-semibold text-grey-800'>{watch('thumbnail1')}</p>} */}

                            </div>
                            <div className={
                                `flex w-full flex-col px-6 rounded-md ${watch("thumbnail3") ? "bg-center bg-contain bg-no-repeat" : ""} gap-y-4 bg-grey-75 h-[110px] gap-x-6 items-center justify-center`
                            }
                                style={watch("thumbnail3") ? { backgroundImage: `url(${watch("thumbnail3")})` } : {}}>
                                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6 25.8174H6.24183C5.43407 25.8174 5.0302 25.8174 4.84318 25.6577C4.6809 25.5191 4.59479 25.3112 4.61153 25.0984C4.63083 24.8532 4.91641 24.5676 5.48758 23.9965L16.8248 12.6592C17.3529 12.1312 17.6169 11.8672 17.9213 11.7683C18.1891 11.6812 18.4776 11.6812 18.7454 11.7683C19.0498 11.8672 19.3138 12.1312 19.8418 12.6592L25 17.8174V19.4174M18.6 25.8174C20.8402 25.8174 21.9603 25.8174 22.816 25.3814C23.5686 24.9979 24.1805 24.386 24.564 23.6333C25 22.7777 25 21.6576 25 19.4174M18.6 25.8174H7.4C5.15979 25.8174 4.03969 25.8174 3.18404 25.3814C2.43139 24.9979 1.81947 24.386 1.43597 23.6333C1 22.7777 1 21.6576 1 19.4174V8.21738C1 5.97717 1 4.85707 1.43597 4.00142C1.81947 3.24877 2.43139 2.63685 3.18404 2.25336C4.03969 1.81738 5.15979 1.81738 7.4 1.81738H18.6C20.8402 1.81738 21.9603 1.81738 22.816 2.25336C23.5686 2.63685 24.1805 3.24877 24.564 4.00142C25 4.85707 25 5.97717 25 8.21738V19.4174M11 9.15072C11 10.6235 9.80609 11.8174 8.33333 11.8174C6.86057 11.8174 5.66667 10.6235 5.66667 9.15072C5.66667 7.67796 6.86057 6.48405 8.33333 6.48405C9.80609 6.48405 11 7.67796 11 9.15072Z" stroke="#475367" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>


                            </div>
                            <div className={
                                `flex w-full flex-col px-6 rounded-md ${watch("thumbnail4") ? "bg-center bg-contain bg-no-repeat" : ""} gap-y-4 bg-grey-75 h-[110px] gap-x-6 items-center justify-center`
                            }
                                style={watch("thumbnail4") ? { backgroundImage: `url(${watch("thumbnail4")})` } : {}}>
                                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6 25.8174H6.24183C5.43407 25.8174 5.0302 25.8174 4.84318 25.6577C4.6809 25.5191 4.59479 25.3112 4.61153 25.0984C4.63083 24.8532 4.91641 24.5676 5.48758 23.9965L16.8248 12.6592C17.3529 12.1312 17.6169 11.8672 17.9213 11.7683C18.1891 11.6812 18.4776 11.6812 18.7454 11.7683C19.0498 11.8672 19.3138 12.1312 19.8418 12.6592L25 17.8174V19.4174M18.6 25.8174C20.8402 25.8174 21.9603 25.8174 22.816 25.3814C23.5686 24.9979 24.1805 24.386 24.564 23.6333C25 22.7777 25 21.6576 25 19.4174M18.6 25.8174H7.4C5.15979 25.8174 4.03969 25.8174 3.18404 25.3814C2.43139 24.9979 1.81947 24.386 1.43597 23.6333C1 22.7777 1 21.6576 1 19.4174V8.21738C1 5.97717 1 4.85707 1.43597 4.00142C1.81947 3.24877 2.43139 2.63685 3.18404 2.25336C4.03969 1.81738 5.15979 1.81738 7.4 1.81738H18.6C20.8402 1.81738 21.9603 1.81738 22.816 2.25336C23.5686 2.63685 24.1805 3.24877 24.564 4.00142C25 4.85707 25 5.97717 25 8.21738V19.4174M11 9.15072C11 10.6235 9.80609 11.8174 8.33333 11.8174C6.86057 11.8174 5.66667 10.6235 5.66667 9.15072C5.66667 7.67796 6.86057 6.48405 8.33333 6.48405C9.80609 6.48405 11 7.67796 11 9.15072Z" stroke="#475367" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>


                            </div>
                        </div>
                        <div className="flex flex-col gap-y-6">
                            <div className="flex">
                                {watch("price") && <p className='text-base font-semibold dark:text-grey-800'>Price: <span>&#8358;{watch("price")}</span></p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[65%] py-6 px-5 flex flex-col gap-y-8 bg-white rounded-md">
                    <div className="flex flex-col gap-y-6">

                        <h2 className='text-grey-800 font-inter text-base font-semibold'>Add Products</h2>
                        <div className="flex gap-x-3">
                            <div className="flex flex-col w-full">
                                <div
                                    className="flex w-full flex-col px-6 rounded-md gap-y-4 bg-[#FDF0E7] h-[150px] gap-x-6 items-center justify-center cursor-pointer"
                                    onClick={() => handleIconClick(fileInputRef)}
                                >
                                    <CloudUpload size={30} className='dark:text-grey-800' />
                                    <p className="text-sm text-black font-semibold">First Image</p>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={(e) => handleImageUpload(e, "thumbnail1")}
                                        className="hidden"
                                    />
                                </div>
                                {errors.thumbnail1 && <p className="text-red-500 text-sm">{errors.thumbnail1.message}</p>}
                            </div>
                            <div className="flex flex-col w-full">
                                <div
                                    className="flex w-full flex-col px-6 rounded-md gap-y-4 bg-[#FDF0E7] h-[150px] gap-x-6 items-center justify-center cursor-pointer"
                                    onClick={() => handleIconClick(fileInputRef2)}
                                >
                                    <CloudUpload size={30} className='dark:text-grey-800' />
                                    <p className="text-sm text-black font-semibold">Second Image</p>

                                    <input
                                        type="file"
                                        ref={fileInputRef2}
                                        onChange={(e) => handleImageUpload(e, "thumbnail2")}
                                        className="hidden"
                                    />
                                </div>
                                {errors.thumbnail1 && <p className="text-red-500 text-sm">{errors.thumbnail1.message}</p>}
                            </div>
                            <div className="flex flex-col w-full">
                                <div
                                    className="flex w-full flex-col px-6 rounded-md gap-y-4 bg-[#FDF0E7] h-[150px] gap-x-6 items-center justify-center cursor-pointer"
                                    onClick={() => handleIconClick(fileInputRef3)}
                                >
                                    <CloudUpload size={30} className='dark:text-grey-800' />
                                    <p className="text-sm text-black font-semibold">Third Image</p>

                                    <input
                                        type="file"
                                        ref={fileInputRef3}
                                        onChange={(e) => handleImageUpload(e, "thumbnail3")}
                                        className="hidden"
                                    />
                                </div>
                                {errors.thumbnail3 && <p className="text-red-500 text-sm">{errors.thumbnail3.message}</p>}
                            </div>
                            <div className="flex flex-col w-full">
                                <div
                                    className="flex w-full flex-col px-6 rounded-md gap-y-4 bg-[#FDF0E7] h-[150px] gap-x-6 items-center justify-center cursor-pointer"
                                    onClick={() => handleIconClick(fileInputRef4)}
                                >
                                    <CloudUpload size={30} className='dark:text-grey-800' />
                                    <p className="text-sm text-black font-semibold">Fourth Image</p>

                                    <input
                                        type="file"
                                        ref={fileInputRef4}
                                        onChange={(e) => handleImageUpload(e, "thumbnail4")}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-grey-900">Product Name</label>

                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="w-full border rounded-md h-11 dark:text-grey-900 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                                    {...register('name')}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-grey-900">Product Category</label>
                                <select
                                    className="w-full border dark:text-grey-900 rounded-md h-11 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                                    {...register('category')}
                                >
                                    <option value={""} className='dark:text-grey-900'>Select category</option>
                                    {
                                        categories && categories?.length > 0 && categories.map(c => {
                                            return <option className='text-sm font-inter dark:text-grey-900' key={c?.id} value={c?.id}>{c?.category_name}</option>
                                        })
                                    }
                                </select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                            </div>
                        </div>

                        <div className="mb-4 h-max">
                            <label className="block text-sm font-medium mb-1 dark:text-grey-900">Product Description</label>
                            {/*  <textarea
                            rows={4}
                            placeholder="Enter product description"
                            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:border-none focus:ring-primary resize-none"
                            {...register('description')}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>} */}
                            <SimpleEditor styles='min-h-[400px] dark:text-grey-900' content={description} handleChange={handleDescription} />
                            {/* {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>} */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-grey-900">Price</label>
                                <div className="flex items-center border rounded-md px-3 py-2">
                                    <span className="mr-2 text-gray-500 dark:text-grey-900">₦</span>
                                    <input
                                        type="number"
                                        className="w-full focus:outline-none text-sm dark:text-grey-900"
                                        {...register('price')}
                                    />
                                </div>
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-grey-900">Discount</label>
                                <div className="flex items-center border rounded-md px-3 py-2">
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder="Enter discount (optional)"
                                        className="w-full focus:outline-none text-sm dark:text-grey-900"
                                        {...register('discount')}
                                    />
                                    <span className="ml-2 text-gray-500">%</span>
                                </div>
                                {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
                            </div>

                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 dark:text-grey-900">Key Features</label>
                            <SimpleEditor styles='min-h-[250px] dark:text-grey-800' content={keyFeatures} handleChange={handleKeyFeatures} />
                            {/* {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>} */}
                            {/*  <textarea
                            rows={4}
                            placeholder="Enter product key features"
                            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:border-none focus:ring-primary resize-none"
                            {...register('keyFeatures')}
                        /> */}
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 dark:text-grey-900">Product Video (YouTube Link)</label>
                            <input
                                type="url"
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full border rounded-md h-11 dark:text-grey-900 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                                {...register('videoLink')}
                            />
                            <p className="text-xs text-gray-500 mt-1">Optional: Add a YouTube video link to showcase this product</p>
                            {errors.videoLink && <p className="text-red-500 text-sm">{errors.videoLink.message}</p>}
                        </div>
                        <div className="flex justify-start gap-4">
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-6 py-2 rounded-md"
                            >
                                {mutation.isPending ? "submiting" : "Done"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    )
}

export default AddProduct

