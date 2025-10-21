export function loader() {
    throw new Response("Not found", { status: 404 });
  }
  export default function NotFound() {
    return <h1>404 - Not Found</h1>;
  }
  