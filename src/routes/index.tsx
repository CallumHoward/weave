import { createFileRoute } from "@tanstack/react-router";
import type { PresentationItem } from "@/types/presentation-item";
import { listPresentations } from "@/data/presentations";
import { DataTable, columns } from "@/components";
import { Header } from "@/components/Header";

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
  const navigate = Route.useNavigate();

  const handleRowClick = (row: PresentationItem) => {
    navigate({ to: `/p/${row.id}` });
  };

  return (
    <div className="flex-1 flex-col gap-8 p-8 md:flex max-w-[1200px] mx-auto">
      <Header title="Presentations" />
      <main>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <DataTable
            columns={columns}
            data={presentations}
            onRowClick={handleRowClick}
          />
        )}
      </main>
    </div>
  );
}
