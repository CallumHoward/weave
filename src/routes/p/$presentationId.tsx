import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Room } from "@/components/Room";

export const Route = createFileRoute("/p/$presentationId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-1 flex-col gap-8 p-8 md:flex max-w-[1200px] mx-auto">
      <Header title="Presentation Editor" />

      <LiveblocksProvider
        publicApiKey={import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY}
      >
        <RoomProvider id="my-room">
          <ClientSideSuspense fallback={<div>Loading…</div>}>
            <Room />
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    </div>
  );
}
