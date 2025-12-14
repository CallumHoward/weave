import { useStorage } from "@liveblocks/react";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import type { ToolMode } from "@/types/tool-modes";

type Props = {
  id: string;
  containerRef: RefObject<HTMLDivElement | null>;
  toolMode: ToolMode;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>, id: string) => void;
};

export function Textarea({ id, containerRef, toolMode, onPointerDown }: Props) {
  const { x, y, content } = useStorage((root) => root.textAreas.get(id)) ?? {};
  const [containerDimensions, setContainerDimensions] = useState({
    width: 1,
    height: 1,
  });

  useEffect(() => {
    const slidesElement = containerRef.current;

    if (!slidesElement) return;

    const updateDimensions = () => {
      const rect = slidesElement.getBoundingClientRect();
      setContainerDimensions({ width: rect.width, height: rect.height });
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(slidesElement);
    updateDimensions();

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  const scaledX = (x ?? 0) * containerDimensions.width;
  const scaledY = (y ?? 0) * containerDimensions.height;

  return (
    <div
      className={`absolute select-none ${toolMode === "select" ? "cursor-move" : ""}`}
      style={{ transform: `translate(${scaledX}px, ${scaledY}px)` }}
      onPointerDown={(e) => onPointerDown(e, id)}
      contentEditable={false}
    >
      {content}
    </div>
  );
}
