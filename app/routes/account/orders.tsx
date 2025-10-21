import { PrismaClient } from "@prisma/client";
import { useLoaderData, useFetcher } from "react-router";
import { getUser } from "../../auth.server";

const prisma = new PrismaClient() as any;

export async function loader({ request }: { request: Request }) {
  const user = await getUser(request);
  
  if (!user) {
    return { orders: [] };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { orders };
}

export async function action({ request }: { request: Request }) {
  const user = await getUser(request);
  
  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const intent = formData.get("intent");
  const orderId = Number(formData.get("orderId"));

  if (intent === "cancel" && orderId) {
    // Перевіряємо, що замовлення належить поточному користувачу
    const order = await prisma.order.findFirst({
      where: { 
        id: orderId, 
        userId: user.id,
        status: "pending" // можна скасувати тільки pending замовлення
      },
    });

    if (!order) {
      return Response.json({ error: "Order not found or cannot be cancelled" }, { status: 404 });
    }

    // Оновлюємо статус замовлення
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "cancelled" },
    });

    return Response.json({ success: true });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}

export default function OrdersPage() {
  const { orders } = useLoaderData<{
    orders: Array<{
      id: number;
      status: string;
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
    }>;
  }>();

  const fetcher = useFetcher();

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-medium mb-3">Your Orders</h2>
        <p className="text-gray-500">You have no orders yet.</p>
      </section>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <section>
      <h2 className="text-lg font-medium mb-3">Your Orders</h2>
      
      <div className="space-y-4">
        {orders.map((order) => {
          const total = order.items.reduce((sum, item) => 
            sum + (item.product.price * item.quantity), 0
          );
          
          return (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Кнопка скасування для pending замовлень */}
              {order.status === "pending" && (
                <div className="mt-4 pt-3 border-t">
                  <fetcher.Form method="post" className="inline">
                    <input type="hidden" name="intent" value="cancel" />
                    <input type="hidden" name="orderId" value={order.id} />
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      disabled={fetcher.state === "submitting"}
                    >
                      {fetcher.state === "submitting" ? "Cancelling..." : "Cancel Order"}
                    </button>
                  </fetcher.Form>
                </div>
              )}

              {/* Повідомлення про результат */}
              {fetcher.data?.success && (
                <div className="mt-3 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
                  ✅ Order cancelled successfully!
                </div>
              )}
              {fetcher.data?.error && (
                <div className="mt-3 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
                  ❌ {fetcher.data.error}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
