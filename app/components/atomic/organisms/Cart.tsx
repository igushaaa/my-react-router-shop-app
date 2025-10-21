import { useFetcher, useLoaderData, Link } from "react-router";
import { CartItem, EmptyState, LoadingState } from "../molecules";
import { Text, Button, Card } from "../atoms";

export interface CartProps {
  className?: string;
}

export default function Cart({ className = '' }: CartProps) {
  const { items, total } = useLoaderData<{
    items: {
      id: number;
      quantity: number;
      product: { id: number; name: string; price: number };
    }[];
    total: number;
  }>();

  const checkoutFetcher = useFetcher<{ success?: boolean; orderId?: number; error?: string }>();
  const isProcessing = checkoutFetcher.state === "submitting";

  if (items.length === 0) {
    return (
      <div className={className}>
        <Text as="h1" size="3xl" weight="bold" className="mb-6">
          Your Cart
        </Text>
        <EmptyState
          title="Your cart is empty"
          description="Add some products to get started"
          actionLabel="Continue Shopping"
          onAction={() => window.location.href = '/catalog'}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Text as="h1" size="3xl" weight="bold" className="mb-6">
        Your Cart
      </Text>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      {/* Cart Summary */}
      <Card variant="elevated" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Text size="xl" weight="semibold">
            Total
          </Text>
          <Text size="2xl" weight="bold" color="primary">
            ${total.toFixed(2)}
          </Text>
        </div>

        {/* Checkout Button */}
        <checkoutFetcher.Form method="post" action="/cart/checkout" className="space-y-3">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full"
            disabled={isProcessing}
            isLoading={isProcessing}
          >
            {isProcessing ? "Processing..." : "Proceed to Checkout"}
          </Button>

          {checkoutFetcher.data?.success && (
            <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <Text color="success" weight="medium">
                ✅ Order created successfully! Order ID: {checkoutFetcher.data.orderId}
              </Text>
            </div>
          )}
          
          {checkoutFetcher.data?.error && (
            <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <Text color="danger" weight="medium">
                ❌ {checkoutFetcher.data.error}
              </Text>
            </div>
          )}
        </checkoutFetcher.Form>
      </Card>

      {/* Continue Shopping */}
      <div className="mt-6 text-center">
        <Link to="/catalog">
          <Button variant="secondary">
            ← Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}