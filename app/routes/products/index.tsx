import { useParams } from "react-router";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";

import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { useLoaderData } from "react-router";
import { Button } from "@/components/ui/button";
import { productsInfiniteQueryOptions, useProductsInfiniteQuery } from "./hooks/products-infinite-query";
import type { Route } from "./+types";
import { useCartStore } from "@/hooks/cart-store";
import { CategoryBreadcrumb } from "./components/category-breadcrumb";
import { fromSlugToTitle } from "@/utils";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `ShopHub | ${params.category ? fromSlugToTitle(params.category) : "All Products"}` },
    {
      name: "description",
      content: `ShopHub | ${params.category ? fromSlugToTitle(params.category) : "All Products"}`,
    },
  ];
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { category } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(productsInfiniteQueryOptions({ category }));
  return {
    dehydratedState: dehydrate(queryClient),
    title: category ? fromSlugToTitle(category) : "All Products",
  };
};

const Categories = () => {
  const { category } = useParams() as Route.ComponentProps["params"];
  const productsInfiniteQuery = useProductsInfiniteQuery({ category });
  const addItemToCart = useCartStore((state) => state.addItem);
  const { title } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8 gap-4 flex flex-col">
      {category && <CategoryBreadcrumb category={title} />}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsInfiniteQuery.data?.pages.map((page) =>
          page.products.map((product) => (
            <ProductCard key={product.id} {...product} onAddToCart={addItemToCart} className="max-w-full" />
          ))
        )}
        {productsInfiniteQuery.isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} className="max-w-full" />)}
      </div>
      {productsInfiniteQuery.hasNextPage ? (
        <Button onClick={() => productsInfiniteQuery.fetchNextPage()}>Load more</Button>
      ) : (
        <p className="text-center text-gray-500">You've reached the end of the {title} category</p>
      )}
    </div>
  );
};

export default function CategoriesRoute() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Categories />
    </HydrationBoundary>
  );
}
