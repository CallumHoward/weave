import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { createFileRoute } from "@tanstack/react-router";
import type { PresentationItem } from "@/types/presentation-item";
import { Header } from "@/components/Header";
import { PresentationEditor } from "@/components/PresentationEditor";
import { getPresentationById } from "@/data/presentations";

export const Route = createFileRoute("/p/$presentationId")({
  component: RouteComponent,
  loader: async ({
    params,
  }): Promise<{
    presentation?: PresentationItem;
    error?: string;
  }> => {
    const payload = { id: params.presentationId };
    try {
      const data = await getPresentationById({ data: payload });
      return { presentation: data };
    } catch (error) {
      console.error("Error fetching presentation:", error);
      return { presentation: undefined, error: "Failed to load presentation" };
    }
  },
});

function RouteComponent() {
  const { presentation, error } = Route.useLoaderData();

  return (
    <div className="flex-1 flex-col gap-8 p-8 md:flex max-w-[1200px] mx-auto">
      {error || !presentation ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Header title={presentation.name} />
          <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
            <RoomProvider
              id={presentation.id}
              initialPresence={{ cursor: null }}
            >
              <ClientSideSuspense fallback={<div>Loading…</div>}>
                <PresentationEditor />
              </ClientSideSuspense>
            </RoomProvider>
          </LiveblocksProvider>
        </>
      )}
    </div>
  );
}
