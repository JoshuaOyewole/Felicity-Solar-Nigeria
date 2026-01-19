"use client";

import LinkButton from "../ui/Link";
import { MoveRight } from "lucide-react";
import Article from "@/components/ui/article";
import { useQuery } from "@tanstack/react-query";
import {
  fetchArticles,
  IBlog,
} from "@/app/(admin)/admin/blogs/components/Articles";
import { generateSlug } from "@/lib/constants";

function Articles() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchArticles(1, 10),
  });

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
  const blogs: IBlog[] = data?.data || [];
  //pick 3 random blogs
  blogs.sort(() => 0.5 - Math.random());
  blogs.splice(3);
  

  console.log(blogs);
  return (
    <section className="py-18 md:py-10 lg:py-32 flex-col flex gap-y-22">
      <div className="flex gap-y-26 mx-auto w-[90%] 2xl:w-[75%] gap-x-26 flex-col ">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-y-8 md:gap-y-0">
          <h2
            className=" text-[#101928] text-2xl md:text-3xl md:text-center font-bold"
            data-aos="zoom-in"
          >
            The Future of Solar Power
          </h2>
          <LinkButton
            className="max-w-40 md:max-w-[214px] max-h-12 text-grey-800 border border-grey-700 flex items-center"
            variant={"white"}
            href="/blog"
            label="View all "
            icon={<MoveRight className="ml-2" />}
          />
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-x-10 gap-y-10 lg:gap-y-28 md:gap-y-16 xl:gap-y-0">
          {blogs.length > 1 ? (
            blogs.map((b) => (
              <Article
                key={b.title}
                title={b.title}
                category={b.category}
                cover={b.thumbnail}
                url={`/blog/${generateSlug(String(b.id))}-${b.id}`}
              />
            ))
          ) : (
            <p className="text-grey-700 ">No article currently available</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Articles;
