import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex justify-center items-center min-h-dvh bg-black [view-transition-name:right-content]">
      <h1 className="uppercase text-4xl">Gallery</h1>
    </main>
  );
}
