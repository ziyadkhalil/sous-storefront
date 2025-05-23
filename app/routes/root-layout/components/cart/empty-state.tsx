import { ShoppingCart } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
      <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      <p className="text-lg font-medium">Your cart is empty</p>
      <p className="text-sm text-muted-foreground">Add items to your cart to see them here</p>
    </div>
  );
};
