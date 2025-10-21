import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export const prerender = () => {
  return ["/"];
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return(
    <div className="container">
      <h1 className="page-title">Welcome</h1>
      <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem distinctio odit delectus. Consequuntur in fugit suscipit a cum aspernatur hic dolorum praesentium, facere recusandae iusto ea! Accusantium laboriosam voluptatibus vitae!</p>
    </div>
  ) ;
}
