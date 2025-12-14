import { useStorage } from "@liveblocks/react";

type Props = {
  id: string;
  containerDimensions: { width: number; height: number };
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>, id: string) => void;
};

export function Textarea({ id, containerDimensions, onPointerDown }: Props) {
  const { x, y, content } = useStorage((root) => root.textAreas.get(id)) ?? {};
  const scaledX = (x ?? 0) * containerDimensions.width;
  const scaledY = (y ?? 0) * containerDimensions.height;

  return (
    <div
      className="absolute select-none"
      style={{ transform: `translate(${scaledX}px, ${scaledY}px)` }}
      onPointerDown={(e) => onPointerDown(e, id)}
      contentEditable={false}
    >
      {content}
    </div>
  );
}
