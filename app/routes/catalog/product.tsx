import { useLoaderData, Link } from "react-router";
import { PrismaClient } from "@prisma/client";
import Button from "../../components/atoms/Button";
import AddToCart from "../../components/molecules/AddToCart";

const prisma = new PrismaClient();

export async function loader({ params }: { params: { productSlug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.productSlug },
    include: { category: true },
  });

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }

  return { product };
}

export default function ProductPage() {
  const { product } = useLoaderData<typeof loader>();

  const imageUrl = (product as any).imageUrl ?? "https://via.placeholder.com/640x360?text=Product";
  const description = (product as any).description ?? "No description provided for this product.";

  return (
    <main className="container">
      <h1 className="page-title">{product.name}</h1>

      <section className="product-hero">
        <img src={imageUrl} alt={product.name} className="product-img" />

        <div>
          <div className="product-meta">
            <span className="badge badge-category">
              <Link to={`/catalog/c/${product.category.slug}`}>{product.category.name}</Link>
            </span>
          </div>

          <div className="product-price">${product.price}</div>
          <p className="text-muted mb-3">{description}</p>

          <div className="row-gap-2">
            <AddToCart productId={product.id} />
            <Link to="/catalog">
              <Button>← Back to catalog</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p>{error.statusText}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold">Unexpected error</h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <div className="p-8 text-center text-red-600">Unknown error</div>;
  }
}