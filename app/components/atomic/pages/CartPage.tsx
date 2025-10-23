import { PageLayout } from "../templates";
import { Cart } from "../organisms";

export interface CartPageProps {
  items: Array<{
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
  }>;
  total: number;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export default function CartPage({ 
  items,
  total,
  isLoading = false,
  error,
  onRetry 
}: CartPageProps) {
  return (
    <PageLayout
      title="Shopping Cart"
      subtitle="Review your items before checkout"
    >
      <Cart />
    </PageLayout>
  );
}