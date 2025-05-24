import { useCartStore } from "@/hooks/cart-store";

import { Button } from "@/components/ui/button";
import { OrderSummary, ShippingForm, PaymentForm } from "./components";
import { Form, Link, redirect, useNavigation } from "react-router";
import { Loader } from "lucide-react";
import { toast } from "sonner";
export function meta({}: Route.MetaArgs) {
  return [{ title: "ShopHub | Checkout" }];
}

export async function clientAction({ request: _req }: { request: Request }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  useCartStore.getState().clear();
  useCartStore.setState({ successfulOrder: true });
  toast.success("Order placed successfully");
  return redirect("/success");
}

export function clientLoader() {
  const itemsLength = useCartStore.getState().items.length;
  if (itemsLength === 0) {
    return redirect("/products");
  }
  return null;
}

const Checkout = () => {
  const cart = useCartStore();
  const cartItems = cart.items;
  const subtotal = cart.total;
  const vat = subtotal * 0.2; // 20% VAT
  const total = subtotal + vat;
  const navigation = useNavigation();

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" className="mb-4" type="button" asChild>
        <Link to="/products" replace>
          ← Back to Products
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <OrderSummary items={cartItems} subtotal={subtotal} vat={vat} total={total} />

        <Form method="post" className="space-y-8">
          <ShippingForm />
          <PaymentForm total={total} />
          <Button type="submit" className="mt-6 w-full" disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" && <Loader className="w-4 h-4 animate-spin" />}
            <p>
              {navigation.state === "submitting" && "Placing order..."}
              {navigation.state === "idle" && `Place Order ($${total.toFixed(2)})`}
            </p>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
