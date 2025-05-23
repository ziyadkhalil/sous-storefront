import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "@/types";
import { XIcon } from "lucide-react";

type CartItemProps = CartItemType & {
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
};

export const CartItem = ({ product, count, onRemove, onIncrement, onDecrement }: CartItemProps) => {
  return (
    <div className="flex items-center gap-4" data-testid="cart-item">
      <div className="relative h-16 w-16 overflow-hidden rounded-md">
        <img src={product.images[0]} alt={product.title} className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="font-medium">{product.title}</span>
        <span className="text-sm text-muted-foreground">${(product.price * count).toFixed(2)}</span>
        <div className="flex items-center gap-2 mt-1">
          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onDecrement(product.id)}>
            <span className="text-xs">-</span>
          </Button>
          <span className="text-sm">{count}</span>
          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onIncrement(product.id)}>
            <span className="text-xs">+</span>
          </Button>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(product.id)}>
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Remove item</span>
      </Button>
    </div>
  );
};
