import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="flex justify-center items-center min-h-dvh bg-gray-900 [view-transition-name:home-content]">
      <h1 className="uppercase flex flex-col">
        <span className="text-8xl">Origin</span>
        <span className="text-black bg-white text-4xl text-right">
          Collective
        </span>
      </h1>
    </main>
  );
}
