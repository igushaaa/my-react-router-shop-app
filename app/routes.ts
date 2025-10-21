import { route, index, type RouteConfig, prefix } from "@react-router/dev/routes";
import { prefetchDNS } from "react-dom";

export default [
  index("./routes/home.tsx"),
  route("about", "./routes/about.tsx"),

    ...prefix('catalog',[
        index('./routes/catalog/index.tsx'),
        route('p/:productSlug','./routes/catalog/product.tsx'),
        route("c/:categorySlug?","./routes/catalog/category.tsx"),
        route("files/*","./routes/catalog/files.tsx"),
    ]),

  // Cart routes (place before catchall)
  route("cart", "./routes/cart/index.tsx"),
  route("cart/add", "./routes/cart/add.tsx"),
  route("cart/checkout", "./routes/cart/checkout.tsx"),

  route("account", "./routes/account/_layout.tsx", [
    index("./routes/account/index.tsx"),
    route("orders", "./routes/account/orders.tsx"),
  ]),

  route("auth/register", "./routes/auth/register.tsx"),
  route("auth/login", "./routes/auth/login.tsx"),
  route("auth/logout", "./routes/auth/logout.tsx"),
  route("*", "./routes/catchall.tsx"),
  
] satisfies RouteConfig;
