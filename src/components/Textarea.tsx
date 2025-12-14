import { useStorage } from "@liveblocks/react";

type Props = {
  id: string;
  onPointerDown: (
    e: React.PointerEvent<HTMLTextAreaElement>,
    id: string,
  ) => void;
};

export function Textarea({ id, onPointerDown }: Props) {
  const { x, y, content } = useStorage((root) => root.textAreas.get(id)) ?? {};

  return (
    <textarea
      className="absolute"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      value={content}
      onPointerDown={(e) => onPointerDown(e, id)}
      readOnly
    />
  );
}
