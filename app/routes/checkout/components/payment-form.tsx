import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PaymentForm = ({ total }: { total: number }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
    <div className="space-y-2">
      <label className="text-sm font-medium">Card Number</label>
      <Input type="text" required />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Expiry Date</label>
        <Input type="text" placeholder="MM/YY" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">CVV</label>
        <Input type="text" required />
      </div>
    </div>
  </div>
);
