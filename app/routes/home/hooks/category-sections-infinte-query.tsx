import { api } from "@/api";
import { useCategoriesQuery } from "@/hooks/categories-query";
import type { Category, Product } from "@/types";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const categorySectionsInfiniteQueryOptions = ({ categories }: { categories?: Category[] }) =>
  infiniteQueryOptions({
    queryKey: ["category-sections"],
    queryFn: async ({ pageParam = 0 }) => {
      const selectedCategories = categories?.slice(pageParam * 4, (pageParam + 1) * 4) || [];
      const [, ...categoryProducts] = await Promise.all([
        new Promise((res) => setTimeout(res, 1000)),
        ...selectedCategories.map(async (category) => {
          const response = await api
            .get<{
              products: Product[];
            }>(`products/category/${category.slug}?select=title,images,price,id`, {
              searchParams: { limit: 4 },
            })
            .json();

          return {
            id: category.id,
            slug: category.slug,
            title: category.name,
            products: response.products,
          };
        }),
      ]);

      return {
        categoryProducts,
        nextCursor: (pageParam + 1) * 4 < (categories?.length ?? 0) ? pageParam + 1 : null,
      };
    },
    getNextPageParam: (lastPage) => (lastPage.nextCursor ? lastPage.nextCursor : null),
    initialPageParam: 0,
    enabled: !!categories,
  });

export const useCategorySectionsInfiniteQuery = () => {
  const categories = useCategoriesQuery();
  return useInfiniteQuery(categorySectionsInfiniteQueryOptions({ categories: categories.data }));
};
