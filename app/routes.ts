import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/root-layout/index.tsx", [
    index("routes/home/index.tsx"),
    route("products/:category?", "routes/products/index.tsx"),
  ]),
  route("/checkout", "routes/checkout/index.tsx"),
] satisfies RouteConfig;
