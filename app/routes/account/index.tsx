import { useLoaderData } from "react-router";
import { getUser } from "../../auth.server";

export async function loader({ request }: { request: Request }) {
  const user = await getUser(request);
  if (!user) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
  return { user };
}

export default function AccountHome() {
  const data = useLoaderData<{ user: { email: string; name?: string } }>();
  const user = data.user;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
      <p>
        You’re logged in as{" "}
        <span className="font-medium">{user.name || user.email}</span>.
      </p>
    </section>
  );
}