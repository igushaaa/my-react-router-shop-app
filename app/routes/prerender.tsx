import type { LoaderFunction } from "react-router";

export const prerender = () => {
  return ["/", "/catalog", "/about"];
};

export const loader: LoaderFunction = () => {
  return null;
};

export default function PrerenderPage() {
  return (
    <div>
      <h1>Pre-rendered Pages</h1>
      <p>This page demonstrates pre-rendering functionality.</p>
    </div>
  );
}
