import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex justify-center items-center min-h-dvh [view-transition-name:home-content]">
      <h1 className="uppercase flex flex-col">
        <span className="text-8xl font-extralight uppercase">Weave</span>
      </h1>
      <Button>Login</Button>
    </main>
  );
}
