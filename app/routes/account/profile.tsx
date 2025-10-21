import { useLoaderData, useFetcher } from "react-router";
import { getUser } from "../../auth.server";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Profile Settings - React Router Shop" },
    { name: "description", content: "Update your profile information" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export async function loader({ request }: { request: Request }) {
  const user = await getUser(request);
  
  if (!user) {
    throw new Response("Not authenticated", { status: 401 });
  }

  return { user };
}

export async function clientLoader({ serverLoader }: { serverLoader: () => Promise<any> }) {
  // Client-side loader для швидкого доступу до даних
  const data = await serverLoader();
  return data;
}

export async function clientAction({ request, serverAction }: { 
  request: Request; 
  serverAction: (request: Request) => Promise<Response> 
}) {
  // Client-side action для оновлення профілю без серверного reload
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "updateProfile") {
    // Відправляємо на сервер
    const response = await serverAction(request);
    
    if (response.ok) {
      // Оновлюємо локальний стан (опціонально)
      console.log("Profile updated successfully!");
    }
    
    return response;
  }

  return new Response("Invalid action", { status: 400 });
}

export async function action({ request }: { request: Request }) {
  const user = await getUser(request);
  
  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const intent = formData.get("intent");
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (intent === "updateProfile") {
    // Тут можна додати валідацію та оновлення в базі даних
    // Поки що просто повертаємо успіх
    return Response.json({ 
      success: true, 
      message: "Profile updated successfully!",
      user: { ...user, name, email }
    });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}

export default function ProfilePage() {
  const { user } = useLoaderData<{
    user: {
      id: number;
      email: string;
      name: string | null;
    };
  }>();

  const fetcher = useFetcher<{
    success?: boolean;
    message?: string;
    error?: string;
  }>();

  const isSubmitting = fetcher.state === "submitting";

  return (
    <section>
      <h2 className="text-lg font-medium mb-6">Profile Settings</h2>
      
      <div className="max-w-md">
        <fetcher.Form method="post" className="space-y-4">
          <input type="hidden" name="intent" value="updateProfile" />
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </fetcher.Form>

        {/* Повідомлення про результат */}
        {fetcher.data?.success && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
            ✅ {fetcher.data.message}
          </div>
        )}
        {fetcher.data?.error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
            ❌ {fetcher.data.error}
          </div>
        )}
      </div>
    </section>
  );
}
