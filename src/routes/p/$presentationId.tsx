import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { LiveMap } from "@liveblocks/client";
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
  const location = useLocation();

  const slide = Number.parseInt(location.hash.replace("#", "")) || 1;

  return (
    <div className="flex flex-1 flex-col gap-8 p-8 w-full max-w-[1200px]">
      {error || !presentation ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Header title={presentation.name} backTo="/" />
          <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
            <RoomProvider
              id={presentation.id}
              initialPresence={{
                cursor: null,
                slide,
                selectedTextAreaId: null,
              }}
              initialStorage={{ textAreas: new LiveMap() }}
            >
              <ClientSideSuspense fallback={<div>Loading…</div>}>
                <PresentationEditor initialSlide={slide} />
              </ClientSideSuspense>
            </RoomProvider>
          </LiveblocksProvider>
        </>
      )}
    </div>
  );
}
