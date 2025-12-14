import { createFileRoute } from "@tanstack/react-router";
import type { PresentationItem } from "@/types/presentation-item";
import { listPresentations } from "@/data/presentations";
import { DataTable, columns } from "@/components";

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
    <>
      <header className="flex items-center justify-between gap-2">
        <h1>Presentations</h1>
      </header>
      <main>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <DataTable columns={columns} data={presentations} />
        )}
      </main>
    </>
  );
}
