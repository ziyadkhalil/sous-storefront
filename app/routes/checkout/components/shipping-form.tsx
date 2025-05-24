import { Input } from "@/components/ui/input";

export const ShippingForm = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
    <div className="space-y-2">
      <label className="text-sm font-medium">Full Name</label>
      <Input type="text" required />
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Email</label>
      <Input type="email" required />
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Address</label>
      <Input type="text" required />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <Input type="text" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Postal Code</label>
        <Input type="text" required />
      </div>
    </div>
  </div>
);
