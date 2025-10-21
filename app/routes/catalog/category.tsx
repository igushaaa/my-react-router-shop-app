import { Link, useLoaderData } from "react-router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function meta({ data }: { data: { categoryName?: string } }) {
  const effectiveCategoryName = data?.categoryName ?? "All";
  return [
    { title: `Category: ${effectiveCategoryName} - MyShop` },
    {
      name: "description",
      content: `Browse ${effectiveCategoryName.toLowerCase()} products at MyShop. Find great deals today!`,
    },
  ];
}

export async function loader({ params }: { params: { categorySlug?: string } }) {
  const slug = params.categorySlug;

  const category = slug
    ? await prisma.category.findUnique({
        where: { slug },
        include: { products: true },
      })
    : null;

  const items = category
    ? category.products
    : await prisma.product.findMany({ include: { category: true } });

  return { items, categoryName: category?.name || "All" };
}

export default function CategoryPage() {
  const { items, categoryName } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Category: {categoryName}</h1>
      <ul>
        {items.map((p) => (
          <li key={p.slug}>
            <Link to={`/catalog/p/${p.slug}`}>
              {p.name} - ${p.price}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link to="/catalog">All products</Link>
      </p>
    </main>
  );
}