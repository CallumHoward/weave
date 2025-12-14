import {
  MousePointer,
  Redo,
  Share,
  SquarePlus,
  Trash2,
  Type,
  Undo,
} from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import type { ComponentPropsWithoutRef } from "react";
import type { ToolMode } from "@/types/tool-modes";

type Props = {
  selectedElementId?: string | null;
  toolMode: ToolMode;
  onClickToolMode: (mode: ToolMode) => void;
} & ComponentPropsWithoutRef<"div">;

export function FormattingToolbar({
  selectedElementId,
  toolMode,
  onClickToolMode,
  className,
  ...props
}: Props) {
  return (
    <div
      role="toolbar"
      aria-label="Formatting toolbar"
      className={`${className} z-10 flex items-center gap-1 px-2 py-1.5 bg-white rounded-lg shadow-lg border border-gray-200`}
      {...props}
    >
      <ButtonGroup role="group" aria-label="Slide">
        <Button
          variant="outline"
          size="icon"
          aria-label="Add slide"
          title="Add slide"
        >
          <SquarePlus />
        </Button>
      </ButtonGroup>

      <ButtonGroup role="group" aria-label="History">
        <Button variant="outline" size="icon" aria-label="Undo" title="Undo">
          <Undo />
        </Button>
        <Button variant="outline" size="icon" aria-label="Redo" title="Redo">
          <Redo />
        </Button>
      </ButtonGroup>

      <ButtonGroup role="group" aria-label="Tools">
        <Button
          variant={toolMode === "select" ? "secondary" : "outline"}
          onClick={() => onClickToolMode("select")}
          size="icon"
          aria-label="Select tool"
          title="Select tool"
        >
          <MousePointer />
        </Button>
        <Button
          variant={toolMode === "text" ? "secondary" : "outline"}
          onClick={() => onClickToolMode("text")}
          size="icon"
          aria-label="Text tool"
          title="Text tool"
        >
          <Type />
        </Button>
        {selectedElementId && (
          <Button
            className="hover:text-red-700 text-red-700"
            variant="outline"
            size="icon"
            aria-label="Delete selection"
            title="Delete selection"
          >
            <Trash2 />
          </Button>
        )}
      </ButtonGroup>

      <ButtonGroup role="group" aria-label="Share">
        <Button variant="outline" size="icon" aria-label="Share" title="Share">
          <Share />
        </Button>
      </ButtonGroup>
    </div>
  );
}
