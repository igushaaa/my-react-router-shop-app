import type { ActionFunctionArgs } from "react-router";
import { logout } from "../../auth.server";

// Support both POST (Form submit) and GET (Link click) for logout
export async function action({}: ActionFunctionArgs) {
  return logout();
}

export async function loader() {
  return logout();
}

export default function LogoutRoute() {
  return null;
}
