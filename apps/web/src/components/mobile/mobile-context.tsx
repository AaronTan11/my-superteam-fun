"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { AppType } from "@/components/desktop/types";
import { appTypePath } from "@/lib/app-routes";

/* ── State ── */
type MobileScreen = "lock" | "home" | "app";

interface MobileState {
  screen: MobileScreen;
  activeApp: AppType | null;
  appOrigin: { x: number; y: number } | null;
}

type MobileAction =
  | { type: "UNLOCK" }
  | { type: "OPEN_APP"; app: AppType; origin: { x: number; y: number } }
  | { type: "CLOSE_APP" };

function getInitialScreen(): MobileScreen {
  if (typeof window === "undefined") return "lock";
  return sessionStorage.getItem("stmy-unlocked") === "true" ? "home" : "lock";
}

const initialState: MobileState = {
  screen: "lock",
  activeApp: null,
  appOrigin: null,
};

/* ── Reducer ── */
function mobileReducer(state: MobileState, action: MobileAction): MobileState {
  switch (action.type) {
    case "UNLOCK":
      return { ...state, screen: "home" };

    case "OPEN_APP":
      return {
        ...state,
        screen: "app",
        activeApp: action.app,
        appOrigin: action.origin,
      };

    case "CLOSE_APP":
      return { ...state, screen: "home", activeApp: null, appOrigin: null };

    default:
      return state;
  }
}

/* ── Context ── */
interface MobileContextValue {
  state: MobileState;
  dispatch: React.Dispatch<MobileAction>;
  unlock: () => void;
  openApp: (app: AppType, origin: { x: number; y: number }) => void;
  closeApp: () => void;
}

const MobileContext = createContext<MobileContextValue | null>(null);

export function useMobile() {
  const ctx = useContext(MobileContext);
  if (!ctx) throw new Error("useMobile must be used within MobileProvider");
  return ctx;
}

/* ── Provider ── */
interface MobileProviderProps {
  children: ReactNode;
  initialApp?: AppType;
}

export function MobileProvider({ children, initialApp }: MobileProviderProps) {
  const hasDeepLink = initialApp && initialApp !== "home";
  const [state, dispatch] = useReducer(mobileReducer, {
    ...initialState,
    screen: hasDeepLink ? "app" : getInitialScreen(),
    activeApp: hasDeepLink ? initialApp : null,
  });

  const unlock = useCallback(() => {
    sessionStorage.setItem("stmy-unlocked", "true");
    dispatch({ type: "UNLOCK" });
  }, []);

  const openApp = useCallback(
    (app: AppType, origin: { x: number; y: number }) => {
      dispatch({ type: "OPEN_APP", app, origin });
    },
    [],
  );

  const closeApp = useCallback(() => {
    dispatch({ type: "CLOSE_APP" });
  }, []);

  // Browser history + URL sync — update URL when app changes
  useEffect(() => {
    if (state.screen === "app" && state.activeApp) {
      const path = appTypePath(state.activeApp);
      if (window.location.pathname !== path) {
        window.history.pushState({ mobileApp: true }, "", path);
      }
    } else if (state.screen === "home") {
      if (window.location.pathname !== "/") {
        window.history.replaceState(null, "", "/");
      }
    }
  }, [state.screen, state.activeApp]);

  useEffect(() => {
    const handlePopState = () => {
      if (state.screen === "app") {
        dispatch({ type: "CLOSE_APP" });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [state.screen]);

  return (
    <MobileContext.Provider value={{ state, dispatch, unlock, openApp, closeApp }}>
      {children}
    </MobileContext.Provider>
  );
}
