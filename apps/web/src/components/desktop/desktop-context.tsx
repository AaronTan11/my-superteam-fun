"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type { DesktopState, DesktopAction, AppType } from "./types";
import { desktopReducer, initialDesktopState } from "./desktop-reducer";

interface DesktopContextValue {
  state: DesktopState;
  dispatch: React.Dispatch<DesktopAction>;
  openApp: (appType: AppType) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(desktopReducer, initialDesktopState);

  const openApp = useCallback(
    (appType: AppType) => {
      dispatch({ type: "OPEN_WINDOW", appType });
    },
    [dispatch],
  );

  const closeWindow = useCallback(
    (id: string) => {
      dispatch({ type: "CLOSE_WINDOW", id });
    },
    [dispatch],
  );

  const focusWindow = useCallback(
    (id: string) => {
      dispatch({ type: "FOCUS_WINDOW", id });
    },
    [dispatch],
  );

  const minimizeWindow = useCallback(
    (id: string) => {
      dispatch({ type: "MINIMIZE_WINDOW", id });
    },
    [dispatch],
  );

  const toggleMaximize = useCallback(
    (id: string) => {
      dispatch({
        type: "MAXIMIZE_WINDOW",
        id,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });
    },
    [dispatch],
  );

  return (
    <DesktopContext.Provider
      value={{
        state,
        dispatch,
        openApp,
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleMaximize,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop(): DesktopContextValue {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopProvider");
  return ctx;
}
