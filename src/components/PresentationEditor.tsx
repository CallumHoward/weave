import { useOthers, useUpdateMyPresence } from "@liveblocks/react";
import { Cursor } from "./Cursor";
import { getCursorColor } from "@/lib/get-user-color";

export function PresentationEditor() {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();

  return (
    <div
      className="relative flex-1 min-h-0 w-full bg-gray-50 overflow-hidden"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        updateMyPresence({
          cursor: {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          },
        });
      }}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {others.map(({ connectionId, presence, id }) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            color={getCursorColor(id)}
          />
        ) : null,
      )}
    </div>
  );
}
