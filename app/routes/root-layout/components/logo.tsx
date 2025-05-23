import { Link } from "react-router";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <span className="text-sm font-bold">S</span>
      </div>
      <span className="font-bold inline-block">ShopHub</span>
    </Link>
  );
};
