import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, ChevronDown } from "lucide-react";
import { Link, useNavigation } from "react-router";
import { useCategoriesQuery } from "@/hooks/categories-query";
import { Logo } from "./logo";
import { useEffect, useState } from "react";
export const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categoriesQuery = useCategoriesQuery();
  const navigation = useNavigation();
  useEffect(() => {
    if (navigation.state === "loading") {
      setIsOpen(false);
    }
  }, [navigation.state]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" aria-describedby="navigation-menu">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <Link to="/products" className="text-sm hover:underline">
          All Products
        </Link>
        <hr />
        <Link to="/" className="text-muted-foreground hover:underline">
          Browse by categories
        </Link>
        <div className="flex flex-col gap-2">
          {categoriesQuery.data?.slice(0, 10).map((category) => (
            <Link key={category.slug} to={`/products/${category.slug}`} className="text-sm hover:underline">
              {category.name}
            </Link>
          ))}
          <Collapsible className="flex flex-col gap-2">
            <CollapsibleContent className="flex flex-col gap-2">
              {categoriesQuery.data?.slice(10).map((category) => (
                <Link key={category.slug} to={`/products/${category.slug}`} className="text-sm hover:underline">
                  {category.name}
                </Link>
              ))}
            </CollapsibleContent>
            <CollapsibleTrigger className="group">
              <div className="flex items-center gap-2">
                <p className="text-sm hover:underline group-data-[state=open]:hidden">See All</p>
                <p className="text-sm hover:underline group-data-[state=closed]:hidden">See Less</p>
                <ChevronDown className="h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
              </div>
            </CollapsibleTrigger>
          </Collapsible>
        </div>

        <hr />
      </SheetContent>
    </Sheet>
  );
};
