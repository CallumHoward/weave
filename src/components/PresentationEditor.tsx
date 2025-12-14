import { useOthers, useUpdateMyPresence } from "@liveblocks/react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Cursor } from "./Cursor";
import { getCursorColor } from "@/lib/get-user-color";

type Props = {
  initialSlide: number;
};

export function PresentationEditor({ initialSlide }: Props) {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  useEffect(() => {
    navigate({ hash: String(currentSlide), replace: true });
    updateMyPresence({ slide: currentSlide });
  }, [currentSlide, navigate, updateMyPresence]);

  const totalSlides = 10;

  const handleScrollEnd = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const slideWidth = container.clientWidth + 8; // width + gap-2 (8px)
    const activeSlide = Math.round(scrollLeft / slideWidth) + 1;
    setCurrentSlide(activeSlide);
  };

  return (
    <div
      id="canvas"
      className="flex flex-1 min-h-0 w-full bg-gray-50 overflow-hidden items-center justify-center"
    >
      <div
        id="slides"
        className="relative flex gap-2 overflow-x-auto overflow-y-hidden h-full w-full snap-x snap-mandatory scroll-smooth"
        onScrollEnd={handleScrollEnd}
        role="region"
        aria-label="Slideshow"
        aria-live="polite"
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

        {others
          .filter(({ presence }) => presence.slide === currentSlide)
          .map(({ connectionId, presence, id }) =>
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
    </div>
  );
}
