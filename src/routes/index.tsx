import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="flex justify-center items-center min-h-dvh [view-transition-name:home-content]">
      <h1 className="uppercase flex flex-col">
        <span className="text-8xl font-extralight uppercase">Weave</span>
      </h1>
    </main>
  );
}
