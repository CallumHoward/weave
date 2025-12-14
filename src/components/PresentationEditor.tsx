import { useOthers, useUpdateMyPresence } from "@liveblocks/react";
import { useNavigate } from "@tanstack/react-router";
import { Cursor } from "./Cursor";
import { getCursorColor } from "@/lib/get-user-color";

export function PresentationEditor() {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  const navigate = useNavigate();

  const totalSlides = 10;

  const handleScrollEnd = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const slideWidth = container.clientWidth + 8; // width + gap-2 (8px)
    const activeSlide = Math.round(scrollLeft / slideWidth) + 1;
    navigate({ hash: String(activeSlide), replace: true });
  };

  return (
    <div
      id="canvas"
      className="relative flex flex-1 min-h-0 w-full bg-gray-50 overflow-hidden items-center justify-center"
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
      <div
        id="slides"
        className="@container/slides flex gap-2 overflow-x-auto h-full w-full snap-x snap-mandatory scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
        onScrollEnd={handleScrollEnd}
        role="region"
        aria-label="Slideshow"
        aria-live="polite"
      >
        {Array.from({ length: totalSlides }, (_, i) => (
          <section
            key={i}
            id={(i + 1).toString()}
            className="flex items-center justify-center aspect-4/3 w-full max-h-full shrink-0 snap-center bg-gray-400"
            aria-label={`Slide ${i + 1} of ${totalSlides}`}
            aria-roledescription="slide"
          >
            <p className="text-8xl text-gray-300">{i + 1}</p>
          </section>
        ))}
      </div>

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
