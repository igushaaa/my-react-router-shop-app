import { ProductCard, EmptyState, LoadingState } from "../molecules";
import { Text } from "../atoms";

export interface ProductListProps {
  items: Array<{
    id: number;
    slug: string;
    name: string;
    price: number;
    category?: string;
    image?: string;
    description?: string;
  }>;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ProductList({ 
  items, 
  isLoading = false,
  error,
  onRetry,
  className = '' 
}: ProductListProps) {
  if (isLoading) {
    return <LoadingState message="Loading products..." className={className} />;
  }

  if (error) {
    return (
      <div className={className}>
        <Text as="h2" size="xl" weight="semibold" className="mb-4">
          Products
        </Text>
        <div className="text-center py-8">
          <Text color="danger" className="mb-4">
            {error}
          </Text>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={className}>
        <Text as="h2" size="xl" weight="semibold" className="mb-4">
          Products
        </Text>
        <EmptyState
          title="No products found"
          description="Try adjusting your search or filter criteria"
          actionLabel="View all products"
          onAction={() => window.location.href = '/catalog'}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <Text as="h2" size="xl" weight="semibold">
          Products
        </Text>
        <Text size="sm" color="muted">
          {items.length} {items.length === 1 ? 'product' : 'products'} found
        </Text>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
}