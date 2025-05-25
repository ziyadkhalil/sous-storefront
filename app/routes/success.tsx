import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/cart-store";
import { Link, redirect } from "react-router";
import { CheckCircle } from "lucide-react";
import JSConfetti from "js-confetti";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ShopHub | Success" }];
}

export const clientLoader = () => {
  const successfulOrder = useCartStore.getState().successfulOrder;
  if (!successfulOrder) {
    return redirect("/products");
  }
  useCartStore.setState({ successfulOrder: false });
  return null;
};

const Success = () => {
  useEffect(() => {
    const confetti = new JSConfetti();
    confetti.addConfetti();
    return () => {
      confetti.clearCanvas();
    };
  }, []);

  return (
    <div className="container mx-auto p-4 text-center min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="space-y-4">
          <CheckCircle className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-3xl font-bold text-primary">Order Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order number is <span className="font-semibold">#134145</span>
          </p>
        </div>

        <Link to="/products">
          <Button className="mt-8">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
