import type { ActionFunctionArgs } from "react-router";
import { PrismaClient } from "@prisma/client";
import { getUser } from "../../auth.server";
import { redirect } from "react-router";

const prisma = new PrismaClient() as any;

export async function action({ request }: ActionFunctionArgs) {
  try {
    // 1️⃣ Отримуємо користувача із сесії
    const user = await getUser(request);
    if (!user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2️⃣ Отримуємо всі товари з кошика КОНКРЕТНОГО користувача
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 3️⃣ Створюємо замовлення
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        items: {
          create: cartItems.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      },
    });

    // 4️⃣ Очищаємо кошик КОНКРЕТНОГО користувача
    await prisma.cartItem.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // 5️⃣ Перенаправляємо на сторінку замовлень
    return redirect("/account/orders");
  } catch (err) {
    console.error("Checkout failed:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}