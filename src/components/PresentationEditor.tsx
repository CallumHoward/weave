import {
  useHistory,
  useMutation,
  useOthers,
  useSelf,
  useStorage,
  useUpdateMyPresence,
} from "@liveblocks/react";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { LiveObject } from "@liveblocks/client";
import { Cursor } from "./Cursor";
import { FormattingToolbar } from "./FormattingToolbar";
import { Textarea } from "./Textarea";
import type { ToolMode } from "@/types/tool-modes";
import { getCursorColor } from "@/lib/get-user-color";

type Props = {
  initialSlide: number;
};

export function PresentationEditor({ initialSlide }: Props) {
  // Liveblocks hooks
  const history = useHistory();
  const others = useOthers();
  const selectedByMe = useSelf((me) => me.presence.selectedTextAreaId);
  const updateMyPresence = useUpdateMyPresence();
  const textAreaIds = useStorage((root) => [...root.textAreas.keys()]);

  // Tanstack Router hooks
  const navigate = useNavigate();

  // Component local state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [toolMode, setToolMode] = useState<ToolMode>("select");
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [slidesDimensions, setSlidesDimensions] = useState({
    width: 1,
    height: 1,
  });

  const slidesRef = useRef<HTMLDivElement>(null);

  // Sync current slide with URL hash and presence
  useEffect(() => {
    navigate({ hash: String(currentSlide), replace: true });
    updateMyPresence({ slide: currentSlide });
  }, [currentSlide, navigate, updateMyPresence]);

  // Resize observer to get slides container dimensions
  useEffect(() => {
    if (!slidesRef.current) {
      return;
    }

    const updateDimensions = () => {
      if (slidesRef.current) {
        const rect = slidesRef.current.getBoundingClientRect();
        setSlidesDimensions({ width: rect.width, height: rect.height });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(slidesRef.current);
    updateDimensions();

    return () => resizeObserver.disconnect();
  }, []);

  const insertTextArea = useMutation(
    ({ storage, setMyPresence }, e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = crypto.randomUUID();
      const newTextArea = new LiveObject({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        content: "foo " + id,
        slide: currentSlide,
      });
      storage.get("textAreas").set(id, newTextArea);
      setMyPresence({ selectedTextAreaId: id });
    },
    [],
  );

  const deleteTextArea = useMutation(({ storage, self, setMyPresence }) => {
    const textAreaId = self.presence.selectedTextAreaId;
    if (!textAreaId) {
      return;
    }

    storage.get("textAreas").delete(textAreaId);
    setMyPresence({ selectedTextAreaId: null }, { addToHistory: true });
  }, []);

  // Dragging and selection
  const onTextAreaPointerDown = useMutation(
    (
      { storage, setMyPresence },
      e: React.PointerEvent<HTMLTextAreaElement>,
      textAreaId: string,
    ) => {
      history.pause();
      e.stopPropagation();
      setMyPresence({ selectedTextAreaId: textAreaId }, { addToHistory: true });

      // Calculate offset from textarea position to cursor
      const textArea = storage.get("textAreas").get(textAreaId);
      if (textArea && slidesRef.current) {
        const rect = slidesRef.current.getBoundingClientRect();
        const cursorX = (e.clientX - rect.left) / rect.width;
        const cursorY = (e.clientY - rect.top) / rect.height;
        setDragOffset({
          x: cursorX - textArea.get("x"),
          y: cursorY - textArea.get("y"),
        });
      }

      setIsDragging(true);
    },
    [setIsDragging, setDragOffset, history],
  );

  const onCanvasPointerUp = useMutation(
    ({ setMyPresence }) => {
      if (!isDragging) {
        setMyPresence({ selectedTextAreaId: null }, { addToHistory: true });
      }

      setIsDragging(false);
      history.resume();
    },
    [isDragging, setIsDragging, history],
  );

  const onCanvasPointerMove = useMutation(
    (
      { setMyPresence, storage, self },
      e: React.PointerEvent<HTMLDivElement>,
    ) => {
      e.preventDefault();

      // Handle reporting cursor position
      const rect = e.currentTarget.getBoundingClientRect();
      setMyPresence({
        cursor: {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        },
      });

      // Handle dragging
      if (!isDragging) {
        return;
      }

      const textAreaId = self.presence.selectedTextAreaId;
      if (!textAreaId) {
        return;
      }

      const textArea = storage.get("textAreas").get(textAreaId);
      if (textArea) {
        const cursorX = (e.clientX - rect.left) / rect.width;
        const cursorY = (e.clientY - rect.top) / rect.height;
        textArea.update({
          x: cursorX - dragOffset.x,
          y: cursorY - dragOffset.y,
        });
      }
    },
    [isDragging, dragOffset],
  );

  const handleScrollEnd = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const slideWidth = container.clientWidth + 8; // width + gap-2 (8px)
    const activeSlide = Math.round(scrollLeft / slideWidth) + 1;
    setCurrentSlide(activeSlide);
  }, []);

  const handleOnClickSlide = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (toolMode === "text") {
        insertTextArea(e);
      }
    },
    [insertTextArea, toolMode],
  );

  const totalSlides = 10;

  return (
    <div
      id="canvas"
      className="relative flex flex-1 min-h-0 w-full bg-gray-50 overflow-hidden items-center justify-center"
    >
      <FormattingToolbar
        className="absolute top-4 left-1/2 -translate-x-1/2"
        selectedElementId={selectedByMe}
        toolMode={toolMode}
        onClickToolMode={setToolMode}
        onClickDeleteSelection={deleteTextArea}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
      />

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={slidesRef}
        id="slides"
        className={`flex gap-2 overflow-x-auto overflow-y-hidden h-full w-full snap-x snap-mandatory scroll-smooth ${toolMode === "text" ? "cursor-text" : ""}`}
        onScrollEnd={handleScrollEnd}
        role="region"
        aria-label="Slideshow"
        aria-live="polite"
        onPointerMove={onCanvasPointerMove}
        onPointerUp={onCanvasPointerUp}
        onPointerLeave={() => updateMyPresence({ cursor: null })}
        onClick={handleOnClickSlide}
      >
        {Array.from({ length: totalSlides }, (_, i) => (
          <section
            key={i}
            id={(i + 1).toString()}
            className="flex items-center justify-center aspect-4/3 w-full max-h-full shrink-0 snap-center bg-gray-400"
            aria-label={`Slide ${i + 1} of ${totalSlides}`}
            aria-roledescription="slide"
          >
            {/* <p className="text-8xl text-gray-300">{i + 1}</p> */}
            {textAreaIds?.map((id) => {
              return (
                <Textarea
                  key={id}
                  id={id}
                  containerRef={slidesRef}
                  toolMode={toolMode}
                  currentSlide={currentSlide}
                  onPointerDown={onTextAreaPointerDown}
                />
              );
            })}
          </section>
        ))}

        {others
          .filter(({ presence }) => presence.slide === currentSlide)
          .map(({ connectionId, presence, id }) =>
            presence.cursor ? (
              <Cursor
                key={connectionId}
                x={presence.cursor.x * slidesDimensions.width}
                y={presence.cursor.y * slidesDimensions.height}
                color={getCursorColor(id)}
              />
            ) : null,
          )}
      </div>
    </div>
  );
}
