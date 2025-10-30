import { PageLayout } from "../templates";

export interface AccountProfilePageProps {
  defaultName: string;
  defaultEmail: string;
  isSubmitting?: boolean;
  FormComponent: React.ComponentType<React.ComponentProps<'form'> & { method?: "get" | "post" }>;
}

export default function AccountProfilePage({
  defaultName,
  defaultEmail,
  isSubmitting = false,
  FormComponent,
}: AccountProfilePageProps) {
  return (
    <PageLayout title="Profile Settings">
      <div className="max-w-md">
        <FormComponent method="post" className="space-y-4">
          <input type="hidden" name="intent" value="updateProfile" />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={defaultName}
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
              defaultValue={defaultEmail}
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
        </FormComponent>
      </div>
    </PageLayout>
  );
}


