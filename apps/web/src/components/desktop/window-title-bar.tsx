"use client";

interface WindowTitleBarProps {
  title: string;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPointerDown: (e: React.PointerEvent) => void;
}

export function WindowTitleBar({
  title,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onPointerDown,
}: WindowTitleBarProps) {
  return (
    <div
      className="group flex items-center h-10 px-3 border-b select-none shrink-0 rounded-t-xl cursor-default"
      style={{
        backgroundColor: "oklch(0.13 0.02 260 / 92%)",
        borderColor: "oklch(1 0 0 / 8%)",
      }}
      onPointerDown={onPointerDown}
      onDoubleClick={onMaximize}
    >
      {/* Traffic lights — gray by default, colored on hover */}
      <div
        className="flex items-center gap-1.5 mr-4"
        // Stop drag from starting when clicking buttons
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="size-3 rounded-full bg-[#3C3C3C] group-hover:bg-[#FF5F57] transition-colors"
          aria-label="Close window"
        />
        <button
          onClick={onMinimize}
          className="size-3 rounded-full bg-[#3C3C3C] group-hover:bg-[#FEBC2E] transition-colors"
          aria-label="Minimize window"
        />
        <button
          onClick={onMaximize}
          className="size-3 rounded-full bg-[#3C3C3C] group-hover:bg-[#28C840] transition-colors"
          aria-label="Maximize window"
        />
      </div>

      {/* Title — centered */}
      <span
        className={`flex-1 text-center text-xs font-mono truncate transition-colors ${
          isActive ? "text-foreground/70" : "text-muted-foreground/40"
        }`}
      >
        {title}
      </span>

      {/* Spacer to balance traffic lights */}
      <div className="w-[52px]" />
    </div>
  );
}
