"use client";

import { cldUrl, getPublicId } from '@/utils/cloudinary';
import Image from 'next/image';
import React, { useState } from 'react'

//default images
const imgs = [
    "/assets/images/product_images_1.jpeg",
    "/assets/images/product_images_2.jpeg",
    "/assets/images/product_images_3.jpeg",
    "/assets/images/product_images_4.jpeg",
]
function ProductImageGallery({ desc, cover, img2, img3, img4, height = 160, width = 200 }: { cover?: string, img2?: string, img3?: string, desc?: string, img4?: string, width?: number, height?: number }) {
    const [coverImg, setCoverImg] = useState<string>(cover || imgs[0]);


    const changeImage = (img: string) => {
        setCoverImg(img)
    }


    return (
        <div className="w-full md:w-1/2 md:px-4 mb-8">
            {cover && <Image
                //src={coverImg}
                src={cldUrl(getPublicId(coverImg), { w: 540, h: 450 })}
                alt={desc ?? ""}
                width={450}
                height={450}
                priority
                placeholder="blur"
                blurDataURL={cldUrl(getPublicId(coverImg), { w: 20, h: Math.round(20 * (450 / 540)), q: '1', f: 'auto' })}
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 450px"
                className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage"
            />}
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">

                {cover && <Image
                    //src={cover}
                    src={cldUrl(getPublicId(cover), { w: 200, h: 160 })}
                    alt={desc ?? ""}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => changeImage(cover)}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={cldUrl(getPublicId(cover), { w: 20, h: Math.round(20 * (height / width)), q: '1', f: 'auto' })}
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 240px"
                    width={200}
                    height={160}
                />}
                {img2 && <Image
                    // src={img2}
                    src={cldUrl(getPublicId(img2), { w: 200, h: 160 })}
                    alt={desc ?? ""}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => changeImage(img2)}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={cldUrl(getPublicId(img2), { w: 20, h: Math.round(20 * (height / width)), q: '1', f: 'auto' })}
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 240px"
                    width={200}
                    height={160}
                />}
                {img3 && <Image
                    //src={img3}
                    src={cldUrl(getPublicId(img3), { w: 200, h: 160 })}
                    alt={desc ?? ""}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => changeImage(img3)}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={cldUrl(getPublicId(img3), { w: 20, h: Math.round(20 * (height / width)), q: '1', f: 'auto' })}
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 240px"
                    width={200}
                    height={160}
                />}
                {img4 && <Image
                    //src={img4}
                    src={cldUrl(getPublicId(img4), { w: 200, h: 160 })}
                    alt={desc ?? ""}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => changeImage(img4)}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={cldUrl(getPublicId(img4), { w: 20, h: Math.round(20 * (height / width)), q: '1', f: 'auto' })}
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 240px"
                    width={200}
                    height={160}
                />}


            </div>
        </div>
    )
}

export default ProductImageGallery