"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { motion, useDragControls } from "motion/react";
import type { WindowState } from "./types";
import { MENU_BAR_HEIGHT, DOCK_HEIGHT } from "./types";
import { useDesktop } from "./desktop-context";
import { WindowTitleBar } from "./window-title-bar";
import { ResizeHandles } from "./resize-handles";

interface WindowProps {
  state: WindowState;
  children: ReactNode;
}

export function Window({ state: win, children }: WindowProps) {
  const { state, closeWindow, focusWindow, minimizeWindow, toggleMaximize } =
    useDesktop();
  const dragControls = useDragControls();
  const { dispatch } = useDesktop();
  const windowRef = useRef<HTMLDivElement>(null);
  const liveRect = useRef({ ...win.position, ...win.size });

  // Keep live rect in sync with state
  liveRect.current = {
    x: win.position.x,
    y: win.position.y,
    width: win.size.width,
    height: win.size.height,
  };

  const isActive = state.activeWindowId === win.id;

  const handleResize = useCallback(
    (delta: { dx: number; dy: number }, direction: string) => {
      const r = liveRect.current;
      let { x, y, width, height } = r;

      if (direction.includes("e")) width += delta.dx;
      if (direction.includes("w")) {
        width -= delta.dx;
        x += delta.dx;
      }
      if (direction.includes("s")) height += delta.dy;
      if (direction.includes("n")) {
        height -= delta.dy;
        y += delta.dy;
      }

      // Enforce min size
      width = Math.max(width, win.minSize.width);
      height = Math.max(height, win.minSize.height);

      liveRect.current = { x, y, width, height };

      dispatch({
        type: "RESIZE_WINDOW",
        id: win.id,
        size: { width, height },
        position: { x, y },
      });
    },
    [dispatch, win.id, win.minSize.width, win.minSize.height],
  );

  const handleResizeEnd = useCallback(() => {
    // State is already updated continuously via handleResize
  }, []);

  if (win.isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      className={`absolute flex flex-col rounded-xl overflow-hidden ${
        isActive
          ? "ring-1 ring-white/[0.06]"
          : "opacity-[0.97]"
      }`}
      style={{
        zIndex: win.zIndex,
        backgroundColor: "oklch(0.16 0.015 260 / 88%)",
        backdropFilter: "blur(40px) saturate(1.4)",
        WebkitBackdropFilter: "blur(40px) saturate(1.4)",
        border: `1px solid ${isActive ? "oklch(1 0 0 / 18%)" : "oklch(1 0 0 / 10%)"}`,
        boxShadow: isActive
          ? "0 25px 50px -12px oklch(0 0 0 / 50%), 0 8px 20px oklch(0 0 0 / 30%)"
          : "0 15px 35px -10px oklch(0 0 0 / 40%), 0 5px 15px oklch(0 0 0 / 20%)",
      }}
      initial={false}
      animate={{
        x: win.position.x,
        y: win.position.y,
        width: win.size.width,
        height: win.size.height,
      }}
      transition={
        win.isMaximized || win.preMaximizeRect === undefined
          ? { type: "spring", stiffness: 400, damping: 35, mass: 0.8 }
          : { duration: 0 }
      }
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: MENU_BAR_HEIGHT - win.size.height + 38,
        left: -win.size.width + 100,
        right:
          typeof window !== "undefined"
            ? window.innerWidth - 100
            : 1200,
        bottom:
          typeof window !== "undefined"
            ? window.innerHeight - DOCK_HEIGHT - 38
            : 700,
      }}
      onDragEnd={(_, info) => {
        dispatch({
          type: "MOVE_WINDOW",
          id: win.id,
          position: {
            x: win.position.x + info.offset.x,
            y: win.position.y + info.offset.y,
          },
        });
      }}
      onPointerDown={() => {
        if (!isActive) focusWindow(win.id);
      }}
    >
      <WindowTitleBar
        title={win.title}
        isActive={isActive}
        onClose={() => closeWindow(win.id)}
        onMinimize={() => minimizeWindow(win.id)}
        onMaximize={() => toggleMaximize(win.id)}
        onPointerDown={(e) => {
          if (!win.isMaximized) {
            dragControls.start(e);
          }
        }}
      />
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin bg-card">
        {children}
      </div>
      <ResizeHandles
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
        disabled={win.isMaximized}
      />
    </motion.div>
  );
}
