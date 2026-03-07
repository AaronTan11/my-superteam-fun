export type AppType =
  | "home"
  | "members"
  | "events"
  | "mission"
  | "testimonials"
  | "faq"
  | "about";

export interface WindowState {
  id: string;
  appType: AppType;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  preMaximizeRect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface DesktopState {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;
}

export type DesktopAction =
  | { type: "OPEN_WINDOW"; appType: AppType }
  | { type: "CLOSE_WINDOW"; id: string }
  | { type: "FOCUS_WINDOW"; id: string }
  | { type: "MINIMIZE_WINDOW"; id: string }
  | { type: "MAXIMIZE_WINDOW"; id: string; viewportWidth: number; viewportHeight: number }
  | { type: "RESTORE_WINDOW"; id: string }
  | { type: "MOVE_WINDOW"; id: string; position: { x: number; y: number } }
  | {
      type: "RESIZE_WINDOW";
      id: string;
      size: { width: number; height: number };
      position?: { x: number; y: number };
    };

export const MENU_BAR_HEIGHT = 28;
export const DOCK_HEIGHT = 72; // 60px dock + 12px gap
