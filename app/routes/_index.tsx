import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import homeStyles from "../styles/home.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our new notes app built with Remix and Javascript</p>
      <p id="cta">
        <Link to="/notes">Go to Notes Page</Link>
      </p>
    </main>
  );
}


export function links() {
  return [
    {
      rel: "stylesheet",
      href: homeStyles,
    },
  ];
}

