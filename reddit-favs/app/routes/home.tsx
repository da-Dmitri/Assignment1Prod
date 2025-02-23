import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { CustomTabLayout } from "../views/tablayout";
import { TitleBar } from "../views/titlebar";

export function meta({}: Route.MetaArgs) {
return [
    { title: "Reddit Faves App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main>
        <TitleBar/>
        <CustomTabLayout/>
    </main>
  );
}

