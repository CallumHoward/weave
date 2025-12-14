import { useMutation, useOthers, useSelf, useStorage } from "@liveblocks/react";
import { useEffect, useState } from "react";
import { Textarea as BaseTextarea } from "./ui/textarea";
import type { RefObject } from "react";
import type { ToolMode } from "@/types/tool-modes";
import { getCursorColor } from "@/lib/get-user-color";

type Props = {
  id: string;
  containerRef: RefObject<HTMLDivElement | null>;
  toolMode: ToolMode;
  currentSlide: number;
  onPointerDown: (
    e: React.PointerEvent<HTMLTextAreaElement>,
    id: string,
  ) => void;
  onBlur: () => void;
};

export function Textarea({
  id,
  containerRef,
  toolMode,
  currentSlide,
  onPointerDown,
  onBlur,
}: Props) {
  const { x, y, content, slide } =
    useStorage((root) => root.textAreas.get(id)) ?? {};
  const isSelectedByMe = useSelf((me) => me.presence.selectedTextAreaId === id);
  const otherUserWithSelection = useOthers((others) =>
    others.find((other) => other.presence.selectedTextAreaId === id),
  );
  const [containerDimensions, setContainerDimensions] = useState({
    width: 1,
    height: 1,
  });

  const updateContent = useMutation(
    ({ storage }, newContent: string) => {
      const textArea = storage.get("textAreas").get(id);
      if (textArea) {
        textArea.set("content", newContent);
      }
    },
    [id],
  );

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

  if (slide !== currentSlide) {
    return;
  }

  const borderColor = otherUserWithSelection
    ? `var(${getCursorColor(otherUserWithSelection.id)})`
    : isSelectedByMe
      ? undefined
      : "transparent";

  return (
    <BaseTextarea
      className={`absolute w-fit select-none ${toolMode === "select" ? "cursor-move" : ""} ${isSelectedByMe && !otherUserWithSelection ? "" : otherUserWithSelection ? "border-2" : "border-transparent focus:border-input"}`}
      style={{
        transform: `translate(${scaledX}px, ${scaledY}px)`,
        borderColor,
      }}
      onPointerDown={(e) => onPointerDown(e, id)}
      onClick={(e) => e.stopPropagation()}
      onBlur={onBlur}
      onChange={(e) => updateContent(e.target.value)}
      placeholder="Your text here"
      readOnly={toolMode !== "text"}
      value={content ?? ""}
    />
  );
}
