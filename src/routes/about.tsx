import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex justify-center items-center min-h-dvh bg-black [view-transition-name:left-content]">
      <h1 className="uppercase text-4xl">About</h1>
    </main>
  );
}
