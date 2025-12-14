import {
  MousePointer,
  Redo,
  Share,
  SquareChevronLeft,
  SquareChevronRight,
  SquarePlus,
  Trash2,
  Type,
  Undo,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import type { ComponentPropsWithoutRef } from "react";
import type { ToolMode } from "@/types/tool-modes";

type Props = {
  selectedElementId?: string | null;
  toolMode: ToolMode;
  onClickToolMode: (mode: ToolMode) => void;
  onClickDeleteSelection: () => void;
  currentSlide: number;
  totalSlides: number;
} & ComponentPropsWithoutRef<"div">;

export function FormattingToolbar({
  selectedElementId,
  toolMode,
  onClickToolMode,
  onClickDeleteSelection,
  currentSlide,
  totalSlides,
  className,
  ...props
}: Props) {
  return (
    <div
      role="toolbar"
      aria-label="Formatting toolbar"
      className={`${className} z-10 flex items-center gap-2 px-2 py-1.5 bg-white rounded-lg shadow-lg border border-gray-200`}
      {...props}
    >
      <Button
        variant="outline"
        disabled={currentSlide === 1}
        size="icon"
        aria-label="Previous slide"
        title="Previous slide"
        {...(currentSlide === 1 ? {} : { asChild: true })}
      >
        {currentSlide === 1 ? (
          <SquareChevronLeft />
        ) : (
          <Link to="." hash={String(currentSlide - 1)}>
            <SquareChevronLeft />
          </Link>
        )}
      </Button>
      <p className="px-2 text-sm">
        {currentSlide} / {totalSlides}
      </p>
      <Button
        variant="outline"
        disabled={currentSlide >= totalSlides}
        size="icon"
        aria-label="Next slide"
        title="Next slide"
        {...(currentSlide >= totalSlides ? {} : { asChild: true })}
      >
        {currentSlide >= totalSlides ? (
          <SquareChevronRight />
        ) : (
          <Link to="." hash={String(currentSlide + 1)}>
            <SquareChevronRight />
          </Link>
        )}
      </Button>

      <div className="text-gray-300 text-1xl">|</div>

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
            onClick={onClickDeleteSelection}
          >
            <Trash2 />
          </Button>
        )}
      </ButtonGroup>

      <ButtonGroup role="group" aria-label="Share">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            navigator.clipboard.writeText(globalThis.location.href);
            toast.success("Share-able link copied to clipboard");
          }}
          aria-label="Share"
          title="Share"
        >
          <Share />
        </Button>
      </ButtonGroup>
    </div>
  );
}
