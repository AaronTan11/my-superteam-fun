"use client";

import { useCallback, useRef } from "react";

type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

interface ResizeHandlesProps {
  onResize: (
    delta: { dx: number; dy: number },
    direction: ResizeDirection,
  ) => void;
  onResizeEnd: () => void;
  disabled?: boolean;
}

const HANDLE_SIZE = 6;
const CORNER_SIZE = 12;

const HANDLES: {
  direction: ResizeDirection;
  cursor: string;
  style: React.CSSProperties;
}[] = [
  // Edges
  {
    direction: "n",
    cursor: "ns-resize",
    style: { top: 0, left: CORNER_SIZE, right: CORNER_SIZE, height: HANDLE_SIZE },
  },
  {
    direction: "s",
    cursor: "ns-resize",
    style: { bottom: 0, left: CORNER_SIZE, right: CORNER_SIZE, height: HANDLE_SIZE },
  },
  {
    direction: "e",
    cursor: "ew-resize",
    style: { right: 0, top: CORNER_SIZE, bottom: CORNER_SIZE, width: HANDLE_SIZE },
  },
  {
    direction: "w",
    cursor: "ew-resize",
    style: { left: 0, top: CORNER_SIZE, bottom: CORNER_SIZE, width: HANDLE_SIZE },
  },
  // Corners
  {
    direction: "nw",
    cursor: "nwse-resize",
    style: { top: 0, left: 0, width: CORNER_SIZE, height: CORNER_SIZE },
  },
  {
    direction: "ne",
    cursor: "nesw-resize",
    style: { top: 0, right: 0, width: CORNER_SIZE, height: CORNER_SIZE },
  },
  {
    direction: "sw",
    cursor: "nesw-resize",
    style: { bottom: 0, left: 0, width: CORNER_SIZE, height: CORNER_SIZE },
  },
  {
    direction: "se",
    cursor: "nwse-resize",
    style: { bottom: 0, right: 0, width: CORNER_SIZE, height: CORNER_SIZE },
  },
];

export function ResizeHandles({
  onResize,
  onResizeEnd,
  disabled,
}: ResizeHandlesProps) {
  const lastPos = useRef({ x: 0, y: 0 });
  const activeDir = useRef<ResizeDirection | null>(null);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!activeDir.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      onResize({ dx, dy }, activeDir.current);
    },
    [onResize],
  );

  const handlePointerUp = useCallback(() => {
    activeDir.current = null;
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    onResizeEnd();
  }, [handlePointerMove, onResizeEnd]);

  const startResize = useCallback(
    (e: React.PointerEvent, direction: ResizeDirection) => {
      e.preventDefault();
      e.stopPropagation();
      activeDir.current = direction;
      lastPos.current = { x: e.clientX, y: e.clientY };
      document.body.style.cursor =
        HANDLES.find((h) => h.direction === direction)?.cursor ?? "";
      document.body.style.userSelect = "none";
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [handlePointerMove, handlePointerUp],
  );

  if (disabled) return null;

  return (
    <>
      {HANDLES.map((h) => (
        <div
          key={h.direction}
          className="absolute z-50"
          style={{ ...h.style, cursor: h.cursor }}
          onPointerDown={(e) => startResize(e, h.direction)}
        />
      ))}
    </>
  );
}
