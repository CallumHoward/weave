import { useOthers, useUpdateMyPresence } from "@liveblocks/react";
import { Cursor } from "./Cursor";
import { getCursorColor } from "@/lib/get-user-color";

export function PresentationEditor() {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();

  return (
    <div
      className="flex-1 min-h-0 w-full bg-gray-50"
      onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
      }
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
