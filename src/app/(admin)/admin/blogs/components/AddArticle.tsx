'use client';
import React, { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { AddBlogSchema } from '@/lib/schema';
import { ChevronLeft, CloudUpload } from 'lucide-react';
import { toast } from 'react-toastify';
import { SimpleEditor } from '@/components/tiptap/editor/simple-editor';
import { useRouter } from 'next/navigation';
//import { cn } from '@/lib/constants';
//import { FormFieldProps, AddProductFormData } from '@/lib/types';
//import FormField from '@/components/ui/FormField';


const createArticle = async (formData: FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blogs`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Failed to create blog');
    }

    const response = await res.json();
    return response;
}

type FormSchema = z.infer<typeof AddBlogSchema>;


function AddArticle() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [content, setContent] = useState("");
    const [filename, setFileName] = useState("");
    const router = useRouter();

    //console.log(uploading);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormSchema>({
        resolver: zodResolver(AddBlogSchema),
        defaultValues: {
            title: '',
            category: '',
        }
    });

    const handleDescription = (desc: string) => {
        if (!desc) return;
        setContent(desc)
    }

    /*   const handleIconClick = (fileInputRef: React.RefObject<HTMLInputElement | null>) => {
          fileInputRef.current?.click(); // triggers the hidden input
      }; */


    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error('Image too large. Maximum allowed file size is 2MB.');
            e.target.value = '';
            return;
        }

        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setThumbnailFile(file);
        setFileName(file.name);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const mutation = useMutation({
        mutationFn: (formData: FormData) => createArticle(formData)
    })
    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        if (!thumbnailFile) {
            toast.error('Please select a thumbnail image.');
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('content', content);
        formData.append('thumbnail', thumbnailFile);

        mutation.mutate(formData, {
            onSuccess(data) {
                toast.success(data.message);
                setContent("");
                setFileName("");
                setThumbnailFile(null);
                setPreviewUrl('');
                reset();
                router.push("/admin/blogs");
            },
        });
    }






    return (
        <div className="flex flex-col gap-y-6  h-[91vh] overflow-y-scroll">
                <button className='font-inter font-semibold mt-4 px-6 flex text-sm items-center cursor-pointer dark:text-[#344054]' onClick={() => router.back()}> <ChevronLeft color='#344054' size={18} className='text-grey-900 dark:text-grey-900' /> Back</button>
            <div className="flex py-8 px-6 gap-x-6 ">

                <div className="w-[80%] mx-auto py-6 px-5 flex flex-col gap-y-8 bg-white rounded-md">
                    <div className="flex flex-col gap-y-6">

                        {/*  <h2 className='text-grey-800 font-inter text-base font-semibold'>Add Products</h2> */}
                        <div className="flex gap-x-3">
                            <div className="flex flex-col w-full">

                                <div className="flex gap-x-10">
                                    <div
                                        className="flex w-[30%] border border-grey-100 flex-col px-6 rounded-md gap-y-4 h-[150px] gap-x-6 items-center justify-center"
                                        style={previewUrl.length > 0 ? { backgroundImage: `url(${previewUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : { backgroundColor: "#FDF0E7" }}
                                    >
                                        <>
                                            <CloudUpload size={30} className='dark:text-[#344054]'/>
                                            <p className="text-sm text-black font-semibold">{filename.length > 0 ? filename : "Thumbnail"}</p>
                                        </>

                                    </div>
                                    <div className="flex justify-center flex-col ">
                                        <label className="block text-sm font-medium mb-3 dark:text-[#344054]">Blog Thumbnail</label>
                                        <input
                                            ref={fileInputRef}
                                            onChange={handleImageSelect}
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            className="block w-full py-2 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file" />
                                        {/*   <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={(e) => handleImageUpload(e, "thumbnail")}
                                            className="bg-primary cursor-pointer"
                                        /> */}
                                    </div>

                                </div>
                                {!thumbnailFile && mutation.isError && <p className="text-red-500 text-sm">Thumbnail is required</p>}
                            </div>


                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="py-6">
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-[#344054]">Blog Title</label>

                                <input
                                    type="text"
                                    placeholder="Enter blog title"
                                    className="w-full border dark:text-[#344054] rounded-md h-11 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                                    {...register('title')}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-[#344054]">Blog Category</label>

                                <input
                                    type="text"
                                    placeholder="Enter blog category"
                                    className="w-full dark:text-[#344054] border rounded-md h-11 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                                    {...register('category')}
                                />
                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                            </div>
                        </div>

                        <div className="mb-4 h-max">
                            <label className="block text-sm font-medium mb-1 dark:text-[#344054]">Content</label>

                            <SimpleEditor editorStyles={"xl:max-w-[900px]"} styles='min-h-[400px] dark:text-[#344054]' content={content} handleChange={handleDescription} />

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

export default AddArticle

