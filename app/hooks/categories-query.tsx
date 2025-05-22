import { api } from "@/api";
import type { Category } from "@/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const categoriesQueryOptions = queryOptions({
  queryKey: ["categories"],
  queryFn: () => api.get<Category[]>("products/categories").json(),
});

export const useCategoriesQuery = () => {
  return useQuery(categoriesQueryOptions);
};
