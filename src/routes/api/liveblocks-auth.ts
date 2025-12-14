import { createFileRoute } from "@tanstack/react-router";
import { Liveblocks } from "@liveblocks/node";

export const Route = createFileRoute("/api/liveblocks-auth")({
  server: {
    handlers: {
      POST: async () => {
        const liveblocks = new Liveblocks({
          secret: process.env.LIVEBLOCKS_SECRET_KEY!,
        });

        // TODO get user from DB
        const user = { id: "user1", organization: "org1", metadata: {} };

        const session = liveblocks.prepareSession(
          user.id,
          { userInfo: user.metadata }, // Optional
        );

        // TODO define permissions
        session.allow("*", session.FULL_ACCESS);

        const { status, body } = await session.authorize();
        return new Response(body, { status });
      },
    },
  },
});
