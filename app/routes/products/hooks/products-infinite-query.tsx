import { api } from "@/api";
import type { Product } from "@/types";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const productsInfiniteQueryOptions = ({ category }: { category?: string }) =>
  infiniteQueryOptions({
    queryKey: ["products", category],
    queryFn: ({ pageParam = 0 }) =>
      api
        .get<{
          products: Product[];
          total: number;
          limit: number;
          skip: number;
        }>(`products${category ? `/category/${category}` : ""}?select=title,images,price,id`, {
          searchParams: { limit: 8, skip: pageParam },
        })
        .json(),
    getNextPageParam: (lastPage) =>
      lastPage.skip + lastPage.products.length >= lastPage.total ? null : lastPage.skip + lastPage.limit,
    initialPageParam: 0,
  });

export const useProductsInfiniteQuery = ({ category }: { category?: string }) => {
  return useInfiniteQuery(productsInfiniteQueryOptions({ category }));
};
