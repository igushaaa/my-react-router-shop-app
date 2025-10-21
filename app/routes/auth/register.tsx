import { Form, redirect, useActionData } from "react-router";
import { PrismaClient } from "@prisma/client";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "node:util";

const prisma = new PrismaClient() as any;
const scrypt = promisify(_scrypt) as (password: string | Buffer, salt: string | Buffer, keylen: number) => Promise<Buffer>;

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const name = String(formData.get("name") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // Перевірка, чи існує користувач
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "User already exists." };

  // Хешування пароля (scrypt)
  const salt = randomBytes(16).toString("hex");
  const buf = await scrypt(password, salt, 64);
  const hash = `${salt}:${buf.toString("hex")}`;

  await prisma.user.create({
    data: { email, name, password: hash },
  });

  return redirect("/auth/login");
}

export default function RegisterPage() {
  const data = useActionData<{ error?: string }>();

  return (
    <main className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Create Account</h1>
      {data?.error && <p className="text-red-500 mb-3">{data.error}</p>}

      <Form method="post" className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name (optional)"
          className="w-full border p-2 rounded"
        />
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
          Register
        </button>
      </Form>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </main>
  );
}
