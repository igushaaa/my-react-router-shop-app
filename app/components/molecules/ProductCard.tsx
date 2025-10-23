import { Link } from "react-router";
import { Button } from "../atomic/atoms";
import AddToCart from "./AddToCart";

export type ProductCardProps = {
  id: number;
  slug: string;
  name: string;
  price: number;
  category?: string;
};

export default function ProductCard({ id, slug, name, price, category }: ProductCardProps) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>
        ${price} {category && <span>({category})</span>}
      </p>
      <div className="row-gap-2">
        <Link to={`/catalog/p/${slug}`}>
          <Button>View</Button>
        </Link>
        <AddToCart productId={id} />
      </div>
    </div>
  );
}