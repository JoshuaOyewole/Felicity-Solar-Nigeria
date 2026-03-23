'use client';
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, CloudUpload } from 'lucide-react';
import { ICreateProjectShowcase } from '@/lib/types';
import { toast } from 'react-toastify';
import { SimpleEditor } from '@/components/tiptap/editor/simple-editor';
import { useRouter } from 'next/navigation';
import { IPagination } from '../../blogs/components/Articles';
import { AddProjectSchema } from '@/lib/schema';
import { IProjects } from '@/app/(main)/project-showcase/state/[stateId]/page';
import { fetchStates } from './AddShowcase';
//import { cn } from '@/lib/constants';
//import { FormFieldProps, AddProductFormData } from '@/lib/types';
//import FormField from '@/components/ui/FormField';

type IProps = {
    id: string
}



type IResponse = {
    status: number,
    message: string,
    data: {
        data: IProjects
    },
    pagination: IPagination
}

const editProjectShowcase = async (variables: ICreateProjectShowcase) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/project_showcases/${variables.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Failed to edit Project');
    }

    const response = await res.json();
    return response;
}

export const fetchProjectShowcase = async (id: string | number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/project_showcases/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch project showcase');
    }
    const response: IResponse = await res.json();

    return response;
}
type FormSchema = z.infer<typeof AddProjectSchema>;


function EditProjectShowcase({ id }: IProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const [content, setContent] = useState("");
    const [filename, setFileName] = useState("");
    const router = useRouter();
    const queryClient = useQueryClient();


    const { data, isLoading, isError } = useQuery({
        queryKey: ['article', id],
        queryFn: () => fetchProjectShowcase(id)
    })

    const projectShowcase: IProjects | undefined = data?.data.data;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
    } = useForm<FormSchema>({
        resolver: zodResolver(AddProjectSchema),
        defaultValues: {
            title: '',
            state: '',
            thumbnail: ''
        }
    });

    const { data: statesData, isLoading: statesLoading } = useQuery({
        queryKey: ['states'],
        queryFn: fetchStates,
    })


    //console.log(uploading);
    useEffect(() => {
        if (projectShowcase) {
            setValue("title", projectShowcase.title);
            setValue("state", projectShowcase.state_name);
            setValue("thumbnail", projectShowcase.thumbnail);
            setContent(projectShowcase.content);
            //console.log(data);

        }
    }, [setValue, projectShowcase])



    const handleDescription = (desc: string) => {
        if (!desc) return;
        setContent(desc)
    }


    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldValue: "thumbnail") => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error('Image too large. Maximum allowed file size is 2MB.');
            e.target.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
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
            setFileName(file.name);
            setValue(fieldValue, data.url);
        } catch (err) {
            console.error('Image upload failed:', err);
            toast.error('Image upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const mutation = useMutation({
        mutationFn: (variables: ICreateProjectShowcase) => editProjectShowcase(variables)
    })
    const onSubmit: SubmitHandler<FormSchema> = (data) => {

        const payload: ICreateProjectShowcase = {
            id,
            title: data.title,
            projectState: data.state,
            content: content,
            thumbnail: data.thumbnail
        }
        mutation.mutate(payload, {
            onSuccess(data) {
                //console.log({ msg: "Article updated successfully:", data, variables, context });
                toast.success(data.message);
                setContent("");
                setFileName("");
                reset();
                //queryClient.setQueryData(['article', { id }], data);
                queryClient.invalidateQueries({ queryKey: ['project-showcases'] });
                router.push("/admin/project-showcases")


            },
        });
    }

    if (isLoading || statesLoading) {
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
        return <div className='flex h-screen font-semibold text-red-700'>Error loading Project Showcase...</div>
    }

    const bgImg = watch("thumbnail");
    const states = statesData?.data;



    return (
        <div className="flex flex-col gap-y-6  h-[91vh] overflow-y-scroll">
            <button className='font-inter font-semibold mt-4 px-6 flex text-sm items-center cursor-pointer dark:text-grey-800' onClick={() => router.back()}> <ChevronLeft color='#344054' size={18} /> Back</button>
            <div className="flex py-8 px-6 gap-x-6 ">
                <div className="w-[80%] mx-auto py-6 px-5 flex flex-col gap-y-8 bg-white rounded-md">
                    <div className="flex flex-col gap-y-6">

                        {/*  <h2 className='text-grey-800 font-inter text-base font-semibold'>Add Products</h2> */}
                        <div className="flex gap-x-3">
                            <div className="flex flex-col w-full">

                                <div className="flex gap-x-10">
                                    <div
                                        className="flex w-[30%] border border-grey-100 flex-col px-6 rounded-md gap-y-4 h-[150px] gap-x-6 items-center justify-center"
                                        style={bgImg.length > 0 ? { backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center" } : { backgroundColor: "#FDF0E7" }}
                                    >
                                        {uploading
                                            ?
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            :
                                            <>
                                                <CloudUpload size={30} className='dark:text-grey-800'/>
                                                <p className="text-sm text-black font-semibold">{filename.length > 0 ? filename : "Thumbnail"}</p>
                                            </>

                                        }

                                    </div>
                                    <div className="flex justify-center flex-col ">
                                        <label className="block text-sm font-medium mb-3 dark:text-grey-800">Project Thumbnail</label>
                                        <input
                                            ref={fileInputRef}
                                            onChange={(e) => handleImageUpload(e, "thumbnail")}
                                            className="block w-full py-2 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file" />
                                        {/*   <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={(e) => handleImageUpload(e, "thumbnail")}
                                            className="bg-primary cursor-pointer"
                                        /> */}
                                    </div>

                                </div>
                                {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
                            </div>


                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="py-6">
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-grey-800">Project Title</label>

                                <input
                                    type="text"
                                    placeholder="Enter project title"
                                    className="w-full border rounded-md dark:text-grey-800 h-11 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                                    {...register('title')}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-grey-800">Project State</label>
                                <select
                                    defaultValue={""}
                                    className="w-full border rounded-md dark:text-grey-800 h-11 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                                    {...register('state')}
                                >
                                    <option value={""} className='text-sm font-inter dark:text-grey-800' >Select state</option>
                                    {
                                        states && states?.length > 0 && states.map(c => {
                                            return <option className='text-sm font-inter dark:text-grey-800' key={c?.id} value={c?.id}>{c?.state_name}</option>
                                        })
                                    }
                                </select>
                                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                            </div>
                        </div>

                        <div className="mb-4 h-max">
                            <label className="block text-sm font-medium mb-1 dark:text-grey-800">Content</label>

                            <SimpleEditor editorStyles={"xl:max-w-[900px] dark:text-grey-800"} styles='min-h-[400px]' content={content} handleChange={handleDescription} />

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

export default EditProjectShowcase

