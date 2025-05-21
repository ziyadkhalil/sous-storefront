import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

type ProductCardProps = Product & {
  onAddToCart?: (product: Product) => void;
};

export const ProductCard = ({ id, images, title, price, onAddToCart }: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart?.({ id, images, title, price });
    toast.success("Product added to cart");
  };

  return (
    <div
      className="group bg-card flex-shrink-0 min-w-0 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xs"
      data-testid="product-card"
    >
      <div className="relative aspect-square">
        <img
          src={images[0]}
          width={768}
          height={768}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-2 truncate">{title}</h3>
        <p className="text-2xl font-bold text-card-foreground mb-4">${price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} className="w-full" size="lg">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-card flex-shrink-0 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm w-full">
      <div className="relative aspect-square">
        <div className="w-full h-full bg-muted animate-pulse" />
      </div>
      <div className="p-4">
        <div className="h-6 bg-muted rounded animate-pulse mb-2" />
        <div className="h-8 w-24 bg-muted rounded animate-pulse mb-4" />
        <div className="h-11 bg-muted rounded animate-pulse w-full" />
      </div>
    </div>
  );
};
