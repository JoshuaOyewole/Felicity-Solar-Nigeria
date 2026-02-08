"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddBlogSchema } from "@/lib/schema";
import { ChevronLeft, CloudUpload } from "lucide-react";
import axios from "axios";
import { ICreateArticle } from "@/lib/types";
import { toast } from "react-toastify";
import { SimpleEditor } from "@/components/tiptap/editor/simple-editor";
import { useRouter } from "next/navigation";
//import { cn } from '@/lib/constants';
//import { FormFieldProps, AddProductFormData } from '@/lib/types';
//import FormField from '@/components/ui/FormField';

type IProps = {
  id: string;
};

type IArticle = {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  category: string;
  created_at: string;
};

type IResponse = {
  status: number;
  message: string;
  data: IArticle;
};

const editArticle = async (variables: ICreateArticle) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/blogs/${variables.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to edit blog");
  }

  const response = await res.json();
  return response;
};
export const fetchArticle = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blogs/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  const response: IResponse = await res.json();

  return response;
};
type FormSchema = z.infer<typeof AddBlogSchema>;

function EditArticle({ id }: IProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState("");
  const [filename, setFileName] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
  });

  const article: IArticle | undefined = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(AddBlogSchema),
    defaultValues: {
      title: "",
      category: "",
      thumbnail: "",
    },
  });

  //console.log(uploading);
  useEffect(() => {
    // console.log(data.data.title);

    if (article) {
      setValue("title", article.title);
      setValue("category", article.category);
      setValue("thumbnail", article.thumbnail);
      setContent(article.content);
      //console.log(data);
    }
  }, [setValue, article]);

  const handleDescription = (desc: string) => {
    if (!desc) return;
    setContent(desc);
  };

  /*   const handleIconClick = (fileInputRef: React.RefObject<HTMLInputElement | null>) => {
          fileInputRef.current?.click(); // triggers the hidden input
      }; */

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldValue: "thumbnail",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "felicity-solar"); // Replace with yours

    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData,
      );

      setFileName(`${res?.data?.display_name}.${res?.data?.format}`);

      setValue(fieldValue, res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: (variables: ICreateArticle) => editArticle(variables),
  });
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const payload: ICreateArticle = {
      id,
      title: data.title,
      category: data.category,
      content: content,
      thumbnail: data.thumbnail,
    };


    mutation.mutate(payload, {
      onSuccess(data) {
        //console.log({ msg: "Article updated successfully:", data, variables, context });
        toast.success(data.message);
        setContent("");
        setFileName("");
        reset();
        //queryClient.setQueryData(['article', { id }], data);
        queryClient.invalidateQueries({ queryKey: ["articles"] });
        router.push("/admin/blogs");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center  h-screen">
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
    );
  }
  if (isError) {
    return (
      <div className="flex h-screen font-semibold text-red-700">
        Error loading articles...
      </div>
    );
  }

  const bgImg = watch("thumbnail");

  return (
    <div className="flex flex-col gap-y-6  h-[91vh] overflow-y-scroll">
      <button
        className="font-inter font-semibold mt-4 px-6 flex text-sm items-center cursor-pointer dark:text-grey-800"
        onClick={() => router.back()}
      >
        {" "}
        <ChevronLeft color="#344054" size={18} /> Back
      </button>
      <div className="flex py-8 px-6 gap-x-6 ">
        <div className="w-[80%] mx-auto py-6 px-5 flex flex-col gap-y-8 bg-white rounded-md">
          <div className="flex flex-col gap-y-6">
            {/*  <h2 className='text-grey-800 font-inter text-base font-semibold'>Add Products</h2> */}
            <div className="flex gap-x-3">
              <div className="flex flex-col w-full">
                <div className="flex gap-x-10">
                  <div
                    className="flex w-[30%] border border-grey-100 flex-col px-6 rounded-md gap-y-4 h-[150px] gap-x-6 items-center justify-center"
                    style={
                      bgImg.length > 0
                        ? {
                            backgroundImage: `url(${bgImg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : { backgroundColor: "#FDF0E7" }
                    }
                  >
                    {uploading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <>
                        <CloudUpload size={30} />
                        <p className="text-sm text-black font-semibold">
                          {filename.length > 0 ? filename : "Thumbnail"}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex justify-center flex-col ">
                    <label className="block text-sm font-medium mb-3 dark:text-grey-800">
                      Blog Thumbnail
                    </label>
                    <input
                      ref={fileInputRef}
                      onChange={(e) => handleImageUpload(e, "thumbnail")}
                      className="block w-full py-2 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="default_size"
                      type="file"
                    />
                    {/*   <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={(e) => handleImageUpload(e, "thumbnail")}
                                            className="bg-primary cursor-pointer"
                                        /> */}
                  </div>
                </div>
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="py-6">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-grey-800">
                  Blog Title
                </label>

                <input
                  type="text"
                  placeholder="Enter blog title"
                  className="w-full border rounded-md dark:text-grey-800 h-11 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-grey-800">
                  Blog Category
                </label>

                <input
                  type="text"
                  placeholder="Enter blog category"
                  className="w-full border rounded-md dark:text-grey-800 h-11 px-3 py-2 text-sm focus:outline-none focus:border-none focus:ring focus:ring-primary"
                  {...register("category")}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 h-max">
              <label className="block text-sm font-medium mb-1 dark:text-grey-800">
                Content
              </label>

              <SimpleEditor
                editorStyles={"xl:max-w-[900px] dark:text-grey-800"}
                styles="min-h-[400px]"
                content={content}
                handleChange={handleDescription}
              />
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
    </div>
  );
}

export default EditArticle;
