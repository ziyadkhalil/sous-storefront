import type { CartItem } from "@/types";

type OrderItemProps = {
  item: CartItem;
};

export const OrderItem = ({ item }: OrderItemProps) => (
  <div className="flex gap-4 border-b pb-4">
    <div className="relative h-20 w-20 overflow-hidden rounded-md">
      <img src={item.product.images[0]} alt={item.product.title} className="object-cover" />
    </div>
    <div className="flex-1">
      <h3 className="font-medium">{item.product.title}</h3>
      <p className="text-sm text-muted-foreground">Quantity: {item.count}</p>
      <p className="text-sm font-medium">${(item.product.price * item.count).toFixed(2)}</p>
    </div>
  </div>
);
