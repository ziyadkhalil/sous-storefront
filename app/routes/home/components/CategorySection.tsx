import { Link } from "react-router";
import { ProductCard, ProductCardSkeleton } from "@//components/product-card";
import { useCartStore } from "@/hooks/cart-store";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/utils";
type CategorySectionProps = {
  title: string;
  category: string;
  products: Product[];
  isLoading?: boolean;
  className?: string;
};

export const CategorySection = ({ title, category, products, className }: CategorySectionProps) => {
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <Link
        to={`/products/${category}`}
        className="text-2xl font-bold hover:underline"
        aria-label={`View all ${title}`}
      >
        {title}
      </Link>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onAddToCart={addToCart} />
        ))}

        <Link
          to={`/products/${category}`}
          className="min-w-[320px] bg-card flex-shrink-0 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex items-center justify-center p-8"
        >
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">See More</p>
            <ArrowRight className="w-6 h-6 mx-auto text-primary" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export const CategorySectionSkeleton = () => {
  return (
    <section className="w-full ">
      <div className="h-8 w-64 bg-muted rounded animate-pulse mb-4" />
      <div className="flex gap-4 overflow-hidden pb-4 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};
