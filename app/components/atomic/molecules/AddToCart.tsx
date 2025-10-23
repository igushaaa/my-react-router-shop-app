import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";
import { Button, Text } from "../atoms";

export interface AddToCartProps {
  productId: number;
  variant?: 'default' | 'compact' | 'full';
  className?: string;
}

export default function AddToCart({ 
  productId, 
  variant = 'default',
  className = '' 
}: AddToCartProps) {
  const fetcher = useFetcher<{ success?: boolean; error?: string }>();
  const [justAdded, setJustAdded] = useState(false);

  const isSubmitting = fetcher.state === "submitting";
  const isIdle = fetcher.state === "idle";

  // When request finishes successfully, show quick feedback
  useEffect(() => {
    if (isIdle && fetcher.data?.success) {
      setJustAdded(true);
      const t = setTimeout(() => setJustAdded(false), 1200);
      return () => clearTimeout(t);
    }
  }, [isIdle, fetcher.data?.success]);

  const label = useMemo(() => {
    if (isSubmitting) return "Adding...";
    if (justAdded) return "Added!";
    return "Add to Cart";
  }, [isSubmitting, justAdded]);

  const buttonSize = variant === 'compact' ? 'sm' : 'md';
  const buttonVariant = justAdded ? 'success' : 'primary';

  return (
    <div className={className}>
      <fetcher.Form method="post" action="/cart/add">
        <input type="hidden" name="productId" value={productId} />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          size={buttonSize}
          variant={buttonVariant}
          isLoading={isSubmitting}
          className="w-full"
        >
          {label}
        </Button>
      </fetcher.Form>
      
      {fetcher.data?.error && (
        <Text size="sm" color="danger" className="mt-1">
          Failed: {fetcher.data.error}
        </Text>
      )}
    </div>
  );
}