import { ProductPageLayout } from "../templates";
import { ProductList, ProductFilters } from "../organisms";
import { SearchBar } from "../molecules";
import { Text } from "../atoms";

export interface CatalogPageProps {
  products: Array<{
    id: number;
    slug: string;
    name: string;
    price: number;
    category?: string;
    image?: string;
    description?: string;
  }>;
  categories: Array<{
    value: string;
    label: string;
    count: number;
  }>;
  priceRanges: Array<{
    value: string;
    label: string;
    count: number;
  }>;
  searchQuery?: string;
  sortBy?: string;
  isLoading?: boolean;
  error?: string;
  onSearch?: (query: string, sort: string) => void;
  onFiltersChange?: (filters: {
    category?: string;
    priceRange?: string;
    sort?: string;
  }) => void;
  onRetry?: () => void;
}

export default function CatalogPage({ 
  products,
  categories,
  priceRanges,
  searchQuery,
  sortBy,
  isLoading = false,
  error,
  onSearch,
  onFiltersChange,
  onRetry 
}: CatalogPageProps) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Catalog' }
  ];

  return (
    <ProductPageLayout
      title="Product Catalog"
      subtitle="Browse our wide selection of products"
      breadcrumbs={breadcrumbs}
      sidebar={
        <ProductFilters
          categories={categories}
          priceRanges={priceRanges}
          onFiltersChange={onFiltersChange || (() => {})}
        />
      }
    >
      {/* Search and Sort */}
      <div className="mb-6">
        <SearchBar
          q={searchQuery}
          sort={sortBy}
          onSearch={onSearch}
        />
      </div>

      {/* Products */}
      <ProductList
        items={products}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
      />
    </ProductPageLayout>
  );
}