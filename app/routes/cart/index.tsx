import { PrismaClient } from "@prisma/client";
import { useFetcher, useLoaderData, Link } from "react-router";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import type { MetaFunction } from "react-router";

const prisma = new PrismaClient() as any;

export const meta: MetaFunction = () => {
  return [
    { title: "Shopping Cart - React Router Shop" },
    { name: "description", content: "Review your items and proceed to checkout" },
    { name: "robots", content: "noindex, nofollow" }, // Private page
  ];
};

export async function loader({ request }: { request: Request }) {
  // Отримуємо користувача для фільтрації
  const { getUser } = await import("../../auth.server");
  const user = await getUser(request);
  
  if (!user) {
    return { items: [], total: 0 };
  }

  const items = await prisma.cartItem.findMany({
    where: {
      userId: user.id,
    },
    include: { product: true },
  });

  let total = 0;
  for (const item of items as Array<{ quantity: number; product: { price: number } }>) {
    total += item.product.price * item.quantity;
  }

  return { items, total };
}

export async function action({ request }: { request: Request }) {
  // Отримуємо користувача для перевірки
  const { getUser } = await import("../../auth.server");
  const user = await getUser(request);
  
  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = Number(formData.get("id"));

  if (!id || Number.isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  // Перевіряємо, що товар належить поточному користувачу
  const item = await prisma.cartItem.findFirst({
    where: { id, userId: user.id },
  });

  if (!item) {
    return Response.json({ error: "Item not found" }, { status: 404 });
  }

  if (intent === "delete") {
    await prisma.cartItem.delete({ where: { id } });
  }

  if (intent === "increase") {
    await prisma.cartItem.update({
      where: { id },
      data: { quantity: { increment: 1 } },
    });
  }

  if (intent === "decrease") {
    if (item.quantity > 1) {
      await prisma.cartItem.update({
        where: { id },
        data: { quantity: { decrement: 1 } },
      });
    } else {
      await prisma.cartItem.delete({ where: { id } });
    }
  }

  return Response.json({ success: true });
}

export default function CartPage() {
  const { items, total } = useLoaderData<{
    items: {
      id: number;
      quantity: number;
      product: { id: number; name: string; price: number };
    }[];
    total: number;
  }>();

  const fetcher = useFetcher();
  const checkoutFetcher = useFetcher<{ success?: boolean; orderId?: number; error?: string }>();
  const isProcessing = checkoutFetcher.state === "submitting";

  if (items.length === 0) {
    return (
      <main className="cart-container">
        <h1 className="cart-header">Your Cart</h1>
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <p className="mt-3">
            <Link to="/catalog" className="cart-button">
              ← Continue Shopping
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-container">
      <h1 className="cart-header">Your Cart</h1>

      <section className="cart-list">
        {items.map((i) => (
          <div className="cart-item" key={i.id}>
            <div>
              <div className="cart-item-title">{i.product.name}</div>
              <div className="cart-item-price">
                ${i.product.price} × {i.quantity}
              </div>
            </div>
            <div>
              <fetcher.Form method="post" className="inline">
                <input type="hidden" name="id" value={i.id} />
                <button name="intent" value="decrease" className="cart-qty-btn">
                  –
                </button>
              </fetcher.Form>

              <span className="qty-sep">{i.quantity}</span>

              <fetcher.Form method="post" className="inline">
                <input type="hidden" name="id" value={i.id} />
                <button name="intent" value="increase" className="cart-qty-btn">
                  +
                </button>
              </fetcher.Form>

              <fetcher.Form method="post" className="inline">
                <input type="hidden" name="id" value={i.id} />
                <button name="intent" value="delete" className="cart-remove-btn">
                  Remove
                </button>
              </fetcher.Form>
            </div>
          </div>
        ))}
      </section>

      <div className="cart-total-row">
        <div className="cart-total">Total: ${total}</div>
      </div>

      {/* Checkout Button */}
      <checkoutFetcher.Form method="post" action="/cart/checkout" className="mt-5">
        <button type="submit" className="cart-button" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Checkout"}
        </button>

        {checkoutFetcher.data?.success && (
          <p className="text-green-600 mt-3">
            ✅ Order created! ID: {checkoutFetcher.data.orderId}
          </p>
        )}
        {checkoutFetcher.data?.error && (
          <p className="error-text mt-3">❌ {checkoutFetcher.data.error}</p>
        )}
      </checkoutFetcher.Form>

      <p className="mt-5">
        <Link to="/catalog" className="cart-button">
          ← Continue Shopping
        </Link>
      </p>
    </main>
  );
}

export { ErrorBoundary };

export function HydrateFallback() {
  return (
    <main className="cart-container">
      <h1 className="cart-header">Your Cart</h1>
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading cart...</span>
      </div>
    </main>
  );
}