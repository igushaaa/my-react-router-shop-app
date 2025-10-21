import { Form, redirect, useActionData } from "react-router";
import { PrismaClient } from "@prisma/client";
import { scrypt as _scrypt, timingSafeEqual } from "crypto";
import { promisify } from "node:util";

// Cookie-сховище для сесії
import { sessionCookie } from "../../auth.server";

const prisma = new PrismaClient() as any;
const scrypt = promisify(_scrypt) as (password: string | Buffer, salt: string | Buffer, keylen: number) => Promise<Buffer>;

// використовуємо вже сконфігурований cookie з auth.server

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "User not found." };

  // Перевіряємо пароль (scrypt)
  const [salt, keyHex] = String(user.password).split(":");
  if (!salt || !keyHex) return { error: "Invalid password." };
  const derived = await scrypt(password, salt, 64);
  const key = Buffer.from(keyHex, "hex");
  const valid = timingSafeEqual(derived, key);
  if (!valid) return { error: "Invalid password." };

  // створюємо cookie із userId
  const cookieHeader = await sessionCookie.serialize({ userId: user.id });

  return redirect("/account", {
    headers: { "Set-Cookie": cookieHeader },
  });
}

export async function loader() {
  // якщо користувач вже залогінений — редіректимо
  return null;
}

export default function LoginPage() {
  const data = useActionData<{ error?: string }>();

  return (
    <main className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Log In</h1>
      {data?.error && <p className="text-red-500 mb-3">{data.error}</p>}

      <Form method="post" className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Log In
        </button>
      </Form>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Don’t have an account?{" "}
        <a href="/auth/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </main>
  );
}