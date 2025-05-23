import { Link } from "react-router";

import { NavMenu } from "./nav-menu";
import { Cart } from "./cart";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/theme-toggle";
export default function Component() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 items-center">
      <div className="flex h-16 items-center justify-between px-4">
        <NavMenu />

        <div className="absolute left-1/2 -translate-x-1/2 gap-2">
          <Logo />
        </div>

        <div className="flex  items-center space-x-2">
          <Cart />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
