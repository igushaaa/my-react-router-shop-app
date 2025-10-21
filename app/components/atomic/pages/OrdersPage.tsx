import { PageLayout } from "../templates";
import { OrderList } from "../organisms";

export interface Order {
  id: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
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
}

export interface OrdersPageProps {
  orders: Order[];
  isLoading?: boolean;
  error?: string;
  onCancelOrder?: (orderId: number) => void;
  onRetry?: () => void;
}

export default function OrdersPage({ 
  orders,
  isLoading = false,
  error,
  onCancelOrder,
  onRetry 
}: OrdersPageProps) {
  return (
    <PageLayout
      title="Order History"
      subtitle="Track and manage your orders"
    >
      <OrderList
        orders={orders}
        isLoading={isLoading}
        error={error}
        onCancelOrder={onCancelOrder}
        onRetry={onRetry}
      />
    </PageLayout>
  );
}