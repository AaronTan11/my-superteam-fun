import type { DesktopState, DesktopAction, AppType } from "./types";
import { APP_CONFIGS } from "./app-config";
import { MENU_BAR_HEIGHT, DOCK_HEIGHT } from "./types";

const CASCADE_OFFSET = 30;
const INITIAL_X = 80;
const INITIAL_Y = MENU_BAR_HEIGHT + 40;

function getNextPosition(
  windows: DesktopState["windows"],
  viewportWidth: number,
  viewportHeight: number,
): { x: number; y: number } {
  if (windows.length === 0) {
    return { x: INITIAL_X, y: INITIAL_Y };
  }

  const last = windows[windows.length - 1];
  let x = last.position.x + CASCADE_OFFSET;
  let y = last.position.y + CASCADE_OFFSET;

  if (x + 400 > viewportWidth || y + 300 > viewportHeight - DOCK_HEIGHT) {
    x = INITIAL_X + (windows.length % 5) * CASCADE_OFFSET;
    y = INITIAL_Y + (windows.length % 5) * CASCADE_OFFSET;
  }

  return { x, y };
}

function findNextActiveWindow(
  windows: DesktopState["windows"],
  excludeId: string,
): string | null {
  const visible = windows
    .filter((w) => w.id !== excludeId && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex);
  return visible[0]?.id ?? null;
}

export function desktopReducer(
  state: DesktopState,
  action: DesktopAction,
): DesktopState {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const existing = state.windows.find(
        (w) => w.appType === action.appType,
      );
      if (existing) {
        // Focus existing (un-minimize if needed)
        return {
          ...state,
          windows: state.windows.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: state.nextZIndex }
              : w,
          ),
          activeWindowId: existing.id,
          nextZIndex: state.nextZIndex + 1,
        };
      }

      const config = APP_CONFIGS[action.appType];
      const vw =
        typeof window !== "undefined" ? window.innerWidth : 1200;
      const vh =
        typeof window !== "undefined" ? window.innerHeight : 800;
      const position = getNextPosition(state.windows, vw, vh);
      const newWindow = {
        id: crypto.randomUUID(),
        appType: action.appType as AppType,
        title: config.title,
        position,
        size: { ...config.defaultSize },
        minSize: { ...config.minSize },
        isMinimized: false,
        isMaximized: false,
        zIndex: state.nextZIndex,
      };

      return {
        ...state,
        windows: [...state.windows, newWindow],
        activeWindowId: newWindow.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "CLOSE_WINDOW": {
      const remaining = state.windows.filter((w) => w.id !== action.id);
      return {
        ...state,
        windows: remaining,
        activeWindowId:
          state.activeWindowId === action.id
            ? findNextActiveWindow(state.windows, action.id)
            : state.activeWindowId,
      };
    }

    case "FOCUS_WINDOW": {
      if (state.activeWindowId === action.id) return state;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, zIndex: state.nextZIndex } : w,
        ),
        activeWindowId: action.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "MINIMIZE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isMinimized: true } : w,
        ),
        activeWindowId:
          state.activeWindowId === action.id
            ? findNextActiveWindow(state.windows, action.id)
            : state.activeWindowId,
      };
    }

    case "MAXIMIZE_WINDOW": {
      const win = state.windows.find((w) => w.id === action.id);
      if (!win) return state;

      if (win.isMaximized) {
        // Restore
        return {
          ...state,
          windows: state.windows.map((w) =>
            w.id === action.id && w.preMaximizeRect
              ? {
                  ...w,
                  isMaximized: false,
                  position: {
                    x: w.preMaximizeRect.x,
                    y: w.preMaximizeRect.y,
                  },
                  size: {
                    width: w.preMaximizeRect.width,
                    height: w.preMaximizeRect.height,
                  },
                  preMaximizeRect: undefined,
                }
              : w,
          ),
        };
      }

      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                isMaximized: true,
                preMaximizeRect: {
                  x: w.position.x,
                  y: w.position.y,
                  width: w.size.width,
                  height: w.size.height,
                },
                position: { x: 0, y: MENU_BAR_HEIGHT },
                size: {
                  width: action.viewportWidth,
                  height:
                    action.viewportHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT,
                },
              }
            : w,
        ),
      };
    }

    case "RESTORE_WINDOW": {
      const win = state.windows.find((w) => w.id === action.id);
      if (!win?.preMaximizeRect) return state;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id && w.preMaximizeRect
            ? {
                ...w,
                isMaximized: false,
                position: {
                  x: w.preMaximizeRect.x,
                  y: w.preMaximizeRect.y,
                },
                size: {
                  width: w.preMaximizeRect.width,
                  height: w.preMaximizeRect.height,
                },
                preMaximizeRect: undefined,
              }
            : w,
        ),
      };
    }

    case "MOVE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, position: action.position, isMaximized: false }
            : w,
        ),
      };
    }

    case "RESIZE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                size: action.size,
                ...(action.position ? { position: action.position } : {}),
                isMaximized: false,
              }
            : w,
        ),
      };
    }

    default:
      return state;
  }
}

export const initialDesktopState: DesktopState = {
  windows: [],
  activeWindowId: null,
  nextZIndex: 10,
};
