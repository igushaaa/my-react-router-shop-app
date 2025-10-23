import { Outlet, Link, useLoaderData } from "react-router";
import { getUser } from "../../auth.server";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export async function loader({ request }: { request: Request }) {
  const user = await getUser(request);
  if (!user) {
    // ✅ правильний redirect із абсолютним URL
    return Response.redirect(new URL("/auth/login", request.url));
  }
  return { user };
}

export default function AccountLayout() {
  const data = useLoaderData<{ user?: { email: string; name?: string } }>();
  const user = data?.user;

  if (!user) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading user...
      </p>
    );
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <nav className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Account – {user.name || user.email}
        </h1>
        <div className="space-x-4">
          <Link to="/account" className="text-blue-600 hover:underline">
            Profile
          </Link>
          <Link to="/account/orders" className="text-blue-600 hover:underline">
            Orders
          </Link>
          <Link to="/auth/logout" className="text-red-500 hover:underline">
            Logout
          </Link>
        </div>
      </nav>
      <Outlet />
    </main>
  );
}

export { ErrorBoundary };

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg animate-pulse">
        Loading account...
      </p>
    </div>
  );
}