import { useLoaderData } from "react-router";
import { PrismaClient } from "@prisma/client";
import SearchBar from "../../components/molecules/SearchBar";
import ProductList from "../../components/organisms/ProductList";

const prisma = new PrismaClient();

export function meta({ location }: { location: URL }) {
  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  const sort = params.get("sort");

  let title = "All Products – MyShop";
  if (q) title = `Search: ${q} – MyShop`;
  else if (sort) title = `Products sorted by ${sort} – MyShop`;

  return [
    { title },
    {
      name: "description",
      content: q
        ? `Browse search results for "${q}" at MyShop.`
        : "Explore all products available at MyShop.",
    },
  ];
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const sort = url.searchParams.get("sort");

  let where = {};
  if (q) {
    where = { name: { contains: q } };
  }

  let orderBy: any = undefined;
  if (sort === "price") {
    orderBy = { price: "asc" };
  } else if (sort === "price_desc") {
    orderBy = { price: "desc" };
  }

  const items = await prisma.product.findMany({
    where,
    orderBy,
    include: { category: true },
  });

  return { items, q, sort };
}

export function HydrateFallback() {
  return <p>Loading products...</p>;
}

export default function CatalogIndex() {
  const { items, q, sort } = useLoaderData<{
    items: {
      id: number;
      name: string;
      price: number;
      slug: string;
      category?: { name: string };
    }[];
    q?: string;
    sort?: string;
  }>();

  return (
    <main className="container">
      <h1 className="page-title">Catalog</h1>
      <SearchBar q={q} sort={sort} />
      <ProductList
        items={items.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          price: p.price,
          category: p.category?.name,
        }))}
      />
    </main>
  );
}