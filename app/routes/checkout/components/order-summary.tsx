import type { CartItem } from "@/types";
import { OrderItem } from "./order-item";

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
};

export const OrderSummary = ({ items, subtotal, vat, total }: OrderSummaryProps) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
    <div className="space-y-4">
      {items.map((item) => (
        <OrderItem key={item.product.id} item={item} />
      ))}
    </div>

    <div className="mt-6 space-y-2">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>VAT (20%)</span>
        <span>${vat.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);
