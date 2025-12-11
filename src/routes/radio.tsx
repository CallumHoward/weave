import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/radio")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex justify-center items-center min-h-dvh bg-black [view-transition-name:bottom-content]">
      <h1 className="uppercase text-4xl">Radio</h1>
    </main>
  );
}
