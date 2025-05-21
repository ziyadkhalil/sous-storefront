export type Category = {
  id: number;
  slug: string;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export type CartItem = {
  product: Product;
  count: number;
};
