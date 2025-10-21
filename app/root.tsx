import {
  Links,
  Meta,
  Outlet,
  NavLink,
  ScrollRestoration,
  Scripts,
} from "react-router";
import "./app.css";

import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center text-red-600">
        <h1 className="text-4xl font-bold">{error.status}</h1>
        <p className="mt-2 text-lg">{error.statusText}</p>
        <p className="mt-1">{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center text-red-600">
        <h1 className="text-3xl font-bold">Unexpected Error</h1>
        <p className="mt-2">{error.message}</p>
        <pre className="bg-gray-100 text-left p-4 rounded mt-4">
          {error.stack}
        </pre>
      </div>
    );
  } else {
    return (
      <div className="text-center text-red-600 mt-20">
        Unknown error occurred.
      </div>
    );
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/account">Account</NavLink>
        </nav>

        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// Глобальний fallback при гідратації
export function HydrateFallback() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-gray-500">
      <div className="animate-pulse text-lg font-medium">
        Loading page...
      </div>
    </div>
  );
}