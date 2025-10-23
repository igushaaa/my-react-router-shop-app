import { Text, Badge, Card } from "../atoms";

export interface OrderItemProps {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  status?: 'pending' | 'confirmed' | 'cancelled';
  className?: string;
}

export default function OrderItem({ 
  id, 
  product, 
  quantity, 
  status = 'pending',
  className = '' 
}: OrderItemProps) {
  const totalPrice = product.price * quantity;

  const statusConfig = {
    pending: { variant: 'warning' as const, label: 'Pending' },
    confirmed: { variant: 'success' as const, label: 'Confirmed' },
    cancelled: { variant: 'danger' as const, label: 'Cancelled' }
  };

  const statusInfo = statusConfig[status];

  return (
    <Card variant="outlined" className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Text as="h3" size="lg" weight="semibold" className="truncate">
              {product.name}
            </Text>
            <Badge variant={statusInfo.variant} size="sm">
              {statusInfo.label}
            </Badge>
          </div>
          <Text size="sm" color="muted">
            ${product.price.toFixed(2)} × {quantity}
          </Text>
        </div>
        
        <div className="text-right ml-4">
          <Text size="lg" weight="bold">
            ${totalPrice.toFixed(2)}
          </Text>
        </div>
      </div>
    </Card>
  );
}