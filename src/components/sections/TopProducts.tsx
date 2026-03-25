"use client";

import { useQuery } from "@tanstack/react-query";
import Product from "@/components/ui/product";
import LinkButton from "@/components/ui/Link";
import { MoveRight } from "lucide-react";
import { IProduct, IProductsResponse } from "@/app/(main)/products/page";

async function fetchTopSellingProducts(limit = 8): Promise<IProductsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/products/top-selling?limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch top-selling products");
  return res.json();
}

function TopProducts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-products"],
    queryFn: () => fetchTopSellingProducts(8),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full animate-pulse">
            <div className="aspect-square w-full rounded-lg bg-gray-200" />
            <div className="mt-4 h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            <div className="mt-2 h-5 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="mt-4 h-8 bg-gray-200 rounded w-24 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-grey-500 py-10">
        Unable to load products at this time.
      </p>
    );
  }

  const products: IProduct[] = data?.data ?? [];
  if (products.length === 0) return null;


  return (
    <div className="flex flex-col gap-y-10">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-12">
        {products.map((p) => (
          <Product key={p.id} details={p} />
        ))}
      </div>
      <div className="flex justify-center">
        <LinkButton
          href="/products"
          label="View All Products"
          icon={<MoveRight className="ml-2" />}
          className="px-8"
        />
      </div>
    </div>
  );
}

export default TopProducts;
