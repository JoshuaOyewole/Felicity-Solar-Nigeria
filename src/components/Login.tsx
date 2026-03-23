"use client";

import { LoginSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

type ILogin = {
    email: string,
    password: string
}

type FormSchema = z.infer<typeof LoginSchema>;

function Login() {
    const router = useRouter();


    const handleLogin = async (variables: ILogin) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(variables),
            credentials: 'include'
        });


        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'An error occurred during login');
        }

        const response = await res.json();

        return response;
    }

    /*   const storeCookies = async (variables: { token: string }) => {
          const res = await fetch("/api/set-cookie", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(variables),
          });
  
          if (!res.ok) {
              const err = await res.json();
              throw new Error(err.error || "Error setting cookie");
          }
  
          return await res.json();
      }; */


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })



    const mutation = useMutation({
        mutationFn: (variables: ILogin) => handleLogin(variables)
    })
    /*   const store_cookies = useMutation({
          mutationFn: (variables: { token: string }) => storeCookies(variables)
      }); */

    /*  const onSubmit2: SubmitHandler<FormSchema> = (data) => {
         const payload: ILogin = {
             password: data.password,
             email: data.email
         }
 
         mutation.mutate(payload, {
             onSuccess(data) {
                 if (data.status === 200) {
                     console.log(`Login successful: ${data.message}`);
 
                     toast.success(data.message);
                     router.push("/admin/dashboard");
                     console.log(`Redirecting to dashboard...`);
 
                 }
 
                 reset();
             },
             onError(error) {
                 toast.error(error.message);
                 console.log(`An error occured => ${error.message}`);
 
             },
         });
     } */
    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        const payload: ILogin = {
            password: data.password,
            email: data.email,
        };

        mutation.mutate(payload, {
            onSuccess(data) {
                if (data.status === 200) {
                    toast.success(data.message);
                    router.push("/admin/dashboard");
                } else {
                    toast.error(data.message);
                }

                reset();
            },
        });
    };

    return (
        <section className="bg-black dark:bg-gray-900 h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                <div className="flex mb-6">
                    <Image src={"/logo.png"} alt='Felicity solar logo' width={180} height={120} />
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 py-8">
                    <div className="p-6 flex flex-col gap-y-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Welcome Back
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-7" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required  {...register('email')} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  {...register('password')} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <div className="hidden items-center justify-between">

                                <Link href="#" className="text-sm font-inter font-medium text-primary-600 hover:underline dark:text-primary">Forgot password?</Link>
                            </div>
                            <button type="submit" disabled={mutation.isPending} className="w-full bg-primary text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 h-12">
                                {mutation.isPending ? "Submitting..." : " Sign in"}

                            </button>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Login