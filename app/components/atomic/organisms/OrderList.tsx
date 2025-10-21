import { OrderItem, EmptyState, LoadingState } from "../molecules";
import { Text, Button, Card, Badge } from "../atoms";

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

export interface OrderListProps {
  orders: Order[];
  isLoading?: boolean;
  error?: string;
  onCancelOrder?: (orderId: number) => void;
  onRetry?: () => void;
  className?: string;
}

export default function OrderList({ 
  orders, 
  isLoading = false,
  error,
  onCancelOrder,
  onRetry,
  className = '' 
}: OrderListProps) {
  if (isLoading) {
    return <LoadingState message="Loading orders..." className={className} />;
  }

  if (error) {
    return (
      <div className={className}>
        <Text as="h2" size="xl" weight="semibold" className="mb-4">
          Orders
        </Text>
        <div className="text-center py-8">
          <Text color="danger" className="mb-4">
            {error}
          </Text>
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              Try again
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={className}>
        <Text as="h2" size="xl" weight="semibold" className="mb-4">
          Orders
        </Text>
        <EmptyState
          title="No orders found"
          description="Your order history will appear here"
          actionLabel="Start Shopping"
          onAction={() => window.location.href = '/catalog'}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <Text as="h2" size="xl" weight="semibold">
          Orders
        </Text>
        <Text size="sm" color="muted">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
        </Text>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} variant="elevated" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Text as="h3" size="lg" weight="semibold">
                  Order #{order.id}
                </Text>
                <Text size="sm" color="muted">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge 
                  variant={
                    order.status === 'confirmed' ? 'success' :
                    order.status === 'cancelled' ? 'danger' : 'warning'
                  }
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                
                {order.status === 'pending' && onCancelOrder && (
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => onCancelOrder(order.id)}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {order.items.map((item) => (
                <OrderItem key={item.id} {...item} status={order.status} />
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Text size="lg" weight="semibold">
                Total
              </Text>
              <Text size="xl" weight="bold" color="primary">
                ${order.total.toFixed(2)}
              </Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}