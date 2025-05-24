import { HydrationBoundary } from "@tanstack/react-query";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types";
import { CategorySection, CategorySectionSkeleton } from "./components/CategorySection";
import {
  categorySectionsInfiniteQueryOptions,
  useCategorySectionsInfiniteQuery,
} from "./hooks/category-sections-infinte-query";
import { QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { categoriesQueryOptions } from "@/hooks/categories-query";
import { useInView } from "react-intersection-observer";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ShopHub | Home" }, { name: "description", content: "Welcome to ShopHub!" }];
}

export const loader = async () => {
  const queryClient = new QueryClient();
  const categories = await queryClient.fetchQuery(categoriesQueryOptions);
  await queryClient.prefetchInfiniteQuery(categorySectionsInfiniteQueryOptions({ categories }));
  return { dehydratedState: dehydrate(queryClient) };
};

const Home = () => {
  const categorySections = useCategorySectionsInfiniteQuery();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !categorySections.isFetchingNextPage) {
      categorySections.fetchNextPage();
    }
  }, [inView, categorySections.isFetchingNextPage, categorySections.fetchNextPage]);

  return (
    <div className="container mx-auto p-4 gap-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Featured Categories</h2>
      </div>

      {categorySections.data?.pages.flatMap((page) =>
        page.categoryProducts.map((category) => (
          <CategorySection
            key={category.slug}
            title={category.title}
            category={category.slug}
            products={category.products}
          />
        ))
      )}
      {categorySections.hasNextPage && !categorySections.isFetchingNextPage && <div ref={ref} />}
      {(categorySections.isFetching || categorySections.isFetchingNextPage) && (
        <CategorySectionSkeleton key={"skeleton"} />
      )}
    </div>
  );
};

export default function HomeRoute() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Home />
    </HydrationBoundary>
  );
}
