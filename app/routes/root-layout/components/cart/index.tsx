import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "./empty-state";
import { CartItem } from "./cart-item";
import { useCartStore } from "@/hooks/cart-store";
import { Link } from "react-router";

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useCartStore();
  const total = cart.total;
  const cartItems = cart.items;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" data-testid="cart-button">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
            {cartItems.length}
          </span>
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
          </SheetDescription>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col gap-4 overflow-auto p-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  count={item.count}
                  onDecrement={cart.decrementItem}
                  onIncrement={cart.incrementItem}
                  onRemove={cart.removeItem}
                />
              ))}
            </div>

            <SheetFooter>
              <div className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <EmptyState />
        )}
      </SheetContent>
    </Sheet>
  );
};
