import { Outlet, useLoaderData } from "react-router";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { categoriesQueryOptions } from "@/hooks/categories-query";
import Header from "./components/header";

export const loader = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(categoriesQueryOptions);
  return { dehydratedState: dehydrate(queryClient) };
};

export function RootLayout() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Header />
      <main>
        <Outlet />
      </main>
    </HydrationBoundary>
  );
}

export default RootLayout;
