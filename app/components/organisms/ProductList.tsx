import { ProductCard } from "../atomic/molecules";
import type { ProductCardProps } from "../atomic/molecules";

export default function ProductList({ items }: { items: ProductCardProps[] }) {
  return (
    <div>
      {items.length === 0 && <p className="empty-state">No products found.</p>}
      <div className="card-grid">
        {items.map((p) => (
          <ProductCard key={p.slug} {...p} />
        ))}
      </div>
    </div>
  );
}