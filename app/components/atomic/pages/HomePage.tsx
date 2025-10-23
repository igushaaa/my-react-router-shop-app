import { PageLayout } from "../templates";
import { Text, Card, Button } from "../atoms";
import { ProductList } from "../organisms";

export interface HomePageProps {
  featuredProducts?: Array<{
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
}

export default function HomePage({ 
  featuredProducts = [],
  isLoading = false,
  error,
  onRetry 
}: HomePageProps) {
  return (
    <PageLayout
      title="Welcome to MyShop"
      subtitle="Discover amazing products at great prices"
    >
      {/* Hero Section */}
      <section className="mb-12">
        <Card variant="elevated" className="p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Text as="h2" size="3xl" weight="bold" className="mb-4">
            Discover Amazing Products
          </Text>
          <Text size="lg" className="mb-6 opacity-90">
            Shop from thousands of products with fast delivery and great customer service
          </Text>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => window.location.href = '/catalog'}
          >
            Start Shopping
          </Button>
        </Card>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <Text as="h2" size="2xl" weight="bold">
            Featured Products
          </Text>
          <Button 
            variant="ghost"
            onClick={() => window.location.href = '/catalog'}
          >
            View All Products
          </Button>
        </div>
        
        <ProductList
          items={featuredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={onRetry}
        />
      </section>
    </PageLayout>
  );
}