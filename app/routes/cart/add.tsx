import type { ActionFunctionArgs } from "react-router";
import { PrismaClient } from "@prisma/client";
import { getUser } from "../../auth.server";

const prisma = new PrismaClient() as any;

export async function action({ request }: ActionFunctionArgs) {
  try {
    // Отримуємо користувача
    const user = await getUser(request);
    if (!user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await request.formData();
    const productId = Number(formData.get("productId"));

    if (Number.isNaN(productId) || productId <= 0) {
      return Response.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const existing = await prisma.cartItem.findFirst({
      where: { 
        productId,
        userId: user.id,
      },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: { 
          productId, 
          quantity: 1,
          userId: user.id,
        },
      });
    }

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to add to cart", detail: String(error?.message ?? error) },
      { status: 500 }
    );
  }
}