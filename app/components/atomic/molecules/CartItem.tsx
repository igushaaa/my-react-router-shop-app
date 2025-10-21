import { useFetcher } from "react-router";
import { Button, Text, Card } from "../atoms";

export interface CartItemProps {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  className?: string;
}

export default function CartItem({ 
  id, 
  product, 
  quantity, 
  className = '' 
}: CartItemProps) {
  const fetcher = useFetcher();
  const isProcessing = fetcher.state === "submitting";

  const totalPrice = product.price * quantity;

  return (
    <Card variant="outlined" className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <Text as="h3" size="lg" weight="semibold" className="truncate">
            {product.name}
          </Text>
          <Text size="sm" color="muted">
            ${product.price.toFixed(2)} each
          </Text>
        </div>
        
        <div className="flex items-center space-x-3 ml-4">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <fetcher.Form method="post" className="inline">
              <input type="hidden" name="id" value={id} />
              <Button 
                name="intent" 
                value="decrease" 
                size="sm"
                variant="secondary"
                disabled={isProcessing || quantity <= 1}
              >
                −
              </Button>
            </fetcher.Form>

            <Text size="lg" weight="medium" className="min-w-[2rem] text-center">
              {quantity}
            </Text>

            <fetcher.Form method="post" className="inline">
              <input type="hidden" name="id" value={id} />
              <Button 
                name="intent" 
                value="increase" 
                size="sm"
                variant="secondary"
                disabled={isProcessing}
              >
                +
              </Button>
            </fetcher.Form>
          </div>

          {/* Total Price */}
          <Text size="lg" weight="bold" className="min-w-[4rem] text-right">
            ${totalPrice.toFixed(2)}
          </Text>

          {/* Remove Button */}
          <fetcher.Form method="post" className="inline">
            <input type="hidden" name="id" value={id} />
            <Button 
              name="intent" 
              value="delete" 
              size="sm"
              variant="danger"
              disabled={isProcessing}
            >
              Remove
            </Button>
          </fetcher.Form>
        </div>
      </div>
    </Card>
  );
}