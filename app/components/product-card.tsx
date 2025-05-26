import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { cn } from "@/utils";

type ProductCardProps = Product & {
  onAddToCart?: (product: Product) => void;
  className?: string;
};

export const ProductCard = ({ id, images, title, price, onAddToCart, className }: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart?.({ id, images, title, price });
    toast.success("Product added to cart");
  };

  return (
    <div
      className={cn(
        "group bg-card flex-shrink-0 min-w-0 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xs",
        className
      )}
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

export const ProductCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-card flex-shrink-0 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-xs",
        className
      )}
    >
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
