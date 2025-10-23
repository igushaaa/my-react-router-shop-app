import { createCookie } from "react-router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sessionCookie = createCookie("session", {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 днів
});

export async function getUser(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await sessionCookie.parse(cookieHeader)) || {};
  if (!cookie.userId) return null;

  return prisma.user.findUnique({ where: { id: cookie.userId } });
}

// Middleware-style helper to require authentication
export async function requireAuth(request: Request) {
  const user = await getUser(request);
  if (!user) {
    throw Response.redirect(new URL("/auth/login", request.url));
  }
  return user;
}

// 🧹 Вихід (logout)
export async function logout() {
  const expired = await sessionCookie.serialize("", { maxAge: 0 });
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/auth/login",
      "Set-Cookie": expired,
    },
  });
}