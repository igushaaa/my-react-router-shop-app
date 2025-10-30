import { Link } from "react-router";
import { Button, Text, Image, Card, Badge } from "../atoms";
import AddToCart from "../molecules/AddToCart";

export interface ProductDetailsPageProps {
  id: number;
  name: string;
  price: number;
  category?: { name: string; slug: string };
  description?: string;
  imageUrl?: string;
}

export default function ProductDetailsPage({
  id,
  name,
  price,
  category,
  description,
  imageUrl,
}: ProductDetailsPageProps) {
  const img = imageUrl || "https://via.placeholder.com/640x360?text=Product";
  const desc = description || "No description provided for this product.";

  return (
    <main className="container">
      <Text as="h1" size="3xl" weight="bold" className="page-title">
        {name}
      </Text>

      <section className="product-hero">
        <img src={img} alt={name} className="product-img" />

        <div>
          <div className="product-meta">
            {category && (
              <span className="badge badge-category">
                <Link to={`/catalog/c/${category.slug}`}>{category.name}</Link>
              </span>
            )}
          </div>

          <div className="product-price">${price}</div>
          <p className="text-muted mb-3">{desc}</p>

          <div className="row-gap-2">
            <AddToCart productId={id} />
            <Link to="/catalog">
              <Button>← Back to catalog</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


