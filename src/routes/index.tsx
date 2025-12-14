import { createFileRoute } from "@tanstack/react-router";
import type { PresentationItem } from "@/types/presentation-item";
import { listPresentations } from "@/data/presentations";
import { DataTable, columns } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/")({
  component: App,
  loader: async (): Promise<{
    presentations: Array<PresentationItem>;
    error?: string;
  }> => {
    try {
      const data = await listPresentations();
      return { presentations: data };
    } catch (error) {
      console.error("Error fetching presentations:", error);
      return { presentations: [], error: "Failed to load presentations" };
    }
  },
});

function App() {
  const { presentations, error } = Route.useLoaderData();

  return (
    <div className="flex-1 flex-col gap-8 p-8 md:flex max-w-[1200px] mx-auto">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-2xl">Presentations</h1>
        <button>
          <Avatar>
            <AvatarImage src="https://github.com/CallumHoward.png" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
        </button>
      </header>
      <main>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <DataTable columns={columns} data={presentations} />
        )}
      </main>
    </div>
  );
}
