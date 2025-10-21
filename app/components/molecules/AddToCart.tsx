import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";
import { Button } from "../atomic/atoms";

export default function AddToCart({ productId }: { productId: number }) {
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

  return (
    <fetcher.Form method="post" action="/cart/add">
      <input type="hidden" name="productId" value={productId} />
      <Button type="submit" disabled={isSubmitting}>
        {label}
      </Button>
      {fetcher.data?.error && (
        <span className="error-text">Failed: {fetcher.data.error}</span>
      )}
    </fetcher.Form>
  );
}